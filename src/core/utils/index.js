export const Colors = {

  hexToRgba(hex, opacity) {
    hex = hex.replace('#','');
    const r = parseInt(hex.substring(0,2), 16),
          g = parseInt(hex.substring(2,4), 16),
          b = parseInt(hex.substring(4,6), 16);
    return `rgba(${r} ,${g}, ${b}, ${opacity})`;
  },
};

export const Polygon = {
  polygonToSVGPoints(polygon, yMax) {
    const offset = yMax + 10;
    return polygon
      .map(point => `${point[0]},${offset - point[1]}`)
      .reduce((a, b) => `${a} ${b}`);
  },

  getPolygonMaxValues(points) {
    return points.reduce((prev, current) => {
      const xMax = Math.max(prev.xMax, current[0]);
      const yMax = Math.max(prev.yMax, current[1]);
      return { xMax, yMax };
    }, { xMax: 0, yMax: 0});
  },

  calcPolygonSquare(points) {
    let square = 0;
    let j = points.length - 1;

    for (let i = 0; i < points.length; i++) {
      const Xj = points[j][0];
      const Xi = points[i][0];
      const Yj = points[j][1];
      const Yi = points[i][1];

      square = square + (Xj + Xi) * (Yj - Yi);
      j = i;
    }
    square = Math.abs(square / 2);
    return square;
  }
};
