import cli from '../../src/cli';
import fs from 'fs';
import { URL } from 'url';


describe('CLI Test', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('throws error if no input param was given', () => {
        // fails if input param is not found
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        cli('');
        expect(consoleSpy).toHaveBeenCalled();
    });

    test('throws error if file is not found', () => {
        // fails if file is not found
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const existSpy = jest.spyOn(fs, 'existsSync').mockImplementation();
        cli('nonexisiting.jpg');
        expect(existSpy).toHaveBeenCalledWith('nonexisiting.jpg');
        expect(existSpy).toHaveReturnedWith(false);
        expect(consoleSpy).toHaveBeenCalled();
    });

    test('throws error if file is not valid', (done) => {
        // fails if file is not valid
        let readFileCallback: (error: Error, data: any) => void = (a, b) => true;
        const filePath = 'existing.jpg';
        const fsSpy = jest.spyOn(fs, 'readFile').mockImplementation((
            _: string | number | Buffer | URL, callback) => {
            readFileCallback = callback;
        });
        cli(filePath);
        const fileError = new Error('Please specify a valid text file');
        expect(() => readFileCallback(fileError, null)).toThrowError(fileError);
        expect(fsSpy).toBeCalledWith(filePath, 'utf8', readFileCallback);
        done();
    });

    test('valid text file is read as specified in input', () => {
        // output is correct
        
    });
});