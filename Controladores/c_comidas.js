(function() {
    let global_platillos;

    function cargarLocales() {
        $.post("./Modelos/m_comidas.php", { funcion: 'consultar_locales' }, function(data, status) {
            data = JSON.parse(data);
            console.log(data);
            
            if (status == 'success') { // Si la peticion es exitosa 
                
                if (data.estado == 'Existen registros') {

                    let total_locales = data.info.length; // Total de registros

                    for (let index = 0; index < total_locales; index++) { // Por cada registro se crea un <div>
                        let contenedor_tarjetas = $('#tarjetas-locales');
                        let local = data.info[index]; // Informacion de cada registro
                        let datos = {
                            id_local: local.id_local,
                            nombre_local: local.nombre_local,
                            tipo_local: local.tipo_local,
                            foto_logo: local.foto_logo,
                            descripcion: local.descripcion,
                            horario_abrir: local.horario_abrir,
                            horario_cerrar: local.horario_cerrar,
                            id_estado: local.id_estado
                        }
                        // let div = $("<div>");
                        // div.addClass('col-sm contenedor-local');
                        // div.load('./Vistas/tarjeta_local.php', datos);
                        // contenedor_tarjetas.append(div);
                    }
                } else {
                    alert(data.estado);
                }
            }

        });
    }

    function cargarPlatillos(id_local) {

        $.post("./Modelos/m_comidas.php", { funcion: 'consultar_platillos', id_local: id_local }, function(data, status) {
            data = JSON.parse(data);
            if (status == 'success') { // Si la peticion es exitosa
                if (data.estado == 'Existen registros') {

                    let total_platillos = data.info.length; // Total de registros
                    global_platillos = data.info;

                    for (let index = 0; index < total_platillos; index++) { // Por cada registro se crea un <div>
                        let contenedor_tarjetas = $('#tarjetas-comidas');
                        let platillo = data.info[index]; // Informacion de cada registro
                        let datos = {
                            id_platillo: platillo.id_platillo,
                            nombre_platillo: platillo.nombre_platillo,
                            precio: platillo.precio,
                            tiempo_preparacion: platillo.tiempo_preparacion,
                            cantidad: platillo.cantidad,
                            descripcion: platillo.descripcion,
                            ubicacion_imagen: platillo.ubicacion_imagen
                        }
                        let div = $("<div>");
                        div.addClass('card card-cascade narrower contenedor-comida m-2 mt-4');
                        div.load('./Vistas/tarjetas_platillo.php', datos);
                        contenedor_tarjetas.append(div);
                    }

                } else {
                    alert(data.estado);
                }
            }
        });
    }

    function activarFuncionesPlatillos(id_local) {
        $("div.clik-mostrar-platillo").click(function() {
            // e.preventDefault();

            // Funcion filter para buscar un registro en un Array con un campo en especifico
            let platillo_elegido = global_platillos.filter(
                (platillo) => { return platillo.id_platillo == $(this).attr('id') }
            );



            $('#modal-global').load('./Vistas/modal_platillo.php', { platillo_elegido, id_local: id_local });
            setTimeout(() => {
                $('#ordenar_comida').modal('show');
            }, 700);

        });
    }

    // Para aplicar la funcion click despues de que cargue los elementos 
    setTimeout(() => {
        $("div.clik-mostrar-local").click(function(e) {
            e.preventDefault();
            let id_local = $(this).attr('id');
            // let nombre_local = $('#nombre-local-' + id_local).text()
            cargarPlatillos(id_local);

            // Para aplicar la funcion click despues de que cargue los elementos 
            setTimeout(() => {
                activarFuncionesPlatillos(id_local);
            }, 700);

            $("li#paso_uno").removeClass('active');
            $("li#paso_uno").addClass('done');

            $("li#paso_dos").removeClass('done');
            $("li#paso_dos").addClass('active');

            $("#tarjetas-comidas").removeClass('d-none');


            $("#tarjetas-locales").slideUp('slow');
            $("#tarjetas-comidas").slideDown('slow');

        });
    }, 700);

    $("#paso_uno_link").click(function(e) {
        e.preventDefault();
        $("li#paso_uno").addClass('active');
        $("li#paso_uno").removeClass('done');

        $("li#paso_dos").removeClass('active');
        $("li#paso_dos").addClass('done');

        $("#tarjetas-locales").slideDown('slow');
        $("#tarjetas-comidas").slideUp('slow');

        $("#tarjetas-comidas").empty();
    });

    cargarLocales();

}());