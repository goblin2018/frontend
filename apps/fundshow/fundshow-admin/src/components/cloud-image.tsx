import { Image } from "antd";
import { ossUrl } from "lib/useOss";
export default function CloudImage({
  src,
  width,
  height,
}: {
  src: string;
  width?: number;
  height?: number;
}) {
  return <Image src={ossUrl(src)} width={width} height={height} />;
}
