import styled from "styled-components";

export const Container = styled.section`
    margin: 0px auto;
    width: 960px;
    max-width: 960px;

`;


export const ConteudoTitulo = styled.section`
    display: flex;
    justify-content: space-between;

`;


export const Titulo = styled.h1`
    font-size: 23px;
    font-family: sans-serif;
    margin: 10px 15px;
    color: #1d1e1e;
    

`;


export const BotaoAcao = styled.section`
    margin: 5px;

`;


export const ButtonSuccess = styled.button`
    background-color: #fff;
    color: #198754;
    padding: 5px 8px;
    border: 1px solid #198754;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    :hover{
        background-color: #198754;
        color: #fff;
    }

`;


export const Table = styled.table`
    margin-top: 15px;
    width: 100%;
    th{
        background-color: #007281;
        color: #f1f1f1;
        padding: 10px;
    }
    td{
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 8px;
        
    }

`;


export const ButtonPrimary = styled.button`
    background-color: #fff;
    color: #0d6efd;
    padding: 5px 8px;
    border: 1px solid #0d6efd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    :hover{
        background-color: #0d6efd;
        color: #fff;
    }

`;



export const ButtonWarning = styled.button`
    background-color: #fff;
    color: #ffc107;
    padding: 5px 8px;
    border: 1px solid #ffc107;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    :hover{
        background-color: #ffc107;
        color: #fff;
    }

`;

export const ButtonDanger = styled.button`
    background-color: #fff;
    color: #dc3545;
    padding: 5px 8px;
    border: 1px solid #dc3545;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    :hover{
        background-color: #dc3545;
        color: #fff;
    }

`;


export const ButtonInfo = styled.button`
    background-color: #fff;
    color: #0dcaf0;
    padding: 5px 8px;
    border: 1px solid #0dcaf0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    :hover{
        background-color: #0dcaf0;
        color: #fff;
    }

`;

export const ConteudoView = styled.p`
    margin-top: 8px;
    font-size: 18px;
    font-family: sans-serif;
`;

export const Form = styled.form`
    margin: 0 auto;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px
    margin-top: 6px
    margin-bottom: 16px;
`;


export const Input = styled.input`
    width: 100%;
    border: 1px solid #ccc;
    padding: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

export const Hr = styled.hr`
    margin-bottom: 15px;
`;

export const AlertSuccess = styled.p`
    background-color: #d1e7dd;
    color: #0f5132;
    margin: 10px 0;
    padding: 7px;
    border: 1px solid #badbcc;
    border-radius: 4px;
`;


export const AlertDanger = styled.p`
    background-color: #f8d7da;
    color: #842029;
    margin: 10px 0;
    padding: 7px;
    border: 1px solid #f5c2c7;
    border-radius: 4px;
`;
