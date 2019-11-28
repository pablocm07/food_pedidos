(function() {

    function cerrarSesion(url) {
        $.post(url, { funcion: 'cerrar_sesion' }, function(data, status) {
            // console.log(status);
        });
    }

    function obtenerDatosSesion() {
        let url = './Modelos/m_login.php';
        $.post(url, { funcion: 'datos_sesion' }, function(data, status) {
            data = JSON.parse(data);
            if (status) {
                mostrarInformacion(data.usuario);
            }
        });
    }

    function mostrarInformacion(usuario_info) {
        $('#perfil').text(usuario_info.nombre + " " + usuario_info.apellido);
        let src_foto_logo = (usuario_info.foto_perfil ? usuario_info.foto_perfil : "");
        $('#correo_usuario').text(usuario_info.correo_electronico)
        if (src_foto_logo != "") {
            $('#foto_usuario').attr('src', src_foto_logo);
        }
        if (usuario_info.id_tipo_usuario == 2) {
            $('#comidas').remove();
            $('#hr-comidas').remove();
            $('#favoritos').remove();
            $('#hr-favoritos').remove();
        } else if (usuario_info.id_tipo_usuario == 3) {
            $('#pedidos').remove();
            $('#hr-pedidos').remove();
            $('#platillos').remove();
            $('#hr-platillos').remove();
        }
    }

    $("#signout").click(function() {
        Swal.fire({
            title: '¿Quieres salir de FoodPedidos?',
            text: "Desea cerrar tu sesión",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar sesión'
        }).then((result) => {
            if (result.value) {
                // Aqui se obtiene el url actual, para recargar la pagina
                var pathname = window.location.pathname;
                var dominio = pathname;
                let url_cerrar = './Modelos/m_login.php';
                cerrarSesion(url_cerrar);
                setTimeout(() => {
                    window.location.href = dominio;
                }, 200);
            }
        })
    });

    $("#pedidos").click(function() {
        $("#contenedor-todas-vistas").load('./Vistas/v_pedidos.html');
        $('#sidebar').toggleClass('active');
    });
    
    $("#platillos").click(function () {
        $("#contenedor-todas-vistas").load('./Vistas/v_platillos.html');
        $('#sidebar').toggleClass('active');
    });

    $("#comidas").click(function() {
        $("#contenedor-todas-vistas").load('./Vistas/v_comidas.html');
        $('#sidebar').toggleClass('active');
    });

    $("#favoritos").click(function() {
        $("#contenedor-todas-vistas").load('./Vistas/v_favoritos.html');
        $('#sidebar').toggleClass('active');
    });

    $("#perfil").click(function() {
        $("#contenedor-todas-vistas").load('./Vistas/v_perfil.html');
        $('#sidebar').toggleClass('active');
    });

    setTimeout(() => {
        $('#sidebarCollapse').on('click', function() {
            $('#sidebar').toggleClass('active');
        });

        $('#cerrar_sidebar').on('click', function() {
            $('#sidebar').toggleClass('active');
        });
    }, 500);

    obtenerDatosSesion();

}());