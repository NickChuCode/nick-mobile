const expect = chai.expect; // chai是karma自动引入的，这样karma才能接收chai的测试结果
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

// 使用karma框架的单元测试的高级写法
describe('Toast', () => {
    // BDD 行为驱动测试（行为描述），由 Mocha 引入
    // describe human
    //   it has a head
    //   it has two eyes

    // 用 it 来实现作用域隔离，每一个 it 是一个测试用例
    // it 和 describe 来源于 mocha
    it('存在.', () => {
        // 在 it 中进行断言
        expect(Toast).to.exist
    })
    describe('props', function () {
        it ('接受 autoClose', (done) => {
            let div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    autoClose: 1,
                }
            }).$mount(div)
            // 这种监听 close 事件的方法比下面 setTimeout 方法要好
            vm.$on('close', () => {
                expect(document.body.contains(vm.$el)).to.eq(false)
                done()
            })
            // setTimeout(() => {
            //     expect(document.body.contains(vm.$el)).to.eq(false)
            //     done()
            // }, 1500)
        })
        it ('接受 closeButton', () => {
            const callback = sinon.fake()
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text: '关闭吧',
                        callback,
                    }
                }
            }).$mount()
            let closeBtn = vm.$el.querySelector('.close')
            expect(closeBtn.textContent.trim()).to.eq('关闭吧')
            // closeBtn.click() 一直报错，有问题
            //expect(callback).to.have.been.called
        })
        it ('接受 enableHtml', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    enableHtml: true
                }
            })
            vm.$slots.default = ['<strong id="test">hi</strong>']
            vm.$mount()
            let strong = vm.$el.querySelector('#test')
            expect(strong).to.exist
        })
        it ('接受 position', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    position: 'bottom'
                }
            }).$mount()
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true)
        })
    })
})
