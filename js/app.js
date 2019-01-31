const btnCrear = document.querySelector('#btn-crear'),
	 btnTarea = document.querySelector('#frm-tareas'),
	 btnpendientes = document.querySelector('.pendientes'),
     listaProyectos = document.querySelector('.lista-proyecto #lista');
// Llamada de la función que contiene todos los eventsListeners
eventosAll();
// Función que contiene y ejecuta todos los eventsListener
function eventosAll() 
{
	// Document Ready para realizar la barra de progreso de las tareas realizadas
	document.addEventListener('DOMContentLoaded', function() 
	{
		actualizarProgreso();
	});
	// Listener para el boton que crea un nuevo proyecto
	btnCrear.addEventListener('click', creaProyecto);
	// Listener para el boton que realiza la insercción de las tareas
	btnTarea.addEventListener('submit', agregaTarea);
	// Listener para los botones de las acciones de las tareas 
	btnpendientes.addEventListener('click', accionesTareas);
	// Ejecutar la funcion totalTareas
	totalTareas();
}
// Función que crea el elemento <li> que contiene el input donde se va a escribir el nombre de la nueva tarea
function creaProyecto(event) 
{
	// Crear el input para ingresar el nombre del proyecto
	const nuevoProyecto = document.createElement('li');
	// agregando un input al li que se creo anteriormente para introducir el nombre del proyecto
	nuevoProyecto.innerHTML = '<input type="text" id="proyecto">';
	// Agregando el li a la lista <ul>
	listaProyectos.appendChild(nuevoProyecto);
	// seleccionar el ID del nuevo proyecto que es el del input que creamos <input type="text" id="proyecto">
	const inputNuevoProyecto = document.querySelector('#proyecto');
	// Al presionar enter se creara el proyecto, agregando un eventListener al inputNuevoProyecto
	inputNuevoProyecto.addEventListener('keypress', function(event) 
	{
		// detectando la tecla presionada en este caso el ENTER
		const tecla = event.which || event.keyCode;
		// Validar el código de la tecla ENTER tiene que ser el numero 13
		if (tecla === 13) 
		{
			guardaProyectoBD(inputNuevoProyecto.value);
			// removiendo el input creado del la vista
			listaProyectos.removeChild(nuevoProyecto);
		}
	});
}
// Función que guarada el nombre del proyecto en la base de datos
function guardaProyectoBD(nombreProyecto) 
{
	// Validando que el nombre de proyecto no este vacio
	if (nombreProyecto == '') 
	{
		swal({
			type: 'warning',
			title: 'Advertencia!',
			text: 'No ingresaste un nombre de proyecto'
		});
	}
	else
	{
		// creando la instancia a la clase XMLHttpRequest para abrir la petisión AJAX
		const xhr = new XMLHttpRequest();
		// Creando el objeto de tipo FormData para enviar los datos al archivo PHP
		const datos = new FormData();
		// Agregando los datos al objeto datos de tipo FormData
		datos.append('proyecto', nombreProyecto);
		datos.append('accion', 'crear');
		// Abriendo la conexón con el servidor
		xhr.open('POST', 'php/agregaProyecto.php', true);
		// Cargar la respuesta del servidor
		xhr.onload = function() 
		{
			if (xhr.readyState == 4 && xhr.status == 200) 
			{
				// Obtener la respuesta del servidor
				const respuesta = JSON.parse(xhr.responseText);
				console.log(respuesta);
				// Validar que la respuesta sea satisfactoria
				if (respuesta.success == true) 
				{
					// Validar la acción realizada en la petición
					if (respuesta.accion == 'crear') 
					{
						// Inyectando el nombre del proyecto en la vista (HTML)
						const nuevoElemento = document.createElement('li');
						nuevoElemento.innerHTML = `
							<a href="administrador.php?id=${respuesta.id_last}" id="proyecto:${respuesta.id_last}">
								${respuesta.proyecto}
							</a>
							`;
						// Agregando el elemento con el nombre del proyecto a la lista <ul>
						listaProyectos.appendChild(nuevoElemento);
						// Enviar alerta de exito
						swal({
							type: 'success',
							title: 'Proyecto Registrado',
							text: respuesta.message
						})
						.then(resultado => {
							if (resultado.value) 
							{
								window.location.href="administrador.php?id=" + respuesta.id_last;
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
					});
				}
			}
		}
		// enviando los datos al archivo php
		xhr.send(datos);
	}
}
// Función para agregar 
function agregaTarea(event) 
{
	event.preventDefault();
	const tarea = document.querySelector('#tarea').value,
		  id_proyecto = document.querySelector('#identificador').value;
	// Validando que el usuario ingrese una tarea en el campo
	if (tarea === '') 
	{
		swal({
			type: 'error',
			title: 'Error!',
			text: 'El campo de agregar tarea es obligatorio'
		});
	}
	else
	{
		// Abrir la conexión para realizar la petición AJAX
		const xhr = new XMLHttpRequest();
		// Crear el objeto de la calse FormData para guardar y enviar los datos
		const datos = new FormData();
		datos.append('tarea', tarea);
		datos.append('id_proyecto', id_proyecto);
		datos.append('accion', 'crear');

		xhr.open('POST', 'php/modeloTareas.php', true);

		xhr.onload = function() 
		{
			if (xhr.readyState == 4 && xhr.status == 200) 
			{
				console.log(xhr.readyState);
				console.log(xhr.status);
				const respuesta = JSON.parse(xhr.responseText);
				console.log(respuesta);
				if (respuesta.success == true) 
				{
					if (respuesta.accion == 'crear') 
					{
						swal({
							type: 'success',
							title: 'Tarea Registrada',
							text: respuesta.message
						});
						/* Crear el elemento para la tarea pendiente para agregarlo en la lista de tareas*/
						const nuevaTarea = document.createElement('li');
						// Agregar el id del proyecto
						nuevaTarea.id = `tarea:${respuesta.id_last}`;
						// Agregar la clase tarea
						nuevaTarea.classList.add('tarea');
						// insertar la tarea en el HTML
						nuevaTarea.innerHTML = `
							<p>${respuesta.tarea}</p>
							<div class="acciones">
								<i class="icono-accion fas fa-check-circle"></i>
								<i class="icono-accion fas fa-times-circle"></i>
							</div>
						`;
						const listaPendientes = document.querySelector('.pendientes ul');
						listaPendientes.appendChild(nuevaTarea);
						// Limpiar el formulario de tareas
						limpiarFormulario();
						// Actualiza barra de progreso
						actualizarProgreso();
						// Calcula el total de tareas del proyecto
						totalTareas();
					}

				}
				else{
					swal({
						type: 'error',
						title: 'Error!',
						text: respuesta.message
					});
				}
			}
		}

		xhr.send(datos);
	}
}
// Función que detecta la acción que realizara el usuario
function accionesTareas(event) 
{
	event.preventDefault();
	// Detectando los iconos de las acciones utilizando Delegacion en JavaScript
	if (event.target.classList.contains('fa-check-circle')) 
	{
		if (event.target.classList.contains('completo')) 
		{
			event.target.classList.remove('completo');
			cambiaEstatusTarea(event.target, 0);
		}
		else
		{
			event.target.classList.add('completo');
			cambiaEstatusTarea(event.target, 1);
		}
	}
	if (event.target.classList.contains('fa-times-circle')) 
	{
		swal({
			type: 'warning',
			title: 'Advertencia',
			text: '¿Deseas eliminar la tarea de la lista?',
			showCancelButton: true,
			confirmButtonColor: '#386150',
			cancelButtonColor: '#D33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		})
		.then(resultado =>{
			if (resultado.value) 
			{
				// Variable que contiene el elemento a eliminar del DOM
				const elementoEliminar = event.target.parentElement.parentElement;
				// Borrar de la base de datos
				eliminarTareaBD(elementoEliminar);
				// Borrar elemento del DOM
				// console.log(elementoEliminar);
				elementoEliminar.remove();
				swal({
					type: 'success',
					title: 'Eliminado',
					text: 'La tarea se elimino correctamente'
				});
			}
		});
	}
}
// Función para cambiar el estatus de la tarea
function cambiaEstatusTarea(tarea, estatus) 
{
	const id_tarea = tarea.parentElement.parentElement.id.split(':');
	const xhr = new XMLHttpRequest();
	const datos = new FormData();
	datos.append('id_tarea', id_tarea[1]);
	datos.append('estatus', estatus);
	datos.append('accion', 'actualizar');

	xhr.open('POST', 'php/modeloTareas.php', true);

	xhr.onload = function() 
	{
		if (xhr.readyState == 4 && xhr.status == 200) 
		{
			console.log(JSON.parse(xhr.responseText));
			// Actualizar progreso
			actualizarProgreso();
		}
	}

	xhr.send(datos);
}
// Función para eliminar la tarea de la base de datos
function eliminarTareaBD(tarea) 
{
	const id_tarea = tarea.id.split(':');

	const xhr = new XMLHttpRequest();

	const datos = new FormData();

	datos.append('id_tarea', id_tarea[1]);
	datos.append('accion', 'eliminar');

	xhr.open('POST', 'php/modeloTareas.php', true);

	xhr.onload = function() 
	{
		if (xhr.readyState == 4 && xhr.status == 200) 
		{
			console.log(JSON.parse(xhr.responseText));
			actualizarProgreso();
			totalTareas();
		}
	}

	xhr.send(datos);
}
// Función para actualizar el progreso de las tareas
function actualizarProgreso() 
{
	// Obtener todas las tareas de los proyectos
	const tareas = document.querySelectorAll('li.tarea'),
		  totalAvance = document.querySelector('#totalAvance');
	console.log('Total tareas: ' + tareas.length);
	// Obtener las tareas marcadas como completas
	const tareasCompletadas = document.querySelectorAll('i.completo');
	console.log('Tareas completadas: ' + tareasCompletadas.length);
	// Determinar el avance de la lista de tareas que esten completas
	const avance = Math.round( (tareasCompletadas.length / tareas.length) * 100);
	console.log('El avance es: ' + avance);
	// Asignar el avance a la barra de progreso
	const porcentaje = document.querySelector('#porcentaje');
	// validar que el avance sea mayor a cero para mostrar la barra y el avance en pantalla
	if (avance > 0) 
	{
		porcentaje.style.width = avance+'%';
		totalAvance.textContent = avance+'%';
	}
	// Validar que el listado de progreso sea del 100% para que mande una alerta
	if (avance == 100) 
	{
		swal({
			type: 'success',
			title: 'Felicidades!',
			text: 'Has concluido con todas las tareas pendientes'
		});
	}
}
// Función que calcula el total de tareas regustradas en el proyecto
function totalTareas() 
{
	const numero = document.querySelector('#numero'),
		  cantidadTareas = document.querySelectorAll('li.tarea');
	let total = 0;
	cantidadTareas.forEach((tareas)=> {
		// console.log(tareas);
		if (tareas.classList.contains('tarea')) 
		{
			total ++;
		}
	});
	numero.textContent = total;
}
// Función para limpiar el formulario de tareas
function limpiarFormulario() 
{
	btnTarea.reset();
}