/**
 * @typedef { string } ShapeFactoryParams
 * 
 * @typedef {{
 *  createSvgBox: (params: {
 *    x: number;
 *    y: number;
 *    width: number;
 *    height: number;
 *    fill: string;
 *  }) => SVGRectElement;
 * 
 *  createSvgCircle: (params: {
 *    centerX: number;
 *    centerY: number;
 *    radius: number;
 *    fill: string;
 *  }) => SVGCircleElement
 * }} ShapeFactoryInstance
 * 
 * @typedef {{
 *  ($svg: SVGSVGElement) => ShapeFactoryInstance
 * }} ShapeFactory
 */

/**
 * @typedef {{
 *  containerSize: {
 *    top: number;
 *    left: number;
 *    width: number;
 *    height: number;
 *  };
 *  scale: {
 *    x: number;
 *    y: number;
 *  };
 *  translate: {
 *    x: number;
 *    y: number;
 *  };
 *  startPosition: {
 *    x: number;
 *    y: number;
 *  };
 *  moveDistance: {
 *    x: number;
 *    y: number;
 *  };
 *  isMoveMode: boolean;
 * }} State
 */

/**
 * @typedef {(
 *  state: State,
 *  $svgGroup: SVGGElement,
 *  $container: HTMLElement
 * ) => void} InitController
 */