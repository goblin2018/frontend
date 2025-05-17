import { Color } from "./color";

export enum State {
  On = "on",
  Off = "off",
}

export interface StateInfo {
  label: string;
  value: State;
  color: Color;
}

export const states: StateInfo[] = [
  {
    label: "正常",
    value: State.On,
    color: "green",
  },
  {
    label: "禁用",
    value: State.Off,
    color: "red",
  },
];
