function SvgCore() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        d={`
          M 0, 0
          L 100, 0
          L 100, 100
          L 0, 100
          Z
        `}
        fill="#03a9f4"
      />

      <path
        d={`
          M 100, 300
          L 900, 800
          L 0, 800
          Z
        `}
        fill="#ff1493"
      />

      <path
        d={`
          M 950, 0
          L 950, 800
          L 100, 200
          Z
        `}
        fill="#006400"
      />
    </svg>
  );
}

export default SvgCore;