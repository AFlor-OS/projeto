"use client";

import React, {useState, useEffect} from 'react';
import {getJoke} from "../services/chuck";


function Title({ children }) {
  return (
    <React.Fragment>
      <h1>
        {children}
      </h1>
      <style jsx>{`
        h1 {
          color: blue;
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
    </React.Fragment>
  );
}

export default function Blog() {
  const [joke,setJoke] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    setLoading(true);
    getJoke().then((d) => {
      setJoke(d)
      setLoading(false);
    })
    .catch((e)=>{
      setLoading(false)
      console.log(e)
    })
  },[])

  return (
    <div className="container">
      <Title>Tulinho Maravilha</Title>
      <div className="buttons">
        <button
          type="button"
          className="btn"
        >
          <a href="/login">Entrar</a>
        </button>
        <button
          type="button"
          className="btn"
        >
          <a href="/cadastro">Cadastre-se</a>
        </button>
      </div>
      <div className='piada'> 
        <h2>Piada do dia</h2>
        {loading ? (
          <p>
            <span className="spinner"></span> Carregando...
          </p>
        ) : (
          <p>{joke}</p>
        )}
      
      </div>



      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f4f4f9;
        }

        .buttons {
          display: flex;
          gap: 10px;
        }

        .btn {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .btn:hover {
          background-color: #0056b3;
        }

        .btn a {
          text-decoration: none;
          color: white;
        }
    .piada {
    background-color: #ffffff; /* Fundo branco para destaque */
    padding: 20px;
    border-radius: 10px; /* Cantos arredondados */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
    text-align: center; /* Centralizar texto */
    margin-top: 20px;
    max-width: 600px; /* Limitar largura */
    width: 100%; /* Responsivo */
    border: 1px solid #dddddd; /* Bordas suaves */
  }

  .piada h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333333;
  }

  .piada p {
    font-size: 18px;
    line-height: 1.5;
    color:rgb(53, 115, 149);
  }

.spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 8px;
          border: 2px solid #007bff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }


      `}</style>
    </div>
  );
}
