(function () {

    let platillos_cache;        

    const consultar_platillos = function () {        
        let url = './Modelos/m_platillos.php';
        $.post(url, { funcion: 'consultar_platillos' }, function (data, status) {
            
            let datos = JSON.parse(data);                        
            
            if (status == 'success') { // SI SE OBTUVO RESULTADO DE LA PETICION
                
                if (datos.estado == 'Tiene platillos') {

                    let total_platillos = datos.platillos.length; // Total de registros
                    platillos_cache = datos.platillos;                    

                    for (let index = 0; index < total_platillos; index++) { // Por cada registro se crea una tarjeta nueva para el accordeon

                        let platillo = datos.platillos[index]; // Informacion de cada registro
                        let datos_platillos = {
                            id_platillo: platillo.id_platillo,
                            nombre_platillo: platillo.nombre_platillo,
                            precio: platillo.precio,
                            precio_ing_extra: platillo.precio_ing_extra,
                            tiempo_preparacion: platillo.tiempo_preparacion,
                            cantidad: platillo.cantidad,
                            descripcion: platillo.descripcion,
                            ubicacion_imagen: platillo.ubicacion_imagen
                        }
                        let div = $("<div>");                        
                        div.load('./Vistas/locales_platillo.php', datos_platillos);
                        $('#contenedor-platillos').append(div);
                    }                    

                } else {

                    $('#acordeon-platillos').append(
                        '<div class="container text-center pb-3">'+

                            '<img src="./Assets/img/sin_resultados.png" class="imagen-s-resultados" alt="Sin platillos">' +
                        
                            '<p class="h5 color-food-fontOrange">' +
                                'Aún no tienes platillos agregados. ' +
                            '</p>' +

                        '</div>'
                    );                                    

                }
            }            
        }); 
    }        

    consultar_platillos();      

    $('a#nuevo_platillo').click(function () {
        $('#modal-global').empty();
        $('#modal-global').load('./Vistas/v_agregar_platillo.html');        
        setTimeout(() => {
            $('#modal_agregar_platillo').modal('toggle');
        }, 700);
    });  

    $('#contenedor-platillos').on('click', 'a#nuevo_ingrediente', function (e) { 
        e.preventDefault();        
        let id_platillo = $(this).attr('id_platillo');    
        console.log(id_platillo);
    });   


}());
