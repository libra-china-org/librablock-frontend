import Transaction from '../models/Transaction'

export interface TpsData {
  x: string;
  y: number | undefined;
}

function createData(time: string, tps: number | undefined) : TpsData {
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

export function versionToLiveTPS (versions: Transaction[]) : Array<TpsData> {
  const now = new Date();
  const nowMs = now.getTime();
  const endMs = nowMs - nowMs % GRANULARITY_MS;
  const txCountReverse = new Array<number>(LIVETPS_POINTS);
  for (let i = 0; i < txCountReverse.length; i++) {
    txCountReverse[i] = 0;
  }

  for (let data of versions) {
    const txTime = new Date(data.observedTime);
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