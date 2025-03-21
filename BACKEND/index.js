require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


const db = mysql.createPool({
  host: process.env.DB_HOST || "10.111.4.30",
  user: process.env.DB_USER || "dev1b",
  password: process.env.DB_PASSWORD || "Sen4i2024",
  database: process.env.DB_NAME || "dev1b",
});


const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ erro: "Token não fornecido" });

  jwt.verify(token.split(" ")[1], "secreto", (err, decoded) => {
    if (err) return res.status(401).json({ erro: "Token inválido" });
    req.usuario = decoded;
    next();
  });
};


app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM GJPV_usuarios WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ erro: "Usuário ou senha inválidos" });

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Usuário ou senha inválidos" });

   
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, "secreto", { expiresIn: "2h" });

    res.status(200).json({ mensagem: "Login realizado com sucesso!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});


app.get("/api/usuarios", verificarToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, nome, email, data_criacao FROM GJPV_usuarios");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});


app.delete("/api/usuarios/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM GJPV_usuarios WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ erro: "Usuário não encontrado" });

    res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ erro: "Erro ao deletar usuário" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
