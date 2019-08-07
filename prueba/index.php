<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link rel="stylesheet" href="../Plugins/css/Bootstrap/bootstrap.min.css">
    <script src="../Plugins/js/jquery-3.4.1.min.js"></script>
    <!-- <script rel="script" src="./prueba.js"></script>
    <link rel="stylesheet" href="./prueba.css"> -->
    <style>
        /* .my{
            position: absolute;
            height: 100px;
            width: 1349px;
            background: black;            
        } */
    </style>
</head>

<body style="overflow-x: hidden;" >

    <div class="my">
        d   
    </div>

    <div class="row bg-warning" style="z-index:3;">
        <div class="col-1 bg-white  border-left border-right border-top border-warning" style="border: 5px solid; height: 150px;" >    </div>
        <div class="col-1" style="height: 150px;" >    </div>
        <div class="col-1 bg-white  border-left border-right border-top border-warning" style="border: 5px solid; height: 150px;" >    </div>
        <div class="col-1" style="height: 150px;" >    </div>
        <div class="col-1 bg-white  border-left border-right border-top border-warning" style="border: 5px solid; height: 150px;" >    </div>
        <div class="col-1" style="height: 150px;" >    </div>
        <div class="col-1 bg-white  border-left border-right border-top border-warning" style="border: 5px solid; height: 150px;" >    </div>
        <div class="col-1" style="height: 150px;" >    </div>
        <div class="col-1 bg-white  border-left border-right border-top border-warning" style="border: 5px solid; height: 150px;" >    </div>
        <div class="col-1" style="height: 150px;" >    </div>
        <div class="col-1 bg-white  border-left border-right border-top border-warning" style="border: 5px solid; height: 150px;" >    </div>
        <div class="col-1" style="height: 150px;" >    </div>
    </div>
    
        <div style="z-index:4;  opacity:0.6">
    <div class="row " style="position:relative; top:-60px; left:0; background-color: rgba(255, 255, 255, 0);">
        <div class="col-1 rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 bg-warning rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 rounded-circle rounded-circle bg-warning" style="height: 125px;" >    </div>
        <div class="col-1 bg-warning rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 bg-warning rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 bg-warning rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 bg-warning rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 rounded-circle" style="height: 125px;" >    </div>
        <div class="col-1 bg-warning rounded-circle" style="height: 125px;" >    </div>
    </div>
    </div>

    <div class="row" style="position:relative; top:-125px; left:0;">
        <div class="col-1 bg-warning" style="height:545px;"></div>
        <div class="col-10" style="height:545px;"></div>
        <div class="col-1 bg-warning" style="height:545px;"></div>
    </div>
    <script>
        $(document).ready(function($){
            var ventana_ancho = $(window).width();
            var ventana_alto = $(window).height();
            alert(ventana_ancho);
            alert(ventana_alto);
        }); 
    </script>
</body>
</html>