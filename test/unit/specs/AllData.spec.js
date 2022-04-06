import Vue from 'vue'
import AllData from '@/components/AllData'
import { mount } from '@vue/test-utils'

describe('AllData.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(AllData)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.container h3').textContent)
      .toEqual('All')
  })
})
