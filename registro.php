<?php include 'includes/funciones.php'; include 'includes/header.php';?>
<div class="container">
	<div class="formulario">
		<div class="title-formulario">UpTask-Registro</div>
		<form id="formulario">
			<div class="campos">
				<input type="text" name="nombre" id="nombre" placeholder="Nombre(s)" autocomplete="off">				
				<input type="text" name="usuario" id="usuario" placeholder="Usuario" autocomplete="off">
				<input type="password" name="password" id="password" placeholder="Password" autocomplete="off">
			</div>
			<div class="campos">
				<input type="hidden" id="tipo" value="crear">
				<input type="submit" value="Registrar">
			</div>
		</form>
		<div class="redireccion">
			<a href="login.php">Ir al Login</a>
		</div>
	</div>
</div>
<?php include 'includes/footer.php';?>