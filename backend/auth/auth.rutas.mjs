import express from 'express';
import * as controlador from './auth.controlador.mjs';

const router = express.Router();

router.post('/registrar', controlador.registrar);
router.post('/autenticacion', controlador.login);
router.get('/logout', controlador.logout);

export default router;