/* Threex test env */
/* Used only in dev mode */
import Threex from '~/index'
import assets from '~/test/assets'

class Test {
  constructor() {
    this.threex = new Threex({
      assets,
    })
  }
}

new Test()
