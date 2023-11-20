const express = require("express")
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

//Rotas
//Inserir
app.post("/todos", async (req, res) => {
    try {
        const { descriprtion } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (descriprtion) VALUES($1) RETURNING *",
            [descriprtion]
        )

        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

//Listar pelo id
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", [id]
        )
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

//Listar todos
app.get("/todos", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo",
        )
        res.json(todo);
    } catch (error) {
        console.log(error)
    }
})
// Atualizar um item
app.put('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descriprtion } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id =$2",
            [descriprtion, id]
        );
        res.json("Atualizado o Item")

    } catch (error) {
        console.log(error)
    }
})

//Deletar um item
app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELE FORM todo WHERE todo_id = $1",
            [id]
        )
        res.json("Deletado")

    } catch (error) {
        console.log(error)
    }
})

//Servidor
app.listen(8000, () => {
    console.log('Servidor Rodando')
})