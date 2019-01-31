const btnFormulario = document.querySelector('#formulario');
// Ejecución de la función eventosAll
eventosAll();
// Creación de la función que dispara todos los eventListener
function eventosAll() {
	btnFormulario.addEventListener('submit', validaRegistro);
}
// Creación de la función que validara el registro y/o Login del usuario
function validaRegistro(event) {
	// Previniendo el comportamiento por defecto del navegador (recargar página)
	event.preventDefault();

	const acciontype = document.querySelector('#tipo').value,
		  usuario = document.querySelector('#usuario').value,
		  password = document.querySelector('#password').value;

	const datos = new FormData();

	if (acciontype === 'crear') 
	{
		const nombre = document.querySelector('#nombre').value;

		if (nombre === '' || usuario === '' || password === '') 
		{
			swal({
				type: 'error',
				title: 'Error de Registro!',
				text: 'Todos los campos son obligatorios'
			});
		}else
		{
			datos.append('nombre', nombre);
			datos.append('usuario', usuario);
			datos.append('password', password);
			datos.append('accion', acciontype);

			realizaPeticion(datos);

			limpiaFormulario();
		}
	}else if (acciontype === 'login') 
	{
		if (usuario === '' || password === '') 
		{
			swal({
				type: 'error',
				title: 'Error de Autentificación',
				text: 'Todos los campos son obligatorios'
			});
		} 
		else 
		{
			datos.append('usuario', usuario);
			datos.append('password', password);
			datos.append('accion', acciontype);

			realizaPeticion(datos);
		}
	}
}
// Crear la función que realizara la petición AJAX al archivo PHP
function realizaPeticion(datos) 
{
	console.log(...datos);
	// Crear el objeto de tipo XMLHttpRequest()
	const xhr = new XMLHttpRequest();
	// abrir la conexión con el servidor
	xhr.open('POST', 'php/peticionUsuario.php', true);
	// obtener la respuesta del servidor
	xhr.onload = function() 
	{
		// Validando que la petición se envie exitosamente
		if (xhr.readyState == 4 && xhr.status == 200)
		{
			// recibiendo la respuesta del servidor
			const respuesta = JSON.parse(xhr.responseText);
			// imprimiendo la respuesta para ver lo que arroja el servidor
			console.log(respuesta);
			// validando que la respuesta del servidor sea satisfactoria
			if (respuesta.success === true) 
			{
				// validar la accion realizada por el usuario en la respuesta
				if (respuesta.accion == 'crear') 
				{
					swal({
						type: 'success',
						title: 'Registro Exitoso',
						text: 'Los datos se han almacenado con exito'
					});
				}else if (respuesta.accion == 'login') 
				{
					swal({
						type:'success',
						title: 'Autentificación Exitosa',
						text: 'Da click en el botón OK para ingresar al sistema'
					})
					.then(resultado => {
						if (resultado.value) 
						{
							window.location.href = 'administrador.php';
						}
					});
				}
			}
			else
			{
				swal({
					type: 'error',
					title: 'Error!',
					text: respuesta.message
				})
				.then(resultado => {
					if (resultado.value) {
						limpiaFormulario();
					}
				});
			}
		}
	}
	xhr.send(datos);
}
// Crear la función que permita limpiar el formulario una vez realizada la acción
function limpiaFormulario() {
	btnFormulario.reset();
}