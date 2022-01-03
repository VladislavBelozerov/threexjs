import gsap from 'gsap'
import Threex from '~/modules/main'
import TestComponent from '~/test/components/TestComponent'

class Test {
  threex
  testScene

  constructor() {
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
