let toolTip = document.querySelector('.tooltip[data-switch="true"]');

function getToolTipContent(toolTip) {
  if (!toolTip) {
    return;
  }

  let toolTipText = toolTip.querySelector(".tooltip-content");

  return {
    delay: parseInt(toolTip.dataset.delay),
    text: toolTip.dataset.value
  };
}

function updateToolTip(e, tooltipText) {
  if (!toolTip) {
    return;
  }

  if (!toolTip.classList.contains("tooltip-active")) {
    toolTip.classList.add("tooltip-active");
  }

  let sizeOfPointer = 10;
  let toolTipWidth = toolTip.clientWidth;
  let toolTipHeight = toolTip.clientHeight;

  let tollTipCenterX = e.clientX - toolTipWidth / 2;
  tollTipCenterX = tollTipCenterX < 0 ? 0 : tollTipCenterX;

  let tollTipCenterY = e.clientY - toolTipHeight - sizeOfPointer;
  tollTipCenterY = tollTipCenterY < 0 ? 0 : tollTipCenterY;

  toolTip.style.left = `${tollTipCenterX}px`;
  toolTip.style.top = `${tollTipCenterY}px`;

  if (tooltipText) {
    toolTip.firstElementChild.textContent = tooltipText + " ";
  }

  toolTip.firstElementChild.textContent += `x: ${e.clientX} y: ${e.clientY}`;
}

function throttle(func, delay) {
  let timerId;
  let prevTime = 0;
  let params = getToolTipContent(toolTip);

  let newDeley = params.delay;
  let newToolTipTextContent = params.text;
  delay = newDeley || delay;

  return function(...args) {
    let currTime = new Date();

    if (timerId) {
      clearTimeout(timerId);
    }

    if (currTime - prevTime >= delay) {
      updateToolTip.call(this, ...args, newToolTipTextContent);
      prevTime = currTime;
    }

    timerId = setTimeout(() => {
      updateToolTip.call(this, ...args, newToolTipTextContent);
      prevTime = 0;
    }, delay);
  };
}

let wrapper = throttle(updateToolTip, 500);

document.addEventListener("mousemove", wrapper);
