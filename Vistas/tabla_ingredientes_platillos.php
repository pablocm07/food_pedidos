<?php

    $id_detalle_platillo = (isset($_POST['id_detalle_platillo'])) ? $_POST['id_detalle_platillo'] : '';
    $id_platillo = (isset($_POST['id_platillo'])) ? $_POST['id_platillo'] : '';
    $id_ingrediente = (isset($_POST['id_ingrediente'])) ? $_POST['id_ingrediente'] : '';
    $id_estado = (isset($_POST['id_estado'])) ? $_POST['id_estado'] : '';
    $nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
?>


<!-- TABLA DE INGREDIENTES -->
<td>
    <?php echo($nombre); ?>
</td>

<td class="text-center">
    <div class="switch">
        <label>
            NO
            <input id="activado_<?php echo($id_detalle_platillo); ?>" type="checkbox" checked>
            <span class="lever mr-3"></span>
            SI
        </label>
    </div>
</td>

<td>
    <button id_ingrediente="<?php echo($id_ingrediente); ?>" id_platillo="<?php echo($id_platillo); ?>" id_detalle_platillo="<?php echo($id_detalle_platillo); ?>" id="activado_<?php echo($id_detalle_platillo); ?>" class="boton_eliminar_ingrediente btn btn-sm btn-rounded btn-danger">Eliminar</button>
</td>

<!-- TABLA DE INGREDIENTES -->