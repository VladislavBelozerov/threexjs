interface Asset {
  name: string
  label?: string
  path?: string
  loader?: any
  postLoadHandler?: (result: any) => any
  loadHandler?: (ctx: any, resolve: any, reject: any) => any
}

interface LoadParams {
  name?: string
  label?: string | Array<string>
  onProgress?: (val: number) => void
}

/**
 * Asset loading helper
 */
class AssetManager {
  private items: Record<string, any>
  private assets: Array<Asset>

  constructor() {
    this.items = new Map()
    this.assets = []
  }

  public setAssets(assets: Array<Asset>) {
    this.assets = assets
  }

  public load(params: LoadParams = {}) {
    // Filter assets
    const assetsToLoad = this.assets.filter((asset) => {
      if (!params.name && !params.label) return true
      if (params.name === asset.name) return true

      if (typeof params.label === 'string' && asset.label === params.label)
        return true

      return !!(
        typeof params.label === 'object' &&
        Array.isArray(params.label) &&
        params.label.includes(asset.label)
      )
    })

    if (!assetsToLoad.length) {
      if (params.onProgress) params.onProgress(100)

      return undefined
    }

    const promises = []
    let assetsLoaded = 0

    // eslint-disable-next-line no-restricted-syntax
    for (const asset of assetsToLoad) {
      promises.push(
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        new Promise<void>((resolve, reject) => {
          if (asset.loadHandler) {
            asset.loadHandler(
              this,
              () => {
                assetsLoaded += 1

                if (params.onProgress)
                  params.onProgress((assetsLoaded / assetsToLoad.length) * 100)

                resolve()
              },
              () => {
                reject(new Error(`Cannot load asset "${asset.name}"`))
              }
            )

            return
          }

          asset.loader.load(
            asset.path,
            (result: any) => {
              this.setItem(
                asset.name,
                asset.postLoadHandler ? asset.postLoadHandler(result) : result
              )

              assetsLoaded += 1

              if (params.onProgress)
                params.onProgress((assetsLoaded / assetsToLoad.length) * 100)

              resolve()
            },
            () => false,
            () => {
              reject(new Error(`Cannot load asset "${asset.name}"`))
            }
          )
        })
      )
    }

    return Promise.all(promises)
  }

  public setItem(name: string, item: any = null) {
    this.items.set(name, item)
  }

  public getItem(name: string) {
    const item = this.items.get(name)

    if (!item) throw new Error(`Item ${name} was not found.`)

    return item
  }
}

const assetManager = new AssetManager()

export default assetManager
