import React,{useRef,useEffect, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title,category}) => {
  const [apiData,setApiData] = useState([])
  const cardsRef =useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODM1MTk5YjMxMWNkZmM5MjIxNWQ0YWI2MTQxZThlYSIsIm5iZiI6MTcyMTA1MTQyNy4zNzY2MjQsInN1YiI6IjY2OTUyODA1MTJkY2FhOWM0NDY2MGE3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UJfXtQczkb5p9isfAGK_1tdNaowccinr2XVAlkLwTxg'
    }
  };
  
  const handleWheel= (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response =>{
      console.log(response.results[0].backdrop_path)
      setApiData(response.results)
    })
    .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])


  return (
    <div className='title-Cards'>
      <h2>{title ? title : "Popular on Netflix"} </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          console.log(card.id,'carddddddddddddddddddd');
          return < Link to={`/player/${card.id}`}  className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
