import { outputToString, analyze, extractInput } from "./util";
import fs from 'fs';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);
import * as minimist from 'minimist';
const argv = minimist.default((process.argv.slice(2)));


const cliFunction = async (input: string): Promise<string> => {

    if(!input) {
        throw new Error(`No input recieved, send an input text file using the '--input' flag`);
    }

    try{
        if(!fs.existsSync(input)){
            throw new Error(`Could not locate specified input file`);
        }
    } catch(e) {
        throw new Error(`Could not locate specified input file`);
    }

    const fileInput = await readFile(input, 'utf-8');

    return outputToString(
        analyze(
            extractInput(fileInput)
        )
    );
};


if (require.main === module) {
    if(Object.keys(argv).includes('input')){
        try{
            // tslint:disable-next-line: no-console
            cliFunction(argv.input).then(e => console.log(e))
                // tslint:disable-next-line: no-console
                .catch(e => console.error(e.toString()));
        } catch(e) {
            // tslint:disable-next-line: no-console
            console.error(e.toString());
        }
    } else {
            // tslint:disable-next-line: no-console
            console.error(`No input recieved, send an input text file using the '--input' flag`);
    }
}

export default cliFunction;