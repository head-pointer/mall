export function debounce(fun, delay){
  let timer = null
  return (...args) => {
    if(timer)
      timer = clearTimeout(timer)
    timer = setTimeout( () => {
      fun.apply(this, args)
    }, delay)
  }
}