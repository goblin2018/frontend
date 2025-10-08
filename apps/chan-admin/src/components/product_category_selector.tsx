import { Cascader } from "antd";
import useList from "lib/useList";
import { ProductBaseCategory } from "types/product_base_category";

export default function ProductCategorySelector({ value, onChange }: { value?: any, onChange?: (v: any) => void }) {

  const { items } = useList<ProductBaseCategory>('/api/product_base_category/list', { cascade: true })
  console.log(items)
  return (
    <Cascader placeholder="选择产品大类"
      options={
        items.map(c => ({
          label: c.name,
          value: c.id,
          children: c.children?.map(p => ({
            label: p.name,
            value: p.id
          }))
        }))
      }
      value={value}
      onChange={(v) => {
        if (onChange) onChange(v)
      }
      }

      className="w-50"

    ></Cascader >
  )
}