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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { text } from '@fortawesome/fontawesome-svg-core';
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
		textDecoration: 'none',
		color: 'white'
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
					<Navbar.Toggle aria-controls="responsive-navbar-nav" style={linkStyles }  onClick={() => setMenuOpen(!menuOpen)} />
					<Navbar.Collapse className="ml-auto " id="responsive-navbar-nav" >
					<Nav className="mr-auto justify-end">
						<Nav.Link as={Link} to="/" className='me-auto' style={linkStyles }><FontAwesomeIcon icon={faHouse} style={{color: "#fafafa",}} /> Inicio</Nav.Link>
					</Nav>
					<Nav className="mr-auto justify-end">
						<Nav className="mr-auto justify-content-center" style={{ maxHeight: '200px' }} navbarScroll>
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
						</Nav>
								<Nav className="mr-auto justify-content-center" style={{ maxHeight: '200px' }} navbarScroll>
									{user === null ? (<>
										<Nav.Link as={Link} to="/Login" style={linkStyles } onClick={closeMenu}  ><FontAwesomeIcon icon={faCircleUser} style={{color: "#fafafa",}} /> Iniciar sesion</Nav.Link>
										
									</>) : (
										<>
											<NavDropdown title={user.nombre} id="basic-navbar-nav" className='text-success'>
												<NavDropdown.Item as={Link} to={`/perfil/${user.uid}`} style={linkStyles} onClick={closeMenu} >Perfil</NavDropdown.Item>
												<NavDropdown.Item as={Link} to= "#" onClick={cerrarSesion} style={linkStyles}>
													Cerrar sesión
													
												</NavDropdown.Item>
												{user.rol ===  "admin" ? (<>
												<NavDropdown.Item as={Link} to= "/Admin" style={linkStyles} onClick={closeMenu}>Administrar</NavDropdown.Item>
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
