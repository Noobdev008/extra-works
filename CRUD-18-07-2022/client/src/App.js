import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [update, setUpdate] = useState('');

  const submitReview = () => {
    Axios.post('http://localhost:8000/api/insert', {
      movieName: movieName,
      movieReview: review
    })
    // alert('Successfully inserted')
    setMovieReviewList([...movieReviewList,
    { movieName: movieName, movieReview: review }
    ]);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:8000/api/update", {
      movieName: movie,
      movieReview: update
    });
    setUpdate(" ")
  }
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:8000/api/delete/${movie}`)
  }

  useEffect(() => {
    Axios.get('http://localhost:8000/api/get').then((response) => {
      // console.log(response.data);
      setMovieReviewList(response.data);
    })
  }, [])
  return (
    <>
      <div className="App">
        <h1>Crud Application</h1>
        <div className='form'>
          <lable>Movie Name:</lable>
          <input type="text" name="movieName" onChange={(e) => {
            setMovieName(e.target.value)
          }
          } />
          <lable>Review:</lable>
          <input type="text" name="review" onChange={(e) => {
            setReview(e.target.value)
          }
          } />
          <button onClick={submitReview}>Submit</button>
          {movieReviewList.map((value) => {
            return <div className='card'>
              <h1> {value.movieName}</h1>
              <p>{value.movieReview}</p>

              <button onClick={() => { deleteReview(value.movieName) }}>Delete</button>

              <input type='text' id="update" onChange={(e) => {
                setUpdate(e.target.value)
              }} />
              <button onClick={() => {updateReview(value.movieName)}}>Update</button>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
