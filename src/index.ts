
import { analyze, extractInput, outputToString } from "./util";

export const anaylyzeTasks = (input: string): string => {
    if (!input) {
        throw new Error('No input recieved, pass in a valid string');
    }

    return outputToString(
        analyze(
            extractInput(input)
        )
    );
};