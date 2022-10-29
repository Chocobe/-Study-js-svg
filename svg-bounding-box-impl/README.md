# svg-bounding-box-impl 프로젝트

* `SVG` 기반의 `BoundingBox` 작업도구 개발 프로젝트 입니다.
* `Canvas` 가 아닌 `SVG` 로도 구현 가능한지 검증을 목적으로 합니다.
  * 가능했으면 좋겠다...



<br />



# 설계

## `SvgCore.tsx`: `SVG` 영역의 코어 컴포넌트

### 메서드

* `Scale()`: Zoom In/Out
* `Move()`: 이동


<br /><br />


### Props

* `svgRootElement: string | SVGSVGElement`



<br /><hr /><br />



# 구현 계획

## 프로젝트 기본 구조 구현

1. `AppLayout.tsx` 구현
2. `tsconfig.json` - `alias` 설정
3. `globalStyle.ts` 구현
4. `styled-component` - `SSR` 을 위한 `_document.tsx` 구현
5. `styled.d.ts` 구현
6. `theme.ts` 구현


<br /><br />


## SVG BoundingBox 구현

1. `SvgCore.tsx` - 기초 뼈대 구현
   * props
   * 배경 이미지 => `SVG` 로 렌더링 하기
   * `ViewBox` 사용 여부 및 하위 SVG 요소 처리 설계하기