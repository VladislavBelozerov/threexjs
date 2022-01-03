import * as THREE from 'three'

export default {
  data: {
    scene: null,
    camera: null,
    renderer: null,
    cube: null,
  },

  setup() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.aspectRatio,
      0.1,
      1000
    )
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    this.addCube()
  },

  beforeRender() {
    this.cube.rotation.y += 0.01
  },

  methods: {
    addCube() {
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

      this.cube = new THREE.Mesh(geometry, material)

      this.scene.add(this.cube)
    },
  },
}
