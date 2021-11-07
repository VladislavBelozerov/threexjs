import merge from 'lodash-es/merge'
import * as THREE from 'three'
import AssetsManager from '~/modules/assetsManager/index'

interface ThreexOptions {
  scenes?: Object
  assets?: Object
}

interface Context {
  $scenes: Object
  $three: Object
  $assetsManager: InstanceType<any>
}

const DEFAULT_OPTIONS: ThreexOptions = {
  scenes: {},
  assets: {},
}

class Threex {
  protected context: Context
  protected options: ThreexOptions

  /* Constructor */
  constructor(options: ThreexOptions = {}) {
    this.options = merge(DEFAULT_OPTIONS, options) // Setting options

    /* Setting context */
    this.context = {
      $scenes: this.options.scenes,
      $three: THREE,
      $assetsManager: new AssetsManager(this.options.assets, this.context),
    }

    Object.assign(this, this.context)
  }
}

export default Threex
