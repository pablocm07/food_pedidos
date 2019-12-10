(function () {

    let contador_exitos = 0;
    let id_ingredientes_seleccionados = new Array;
    
    function llenarComboIngredientes() {
        let url = './Modelos/m_ingredientes.php';
        $.post(url, { funcion: 'consultar_ingredientes' }, function (data, status) {
            data = JSON.parse(data);
            if (status) { //SI LA PETICION FUE EXITOSA
    
                if (data.estado == 'Tiene ingredientes') { //SI ESTE LOCAL TIENE INGREDIENTES                    
                    let total_ingredientes = data.ingredientes.length;
    
                    for (let i = 0; i < total_ingredientes; i++) {
                        $('#select-multiple-ingredientes').append('<option value="' + data.ingredientes[i].id_ingrediente + '">' + data.ingredientes[i].nombre + '</option>');                        
                    }
    
                } else { //SI ESTE LOCAL NO TIENE INGREDIENTES
    
                }
            }
        });
    }

    $("#select-multiple-ingredientes").on('change', function () {
        id_ingredientes_seleccionados = $(this).val();        
    });
    
    $("a#insertar_ingredientes").on('click', function () {
        
        if (id_ingredientes_seleccionados.length > 0) {                            

            for (let index = 0; index < id_ingredientes_seleccionados.length; index++) {                
                insertarIngrediente(id_ingredientes_seleccionados[index], id_ingredientes_seleccionados.length);
            }

        } else {
            $("#form-agregar-nuevo-ingrediente").addClass('was-validated');
        }
    });    
    
    const insertarIngrediente = function (id_ingrediente, numero_registros) {  
        let id_platillo = $("#id_platillo").val();
        $.ajax({
            method: 'POST',
            url: "./Modelos/m_platillos.php",
            data: {
                funcion: 'insertar_ingrediente_platillo',
                id_platillo: id_platillo,
                id_ingrediente: id_ingrediente
            }
        }).done(function (data) {            
            // console.log(data);
            let respuesta_servidor = JSON.parse(data);    
            
            if (respuesta_servidor.respuesta == '1') {   //SI SE INSERTO UN REGISTRO CON EXITO             
                
                contador_exitos += 1;
                
                if (contador_exitos == numero_registros) {
                    $('#modal_agregar_ingrediente').modal('hide');
                    consultarIngredientes(id_platillo);
                    Swal.fire({
                        type: 'success',
                        title: '¡Correcto!',
                        buttonsStyling: false,
                        confirmButtonText: 'Se agregaron correctamente los ingredientes.',
                        confirmButtonClass: 'btn btn-md btn-success'
                    });

                }

            }else {

                $('#modal_agregar_ingrediente').modal('hide');
                Swal.fire({
                    type: 'error',
                    title: '¡Lo sentimos, algo ha salido mal!',
                    buttonsStyling: false,
                    confirmButtonText: 'Intentalo de nuevo más tarde.',
                    confirmButtonClass: 'btn btn-md btn-info'
                });

            }

        });
    }
    
    llenarComboIngredientes();

    const consultarIngredientes = function (id_platillo) {
        let url = './Modelos/m_platillos.php';

        $.post(url, { funcion: 'consultar_ingredientes_platillo', id_platillo: id_platillo }, function (data, status) {

            let datos = JSON.parse(data);

            if (status == 'success') { // SI SE OBTUVO RESULTADO DE LA PETICION

                const tabla = $('#tabla_ingredientes_' + id_platillo);
                tabla.empty();

                if (datos.estado == 'Tiene ingredientes') {

                    // console.log(datos.ingredientes);

                    let total_ingredientes = datos.ingredientes.length; // Total de registros
                    ingredientes_cache = datos.ingredientes;

                    for (let index = 0; index < total_ingredientes; index++) { // Por cada registro se crea una tarjeta nueva para el accordeon

                        let ingrediente = datos.ingredientes[index]; // Informacion de cada registro
                        // console.log(ingrediente);
                        let datos_ingrediente = {
                            id_platillo: ingrediente.id_platillo,
                            id_detalle_platillo: ingrediente.id_detalle_platillo,
                            id_ingrediente: ingrediente.id_ingrediente,
                            id_estado: ingrediente.id_estado,
                            nombre: ingrediente.nombre
                        }
                        let tr = $("<tr>");
                        tr.load('./Vistas/tabla_ingredientes_platillos.php', datos_ingrediente);
                        $(tabla).append(tr);

                    }

                } else {

                    $(tabla).append('<tr class="text-center"><td colspan="3">No tiene añadido ningún ingrediente a este platillo.<td></tr>');

                }
            }
        });
    }

    setTimeout(() => {
        $('#select-multiple-ingredientes').multiselect();
    }, 500);
    

}());
