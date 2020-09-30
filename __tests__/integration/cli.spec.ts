import cli from '../../src/cli';
import fs from 'fs';
import { URL } from 'url';
import { expectedOutput, validInput, writeImage } from '../../mocks/data.mock';

describe('CLI Test', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('throws error if no input param was given', () => {
        // fails if input param is not found
        expect(cli(''))
            .rejects
            .toThrowError();
    });

    test('throws error if file is not found', () => {
        // fails if file is not found
        const existSpy = jest.spyOn(fs, 'existsSync').mockImplementation();
        const filePath = 'nonexisiting.jpg';

        expect(cli(filePath))
            .rejects
            .toThrowError();


        expect(existSpy).toHaveBeenCalledWith(filePath);
    });

    test('throws error if file is not valid', (done) => {
        jest.mock('fs');
        // tslint:disable-next-line: no-empty
        const filePath = 'existing.jpg';
        writeImage(filePath);

        expect(cli(filePath))
        .rejects
        .toThrowError();

        fs.unlinkSync(filePath);
        done();
    });

    test('valid text file is read as specified in input', (done) => {
        // output is correct
        const filePath = 'correct.txt';
        fs.writeFileSync(filePath, validInput.trim());
        expect(cli(filePath)).resolves.toEqual(expectedOutput);
        fs.unlinkSync(filePath);
        done();
    });
});