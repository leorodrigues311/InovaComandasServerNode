import express from 'express'
import {client, pool} from '../database/db.js'
import { io } from '../main.js'
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM vendapdvcomandaitens');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const {comanda_id, comanda_uuid, item_uuid, quantidade, valor_unit, valor_total, hora_inclusao, item_nome} = req.body;
    const result = await pool.query(
      `INSERT INTO vendapdvcomandaitens 
      (itenscomandacomandaid, itemuuid, itenscomandaqtd, itenscomandavalorproduto, itenscomandavalortotal, itenscomandaprodutogradeid, itenscomandadatainclusao, itenscomandaprodutodescricao, comandauuid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`,
      [comanda_id, item_uuid, quantidade, valor_unit, valor_total, 0, hora_inclusao, item_nome, comanda_uuid]
    );

    io.emit('comanda-alterada', { action: 'POST', data: result.rows[0] });

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message});
    res.body
  }
})

router.put('/', async (req, res, next) => {
  try {
  const { item_status, comanda_uuid, item_uuid } = req.body
  const result = await pool.query(
    `UPDATE itens_comanda SET item_status = $1 WHERE item_uuid = $2 AND comanda_uuid = $3
    RETURNING *`,
    [ item_status, item_uuid, comanda_uuid ]
  )
  io.emit('comanda-alterada', { action: 'PUT', data: result.rows[0] });
  res.json(result.rows[0])
} 
catch (error) {
  res.status(500).json({ error: error.message});
  res.body
}
})

router.delete('/', async (req, res, next) => {
  try {
  const { comanda_uuid, item_uuid } = req.body
  console.log(req.body)
  const result = await pool.query(
    `DELETE FROM vendapdvcomandaitens where itemuuid = $1 and comandauuid = $2
    RETURNING *`,
    [ item_uuid, comanda_uuid ]
  )
  io.emit('comanda-alterada', { action: 'DELETE', data: result.rows[0] });
  res.json(result.rows[0])
} 
catch (error) {
  res.status(500).json({ error: error.message});
  res.body
}
})

export default router;