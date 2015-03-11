var canvas;
var context;
var holder;

document.addEventListener("DOMContentLoaded", function(){
    holder = document.getElementById("two");
    
  if( navigator.geolocation ){ //checks to see if browser supports geolocation then executes code when supported
      var params = {enableHighAccuracy: false, timeout:36000, maximumAge:60000};
    navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params ); 
    
      //displays message while user waits
        var header = document.createElement('h1');
        header.innerHTML ="Geolocation";
        holder.appendChild(header);
      
    //creates the canvas element then appends it to the page
    canvas = document.createElement('canvas');
    canvas.height = 300;
    canvas.width = 300;
    holder.appendChild(canvas);
          
  }else{
    //browser does not support geolocation api
    console.log("GEOLOCATION NOT SUPPORTED OR NOT IMPLEMENTED");
    alert("Sorry, but your browser does not support location based awesomeness.");
  }
});

function reportPosition( position ){ 
    var output = document.createElement('div');
    var outputText = document.createElement('p');
    var lati = position.coords.latitude;    //latitude
    var longi = position.coords.longitude;  //longitude
    
    outputText.innerHTML += "Latitude: " + lati + "&deg;<br/>"
                   + "Longitude: " + longi + "&deg;<br/>"   ;
                   //+ "Accuracy: " + position.coords.accuracy;
    
    holder.appendChild(output);
    output.appendChild(outputText);
    //create map image
    var map = document.createElement('img');
        map.onload = function() {
    //draw map image to canvas
        context = canvas.getContext('2d');
        context.drawImage(map, 0, 0);  
    }
        map.src = 'https://maps.googleapis.com/maps/api/staticmap?center='
        + lati + ',' + longi       //where the center is
        +'&zoom=14&size=300x300'   //zoom level and size of image
        +'&markers=color:blue'     //marker and colour of marker
        //+'|label:1'              //label in marker (can only be one letter or one number)
        +'|' + lati + ',' + longi; //where the marker is
}

function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  
  alert("Uh Oh! Error: " + errors[error.code]);
}
