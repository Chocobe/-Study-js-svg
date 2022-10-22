/**
 * @param { MouseEvent } e 
 * @param { number } containerLeft
 * @param { number } containerTop
 */
export const getRelativePosition = (e, containerLeft, containerTop) => {
  const { clientX, clientY } = e;
  
  return [
    clientX - containerLeft,
    clientY - containerTop,
  ];
}

/**
 * @param { string } selector
 * @return { HTMLElement }
 */
export const querySelector = selector => {
  /** @type { HTMLElement | null } */
  const $el = document.querySelector(selector);

  if (!$el) throw new Error(`${selector} 요소를 찾을 수 없습니다.`);

  return $el;
}