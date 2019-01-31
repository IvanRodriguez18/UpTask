<?php
session_start();
if (isset($_SESSION['usuario'])) {
 	header('Location:administrador.php');
 } 
include 'includes/funciones.php'; 
include 'includes/header.php';
?>
<div class="container">
	<div class="formulario">
		<div class="title-formulario">UpTask-Login</div>
		<form id="formulario">
			<div class="campos">				
				<input type="text" name="usuario" id="usuario" placeholder="Usuario" autocomplete="off">
				<input type="password" name="password" id="password" placeholder="Password" autocomplete="off">
			</div>
			<div class="campos">
				<input type="hidden" id="tipo" value="login">
				<input type="submit" value="Ingresar">
			</div>
		</form>
		<div class="redireccion">
			¿Aún no tienes cuenta?
			<a href="registro.php">Registrate aquí</a>
		</div>
	</div>
</div>
<?php include 'includes/footer.php';?>