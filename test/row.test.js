const expect = chai.expect; // chai是karma自动引入的，这样karma才能接收chai的测试结果
import Vue from 'vue'
import Row from '../src/row'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

// 使用karma框架的单元测试的高级写法
describe('Row', () => {

    it('存在.', () => {
        // 在 it 中进行断言
        expect(Row).to.exist
    })
    it('接收 gutter 属性.', (done) => {  // 如果一段测试代码中有异步代码，必须加这个done参数，否则框架会认为里面都是同步代码而立即退出，就算setTimeout，里面的代码也不会执行
        Vue.component('g-row', Row)
        Vue.component('g-col', Col)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <g-row gutter="20">
                <g-col span="12"></g-col>
                <g-col span="12"></g-col>
            </g-row>
        `
        const vm = new Vue({
            el: div
        })
        setTimeout(() => {
            const row = vm.$el.querySelector('.row')
            expect(getComputedStyle(row).marginRight).to.eq('-10px')
            expect(getComputedStyle(row).marginLeft).to.eq('-10px')
            const cols = vm.$el.querySelectorAll('.col')
            expect(getComputedStyle(cols[0]).paddingRight).to.equal('10px')
            expect(getComputedStyle(cols[1]).paddingLeft).to.equal('10px')
            done() // 这里调用done()，告诉框架异步代码已经结束
            vm.$el.remove()
            vm.$destroy()
        }, 0) // 这里框架最多等2s，多于2s的
    })
    it('接收 align 属性', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Row)
        const vm = new Constructor({
            propsData: {
                align: 'left'  // center对应eq中的center, right对应flex-end, left对应flex-start，三个都试试
            }
        }).$mount(div)  // 必须把这个组件挂在一个元素上，否则是没有CSS的，而我们这个测试测的就是CSS
        const element = vm.$el
        expect(getComputedStyle(element).justifyContent).to.eq('flex-start')
        div.remove()
        vm.$destroy()
    })
})
