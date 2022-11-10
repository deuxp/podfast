# Podfast

A publishing platform for short podcasts called minicasts.
Users can record and share short audio snippets recorded right in the browser and post it to the minicast public feed.

Users may also favourite other minicasts as well as create a share-able link.

\***\*This is a Demo app that runs locally. For educations purposes only**.

> _"Want to find great podcasters but don't have the time to invest? PodFast! It is a podcast publishing platform for short (up to 45 seconds) minicasts. Find your next fave minicaster, or become a minicaster and create your own!"_

![animatied gif of app usage](public/podfast.gif)

# Clone the repository

```
$ git clone https://github.com/deuxp/podfast
```

# Install Dependencies

In the project directory run:

```
$ npm install
```

# Cloud Storage & Environment Variables

When a minicast is created, the audiofile and the banner image are stored in a [Firebase storage bucket](https://firebase.google.com/). To link it to the app, create a `.env` file in the root of the project directory and paste in the following with your own Firebase Config keys:

```
REACT_APP_API_KEY="your keys here"
REACT_APP_AUTH_DOMAIN="your keys here"
REACT_APP_PROJECT_ID="your keys here"
REACT_APP_STORAGE_BUCKET="your keys here"
REACT_APP_MESSAGING_SENDER_ID="your keys here"
REACT_APP_APP_ID="your keys here"
REACT_APP_MEASUREMENT_ID="your keys here"
```

The file structure of the storage bucket should reflect the following:

```
root
|_
| \imgs
|_
  \minicasts

```

# API server

Podfast also utilizes the [Podfast API server](https://github.com/deuxp/podfast-API) which needs to be cloned and running in its own directory.

# Run locally

```
$ npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### _Dependencies_:

- React 18.1.0
- Axios 0.27.2
- Firebase 9.7.0
- React Router v6
- Mic-recorder-to-mp3 2.2.2
- MUI
- UUID

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
