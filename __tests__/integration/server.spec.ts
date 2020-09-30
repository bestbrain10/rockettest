
import { NowRequest, NowResponse } from '@vercel/node';
import serverLamda from '../../src/server';
import { createServer } from 'vercel-node-server';
import listen from 'test-listen';
import axios from 'axios';
import { apiErrorResponse } from '../../mocks/data.mock';
import { URL } from 'url';

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
        const req =  {} as NowRequest;
        const response = await axios.post(url, { });
        expect(response).rejects.toThrow(apiErrorResponse);
    });

    test('empty input body param triggers error', () => {

    });

    test('invalid input triggers error', () => {

    });

    test('valid input returns valid output', () => {

    });
});