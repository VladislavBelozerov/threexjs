import gsap from 'gsap'
import Threex from '~/modules/main'
import TestComponent from '~/test/components/TestComponent'
import assetManager from '~/modules/assetManager'
import assets from '~/test/assets'

class Test {
  threex
  testScene

  constructor() {
    this.init()
  }

  async init() {
    assetManager.setAssets(assets)

    await assetManager.load({ label: ['main'] })

    const texture = assetManager.getItem('texture1')

    console.log(texture)

    this.threex = new Threex({
      components: {
        TestComponent: {
          props: {
            isActive: false,
          },

          module: TestComponent,
        },
      },

      gsap,
    })

    this.testScene = this.threex.TestComponent

    const container = document.getElementById('container')

    this.testScene.$setup(container)
    this.testScene.$start()
  }
}

new Test()
