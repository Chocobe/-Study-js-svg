// @ts-check

/** @param { SVGSVGElement } $svg */
const initSvgGrid = $svg => {
  const { 
    width: svgWidth, 
    height: svgHeight,
  } = $svg.getBoundingClientRect();

  const generateLines = generateLinesHOF($svg);

  // 세로선
  generateLines(svgWidth, x => [[`${x}`, '0'], [`${x}`, `${svgHeight}`]]);
  // 가로선
  generateLines(svgHeight, y => [['0', `${y}`], [`${svgWidth}`, `${y}`]]);
};

/**
 * @param { SVGSVGElement } $svg
 * @returns {(
 *  axisSize: number,
 *  valueToPositionCallback: (pxValue: string) => string[][]
 * ) => void}
 */
const generateLinesHOF = $svg => (axisSize, valueToPositionCallback) => {
  const $svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  const lines = Array.from(
    { length: Math.floor(axisSize / 100) + 1 },
    (_, i) => `${i * 100}px`
  );

  lines
    .map(valueToPositionCallback)
    .map(([[x1, y1], [x2, y2]]) => {
      const $line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      $line.setAttribute("x1", x1);
      $line.setAttribute("y1", y1);
      $line.setAttribute("x2", x2);
      $line.setAttribute("y2", y2);
      $line.setAttribute("stroke", "#bbb");

      return $line
    })
    .forEach($line => $svgGroup.appendChild($line));

  $svg.appendChild($svgGroup);
};

export default initSvgGrid;