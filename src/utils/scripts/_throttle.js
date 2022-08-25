export function throttle(func, threshhold, scope) {
  threshhold ??= 250;
  let last;
  let deferTimer;

  return function () {
    let context = scope || this;
    let now = +new Date;
    let args = arguments;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => { last = now; func.apply(context, args); }, threshhold);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
}