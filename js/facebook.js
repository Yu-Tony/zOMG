

window.fbAsyncInit = function() {
    FB.init({
      appId      : '138682914940727',
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };
  
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk')); 
  
  
   function shareScore(score) {
    FB.ui({
      method: 'share', /* forma de abrir un dialogo para compartir, segun la documentacion de facebook */
      href: 'https://google.com/',
      hashtag: "#zOMG",
      quote: "Mi puntuacion " + score
    }, function(response){});
  }
  