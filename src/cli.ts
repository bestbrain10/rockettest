import { outputToString, analyze, extractInput } from "./util";
import fs from 'fs';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);


export default async (input: string): Promise<void> => {

    if(!input) {
        // tslint:disable-next-line: no-console
        console.error(`No input recieved, send an input text file using the '--input' flag`);
        return;
    }

    if(!fs.existsSync(input)){
        // tslint:disable-next-line: no-console
        console.error(`Could not locate specified input file`);
        return;
    }


    const fileInput = await readFile(input, {
        encoding: 'utf-8'
    });


    try {
        const response = outputToString(
            analyze(
                extractInput(fileInput)
            )
        );
        // tslint:disable-next-line: no-console
        console.log(response);
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.error(e.toString);
    }
};
