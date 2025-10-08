import dayjs from "dayjs";
import Tag, { TagColor } from "./tag";
import { Popover, Tooltip } from "antd";
import { useMemo } from "react";

interface TagInfo {
  color: TagColor;
  info: string;
}
const tags: {
  [key: string]: TagInfo;
} = {
  noInfo: {
    color: "gray",
    info: "无",
  },
  moreThanAMonth: {
    color: "green",
    info: "正常",
  },
  moreThanAWeek: {
    color: "cyan",
    info: "不足一月",
  },
  lessThanAWeek: {
    color: "yellow",
    info: "不足一周",
  },
  expired: {
    color: "red",
    info: "已过期",
  },
};

export default function ExpireTag({ time }: { time?: number }) {
  const { color, info } = useMemo(() => {
    let info: TagInfo;
    if (!time) {
      info = tags.noInfo;
    } else {
      let now = dayjs();
      let tt = dayjs.unix(time);
      if (tt.subtract(1, "month").isAfter(now)) {
        info = tags.moreThanAMonth;
      } else if (tt.subtract(1, "week").isAfter(now)) {
        info = tags.moreThanAWeek;
      } else if (tt.isAfter(now)) {
        info = tags.lessThanAWeek;
      } else {
        info = tags.expired;
      }
    }
    return info;
  }, [time]);

  return (
    <Tooltip title={info}>
      <Tag
        color={color}
        label={time ? dayjs.unix(time).format("YYYY-MM-DD") : "无"}
      />
    </Tooltip>
  );
}
