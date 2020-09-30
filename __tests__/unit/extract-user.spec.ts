import { extractUser, extractUsers, prepRawInput, prepRawNumber } from './../../src/util';
import {
    validInput,
    userSumMoreThanLengthMistmatched
} from '../../mocks/data.mock';

describe('User(s) Extraction Test', () => {

    test('Throws error if user sum offset points to array index that does not exist', () => {
        const { inputSplitted: userInput, numberOfUsers } = prepRawInput(userSumMoreThanLengthMistmatched);
        expect(() => extractUsers(userInput, numberOfUsers))
            .toThrowError(new Error("Number of input users should match stipulated number of users"));
    });

    test('Returns array of users if user sum equal specified users', () => {
        const { inputSplitted: userInput, numberOfUsers } = prepRawInput(validInput);
        const result = extractUsers(userInput, numberOfUsers);
        expect(Array.isArray(result)).toBe(true);
    });

    test('Throws error if input user string is empty', () => {
        expect(() => extractUser(''))
            .toThrowError(new Error('user id must be non zero positive number'));
    });

    test('Throws error if input user string has no country but has id', () => {
        expect(() => extractUser('1'))
            .toThrowError(new Error('missing country code for user with id 1'));
    });

    test('Throws error if any extracted user has no numeric non-zero id but has country', () => {
        expect(() => extractUser('x PT'))
            .toThrowError(new Error('user id must be non zero positive number'));
    });

    test('Throws error if any extracted user has no numeric non-zero id with no country', () => {
        expect(() => extractUser('z'))
            .toThrowError(new Error('user id must be non zero positive number'));
    });

    test('Returns user object if input user string is valid', () => {
        expect(extractUser('1 PT'))
            .toMatchObject({
                id: 1,
                country: 'PT'
            });
    });
});