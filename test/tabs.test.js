const expect = chai.expect; // chai是karma自动引入的，这样karma才能接收chai的测试结果
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head'
import TabsBody from '../src/tabs-body'
import TabsItem from '../src/tabs-item'
import TabsPane from '../src/tabs-pane'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)

// 使用karma框架的单元测试的高级写法
describe('Tabs', () => {
    // BDD 行为驱动测试（行为描述），由 Mocha 引入
    // describe human
    //   it has a head
    //   it has two eyes

    // 用 it 来实现作用域隔离，每一个 it 是一个测试用例
    // it 和 describe 来源于 mocha
    it('存在.', () => {
        // 在 it 中进行断言
        expect(Tabs).to.exist
    })
    // it('子组件只能是 tabs-head 和 tabs-body', () => {
    //     // 注意构造 html 的方法
    //     const div = document.createElement('div')
    //     document.body.appendChild(div)
    //     div.innerHTML = `
    //     <g-tabs>
    //         <div>hi</div>
    //     </g-tabs>
    //     `
    //     // 我们可以期待组件抛出异常，但是对于异步抛出的错误（这个错误是在 mounted 的时候抛出的），
    //     // 无法这样测试，所以只能改 tabs 组件，让它不报错，而是给警告
    //     // expect(() => {
    //     //     const vm = new Vue({
    //     //         el: div
    //     //     })
    //     // }).to.throw()
    //     // 所以这个测试放弃了
    // })
    it('接受 selected 属性', (done) => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
       <g-tabs selected="finance">
           <g-tabs-head>
               <g-tabs-item name="women">美女</g-tabs-item>
               <g-tabs-item name="finance">财经</g-tabs-item>
               <g-tabs-item name="sports">体育</g-tabs-item>
           </g-tabs-head>
           <g-tabs-body>
               <g-tabs-pane name="women">美女相关资讯</g-tabs-pane>
               <g-tabs-pane name="finance">财经相关资讯</g-tabs-pane>
               <g-tabs-pane name="sports">体育相关资讯</g-tabs-pane>
           </g-tabs-body>
       </g-tabs>
        `
        let vm = new Vue({
            el: div
        })
        vm.$nextTick(() => {
            let activeItem = vm.$el.querySelector(`.tabs-item[data-name="finance"]`)
            expect(activeItem.classList.contains('active')).to.be.true
            done()
        })
    })
    it('接受 direction 属性', () => {})
})
