"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importe o useRouter

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simula a autenticação como `true` para teste
  const router = useRouter(); // Inicialize o useRouter

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts'); // Endpoint do backend
        if (!response.ok) {
          throw new Error("Erro ao buscar posts.");
        }
        const data = await response.json();
        setPosts(data); // Define os posts com os dados da API
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    router.push(`/posts/${id}`); // Navega para a página de detalhes do post
  };

  return (
    <div className="container">
      <h1 className="title">Posts</h1>
      
      {isAuthenticated && (
        <div className="create-post">
          <Link href="/newPost">
            <button className="btn new-post">Criar Novo Post</button>
          </Link>
        </div>
      )}
      
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card" onClick={() => handlePostClick(post.id)}>
              <h2>{post.title}</h2>
              <p><strong>Autor:</strong> {post.author?.name}</p>
              <p><strong>Data:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

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
        .create-post {
          text-align: right;
          margin-bottom: 20px;
        }
        .new-post {
          background-color: #28a745;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .new-post:hover {
          background-color: #218838;
        }
        .post-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .post-card {
          background-color: #ffffff;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #dddddd;
        }
        .post-card h2 {
          margin: 0 0 10px;
          color: #333;
        }
        .post-card p {
          margin: 5px 0;
          color: #555;
        }
        .post-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .btn {
          background-color: #007bff;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #0056b3;
        }
        .btn.delete {
          background-color: #dc3545;
        }
        .btn.delete:hover {
          background-color: #c82333;
        }
        .login-invite {
          margin-top: 20px;
          text-align: center;
          font-size: 16px;
          color: #333;
        }
        .login-invite a {
          color: #007bff;
          text-decoration: none;
        }
        .login-invite a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}