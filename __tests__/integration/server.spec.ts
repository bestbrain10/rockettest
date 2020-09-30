
import serverLamda from '../../src/server';
import { createServer } from 'vercel-node-server';
import listen from 'test-listen';
import axios from 'axios';
import { apiErrorResponse, expectedOutput, inputLessThanFourLines, validInput } from '../../mocks/data.mock';

let server: any;
let url: string;

describe('Server', () => {
    beforeAll(async () => {
        server = createServer(serverLamda);
        url = await listen(server);
    });

    afterAll(() => {
        server.close();
    });
    // is called with
    test('is function', () => {
        expect(serverLamda).toBeDefined();
        expect(typeof serverLamda).toEqual('function');
    });

    test('empty body param triggers error', async () => {
        const response =  axios.post(url, { });
        expect(response).rejects.toThrow(apiErrorResponse);
    });

    test('empty input body param triggers error', async () => {
        const response = axios.post(url, { input: ''});
        expect(response).rejects.toThrow(apiErrorResponse);
    });

    test('invalid input triggers error', async () => {
        const response =  axios.post(url, { input: inputLessThanFourLines });
        expect(response).rejects.toThrow();
    });

    test('valid input returns valid output', async () => {
        const response = axios.post(url, { input: validInput });
        expect(response).resolves.toBe(expectedOutput);
    });
});