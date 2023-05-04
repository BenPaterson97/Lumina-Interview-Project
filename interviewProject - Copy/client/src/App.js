import React, { useState, useEffect } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import Button from "./components/Button";
import Table from "./components/Table";

// OMDb API variables
const apikey = "d4bf15cd";
const omdburl = "http://www.omdbapi.com/?apikey=" + apikey;

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [movieData, setMovieData] = useState([]);

  // on start-up
  useEffect(() => {
    fetch("/get")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((err) => console.log("error: get"));
  }, []);

  // get the ids of the users favourite movies
  const getMovieIDs = () => {
    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    var movieIDs = "";

    // for each entry in the database
    for (let x in backendData) {
      // if the name matches
      if (
        backendData[x].firstname.toLowerCase() === firstName.toLowerCase() &&
        backendData[x].lastname.toLowerCase() === lastName.toLowerCase()
      ) {
        movieIDs = backendData[x].favourite_movies; // store the list of favourite movies
      }
    }
    return movieIDs;
  };

  const handleDataDisplay = async () => {
    var movieData = [];
    let movieIDs = getMovieIDs().split(","); // split list of movies into an array

    // for each movie
    for (let i in movieIDs) {
      try {
        const data = await (await fetch(omdburl + "&i=" + movieIDs[i])).json(); // get the data for that movie

        // push that onto an array of data
        movieData.push({
          id: movieIDs[i],
          title: data.Title,
          plot: data.Plot,
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    setMovieData(movieData);
  };

  // test function for inserting data
  const getMovieID = () => {
    return "tt3896198";
  };

  // event on pressing the 2nd button **IMPORTANT: Currently not working (Proxy error: Could not proxy request /insert from...)**
  const handleUpdateData = () => {
    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let newMovie = document.getElementById("favMovieInput").value;

    let movieID = getMovieID();

    fetch("/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        favourite_movies: movieID,
      }),
    })
      .then((res) => res.json())
      .then((data) => setBackendData(data))
      .catch((err) => console.log(err));
    console.log(newMovie);
  };

  return (
    <div className="container text-center">
      <h1>Your Favourite Movies</h1>
      <div className="row">
        <div className="col">
          <UserInput placeholder="First Name" id="firstNameInput" />
          <UserInput placeholder="Last Name" id="lastNameInput" />
          <Button label="Go" onClick={handleDataDisplay} />
          <UserInput placeholder="Favourite Movie" id="favMovieInput" />
          <Button label="Add" onClick={handleUpdateData} />
        </div>
        <div className="col-8">
          <Table movies={movieData} />
        </div>
      </div>
    </div>
  );
}

export default App;
