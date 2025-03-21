import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import ListaUsuarios from "./pages/ListaUsuarios";
import Login from "./pages/Login";
import Mapa from "./pages/Mapa";

function App() {
  return (
    <Router>
      <div className="container">
        {/* Barra de Navegação */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Projeto Dengue</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Cadastro</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/usuarios">Lista de Usuários</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mapa">Mapa</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Rotas do Sistema */}
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/usuarios" element={<ListaUsuarios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
