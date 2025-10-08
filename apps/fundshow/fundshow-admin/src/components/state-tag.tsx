import { Tag } from "@frontend/ui-react";
import { State, states } from "@frontend/lib";

export default function StateTag({ state }: { state: State }) {
  let info = states.find((s) => s.value == state);
  if (!info) return null;
  return <Tag label={info.label} color={info.color} />;
}
