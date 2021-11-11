import React, { useState, useContext } from 'react';

import api from '../../config/configApi';
import { Redirect, Link } from "react-router-dom";
import { AlertDanger, ButtonSuccess } from '../../styles/custom_adm';

import { Context } from '../../Context/AuthContext';

export const Login = () => {

    const { signIn } = useContext(Context);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const [user, setUser] = useState({
        email: '',
        password: '',
        loading: false
    });

    ///pega o valor do input
    const valorInput = e => setUser({ ...user, [e.target.name]: e.target.value })

    const loginSubmit = async e => {
        e.preventDefault();

        setStatus({ loading: true });

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        await api.post("/login", user, headers)
            .then((response) => {

                localStorage.setItem('token', response.data.token);
                signIn(true);
                setStatus({
                    type: 'redSuccess',
                    loading: false
                })

            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem,
                        loading: false
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente mais tarde!",
                        loading: false
                    });
                }
            })

    }

    return (
        <>

            <h1>Login</h1>
            {status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger>
                :
                <p style={{ color: "green" }}>{status.mensagem}</p>}

            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: "/dashboard"
            }} />
                : ""}
            <form onSubmit={loginSubmit}>
                <label>E-mail: </label>
                <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput} /><br /><br />
                <label>Senha: </label>
                <input type="password" name="password" placeholder="Digite a senha" autoComplete="on" onChange={valorInput} /><br /><br />


                {status.loading ? <button type="submit" disabled>Acessando...</button> : <button type="submit">Acessar</button>}


            </form><br />
            <p>Ainda não é cadastrado?</p>

            <Link to={"/cadastrar-user"}>
                <button>Criar Conta</button>
            </Link>
        </>
    );
}