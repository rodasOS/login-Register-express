const formulario = document.getElementById('form-login');

formulario.addEventListener('submit', async (e) => {
	e.preventDefault();

	//	-->	Peticion al servidor
	const res = await fetch('http://localhost:3000/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			user: e.target.children.user.value,
			password: e.target.children.password.value,
		}),
	});

	//	-->	Recibiendo respuesta del servidor
	const resJSON = await res.json();

	//	-->	Que hacer si la peticion sale mal
	if (!res.ok) {
		const mensaje = document.querySelector('.escondido');
		mensaje.textContent = resJSON.message;

		console.log(mensaje.innerHTML);
		return;
	}

	//	-->	Mostrando en consola el mensaje que se recibe del servidor
	console.log(resJSON.message);

	//	-->	Redireccionando al usuario a la url que el servidor solicite (solo si el servidor lo solicita)
	if (resJSON.redirect) {
		window.location.href = resJSON.redirect;
	}
});
