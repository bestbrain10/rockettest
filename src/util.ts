import { AppInput, Task, User, AppOutput, AverageTimeByUser, AverageTimeByCountry } from './models';

export const extractUsers = (input: string[], numberOfUsers: number): User[] => {
    if (!input[numberOfUsers + 1]) {
        // index(numberOfUsers + 1) should exist
        throw new Error("Number of users should be a positive non-zero number");
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
    // all is supposed to be defined
    return {
        id,
        user,
        timespent
    } as Task;
};

export const extractInput = (input: string): AppInput => {
    const inputSplit: string[] = input.trim().split('\n');
    if (inputSplit.length < 4) {
        // inputSplit should atlst be four
        throw new Error("input should be at least four lines");
    }

    const numberOfUsers: number = parseInt(inputSplit[0], 10) || 0;
    if (!numberOfUsers) {
        // numberOfUsers should exist and be a positive non-zero number
        throw new Error("Number of user should be a positive non-zero number");
    }
    const users: User[] = extractUsers(inputSplit, numberOfUsers);

    const numberOfTasks: number = parseInt(inputSplit[numberOfUsers + 1], 10) || 0;
    if (!numberOfTasks) {
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
    return prevAvg - nextAvg;
};

export const roundOutput = (output: number): number => {
    return Math.round(output * 100) / 100;
};

export const averageTimePerUser = (input: AppInput): AverageTimeByUser[] => {
    const { tasks } = input;
    const taskMap = (tasks as Task[]).reduce((acc, {user, timespent}) => {
        const val: number[] = acc.get(user) || [];
        return acc.set(user, val.concat(timespent));
    }, new Map());

    return Array.from(taskMap).map(([user, allTimespent]) => {
        const average = allTimespent.reduce((a: number, c: number) => a + c, 0) / allTimespent.length;
        return { [user]: roundOutput(average)};
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
    const { averageTimeByUsers, averageTimeByCountries } = output;
    const stringMapFunction = (average: object) => Object.entries(average).join(' ');

    const averageTimeByUsersString = averageTimeByUsers.map(stringMapFunction).join('\n');
    const averageTimeByCountriesString = averageTimeByCountries.map(stringMapFunction).join('\n');
    return averageTimeByUsersString.trim().concat('\n', averageTimeByCountriesString);
};