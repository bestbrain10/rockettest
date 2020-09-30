import { validInput } from '../../mocks/data.mock';
import { expectedOutput } from '../../mocks/data.mock';
import { anaylyzeTasks } from './../../src/index';

describe('Be truthy for task', () => {
    test('exposes analyzeTasks function', () => {
        expect(anaylyzeTasks).toBeDefined();
        expect(typeof anaylyzeTasks).toEqual('function');
    });

    test('throws error given empty input string', () => {
        expect(() => anaylyzeTasks(''))
            .toThrowError(new Error('No input recieved, pass in a valid string'));
    });

    test('valid input returns valid output', () => {
        expect(anaylyzeTasks(validInput))
            .toEqual(expectedOutput);
    });
});