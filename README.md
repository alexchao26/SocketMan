# SocketMan
Websockets based, multiplayer hangman game. Hosted on ~~AWS at http://socketman.us-east-1.elasticbeanstalk.com/~~ heroku at https://socket-man.herokuapp.com/

## Technologies Used
- React
- Redux & Redux-Thunk
- Websockets
- ExpressJS Server
- NoSQL Database
- ~~AWS (Elastic Beanstalk)~~
- Webpack
  - HMR
  - GZip Compression

## Description
- Play online with multiple players.
- Either type or click letters to play the game.
- For a new question press 'enter' or click on the NEW QUESTION text.

## React Structure
```
|--- App
  |--- Default Container
    |--- GameRoom
      |--- Header
      |--- HangingDude
      |--- LetterWrapper
        |--- AnswerViewer
        |--- LetterSelector
      |--- Clue
      |--- HangViewer
      |--- GameOver
```
## To Run Locally
  1. Clone this repo
  2. Install dependencies with `npm install`
  3. Run development server w/ `npm run dev` OR run production build and server start together using `npm run build-start`
