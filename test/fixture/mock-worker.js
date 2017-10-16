function minmax(int, done) {
  if (typeof this.min === 'undefined') {
    this.min = int;
    this.max = int;
  } else {
    this.min = Math.min(this.min, int);
    this.max = Math.max(this.max, int);
  }
  done({
    min : this.min,
    max : this.max
  });
}

module.exports = minmax