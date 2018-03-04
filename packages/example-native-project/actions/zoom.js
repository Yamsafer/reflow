exports.zoom = function (wd) {
  return el => {
    return Promise.all([
      this.getWindowSize(),
      this.getLocation(el),
    ]).then(res => {
      var size = res[0];
      var loc = res[1];
      var center = {
        x: loc.x + size.width / 2,
        y: loc.y + size.height / 2
      };
      var a1 = new wd.TouchAction(this);
      a1.press({el}).moveTo({el, x: center.x, y: center.y - 100}).release();
      var a2 = new wd.TouchAction(this);
      a2.press({el}).moveTo({el, x: center.x, y: center.y + 100}).release();
      var m = new wd.MultiAction(this);
      m.add(a1, a2);
      return m.perform();
    });
  }
};
