import Toast from './toast'

let currentToast

// Vue 插件机制的说明，有这个以后，在app.js中导入这个plugin，然后使用Vue.use(plugin)即可
export default {
    install(Vue, options) {

        Vue.prototype.$toast = function (message, toastOptions) {
            if (currentToast) {
                currentToast.close()
            }
            currentToast = createToast({
                Vue,
                message,
                propsData: toastOptions,
                onClose: () => {
                    currentToast = null
                }
            })
        }
    }
}
























// helpers
function createToast ({Vue, message, propsData, onClose}) {
    const Constructor = Vue.extend(Toast)
    const toast = new Constructor({ propsData })
    toast.$slots.default = [message]
    toast.$mount()
    toast.$on('close', onClose)
    document.body.appendChild(toast.$el)
    return toast
}
