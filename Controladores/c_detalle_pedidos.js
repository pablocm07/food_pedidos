(function () {    

    $('button.detalle_pedido').click(function () {            
        $('#modal-global').empty();            
        $('#modal-global').load('./Vistas/v_detalle_pedido.html');    
        setTimeout(() => {            
            $('#modal_detalle_pedido').modal('toggle');                
        }, 700);
    });   

}());