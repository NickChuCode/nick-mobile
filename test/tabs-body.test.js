const expect = chai.expect; // chai是karma自动引入的，这样karma才能接收chai的测试结果
import Vue from 'vue'
import TabsBody from '../src/tabs-body'

Vue.config.productionTip = false
Vue.config.devtools = false

// 使用karma框架的单元测试的高级写法
describe('TabsBody', () => {
    // BDD 行为驱动测试（行为描述），由 Mocha 引入
    // describe human
    //   it has a head
    //   it has two eyes

    // 用 it 来实现作用域隔离，每一个 it 是一个测试用例
    // it 和 describe 来源于 mocha
    it('存在.', () => {
        // 在 it 中进行断言
        expect(TabsBody).to.exist
    })
})
