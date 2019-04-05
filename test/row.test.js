const expect = chai.expect; // chai是karma自动引入的，这样karma才能接收chai的测试结果
import Vue from 'vue'
import Row from '../src/row'

Vue.config.productionTip = false
Vue.config.devtools = false

// 使用karma框架的单元测试的高级写法
describe('Row', () => {

    it('存在.', () => {
        // 在 it 中进行断言
        expect(Row).to.exist
    })
})
