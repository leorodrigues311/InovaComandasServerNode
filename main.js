import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http'
import produtos from './routes/produtos.js'
import empresa from './routes/empresa.js'
import usuarios from './routes/usuarios.js'
import comandas from './routes/comandas.js'
import itens from './routes/itens.js'
const port = process.env.PORT || 4000;
const app = express();

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

process.env.TZ = 'America/Sao_Paulo'

app.use(cors())
app.use(express.json())
app.use('/produtos', produtos)
app.use('/empresa', empresa)
app.use('/usuarios', usuarios)
app.use('/comandas', comandas)
app.use('/itens', itens)

app.get('/', async (req, res) => {
  res.status(200).send()
})

server.listen(port, () => {
  console.log(`server running on port ${port}`)
})


export { app, server, io };

