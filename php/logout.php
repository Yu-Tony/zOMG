<?php
   session_start();
   /*unset($_SESSION["userSession"]);
   unset($_SESSION["passSession"]);*/
   session_unset();
   session_destroy();
   //echo 'You have cleaned session';
   header('Refresh: 0; URL = ../index.html');
?>