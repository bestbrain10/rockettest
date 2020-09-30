
import fs from 'fs';

export const expectedOutput = `
1 7.50
2 10.00
PT 7.50
US 10.00
`.trim();

// valid input
export const validInput = `
2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10
`;

export const apiErrorResponse = `
Please specify an 'input' body paramater.
In the first line of the input you can find the number of users in the platform (N).
The following N lines contain the ID and country code for each user.
Please note that the id of the user is numerical.
The line after the ID and the country code of all users contains the number of tasks executed in the platform (T);
followed by T lines containing the ID of the task, the ID of the user that executed it and the time spent in the task, in seconds.
Example:
2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10
`;

export const writeImage = (filePath) => {
    const img = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg==";
    const buf = Buffer.from(img, 'base64');
    fs.writeFileSync(filePath, buf);
};


export const inputLessThanFourLines = `
2
1 PT
0
`;

// no user number
export const noUserNumberInput = `
1 PT
2 US
3
1 1 10
2 1 5
3 2 10
`;


// no task number
export const noTaskNumberInput = `
2
1 PT
2 US
1 1 10
2 1 5
3 2 10
`;

// no user number
// no task number
export const noTaskNumberNoUserNumberInput = `
1 PT
2 US
1 1 10
2 1 5
3 2 10
`;

// mistmatch user sum and length
export const userSumMoreThanLengthMistmatched = `
10
1 PT
2 US
7
1 1 10
2 1 5
3 2 10
`;

export const userSumLessThanLengthMistmatched = `
1
1 PT
2 US
1
1 1 10
2 1 5
3 2 10
`;

// mistmatch task sum and length
export const taskSumLessThanLengthMistmatched = `
2
1 PT
2 US
2
1 1 10
2 1 5
3 2 10
`;

export const taskSumMoreThanLengthMistmatched = `
2
1 PT
2 US
5
1 1 10
2 1 5
3 2 10
`;
