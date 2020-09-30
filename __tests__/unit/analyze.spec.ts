import { expectedOutput } from '../../mocks/data.mock';
import { roundOutput, sortFunction, averageTimePerUser, averageTimePerCountry, analyze, outputToString } from './../../src/util';

describe('roundOutput', () => {
    test('output should be rounded to second decimal place if it has more than two decimal places', () => {
        expect(roundOutput(1.2456)).toBe(1.25);
    });

    test('output should remain the same if it is integer', () => {
        expect(roundOutput(50)).toBe(50);
    });

    test('output should remain the same if it is already at two decimal places', () => {
        expect(roundOutput(7.99)).toBe(7.99);
    });
});

describe('sortFunction', () => {
    test('should return negative number if first parameter value is greater than second parameter value', () => {
        expect(sortFunction({ a: 1 }, { b: 2 })).toBeLessThan(0);
    });

    test('should return positive number if first parameter value is less than second parameter value', () => {
        expect(sortFunction({ a: 2 }, { b: 1 })).toBeGreaterThan(0);
    });

    test('should return zero if first parameter value is equal second parameter value', () => {
        expect(sortFunction({ a: 1 }, { b: 1 })).toEqual(0);
    });

    test('should return zero if both parameter value are non-numeric', () => {
        expect(sortFunction({ a: 'd' }, { b: 'v' })).toEqual(0);
    });

    test('should return zero if any parameter is not object or empty object', () => {
        expect(sortFunction({}, {})).toEqual(0);
    });
});

describe('averageTimePerUser', () => {

    const input = {
        numberOfUsers: 3,
        users: [
            { id: 1, country: 'PT' },
            { id: 2, country: 'US' },
            { id: 3, country: 'NG' }
        ],
        numberOfTasks: 3,
        tasks: [
            { id: 1, user: 1, timespent: 10 },
            { id: 2, user: 1, timespent: 5 },
            { id: 3, user: 2, timespent: 10 }
        ]
    };

    const result = averageTimePerUser(input);

    test('return valid user average array', () => {
        expect(Array.isArray(result)).toBe(true);
      });

      test('returned array lentgh is number of users', () => {
          expect(result).toHaveLength(input.numberOfUsers);
      });

      test('every array entry is an object', () => {
          expect(result.every(entry => typeof entry === 'object')).toBe(true);
      });

      test('every array entry has numeric values as keys and values', () => {
          expect(result.every(entry => {
              const [keyVal] = Object.entries(entry);
              return keyVal.some(value => !isNaN(value));
          })).toBe(true);
      });

    test('user without mention is in output', () => {
        expect(result).toContainEqual({ '3': 0 });
    });

      test('average is correct', () => {
          expect(result).toContainEqual({ '1': 7.5 });
          expect(result).toContainEqual({ '2': 10 });
      });
});


describe('averageTimePerCountry', () => {
    const input = {
        numberOfUsers: 2,
        users: [
            { id: 1, country: 'PT' },
            { id: 2, country: 'US' },
            { id: 3, country: 'NG' }
        ],
        numberOfTasks: 3,
        tasks: [
            { id: 1, user: 1, timespent: 10 },
            { id: 2, user: 1, timespent: 5 },
            { id: 3, user: 2, timespent: 10 }
        ]
    };

    const result = averageTimePerCountry(input);
    test('return valid user average array', () => {
        expect(Array.isArray(result)).toBe(true);
    });

    test('returned array lentgh is number of countries', () => {
        expect(result).toHaveLength(3);
    });

    test('every array entry is an object', () => {
        expect(result.every(entry => typeof entry === 'object')).toBe(true);
    });

    test('every array entry has numeric values as keys', () => {
        expect(result.every(entry => {
            return Object.values(entry).some(value => !isNaN(value));
        })).toBe(true);
    });

    test('country without mention is in output', () => {
        expect(result).toContainEqual({ 'NG': 0 });
    });

    test('average is correct', () => {
        expect(result).toContainEqual({ 'PT': 7.5 });
        expect(result).toContainEqual({ 'US': 10 });
    });
});

describe('analyze', () => {
    test('returns valid app output', () => {
        const input = {
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
        };

        const result = analyze(input);

        expect(result).toHaveProperty('averageTimeByUsers');
        expect(result).toHaveProperty('averageTimeByCountries');
    });
});



describe('outputToString', () => {
    test('outputs valid output object to valid string format', () => {
        const input = {
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
        };
        const outputObject = analyze(input);
        expect(outputToString(outputObject)).toEqual(expectedOutput);
    });
});
