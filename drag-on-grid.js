dragGrid(document.getElementById('drag-on-grid'), {
  offX: 100,
  offY: 100,
  grainX: 100,
  grainY: 100
});

function dragGrid(ele, rules) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  ele.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position
    ele.style.top = (ele.offsetTop - pos2) + 'px';
    ele.style.left = (ele.offsetLeft - pos1) + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
    // fix element's position by rules
    var top = Math.round((ele.offsetTop - rules.offX) / rules.grainX) * rules.grainX + rules.offX;
    var left = Math.round((ele.offsetLeft - rules.offY) / rules.grainY) * rules.grainY + rules.offY;
    ele.style.top = top + 'px';
    ele.style.left = left + 'px';
  }
}
