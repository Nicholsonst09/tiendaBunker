import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { buscarUsuario, crearUsuario} from './auth.modelo.mjs';

const FRASE_SECRETA = process.env.FRASE_SECRETA_JWT;

export async function registrar(req, res){
    const {usuario, pass} = req.body;
    if (!usuario || !pass) return res.sendStatus(400);

    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        const creado = await crearUsuario(usuario, hash);
        if (creado) return res.redirect('/admin/index.html');
        return res.sendStatus(500);
    }catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function login(req, res){
    const {usuario, pass} = req.body;
    if (!usuario || !pass) return res.sendStatus(400);

    try{
        const usuarioBD = await buscarUsuario(usuario);
        if (!usuarioBD) return res.sendStatus(401);
        const verificado = await bcrypt.compare(pass, usuarioBD.password_hash);
        if(!verificado) return res.sendStatus(401);

        const payload= {usuarioId: usuarioBD.id, rol: 'admin'};
        const token = jwt.sign(payload, FRASE_SECRETA, {expiresIn: '1h'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.redirect('/CRUD/admin.html');
    }catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export function logout(req, res){
    res.clearCookie('token');
    res.redirect('/admin/index.html');
}