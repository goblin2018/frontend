import type { Color } from "@frontend/lib";
import { colorList, getRandomColor } from "@frontend/lib";

export type TagType = "text" | "default";

const getColorClasses = (
  color: Color,
  type: TagType,
  random: boolean,
  colorIdx?: number
) => {
  let c = color;
  if (random) {
    c = getRandomColor();
  }
  if (colorIdx && colorIdx > -1 && colorList[colorIdx]) {
    c = colorList[colorIdx];
  }

  let bg = "";
  let textColor = "";
  let circleBg = "";

  switch (type) {
    case "text":
      textColor = "text-gray-900";
      circleBg = `bg-${c}-500`;
      break;
    default:
      textColor = `text-${c}-950`;
      bg = `bg-${c}-100`;
      circleBg = `bg-${c}-950`;
      break;
  }

  return {
    bg,
    textColor,
    circleBg,
  };
};

export function Tag({
  random = false,
  colorIdx,
  label,
  color = "green",
  className = "",
  type = "default",
  children,
  showCircle = false,
}: {
  type?: TagType;
  colorIdx?: number;
  label?: string;
  color?: Color;
  className?: string;
  random?: boolean;
  children?: React.ReactNode;
  showCircle?: boolean;
}) {
  const { bg, circleBg, textColor } = getColorClasses(
    color,
    type,
    random,
    colorIdx
  );
  return (
    <div
      className={`flex items-center  px-[6px] py-[2px] rounded-sm w-fit cursor-pointer ${bg} ${className}`}
    >
      {showCircle && (
        <div className={`w-[6px] h-[6px] rounded-full mr-1 ${circleBg}`}></div>
      )}
      <div className={textColor}>{label || children}</div>
    </div>
  );
}
