const { getPosts, agregarPost, like, eliminarPost } = require('./consultas');
const express = require('express');
const app = express();
const cors = require('cors')

app.listen(3001, console.log("SERVIDOR ENCENDIDO"))

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../likeme_front/public/index.html")
})

app.get("/posts", async (req, res) => {
    const posts = await getPosts()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    const { titulo, url, descripcion } = req.body
    await agregarPost(titulo, url, descripcion)
    res.send("Post agregado con éxito!")
})


//-----------------------------------------------
// DESDE AQUI COMIENZA EL DESAFIO LIKE ME PARTE 2
//-----------------------------------------------


app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params
        await like(id)
        res.send("Like agregado con éxito")

    } catch (error) {
        res.status(400).send(error)
        console.log("error:", error.where)
        console.log("código:", error.code)
    }
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        await eliminarPost(id)
        res.send("Post eliminado con éxito")

    } catch (error) {
        res.status(500).send(error)
        console.log("error:", error.where)
        console.log("código:", error.code)
    }
})