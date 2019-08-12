(function () {

    function cargarLocales(){
        $.post("./Modelos/m_comidas.php", {funcion: 'consultar_locales'}, function (data, status) {
            data = JSON.parse(data);
            // console.log(data);
            if(status == 'success'){ // Si la peticion es exitosa 
                if (data.estado == 'Existen registros'){

                    let total_locales = data.info.length; // Total de registros

                    for (let index = 0; index < total_locales; index++) { // Por cada registro se crea un <div>
                        let contenedor_tarjetas = $('#tarjetas-locales');
                        let local = data.info[index]; // Informacion de cada registro
                        let datos = {
                            nombre_local: local.nombre_local,
                            tipo_local: local.tipo_local,
                            foto_logo: local.foto_logo,
                            descripcion: local.descripcion,
                            horario_abrir: local.horario_abrir,
                            horario_cerrar: local.horario_cerrar,
                            id_estado: local.id_estado
                        }                
                        let div = $("<div>");
                        div.addClass('col-sm contenedor-local');
                        div.attr('id', local.id_local);
                        div.load('./Vistas/tarjeta_local.php', datos);
                        contenedor_tarjetas.append(div);
                    }                
                }else{
                    alert(data.estado);
                }
            }
        });
    }

    function cargarPlatillos(id_local){
        $.post("./Modelos/m_comidas.php", {funcion: 'consultar_platillos', id_local: id_local}, function (data, status)  {  
            data = JSON.parse(data);
            if (status == 'success'){    // Si la peticion es exitosa
                if (data.estado == 'Existen registros'){

                    let total_platillos = data.info.length; // Total de registros

                    // console.log(data);

                    for (let index = 0; index < total_platillos; index++) { // Por cada registro se crea un <div>
                        let contenedor_tarjetas = $('#tarjetas-comidas');
                        let platillo = data.info[index]; // Informacion de cada registro
                        let datos = {
                            nombre_platillo: platillo.nombre_platillo,
                            precio: platillo.precio,
                            tiempo_preparacion: platillo.tiempo_preparacion,
                            cantidad: platillo.cantidad,
                            descripcion: platillo.descripcion,
                            ubicacion_imagen: platillo.ubicacion_imagen
                        }                
                        let div = $("<div>");
                        div.addClass('card card-cascade narrower contenedor-comida m-2 mt-4');
                        div.attr('id', platillo.id_platillo);                        
                        div.load('./Vistas/tarjetas_platillo.php', datos);
                        setTimeout(() => {
                            div.fadeIn(2000);
                            contenedor_tarjetas.append(div);
                        }, 100);
                    }                
                    
                }else{
                    alert(data.estado);
                }
            }
        });
    }

    setTimeout(() => {
        $("div.contenedor-local").click(function (e) {
            e.preventDefault();
    
            // console.log($(this).attr('id'));
            cargarPlatillos($(this).attr('id'));
    
            $("li#paso_uno").removeClass('active');
            $("li#paso_uno").addClass('done');
    
            $("li#paso_dos").removeClass('done');
            $("li#paso_dos").addClass('active');
    
            $("#tarjetas-comidas").removeClass('d-none');
    
    
            $("#tarjetas-locales").slideUp('slow');
            $("#tarjetas-comidas").slideDown('slow');
    
        });        
    }, 500);

    $("#paso_uno_link").click(function (e) {
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