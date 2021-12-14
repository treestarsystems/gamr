var pageSpecificTargetDiv;

//Take an array of image file names and the id of the img element
function randomPicture(pa) {
 let selectedObj = pa[Math.floor(Math.random() * pa.length)];
 let link = document.getElementById('artistLink');
 let backgroundImage = document.getElementById('particles-js');
 backgroundImage.style.backgroundImage = `url('../public/images/backgrounds/${selectedObj.image}')`;
 link.href = `${selectedObj.link}`;
 link.innerHTML = `Background Image: ${selectedObj.author}`
}

function randomPageColor(ca) {
 let selectedObj = ca[Math.floor(Math.random() * ca.length)];
 document.documentElement.setAttribute("style", `
  --tsscuts-color-primary-1: ${selectedObj.tsscutsColorPrimaryOne};
  --tsscuts-color-primary-2: ${selectedObj.tsscutsColorPrimaryTwo};
  --tsscuts-color-secondary: ${selectedObj.tsscutsColorSecondary};
  --tsscuts-color-secondary-header: ${selectedObj.tsscutsColorSecondaryHeader};
 `);
}

function defaultErrorHandler (error) {
 let returnObj = {"status": "","message": "","payload": ""};
 //This is done just incase you use the "throw" keyword to produce your own error.
 let errorMessage = ((error.message) ? error.message:error);
 returnObj.status = "failure";
 returnObj.message = `Function: ${arguments.callee.caller.name} - Error: ${errorMessage}`;
 returnObj.payload = error;
 console.error(returnObj);
 return returnObj;
}

//The following uses Sweet Alerts 2 library which needs to be called before hand.
function popupErrorHandler (error,targetDiv) {
 let errorMessage = ((error.message) ? error.message:error);
 try {
/*
  Swal.fire({
   icon: 'error',
   title: 'Error: Check Console',
   target: (targetDiv ? `#${targetDiv}`:'body'),
   allowEscapeKey: true,
   allowOutsideClick: true,
   showConfirmButton: false,
   customClass: {
    container: 'position-absolute'
   },
   html: `${errorMessage}<br><br><button type="button" class="btn btn-icon btn-rounded btn-outline-danger" style="width: auto;height: 30px;padding: 3px 10px;cursor: pointer;" onclick="Swal.close();"><i class="feather icon-x-circle"></i>&nbsp;Close</button>`,
  });
*/
  return error;
 } catch (e) {
  return defaultErrorHandler(e);
 } finally {}
}

async function engineControl (controlWord) {
 let returnObj = {"status": "","message": "","payload": ""};
 try {
  if (controlWord == 'start') console.log('Engine Start');
  if (controlWord == 'stop') console.log('Engine Stop');
  returnObj.status = "success";
  returnObj.message = "success message";
  returnObj.payload = "";
  return returnObj;
 } catch (e) {
  return defaultErrorHandler(e);
 } finally {}
}

//Source - Radial range: https://codepen.io/MyXoToD/pen/xGRrgQ
/*
 Issue: Ignored attempt to cancel a touchend event with cancelable=false
 Fix: https://stackoverflow.com/a/27286193
 Note: I would like to refactor to vanilla JS but the math seems to be off.
       Test code is in tsscuts-experimental.js
*/

(function() {
 try {
  $(document).ready(function() {
   var is_dragging;
   is_dragging = false;
   $(document).on("mousedown touchstart", ".circle", function(e) {
    is_dragging = true;
    return true;
   });
   $(document).on("mouseup touchend", function(e) {
    is_dragging = false;
    return true;
   });
   return $(window).on("mousemove touchmove", function(e) {
    var angle, center_x, center_y, circle, delta_x, delta_y, pos_x, pos_y, touch;
    if (is_dragging) {
     circle = $(".circle");
     touch = void 0;
     if (e.originalEvent.touches) {
      touch = e.originalEvent.touches[0];
     }
     center_x = ($(circle).outerWidth() / 2) + $(circle).offset().left;
     center_y = ($(circle).outerHeight() / 2) + $(circle).offset().top;
     pos_x = e.pageX || touch.pageX;
     pos_y = e.pageY || touch.pageY;
     delta_y = center_y - pos_y;
     delta_x = center_x - pos_x;
     angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI); // Calculate Angle between circle center and mouse pos
     angle -= 90;
     if (angle < 0) {
      angle = 360 + angle; // Always show angle positive
     }
     angle = Math.round(angle);
     $(".dot").css("transform", "rotate(" + angle + "deg)");
     return $(".debug").html(angle + "deg");
    }
   });
  });
 } catch (e) {
  console.log(defaultErrorHandler(e));
 } finally{}
}).call(this);

var pictureArray = [
 {"image":"martin-mart-3d-grass-collection-vol01-02.jpg","link":"https://www.artstation.com/artwork/rA0AoO","author":"Superb CG"},
 {"image":"pawel-pecherzewski-entrance-shadow-final-01.jpg","link":"https://www.artstation.com/artwork/0v0bV","author":"Paweł Pęcherzewski"},
 {"image":"pawel-pecherzewski-blue-hour-foggy-post.jpg","link":"https://www.artstation.com/artwork/OodkD6","author":"Paweł Pęcherzewski"},
 {"image":"dasom-hyun-20-2.jpg","link":"https://www.artstation.com/artwork/18YER2","author":"Dasom Hyun"},
 {"image":"milan-vasek-forest-test.jpg","link":"https://www.artstation.com/artwork/L34bbv","author":"Milan Vasek"},
 {"image":"lap-pun-cheung-the-grasslands-the-old-bridge.jpg","link":"https://www.artstation.com/artwork/2B8oA","author":"Lap Pun Cheung"},
 {"image":"joe-garth-bliss-v1.jpg","link":"https://www.artstation.com/artwork/zOVVPQ","author":"Joe Garth"}
];

var colorArray = [
 {
  "tsscutsColorPrimaryOne":"rgba(11,163,118,0.8)",
  "tsscutsColorPrimaryTwo":"rgba(11,112,128,0.8)",
  "tsscutsColorSecondary":"rgba(11,163,118,0.8)",
  "tsscutsColorSecondaryHeader":"rgba(11,163,118)"
 },
];

randomPicture(pictureArray);
randomPageColor(colorArray);
