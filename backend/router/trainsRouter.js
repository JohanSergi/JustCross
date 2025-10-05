import express from 'express';
import { getTrains } from '../controller/trainsController.js';
const router = express.Router();

    

router.get('/', getTrains);

export default router;