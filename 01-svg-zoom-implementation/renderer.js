/**
 * scale 이 유효한지 검사
 * @param {{
 *  minScale: number;
 *  maxScale: number;
 *  scale: number;
 * }} param
 */
const checkValueInRange = ({ 
  minScale,
  maxScale,
  scale
}) => {
  return Math.min(maxScale, Math.max(minScale, scale));
  // return (scale <= maxScale) && (scale >= minScale);
};

/**
 * 좌표값(x 또는 y) 이 변경 되었는지 검사
 * @param {{
 *  originPosition: number;
 *  prevOriginPosition: number;
 * }} param
 */
const checkHasPositionChanged = ({ 
  originPosition,
  prevOriginPosition,
}) => {
  return originPosition !== prevOriginPosition;
};

/**
 * @param {{
 *  minScale: number;
 *  maxScale: number;
 *  scale: number;
 * }} param
 * @returns 
 */
const getTranslate = ({ 
  minScale,
  maxScale,
  scale
}) => ({ 
  // (x - left)
  originPosition,
  // state.transformation.originX
  // => 이전 transform-origin 값
  prevOriginPosition,
  // 이전 translate 값
  translate
}) => {
  const isValidInRange = checkValueInRange({ 
    minScale,
    maxScale,
    scale,
  });

  const hasPositionChanged = checkHasPositionChanged({ 
    originPosition,
    prevOriginPosition,
  });

  return isValidInRange && hasPositionChanged
    ? translate + (originPosition - prevOriginPosition * scale) * (1 - 1 / scale)
    : translate;

  // checkValueInRange({ minScale, maxScale, scale }) && checkHasPositionChanged({ pos, prevPos })
  //   ? translate + (pos - prevPos * scale) * (1 - 1 / scale)
  //   : translate;
};

/**
 * @param { State } state 
 */
const canZoom = state => ({
  /**
   * @param {{
   *  x: number;
   *  y: number;
   *  deltaScale: number;
   * }} param 
   */
  zoom: ({ 
    x,
    y,
    deltaScale
  }) => {
    // 0. 설정값 가져오기
    const { minScale, maxScale, scaleSensitivity } = state;

    // 1. element 기준, Click 위치값 도출
    const { left, top } = state.element.getBoundingClientRect();
    const originX = x - left;
    const originY = y - top;

    // 2. nextScale 도출
    const [scale, nextScale] = getScale({
      scale: state.transformation.scale,
      deltaScale,
      minScale,
      maxScale,
      scaleSensitivity
    });

    console.clear();

    // console.group("2. nextScale 도출");
    // console.log("scale: ", scale);
    // console.log("nextScale: ", nextScale);
    // console.groupEnd();

    // 3. nextOrigin 좌표값 도출 - 현재 scale 을 적용 해제 (=== scale 미적용 좌표값)
    const newOriginX = originX / scale;
    const newOriginY = originY / scale;

    // console.group("3. nextOrigin 좌표값 도출");
    // console.log("[originX, originY]: ", [originX, originY]);
    // console.log("[newOriginX, newOriginY]: ", [newOriginX, newOriginY]);
    // console.groupEnd();
    
    // 4. 
    const translate = getTranslate({ scale, minScale, maxScale });

    const translateX = translate({ 
      // pos: originX,
      originPosition: originX,
      // prevPos: state.transformation.originX,
      prevOriginPosition: state.transformation.originX,
      translate: state.transformation.translateX
    });
    const translateY = translate({ 
      pos: originY,
      prevPos: state.transformation.originY,
      translate: state.transformation.translateY
    });

    console.log('[translateX, translateY]: ', [translateX, translateY]);

    state.element.style.transformOrigin = `${newOriginX}px ${newOriginY}px`;
    state.element.style.transform = getMatrix({ scale: nextScale, translateX, translateY });
    state.transformation = { originX: newOriginX, originY: newOriginY, translateX, translateY, scale: nextScale };

    applyTransformationInfo(state);
  },
});

const getMatrix = ({ scale, translateX, translateY }) => `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`;

/**
 * nextScale 도출 함수
 * @param {{
 *  scale: number;
 *  minScale: number;
 *  maxScale: number;
 *  scaleSensitivity: number;
 *  deltaScale: number;
 * }} param
 * @returns 
 */
const getScale = ({ 
  scale,
  minScale,
  maxScale,
  scaleSensitivity,
  deltaScale
}) => {
  // let nextScale = scale + (deltaScale / (scaleSensitivity / scale));
  // 1. 새로 적용할 scale 값 도출
  let nextScale = scale + (deltaScale / 5);
  
  // 2. 새로 적용할 scale 에 MIN, MAX 보정
  nextScale = Math.max(minScale, Math.min(nextScale, maxScale));

  return [scale, nextScale];
};

const pan = ({ state, originX, originY }) => {
    state.transformation.translateX += originX;
    state.transformation.translateY += originY;
    state.element.style.transform =
        getMatrix({ scale: state.transformation.scale, translateX: state.transformation.translateX, translateY: state.transformation.translateY });
};

const canPan = (state) => ({
    panBy: ({ originX, originY }) => pan({ state, originX, originY }),
    panTo: ({ originX, originY, scale }) => {
        state.transformation.scale = scale;
        pan({ state, originX: originX - state.transformation.translateX, originY: originY - state.transformation.translateY });
    },
});

/**
 * @param { State } state 
 */
const applyTransformationInfo = state => {
  const {
    originX,
    originY,
    translateX,
    translateY,
    scale,
  } = state.transformation;
  
  document.querySelector(".originX").innerText = `originX: ${originX}`;
  document.querySelector(".originY").innerText = `originY: ${originY}`;

  document.querySelector(".translateX").innerText = `translateX: ${translateX}`;
  document.querySelector(".translateY").innerText = `translateY: ${translateY}`;

  document.querySelector(".scale").innerText = `scale: ${scale}`;
}

/**
 * @typedef {{
 *  element: HTMLElement; // transform 대상 Element
 *  minScale: number; // Scale 최소값
 *  maxScale: number; // Scale 최대값
 *  scaleSensitivity: number; // wheel 민감도 - 값이 클수록 둔하게 동작
 * }} ConfigState
 * 
 * @typedef {{
 *  originX: number; // transform-origin X 값 (Scale 이 적용된 마우스 X 좌표값)
 *  originY: number; // transform-origin Y 값 (Scale 이 적용된 마우스 Y 좌표값)
 *  translateX: number;
 *  translateY: number;
 *  scale: number;
 * }} Transformation
 * 
 * @typedef {{ 
 *  transformation: Transformation
 * } & ConfigState} State
 */

/** 
 * Zoom 기능 적용 진입부
 * @param { ConfigState } configState 
 */
const renderer = ({
  minScale,
  maxScale,
  element,
  scaleSensitivity = 10,
}) => {
  /** @type { State } */
  const state = {
    element,
    minScale,
    maxScale,
    scaleSensitivity,

    transformation: {
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      scale: 1
    },
  };

  return Object.assign(
    {}, 
    canZoom(state), 
    canPan(state)
  );
};

export { renderer };