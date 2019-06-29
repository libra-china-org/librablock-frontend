import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FlexibleWidthXYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries  } from 'react-vis';

import '../../node_modules/react-vis/dist/style.css';

interface Data {
  x: string;
  y: number | undefined;
}
interface IProps {}
interface IState {
  data: Array<Data>
}
interface IVersionData {
  created_at: string,
  expiration_at: string,
  version: number,
  source: string,
  destination: string,
  type: string,
  gas_price: number,
  max_gas: number,
  sequence_number: number,
  public_key: string
}

function createData(time: string, tps: number | undefined) : Data {
  return { x: time, y: tps };
}

function pad0(n: number) : string {
  const s = n.toString();
  switch(s.length) {
    case 0: return '00';
    case 1: return '0' + s;
    default: return s;
  }
}

function formatShortTime (t: Date) : string {
  return `${pad0(t.getHours())}:${pad0(t.getMinutes())}:${pad0(t.getSeconds())}`
}

const GRANULARITY = 5; // seconds
const GRANULARITY_MS = GRANULARITY * 1000;
const LIVETPS_POINTS = 15;

function versionToLiveTPS (versionData: object) : Array<Data> {
  const versions = versionData as Array<IVersionData>;
  const now = new Date();
  const nowMs = now.getTime();
  const endMs = nowMs - nowMs % GRANULARITY_MS;
  const txCountReverse = new Array<number>(LIVETPS_POINTS);
  for (let i = 0; i < txCountReverse.length; i++) {
    txCountReverse[i] = 0;
  }

  for (let data of versions) {
    const txTime = new Date(data.created_at);
    const txMs = txTime.getTime();
    const lastNth = Math.floor((endMs - txMs) / GRANULARITY_MS);
    if (lastNth < LIVETPS_POINTS) {
      txCountReverse[lastNth] += 1;
    }
  }

  const result = txCountReverse.map((v, idx) => {
    const time = new Date(endMs - (idx + 1) * GRANULARITY_MS);
    return createData(formatShortTime(time), v / GRANULARITY);
  }).reverse();
  return result;
}

const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));
let nn = 0;

class Chart extends React.Component<IProps, IState> {
  constructor(props: any) {
      super(props);
      this.state = {
          data: [],
      };
  }

  async loadData () {
    try {
      const res = await fetch("https://api.librablock.io/version?limit=50");
      const result = await res.json();
      this.setState({
        data: versionToLiveTPS(result)
      });
    } catch (error) {
      console.log('error', error);
      // this.setState({
      // });
    }
  }

  async loadDataLoop() {
    while (true) {
      await this.loadData();
      await timeout(1000);
    }
  }

  componentDidMount() {
    this.loadDataLoop();
  }

  render() { return (
    <React.Fragment>
      <FlexibleWidthXYPlot xType="ordinal" height={300} margin={{left: 80, right: 80}}>
        <XAxis />
        <YAxis />
        <LineSeries data={this.state.data as any[]} animation curve={"curveMonotoneX"} />
      </FlexibleWidthXYPlot>
    </React.Fragment>
  )}
}
export default Chart