import getFormat from '~/utils/getFormat'
import constants from '~/utils/constants'

type AssetType = 'model' | 'texture' | 'cubeTexture'
type Handler = (asset?: any, ctx?: Object) => any

interface AssetItem {
  path?: string | Array<string>
  format?: string
  type?: AssetType
  name?: string
  handler: Handler
}

interface Assets {
  modelsPath?: string
  texturesPath?: string
  items?: {
    [key: string]: AssetItem
  }
}

class AssetsManager {
  /**
   * Add additional fields to assets items
   */
  private static processAssets(assets: Assets) {
    const modelsPath: string = assets.modelsPath ?? ''
    const texturesPath: string = assets.texturesPath ?? ''

    return Object.keys(assets).reduce<Array<AssetItem>>((acc, key: string) => {
      const item: AssetItem = assets.items[key]
      const format: string = getFormat(
        typeof item.path === 'string' ? item.path : item.path[0]
      )

      let type: AssetType

      if (constants.MODELS_FORMATS.includes(format)) {
        type = 'model'
      } else if (typeof item.path === 'string') {
        type = 'texture'
      } else {
        type = 'cubeTexture'
      }

      const path: string =
        (type === 'model' ? modelsPath : texturesPath) + item.path
      const name: string = item.name || key

      let { handler } = item

      if (typeof handler !== 'function') {
        handler = () => false
        console.warn(`Asset "${item.name}" handler is not a function`)
      }

      if (item.path) {
        acc.push({
          format,
          path,
          type,
          name,
          handler,
        })
      }

      return acc
    }, [])
  }

  private assets: Array<AssetItem>
  private context: Object

  /* Constructor */
  constructor(assets: Assets, context: Object) {
    this.context = context
    this.assets = AssetsManager.processAssets(assets)

    Object.assign(this, context)

    console.log(this.assets)
  }
}

export default AssetsManager
