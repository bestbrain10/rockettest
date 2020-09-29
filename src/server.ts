import { outputToString, analyze, extractInput } from "./util";
import { NowRequest, NowResponse } from '@vercel/node';
// define a route handler for the default

export default () => (req: NowRequest, res: NowResponse, _: any) => {
    const { input } = req.body;
    if (!input) {
        res.status(400).send(`
            No input recieved, send an input using the 'input' body parameter
        `);
    }

    try {
        const response = outputToString(
            analyze(
                extractInput(input)
            )
        );
        res.send(response);
    } catch (e) {
        res.status(400).send(e);
    }
};