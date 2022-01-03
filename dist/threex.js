/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ main; }
});

;// CONCATENATED MODULE: ./node_modules/lodash-es/_freeGlobal.js
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ var _freeGlobal = (freeGlobal);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_root.js


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

/* harmony default export */ var _root = (root);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_Symbol.js


/** Built-in value references. */
var _Symbol_Symbol = _root.Symbol;

/* harmony default export */ var _Symbol = (_Symbol_Symbol);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_getRawTag.js


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ var _getRawTag = (getRawTag);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_objectToString.js
/** Used for built-in method references. */
var _objectToString_objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var _objectToString_nativeObjectToString = _objectToString_objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return _objectToString_nativeObjectToString.call(value);
}

/* harmony default export */ var _objectToString = (objectToString);

;// CONCATENATED MODULE: ./node_modules/lodash-es/_baseGetTag.js




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var _baseGetTag_symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (_baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

/* harmony default export */ var _baseGetTag = (baseGetTag);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isObject.js
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ var lodash_es_isObject = (isObject);

;// CONCATENATED MODULE: ./node_modules/lodash-es/isFunction.js



/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!lodash_es_isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/* harmony default export */ var lodash_es_isFunction = (isFunction);

;// CONCATENATED MODULE: ./src/modules/main/ThreexComponent.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ThreexComponent = /*#__PURE__*/function () {
  function ThreexComponent(ctx, component) {
    var _this$component$optio, _this$component$optio2, _this$component$optio3, _this$component$optio4;

    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, ThreexComponent);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "component", void 0);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "sizes", void 0);

    _defineProperty(this, "scene", void 0);

    _defineProperty(this, "camera", void 0);

    _defineProperty(this, "renderer", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "renderFunc", void 0);

    _defineProperty(this, "resizeFunc", void 0);

    _defineProperty(this, "status", void 0);

    this.ctx = ctx;
    this.props = props || {};
    this.component = component;
    this.checkComponent(); // Setup options

    this.options = {
      autoTick: (_this$component$optio = (_this$component$optio2 = this.component.options) === null || _this$component$optio2 === void 0 ? void 0 : _this$component$optio2.autoTick) !== null && _this$component$optio !== void 0 ? _this$component$optio : true,
      useDefaultTick: (_this$component$optio3 = (_this$component$optio4 = this.component.options) === null || _this$component$optio4 === void 0 ? void 0 : _this$component$optio4.useDefaultTick) !== null && _this$component$optio3 !== void 0 ? _this$component$optio3 : true
    }; // Setup own fields

    this.updateOwnFields(); // Unpack component

    this.unpackComponent();
  }
  /**
   * Update own class fields
   */


  _createClass(ThreexComponent, [{
    key: "updateOwnFields",
    value: function updateOwnFields() {
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
          height: 0
        },
        status: {
          isFirstStart: false,
          isActive: false,
          isRunning: false
        }
      });
    }
    /**
     * Applies component fields to this
     * @private
     */

  }, {
    key: "unpackComponent",
    value: function unpackComponent() {
      var _this = this;

      Object.keys(this.component).forEach(function (key) {
        if (ThreexComponent.EXCLUDE_FIELDS.includes(key)) return;

        if (ThreexComponent.COMPLEX_FIELDS.includes(key)) {
          Object.assign(_this, _this.component[key]);
        } else {
          // @ts-ignore
          _this[key] = _this.component[key];
        }
      });
    }
    /**
     * Checks the component for required fields
     * @private
     */

  }, {
    key: "checkComponent",
    value: function checkComponent() {
      var _this2 = this;

      ThreexComponent.REQUIRED_FIELDS.forEach(function (field) {
        if (typeof _this2.component[field.name] === 'undefined') {
          throw new Error("".concat(field.name, " is required for Threex component"));
        }

        if (field.type === 'function' && !lodash_es_isFunction(_this2.component[field.name])) {
          throw new Error("".concat(field.name, " is not a function"));
        } else if (field.type !== 'any' && _typeof(_this2.component[field.name]) !== field.type) {
          throw new Error("".concat(field.name, " is not a ").concat(field.type));
        }
      });
    }
  }, {
    key: "useComponentHook",
    value: function useComponentHook(hookName) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      // @ts-ignore
      var hook = this[hookName];

      if (hook && lodash_es_isFunction(hook)) {
        if (args.length) hook.bind(this).apply(void 0, _toConsumableArray(args));else hook.bind(this)();
      }
    }
    /**
     * Resets component data to default values.
     * @private
     */

  }, {
    key: "resetComponentData",
    value: function resetComponentData() {
      var _this3 = this;

      if (!this.component.data) return;
      Object.keys(this.component.data).forEach(function (key) {
        // @ts-ignore
        _this3[key] = _this3.component.data[key];
      });
    }
    /**
     * Update container sizes
     * @public
     */

  }, {
    key: "updateSizes",
    value: function updateSizes() {
      this.sizes.width = this.container.offsetWidth;
      this.sizes.height = this.container.offsetHeight;
      this.sizes.aspectRatio = this.sizes.width / this.sizes.height;
    }
    /* Hooks */

    /**
     * Setup scene
     */

  }, {
    key: "$setup",
    value: function $setup(container) {
      if (!container) throw new Error("Container is not defined");
      this.container = container;
      this.updateSizes();
      this.useComponentHook('setup');
      this.canvas = this.renderer.domElement;
      this.container.appendChild(this.canvas);
      this.$resize();
      this.resizeFunc = this.$resize.bind(this); // @ts-ignore

      window.addEventListener('resize', this.resizeFunc);
      this.status.isActive = true;
    }
    /**
     * Resize handler
     */

  }, {
    key: "$resize",
    value: function $resize() {
      this.updateSizes();
      this.useComponentHook('beforeResize');
      if (this.camera.aspect) this.camera.aspect = this.sizes.aspectRatio;
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.useComponentHook('resized');
      this.$render();
    }
    /**
     * Frame render handler
     */

  }, {
    key: "$render",
    value: function $render() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var frame = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var params = {
        time: time,
        delta: delta,
        frame: frame
      };
      this.useComponentHook('beforeRender', [params]);
      if (this.options.useDefaultTick) this.renderer.render(this.scene, this.camera);
      this.useComponentHook('rendered', [params]);
      if (!this.ctx.gsap && this.status.isRunning && this.renderFunc) window.requestAnimationFrame(this.renderFunc);
    }
    /**
     * Starts render tick and custom events of scene
     */

  }, {
    key: "$start",
    value: function $start() {
      this.useComponentHook('beforeStart');
      this.status.isFirstStart = false;

      if (this.options.autoTick) {
        this.status.isRunning = true;
        this.renderFunc = this.$render.bind(this);
        if (this.ctx.gsap) this.ctx.gsap.ticker.add(this.renderFunc);else this.$render();
      }

      this.useComponentHook('started');
    }
    /**
     * Freeze render tick and custom events of scene
     */

  }, {
    key: "$freeze",
    value: function $freeze() {
      this.useComponentHook('beforeFreeze');

      if (this.options.autoTick && this.ctx.gsap) {
        this.ctx.gsap.ticker.remove(this.renderFunc);
      }

      this.status.isRunning = false;
      this.useComponentHook('frozen');
    }
  }, {
    key: "$destroy",
    value: function $destroy() {
      this.useComponentHook('beforeDestroy');
      this.$freeze(); // @ts-ignore

      window.removeEventListener('resize', this.resizeFunc);
      this.container.removeChild(this.renderer.domElement);
      this.status.isActive = false;
      this.updateOwnFields();
      this.resetComponentData();
      this.useComponentHook('destroyed');
    }
  }]);

  return ThreexComponent;
}();

