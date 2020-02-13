import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types"

// mutations中最好放功能单一的方法，例如：数量加1和添加到购物车就是两个不同的方法

export default {
  [ADD_COUNTER](state, payload){
    payload.count += 1
  },
  [ADD_TO_CART](state, payload){
    payload.count = 1
    payload.isChecked = false
    state.carts.unshift(payload)
  }
}