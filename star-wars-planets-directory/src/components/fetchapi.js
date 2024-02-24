import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../App.css';

function FetchApi() {
  const [planetsData, setPlanetsData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setPlanetsData(response.data.results);
      setNextPage(response.data.next);
      setPrevious(response.data.previous);
      setError(null);

    } catch (error) {
      console.error('Error fetching planets:', error);
      setError('An error occurred while fetching planets. Please try again later.');
    }finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (previous) {
        fetchPlanets(previous);
    }
  };
  
  //momorize to prevent re-rendering
  const momorizedPlanetsData = useMemo(() => planetsData, [planetsData]);

  return (
    <>
    <h1 className='heading'>Star Wars Planets</h1>
    <div className='card-container'>
       {loading && (
        <div className='loading-indicator'>
          <p>Loading...</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {momorizedPlanetsData.map(planet => (
        <div className='cards' key={planet.url}>
          <h3 className='card-title'>{planet.name}</h3>
          <p>Climate: {planet.climate}</p>
          <p>Population: {planet.population}</p>
          <Residents residentsUrls={planet.residents} />
        </div>
      ))}
      <div className='pagination'>
        <button onClick={handlePrevPage} disabled={!nextPage}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={!nextPage}>
          Next Page
        </button>
      </div>
    </div></>
  );
}

function Residents({ residentsUrls }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentsData = await Promise.all(
        residentsUrls.map(url => axios.get(url))
      );
      const residents = residentsData.map(response => response.data);
      setResidents(residents);
    };

    fetchResidents();
  }, [residentsUrls]);

  return (
    <div>
      <h4>Residents:</h4>
      <ul>
        {residents.map(resident => (
          <li key={resident.url}>
            <p>Name: {resident.name}</p>
            <p>Height: {resident.height}</p>
            <p>Mass: {resident.mass}</p>
            <p>Gender: {resident.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchApi;
