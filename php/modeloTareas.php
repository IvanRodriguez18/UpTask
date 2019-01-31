<?php
error_reporting(0);

include '../includes/funciones.php';

$conecta = conexionBD();

if (!$conecta) 
{
	echo "Error de conexión";
	die();
}

$tarea = limpiarDatos($_POST['tarea']);
$id_proyecto = validaId($_POST['id_proyecto']);
$id_tarea = validaId($_POST['id_tarea']);
$estatus = validaId($_POST['estatus']);
$accion = $_POST['accion'];

if ($accion == 'crear') 
{
	if (!empty($tarea)) 
	{
		$sql_tarea = "INSERT INTO tareas VALUES(NULL, '$tarea', 0, '$id_proyecto')";

		$resultado = ingresaRegistro($sql_tarea, $conecta);

		if ($resultado !== false) 
		{
			$respuesta = array('success' => true, 
							   'id_last' => $conecta->lastInsertId(),
							   'tarea' => $tarea,
							   'accion' => $accion,
							   'message' => 'La tarea se registro correctamente');
		}
		else
		{
			$respuesta = array('error' => false, 
							   'message' => 'Ha ocurrido un error durante el proceso');
		}

		echo json_encode($respuesta);
	}
}

if ($accion == 'actualizar') 
{
	if (isset($estatus)) 
	{
		$sql_actualiza = "UPDATE tareas SET estatus='$estatus' WHERE id_tarea='$id_tarea'";

		$resultado = actualizaRegistro($sql_actualiza, $conecta);

		if ($resultado !== false) 
		{
			$respuesta = array('success' => true);
		}
		
	}else
	{
		$respuesta = array('error' => $estatus);
	}
	echo json_encode($respuesta);
}

if ($accion == 'eliminar') 
{
	$sql_elimina = "DELETE FROM tareas WHERE id_tarea='$id_tarea'";

	$resultado = eliminaRegistro($sql_elimina, $conecta);

	if ($resultado !== false) 
	{
		$respuesta = array('success' => true);
	}

	echo json_encode($respuesta);
}

?>