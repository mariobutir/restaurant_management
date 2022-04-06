import {store} from "../index";


const storeSelector = callback => {
  return callback(store.getState())
}

export default storeSelector
