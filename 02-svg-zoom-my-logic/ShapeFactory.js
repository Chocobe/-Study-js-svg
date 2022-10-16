// /**
//  * @type { string } svgSelector
//  */
// const initSvgBox = svgSelector => {
//   const $svg = document.querySelector(svgSelector);

//   const $box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//   $box.setAttribute("x", "0");
//   $box.setAttribute("y", "0");
//   $box.setAttribute("width", "100px");
//   $box.setAttribute("height", "100px");
//   $box.setAttribute("fill", "#03a9f4");

//   $svg.appendChild($box);

//   return $svg;
// };

const ShapeFactory = svgSelector => {
  /** @type { SVGSVGElement } */
  const $svg = document.querySelector(svgSelector);

  if (!$svg) throw new Error(`${svgSelector} 요소를 찾을 수 없습니다.`);

  return {
    /**
     * @param {{
     *  x: number;
     *  y: number;
     *  width: number;
     *  height: number;
     *  fill: string;
     * }} param
     * @returns 
     */
    initSvgBox: ({ x, y, width, height, fill }) => {
      const $box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      $box.setAttribute("x", x);
      $box.setAttribute("y", y);
      $box.setAttribute("width", width);
      $box.setAttribute("height", height);
      $box.setAttribute("fill", fill);
  
      $svg.appendChild($box);
  
      return $box;
    },
  
    initSvgCircle: ({ centerX, centerY, radius, fill }) => {
      const $circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      $circle.setAttribute("cx", centerX);
      $circle.setAttribute("cy", centerY);
      $circle.setAttribute("r", radius);
      $circle.setAttribute("fill", fill);

      $svg.appendChild($circle);
    },
  }
};

export default ShapeFactory;