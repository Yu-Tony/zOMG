<?php
 session_start();

 if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    
  }
  else
  {
    //header('Location: Registrarse.php');  
  }

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>

  <link rel="stylesheet" href="css/zomg.css" />

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
  <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
    crossorigin="anonymous"></script>

  <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>

  <script src="/zOMG/js/pantallas.js"></script>
  <script type="module" src="/zOMG/js/main.js"></script>


  <style>
    .pantalla {
      position: absolute;
      left: 16%;
      top: 20%;


      z-index: 1000;
    }
  </style>

  <script>
    
  </script>
</head>

<body style="background-color: #000000; user-select: none;">

  <div class="container">

    <div class="row" style="margin-top: 1%">
      <div class="col-5">
      </div>
      <div class="col-7">
        <a href = "php/logout.php" class="LogOut">
          <img src="Imagenes/BTNregresar.png" alt="" id="imgBTN" class="btnRegresar" style="float: right;">
      </a>
      </div>
    </div>

    <div class="row" style="margin-top: 1%">
      <div class="col-12 text-center">
        <img src="Imagenes/zOMG.png" alt="" class="btnRegresar" />
      </div>
    </div>

    <div class="pantalla">



    <progress class="bg-success" id="loading" value="0" style="width:100%"></progress>
    <progress class="bg-success" id="health" value="100" max="100" style="width:100%"></progress>
 

      <div id="scene-section">

        <a ref="javascript:void(0)" style="width: 100px; height: 100px; position: absolute; bottom: 0; right: 10px;" id="HealthPU">
          <img src="Assets/HealthBtn.png" alt="" style="width: 100%; height: 100%" id="imgBTN"/>
        </a>

        <a ref="javascript:void(0)" style="width: 100px; height: 100px; position: absolute; bottom: 110px; right: 10px;" id="DamagePU">
          <img src="Assets/PowerUp.png" alt="" style="width: 100%; height: 100%" id="imgBTN"/>
        </a>

        

       
      
      </div>
  

    </div>

    <div id="includedContent"></div>

   
  </div>



  <audio id="audio" src="quitaresto/zOMG/Assets/Forgotten.mp3"></audio>
</body>

</html>