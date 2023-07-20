//Future work
/*
document.addEventListener('DOMContentLoaded', () => {
 try {
  let is_dragging = false;
  let degreeClass = document.querySelector(".debug");
  let circleClass = document.querySelector(".circle");
  let dotClass = document.querySelector(".dot");
  ["mousedown","touchstart"].forEach((evn) => {
   document.addEventListener(evn,() => {
    console.log('Start');
    return is_dragging = true;
   });
  });
  ["mouseup","touchend"].forEach((evn) => {
   document.addEventListener(evn,() => {
    console.log('End');
    return is_dragging = false;
   });
  });
  return ["mousemove","touchmove"].forEach((evn) => {
   window.addEventListener(evn,(e) => {
    let angle, center_x, center_y, circle, delta_x, delta_y, pos_x, pos_y, touch;
    if (is_dragging) {
     circle = circleClass;
     touch = void 0;
     if (e.touches) {
      touch = e.touches[0];
     }
     center_x = (circleClass.getBoundingClientRect().width / 2) + circleClass.offsetLeft;
     center_y = (circleClass.getBoundingClientRect().height / 2) + circleClass.offsetTop;
     pos_x = e.pageX || touch.pageX;
     pos_y = e.pageY || touch.pageY;
     delta_y = center_y - pos_y;
     delta_x = center_x - pos_x;
     angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI); // Calculate Angle between circle center and mouse pos
     angle -= 90;
     if (angle < 0) {
      angle = 360 + angle; // Always show angle positive
     }

console.log(`w-${circleClass.getBoundingClientRect().width} l-${circleClass.offsetLeft}|h-${circleClass.getBoundingClientRect().height} t-${circleClass.offsetTop}`);
console.log(center_x,center_y)

     angle = Math.round(angle);
      dotClass.setAttribute("style", `transform: rotate(${angle}deg)`);
     return degreeClass.innerHTML = `${angle} deg`;
    }
   });
  });
 } catch (e) {
  console.log(defaultErrorHandler(e));
 } finally {}
});
*/