_defineProperty(ThreexComponent, "COMPLEX_FIELDS", ['data', 'methods']);

_defineProperty(ThreexComponent, "EXCLUDE_FIELDS", ['options']);

_defineProperty(ThreexComponent, "REQUIRED_FIELDS", [{
  name: 'setup',
  type: 'function'
}]);

/* harmony default export */ var main_ThreexComponent = (ThreexComponent);
;// CONCATENATED MODULE: ./src/modules/main/index.ts
function main_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function main_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function main_createClass(Constructor, protoProps, staticProps) { if (protoProps) main_defineProperties(Constructor.prototype, protoProps); if (staticProps) main_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * The module creates a wrapper for convenient writing of scene code
 */
var Threex = /*#__PURE__*/function () {
  function Threex(props) {
    main_classCallCheck(this, Threex);

    main_defineProperty(this, "ctx", void 0);

    main_defineProperty(this, "components", void 0);

    main_defineProperty(this, "props", void 0);

    this.props = props;
    this.components = {};
    this.ctx = {
      components: this.components,
      gsap: props.gsap
    };
    this.init();
  }
  /**
   * Apply the component module to the input parameters and also write the
   * result to the class
   * @private
   */


  main_createClass(Threex, [{
    key: "init",
    value: function init() {
      var _this = this;

      Object.keys(this.props.components).forEach(function (key) {
        var component = _this.props.components[key];

        if ('module' in component) {
          _this.components[key] = new main_ThreexComponent(_this.ctx, component.module, component.props || null);
        } else {
          _this.components[key] = new main_ThreexComponent(_this.ctx, component);
        }

        _this[key] = _this.components[key];
      });
    }
  }]);

  return Threex;
}();

/* harmony default export */ var main = (Threex);
var __webpack_exports__default = __webpack_exports__.Z;
export { __webpack_exports__default as default };
