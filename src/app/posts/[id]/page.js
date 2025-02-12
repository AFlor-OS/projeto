"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const jwtDecode = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState("");
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      const user = jwtDecode(storedToken);
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const postResponse = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!postResponse.ok) throw new Error(`Post não encontrado (status: ${postResponse.status})`);
        const postData = await postResponse.json();
        setPost(postData);
        setEditContent(postData.content);
        setPostError("");

        const commentsResponse = await fetch(`http://localhost:5000/api/posts/${id}/comments`);
        if (!commentsResponse.ok) throw new Error("Erro ao buscar comentários.");
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (err) {
        setPostError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao editar o post.");
      }

      const updatedPost = await response.json();
      setPost(updatedPost);
      setIsEditing(false);
      alert("Post editado com sucesso!");
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("Tem certeza de que deseja excluir este post?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao excluir o post.");
      }

      alert("Post excluído com sucesso!");
      router.back()// Redireciona para a página inicial após a exclusão
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("O comentário não pode estar vazio.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao adicionar comentário.");
      }

      const commentData = await response.json();
      setComments((prevComments) => [...prevComments, commentData.comment]);
      setNewComment("");
      alert("Comentário adicionado com sucesso!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="loading">Carregando detalhes do post...</p>;
  if (!post) return <p className="error">{postError || "Post não encontrado."}</p>;

  return (
    <div className="container">
      <button className="btn back-button" onClick={() => router.back()}>
          ← Voltar
      </button>
      <h1 className="title">{post?.title || "Sem título"}</h1>
      <p className="author">
        <strong>Autor:</strong> {post?.author?.name || "Autor desconhecido"}
      </p>
      <p className="date">
        <strong>Data de Criação:</strong> {new Date(post?.createdAt).toLocaleDateString()}
      </p>

      <div className="content">
  {isEditing ? (
    <div className="edit-form">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Edite o título do post"
      />
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        rows="5"
        placeholder="Edite o conteúdo do post"
      />
      <div className="button-group">
        <button className="btn save-button" onClick={handleEditSubmit}>
          Salvar Alterações
        </button>
        <button className="btn cancel-button" onClick={() => setIsEditing(false)}>
          Cancelar
        </button>
      </div>
    </div>
        ) : (
          <p className="post-content">{post?.content}</p>
        )}
      </div>

      {currentUser?.id === post?.author?.id && (
        <div className="admin-actions">
          {!isEditing && (
            <>
              <button className="btn edit-button" onClick={handleEditClick}>
                Editar
              </button>
              <button className="btn delete-button" onClick={handleDeletePost}>
                Excluir
              </button>
            </>
          )}
        </div>
      )}

      <div className="comments-section">
        <h2>Comentários</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>{comment.User?.name || "Usuário desconhecido"}:</strong> {comment.content}
              </p>
              <p className="comment-date">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>Nenhum comentário ainda.</p>
        )}

        {currentUser && (
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              placeholder="Escreva seu comentário aqui..."
            />
            <button className="btn comment-button" onClick={handleCommentSubmit}>
              Adicionar Comentário
            </button>
          </div>
        )}
      </div>


      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .title {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #007bff;
        }
        .author,
        .date {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 10px;
        }
        .content {
          margin-top: 20px;
        }
        .post-content {
          white-space: pre-wrap;
          line-height: 1.6;
        }
        .edit-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          resize: vertical;
        }
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          color: #007bff;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: #007bff;
        }
        .save-button {
          background-color: #4caf50;
          color: white;
        }
        .cancel-button {
          background-color: #f44336;
          color: white;
        }
        .edit-button,
        .delete-button {
          margin-right: 10px;
          color: #007bff;
        }
        .comments-section {
          margin-top: 40px;
        }
        .comment {
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .comment-date {
          font-size: 0.8rem;
          color: #555;
        }
        .comment-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
          .back-button-container {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20px;
        }

        .back-button {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .back-button:hover {
          background-color: #0056b3;
        }

      `}</style>
    </div>
  );
}
