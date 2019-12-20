import Vue from 'vue'
import Button from './button'

console.log(Button);
Vue.component('g-button', Button)

new Vue({
    el: "#app"
})