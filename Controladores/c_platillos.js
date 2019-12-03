(function () {

    $('a#nuevo_platillo').click(function () {
        $('#modal-global').empty();
        $('#modal-global').load('./Vistas/v_agregar_platillo.html');        
        setTimeout(() => {
            $('#modal_agregar_platillo').modal('toggle');
        }, 700);
    });       

}());