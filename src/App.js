import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY
const emptyGame = { id: '0', name: 'Click to get a random game', background_image: 'not found' }

function API(title) { return `https://api.rawg.io/api/games/${title}?key=${API_KEY}` }

const titles = [
  'hollow-knight',
  'oblivion',
  'dragon-age-origins',
  'stalker-shadow-of-chernobyl'
]

function App() {
  const [games, setGames] = useState([emptyGame])
  const [titles, setTitles] = useState([''])

  useEffect(() => {
    let gameDataPromises = titles.map(async title => {      
      return getRAWGData(title)
    })
    
    Promise.all(gameDataPromises).then((games) => {
      setGames(games)
    })
  }, [titles])

  return (
    <div className={"App"}>
      <div className={"Games"}>
        {games.map( g => <Game key={g.id} game={g}></Game>)}
      </div>
      <Button variant="primary" onClick={() => choose3UniqueTitlesRandomly(setTitles)}>Random Games</Button>
    </div>
  );
}

function Game(props) {
  return (
    <div>
      <h2>{props.game.name}</h2>
      <img src={props.game.background_image} height={"400"}></img>
    </div>
  )
}

function choose3UniqueTitlesRandomly(setTitles){
  let randomTitles = []
  let alreadyChosen = []
  for(let i=0; i<3; i++) {
    let index = getRandomIndexInTitles(titles.length)
    
    while( alreadyChosen.includes(index) ){
      index = getRandomIndexInTitles(titles.length)
    }
    alreadyChosen.push(index)
    randomTitles.push(titles[index])
  }

  setTitles(randomTitles)
}

async function getRAWGData(title){
  console.log(API(title))
  return await fetch(API(title))
  .then(r => r.json())
  .then(resJson =>  resJson )
  .catch(error => {
    console.log(error)
    return emptyGame
  })
}

function getRandomIndexInTitles(len){
  return Math.floor(Math.random() * len)
}

export default App;