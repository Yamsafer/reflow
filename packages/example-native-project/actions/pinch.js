exports.pinch = function (wd) {
  return el => {
    return Promise.all([
      el.getSize(),
      el.getLocation(),
    ]).then(res => {
      var size = res[0];
      var loc = res[1];
      var center = {
        x: loc.x + size.width / 2,
        y: loc.y + size.height / 2
      };
      var a1 = new wd.TouchAction(this);
      a1.press({el, x: center.x, y: center.y - 100}).moveTo({el}).release();
      var a2 = new wd.TouchAction(this);
      a2.press({el, x: center.x, y: center.y + 100}).moveTo({el}).release();
      var m = new wd.MultiAction(this);
      m.add(a1, a2);
      return m.perform();
    });
  }
};
