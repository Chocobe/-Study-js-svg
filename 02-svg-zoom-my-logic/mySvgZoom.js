import initSvgGrid from "./svgGrid.js";
import ShapeFactory from "./ShapeFactory.js";

const initMySvgZoom = (svgSelector) => {
  initSvgGrid(svgSelector);

  const shapeFactory = ShapeFactory(svgSelector);

  const $leftBox = shapeFactory.initSvgBox({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: "#ff1493",
  });

  const $circle = shapeFactory.initSvgCircle({
    centerX: 300,
    centerY: 200,
    radius: 100,
    fill: "#03a9f4",
  });

  const $rightBox = shapeFactory.initSvgBox({
    x: 400,
    y: 100,
    width: 50,
    height: 50,
    fill: "#f0f400",
  });
};

initMySvgZoom(".container svg");