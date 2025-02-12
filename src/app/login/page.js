"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o useRouter

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para exibir erros
  const router = useRouter(); // Inicializa o useRouter

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    setError(""); // Limpa erros anteriores

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Erro ao fazer login.");
      }

      const { token } = await response.json(); // Extrai o token da resposta
      localStorage.setItem("token", token); // Armazena o token no localStorage
      router.push("/posts"); // Redireciona o usuário para a página de posts
    } catch (err) {
      setError(err.message); // Exibe o erro
      console.error("Erro ao fazer login:", err);
    }
  };

  return (
    <div className="container">
      <h1>Bem-vindo de volta</h1>
      <div className="form-container">
        {error && <p className="error">{error}</p>} {/* Exibe erros */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
        <p className="link">
          Não tem uma conta?{" "}
          <a href="/cadastro" className="link-highlight">
            Cadastre-se
          </a>
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
        }

        h1 {
          color: #333;
          margin-bottom: 20px;
          font-size: 1.8rem;
          font-weight: bold;
          text-align: center;
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

        label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #555;
        }

        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          color: #333;
          transition: border-color 0.3s ease;
        }

        .input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .btn {
          background-color: #007bff;
          color: #fff;
          padding: 10px 15px;
          width: 100%;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn:hover {
          background-color: #0056b3;
        }

        .link {
          margin-top: 15px;
          font-size: 0.9rem;
          text-align: center;
          color: #555;
        }

        .link-highlight {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .link-highlight:hover {
          text-decoration: underline;
        }

        .error {
          color: red;
          margin-bottom: 15px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}