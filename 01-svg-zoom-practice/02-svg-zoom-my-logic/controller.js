// @ts-check

import {
  getRelativePosition,
  querySelector,
} from "./utils.js";
import { SCALE_CONFIG } from "./constants.js";

import "./types.js";

/** @type { InitController } */
const initController = (state, $svgGroup, $container) => {
  const {
    containerSize,
    scale,
    translate,
    startPosition,
    moveDistance,
  } = state;

  /** @param { MouseEvent } e */
  const startTranslate = e => {
    const { left, top } = containerSize;
    const [startX, startY] = getRelativePosition(e, left, top);
    
    startPosition.x = startX;
    startPosition.y = startY;
    state.isMoveMode = true;
  };

  const endTranslate = () => {
    translate.x += moveDistance.x;
    translate.y += moveDistance.y;

    startPosition.x = 0;
    startPosition.y = 0;
    moveDistance.x = 0;
    moveDistance.y = 0;
    state.isMoveMode = false;

    applyTransformToElements();
    applyTransformInfo();
  };

  /** @param { MouseEvent } e */
  const changeTranslate = e => {
    if (!state.isMoveMode) return;

    const { left, top } = containerSize;
    const [curX, curY] = getRelativePosition(e, left, top);

    const xDistance = curX - startPosition.x;
    const yDistance = curY - startPosition.y;

    moveDistance.x = xDistance;
    moveDistance.y = yDistance;

    applyTransformToElements();
    applyTransformInfo();
  };

  /** @param { WheelEvent } e */
  const changeScale = e => {
    const { deltaY } = e;
    const { left, top } = $container.getBoundingClientRect();
    const [x, y] = getRelativePosition(e, left, top);

    const prevScaledDistance = {
      x: x - translate.x,
      y: y - translate.y,
    };

    const unscaledDistance = {
      x: prevScaledDistance.x / scale.x,
      y: prevScaledDistance.y / scale.y,
    };

    const nextScale = {
      x: scale.x,
      y: scale.y,
    };

    if (deltaY < 0) {
      nextScale.x += SCALE_CONFIG.UNIT_VALUE;
      nextScale.y += SCALE_CONFIG.UNIT_VALUE;
    } else {
      nextScale.x -= SCALE_CONFIG.UNIT_VALUE;
      nextScale.y -= SCALE_CONFIG.UNIT_VALUE;
    }

    const nextScaledDistance = {
      x: unscaledDistance.x * nextScale.x,
      y: unscaledDistance.y * nextScale.y,
    };
    
    const additionalTranslate = {
      x: prevScaledDistance.x - nextScaledDistance.x,
      y: prevScaledDistance.y - nextScaledDistance.y,
    };
    
    Object.entries(additionalTranslate).forEach(([key, value]) => {
      /** @type { number } */
      const nextScaleValue = nextScale[key];
      const minScale = SCALE_CONFIG.MIN[key];
      const maxScale = SCALE_CONFIG.MAX[key];

      if (minScale <= nextScaleValue && nextScaleValue <= maxScale) {
        scale[key] = nextScaleValue;
        translate[key] += value;
      }
    });

    applyTransformToElements();
    applyTransformInfo();
  };

  const applyTransformToElements = () => {
    const matrix = `matrix(
      ${scale.x}
      0
      0
      ${scale.y}
      ${translate.x + moveDistance.x}
      ${translate.y + moveDistance.y}
    )`.trim().replace(/\s+/g, ' ');

    $svgGroup.setAttribute("transform", matrix);
  };

  const applyTransformInfo = () => {
    querySelector(".scaleX").innerHTML = `scaleX: ${scale.x}`;
    querySelector(".scaleY").innerHTML = `scaleY: ${scale.y}`;
    querySelector(".translateX").innerHTML = `translateX: ${translate.x}`;
    querySelector(".translateY").innerHTML = `translateY: ${translate.x}`;
  };

  window.addEventListener("mousedown", startTranslate);
  window.addEventListener("mouseup", endTranslate);
  window.addEventListener("mousemove", changeTranslate);
  window.addEventListener("wheel", changeScale);
};

export default initController;