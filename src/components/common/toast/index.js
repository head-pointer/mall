import toast from './toast'

// 插件式封装组件

const TOAST = {}

TOAST.install = (Vue) => {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(toast)

  // 2.根据组件构造器new一个对象
  const Toast = new toastConstructor()

  // 3.将组件对象，挂载到某一元素上
  Toast.$mount(document.createElement('div'))

  // 4.将Toast.$el添加到布局中
  document.body.appendChild(Toast.$el)

  // 6.创建$toast
  Vue.prototype.$toast = Toast
}
export default TOAST