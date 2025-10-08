// desc 是手机号或者身份证号码

import { Avatar } from "antd";
import { ReactNode } from "react";

export default function UserInfo({
  avatar,
  name,
  desc,
  className,
}: {
  avatar?: string;
  name: ReactNode;
  desc?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {avatar && <Avatar src={avatar} className="flex-shrink-0" />}
      <div className="text-text2">
        <div>{name}</div>
        <div className="text-[12px]">{desc}</div>
      </div>
    </div>
  );
}
