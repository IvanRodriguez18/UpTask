	<script src="js/sweetalert2.all.min.js"></script>
	<?php  
		$pagina_actual = obtenerPagina();
		if ($pagina_actual == 'Login' || $pagina_actual == 'Registro') {
			echo "<script src='js/formulario.js'></script>";
		} else {
			echo "<script src='js/app.js'></script>";
		}
	?>
</body>
</html>