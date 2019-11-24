# SocketMan
Websockets based, multiplayer hangman game. Hosted on AWS at http://socketman.us-east-1.elasticbeanstalk.com/

## Technologies Used
- React
- Redux
- Websockets
- ExpressJS Server
- NoSQL Database (MongoDB)
- AWS (Elastic Beanstalk)
- Webpack


## Description
- Play online with multiple players.
- Either type or click letters to play the game.
- For a new question press 'enter' or click on the NEW QUESTION text.


## React Strucutre:
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
```