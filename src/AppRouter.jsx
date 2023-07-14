import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import { Navigation } from "./componentes/Navigation";
import Login from './componentes/auth/Login';
import Admin from './componentes/auth/Admin';
import Registrarse from './componentes/auth/Registrarse';
import Mostrar from './componentes/auth/Mostrar';
import Editar from './componentes/auth/Editar';
import { HomePage, MoviePage, SearchPage } from "./pages";


export const AppRouter = () => {
    return(
        <Routes>
            <Route path ='/' element={<Navigation/>}>
                <Route index element={<HomePage/>}/>
                <Route path='movie/:id' element={<MoviePage/>}/>
                <Route path="search" element={<SearchPage/>} />
                <Route path='/Login' element={<Login/>}/>
                <Route path='/Admin' element={<Admin/>}/>
                <Route path='/Mostrar' element={<Mostrar/>}/>
                <Route path='/editarusuario/:id' element={<Editar/>}/>
                <Route path='/Registrarse' element={<Registrarse/>}/>


            </Route>
            

            <Route path='*' element={<Navigate to='/'/>}/>

        </Routes>

    )
    
};