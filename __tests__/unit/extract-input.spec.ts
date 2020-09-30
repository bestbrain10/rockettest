import { validInput, inputLessThanFourLines, noUserNumberInput, noTaskNumberInput } from '../../mocks/data.mock';
import { prepRawInput, extractInput, prepRawNumber, isNonZero } from '../../src/util';


describe('prepRawNumber utility function', () => {
    test('returns 0 for non number value', () => {
        expect(prepRawNumber('jibrish')).toBe(0);
    });

    test('returns numeric value for string encoded number value', () => {
        expect(prepRawNumber('34')).toBe(34);
    });
});

describe('isNonZero utility function', () => {
    test('returns true for non-zero numeric value', () => {
        expect(isNonZero('56')).toBe(true);
    });

    test('returns false for zero or non numeric value', () => {
        expect(isNonZero('lovely')).toBe(false);
    });

    test('returns false for numeric value that has other characters other than numbers', () => {
        expect(isNonZero('1 PT')).toBe(false);
    });
});

describe('prepRawInput utility function', () => {
test('input with less than four lines throws error', () => {
        expect(() => prepRawInput(inputLessThanFourLines))
        .toThrowError(new Error("input should be at least four lines"));
    });

    test('extracts input as string an returns', () => {
        const result = prepRawInput(validInput);

        expect(result).toHaveProperty('numberOfUsers');
        expect(result.numberOfUsers).toBe(2);

        expect(result).toHaveProperty('numberOfTasks');
        expect(result.numberOfTasks).toBe(3);

        expect(result).toHaveProperty('inputSplitted');
        expect(Array.isArray(result.inputSplitted)).toEqual(true);
        expect(result.inputSplitted.length).toBeGreaterThan(4);
    });

});

describe('Input Extraction Test', () => {

    test('throws error if user sum is not a positive non-zero number', () => {
        expect(() => extractInput(noUserNumberInput))
            .toThrowError(new Error("Number of user should be a positive non-zero number"));
    });

    test('throws error if task sum is not a positive non-zero number', () => {
        expect(() => extractInput(noTaskNumberInput))
            .toThrowError(new Error("Number of tasks should be a positive non-zero number"));
    });

    test('valid input should return AppInput instance', () => {
        expect(extractInput(validInput))
            .toMatchObject({
                numberOfUsers: 2,
                users: [
                    { id: 1, country: 'PT' },
                    { id: 2, country: 'US' }
                ],
                numberOfTasks: 3,
                tasks: [
                    { id: 1, user: 1, timespent: 10 },
                    { id: 2, user: 1, timespent: 5 },
                    { id: 3, user: 2, timespent: 10 }
                ]
            });
    });

});
