import express from 'express'
import {client, pool} from '../database/db.js'
import { io } from '../main.js'
const router = express.Router();
router.use(express.json());

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM vendapdvcomanda');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {

  try {
    const {nome_comanda, comanda_uuid, hora_abertura, status_comanda, numero_comanda, valor_total, usuario_responsavel, usuario_responsavel_id } = req.body

    const result = await pool.query(
      `INSERT INTO vendapdvcomanda 
      (comandadetalhe, comandanumero, comandastatus, comandaaberturadata, comandaaberturafuncionarioid, comandadivisao, comandauuid)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [nome_comanda, numero_comanda, status_comanda, hora_abertura, usuario_responsavel_id, 1, comanda_uuid ]
    )

    io.emit('comanda-alterada', { action: 'POST', data: result.rows[0] })

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message})
    res.body
  }
})


router.put('/', async (req, res, next) => {

  const {comanda_uuid} = req.body
  
  try{
    const result = await pool.query(
      `UPDATE vendapdvcomanda SET comandastatus = 2 WHERE comandauuid = $1
      RETURNING *`,
      [comanda_uuid ]
    )
    
    io.emit('comanda-alterada', { action: 'PUT', data: result.rows[0] })
    res.json(result.rows[0])

  } catch (error) {
    res.status(500).json({ error: error.message})
    res.body
  }

  res.status(200).send()
})

export default router;
