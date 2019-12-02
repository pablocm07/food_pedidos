(function () {

    $('a#nuevo_platillo').click(function () {
        $('#modal-global').empty();
        $('#modal-global').load('./Vistas/v_detalle_platillo.html');
        $('#modal-global').modal('toggle');
    });       

}());