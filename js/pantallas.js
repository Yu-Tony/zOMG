

$.getScript('http://localhost:8012/zOMG/js/facebook.js');

/* MUSICA */
function play() {


  var audio = $('#audio')[0];
  $(audio).prop("volume", 0.2);
  audio.loop = true;
  //audio.muted = true; 
  audio.play();

}

function changevolume(value)
{
    var volume = value/100;
    var audio = $('#audio')[0];
    $(audio).prop("volume", volume);
}

/* FB SHARE */
function shareFB() 
{

    var text = $("#scoreText").text();
    var score = text.substr(12, 2);
    console.log("score a compartir: " + score);
    shareScore(score);

   
   
}

/* MENU PRINCIPAL*/
function ShowMenuMode()
{
 
    $("#MP").hide();
    $("#MM").show();
    $("#IncludeMode").show(); 

}


function ShowOptions()
{
 
    $("#MP").hide();
    $("#IncludeOp").show(); 

}


function ShowLeaderboard()
{
 
    $("#MP").hide();
    $("#IncludeLeader").show(); 

}

function ShowControls()
{
 
    $("#MP").hide();
    $("#IncludeControl").show(); 
    $("#controles").show(); 
    

}

/*MENU MODE*/

function ShowSolo()
{
 
    $("#MM").hide();
    $("#IncludeSolo").show(); 
    $("#PJ").show();
    $("#IncludePause").hide(); 
    $('.pantalla').css('visibility', 'visible');
    var audio = $('#audio')[0];
    audio.pause();
    
}

function ShowMulti()
{
 
    $("#MM").hide();
    $("#IncludeMulti").show(); 
    

}

function ShowPause()
{
    $('.pantalla').css('visibility', 'hidden');
    $("#IncludeConfiguracionJuego").hide();
    $("#PJ").hide();
    $("#IncludePause").show(); 
    $("#MPause").show(); 
    
}

function ShowPrincipal()
{
    var audio = $('#audio')[0];
    audio.play();
  
    $("#IncludeOp").hide();
    $("#IncludeGameOver").hide();
    $("#IncludeSolo").hide();
    $("#IncludeMulti").hide();
    $("#IncludeLeader").hide();
    $("#controles").hide();
    $("#MM").hide();
    $("#MP").show();

    $("#scoreText").empty();
   
}

function ShowConfigGame()
{
 
    $("#MPause").hide();
    $("#IncludeConfiguracionJuego").show();
    

}

/*function ShowGameOver()
{

  

    $("#scoreText").empty();
    $('.pantalla').css('visibility', 'hidden');
    $("#PJ").hide();
    $("#IncludeGameOver").show(); 
    $("#MPause").show(); 
    $("#scoreText").append("Puntuación: " + score);
    
}*/

/*$(document).ready(function () {

 $(function () {
  var audio = document.getElementById("audio");
  $(audio).prop("volume", 0.1);
    audio.play();
});

  
 });*/
