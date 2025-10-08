export const getListAndTotal = (data: any, path = 'items') => {
  if (!data) return { items: [], total: 0 }

  if (!data[path]) return { items: [], total: data.total }
  return { items: data[path], total: data.total }
}
