# Running game-picker

## First set up your API_KEY for RAWG

You need an API_KEY in order to access the game data being pulled from RAWG. See [here](https://rawg.io/apidocs) for guide on setup

## Create environment variable for your key

Create a file .env in the root of this project and add an environment variable called REACT_APP_API_KEY

*.env*
```
REACT_APP_API_KEY = '<your-key-here>'
```

## And last, run the app

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
