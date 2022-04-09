const toArray = (obj) => {
  return Object.keys(obj).map((item) => ({ id: item, name: obj[item] }))
}

const Currencies = {
  test: "Test",
}

const ReportTypes = {
  test: "Test",
}

const CurrenciesArray = toArray(Currencies)
const ReportTypesArray = toArray(ReportTypes)

export { Currencies, CurrenciesArray, ReportTypes, ReportTypesArray }
