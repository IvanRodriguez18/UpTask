<?php  
error_reporting(0);

include '../includes/funciones.php';

$conecta = conexionBD();

if (!$conecta) {
	echo "Error de conexión";
	die();
}

$proyecto = limpiarDatos($_POST['proyecto']);

$accion = $_POST['accion'];

if ($accion == 'crear') 
{
	if (!empty($proyecto)) 
	{
		$sql_proyecto = "INSERT INTO proyectos VALUES(NULL, '$proyecto')";

		$resultado = ingresaRegistro($sql_proyecto, $conecta);

		if ($resultado !== false) 
		{
			$respuesta = array('success' => true,
							   'message' => 'El proyecto: '.$proyecto.' se almaceno correctamente',
							   'id_last' => $conecta->lastInsertId(),
							   'proyecto' => $proyecto,
							   'accion' => $accion);
		}
		else
		{
			$respuesta = array('error' => false,
							   'message' => 'Se ha producido un error, intentalo más tarde');
		}
		echo json_encode($respuesta);
	}
}
?>