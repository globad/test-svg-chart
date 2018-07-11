import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loader } from 'core/components/Loader';
import Icon from 'core/components/Icon';
import { Polygon } from 'core/utils';
import { fetchPolygon  } from 'api.js';
import config from 'config';

class SuperChart extends Component {

  static numberToPixels(number) {
    return `${number}px`;
  }

  static getPolygonInfo(polygon) {
    const polygonMaxValues = Polygon.getPolygonMaxValues(polygon);
    const points = Polygon.polygonToSVGPoints(polygon, polygonMaxValues.yMax);
    const area = Polygon.calcPolygonSquare(polygon);
    return {
      polygonMaxValues,
      points,
      polygonArea: area,
    }
  }

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      polygon: [],
      points: [],
      polygonMaxValues: {
        xMax: 0,
        yMax: 0,
      },
      polygonArea: 0,
      zoomed: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    fetchPolygon().then((polygon) => {
      const polygonInfo = this.constructor.getPolygonInfo(polygon);

      this.setState({
        isLoaded: true,
        polygon,
        ...polygonInfo,
      })
    });

    document.addEventListener('keydown', this.handleKeyDown, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, true);
  }

  handleKeyDown(e) {
    if (e && e.code === 'Enter') {
      const { zoomed } = this.state;
      this.setState({ zoomed: !zoomed });
    }
  }

  render() {
    const { width, height } = this.props;
    const { isLoaded, polygonMaxValues, polygonArea, zoomed } = this.state;
    const ratio = zoomed ? 1.5 : 1;
    const padding = config.CHART_PADDING;
    return (
      <div
        className="super-chart"
        style={{
          width:  this.constructor.numberToPixels(width * ratio),
          height: this.constructor.numberToPixels(height * ratio),
        }}
      >
        <h3>Super Chart</h3>
        {zoomed &&
          <Icon />
        }
        {isLoaded
          ? <svg
              width='100%'
              height='100%'
              viewBox={`0 0 ${polygonMaxValues.xMax} ${polygonMaxValues.yMax + padding}`}
              preserveAspectRatio="none"
            >
              <polyline
                points={this.state.points}
                fill="#4E5A7D"
                stroke="#7E91C9"
                strokeWidth="0.5"
              />
            </svg>
          : <Loader.loading size={35} />
        }
        <div className="super-chart__analytics">
          {isLoaded && <div>max <span className="super-chart__analytics__value">{polygonMaxValues.yMax}</span></div>}
          {isLoaded && <div>area <span className="super-chart__analytics__value">{polygonArea}</span></div>}
        </div>
      </div>
    );
  }
}

SuperChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

SuperChart.defaultProps = {
  width: 600,
  height: 400,
};

export default SuperChart;
