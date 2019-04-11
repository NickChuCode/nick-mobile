import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Content from './content'
import Footer from './footer'
import Header from './header'
import Sider from './sider'
import Layout from './layout'
import plugin from './plugin'
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-sider', Sider)
Vue.component('g-header', Header)
Vue.component('g-footer', Footer)
Vue.component('g-content', Content)
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)
Vue.use(plugin)

new Vue({
    el: '#app',
    data: {
        selectedTab: 'sports'
    },
    methods: {
        // 小技巧：如果函数只有一个地方不一样，没有必要重写，复用即可
        showToast1 () {
            this.showToast('top')
        },
        showToast2 () {
            this.showToast('middle')
        },
        showToast3 () {
            this.showToast('bottom')
        },
        showToast(position) {
            this.$toast(`文字，id为${parseInt(Math.random() * 100)}`, {
            position,
            enableHtml: false,
            closeButton: {
                text: '已充值',
                callback () {
                    console.log('已充值了！')
                }
            },
            autoClose: 3
        })
        }
    }
})

