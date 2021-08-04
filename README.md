# Livestreaming (ohmystream.co)

To check out a live demo login via email [HERE](https://www.ohmystream.co/)

Web based software where users can record themselves in the browser and stream simultaneously to Youtube, Facebook, and Twitch.

Frontend is built using react js and hosted on an EC2 instance on Amazon. Backend is build using node js + express and is also hosted on EC2. Database is postgres and being hosted in production on Heroku free tier. The livestreaming is enabled using websockets and ffmpeg.

On the client the code that sends the livestream to the server is in the client/containers/Broadcast/Broadcast.js file. On the server the ws are enabled in server/server.js file.

## Todo

- [Trello](https://trello.com/b/W8LZ83oV/livestream)

## Tech/framework used

Frontend tech stack:

- React JS
- CSS
- React Router
- React Icons

Backend tech stack:

- Node JS
- Express
- [node-media-server](https://github.com/illuspas/Node-Media-Server)
- [ffmpeg](http://ffmpeg.org/)
- [ws](https://github.com/websockets/ws)

## Installation

To run this project, install it locally using npm:

```
$ cd client
$ npm install
$ npm start
```

```
$ cd server
$ npm install
$ node server.js
```

## Contribute

Feel free to use code however you would like.

If you have any questions feel free to email me at toshvelaga@gmail.com

## License

MIT
