import merge from 'lodash-es/merge';
import * as THREE from 'three';
import AssetsManager from '~/modules/assetsManager/index';
const DEFAULT_OPTIONS = {
    scenes: {},
};
class Threex {
    /* Constructor */
    constructor(options = {}) {
        this.$options = merge(DEFAULT_OPTIONS, options); // Setting options
        /* Setting basic fields */
        this.$scenes = this.$options.scenes;
        this.$three = THREE;
        this.$assetsManager = new AssetsManager();
    }
}
export default Threex;
//# sourceMappingURL=index.js.map