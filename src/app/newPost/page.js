"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o hook de navegação do Next.js

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [error, setError] = useState(""); // Estado para exibir erros
  const router = useRouter(); // Inicializa o router

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!title || !content) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true); // Ativa o estado de carregamento
    setError(""); // Limpa erros anteriores

    try {
      const token = localStorage.getItem("token"); // Obtém o token do localStorage
      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      // Requisição para criar o post
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          createdeAt: new Date().toISOString(),  // Adiciona a data/hora atual para createdAt
          updatedAt: new Date().toISOString(),  // Adiciona a data/hora atual para updatedAt
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao criar o post.");
      }

      const data = await response.json();
      console.log("Post criado com sucesso:", data);

      // Redireciona para a página de posts
      router.push("/posts");
    } catch (err) {
      setError(err.message); // Exibe o erro
      console.error("Erro ao criar post:", err);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="container">
      <h1 className="title">Criar Novo Post</h1>
      {error && <p className="error">{error}</p>} {/* Exibe erros */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do post"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Conteúdo</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo do post"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Criando..." : "Criar Post"}
        </button>
      </form>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .title {
          text-align: center;
          color: #007bff;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #333;
        }
        input,
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        .btn {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #0056b3;
        }
        .btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .error {
          color: red;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
