<?php
 session_start();

 if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: principal.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    
    <link rel="stylesheet" href="css/background.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/registrarse.css">
    <title>ZOMG</title>

    

<script></script>

</head>
<body>
    <!--Efecto BLUR-->
    <div class="alphared"></div>

    <div class="container">
        <div class="row" >
            <div class="col-lg-4"></div>

            <!--Iimagen Logo-->
            <div class="col-lg-4" >
                <div id="logo"></div>     
            </div>

            <!--NAVBAR-->
            <div class="col-lg-4 navbar"  id="Bg">
                <ul id="navList">
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
            <form action="php/signup.php" method="POST" id="myform" class="signin">
                    <div class="row">
                        <div class="col-lg-12 center">
                            <input type="text" name="username" placeholder="Usuario" required>
                      

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 center">
                            <input type="password" placeholder="Contraseña" name="password" required>


                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 center">

                            <input type="password" name="confirm_password" placeholder="Confirmar Contraseña" required>


                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 center">
                           
                        <input type="submit" class="buttonAccent" value="REGISTRARSE" name="signup-submit">
                   
                           
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="col-lg-6">
            <form action="php/login.php" method="POST" id="myform" class="login">
                    
                    <div class="row">
                        <div class="col-lg-12 center" id="title-login">
                            ¿Ya tienes una cuenta?
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 center">
                            
                            <input type="text" name="username" id="" placeholder="Correo electrónico" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 center">
                            <input type="password" name="password" id="" placeholder="Contraseña" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 center">
                            
                        <input type="submit" class="buttonAccent" value="ENTRAR" name="login-submit">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        

    </div>

    <!-- Bootstrap JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

</body>
</html>