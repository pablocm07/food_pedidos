(function () {    

    $('button.detalle_pedido').click(function () {            
        $('#modal-global').empty();            
        $('#modal-global').load('./Vistas/v_detalle_pedido.html');                                        
        $('#modal-global').modal('toggle');                
    });    

    $('button.close').click(function () {         
        $('#modal-global').empty();                                                                 
        $('#barras-navegacion').load('./Vistas/barras_navegacion.html');
        $('#container').load('./Vistas/fondo.html');        
        $('.modal-backdrop').remove(); // Para remover el backdrope modal del body
    });

}());