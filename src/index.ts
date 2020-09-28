
import { analyze, extractInput, outputToString } from "./util";
import * as minimist from 'minimist';
import server from './server';
import cli from './cli';

const argv = Object.assign(
    {
        mode: 'module'
    },
    minimist.default((process.argv.slice(2)))
 );

export const anaylyzeTasks = (input: string): string => {
    if (!input) {
        // tslint:disable-next-line: no-console
        throw new Error(`No input recieved, pass in a valid string`);
    }

    return outputToString(
        analyze(
            extractInput(input)
        )
    );
};


if(argv.mode === 'server') {
    server();
}

if (argv.mode === 'cli') {
    cli(argv.input);
}


// const input = `
// 2
// 1 PT
// 2 US
// 3
// 1 1 10
// 2 1 5
// 3 2 10
// `;
// // tslint:disable-next-line: no-console
// console.log(
//     outputToString(
//         analyze(
//             extractInput(input)
//         )
//     )
// );
