// @ts-check

import "./types.js";

/** @type { ShapeFactory } */
const ShapeFactory = $svg => {
  return {
    createSvgBox: ({ x, y, width, height, fill }) => {
      const $box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      $box.setAttribute("x", `${x}`);
      $box.setAttribute("y", `${y}`);
      $box.setAttribute("width", `${width}`);
      $box.setAttribute("height", `${height}`);
      $box.setAttribute("fill", `${fill}`);

      $svg.appendChild($box);

      return $box;
    },

    createSvgCircle: ({ centerX, centerY, radius, fill }) => {
      const $circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      $circle.setAttribute("cx", `${centerX}`);
      $circle.setAttribute("cy", `${centerY}`);
      $circle.setAttribute("r", `${radius}`);
      $circle.setAttribute("fill", `${fill}`);

      $svg.appendChild($circle);

      return $circle;
    },
  }
};

export default ShapeFactory;