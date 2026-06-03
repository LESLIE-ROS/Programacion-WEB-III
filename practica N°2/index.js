import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda" 
});

db.connect(error => {
  if (error) {
    console.error("Falla en la conexion de base de datos:", error.message);
  } else {
    console.log("Conexion exitosa a la base de datos");
  }
});


// =================================================================
//            1 POST /categorias → Crear categoría
// =================================================================
app.post("/categorias", (req, res) => {
  const { nombre, descripcion } = req.body;
  const sql = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)";
  db.query(sql, [nombre, descripcion], (err, result) => {
    if (err) return res.status(500).json({ mensaje: "Error al crear categoria" });
    res.json({ id: result.insertId, nombre, descripcion });
  });
});


// ================================================================
//              2 GET /categorias → Listar todas
// ================================================================
app.get("/categorias", (req, res) => {
  db.query("SELECT * FROM categorias", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// ==================================================================
//                      3 GET /categorias/id
// ==================================================================
app.get("/categorias/:id", (req, res) => {
  const { id } = req.params;
  const sqlCategoria = "SELECT * FROM categorias WHERE id = ?";
  const sqlProductos = "SELECT * FROM productos WHERE categoria_id = ?";

  db.query(sqlCategoria, [id], (err, categoria) => {
    if (err) return res.status(500).json({ error: err.message });
    if (categoria.length === 0)
      return res.status(404).json({ mensaje: "Categoria no encontrada" });

    db.query(sqlProductos, [id], (err, productos) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ...categoria[0], productos });
    });
  });
});


// ====================================================================
//                            4 PATCH /categorias/id
// ====================================================================
app.patch("/categorias/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const sql =
    "UPDATE categorias SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(sql, [nombre, descripcion, id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Categoria actualizada correctamente" });
  });
});


// ===============================================================================
//                            5 DELETE /categorias/:id → Eliminar categoría 
// ===============================================================================
app.delete("/categorias/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM categorias WHERE id = ?", [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Categoria y sus productos eliminados" });
  });
});

