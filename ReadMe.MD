## User Activity Report

This application is written with NodeJS using typescript.

### Installation steps

- Install NodeJS and NPM. Use this link and follow the steps for your own operating system https://nodejs.org/en/download/

- From your terminal or command line run
    
    - `git clone git@github.com:bestbrain10/rockettest.git`

    - `cd rockettest`

    - `npm install`

### Building the project

The project is written in typescript. To run, it has to first be built to ES5(Javascript) in the `build` folder.

- run `npm run build`


#### Running Application as API Locally

 - Run `npm run start`

 - Alternatively, if you want to make changes and see your changes immiediately you make them then start the application in development mode using `npm run start:dev`

 - From your browser or rest client visit `http://localhost:3000`

 ##### API Endpoints

- *POST* `/tasks`

- *POST* `/analyze`