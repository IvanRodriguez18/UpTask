<?php  
function conexionBD()
{
	try 
	{
		$conexion = new PDO('mysql:host=localhost;dbname=uptask', 'root', '');
		$conexion->query("SET NAMES 'utf8'");
		return $conexion;
	} catch (PDOException $e) 
	{
		return false;
	}
}
function obtenerPagina()
{
	$pagina = basename($_SERVER['PHP_SELF']);
	$actual = str_replace('.php', '', $pagina);
	$actual = ucwords($actual);
	return $actual;
}
function limpiarDatos($dato)
{
	$dato = trim($dato);
	$dato = htmlspecialchars($dato);
	$dato = stripslashes($dato);
	return $dato;
}
function encriptaPassword($password)
{
	$password = hash('sha512', $password);
	return $password;
}
function iniciaSesion($sql, $conecta)
{
	$statement = $conecta->prepare($sql);
	$statement->execute();
	$resultado = $statement->fetch();
	return $resultado;
}
function ingresaRegistro($sql, $conecta)
{
	$statement = $conecta->prepare($sql);
	$statement->execute();
	return $statement;
}
function obtenerRegistros($sql, $conecta)
{
	$statement = $conecta->prepare($sql);
	$statement->execute();
	$resultado = $statement->fetchAll();
	return $resultado;
}
function actualizaRegistro($sql, $conecta)
{
	$statement = $conecta->prepare($sql);
	$statement->execute();
	return $statement;
}
function eliminaRegistro($sql, $conecta)
{
	$statement = $conecta->prepare($sql);
	$statement->execute();
	return $statement;
}
function obtenerRegistroById($sql, $conecta)
{
	$statement = $conecta->prepare($sql);
	$statement->execute();
	$resultado = $statement->fetchAll();
	return $resultado;
}
function validaId($id)
{
	return (int)limpiarDatos($id);
}
?>