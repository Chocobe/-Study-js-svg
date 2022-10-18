/**
 * @type {{
 *  MIN: { [key: string]: number; };
 *  MAX: { [key: string]: number; };
 *  UNIT_VALUE: number;
 * }}
 */
export const SCALE_CONFIG = {
  MIN: {
    x: 1,
    y: 1,
  },
  MAX: {
    x: 3,
    y: 3,
  },
  UNIT_VALUE: 1,
};

export const svgShapeInfos = [
  {
    type: "Circle",
    centerX: 300,
    centerY: 200,
    radius: 100,
    fill: "#aaa",
    fill: "#ff1493",
  },
  {
    type: "Box",
    x: 100,
    y: 0,
    width: 100,
    height: 100,
    fill: "#f0f400",
  },
  {
    type: "Box",
    x: 400,
    y: 0,
    width: 100,
    height: 100,
  },
  {
    type: "Box",
    x: 100,
    y: 300,
    width: 100,
    height: 100,
    fill: "#006400",
  },
  {
    type: "Box",
    x: 400,
    y: 300,
    width: 100,
    height: 100,
    fill: "#03a9f4",
  },
];