# Advanced Tic-Tac-Toe

Project has been completed but with little more work to be done and that is:

1. Implement hard computer player.
2. Implement scoreboard.

> **Note** Rest of implementations and fixes are coming soon!

## Deployed version:

https://advanced-tic-tac-toe-anandpap.vercel.app/

## To get a local copy up and running follow these steps:

#### 1. Clone the repository: `git clone https://github.com/AnandPap/advanced-tic-tac-toe.git`

#### 2. Open client folder in your terminal which is located inside advanced-tic-tac-toe folder and run `npm install` to install NPM packages then run `npm run dev` while still inside client folder to start the frontend side of the project.

#### 3. Next, open server folder and create `.env` file inside of it with following variable: `MONGO = "connection_string"` where connection_string is MongoDB URI that you get when you create and connect to your own Mongo cluster. If the aformentioned variable isn't provided, fallback will be used found in config.js file.

#### 4. After that run `npm install` while still inside server folder to install NPM packages and then run `npm run dev` to start the backend side of the project.

#### 5. Open http://localhost:5173 to view it in the browser.

#### 6. Have fun exploring Tic-Tac-Toe app!
