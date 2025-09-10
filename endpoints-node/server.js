import express from "express";
import pool from "./db.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Este es un endpoint hecho con express")
});
//endpoint con parametro
app.get("/api/user/:id",(req, res) => {
//destructuración -> Sirve para acortar el codigo. Entre llaves se le pasa el valor que queremos capturar
    const {id} = req.params
    res.send({message: `El usuario con id ${id} es Pepito`})
});

app.get("/api/search", (req, res) => {
    const { name, lastname } = req.query; //para destructurar name y lastname, Para capturar un valor
    res.json({
        firstName: name,
        lastname,
    });
// http://localhost:'PUERTO'/api/search?name=Ayelen&lastname=Quispe
});

//endpoint POST
app.post("/api/user", (req, res) => {
    const{name, email} = req.body //para destructurar name y mail del body
    res.json({
        message: 'Usuario creado', 
        data: { name, email } });
});

//PUT
app.put('/api/user/:id', (req, res) => {
    const{id} = req.params
    const{name, email} = req.body
    res.json({
        message: `Este es el usuario con id ${id}`,
        data: {name,email},
    })
});

//DELETE
app.delete('/api/user/:id', (req, res) => { // El orden de "req,res" importa
    const{id} = req.params
    res.json ({message: `Usuarioo con ID ${id} eliminado`});
});

//endpoints DB
//GET
app.get('/api/products', async(req, res) => {   //async define la función como asincróno -> la manera en la que se va a ejecutar el código
    try {
        //código a probar
      const [rows] = await pool.query("SELECT * FROM shoes"); //cada cosa asincronica que tenemos va a ir con un await
      res.json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en la consulta" });
    }
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); //Usamos esta comilla xq combinamos texto con variable
});