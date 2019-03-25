import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)

new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: true,
        loading3: false
    }
})

import chai from 'chai'
import spy from 'chai-spies'
chai.use(spy)

const expect = chai.expect
// 单元测试
{
    // 测试按钮含有 icon
    // 动态生成一个按钮
    const Constructor = Vue.extend(Button) // 因为Button是一个对象，不是构造函数，所以需要用extend得到对应的构造函数
    const vm = new Constructor({
        propsData: {
            icon: 'settings'
        }
    })
    vm.$mount('#test') // 也可以不mount到具体的dom中，什么都不写，直接mount到内存中
    // 下面就是测试代码
    let useElement = vm.$el.querySelector('use')
    expect(useElement.getAttribute('xlink:href')).to.eq('#n-settings')
    // 测试完成后，把button中的元素和button自己清理掉
    vm.$el.remove()
    vm.$destroy()
    // 对vue组件如何测试？这个组件有几个props，就测几个，事件有什么，就测什么
}

{
    const Constructor = Vue.extend(Button) // 因为Button是一个对象，不是构造函数，所以需要用extend得到对应的构造函数
    const vm = new Constructor({
        propsData: {
            icon: 'settings',
            loading: true
        }
    })
    vm.$mount() // 也可以不mount到具体的dom中，什么都不写，直接mount到内存中
    // 下面就是测试代码
    let useElement = vm.$el.querySelector('use')
    expect(useElement.getAttribute('xlink:href')).to.eq('#n-loading')
    // 测试完成后，把button中的元素和button自己清理掉
    vm.$el.remove()
    vm.$destroy()
}

{
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button) // 因为Button是一个对象，不是构造函数，所以需要用extend得到对应的构造函数
    const vm = new Constructor({
        propsData: {
            icon: 'settings'
        }
    })
    vm.$mount(div) // 这里必须要挂载到页面中，因为如果不挂载，页面就不渲染这个button，那么css就不用应用在这个button上，就无法获取到对应的css属性
    // 下面就是测试代码
    let svg = vm.$el.querySelector('svg')
    let { order } = window.getComputedStyle(svg) // 注意，css所有的属性值，都是字符串！
    expect(order).to.eq('1')
    // 测试完成后，把button中的元素和button自己清理掉
    vm.$el.remove()
    vm.$destroy()
}

{
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button) // 因为Button是一个对象，不是构造函数，所以需要用extend得到对应的构造函数
    const vm = new Constructor({
        propsData: {
            icon: 'settings',
            iconPosition: 'right'
        }
    })
    vm.$mount(div) // 这里必须要挂载到页面中，因为如果不挂载，页面就不渲染这个button，那么css就不用应用在这个button上，就无法获取到对应的css属性
    // 下面就是测试代码
    let svg = vm.$el.querySelector('svg')
    let { order } = window.getComputedStyle(svg) // 注意，css所有的属性值，都是字符串！
    expect(order).to.eq('2')
    // 测试完成后，把button中的元素和button自己清理掉
    vm.$el.remove()
    vm.$destroy()
}

{
    // mock
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData: {
            icon: 'settings'
        }
    })
    vm.$mount()
    let spy = chai.spy(function () {})
    vm.$on('click', spy)
    // 希望这个函数被执行
    let button = vm.$el
    button.click()
    expect(spy).to.have.been.called()
}
