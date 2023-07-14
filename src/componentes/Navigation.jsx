import React, {useContext} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

import Admin from "../componentes/auth/Admin";
import firebaseApp from "../firebaseConfig/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);


export const Navigation = ({user}) => {

    const { onInputChange, valueSearch, onResetForm, getGlobalMovies } = useContext(MovieContext);
    
	const navigate = useNavigate();
	

	const onSearchSubmit = (e) => {
		e.preventDefault();
		getGlobalMovies(valueSearch)
		navigate('/search', {
			state: valueSearch,
		});

		onResetForm();
	};

	function cerrar () {
		navigate("/");
		signOut(auth);
		
	
	  } 


	  

  return (
    <>
			<header className='header col'>
			<div className="row">
				<Link to='/' className='logo col-md-6'>
					<img
						src="../ambpelislogo-192x192.png"
                        width="30"
                        height="90"
                        className="d-inline-block align-top"
                        alt="AMBPelis Logo"
					/>
				</Link>
               

				<form onSubmit={onSearchSubmit} className='col-md-6'>
					<div className='row'>
						
						<div className='form-group col-md-6'>
							
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='icon-search'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
								/>
							</svg>
							<input
								type='search'
								name='valueSearch'
								id=''
								value={valueSearch}
								onChange={onInputChange}
								placeholder='Buscar Pelicula'
							/>
						</div>
						<div className='col-md-6'>

							<button className='btn-search'>Buscar</button>
						</div>
					</div>
				</form>
				
			</div>
			</header>

			<Outlet />
		</>
	);
}
