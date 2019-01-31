<aside class="lateral">
	<div class="boton-crear">
		<button type="button" class="btn-crear" id="btn-crear">
			Nuevo Proyecto <i class="fas fa-plus-square"></i>
		</button>
	</div>
	<div class="lista-proyecto">
		<h3>Proyectos</h3>
		<ul id="lista">
			<?php  
				$sql_proyectos = "SELECT * FROM proyectos ORDER BY id_proyecto DESC";
				$registros = obtenerRegistros($sql_proyectos, $conecta);
			?>
			<?php if ($registros !== false):?>
				<?php foreach ($registros as $registro):?>
					<li>
						<a href="administrador.php?id=<?php echo $registro['id_proyecto'];?>" 
								id="proyecto:<?php echo $registro['id_proyecto'];?>">
							<?php echo $registro['titulo']; ?>
						</a>
					</li>
				<?php endforeach;?>
			<?php endif;?>
		</ul>
	</div>
</aside>