import ThreexComponent from '~/modules/main/ThreexComponent'

interface Component {
  props: object
  module: object
}

interface Components {
  [key: string]: object | Component
}

interface Props {
  components: Components
  gsap: object | undefined
}

interface Context {
  components: Components
  gsap: object | undefined
}

/**
 * The module creates a wrapper for convenient writing of scene code
 */
class Threex {
  protected ctx: Context // Threex context
  protected components: Components
  protected props: Props;

  [componentName: string]: object

  constructor(props: Props) {
    this.props = props
    this.components = {}

    this.ctx = {
      components: this.components,
      gsap: props.gsap,
    }

    this.init()
  }

  /**
   * Apply the component module to the input parameters and also write the
   * result to the class
   * @private
   */
  private init() {
    Object.keys(this.props.components).forEach((key: string) => {
      const component: object | Component = this.props.components[key]

      if ('module' in component) {
        this.components[key] = new ThreexComponent(
          this.ctx,
          component.module,
          component.props || {}
        )
      } else {
        this.components[key] = new ThreexComponent(this.ctx, component)
      }

      this[key] = this.components[key]
    })
  }
}

export default Threex
