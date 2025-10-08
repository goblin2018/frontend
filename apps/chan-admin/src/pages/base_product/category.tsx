import Tag, { TagColor } from "components/tag";
import { useMemo } from "react";
import { BaseProductCategory } from "types/base_product";

export function Category({ category }: { category: BaseProductCategory }) {

  const { name, color } = useMemo(() => {
    switch (category) {
      case 1:
        return {
          name: "会员",
          color: "green"
        }

      default:
        return {
          name: "普通产品",
          color: "orange"
        }
    }
  }, [category])

  return <Tag label={name} color={color as TagColor} />
}