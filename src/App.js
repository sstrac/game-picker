import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY
const emptyGame = { name: 'Click to get a random game', background_image: 'not found' }

function API(title) { return `https://api.rawg.io/api/games/${title}?key=${API_KEY}` }

const titles = [
  'hollow-knight',
  'grounded'
]

function App() {
  const [game, setGame] = useState(emptyGame)
  const [title, setTitle] = useState('hollow-knight')

  useEffect(() => {
    getRAWGData(title).then( game => {
      console.log(game)
      setGame(game)
    })
    .catch(error => console.log(error))
  }, [title])

  return (
    <div className={"App"}>
      <Game game={game} setGame={setGame}></Game>
      <Button variant="primary" onClick={() => setTitle(titles[getRandom(titles.length)])}>Random Game</Button>
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

function getRandom(len){
  return Math.floor(Math.random() * len)
}

export default App;