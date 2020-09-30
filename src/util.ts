import { AppInput, Task, User, AppOutput, AverageTimeByUser, AverageTimeByCountry } from './models';

export const isNonZero = (input: string | number): boolean => {
    const nonZeroRegex = new RegExp('^[1-9][0-9]*\d*(?:\.\d+)?$');
    return nonZeroRegex.test(input as string);
};

export const extractUsers = (input: string[], numberOfUsers: number): User[] => {
    if (!input[numberOfUsers + 1]) {
        // index(numberOfUsers + 1) should exist
        throw new Error("Number of input users should match stipulated number of users");
    }

    const extractedUsers: string[] = input.slice(1, numberOfUsers + 1);
    if (extractedUsers.length !== numberOfUsers) {
        // (1, numberOfUsers + 1 ).length should be equal to numberOfUsers
        throw new Error("Number of input users should match stipulated number of users");
    }

    return extractedUsers.map(extractUser);
};

export const extractUser = (user: string): User => {
    const [id, country]: string[] = user.split(' ');
    // all is supposed to be defined
    if(!id || !isNonZero(id)) {
        throw new Error(`user id must be non zero positive number`);
    }

    if(!country) {
        throw new Error(`missing country code for user with id ${id}`);
    }

    return {
        id: parseInt(id, 10),
        country
    } as User;
};

export const extractTasks = (input: string[], offset: number, numberOfTasks: number): Task[] => {
    // const index = numberOfTasks ;
    if (!input[offset]) {
        // index(numberOfUsers+2) should exist
        throw new Error("Number of tasks should be a positive non-zero number");
    }
    const extractedTasks: string[] = input.slice(offset);
    if (extractedTasks.length !== numberOfTasks) {
        // (numberOfUsers + 2 to end).length should be equal to numberOfTasks
        throw new Error("Number of input tasks should match stipulated number of tasks");
    }
    return extractedTasks.map(extractTask);
};

export const extractTask = (task: string): Task => {
    const [id, user, timespent]: number[] = task.split(' ').map(Number);

    if (!id || !isNonZero(id)) {
        throw new Error(`task id must be non zero positive number`);
    }

    if (!user || !isNonZero(user)) {
        throw new Error(`user id must be non zero positive number`);
    }

    if (!timespent || !isNonZero(timespent)) {
        throw new Error(`timespent must be non zero positive number`);
    }

    return {
        id,
        user,
        timespent
    } as Task;
};

export const prepRawInput = (input: string): { numberOfUsers: number; numberOfTasks: number; inputSplitted: string[]} => {
    const inputSplitted: string[] = input.trim().split('\n');
    if (inputSplitted.length < 4) {
        // inputSplit should atlst be four
        throw new Error("input should be at least four lines");
    }

    const numberOfUsers = prepRawNumber(inputSplitted[0]);

    return {
        numberOfUsers,
        numberOfTasks: prepRawNumber(inputSplitted[numberOfUsers + 1]),
        inputSplitted
    };
};

export const prepRawNumber = (input: string): number => {
    return parseInt(input, 10) || 0;
};

export const extractInput = (input: string): AppInput => {
    const { inputSplitted: inputSplit, numberOfUsers, numberOfTasks } = prepRawInput(input);

    if (!isNonZero(inputSplit[0])) {
        // numberOfUsers should exist and be a positive non-zero number
        throw new Error("Number of user should be a positive non-zero number");
    }
    const users: User[] = extractUsers(inputSplit, numberOfUsers);

    if (!isNonZero(inputSplit[numberOfUsers + 1])) {
        // numberOfUsers should exist and be a positive non-zero number
        throw new Error("Number of tasks should be a positive non-zero number");
    }

    const tasks: Task[] = extractTasks(inputSplit, numberOfUsers + 2, numberOfTasks);

    return {
        numberOfUsers,
        users,
        numberOfTasks,
        tasks
    } as AppInput;
};

export const sortFunction = (prev: object, next: object): number => {
    const [ prevAvg ] = Object.values(prev);
    const [ nextAvg ] = Object.values(next);
    return (Number(prevAvg) || 0) - (Number(nextAvg) || 0);
};

export const roundOutput = (output: number): number => {
    return Math.round(output * 100) / 100;
};

export const averageTimePerUser = (input: AppInput): AverageTimeByUser[] => {
    const { tasks, users } = input;

    return users.map(user => {
        const userTasks: Task[] = tasks.filter(({ user: userID }) => user.id === userID);
        const average = userTasks.reduce((a, { timespent: c }) => (a + 0) + (c || 0), 0) / (userTasks.length || 1);
        return {
            [user.id]: roundOutput(average)
        };
    }).sort(sortFunction);
};


export const averageTimePerCountry = (input: AppInput): AverageTimeByCountry[] => {
    const { tasks, users } = input;
    // group users by country
    const userMap = (users as User[]).reduce((acc, { id, country }) => {
        const val: number[] = acc.get(id) || [];
        return acc.set(country, val.concat(id));
    }, new Map());

    return Array.from(userMap).map(([country, countryUsers]) => {
        const countryTasks: Task[] = tasks.filter(({ user }) => countryUsers.includes(user));
        const average = countryTasks.reduce((a, { timespent: c }) => (a + 0) + (c || 0), 0) / (countryTasks.length || 1);
        return {
            [country]: roundOutput(average)
        };
    }).sort(sortFunction);
};

export const analyze = (input: AppInput): AppOutput => {
    return {
        averageTimeByUsers: averageTimePerUser(input),
        averageTimeByCountries: averageTimePerCountry(input)
    } as AppOutput;
};

export const outputToString = (output: AppOutput): string => {
    const breakChar = '\n';
    const { averageTimeByUsers, averageTimeByCountries } = output;
    const stringMapFunction = (average: object) => Object.entries(average).map(([key, val]) => [key, Number(val).toFixed(2)].join(' '));

    const averageTimeByUsersString = averageTimeByUsers.map(stringMapFunction).join(breakChar);
    const averageTimeByCountriesString = averageTimeByCountries.map(stringMapFunction).join(breakChar);
    return averageTimeByUsersString.trim().concat(breakChar, averageTimeByCountriesString);
};