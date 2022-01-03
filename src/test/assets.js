import * as THREE from 'three'

export default (() => {
  const textureLoader = new THREE.TextureLoader()

  return [
    {
      name: 'texture',
      path: '/assets/texture.jpg',
      loadHandler(ctx, resolve, reject) {
        textureLoader.load(
          this.path,
          (result) => {
            ctx.setItem(this.name, result)

            resolve()
          },
          () => false,
          reject
        )
      },
    },

    {
      name: 'texture1',
      path: '/assets/texture.jpg',
      loader: textureLoader,
      label: 'main',
    },
  ]
})()
