"use client"; // Define o componente como um Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    dataNasc: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          password: formData.password,
          birth: formData.dataNasc,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Erro ao registrar.");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Crie sua Conta!</h1>
      <div className="form-container">
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="input"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataNasc">Data de nascimento</label>
            <input
              type="date"
              id="dataNasc"
              name="dataNasc"
              required
              className="input"
              value={formData.dataNasc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn">Criar</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="link">
          Já tem uma conta? <a href="/login" className="link-highlight">Login</a>
        </p>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f4f4f9;
          padding: 20px;
        }
        .form-container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .btn {
          width: 100%;
          background-color: #007bff;
          color: #fff;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
