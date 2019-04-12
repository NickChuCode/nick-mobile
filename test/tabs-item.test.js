const expect = chai.expect; // chai是karma自动引入的，这样karma才能接收chai的测试结果
import Vue from 'vue'
import TabsItem from '../src/tabs-item'

Vue.config.productionTip = false
Vue.config.devtools = false

// 使用karma框架的单元测试的高级写法
describe('TabsItem', () => {
    // BDD 行为驱动测试（行为描述），由 Mocha 引入
    // describe human
    //   it has a head
    //   it has two eyes

    // 用 it 来实现作用域隔离，每一个 it 是一个测试用例
    // it 和 describe 来源于 mocha
    it('存在.', () => {
        // 在 it 中进行断言
        expect(TabsItem).to.exist
    })
    it('接受 name 属性', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                name: 'xxx'
            }
        }).$mount()
        expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
    })
    it('接受 disabled 属性', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                disabled: true
            }
        }).$mount()
        expect(vm.$el.classList.contains('disabled')).to.be.true
        const callback = sinon.fake()
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.not.been.called
        // 这个测试没有做完，但在一个团队中，怎么保证测试都做？使用测试覆盖率来实现
    })
})
