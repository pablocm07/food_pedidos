<script type="text/javascript" src="./Plugins/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" href="./Plugins/css/bootstrap-multiselect.css">   

<?php
    $id_platillo = (isset($_POST['id_platillo'])) ? $_POST['id_platillo'] : '';
?>


<!-- MODAL PARA AGREGAR UN NUEVO PLATILLO -->
<div id="modal_agregar_ingrediente" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal_agregar_ingrediente"
aria-hidden="false" data-backdrop="true">

<div class="modal-dialog" role="document">
    
    <div class="modal-content">
        
        <div class="modal-header bg-primary text-white text-center">
            
            <h5 class="modal-title m-auto">
                Agregar un nuevo Ingrediente al Platillo
            </h5>
            
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            
        </div>
        
        <!-- CONTENIDO DEL MODAL -->
        <div class="modal-body">
            
            <!-- FORMULARIO DE REGISTRO -->
            <form id="form-agregar-nuevo-ingrediente">
                
                    <input type="hidden" id="id_platillo" value="<?php echo($id_platillo); ?>">
                    
                    <div class="text-center">                                

                        <label for="select-multiple-ingredientes">Ingredientes</label>
                        <select id="select-multiple-ingredientes" class="custom-select" multiple="multiple">                                    
                            
                        </select> 

                    </div>              

                </form>
                <!-- FORMULARIO DE REGISTRO -->

            </div>
            <!-- CONTENIDO DEL MODAL -->

            <!-- FOOTER DEL CONTENIDO DEL MODAL -->
            <div id="contenido-footer-ingrediente" class="modal-footer justify-content-center">
                <a id="insertar_ingredientes" type="button" class="btn btn-outline-warning">
                    Agregar Ingredientes 
                    <i class="fal fa-drumstick ml-1"></i></a>
            </div>
            <!-- FOOTER DEL CONTENIDO DEL MODAL -->
        </div>

    </div>

</div>


<!-- SCRIPT DE LAS FUNCIONALIDADES DEL FORMULARIO PARA AGREGAR UN NUEVO INGREDIENTE -->
<script rel="script" src="./Controladores/c_agregar_ingrediente_platillo.js"></script>