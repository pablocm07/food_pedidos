(function() {

    setTimeout(() => {
        $('#boton-agregar-platillo').click(function(e) {
            // Obtener el total de checkbox que estan seleccionados
            console.log($('ul li > a > label > input:checkbox:checked').length);
            // console.log('Ok');
        });
    }, 350);

    $('#select-multiple-ingredientes').multiselect();

}());