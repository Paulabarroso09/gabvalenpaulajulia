import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", { email, senha });
      localStorage.setItem("token", response.data.token);
      navigate("/usuarios");
    } catch (error) {
      setMensagem(error.response?.data?.erro || "Erro ao fazer login");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
      {mensagem && <div className="alert alert-danger">{mensagem}</div>}
    </div>
  );
};

export default Login;
