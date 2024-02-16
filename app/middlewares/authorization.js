import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

function soloAdmin(req, res, next) {
	let cookieJWT = req.headers.cookie;

	if (cookieJWT) {
		cookieJWT = cookieJWT
			.split('; ')
			.find((cookie) => cookie.startsWith('jwt='))
			.slice(4);
		const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
		console.log(decodificada.user);
		if (cookieJWT) return next();
	}

	return res.redirect('/');
}

function soloPublico(req, res, next) {
	let cookieJWT = req.headers.cookie;

	if (cookieJWT) {
		cookieJWT = cookieJWT
			.split('; ')
			.find((cookie) => cookie.startsWith('jwt='))
			.slice(4);
		const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
		console.log(decodificada.user);
		if (cookieJWT) return res.redirect('/admin');
	}
	return next();
}

export const methods = {
	soloAdmin,
	soloPublico,
};
