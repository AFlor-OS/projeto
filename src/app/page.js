"use client";

import React from 'react';

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
      `}</style>
    </div>
  );
}
