const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001 
const uuid = require('uuid')

app.use(express.json())
app.use(cors())


const orders = []

app.get('/order', (request, response) => {

    return response.json(orders)
})

app.post('/order', (request, response) => {

    const {order, client} = request.body

    const myOrder = {id: uuid.v4(), order, client}

    orders.push(myOrder)

    return response.status(201).json(myOrder)
})

app.delete('/order/:id', (request, response) => {
    const {id} = request.params

    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({error: 'Order not found'})
    }

    orders.splice(index, 1)

    return response.status(204).json(orders)
})


app.listen(port, () => {
    console.log(`💪 Seridor rodando na porta ${port}`)
})