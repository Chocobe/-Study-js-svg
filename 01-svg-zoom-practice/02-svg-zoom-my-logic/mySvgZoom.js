// @ts-check

import initSvgGrid from "./svgGrid.js";
import ShapeFactory from "./ShapeFactory.js";
import initController from "./controller.js";

import "./types.js";
import { querySelector } from "./utils.js";
import { svgShapeInfos } from "./constants.js";

/**
 * @param { string } svgSelector 
 */
const initMySvgZoom = (svgSelector) => {
  /** @type { SVGSVGElement | null } */
  const $svg = document.querySelector(svgSelector);

  if (!$svg) throw new Error(`${svgSelector} 요소를 찾지 못하였습니다.`);

  // Init State
  /** @type { HTMLElement | null } */
  const $container = querySelector(".container");

  if (!$container) throw new Error(".container 요소를 찾지 못하였습니다.");
  
  const { top, left, width, height } = $container.getBoundingClientRect();

  /** @type { State } */
  const state = {
    containerSize: { 
      top, left, width, height 
    },
    scale: { 
      x: 1, y: 1 
    },
    translate: { 
      x: 0, y: 0 
    },
    startPosition: {
      x: 0, y: 0,
    },
    moveDistance: { 
      x: 0, y: 0 
    },
    isMoveMode: false,
  };

  // Init Grid
  initSvgGrid($svg);

  // Init Shapes
  const $svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const shapeFactory = ShapeFactory($svg);
  const shapes = svgShapeInfos.map(info => shapeFactory[`createSvg${info.type}`]?.({...info}))
  shapes.forEach($shape => $svgGroup.appendChild($shape));

  $svg.appendChild($svgGroup);
  
  // Init Controller
  initController(state, $svgGroup, $container);
};

initMySvgZoom(".container svg");