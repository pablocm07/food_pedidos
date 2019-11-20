<link rel="stylesheet" href="./Assets/css/tabla_pedidos.css">

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

    <!-- CONTENEDOR DE LA TABLA DE PEDIDOS -->
    <div class="table-responsive p-2 mt-2 contenedor-tabla-pedidos">
      
      <table class="table table-bordered table-hover">
        
        <thead>

          <tr class="text-center">

            <th class="font-weight-bolder" scope="col">
              <p class="font-weight-bolder">
                Numero de Pedido
              </p> 
            </th>

            <th class="font-weight-bolder" scope="col">
              <p class="font-weight-bolder">
                Estado
              </p>
            </th>

            <th class="font-weight-bolder" scope="col">
              <p class="font-weight-bolder">                
                Hora de Finalización
              </p>  
            </th>     

            <th class="font-weight-bolder" scope="col">
              <p class="font-weight-bolder">            
                Cliente
              </p>
            </th>        

          </tr>

        </thead>

        <tbody>
          
          <tr class="table-primary registro-pedido">
              <td class="text-center">              
                  <P>
                    # 0003123            
                  </p>
                <button class="m-auto btn btn-sm btn-success">
                  Detalle del Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>
              <td class="text-center">              
                  En espera              
              </td>
              <td class="text-center">              
                  Miguel Montiel              
              </td>
              <td class="text-center">
                <button class="m-auto btn btn-sm btn-primary">
                  Iniciar Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>            
          </tr>     
          
          <tr class="table-success registro-pedido">
              <td class="text-center">              
                  <P>
                    # 0003123            
                  </p>
                <button class="m-auto btn btn-sm btn-success">
                  Detalle del Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>
              <td class="text-center">              
                  En espera              
              </td>
              <td class="text-center">              
                  Miguel Montiel              
              </td>
              <td class="text-center">
                <button class="m-auto btn btn-sm btn-primary">
                  Iniciar Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>            
          </tr>     
          
          <tr class="table-primary registro-pedido">
              <td class="text-center">              
                  <P>
                    # 0003123            
                  </p>
                <button class="m-auto btn btn-sm btn-success">
                  Detalle del Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>
              <td class="text-center">              
                  En espera              
              </td>
              <td class="text-center">              
                  Miguel Montiel              
              </td>
              <td class="text-center">
                <button class="m-auto btn btn-sm btn-primary">
                  Iniciar Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>            
          </tr>     
          
          <tr class="table-danger registro-pedido">
              <td class="text-center">              
                  <P>
                    # 0003123            
                  </p>
                <button class="m-auto btn btn-sm btn-success">
                  Detalle del Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>
              <td class="text-center">              
                  Cancelado           
              </td>
              <td class="text-center">              
                  Miguel Montiel              
              </td>
              <td class="text-center">
                <button class="m-auto btn btn-sm btn-primary">
                  Iniciar Pedido <i class="fas fa-hat-chef"></i>
                </button>
              </td>            
          </tr>     
                
        </tbody>

      </table>

    </div>     
    <!-- CONTENEDOR DE LA TABLA DE PEDIDOS -->


  </div>
  <!-- CONTENEDOR PRINCIPAL DE LOS PEDIDOS -->

</div>
<!-- CONTENEDOR PRINCIPAL DEL LAYOUT -->

<!-- <div class="container text-center" style="height: 30rem">
 <img width="300" height="300" src="./Assets/img/sin_resultados.png" alt="Sin pedidos">
 <br>
 <h3> En este momento no tienes ningun pedido.</h3>
 </div> -->