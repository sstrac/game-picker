import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY

export function API(title) { return `https://api.rawg.io/api/games/${title}?key=${API_KEY}` }

const emptyGame = { name: 'default name', background_image: 'not found' }

function App() {
  const [game, setGame] = useState(emptyGame)

  useEffect(() => {
    getRAWGData('hollow-knight').then( game => {
      console.log(game)
      setGame(game)
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <div className={"App"}>
      <Game game={game} setGame={setGame}></Game>
    </div>
  );
}

function Game(props) {
  return (
    <div>
      <h2>{props.game.name}</h2>
      <img src={props.game.background_image}></img>
    </div>
  )
}

async function getRAWGData(title){
  return await fetch(API(title))
  .then(r => r.json())
  .then(resJson =>  resJson )
}

export default App;