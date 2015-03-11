// JavaScript Document
var pages = [], links=[];
var numLinks = 0;
var numPages = 0;
var theHolder;
var theMessage;

document.addEventListener("DOMContentLoaded", function(){
    deviceListen();
    window.addEventListener('load', function() {
        new FastClick(document.body);
    }, false);
    
    //alert("javascript running");
    //device ready listener
	pages = document.querySelectorAll('[data-role="page"]');	
	numPages = pages.length;
	links = document.querySelectorAll('[data-role="pagelink"]');
	numLinks = links.length;
	for(var i=0;i<numLinks; i++){
		//either add a touch or click listener
     if(detectTouchSupport( )){
         console.log("T O U C H   S U P P O R T   D E T E C T E D");
       links[i].addEventListener("touchend", handleTouch, false);
     }
		links[i].addEventListener("click", handleNav, false);	
	}
  //add the listener for the back button
  window.addEventListener("popstate", browserBackButton, false);
	loadPage(null);    
});
    
function deviceListen(){
    document.addEventListener("deviceready", onDeviceReady,false)
}

function onDeviceReady(){
    console.log("D E V I C E   I S   R E A D Y ");
    
//CONTACTS    
    theHolder = document.getElementById("featContact");
    theMessage = document.createElement('p');
    
var options = new ContactFindOptions();
    options.filter = "";  //leaving this empty will find return all contacts
    options.multiple = true;  //return multiple results
    var fields = ['displayName','name'];    //an array of fields to compare against the options.filter 
    navigator.contacts.find(fields, successFunc, errFunc, options);  
  
}
//CONTACTS FOUND:
    function successFunc( matches ){
    var rnd = Math.floor((Math.random() * matches.length - 1));
        
        for(var i=0; i<matches.length; i++){
          theMessage.innerHTML = matches[rnd].displayName; 
           theHolder.appendChild(theMessage);   
         
	   }
    }   
//CONTACTS ERROR:
    function errFunc( error ){
        console.log("CONTACTS ERROR: " + error);
        var otherMessage = document.createElement('p');
        otherMessage.innerHTML = "Error with contacts";
        theHolder.appendChild(otherMessage);
    }


//handle the touchend event
function handleTouch(ev){
  ev.preventDefault();
  ev.stopImmediatePropagation();
  var touch = ev.changedTouches[0];        //this is the first object touched
  var newEvt = document.createEvent("MouseEvent");	
  //old method works across browsers, though it is deprecated.
  newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
  ev.currentTarget.dispatchEvent(newEvt);
  //send the touch to the click handler
}

//handle the click event
function handleNav(ev){
	ev.preventDefault();
	var href = ev.target.href;
	var parts = href.split("#");
	loadPage( parts[1] );	
  return false;
}

//Deal with history API and switching divs
function loadPage( url ){
	if(url == null){
		//home page first call
		pages[0].style.display = 'block';
		history.replaceState(null, null, "#home");	
	}else{
    
    for(var i=0; i < numPages; i++){
      if(pages[i].id == url){
        pages[i].style.display = "block";
        //pages[i].className = "active"; //ADDED THIS TO CORRECT ACTIVE CLASS
        history.pushState(null, null, "#" + url);	
      }else{
        pages[i].style.display = "none";
        //pages[i].className = ""; //ADDED THIS TO CORRECT ACTIVE CLASS
      }
    }
    for(var t=0; t < numLinks; t++){
      links[t].className = "";
      if(links[t].href == location.href){
        links[t].className = "activetab";
      }
    }
	}
}

//Need a listener for the popstate event to handle the back button
function browserBackButton(ev){
  url = location.hash;  //hash will include the "#"
  //update the visible div and the active tab
  for(var i=0; i < numPages; i++){
      if(("#" + pages[i].id) == url){
        pages[i].style.display = "block";
      }else{
        pages[i].style.display = "none";	
      }
  }
  for(var t=0; t < numLinks; t++){
    links[t].className = "";
    if(links[t].href == location.href){
      links[t].className = "activetab";
    }
  }
}

//Test for browser support of touch events
function detectTouchSupport(){
  msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
  var touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
  return touchSupport;
    
}