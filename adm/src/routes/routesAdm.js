import React, { useContext } from "react";

import { Switch, Route, Redirect } from 'react-router-dom';
import {Context} from '../Context/AuthContext';


import { Login } from '../pages/Login';
import { CadastrarUsuario } from '../pages/CadastrarUsuario';
import { Dashboard } from '../pages/Dashboard';
import { Listar } from '../pages/Listar';
import { Visualizar } from '../pages/Visualizar';
import { Cadastrar } from '../pages/Cadastrar';
import { Editar } from '../pages/Editar';


function CustomRoute({isPrivate,...rest}){
    const {authenticated, valUser} = useContext(Context);
    
    valUser();
    
    if(isPrivate && !authenticated){
        return <Redirect to="/" />
    }
    
    
    return <Route {...rest} />

    
}

export default function RoutesAdm(){
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute exact path="/cadastrar-user" component={CadastrarUsuario} />
            <CustomRoute exact isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute exact isPrivate path="/listar" component={Listar} />
            <CustomRoute exact isPrivate path="/visualizar/:id" component={Visualizar} />
            <CustomRoute exact isPrivate path="/cadastrar" component={Cadastrar} />
            <CustomRoute exact isPrivate path="/editar/:id" component={Editar} />
          </Switch>
    );
}
