import React, { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import { Link, Redirect } from "react-router-dom";
import { Container, ConteudoTitulo, Titulo, BotaoAcao, Form, ButtonInfo, Label, Input, Hr, ButtonPrimary, ButtonWarning, AlertSuccess, AlertDanger } from '../../styles/custom_adm';
import api from '../../config/configApi';

export const Editar = (props) => {

    const [id] = useState(props.match.params.id);

    const [valorPrecoCompraTarget, setValorPrecoCompraTarget] = useState();

    const [valorPrecoVendaTarget, setValorPrecoVendaTarget] = useState();

    const [nome, setNome] = useState("");
    const [preco_compra, setPrecoCompra] = useState("");
    const [preco_venda, setPrecoVenda] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const [status, setStatus] = useState({
        type:  "",
        mensagem:  "",
    });

    const editProduto = async e => {
        e.preventDefault();
        
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("edit-produto", {id, nome, preco_compra, preco_venda, quantidade}, headers)
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
        });
    }

    useEffect(() => {

        const getProduto = async () => {

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/view-produto/" + id, headers)
            .then((response) => {
                //setData(response.data.produto);
                setNome(response.data.produto.nome);
                
                
                
                setValorPrecoCompraTarget(new Intl.NumberFormat('pt-BR',{minimumFractionDigits: 2, currency: 'BRL'}).format(response.data.produto.preco_compra));
               

                setValorPrecoVendaTarget(new Intl.NumberFormat('pt-BR',{minimumFractionDigits: 2, currency: 'BRL'}).format(response.data.produto.preco_venda));
               

                setQuantidade(response.data.produto.quantidade);
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


    const valuePrecoCompra = async (valorPrecoCompraInput) => {
        
        var valorPrecoCompraConvert = valorPrecoCompraInput.toString().replace(/\D/g, "");
        valorPrecoCompraConvert = valorPrecoCompraConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoCompraConvert = valorPrecoCompraConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setValorPrecoCompraTarget(valorPrecoCompraConvert);

        
        var precoCompraSalvar = await valorPrecoCompraConvert.replace(".","");
        precoCompraSalvar = await precoCompraSalvar.replace(",",".");

        setPrecoCompra(precoCompraSalvar);
    }

    const valuePrecoVenda = async (valorPrecoVendaInput) => {
        
        ///Criando mascara para apresentação no input
        var valorPrecoVendaConvert = valorPrecoVendaInput.toString().replace(/\D/g, "");
        valorPrecoVendaConvert = valorPrecoVendaConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoVendaConvert = valorPrecoVendaConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setValorPrecoVendaTarget(valorPrecoVendaConvert);

        ///Tratando valores para salvar no banco de dados
        var precoCompraSalvar = await valorPrecoVendaConvert.replace(".","");
        precoCompraSalvar = await precoCompraSalvar.replace(",",".");

        setPrecoVenda(precoCompraSalvar);
    }
    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Editar</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo type="button">Listar</ButtonInfo>
                    </Link>{" "}
                    <Link to={"/visualizar/" + id}>
                        <ButtonPrimary type="button">Visualizar</ButtonPrimary>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>

            {status.type === 'redErro' ? <AlertDanger>{status.mensagem}</AlertDanger>
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

            <Form onSubmit={editProduto}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} />

                <Label>Preço de Compra: </Label>
                <Input type="text" name="valorPrecoCompraTarget" placeholder="Preço de Compra" value={valorPrecoCompraTarget} onChange={e => valuePrecoCompra(e.target.value)} />
                
                <Label>Preço de Venda: </Label>
                <Input type="text" name="valorPrecoVendaTarget" placeholder="Preço de Venda" value={valorPrecoVendaTarget} onChange={e => valuePrecoVenda(e.target.value)} />

                <Label>Quantidade: </Label>
                <Input type="number" name="quantidade" placeholder="Quantidade do Produto" value={quantidade} onChange={e => setQuantidade(e.target.value)} />

                <ButtonWarning type="submit">Salvar</ButtonWarning>
            </Form>
        </Container>
    );
}