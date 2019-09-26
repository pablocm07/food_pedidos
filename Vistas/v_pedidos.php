<?php

include('../BD/Querys.php');

$querys = new Querys;
session_start();

?>

<link rel="stylesheet" href="./Assets/css/tabla_pedidos.css?v0.0.2">

<!-- CONTENEDOR PRINCIPAL DEL LAYOUT -->
<div class="contenedor-principal pt-3">

  <!-- CONTENEDOR PRINCIPAL DE LOS PEDIDOS -->
  <div class="contenedor-principal-pedidos">

    <!-- SELECT PARA ESCOGER LA FECHA EN LA QUE SE MOSTRARÁN LOS PEDIDOS -->
    <form class="form-inline">

      <label class="mr-2 fecha_pedidos_dia" for="fecha_pedidos"><span class="pedidos_form">Pedidos&nbsp;</span><span class="pedidos_form_2">del día</span></label>
      <input type="date" class="form-control" id="fecha_pedidos">

    </form>
    <!-- SELECT PARA ESCOGER LA FECHA EN LA QUE SE MOSTRARÁN LOS PEDIDOS -->

    <!-- CONTENEDOR DE TODOS LOS PEDIDOS -->
    <div class="contenedor-todos-pedidos ">

      <?php

      $id_local = [$_SESSION['local']['id_local']];
      // $consulta = 'SELECT * FROM `pedido_general` WHERE id_local = ? AND DATE(fecha_hora) = DATE(NOW());';
      $consulta = 'SELECT * FROM `pedido_general` WHERE id_local = ? AND DATE(fecha_hora) = CURDATE();';

      if ($respuesta_bd = $querys->ejecutarConsulta($consulta, $id_local)) {

        for ($index_pedido = 0; $index_pedido < sizeof($respuesta_bd); $index_pedido++) {

          $id_pedido = $respuesta_bd[$index_pedido]['id_pedido'];
          $no_platillos = $respuesta_bd[$index_pedido]['no_platillos'];
          $finalizacion_pedido = $respuesta_bd[$index_pedido]['finalizacion_pedido'];
          $id_estado_pedido = $respuesta_bd[$index_pedido]['id_estado'];
          $nombre_usuario = $respuesta_bd[$index_pedido]['nombre_usuario'];

          echo ('
              <div id="pedido_' . $id_pedido . '" class="contenedor-pedido">
                <div class="contenedor-detalles-generales">

                  <div class="numero-pedidos">
                      <p class="numero-pedidos">
                          ' . $no_platillos . '
                      </p>
                      <span class="numero-pedidos">
                        Número de Platillos
                      </span>
                  </div>
                          
                  <div class=" hora-finalizacion">
                      <p class="hora-finalizacion">
                        ' . $finalizacion_pedido . '                        
                      </p>
                      <span class="hora-finalizacion">
                          Hora de Finalización
                      </span>
                  </div>
          ');

          if ($id_estado_pedido == '5') { //SI EL ESTADO DEL PEDIDO ES EN ESPERA

            echo ('
                  <div class="estado_pedido d-flex align-items-center">
                          <button class="btn btn-md btn-primary">
                              Iniciar Pedido <i class="fas fa-hat-chef"></i>
                          </button>
                  </div>
                  <div class="nombre-cliente">
                          <p class="nombre-cliente">
                              ' . $nombre_usuario . '
                          </p>
                          <span class="cliente">
                              Cliente
                          </span>
                  </div>

                  </div>
            ');

            $datos_detalle = [$id_pedido];
            $consulta_detalle = 'SELECT * FROM pedido_especifico WHERE id_pedido = ?;';
            $respuesta_detalle = $querys->ejecutarConsulta($consulta_detalle, $datos_detalle);

            $respuesta_detalle = $querys->ejecutarConsulta($consulta_detalle, $datos_detalle);


            for ($index_detalle = 0; $index_detalle < sizeof($respuesta_detalle); $index_detalle++) {

              $id_detalle_pedido = $respuesta_detalle[$index_detalle]['id_detalle_pedido'];
              $platillo = $respuesta_detalle[$index_detalle]['nombre_platillo'];
              $num_ingredientes = $respuesta_detalle[$index_detalle]['num_ingredientes'];
              $ingredientes = $respuesta_detalle[$index_detalle]['ingredientes'];
              $comentarios = $respuesta_detalle[$index_detalle]['comentarios'];

              echo ('
                      <div id="pedido_' . $id_pedido . '" class="contenedor-detalles-especificos">

                        <div class="cantidad-pedido text-center">            
                          <input id="' . $id_detalle_pedido . '" type="checkbox">
                          <br>
                          <span class="cantidad-pedido">
                              ¿Terminado?
                          </span>
                        </div>

                        <div class="nombre-platillo">
                            <p class="nombre-platillo">
                                ' . $platillo . '
                            </p>
                            <span class="nombre-platillo">
                                Platillo
                            </span>
                        </div>

                        <div class="cantidad-pedido">
                            <p class="cantidad-pedido">
                                X ' . $num_ingredientes . '
                            </p>
                            <span class="cantidad-pedido">
                                Cantidad Ingredientes
                            </span>
                        </div>

                        <div class="ingrediente-numero-uno">
                            <p class="ingrediente-numero-uno">
                                ' . $ingredientes . '
                            </p>
                            <span class="ingrediente-numero-uno">
                                Ingredientes
                            </span>
                        </div>

                        <div class="comentario-platillo overflow-auto">
                            <textarea class="form-control" rows="2">' . $comentarios . '</textarea>
                            <span class="comentario-platillo">
                                Comentarios
                            </span>
                        </div>

                      </div>                    
              ');

              if ((sizeof($respuesta_detalle) - 1) == $index_detalle) {
                echo ('</div>');
              }
            }
          } else if ($id_estado_pedido == '6') { //SI EL ESTADO DEL PEDIDO ES EN PROCESO

            echo ('
                  <div class="estado_pedido d-flex align-items-center">
                      <button class="btn btn-md btn-warning">
                          Terminar <i class="fas fa-hat-chef"></i>
                      </button>
                  </div>
                  <div class="nombre-cliente">
                      <p class="nombre-cliente">
                          ' . $nombre_usuario . '
                      </p>
                      <span class="cliente">
                          Cliente
                      </span>
                  </div>

                  </div>                
            ');

            $datos_detalle = [$id_pedido];
            $consulta_detalle = 'SELECT * FROM pedido_especifico WHERE id_pedido = ?;';
            $respuesta_detalle = $querys->ejecutarConsulta($consulta_detalle, $datos_detalle);

            $respuesta_detalle = $querys->ejecutarConsulta($consulta_detalle, $datos_detalle);


            for ($index_detalle = 0; $index_detalle < sizeof($respuesta_detalle); $index_detalle++) {

              $id_detalle_pedido = $respuesta_detalle[$index_detalle]['id_detalle_pedido'];
              $platillo = $respuesta_detalle[$index_detalle]['nombre_platillo'];
              $num_ingredientes = $respuesta_detalle[$index_detalle]['num_ingredientes'];
              $ingredientes = $respuesta_detalle[$index_detalle]['ingredientes'];
              $comentarios = $respuesta_detalle[$index_detalle]['comentarios'];

              echo ('
                  <div id="pedido_' . $id_pedido . '" class="contenedor-detalles-especificos">

                                  <div class="cantidad-pedido text-center">            
                                    <input id="' . $id_detalle_pedido . '" type="checkbox">
                                    <br>
                                    <span class="cantidad-pedido">
                                        ¿Terminado?
                                    </span>
                                  </div>

                                  <div class="nombre-platillo">
                                      <p class="nombre-platillo">
                                          ' . $platillo . '
                                      </p>
                                      <span class="nombre-platillo">
                                          Platillo
                                      </span>
                                  </div>

                                  <div class="cantidad-pedido">
                                      <p class="cantidad-pedido">
                                          X ' . $num_ingredientes . '
                                      </p>
                                      <span class="cantidad-pedido">
                                          Cantidad Ingredientes
                                      </span>
                                  </div>

                                  <div class="ingrediente-numero-uno">
                                      <p class="ingrediente-numero-uno">
                                          ' . $ingredientes . '
                                      </p>
                                      <span class="ingrediente-numero-uno">
                                          Ingredientes
                                      </span>
                                  </div>

                                  <div class="comentario-platillo overflow-auto">
                                      <textarea class="form-control" rows="2">' . $comentarios . '</textarea>
                                      <span class="comentario-platillo">
                                          Comentarios
                                      </span>
                                  </div>

                  </div>                      
              ');

              if ((sizeof($respuesta_detalle) - 1) == $index_detalle) {
                echo ('</div>');
              }
            }
          } else { //SI EL ESTADO DEL PEDIDO ES PARA ENTREGAR

            echo ('
                    <div class="estado_pedido d-flex align-items-center">
                        <button class="btn btn-md btn-success">
                            Entregar <i class="fas fa-hat-chef"></i>
                        </button>
                    </div>
                    <div class="nombre-cliente">
                        <p class="nombre-cliente">
                            ' . $nombre_usuario . '
                        </p>
                        <span class="cliente">
                            Cliente
                        </span>
                    </div>

                  </div>                
            ');

            $datos_detalle = [$id_pedido];
            $consulta_detalle = 'SELECT * FROM pedido_especifico WHERE id_pedido = ?;';
            $respuesta_detalle = $querys->ejecutarConsulta($consulta_detalle, $datos_detalle);

            $respuesta_detalle = $querys->ejecutarConsulta($consulta_detalle, $datos_detalle);


            for ($index_detalle = 0; $index_detalle < sizeof($respuesta_detalle); $index_detalle++) {

              $id_detalle_pedido = $respuesta_detalle[$index_detalle]['id_detalle_pedido'];
              $platillo = $respuesta_detalle[$index_detalle]['nombre_platillo'];
              $num_ingredientes = $respuesta_detalle[$index_detalle]['num_ingredientes'];
              $ingredientes = $respuesta_detalle[$index_detalle]['ingredientes'];
              $comentarios = $respuesta_detalle[$index_detalle]['comentarios'];


              echo ('
                  <div id="pedido_' . $id_pedido . '" class="contenedor-detalles-especificos">

                      <div class="cantidad-pedido text-center">            
                        <input id="' . $id_detalle_pedido . '" type="checkbox">
                        <br>
                        <span class="cantidad-pedido">
                            ¿Terminado?
                        </span>
                      </div>

                      <div class="nombre-platillo">
                                              <p class="nombre-platillo">
                                                  ' . $platillo . '
                                              </p>
                                              <span class="nombre-platillo">
                                                  Platillo
                                              </span>
                      </div>

                      <div class="cantidad-pedido">
                                              <p class="cantidad-pedido">
                                                  X ' . $num_ingredientes . '
                                              </p>
                                              <span class="cantidad-pedido">
                                                  Cantidad Ingredientes
                                              </span>
                      </div>

                      <div class="ingrediente-numero-uno">
                                              <p class="ingrediente-numero-uno">
                                                  ' . $ingredientes . '
                                              </p>
                                              <span class="ingrediente-numero-uno">
                                                  Ingredientes
                                              </span>
                      </div>

                      <div class="comentario-platillo overflow-auto">
                                              <textarea class="form-control" rows="2">' . $comentarios . '</textarea>
                                              <span class="comentario-platillo">
                                                  Comentarios
                                              </span>
                      </div>

                  </div>                      
              ');

              //SI ES EL UTLIMO REGISTRO
              if ((sizeof($respuesta_detalle) - 1) == $index_detalle) {
                echo ('</div>');
              }
            }
          } //CIERRE DEL ELSE                                              

        } //CIERRE DEL BUCLE DE LAS TARJETAS

      } else { //SI NO HAY PEDIDOS EL DIA DE HOY
        echo ('
                <div class="container text-center" style="height: 30rem">
                  <img width="300" height="300" src="./Assets/img/sin_resultados.png" alt="Sin pedidos">
                  <br>
                  <h3> En este momento no tienes ningun pedido.</h3>
                </div>
            ');
      }

      ?>



    </div>
    <!-- CONTENEDOR DE TODOS LOS PEDIDOS -->

  </div>
  <!-- CONTENEDOR PRINCIPAL DE LOS PEDIDOS -->

</div>
<!-- CONTENEDOR PRINCIPAL DEL LAYOUT -->

<script>
  $(document).ready(function() {

    $(".contenedor-detalles-especificos").toggle();
    
    $(".contenedor-pedido").click(function() {
      // $(".contenedor-detalles-especificos").toggle();
      let detalle_pedido = $(this).attr('id');            
      $(".contenedor-detalles-especificos#" + detalle_pedido).toggle('slow');

    });
  });
</script>