export interface User {
    id: number;
    country: string;
}

export interface Task {
    id: number;
    user: number;
    timespent: number;
}


export interface AppInput {
    numberOfUsers: number;
    users: User[];
    numberOfTasks: number;
    tasks: Task[];
}

export interface AverageTimeByUser {
    [key: number]: number;
}

export interface AverageTimeByCountry {
    [key: string]: number;
}

export interface AppOutput {
    averageTimeByUsers: AverageTimeByUser[];
    averageTimeByCountries: AverageTimeByCountry[];
}