# User Activity Report

This application is written with NodeJS using typescript. It calculates the average time spent executing tasks, broken down by user and by country. Input can be sent in via CLI, API or programmatically using exposed `analyzeTasks` method.


In the first line of the input you can find the number of users in the platform (N). The following N lines contain the ID and country code for each user. Please note that the id of the user is numerical. The line after the ID and the country code of all users contains the number of tasks executed in the platform (T); followed by T lines containing the ID of the task, the ID of the user that executed it and the time spent in the task, in seconds.


**Sample of the input format**

```
2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10
```

**Sample of the output format**

```
1 7.50
2 10.00
PT 7.50
US 10.00
```



## Installation steps

- Install NodeJS and NPM. Use this link and follow the steps for your own operating system https://nodejs.org/en/download/

- From your terminal or command line run
    
    - `git clone git@github.com:bestbrain10/rockettest.git`

    - `cd rockettest`

    - `npm install`



## Building the project

The project is written in typescript. To run, it has to first be built to ES5(Javascript) in the `build` folder.

- run `npm run build`



## Running Application as CLI

The project can be run as a CLI application using:

- `npm run cli -- --input <path to input file>`



## Running Application as API Locally

 - Run `npm run start` to start the server

 - From your browser or REST client visit `http://localhost:3000`

 - If you make any changes, you will have to first close the running server, and the start it again using `npm run start`



 #### API Endpoint

- **POST** `/analyze/tasks`
- **params** input

**Sample of the request format**

```sh
curl --location --request POST 'localhost:3000/analyze/tasks' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'input=2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10'

```

**Sample of the response format**

```
1 7.50
2 10.00
PT 7.50
US 10.00
```



## Running Application as Vest.com

- From your browser or rest client visit `https://rockettest.vercel.app`

 #### API Endpoint

- *POST* `/analyze/tasks`
- *params* input

**Sample of the request format**

```sh
curl --location --request POST 'https://rockettest.vercel.app/analyze/tasks' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'input=2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10'

```

**Sample of the response format**

```
1 7.50
2 10.00
PT 7.50
US 10.00
```



## Using as npm package

Lets say the project is published as an npm package called 'coolnumbers'. To use it in your code:

```ts
import { analyzeTasks } from 'coolnumbers

analyzeTasks(`
2
1 PT
2 US
3
1 1 10
2 1 5
3 2 10
`)
```

## Testing the application

The application is tested with jest. To run the test suites run:

```sh
npm test
```
