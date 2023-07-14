import React, {useContext} from 'react'
import { MovieList } from '../componentes';
import Button from 'react-bootstrap/Button';
import { MovieContext } from '../context/MovieContext';

export const HomePage = () => {
  const {onClickLoadMore, onClickLess} = useContext(MovieContext)

  return (
    <>
      <MovieList/>
        <div className="paginacion">
                              
        <Button variant="secondary" onClick={onClickLess}>Anterior</Button>
        <Button variant="secondary" onClick={onClickLoadMore} >Siguiente</Button>
      </div>
        
    </>
    
  )
}
