import React, {useContext, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import firebaseApp from "../firebaseConfig/firebase";
import { getAuth, signOut } from "firebase/auth";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const auth = getAuth(firebaseApp);


function Navigation ({user}) {
	
 
    const { onInputChange, valueSearch, onResetForm, getGlobalMovies } = useContext(MovieContext);
    
	const navigate = useNavigate();
	
	//console.log("Este es el usuario",user)
	const onSearchSubmit = (e) => {
		e.preventDefault();
		getGlobalMovies(valueSearch)
		navigate('/search', {
			state: valueSearch,
		});

		onResetForm();
	};

	/*function cerrarSesion () {
		navigate("/");
		signOut(auth);
		closeMenu();
		logincerrar ()
	
	  } */

	const cerrarSesion = () => {
		Swal.fire({
			title: 'Cerrar Sesión?',
			text: "Estas seguro de cerrar sesión ",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Cerrar sesión!'
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Sesión Cerradad!',
				'Tu sesión a finalizado.',
				'success',
				
				signOut(auth),
				navigate("/"),
				closeMenu()
			  )
			}
		  })

    }
	
	  const linkStyles = {
		textDecoration: 'none'
	  };

	// Función para cerrar el menú hamburguesa al scrollear
	const [menuOpen, setMenuOpen] = useState(false);
  
	const closeMenu = () => {
		setMenuOpen(false);
	  };

	console.log("estado",menuOpen)

	useEffect(() => {
		const timer = setTimeout(() => {
		  setMenuOpen(false);
		}, 2000);
	  
		return () => clearTimeout(timer);
	  }, []);


	  

  return (
    <>
			<header className='header col'>
				
			<Navbar collapseOnSelect expand="md"  data-bs-theme="dark">
				<Container fluid>
					<Navbar.Brand href="/" className='logo'>

						<img
							src="../ambpelislogo-192x192.png"
							width="30"
							height="200"
							className="d-inline-block align-top"
							alt="AMBPelis Logo"
						/>


					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav"   onClick={() => setMenuOpen(!menuOpen)} />
					<Navbar.Collapse className="ml-auto justify-content-end" id="responsive-navbar-nav">
					<Nav className="me-auto">
							
								<Form className="d-flex" onSubmit={onSearchSubmit}>
									<Form.Control
									type="search"
									placeholder="Search"
									className="me-2"
									aria-label="Search"
									value={valueSearch}
									onChange={onInputChange}
									name='valueSearch'
									/>
									<Button variant="outline-success" type="submit">Search</Button>
								</Form>
								<Nav className="me-auto my-2 my-lg-0 justify-content-end text-uppercase ml-4" style={{ maxHeight: '200px' }} navbarScroll>
									{user === null ? (<>
										<Nav.Link ><Link to= "/Login" style={linkStyles} onClick={closeMenu} >Iniciar sesion</Link></Nav.Link>
										
									</>) : (
										<>
											<NavDropdown title={user.nombre} id="basic-navbar-nav" className='text-success'>
												<NavDropdown.Item ><Link to= {`/perfil/${user.uid}`} style={linkStyles} onClick={closeMenu} >Perfil</Link></NavDropdown.Item>
												<NavDropdown.Item ><Link to= "#" onClick={cerrarSesion} style={linkStyles}>
													Cerrar sesión
													</Link>
												</NavDropdown.Item>
												{user.rol ===  "admin" ? (<>
												<NavDropdown.Item> <Link to= "/Admin" style={linkStyles} onClick={closeMenu}>Administrar</Link></NavDropdown.Item>
												</>) : null}
													

												
											</NavDropdown>
										</>
									)}
								</Nav>	
								

							</Nav>
					</Navbar.Collapse>
      			</Container>


			</Navbar>
			
			
          
  
			</header>

			<Outlet />
		</>
	);
}

export default Navigation;
