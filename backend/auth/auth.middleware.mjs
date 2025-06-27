import jwt from 'jsonwebtoken';

const FRASE_SECRETA = process.env.FRASE_SECRETA_JWT;

export function verificarToken (req, res, next){
    const {token} = req.cookies;
    if (!token) return res.redirect('/admin/index.html');

    jwt.verify(token, FRASE_SECRETA, (error, datos) => {
        if (error) {
            console.error('Token inválido o expirado', error.message);
            return res.redirect('/admin');
        }

        req.usuario = datos;
        next();
    })
}


//Ver si va o no esta función
export function verificarTokenHTML(req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.redirect('/admin/index.html');
    }

    try {
        const decoded = jwt.verify(token, FRASE_SECRETA);
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Token inválido:', error.message);
        res.clearCookie('token');
        return res.redirect('/admin/index.html');
    }
}