import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "../../components/Menu";


import api from '../../config/configApi';

import { Container, ConteudoTitulo, Titulo, BotaoAcao, ButtonSuccess, Table, ButtonPrimary, ButtonWarning, ButtonDanger, AlertSuccess, AlertDanger } from '../../styles/custom_adm';


export const Listar = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
    });

    const ListarProdutos = async () => {

        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.get("/list-produto", headers)
        .then((response) => {
            
            setData(response.data.produtos);
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type:"error",
                    mensagem: err.response.data.mensagem
                });
            }else{
                setStatus({
                    type:"error",
                    mensagem: "Erro: Tente mais tarde!"
                });
            }
        }); 
    }


    ///Ao carregar a página faz tal coisa:
    useEffect(() => {
        ListarProdutos();

        ///Colocar ao final ,[]); dessa forma irá executar apenas 1 vez!
    }, []);


    const apagarProduto = async (idProduto) => {
        //alert("Apagar o produto: " + idProduto);
        await api.delete("delete-produto/" + idProduto)
        .then((response) =>{
            setStatus({
                type:"success",
                mensagem: response.data.mensagem
            });
            ListarProdutos();
        }).catch((err) => {
            if(err.response){

            }else{
                setStatus({
                    type:"error",
                    mensagem: "Erro: Tente mais tarde!"
                });
            }
        })
    }

    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Listar</Titulo>
                <BotaoAcao>
                    <Link to="/cadastrar">
                        <ButtonSuccess type="button">Cadastrar</ButtonSuccess>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>
            {status.type === "success" ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
            {status.type === "error" ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}


            <hr />
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{new Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(produto.preco_venda)}</td>
                            <td>{produto.quantidade}</td>
                            <td>
                                <Link to={"/visualizar/" + produto.id}>
                                    <ButtonPrimary type="button">Visualizar</ButtonPrimary>
                                </Link>{" "}

                                <Link to={"/editar/" + produto.id}>
                                    <ButtonWarning type="button">Editar</ButtonWarning>
                                </Link>{" "}

                                
                                <ButtonDanger type="button" onClick={() => apagarProduto(produto.id)}>Apagar</ButtonDanger>
                                

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
