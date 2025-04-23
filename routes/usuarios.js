import express from 'express'
import {client, pool} from '../database/db.js'
const router = express.Router()
router.use(express.json())


router.get('/', async (req, res, next) => {
  try {
    //const {cnpj} = req.query
    const result = await pool.query('SELECT * FROM funcionarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export default router;