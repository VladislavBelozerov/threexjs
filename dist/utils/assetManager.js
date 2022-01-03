var __webpack_exports__ = {};
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Asset loading helper
 */
var AssetManager = /*#__PURE__*/function () {
  function AssetManager() {
    _classCallCheck(this, AssetManager);

    _defineProperty(this, "items", void 0);

    _defineProperty(this, "assets", void 0);

    this.items = new Map();
    this.assets = [];
  }

  _createClass(AssetManager, [{
    key: "setAssets",
    value: function setAssets(assets) {
      this.assets = assets;
    }
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var params,
            assetsToLoad,
            promises,
            assetsLoaded,
            _iterator,
            _step,
            _loop,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                // Filter assets
                assetsToLoad = this.assets.filter(function (asset) {
                  if (!params.name && !params.label) return true;
                  if (params.name === asset.name) return true;
                  if (typeof params.label === 'string' && asset.label === params.label) return true;
                  if (_typeof(params.label) === 'object' && Array.isArray(params.label) && params.label.includes(asset.label)) return true;
                  return false;
                });

                if (assetsToLoad.length) {
                  _context.next = 5;
                  break;
                }

                if (params.onProgress) params.onProgress(100);
                return _context.abrupt("return");

              case 5:
                promises = [];
                assetsLoaded = 0; // eslint-disable-next-line no-restricted-syntax

                _iterator = _createForOfIteratorHelper(assetsToLoad);

                try {
                  _loop = function _loop() {
                    var asset = _step.value;
                    promises.push( // eslint-disable-next-line @typescript-eslint/no-loop-func
                    new Promise(function (resolve, reject) {
                      if (asset.loadHandler) {
                        asset.loadHandler(_this, function () {
                          assetsLoaded += 1;
                          if (params.onProgress) params.onProgress(assetsLoaded / assetsToLoad.length * 100);
                          resolve();
                        }, function () {
                          reject(new Error("Cannot load asset \"".concat(asset.name, "\"")));
                        });
                        return;
                      }

                      asset.loader.load(asset.path, function (result) {
                        _this.setItem(asset.name, asset.postLoadHandler ? asset.postLoadHandler(result) : result);

                        assetsLoaded += 1;
                        if (params.onProgress) params.onProgress(assetsLoaded / assetsToLoad.length * 100);
                        resolve();
                      }, function () {
                        return false;
                      }, function () {
                        reject(new Error("Cannot load asset \"".concat(asset.name, "\"")));
                      });
                    }));
                  };

                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context.next = 11;
                return Promise.all(promises);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "setItem",
    value: function setItem(name) {
      var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.items.set(name, item);
    }
  }, {
    key: "getItem",
    value: function getItem(name) {
      var item = this.items.get(name);
      if (!item) throw new Error("Item ".concat(name, " was not found."));
      return item;
    }
  }]);

  return AssetManager;
}();

var assetManager = new AssetManager();
/* harmony default export */ __webpack_exports__["Z"] = (assetManager);
var __webpack_exports__default = __webpack_exports__.Z;
export { __webpack_exports__default as default };
