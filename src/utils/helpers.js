export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(number / 100)
  return newNumber
}

export const getUniqueValues = (products, type) => {
  let unique = products.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat()
  }
  return ["all", ...new Set(unique)]

  // return products.reduce((pre, cur) => {
  //   if (type === "colors") {
  //     cur.colors.map((item) => {
  //       !pre.includes(item) && pre.push(item)
  //     })
  //     return pre
  //   }
  //   !pre.includes(cur[type]) && pre.push(cur[type])
  //   return pre
  // }, [])
}