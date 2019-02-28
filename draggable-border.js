dragBorder(document.getElementById('draggable-border'), {
  fuzz: 5,
  min: 10
});

function dragBorder(ele, rules) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  ele.onmousedown = dragMouseDown;

  var mode = 0;
  // 0 => no dragging
  // 1 => drag on right border
  // 2 => drag on bottom border

  var borderRightWidth = parseInt(getComputedStyle(ele).getPropertyValue('border-right-width'));
  var borderBottomWidth = parseInt(getComputedStyle(ele).getPropertyValue('border-bottom-width'));
  var left = ele.offsetLeft;
  var top = ele.offsetTop;
  var borderLeftWidth = parseInt(getComputedStyle(ele).getPropertyValue('border-left-width'));
  var borderTopWidth = parseInt(getComputedStyle(ele).getPropertyValue('border-top-width'));

  var paddingLeft = parseInt(getComputedStyle(ele).getPropertyValue('padding-left'));
  var paddingRight = parseInt(getComputedStyle(ele).getPropertyValue('padding-right'));
  var paddingTop = parseInt(getComputedStyle(ele).getPropertyValue('padding-top'));
  var paddingBottom = parseInt(getComputedStyle(ele).getPropertyValue('padding-bottom'));

  function onRightBorder(x) {
    var outerWidth = ele.offsetWidth;
    var leftLimit = left + outerWidth - borderRightWidth;
    var rightLimit = left + outerWidth;
    return x >= leftLimit - rules.fuzz && x <= rightLimit + rules.fuzz;
  }

  function onBottomBorder(y) {
    var outerHeight = ele.offsetHeight;
    var topLimit = top + outerHeight - borderBottomWidth;
    var bottomLimit = top + outerHeight;
    return y >= topLimit - rules.fuzz && y <= bottomLimit + rules.fuzz;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    // ignore if not on border
    if (!onRightBorder(e.clientX) && !onBottomBorder(e.clientY)) return;
    if (onRightBorder(e.clientX)) mode = 1;
    if (onBottomBorder(e.clientY)) mode = 2;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag;
    ele.style.cursor = 'grabbing';
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    if (mode == 1) {
      pos1 = e.clientX - pos3;
      var innerWidth = ele.offsetWidth - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
      var newWidth = innerWidth + pos1;
      if (newWidth < rules.min) newWidth = rules.min;
      ele.style.width = newWidth + 'px';
      pos3 = e.clientX;
    } else if (mode == 2) {
      pos2 = e.clientY - pos4;
      var innerHeight = ele.offsetHeight - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom;
      var newHeight = innerHeight + pos2;
      if (newHeight < rules.min) newHeight = rules.min;
      ele.style.height = newHeight + 'px';
      pos4 = e.clientY;
    }
  }

  function closeDragElement() {
    mode = 0;
    ele.style.cursor = 'default';
    // stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
