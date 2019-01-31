<?php 
session_start();
error_reporting(0);
if (!isset($_SESSION['usuario'])) 
{
	header('Location:login.php');
}
include 'includes/funciones.php'; 
include 'includes/header.php';
$conecta = conexionBD();
$id_proyecto = validaId($_GET['id']);
if (!empty($id_proyecto)) {
	$sql_by_id = "SELECT * FROM proyectos WHERE id_proyecto='$id_proyecto' LIMIT 1";
	$resultado = obtenerRegistroById($sql_by_id, $conecta);
	if ($resultado !== false) {
		$resultado = $resultado[0];
	}
	// consulta para listar las tareas que pertenecen al proyecto
	$sql_all_tareas = "SELECT * FROM tareas WHERE proyecto_id='$id_proyecto' ORDER BY id_tarea DESC";
	$tareas = obtenerRegistros($sql_all_tareas, $conecta);
}
?>
<div class="container">
	<nav class="barra">
		<h2 class="title-barra">UpTask - Administrador de Proyectos</h2>
		<div class="barra-usuario">
			<span class="info-usuario">
				<i class="icono fas fa-user-circle"></i> <span class="username"><?php echo $_SESSION['usuario'];?></span>
			</span>
			<a href="logout.php">Cerrar Sesión</a>
		</div>
	</nav>
	<div class="principal">
		<?php include 'includes/sidebar.php';?>
		<main class="contenido">
			<?php if (!empty($resultado['titulo'])):?>
				<h1>Proyecto Actual: <?php echo $resultado['titulo']; ?></h1>
				<div class="form-tareas">
					<form id="frm-tareas">
						<div class="campos">
							<input type="text" name="tarea" id="tarea" placeholder="Agrega nueva tarea.......">
						</div>
						<input type="hidden" id="identificador" value="<?php echo $resultado['id_proyecto'];?>">
						<input type="submit" value="Agregar">
					</form>
				</div>
			<?php else: ?>
				<p>Selecciona un proyecto de tu menú</p>
			<?php endif;?>
			<h3>Listado de Tareas</h3>
			<div class="totalTareas">
				<p class="texto">Total de tareas: <span id="numero"></span></p>
			</div>
			<div class="pendientes">
				<ul>
					<?php if ($tareas !== false):?>
						<?php foreach ($tareas as $tarea):?>
							<li id="tarea:<?php echo $tarea['id_tarea'];?>" class="tarea">
								<p><?php echo $tarea['tarea'];?></p>
								<div class="acciones">
									<i class="icono-accion fas fa-check-circle 
									<?php echo ($tarea['estatus'] == 1) ? 'completo' : '';?>"></i>
									<i class="icono-accion fas fa-times-circle"></i>
								</div>
							</li>
						<?php endforeach;?>
					<?php endif;?>
				</ul>
			</div>
			<div class="progreso">
				<h4>Avance del proyecto</h4>
				<div class="barra-avance" id="barra-avance">
					<div class="porcentaje" id="porcentaje"><span id="totalAvance"></span></div>
				</div>
			</div>
		</main>
	</div>
<!-- 	<div class="barra">
		<p class="footer">&copy; Administrador de Proyectos UpTask</p>
	</div> -->
</div>
<?php include 'includes/footer.php'; ?>