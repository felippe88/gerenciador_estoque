

import api from '../config/configApi';



import React, { useState, createContext, useEffect } from 'react';



const Context = createContext();



function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getLogin = async () => {
            const token = localStorage.getItem('token');
            
            if(token){
                api.defaults.headers.Authorization = `Bearer ${(token)}`;
                setAuthenticated(true);
                

            }
            
            setLoading(false);
            
        }

        getLogin();
    }, []);




    function signIn(sit){
        setAuthenticated(sit);
    }


    const valUser = async () => {
        const valueToken = localStorage.getItem('token');

        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + valueToken
            }
        }
        
        api.get("/val-token", headers)
        .then(() => {
            return true;
        }).catch(() => {
            
            localStorage.removeItem('token');
            setAuthenticated(false);
            return false;
        });
    }


    if(loading){
        return <h1>Carregando</h1>;
        
    }

    function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
    }

    return (
        <Context.Provider value={{authenticated, handleLogout, signIn, valUser}}>
            {/*Children pega todas as rotas */}
            {children}

        </Context.Provider>
    )
}

export {Context, AuthProvider};