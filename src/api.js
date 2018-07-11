import config from 'config';
const POINTS_MAX = config.POINTS_MAX;

// Создание точки [x, y]
const createPoint = (v, k) => [k, Math.round((20 * Math.random()) + 60)];

// Создание полигона точек [[x1, y1], [x2, y2], ...]
const createPolygon = () => Array.from({ length: POINTS_MAX }, createPoint);

// Эмуляция запроса полигона точек
export const fetchPolygon = () => new Promise(resolve => {
  setTimeout(() => {
    const points = createPolygon();
    // первая и последняя точки графика для того, чтобы он закрашивался от оси абсцисс
    points.unshift([0, 0]);
    points.push([POINTS_MAX - 1, 0]);
    resolve(points);
  }, 1000)
});
