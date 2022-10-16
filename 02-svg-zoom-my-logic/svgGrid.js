/**
 * @param { string } svgSelector
 */
const initSvgGrid = svgSelector => {
  const $svg = document.querySelector(svgSelector);
  const { 
    width: svgWidth, 
    height: svgHeight,
  } = $svg.getBoundingClientRect();

  const generateLines = generateLinesHOF($svg);

  // 세로선
  generateLines(svgWidth, x => [[x, 0], [x, svgHeight]]);
  // 가로선
  generateLines(svgHeight, y => [[0, y], [svgWidth, y]]);
};

const generateLinesHOF = $svg => (axisSize, valueToPositionCallback) => {
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
    .forEach($line => $svg.appendChild($line));
};

export default initSvgGrid;