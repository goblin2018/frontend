import { Org } from "types/org";
import { ossUrl } from "lib/useOss";

export function OrgInfo({ org }: { org?: Org }) {
  if (!org) return null;
  return (
    <div className="flex items-center gap-2">
      <img src={ossUrl(org.avatar)} className="w-8 h-8 rounded-full" />
      <div className="">{org.name}</div>
    </div>
  );
}
