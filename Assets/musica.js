
function play() {
  var audio = $('#audio')[0];
  $(audio).prop("volume", 0.5);
  audio.loop = true;
  audio.play();
   
}

function changevolume(value)
{
    var volume = value/100;
    var audio = $('#audio')[0];
    $(audio).prop("volume", volume);
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
    $("#IncludeSolo").hide();
    $("#IncludeMulti").hide();
    $("#IncludeLeader").hide();
    $("#controles").hide();
   
    $("#MP").show();
   
}

function ShowConfigGame()
{
 
    $("#MPause").hide();
    $("#IncludeConfiguracionJuego").show();
    

}

/*$(document).ready(function () {

 $(function () {
  var audio = document.getElementById("audio");
  $(audio).prop("volume", 0.1);
    audio.play();
});

  
 });*/
