import express from "express";
import bodyParser from "body-parser";
import { outputToString, analyze, extractInput } from "./util";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// define a route handler for the default
app.post('/analyze/tasks', (req: express.Request, res: express.Response) => {
    const { input } = req.body;
    if(!input) {
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
    } catch( e) {
        res.status(400).send(e);
    }

});

app.all('**', (req: express.Request, res: express.Response, _: any) => {
    return res.json({
        status: 'online, use POST /analyze/tasks to analyze tasks',
        date: (new Date()).toString()
    });
});

app.use((err: Error | any, req: express.Request, res: express.Response, _: any) => {
    if (err.toString() === '[object Object]') {
        res.status(400).send(err);
    } else {
        res.status(400).send(err.toString());
    }
});


// start the express server
export default () => {
    app.listen(3000, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${3000}`);
    });
};