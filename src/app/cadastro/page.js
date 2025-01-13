"use client"; // Define o componente como um Client Component

export default function Cadastro() {
  return (
    <div className="container">
      <h1>Crie sua Conta!</h1>
      <div className="form-container">
        <form>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="data-nasc">Data de nascimento</label>
            <input
              type="date"
              id="data-nasc"
              name="data-nasc"
              required
              className="input"
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
            />
          </div>
          <button type="submit" className="btn">
            <a href="/posts">Criar</a>
          </button>
        </form>
        <p className="link">
          Já tem uma conta?{' '}
          <a href="/login" className="link-highlight">
            Login
          </a>
        </p>
      </div>

      {/* Estilos usando styled-jsx */}
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
      `}</style>
    </div>
  );
}
