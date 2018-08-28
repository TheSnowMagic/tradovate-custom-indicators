const predef = require("./tools/predef");
const meta = require("./tools/meta");
const SMA = require("./tools/SMA");
const medianPrice = require("./tools/medianPrice");

class ao {
  init() {
    this.fastSma = SMA(this.props.fastPeriod);
    this.slowSma = SMA(this.props.slowPeriod);

    this.prevAo = 0;
  }
  map(d) {
    const median = medianPrice(d);
    const ao = this.fastSma(median) - this.slowSma(median);

    const aoColor = { color: ao > this.prevAo ? "green" : "red" };

    this.prevAo = ao;
    return {
      value: ao,
      style: { value: aoColor }
    };
  }
}

module.exports = {
  name: "ao",
  description: "Awesome Oscillator",
  calculator: ao,
  params: {
    fastPeriod: predef.paramSpecs.period(5),
    slowPeriod: predef.paramSpecs.period(34)
  },
  inputType: meta.InputType.BARS,
  areaChoice: meta.AreaChoice.NEW,
  plotter: predef.plotters.histogram,
  tags: ["Custom Indicators"]
};

