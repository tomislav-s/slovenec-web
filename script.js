$(function () {
  // CONFIG
  const VAR_MAX_DISTANCE = 1000;
  const settings = {
    minWeight: 400,
    maxWeight: 0,
  };

  // UTILS
  function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
          Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)
      )
    );
  }

  function calculatePercentage(val, maxVal) {
    if (val > maxVal) {
      return 100;
    }

    return (val / maxVal) * 100;
  }

  function calculateSpan(percentage, min, max) {
    return Math.floor(min + (percentage / 100) * (max - min));
  }

  // Functionalities
  function initMouseMove(e) {
    const $navLink = $(".js-nav-link");
    const $body = $("body");

    requestAnimationFrame(() => {
      const mX = e.pageX;
      const mY = e.pageY;

      $navLink.each(function () {
        moveVariable.call(this, mX, mY);
      });
    });
  }

  function moveVariable(mX, mY) {
    const $this = $(this);

    const visualDistance = calculateDistance($this, mX, mY);

    const percentageOfDistanceFromVisual = calculatePercentage(
      visualDistance,
      VAR_MAX_DISTANCE
    );
    const calculatedVisualWeight = `'wght' ${calculateSpan(
      percentageOfDistanceFromVisual,
      settings.minWeight,
      settings.maxWeight
    )}`;

    $this.css("font-variation-settings", calculatedVisualWeight);
  }

  // INIT
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $(".js-nav-link").addClass("auto-animate");
  } else {
    $(document).mousemove(initMouseMove);
  }
});
