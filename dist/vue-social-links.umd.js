(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.socialLinks = {}));
}(this, (function (exports) { 'use strict';

  var script = {
    props: {
      social: {
        type: Object,
        requried: true
      }
    },
    data: function data() {
      return {
        open: false,
      }
    },
    methods: {
      openLinks: function openLinks() {
        this.open = true;
        this.$refs["container"].classList.add("open");
      },
      closeLinks: function closeLinks() {
        this.open = false;
        this.$refs["container"].classList.remove("open");
      }
    },
    computed: {
      style: function style() {
        if(this.open) {
          var size = Object.keys(this.social).length * 88;
          if(size < 230) {
            size = 230;
          }
          return ("width: " + size + "px;");
        } else {
          return '';
        }
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "body" }, [
      _c(
        "div",
        {
          ref: "container",
          staticClass: "container",
          attrs: { id: "container", style: _vm.style },
          on: {
            "update:style": function($event) {
              _vm.style = $event;
            }
          }
        },
        [
          _c(
            "button",
            { staticClass: "open-btn", on: { click: _vm.openLinks } },
            [_c("i", { staticClass: "fas fa-share-alt" })]
          ),
          _vm._v(" "),
          _c(
            "a",
            {
              staticClass: "x",
              attrs: { href: "#", id: "close" },
              on: { click: _vm.closeLinks }
            },
            [
              _c(
                "button",
                { staticClass: "close-btn", on: { click: _vm.openLinks } },
                [_c("i", { staticClass: "fas fa-times" })]
              )
            ]
          ),
          _vm._v(" "),
          _vm.social && _vm.social.youtube
            ? _c(
                "a",
                {
                  staticClass: "ytb",
                  attrs: {
                    href: "https://youtube.com/c/" + _vm.social.youtube,
                    target: "_blank"
                  }
                },
                [_c("i", { staticClass: "fab fa-youtube" })]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.social && _vm.social.twitter
            ? _c(
                "a",
                {
                  staticClass: "twt",
                  attrs: {
                    href: "https://twitter.com/" + _vm.social.twitter,
                    target: "_blank"
                  }
                },
                [_c("i", { staticClass: "fab fa-twitter" })]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.social && _vm.social.linkedin
            ? _c(
                "a",
                {
                  staticClass: "lin",
                  attrs: {
                    href: "https://linkedin.com/in/" + _vm.social.linkedin,
                    target: "_blank"
                  }
                },
                [_c("i", { staticClass: "fab fa-linkedin" })]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.social && _vm.social.instagram
            ? _c(
                "a",
                {
                  staticClass: "ins",
                  attrs: {
                    href: "https://instagram.com/" + _vm.social.instagram,
                    target: "_blank"
                  }
                },
                [_c("i", { staticClass: "fab fa-instagram" })]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.social && _vm.social.github
            ? _c(
                "a",
                {
                  staticClass: "git",
                  attrs: {
                    href: "https://github.com/" + _vm.social.github,
                    target: "_blank"
                  }
                },
                [_c("i", { staticClass: "fab fa-github" })]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.social && _vm.social.facebook
            ? _c(
                "a",
                {
                  staticClass: "fcb",
                  attrs: {
                    href: "https://facebook.com/" + _vm.social.facebook,
                    target: "_blank"
                  }
                },
                [_c("i", { staticClass: "fab fa-facebook" })]
              )
            : _vm._e()
        ]
      )
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-0363155c_0", { source: "\n@import url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css\");\n@import url(\"https://fonts.googleapis.com/css?family=Muli&display=swap\");\n.container[data-v-0363155c] {\n  background-color: #fff;\n  border-radius: 50px;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  transition: 0.4s ease;\n  height: 70px;\n  width: 70px;\n}\n.container.open[data-v-0363155c] {\n  width: 438px;\n}\n.container .open-btn[data-v-0363155c] {\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  background-image: linear-gradient(\n    110.1deg,\n    rgba(241, 115, 30, 1) 18.9%,\n    rgba(231, 29, 54, 1) 90.7%\n  );\n  color: #fff;\n  cursor: pointer;\n  border: 0;\n  border-radius: 50%;\n  font-size: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  height: 70px;\n  width: 70px;\n  z-index: 100;\n}\n.container .close-btn[data-v-0363155c] {\n  background-color: #282c37;\n  position: absolute;\n  top: 0;\n  left: 0;\n  cursor: pointer;\n  border: 0;\n  font-size: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  height: 70px;\n  width: 70px;\n  z-index: 100;\n}\n.container.open .open-btn[data-v-0363155c] {\n  display: none;\n}\n.container a[data-v-0363155c] {\n  background-color: #fff;\n  border-radius: 50%;\n  font-size: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 10px;\n  height: 50px;\n  width: 50px;\n  text-decoration: none;\n  opacity: 0;\n}\n.container.open a[data-v-0363155c] {\n  position: static;\n  opacity: 1;\n  transition: 0.4s ease;\n}\n.container a.ytb[data-v-0363155c] {\n  background-color: #ff0000;\n}\n.container a.twt[data-v-0363155c] {\n  background-color: #1da1f2;\n}\n.container a.lin[data-v-0363155c] {\n  background-color: #007bb5;\n}\n.container a.ins[data-v-0363155c] {\n  background-color: #c32aa3;\n}\n.container a.git[data-v-0363155c] {\n  background-color: #24292e;\n}\n.container a.fcb[data-v-0363155c] {\n  background-color: #4267B2;\n}\n.container a i[data-v-0363155c] {\n  color: #fff;\n}\n", map: {"version":3,"sources":["/home/rant1989/Code/PlayGround/vue-social-links/src/component.vue"],"names":[],"mappings":";AAyEA,yFAAA;AACA,wEAAA;AAEA;EACA,sBAAA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,qBAAA;EACA,YAAA;EACA,WAAA;AACA;AAEA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;;EAEA;;;;GAIA;EACA,WAAA;EACA,eAAA;EACA,SAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,UAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,yBAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,eAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,UAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,YAAA;EACA,WAAA;EACA,qBAAA;EACA,UAAA;AACA;AAEA;EACA,gBAAA;EACA,UAAA;EACA,qBAAA;AACA;AAEA;EACA,yBAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,yBAAA;AACA;AAEA;EACA,WAAA;AACA","file":"component.vue","sourcesContent":["<script>\nexport default {\n  props: {\n    social: {\n      type: Object,\n      requried: true\n    }\n  },\n  data() {\n    return {\n      open: false,\n    }\n  },\n  methods: {\n    openLinks() {\n      this.open = true;\n      this.$refs[\"container\"].classList.add(\"open\");\n    },\n    closeLinks() {\n      this.open = false;\n      this.$refs[\"container\"].classList.remove(\"open\");\n    }\n  },\n  computed: {\n    style() {\n      if(this.open) {\n        let size = Object.keys(this.social).length * 88;\n        if(size < 230) {\n          size = 230;\n        }\n        return `width: ${size}px;`;\n      } else {\n        return '';\n      }\n    }\n  }\n};\n</script>\n\n<template>\n  <div class=\"body\">\n    <div class=\"container\" id=\"container\" ref=\"container\" :style.sync=\"style\">\n      <button @click=\"openLinks\" class=\"open-btn\">\n        <i class=\"fas fa-share-alt\"></i>\n      </button>\n      <a href=\"#\" class=\"x\" id=\"close\" @click=\"closeLinks\">\n        <button @click=\"openLinks\" class=\"close-btn\">\n          <i class=\"fas fa-times\"></i>\n        </button>\n      </a>\n      <a :href=\"`https://youtube.com/c/${social.youtube}`\" v-if=\"social && social.youtube\" class=\"ytb\" target=\"_blank\">\n        <i class=\"fab fa-youtube\"></i>\n      </a>\n      <a :href=\"`https://twitter.com/${social.twitter}`\" v-if=\"social && social.twitter\" class=\"twt\" target=\"_blank\">\n        <i class=\"fab fa-twitter\"></i>\n      </a>\n      <a :href=\"`https://linkedin.com/in/${social.linkedin}`\" v-if=\"social && social.linkedin\" class=\"lin\" target=\"_blank\">\n        <i class=\"fab fa-linkedin\"></i>\n      </a>\n      <a :href=\"`https://instagram.com/${social.instagram}`\" v-if=\"social && social.instagram\" class=\"ins\" target=\"_blank\">\n        <i class=\"fab fa-instagram\"></i>\n      </a>\n      <a :href=\"`https://github.com/${social.github}`\" v-if=\"social && social.github\" class=\"git\" target=\"_blank\">\n        <i class=\"fab fa-github\"></i>\n      </a>\n      <a :href=\"`https://facebook.com/${social.facebook}`\" v-if=\"social && social.facebook\" class=\"fcb\" target=\"_blank\">\n        <i class=\"fab fa-facebook\"></i>\n      </a>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n@import url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css\");\n@import url(\"https://fonts.googleapis.com/css?family=Muli&display=swap\");\n\n.container {\n  background-color: #fff;\n  border-radius: 50px;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  transition: 0.4s ease;\n  height: 70px;\n  width: 70px;\n}\n\n.container.open {\n  width: 438px;\n}\n\n.container .open-btn {\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  background-image: linear-gradient(\n    110.1deg,\n    rgba(241, 115, 30, 1) 18.9%,\n    rgba(231, 29, 54, 1) 90.7%\n  );\n  color: #fff;\n  cursor: pointer;\n  border: 0;\n  border-radius: 50%;\n  font-size: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  height: 70px;\n  width: 70px;\n  z-index: 100;\n}\n\n.container .close-btn {\n  background-color: #282c37;\n  position: absolute;\n  top: 0;\n  left: 0;\n  cursor: pointer;\n  border: 0;\n  font-size: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  height: 70px;\n  width: 70px;\n  z-index: 100;\n}\n\n.container.open .open-btn {\n  display: none;\n}\n\n.container a {\n  background-color: #fff;\n  border-radius: 50%;\n  font-size: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 10px;\n  height: 50px;\n  width: 50px;\n  text-decoration: none;\n  opacity: 0;\n}\n\n.container.open a {\n  position: static;\n  opacity: 1;\n  transition: 0.4s ease;\n}\n\n.container a.ytb {\n  background-color: #ff0000;\n}\n.container a.twt {\n  background-color: #1da1f2;\n}\n.container a.lin {\n  background-color: #007bb5;\n}\n.container a.ins {\n  background-color: #c32aa3;\n}\n.container a.git {\n  background-color: #24292e;\n}\n.container a.fcb {\n  background-color: #4267B2;\n}\n\n.container a i {\n  color: #fff;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-0363155c";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('social-links', __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // To auto-install when vue is found
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'homeran-loading';
  // export const RollupDemoDirective = component;

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
