(function() {
  'use strict';

  angular
    .module('superProductivity')
    .animation('.ani-expand-collapse', slideAnimation);

  const DUR_ENTER = 0.225;
  const DUR_LEAVE = 0.195;
  const EASE_ENTER = 'cubic-bezier(.4, 0, .2, 1)';
  const EASE_LEAVE = 'cubic-bezier(.4, 0, .2, 1)';

  const animationSpeed = (isEnter, height) => {
    let baseDur = isEnter ? DUR_ENTER : DUR_LEAVE;

    if (height > 800) {
      return baseDur * 2;
    } else if (height > 600) {
      return baseDur * 1.8;
    } else if (height > 500) {
      return baseDur * 1.6;
    } else if (height > 400) {
      return baseDur * 1.4;
    } else if (height > 300) {
      return baseDur * 1.2;
    } else if (height > 100) {
      return baseDur;
    } else {
      return baseDur * 0.8;
    }
  };

  /* @ngInject */
  function slideAnimation($animateCss) {

    function show($el) {
      const el = $el[0];
      //const sh = el.scrollHeight;
      const height = el.offsetHeight;
      return $animateCss($el, {
        from: {
          height: '0',
          //opacity: 0,
        },
        to: {
          height: height + 'px',
          //opacity: 1,
        },
        duration: animationSpeed(true, height),
        easing: EASE_ENTER,
        cleanupStyles: true
      });
    }

    function hide($el) {
      const el = $el[0];
      //const sh = el.scrollHeight;
      const height = el.offsetHeight;
      return $animateCss($el, {
        from: {
          height: height + 'px',
          //opacity: 1
        },
        to: {
          height: '0',
          //opacity: 0
        },
        duration: animationSpeed(false, height),
        easing: EASE_LEAVE,
        cleanupStyles: true
      });
    }

    return {
      enter: show,
      leave: hide,

      // todo maybe check if it was the right class
      addClass: hide,
      removeClass: show,
    };
  }
}());


