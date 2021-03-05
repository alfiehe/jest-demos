/*
* @param func:Function function to wrap
* @param wait:Number timeout in ms (`100`)
* @param immediate:Boolean whether to execute at the beginning (`false`)
*/
function debounce(func, wait = 100, immediate) {
  let timeout; let args; let context; let timestamp; let
    result;

  function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context =  null;
        args = null;
      }
    }
  }

  const debounced = (...ars) => {
    context = this;
    args = ars;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context =  null;
      args = null;
    }

    return result;
  };

  debounced.clear = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = function () {
    if (timeout) {
      result = func.apply(context, args);
      context = null;
      args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

// Adds compatibility for ES modules
debounce.debounce = debounce;

export default debounce;
