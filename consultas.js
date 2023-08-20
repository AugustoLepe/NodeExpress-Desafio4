const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'slayer69',
    database: 'likeme',
    allowExitOnIdle: true
})


const getPosts = async () => {
    const consulta = "SELECT * FROM posts"
    const { rows } = await pool.query(consulta)
    return rows
}


const agregarPost = async (titulo, url, descripcion, likes = 0) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
    const values = [titulo, url, descripcion, likes]
    const result = await pool.query(consulta, values)
}


//-----------------------------------------------
// DESDE AQUI COMIENZA EL DESAFIO LIKE ME PARTE 2
//-----------------------------------------------


const like = async (id) => {
    const consulta = "UPDATE posts SET likes = likes+1 WHERE id = $1"
    const values = [id]
    const { rowCount } = await pool.query(consulta, values)
    if (rowCount === 0) {
        throw { code: 404, message: "No se consiguió ningún viaje con este id" }
    }
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const { rows } = await pool.query(consulta, values)
    return rows
}

module.exports = { getPosts, agregarPost, like, eliminarPost }