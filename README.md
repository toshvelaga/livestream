# Livestreaming (ohmystream.co)

<span style="display:block" class="note">
  <img src="https://readmeassets.s3.us-east-2.amazonaws.com/Screen+Shot+2021-08-22+at+2.25.26+PM.png">
</span>

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/35a86c6f73d144d59527092118cf525d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Check out a live demo [HERE](https://ohmystream.co/)

Web based software to record a livestream in the browser and stream simultaneously to Youtube, Facebook, and Twitch. Software is similar in functionality to OBS and streamlabs.

Frontend is built using React JS. Backend is build using Node + Express. Database is postgres. The livestreaming is enabled using websockets and ffmpeg.

On the client the code that sends the livestream to the server is in the client/containers/Broadcast/Broadcast.js file. On the server the websockets are enabled in server/server.js file.

## Todo

- [Trello](https://trello.com/b/W8LZ83oV/ohmystream)

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
- [nodemailer](https://nodemailer.com/about/)

## Installation

To run this project, install it locally using npm:

```
$ cd client
$ npm install
$ npm start
```

For the server create a .env file with the variables from env.example

```
$ cd server
$ touch .env
$ npm install
$ node server.js
```

## Contribute

Feel free to use code however you would like.

If you have any questions feel free to email me at toshvelaga@gmail.com

## License

MIT
