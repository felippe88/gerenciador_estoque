import React, { useState } from "react";
import { Menu } from "../../components/Menu";
import { Redirect, Link } from "react-router-dom";
import { Container, ConteudoTitulo, Titulo, BotaoAcao, Form, ButtonInfo, Label, Input, Hr, ButtonSuccess, ButtonDanger, AlertDanger } from '../../styles/custom_adm';
import api from '../../config/configApi';

export const Cadastrar = () => {

    const [valorPrecoCompraTarget, setValorPrecoCompraTarget] = useState();

    const [valorPrecoVendaTarget, setValorPrecoVendaTarget] = useState();

    const [produto,setProduto] = useState({
        nome: '',
        preco_compra: '',
        preco_venda: '',
        quantidade:''
    });

    const [status,setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setProduto({...produto, [e.target.name]: e.target.value});

    const addProduto = async e => {
        e.preventDefault();


        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.post("/cad-produto", produto, headers)
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

    const valuePrecoCompra = async e => {
        var valorPrecoCompraInput = e.target.value;


        valorPrecoCompraInput = valorPrecoCompraInput.replace(/\D/g, "");
        valorPrecoCompraInput = valorPrecoCompraInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoCompraInput = valorPrecoCompraInput.replace(/(?=(\d{3})+(\D))\B/g, ".");


        setValorPrecoCompraTarget(valorPrecoCompraInput);

        var precoCompraSalvar = await valorPrecoCompraInput.replace(".","");
        precoCompraSalvar = await precoCompraSalvar.replace(",",".");

        setProduto({...produto,preco_compra: precoCompraSalvar});
    }

    
    const valuePrecoVenda = async e => {
        var valorPrecoVendaInput = e.target.value;


        valorPrecoVendaInput = valorPrecoVendaInput.replace(/\D/g, "");
        valorPrecoVendaInput = valorPrecoVendaInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoVendaInput = valorPrecoVendaInput.replace(/(?=(\d{3})+(\D))\B/g, ".");


        setValorPrecoVendaTarget(valorPrecoVendaInput);

        var precoVendaSalvar = await valorPrecoVendaInput.replace(".","");
        precoVendaSalvar = await precoVendaSalvar.replace(",",".");

        setProduto({...produto,preco_venda: precoVendaSalvar});
    }

    return (
        <Container>
            <Menu/>
            <ConteudoTitulo>
                <Titulo>Cadastrar</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo type="button">Listar</ButtonInfo>
                    </Link>{" "}
                </BotaoAcao>
            </ConteudoTitulo>
            
            {status.type === 'error' ? <AlertDanger style={{color: "#ff0000"}}>{status.mensagem}</AlertDanger>
            : 
            <p style={{color: "green"}}>{status.mensagem}</p>}

            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: "/listar",
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }}/>
            :""}
            <Hr/>
            <Form onSubmit={addProduto}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Nome do Produto" onChange={valueInput}/>

                <Label>Preço de Compra: </Label>
                <Input type="text" name="valorPrecoCompraTarget" placeholder="Preço de Compra" value={valorPrecoCompraTarget} onChange={valuePrecoCompra}/>

                <Label>Preço de Venda: </Label>
                <Input type="text" name="valorPrecoVendaTarget" placeholder="Preço de Venda" value={valorPrecoVendaTarget} onChange={valuePrecoVenda}/>


                <Label>Quantidade: </Label>
                <Input type="number" name="quantidade" placeholder="Quantidade do Produto" onChange={valueInput}/>

                <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
            </Form>
        </Container>
    );
}