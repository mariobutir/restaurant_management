const toArray = (obj) => {
  return Object.keys(obj).map((item) => ({ id: item, name: obj[item] }))
}

const Vendors = {
  1: "Hussain Boiler",
  2: "Pakeeza Fresh Mutton",
}

const Products = {
  1: "Chicken",
  2: "Beef",
}

const ProductsArray = toArray(Products)
const VendorsArray = toArray(Vendors)

export { Products, ProductsArray, Vendors, VendorsArray }
