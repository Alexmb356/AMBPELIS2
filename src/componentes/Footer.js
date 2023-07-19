import React from 'react'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    
  const fechaActual = new Date();
  
  return(

      <footer className="mt-4 text-center">
            <div className="d-flex justify-content-center align-items-center mt-4">
              <a href="/">
                  <img alt="Icono ambpelis" src="../ambpelislogo-192x192.png" width={100} className="svg-icon items-center" />
                  
              </a>
             
              
              
          </div>
          <br/>
          <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
            <p className="mt-4 text-white">Copyright © 2023 - All right reserved- Alexander Mora &copy; {fechaActual.getFullYear()}</p>
            
          </div>

          <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
                                             
                  <h3 className='h4 text-white'>Nuestras redes</h3>
                  <Link to="https://www.linkedin.com/in/alexmb356/" target="_blank" className='mr-2 fw-bolder  text-white'>
                      <h4><FontAwesomeIcon icon={faLinkedin} style={{color: "#f7f7f7",}} size='lg'/> Alexander Mora</h4>
                  </Link>
                 
            </div>
            <br/>
            <br/>
             
              
        

      </footer>
  );
}
