import { outputToString, analyze, extractInput } from "./util";
import { NowRequest, NowResponse } from '@vercel/node';
// define a route handler for the default

export default (req: NowRequest, res: NowResponse) => {

    if(!req.body || !req.body.input) {
        res.status(400).send(`
            Please specify an 'input' body paramater.
            In the first line of the input you can find the number of users in the platform (N).
            The following N lines contain the ID and country code for each user.
            Please note that the id of the user is numerical.
            The line after the ID and the country code of all users contains the number of tasks executed in the platform (T);
            followed by T lines containing the ID of the task, the ID of the user that executed it and the time spent in the task, in seconds.
            Example:
            2
            1 PT
            2 US
            3
            1 1 10
            2 1 5
            3 2 10
        `);
        return;
    }

    const { input } = req.body;

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