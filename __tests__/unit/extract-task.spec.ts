import { extractTask, extractTasks, prepRawInput, prepRawNumber } from './../../src/util';
import { validInput, taskSumMoreThanLengthMistmatched } from '../../mocks/data.mock';


describe('task(s) Extraction Test', () => {

    test('Throws error if task sum offset points to array index that does not exist', () => {
        const { inputSplitted: userInput, numberOfUsers, numberOfTasks } = prepRawInput(taskSumMoreThanLengthMistmatched);
        expect(() => extractTasks(userInput, numberOfUsers + 2, numberOfTasks))
            .toThrowError(new Error("Number of input tasks should match stipulated number of tasks"));
    });

    test('Returns array of tasks if task sum equal specified tasks', () => {
        const { inputSplitted: userInput, numberOfUsers, numberOfTasks } = prepRawInput(validInput);
        const result = extractTasks(userInput, numberOfUsers + 2, numberOfTasks);
        expect(Array.isArray(result)).toBe(true);
    });

    test('Throws error if input task string is empty', () => {
        expect(() => extractTask(''))
            .toThrowError(new Error('task id must be non zero positive number'));
    });

    test('Throws error if input task string has no user and timespent but has id', () => {
        expect(() => extractTask('1'))
            .toThrowError(new Error('user id must be non zero positive number'));
    });

    test('Throws error if input task string has no timespent but has id and user id', () => {
        expect(() => extractTask('1 2'))
            .toThrowError(new Error('timespent must be non zero positive number'));
    });

    test('Throws error if any extracted task has no numeric non-zero id', () => {
        expect(() => extractTask('x 2'))
            .toThrowError(new Error('task id must be non zero positive number'));
    });

    test('Throws error if any extracted task has no numeric non-zero user id', () => {
        expect(() => extractTask('1 z'))
            .toThrowError(new Error('user id must be non zero positive number'));
    });

    test('Throws error if any extracted task has no numeric non-zero timespent', () => {
        expect(() => extractTask('1 2 y'))
            .toThrowError(new Error('timespent must be non zero positive number'));
    });

    test('Returns task object if input task string is valid', () => {
        expect(extractTask('1 15 10'))
            .toMatchObject({
                id: 1,
                user: 15,
                timespent: 10
            });
    });
});