import { config, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import About from '@/views/About.vue'

config.mocks = {
  $route: {
    query: {
      num: 1
    }
  }
}


describe('about.vue test',()=>{

  it('mounted query', async()=>{
    const wrapper = shallowMount(About)
    await flushPromises()
    expect(wrapper.find('p').text()).toBe('1')
  })
})