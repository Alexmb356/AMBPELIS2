import {Link} from 'react-router-dom';

import React from 'react'

function Admin() {
    return (
        <div className='Container'>
            <div className='Container'>
                <form action="#" className=" h-full  relative z-2 m-2 px-10">
                    <fieldset className="formulario-contacto__contenido">
                        <legend className="formulario-contacto__contenido__titulo text-3xl text-center mb-2">MENU ADMINISTRADOR</legend>
                        <div className='text-center'>
                        <br/>
                                    <Link to="/Mostrar" className="flex self-center text-center m-2 hover:text-gray-500 mx-5"><strong>USUARIOS</strong></Link> <br/>
                                    <Link to="/Registrarse" className="flex self-center text-center  m-2 hover:text-gray-500 mx-5"><strong>REGISTRO</strong></Link> <br/>
                                    

                        </div>  
                    </fieldset>
                    <fieldset className="formulario-contacto__contenido">
                        <legend className="formulario-contacto__contenido__titulo text-3xl text-center mb-2">Gestión de Productos</legend>
                        <div className='text-center'>
                            <br />
                            <Link to="/CrearProductos" className="flex self-center text-center m-2 hover:text-gray-500 mx-5"><strong>Crear productos</strong></Link> <br />
                            <Link to="/MostrarProductos" className="flex self-center text-center  m-2 hover:text-gray-500 mx-5"><strong>Mostrar productos</strong></Link> <br />
                            <Link to="/EditarProductos" className="flex self-center text-center  m-2 hover:text-gray-500 mx-5"><strong>Editar Productos</strong></Link> <br />

                        </div>
                    </fieldset>
                </form>

            </div>
        
            
        </div>
        
    )
}

export default Admin

