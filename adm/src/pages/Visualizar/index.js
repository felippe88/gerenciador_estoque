import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom"
import { Menu } from "../../components/Menu";
import { Container, ConteudoTitulo, Titulo, BotaoAcao, ButtonWarning, ButtonInfo, ConteudoView, Hr } from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Visualizar = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState("");

    const { state } = useLocation();
    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
    });

    useEffect(() => {

        const getProduto = async () => {

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/view-produto/" + id, headers)
            .then((response) => {
                setData(response.data.produto);
                
            }).catch((err) => {
                if(err.response){
                    setStatus({
                        type:"redErro",
                        mensagem: err.response.data.mensagem
                    });

                }else{
                    setStatus({
                        type:"redErro",
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            });



        
        }

        getProduto();
    }, [id]);

    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Visualizar</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo type="button">Listar</ButtonInfo>
                    </Link>{" "}
                    <Link to={"/editar/" + data.id}>
                        <ButtonWarning type="button">Editar</ButtonWarning>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>

            {status.type === 'redErro' ? <Redirect to={{
                pathname: "/listar",
                state: {
                    type: "erro",
                    mensagem: status.mensagem
                }
            }} /> : ""}

            <Hr/>
            <ConteudoView>ID: {data.id}</ConteudoView>
            <ConteudoView>Nome: {data.nome}</ConteudoView>
            <ConteudoView>Preço de compra: {new Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(data.preco_compra)}</ConteudoView>
            <ConteudoView>Preço de venda: {new Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(data.preco_venda)}</ConteudoView>
            <ConteudoView>Quantidade: {data.quantidade}</ConteudoView>
        </Container>
    );
}