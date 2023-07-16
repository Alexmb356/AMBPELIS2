import React, {useContext } from 'react';
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
import Offcanvas from 'react-bootstrap/Offcanvas';
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

	function cerrarSesion () {
		navigate("/");
		signOut(auth);
		
	
	  } 

	// Función para cerrar el menú hamburguesa al scrollear
    const handleTogglerNav = e =>{
        
        const basicNavBar = document.getElementById("basic-navbar-nav");
        
        window.addEventListener("scroll", ()=>{
          if(basicNavBar.classList.contains("show")){
            e.target.click();
          }
        });

    }


	  

  return (
    <>
			<header className='header col'>
				
			<Navbar expand="md"  data-bs-theme="dark">
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
					<Navbar.Toggle onClick={e => handleTogglerNav(e)} aria-controls="basic-navbar-nav" />
					<Navbar.Collapse className="ml-auto" id="basic-navbar-nav">
						<Navbar.Offcanvas
						id="basic-navbar-nav"
						aria-labelledby="basic-navbar-nav"
						placement="end"
						className='justify-content-end'
						
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id="basic-navbar-nav">
								AMBPELIS
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
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
								<Nav className="me-auto my-2 my-lg-0 justify-content-end text-uppercase" style={{ maxHeight: '200px' }} navbarScroll>
									{user === null ? (<>
										<Nav.Link href="/Login" >Iniciar sesion</Nav.Link>
									</>) : (
										<>
											<NavDropdown title={user.nombre} id="basic-navbar-nav" className='text-success'>
												<NavDropdown.Item href={`/perfil/${user.uid}`}>Perfil</NavDropdown.Item>
												<NavDropdown.Item href="/" onClick={cerrarSesion}>
													Cerrar sesión
													
												</NavDropdown.Item>
												{user.rol ===  "admin" ? (<>
												<NavDropdown.Item  href="/Admin">Administrar</NavDropdown.Item>
												</>) : null}
													

												
											</NavDropdown>
										</>
									)}
								</Nav>	
								

							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Navbar.Collapse>
      			</Container>


			</Navbar>
			
			
          
  
			</header>

			<Outlet />
		</>
	);
}

export default Navigation;
