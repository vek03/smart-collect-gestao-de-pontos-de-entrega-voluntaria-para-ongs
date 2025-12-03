const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Caminho absoluto da pasta uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Servir imagens estaticamente
// app.use("/uploads", express.static(uploadDir));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configurar Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const newFileName = `${timestamp}-${file.originalname}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// Rota de upload
app.post("/upload", upload.single("arquivo"), (req, res) => {
  return res.json({
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Rota de consulta direta
app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Imagem não encontrada");
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Erro ao enviar arquivo:", err);
      res.status(500).send("Erro interno");
    }
  });
});

// Iniciar servidor
app.listen(3001, () => {
  console.log("API rodando em http://localhost:3001");
});
