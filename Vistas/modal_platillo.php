<!-- MODAL QUE MUESTRA LA INFORMACIÓN DEL PRODUCTO A PEDIR -->
<div class="modal fade" id="ordenar_comida" tabindex="-1" role="dialog" aria-labelledby="ordenar_comida"
    aria-hidden="false" data-backdrop="true">

    <div class="modal-dialog modal-lg" role="document">

        <!-- CONTENEDOR DEL MODAL -->
        <div class="modal-content">

            <!-- CABECERA DEL MODAL -->
            <div class="modal-header border-0">
                <button type="button" class="close pr-2 pt-1 pb-1" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- CABECERA DEL MODAL -->

            <!-- CUERPO DEL MODAL -->
            <div class="modal-body pt-0">

                <div class="row">

                    <!-- CONTENEDOR DEL MINI CAROUSEL -->
                    <div class="col-lg-5">

                        <!-- CAROUSEL CON IMAGENES DE LA COMIDA -->
                        <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails"
                            data-ride="carousel">

                            <!--Slides-->
                            <div class="carousel-inner z-depth-2" role="listbox">

                                <div class="carousel-item active">
                                    <img height="195px" width="373px" class="d-block rounded" src="./Assets/img/comida_1.jpg" alt="First slide">
                                </div>                                                                        

                                <div class="carousel-item">
                                    <img height="195px" width="373px" class="d-block rounded" src="./Assets/img/comida_2.jpg" alt="Second slide">
                                </div>

                                <div class="carousel-item">
                                    <img height="195px" width="373px" class="d-block rounded" src="./Assets/img/comida_3.jpg" alt="Third slide">
                                </div>

                            </div>
                            <!--/.Slides-->

                            <!--Controls-->
                            <a class="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                            <!--/.Controls-->

                            <ol class="carousel-indicators">
                                <li data-target="#carousel-thumb" data-slide-to="0" class="pt-2">
                                    <img class='img-thumbnail' src="./Assets/img/comida_1.jpg">
                                </li>
                                <li data-target="#carousel-thumb" data-slide-to="1" class="pt-2">
                                    <img class='img-thumbnail' src="./Assets/img/comida_2.jpg">
                                </li>
                                <li data-target="#carousel-thumb" data-slide-to="2" class="pt-2">
                                    <img class='img-thumbnail' src="./Assets/img/comida_3.jpg">
                                </li>
                            </ol>
                        </div>
                        <!-- CAROUSEL CON IMAGENES DE LA COMIDA -->

                    </div>
                    <!-- CONTENEDOR DEL MINI CAROUSEL -->

                    <!-- CONTENEDOR DE LA INFORMACION DEL PEDIDO -->
                    <div class="col-lg-7">

                        <!-- NOMBRE DEL PLATILLO -->
                        <h2 class="h2-responsive product-name cyan-lighter-hover">
                            <strong id='nombre_platillo'>Chilaquiles</strong>
                        </h2>
                        <!-- NOMBRE DEL PLATILLO -->

                        <!-- CONTENEDOR DEL PRECIO DEL PLATILLO -->
                        <h4 class="h4-responsive">
                            <span class="green-text">
                                <strong id='precio-platillo'>$ 25.00 <span id='unidad_platillo'>C/U </span></strong>
                            </span>

                            <!-- PARA CUANDO HAYA DESCUENTOS -->
                            <!-- <span class="grey-text">
                                <small>
                                    <s>$89</s>
                                </small>
                            </span> -->
                            <!-- PARA CUANDO HAYA DESCUENTOS -->
                        </h4>
                        <!-- CONTENEDOR DEL PRECIO DEL PLATILLO -->

                        <!-- FORMULARIO PARA AGREGAR DETALLES DEL PEDIDO -->
                        <div class="card-body">

                            <!-- INPUT CON BOTONES PARA AGREGAR O ELIMINAR SELECTS PARA DETALLES DEL PEDIDDO -->
                            <div class="input-group mb-3">

                                <div class="input-group-prepend">
                                    <button
                                        class="btn btn-md btn-outline-danger m-0 px-3 py-2 z-depth-0 waves-effect"
                                        type="button" id="agregar_cantidad_platillo"><i
                                            class="fas fa-minus"></i></button>
                                </div>

                                <input type="number" class="text-center font-weight-bold form-control" value='1'>

                                <div class="input-group-prepend">
                                    <button
                                        class="btn btn-md btn-outline-success m-0 px-3 py-2 z-depth-0 waves-effect"
                                        type="button" id="eliminar_cantidad_platillo"><i
                                            class="fas fa-plus"></i></button>
                                </div>

                            </div>

                            <hr>
                            <!-- INPUT CON BOTONES PARA AGREGAR O ELIMINAR SELECTS PARA DETALLES DEL PEDIDDO -->

                            <div class="table-responsive">

                                <table id="tabla-detalle-pedido" class="tabla-detalle-pedido table table-hover">

                                    <thead>
                                        <tr class="text-center">
                                            <th scope="col">Ingrediente</th>
                                            <th scope="col">Agregar Ingrediente</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr class="text-center">
                                            <td>
                                                <select class="browser-default custom-select">
                                                    <option selected>Escoge un ingrediente</option>
                                                    <option value="1">Milanesa</option>
                                                    <option value="2">Pierna</option>
                                                    <option value="3">Salchicha</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button class="btn btn-outline-primary btn-sm">
                                                    Agregar
                                                </button>
                                            </td>
                                        </tr>

                                        <tr class="text-center">
                                            <td>
                                                <select class="browser-default custom-select">
                                                    <option selected>Escoge un ingrediente</option>
                                                    <option value="1">Milanesa</option>
                                                    <option value="2">Pierna</option>
                                                    <option value="3">Salchicha</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button class="btn btn-outline-primary btn-sm">
                                                    Agregar
                                                </button>
                                            </td>
                                        </tr>

                                        <tr class="text-center">
                                            <td>
                                                <select class="browser-default custom-select">
                                                    <option selected>Escoge un ingrediente</option>
                                                    <option value="1">Milanesa</option>
                                                    <option value="2">Pierna</option>
                                                    <option value="3">Salchicha</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button class="btn btn-outline-primary btn-sm">
                                                    Agregar
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                            <!-- CONTENEDOR DEL BOTON PARA AGREGAR AL PEDIDO -->
                            <div class="text-center">

                                <button class="btn btn-outline-warning">Agregar al pedido
                                    <i class="fas fa-concierge-bell ml-2" aria-hidden="true"></i>
                                </button>

                            </div>
                            <!-- CONTENEDOR DEL BOTON PARA AGREGAR AL PEDIDO -->

                        </div>
                        <!-- FORMULARIO PARA AGREGAR DETALLES DEL PEDIDO -->

                    </div>
                    <!-- CONTENEDOR DE LA INFORMACION DEL PEDIDO -->

                </div>

            </div>
            <!-- CUERPO DEL MODAL -->

        </div>
        <!-- CONTENEDOR DEL MODAL -->

    </div>

</div>
<!-- MODAL QUE MUESTRA LA INFORMACIÓN DEL PRODUCTO A PEDIR -->