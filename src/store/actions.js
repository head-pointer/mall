import {ADD_CART, ADD_COUNTER, ADD_TO_CART} from "./mutations-types"

// actions中存放异步请求和功能较为复杂的函数

export default {
  [ADD_CART](context, payload){
    return new Promise( (resolve, reject) => {
      let oldProduct = context.state.carts.find(item => {return item.iid === payload.iid})
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve()
      }else {
        context.commit(ADD_TO_CART, payload)
        resolve()
      }
    })
  }
}