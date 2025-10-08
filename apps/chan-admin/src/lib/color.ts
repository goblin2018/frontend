import { ColorValueType } from "antd/lib/color-picker/interface";

export function colorToHex(color: ColorValueType) {
  if (typeof color === 'string') {
    return color
  } else {
    return color
  }
}
