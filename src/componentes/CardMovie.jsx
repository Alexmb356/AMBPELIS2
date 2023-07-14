import React from 'react';
import { URL_IMAGE } from './API/apiconf';
import { Link } from 'react-router-dom';

export const CardMovie = ({movie}) => {
  return (
    <Link to={`/movie/${movie.id}`} className='card-movie'>
			  <div className='card-img'>
				<img
					src={`${URL_IMAGE + movie.poster_path}`}
					alt={`Movie ${movie.title}`}
          height={600}
          width="100%"
				/>
			</div>
			<div className='card-info'>
				<span className='Movie-id'>Popularidad {movie.popularity}</span>
				<h6>{movie.title}</h6>
				<div className='card-types'>
					{/*{movie.genre_ids.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
          ))}*/}
				</div>
			</div>
    </Link>
  )
};
