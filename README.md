# Advanced Tic-Tac-Toe

## Deployed live version:

https://advanced-tic-tac-toe-anandpap.vercel.app/

### Basic featuers of this game app are:

1.  Play Tic-Tac-Toe game vs another player

2.  Or battle it out with computer of various difficulties

3.  Review past games with live scoreboard, and inspect specific matchups on each player's profile page

4.  App is responsive

### Technologies used in this project:

1. **React** with **Typescript** and following packages:

   - _vite_ for bootstrapping project

   - _react-router_ for routing purposes

   - _react-redux_ with _@reduxjs/toolkit_ for state management

   - _axios_ for making easier HTTP requests to server and response handling

2. **Node.js** with **Typescript** and following packages:

   - **_Express_** as Node.js web application framework

   - _mongoose_ as MongoDB object modeling tool

3. **MongoDB**, using _MongoDB Compass_ GUI as a tool for analyzing _MongoDB_ data

### To get a local copy up and running, follow these steps:

1.  Clone the repository using your terminal: `git clone https://github.com/AnandPap/advanced-tic-tac-toe.git`

2.  Afterward, open client folder located inside advanced-tic-tac-toe folder, and run `npm install` to install NPM packages. Then, run `npm run preview` to start the frontend side of the project.

3.  Next, navigate to server folder and create `.env` file inside of it with the following variable: `MONGO = "connection_string"` where connection_string is MongoDB URI that you get when you create and connect to your own Mongo cluster. If the aforementioned variable isn't provided, the fallback value found in the config.js file will be used. In that case, you will need to have downloaded and installed corresponding MongoDB Community Server.

4.  After that, run `npm install` while still inside the server folder to install NPM packages, and then run `npm run start` to start the backend side of the project.

5.  Open http://localhost:4173 to view it in the browser.

6.  Have fun exploring Tic-Tac-Toe app!
