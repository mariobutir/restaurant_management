const toArray = (obj) => {
  return Object.keys(obj).map((item) => ({ id: item, name: obj[item] }))
}

const Products = {
  1: "Chicken",
  2: "Beef",
}

const ProductsArray = toArray(Products)

export { Products, ProductsArray }
