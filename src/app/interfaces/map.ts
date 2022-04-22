export interface Area {
  fill: string;
  height: string;
  id: number;
  stroke: string;
  width: string;
  x: string;
  y: string;
}

export interface Desk {
  fill: string;
  height: string;
  id: string;
  width: string;
  x: string;
  y: string;
  status: string;
  bookedBy?: string;
  userId?: string;
}
