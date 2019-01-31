<?php 
header('Content-Type: application/json');

error_reporting(0);

include '../includes/funciones.php';

$conecta = conexionBD();

if (!$conecta) {
	echo "Error de conexión";
	die();
}

$nombre = limpiarDatos($_POST['nombre']);
$usuario = limpiarDatos($_POST['usuario']);
$password = limpiarDatos(strtolower($_POST['password']));
$accion = $_POST['accion'];

if ($accion == 'crear') 
{
	if (!empty($nombre) && !empty($usuario) && !empty($password)) 
	{
		$password = encriptaPassword($password);
		$sql_ingresa = "INSERT INTO usuarios VALUES(NULL, '$nombre', '$usuario', '$password')";
		$resultado = ingresaRegistro($sql_ingresa, $conecta);
		if ($resultado !== false) 
		{
			$respuesta = array('success' => true,
							   'id_last' => $conecta->lastInsertId(),
							   'accion' => $accion);
		}else
		{
			$respuesta = array('error' => false,
							   'message' => 'Se ha producido un error intentalo más tarde');
		}
	}
	echo json_encode($respuesta);
}

if ($accion == 'login') 
{
	if (!empty($usuario) && !empty($password)) 
	{
		$password = encriptaPassword($password);

		$sql_sesion = "SELECT * FROM usuarios WHERE usuario='$usuario' AND password='$password'";

		$resultado = iniciaSesion($sql_sesion, $conecta);

		if ($resultado !== false) 
		{
			session_start();

			$_SESSION['usuario'] = $usuario;

			$respuesta = array('success' => true,
							   'usuario' => $usuario,
							   'accion' => $accion);

		}
		else
		{
			$respuesta = array('error' => false,
							   'message' => 'Usuario y/o Password Incorrectos');
		}
		echo json_encode($respuesta);
	}
}
?>