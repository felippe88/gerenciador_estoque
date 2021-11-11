import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, ConteudoTitulo, Titulo, BotaoAcao, Form, ButtonInfo, Label, Input, Hr, ButtonSuccess, ButtonDanger, AlertDanger } from '../../styles/custom_adm';
import api from '../../config/configApi';

export const CadastrarUsuario = () => {

   

    const [usuario,setUsuario] = useState({
        nome: '',
        email: '',
        password: ''
       
    });

    const [status,setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setUsuario({...usuario, [e.target.name]: e.target.value});

    const addUsuario = async e => {
        e.preventDefault();


        const headers = {
            'headers': {
                'Content-Type': 'application/json'
                
            }
        }

        await api.post("/cad-usuario", usuario, headers)
        .then((response) => {
            setStatus({
                type: 'redSuccess',
                mensagem: response.data.mensagem
            });
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                });
            }else{
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                });
            }
        })
   

    }


   

    return (
        <Container>
            
            <ConteudoTitulo>
                <Titulo>Cadastrar Usuario</Titulo>
            </ConteudoTitulo>
            
            {status.type === 'error' ? <AlertDanger style={{color: "#ff0000"}}>{status.mensagem}</AlertDanger>
            : 
            <p style={{color: "green"}}>{status.mensagem}</p>}

            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: "/",
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }}/>
            :""}
            <Hr/>
            <Form onSubmit={addUsuario}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Digite seu Nome..." onChange={valueInput}/>

                <Label>Email: </Label>
                <Input type="email" name="email" placeholder="Digite seu e-mail..." onChange={valueInput}/>

                <Label>Senha: </Label>
                <Input type="password" name="password" placeholder="Digite sua senha..." onChange={valueInput}/>

                <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
            </Form>
        </Container>
    );
}