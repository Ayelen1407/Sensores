import express from "express";

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
    const { name, lastname } = req.query; //para destructurar name y lastname
    res.json({
        firstName: name,
        lastname,
    });
// http://localhost:'PUERTO'/api/search?name=Ayelen&lastname=Quispe
});

//endpoint POST
app.post("/api/user", (req, res) => {
    const{name, email} = req.body //para destructurar name y mail del body
    res.json({message: 'Usuario creado', data: { name, email } });
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); //Usamos esta comilla xq combinamos texto con variable
});