import React, {useContext} from 'react'
import { MovieContext } from '../context/MovieContext';
import { CardMovie } from './CardMovie';
import {Loader} from './Loader';


export const MovieList = () => {
  
    const { allMovies, loading } = useContext(MovieContext);

    
  

  return (
    <>
			{loading ? (
				<Loader />
			) : (
        <div className='card-list-pokemon container'>
          {allMovies.map((movie)=> (
              <CardMovie movie={movie} key={movie.id} />
          ))}
        
        </div>

       
        

      )}
    
       
    
    </>
      
    
  )
}
