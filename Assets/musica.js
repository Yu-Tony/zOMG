
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
    $("#IncludePause").hide(); 

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

}

/*MENU MODE*/

function ShowSolo()
{
 
    $("#MM").hide();
    $("#IncludeSolo").show(); 
    $("#PJ").show();
    $("#IncludePause").hide(); 

}

function ShowMulti()
{
 
    $("#MM").hide();
    $("#IncludeMulti").show(); 

}

function ShowPause()
{
 
    $("#PJ").hide();
    $("#IncludePause").show(); 

}

function ShowPrincipal()
{
  
    $("#IncludeOp").hide();
    $("#IncludeSolo").hide();
    $("#IncludeMulti").hide();
    $("#IncludeLeader").hide();
   
    $("#MP").show();
   
}



/*$(document).ready(function () {

 $(function () {
  var audio = document.getElementById("audio");
  $(audio).prop("volume", 0.1);
    audio.play();
});

  
 });*/
