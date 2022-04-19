import { config, shallowMount,createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import HelloWorld from '@/components/HelloWorld.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const mockData = {
  '/api/list': {
    data: [{name: 'aaa', id: 1},{name: 'bbb', id: 2}]
  },
  '/api/add': { success: true },
  '/store/list': {
    data: [{prodName: 'ccc', prodId: 1},{prodName: 'ddd', prodId: 2}]
  }
}

// jest.mock('axios', ()=>({
//   post: jest.fn(url => Promise.resolve(mockData[url])),
// }))

config.mocks = {
  $http: {
    get: jest.fn(url => Promise.resolve(mockData[url])),
    post: jest.fn(url => Promise.resolve(mockData[url])),
  },
  $router: {
    push: jest.fn()
  },
  $store: {
    getters: {
      getLoginStatus: () => true
    }
  },
}


describe('HelloWorld.vue', () => {
  let store,mutations;
  mutations = {
    setCurList: jest.fn()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      mutations,
      actions: {
        fetchList: jest.fn(() => Promise.resolve(mockData['/store/list']))
      },
    })
  })


  it('mounted test', async () => {
    const wrapper = shallowMount(HelloWorld,{
      propsData: {
        msg: 'Welcome'
      }
    })
    await flushPromises()
    expect(wrapper.props().msg).toBe('Welcome')
    expect(wrapper.find('h1').text()).toBe('Welcome')
    expect(wrapper.findAll('.li').length).toBe(2)
  })

  it('add btn', async()=>{
    const wrapper = shallowMount(HelloWorld)
    wrapper.find('#addBtn').trigger('click')
    await flushPromises()
    
    expect(wrapper.vm.cartNum).toBe(1)
    expect(wrapper.find('p').text()).toBe('1')
    const spy = jest.spyOn(localStorage, 'setItem')
    console.log('spy==>',spy)
    expect(spy).toHaveBeenCalledWith('cartNum',1)
    expect(wrapper.emitted().add).toBeTruthy()
    expect(wrapper.emitted().add.length).toBe(1)
    expect(wrapper.emitted().add[0]).toEqual([1])
  })

  it('get btn', async()=>{
    const wrapper = shallowMount(HelloWorld)
    wrapper.find('#getBtn').trigger('click')
    await flushPromises()
    const spy = jest.spyOn(localStorage, 'getItem')
    console.log('spy==>',spy)
    expect(spy).toHaveBeenCalledWith('cartNum')
    expect(wrapper.vm.cartNum).toBe(1)
  })

  it('go page', async()=>{
    const wrapper = shallowMount(HelloWorld)
    const spy = jest.spyOn(config.mocks.$router, "push");
    wrapper.find('button').trigger('click')
    await flushPromises()
    wrapper.find('#goPage').trigger('click')
    await flushPromises()
    expect(spy).toHaveBeenCalledWith({
      path: '/about',
      query: {
        num: 1
      }
    });
  })

  it('action fetchtest', async()=>{
    const wrapper = shallowMount(HelloWorld, { store, localVue })
    wrapper.find('strong').trigger('click')
    await flushPromises()
    expect(wrapper.vm.storeList.length).toBe(2)
  })

  it('action fetchtest', async()=>{
    const wrapper = shallowMount(HelloWorld, { store, localVue })
    wrapper.find('strong').trigger('click')
    await flushPromises()
    expect(wrapper.vm.storeList.length).toBe(2)
  })

  it('li click mutation', async()=>{
    const wrapper = shallowMount(HelloWorld, { store, localVue })
    await flushPromises()
    wrapper.find('.li').trigger('click')
    await flushPromises()
    expect(mutations.setCurList).toBeCalledWith({},{
      name: 'aaa',
      id: 1
    })
  })


})
