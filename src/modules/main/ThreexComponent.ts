interface Options {
  autoTick: boolean
  useDefaultTick: boolean
}

interface RequiredField {
  name: string
  type: string
}

interface Status {
  isFirstStart: boolean
  isActive: boolean
  isRunning: boolean
}

class ThreexComponent {
  private static COMPLEX_FIELDS: Array<string> = ['data', 'methods']
  private static EXCLUDE_FIELDS: Array<string> = ['options']
  private static REQUIRED_FIELDS: Array<RequiredField> = [
    {
      name: 'setup',
      type: 'function',
    },
  ]

  ctx: any
  readonly component: any
  public props: object
  public options: Options
  public container: HTMLElement
  public sizes: {
    width: number
    height: number
    aspectRatio: number
  }

  public scene: any
  public camera: any
  public renderer: any
  public canvas: HTMLCanvasElement | null
  public renderFunc: FrameRequestCallback
  public resizeFunc: object

  public status: Status

  constructor(ctx: any, component: any, props: object | null = null) {
    this.ctx = ctx
    this.props = props || {}

    this.component = component
    this.checkComponent()

    // Setup options
    this.options = {
      autoTick: this.component.options?.autoTick ?? true,
      useDefaultTick: this.component.options?.useDefaultTick ?? true,
    }

    // Setup own fields
    this.updateOwnFields()

    // Unpack component
    this.unpackComponent()
  }

  /**
   * Update own class fields
   */
  private updateOwnFields() {
    Object.assign(this, {
      container: null,
      scene: null,
      camera: null,
      renderer: null,
      canvas: null,
      renderFunc: null,
      resizeFunc: null,
      sizes: {
        width: 0,
        height: 0,
      },
      status: {
        isFirstStart: false,
        isActive: false,
        isRunning: false,
      },
    })
  }

  /**
   * Applies component fields to this
   * @private
   */
  private unpackComponent() {
    Object.keys(this.component).forEach((key) => {
      if (ThreexComponent.EXCLUDE_FIELDS.includes(key)) return

      if (ThreexComponent.COMPLEX_FIELDS.includes(key)) {
        Object.assign(this, this.component[key])
      } else {
        // @ts-ignore
        this[key] = this.component[key]
      }
    })
  }

  /**
   * Checks the component for required fields
   * @private
   */
  private checkComponent() {
    ThreexComponent.REQUIRED_FIELDS.forEach((field) => {
      if (typeof this.component[field.name] === 'undefined') {
        throw new Error(`${field.name} is required for Threex component`)
      }

      if (
        field.type !== 'any' &&
        typeof this.component[field.name] !== field.type
      ) {
        throw new Error(`${field.name} is not a ${field.type}`)
      }
    })
  }

  private useComponentHook(hookName: string, args: any = []) {
    // @ts-ignore
    const hook: any = this[hookName]

    if (hook && typeof hook === 'function') {
      if (args.length) hook.bind(this)(...args)
      else hook.bind(this)()
    }
  }

  /**
   * Resets component data to default values.
   * @private
   */
  private resetComponentData() {
    if (!this.component.data) return

    Object.keys(this.component.data).forEach((key) => {
      // @ts-ignore
      this[key] = this.component.data[key]
    })
  }

  /**
   * Update container sizes
   * @public
   */
  public updateSizes() {
    this.sizes.width = this.container.offsetWidth
    this.sizes.height = this.container.offsetHeight
    this.sizes.aspectRatio = this.sizes.width / this.sizes.height
  }

  /* Hooks */

  /**
   * Setup scene
   */
  public $setup(container: HTMLElement) {
    if (!container) throw new Error(`Container is not defined`)

    this.container = container

    this.updateSizes()

    this.useComponentHook('setup')

    this.canvas = this.renderer.domElement
    this.container.appendChild(this.canvas)

    this.$resize()
    this.resizeFunc = this.$resize.bind(this)
    // @ts-ignore
    window.addEventListener('resize', this.resizeFunc)

    this.status.isActive = true
  }

  /**
   * Resize handler
   */
  public $resize() {
    this.updateSizes()

    this.useComponentHook('beforeResize')

    if (this.camera.aspect) this.camera.aspect = this.sizes.aspectRatio
    this.renderer.setSize(this.sizes.width, this.sizes.height)

    this.camera.updateProjectionMatrix()

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.useComponentHook('resized')

    this.$render()
  }

  /**
   * Frame render handler
   */
  public $render(
    time: any = undefined,
    delta: any = undefined,
    frame: any = undefined
  ) {
    const params: object = { time, delta, frame }

    this.useComponentHook('beforeRender', [params])

    if (this.options.useDefaultTick)
      this.renderer.render(this.scene, this.camera)

    this.useComponentHook('rendered', [params])

    if (!this.ctx.gsap && this.status.isRunning && this.renderFunc)
      window.requestAnimationFrame(this.renderFunc)
  }

  /**
   * Starts render tick and custom events of scene
   */
  public $start() {
    this.useComponentHook('beforeStart')

    this.status.isFirstStart = false

    if (this.options.autoTick) {
      this.status.isRunning = true

      this.renderFunc = this.$render.bind(this)

      if (this.ctx.gsap) this.ctx.gsap.ticker.add(this.renderFunc)
      else this.$render()
    }

    this.useComponentHook('started')
  }

  /**
   * Freeze render tick and custom events of scene
   */
  public $freeze() {
    this.useComponentHook('beforeFreeze')

    if (this.options.autoTick && this.ctx.gsap) {
      this.ctx.gsap.ticker.remove(this.renderFunc)
    }

    this.status.isRunning = false

    this.useComponentHook('frozen')
  }

  $destroy() {
    this.useComponentHook('beforeDestroy')

    this.$freeze()

    // @ts-ignore
    window.removeEventListener('resize', this.resizeFunc)
    this.container.removeChild(this.renderer.domElement)

    this.status.isActive = false

    this.updateOwnFields()
    this.resetComponentData()

    this.useComponentHook('destroyed')
  }
}

export default ThreexComponent
