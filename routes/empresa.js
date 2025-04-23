
import express from 'express'
import {client, pool} from '../database/db.js'
const router = express.Router()
router.use(express.json())


export default router;