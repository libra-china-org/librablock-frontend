import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FlexibleWidthXYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries  } from 'react-vis';
import { TpsData, versionToLiveTPS } from '../utils/tps'

import '../../node_modules/react-vis/dist/style.css';

interface IProps {
  data: Array<TpsData>
}
interface IState {}

class Chart extends React.Component<IProps, IState> {
  constructor(props: any) {
      super(props);
      this.state = {};
  }

  render() { return (
    <React.Fragment>
      <FlexibleWidthXYPlot xType="ordinal" height={300} margin={{left: 80, right: 80}}>
        <XAxis />
        <YAxis />
        <LineSeries data={this.props.data as any[]} animation curve={"curveMonotoneX"} />
      </FlexibleWidthXYPlot>
    </React.Fragment>
  )}
}
export default Chart