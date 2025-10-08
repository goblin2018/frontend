import { Tag } from "antd";
import { State2, state2Items, userStateItems } from "types/user";

export function StateTag({ state }: { state: number }) {
  let info = userStateItems.find((item) => item.value == state);
  return <Tag color={info?.color}>{info?.label}</Tag>;
}

export function StateTag2({ state }: { state: State2 }) {
  let info = state2Items.find((item) => item.value == state);
  return <Tag color={info?.color}>{info?.label}</Tag>;
}
