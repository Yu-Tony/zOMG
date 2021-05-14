<?php
$dbServerName = "localhost";
$dbUserName="root";
$dbPassWord = "";
$dbName="zomg_database";


$conn = mysqli_connect($dbServerName, $dbUserName, $dbPassWord, $dbName);

if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}


?>