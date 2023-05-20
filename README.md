# Livestreaming (ohmystream.co)

NOTE: I am no longer actively maintaining this project. The production postgres DB is no longer running. If you want a simple example of how to use FFmpeg to restream check out [this repo](https://github.com/toshvelaga/twitch-streamer).

<img width="1185" alt="Screen Shot 2022-03-16 at 10 56 12 PM" src="https://user-images.githubusercontent.com/38474161/190875346-3aeaa8f2-8e6e-4f3b-b348-d386b8c14291.png">

<a href="https://www.loom.com/share/35a86c6f73d144d59527092118cf525d">
    <p>Ohmystream demo - Watch Video</p>
    <img alt='Ohmystream demo video thumbnail' style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/35a86c6f73d144d59527092118cf525d-1633809954506-with-play.gif">
</a>

Check out the app [HERE](https://ohmystream.co/)

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
- [react-hot-toast](https://github.com/timolins/react-hot-toast)

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

Feel free to also reach out to me on twitter at @t0xsh

## License

MIT
