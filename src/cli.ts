import { outputToString, analyze, extractInput } from "./util";
import fs from 'fs';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);
import * as minimist from 'minimist';
const argv = minimist.default((process.argv.slice(2)));


const cliFunction = async (input: string): Promise<void> => {

    if(!input) {
        // tslint:disable-next-line: no-console
        console.error(`No input recieved, send an input text file using the '--input' flag`);
    }

    if(!fs.existsSync(input)){
        // tslint:disable-next-line: no-console
        console.error(`Could not locate specified input file`);
    }


    const fileInput = await readFile(input, {
        encoding: 'utf-8'
    });


    try {
        const response = outputToString(
            analyze(
                extractInput(input)
            )
        );
        // tslint:disable-next-line: no-console
        console.log(response);
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.error(e.toString);
    }
};

if(Object.keys(argv).includes('input')){
    cliFunction(argv.input);
}

export default cliFunction;