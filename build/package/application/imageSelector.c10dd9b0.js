/*! For license information please see imageSelector.c10dd9b0.js.LICENSE.txt */
!function(){var t,e={1822:function(t,e,r){"use strict";r.d(e,{JB:function(){return d},Pp:function(){return y},bu:function(){return m},fU:function(){return v}});r(8304),r(4812),r(489),r(2772),r(3710),r(1539),r(9714),r(2419),r(6992),r(1532),r(8783),r(3948),r(8011),r(9070),r(6649),r(6078),r(2526),r(1817),r(9653),r(2165);function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(i=o.key,a=void 0,a=function(t,e){if("object"!==n(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,e||"default");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===n(a)?a:String(a)),o)}var i,a}function a(t,e,r){return e&&i(t.prototype,e),r&&i(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}function u(t){var e=f();return function(){var r,o=h(t);if(e){var i=h(this).constructor;r=Reflect.construct(o,arguments,i)}else r=o.apply(this,arguments);return function(t,e){if(e&&("object"===n(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,r)}}function s(t){var e="function"==typeof Map?new Map:void 0;return s=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return l(t,arguments,h(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),p(n,t)},s(t)}function l(t,e,r){return l=f()?Reflect.construct.bind():function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&p(o,r.prototype),o},l.apply(null,arguments)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function h(t){return h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},h(t)}var v="tianyushell_core_language",y=function(t){c(r,t);var e=u(r);function r(t,n){return o(this,r),e.call(this,t,n&&{cause:n}||void 0)}return a(r,[{key:"toString",value:function(){return this.message}}]),r}(s(Error)),d=function(t){c(r,t);var e=u(r);function r(t){return o(this,r),e.call(this,t)}return a(r,[{key:"toString",value:function(){return"核心异常 - 天宇外壳无法找到库 ( ".concat(this.message," )")}}]),r}(y),m=function(t){c(r,t);var e=u(r);function r(t){return o(this,r),e.call(this,t)}return a(r,[{key:"toString",value:function(){return"未初始化的资源 - 天宇外壳无法找到入口 ( ".concat(this.message," )")}}]),r}(y)},3413:function(t,e,r){"use strict";function n(){var t,e;return!(null===(t=tianyuShell)||void 0===t||null===(e=t.core)||void 0===e||!e.language)}r.d(e,{$C:function(){return n}})},8286:function(t,e,r){"use strict";var n=r(7294),o=r(745);r(4916),r(4723);var i=function(){var t;if(null!==(t=navigator.userAgentData)&&void 0!==t&&t.mobile)return!0;var e=navigator.userAgent.toLowerCase(),r="ipad"==e.match(/ipad/i),n="iphone os"==e.match(/iphone os/i),o="midp"==e.match(/midp/i),i="rv:1.2.3.4"==e.match(/rv:1.2.3.4/i),a="ucweb"==e.match(/ucweb/i),c="android"==e.match(/android/i),u="windows ce"==e.match(/windows ce/i),s="windows mobile"==e.match(/windows mobile/i);return!!(r||n||o||i||a||c||u||s)}(),a=r(6472),c=r(1822),u=(r(4765),r(9720),r(6699),r(2023),r(1539),r(8674),r(2222),r(2564),r(6992),r(8783),r(3948),r(8309),r(8304),r(4812),r(489),r(2419),r(8011),r(9070),r(6649),r(6078),r(2526),r(1817),r(9653),r(7042),r(1038),r(2165),r(9753),r(2443),r(9341),r(3706),r(2703),r(9554),r(4747),r(5069),r(1284));r(6755);function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(){l=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function f(t,e,r,o){var i=e&&e.prototype instanceof v?e:v,a=Object.create(i.prototype),c=new j(o||[]);return n(a,"_invoke",{value:_(t,r,c)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var h={};function v(){}function y(){}function d(){}var m={};u(m,i,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(k([])));b&&b!==e&&r.call(b,i)&&(m=b);var w=d.prototype=v.prototype=Object.create(m);function E(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function o(n,i,a,c){var u=p(t[n],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==s(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function _(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=O(a,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=p(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function O(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=p(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function k(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:T}}function T(){return{value:void 0,done:!0}}return y.prototype=d,n(w,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:y,configurable:!0}),y.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},E(x.prototype),u(x.prototype,a,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new x(f(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(w),u(w,c,"Generator"),u(w,i,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function f(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function p(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=y(t);if(e){var o=y(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return function(t,e){if(e&&("object"===s(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,r)}}function y(t){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},y(t)}function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(o=n.key,i=void 0,i=function(t,e){if("object"!==s(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===s(i)?i:String(i)),n)}var o,i}function g(t,e,r){return e&&m(t.prototype,e),r&&m(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}var b=function(){function t(e){d(this,t),this.url=e,this.response=null}return g(t,[{key:"getResponse",value:function(){return this.response}}]),t}(),w=function(t){p(r,t);var e=v(r);function r(t){var n;return d(this,r),(n=e.call(this,t)).send=null,n.onload=null,n.onerror=null,n}return g(r,[{key:"setSend",value:function(t){this.send=t}},{key:"setOnload",value:function(t){this.onload=t}},{key:"setOnerror",value:function(t){this.onerror=t}},{key:"open",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Get";try{var r=new XMLHttpRequest;r.open(e,this.url),r.send(this.send),r.onload=function(){200===r.status?(t.response=r.response,t.onload&&t.onload()):t.onerror&&t.onerror()}}catch(t){this.onerror&&this.onerror()}}},{key:"openAsync",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Get";return new Promise((function(r,n){try{var o=new XMLHttpRequest;o.open(e,t.url),o.send(t.send),o.onload=function(){200===o.status?(t.response=o.response,t.onload&&t.onload(),r(t.response)):(t.onerror&&t.onerror(),n())}}catch(e){t.onerror&&t.onerror(),n()}}))}}]),r}(b),E=function(t){p(o,t);var e,r,n=v(o);function o(t){return d(this,o),n.call(this,t)}return g(o,[{key:"open",value:function(){this.openAsync()}},{key:"openAsync",value:(e=l().mark((function t(){var e,r;return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,this.url.startsWith("/"),t.next=4,fetch(this.url);case 4:return e=t.sent,t.next=7,e.text();case 7:return r=t.sent,this.response=JSON.parse(r||"{}"),t.abrupt("return",this.response);case 12:return t.prev=12,t.t0=t.catch(0),t.abrupt("return",null);case 15:case"end":return t.stop()}}),t,this,[[0,12]])})),r=function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(t){f(i,n,o,a,c,"next",t)}function c(t){f(i,n,o,a,c,"throw",t)}a(void 0)}))},function(){return r.apply(this,arguments)})}]),o}(b);function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function _(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],u=!0,s=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){s=!0,o=t}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return c}}(t,e)||k(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(){O=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),c=new j(o||[]);return n(a,"_invoke",{value:E(t,r,c)}),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function p(){}function h(){}function v(){}var y={};u(y,i,(function(){return this}));var d=Object.getPrototypeOf,m=d&&d(d(k([])));m&&m!==e&&r.call(m,i)&&(y=m);var g=v.prototype=p.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function o(n,i,a,c){var u=l(t[n],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==x(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function E(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=_(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function _(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function k(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:T}}function T(){return{value:void 0,done:!0}}return h.prototype=v,n(g,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:h,configurable:!0}),h.displayName=u(v,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,u(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},b(w.prototype),u(w.prototype,a,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(g),u(g,c,"Generator"),u(g,i,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function L(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function S(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){L(i,n,o,a,c,"next",t)}function c(t){L(i,n,o,a,c,"throw",t)}a(void 0)}))}}function j(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=k(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}function k(t,e){if(t){if("string"==typeof t)return T(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?T(t,e):void 0}}function T(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function P(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(o=n.key,i=void 0,i=function(t,e){if("object"!==x(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==x(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===x(i)?i:String(i)),n)}var o,i}function I(t,e){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},I(t,e)}function R(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=N(t);if(e){var o=N(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return function(t,e){if(e&&("object"===x(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,r)}}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}var A=(0,a.y)("image-selector","app"),G=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&I(t,e)}(f,t);var e,r,o,i,a,c,s,l=R(f);function f(t){var e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),(e=l.call(this,t)).token="";var r=window.location.search?window.location.search.substring(1):"";if(r){var n,o=j(r.split("&"));try{for(o.s();!(n=o.n()).done;){var i=n.value.split("=");if("token"===i[0]&&i[1]){e.token=i[1];break}}}catch(t){o.e(t)}finally{o.f()}}return e.isLoaded=!1,e.hasError=!1,e.images={},e.selected=[],e}return e=f,r=[{key:"componentDidMount",value:function(){var t=this;this.isLoaded||u.Q.withDialog(S(O().mark((function e(){return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t._loadImageSource();case 2:t.isLoaded=!0,t.forceUpdate();case 4:case"end":return e.stop()}}),e)}))))}},{key:"render",value:function(){return!this.token||this.hasError?this._renderForInvalid():this._render()}},{key:"_renderForInvalid",value:function(){return n.createElement("div",{className:"main_body"},A.getText("INVALID_IMAGE_SELECTOR_TOKEN"))}},{key:"_render",value:function(){return n.createElement("div",{className:"selector_content"},n.createElement("div",{className:"selector_title selector_source_title"},A.getText("SELECTOR_SOURCE_TITLE")),n.createElement("div",{className:"selector_title selector_selected_title"},A.getText("SELECTOR_SELECTED_TITLE")),n.createElement("div",{className:"selector_list_base selector_source"},this._renderSourceImages()),n.createElement("div",{className:"selector_list_base selector_selected"},this._renderSelectedImages()))}},{key:"_renderSourceImages",value:function(){for(var t=this,e=[],r=function(){var r=_(i[o],2),a=r[0],c=r[1],s=t.selected.includes(a)?"image_img_selected image_base":"image_base";e.push(n.createElement("img",{key:a,id:a,src:c,alt:a,className:s,onDoubleClick:function(){t.selected.includes(a)||u.Q.withDialog(S(O().mark((function e(){return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t._toSelect(a);case 2:e.sent?(t.selected.push(a),t.forceUpdate()):alert(A.getText("SELECT_IMG_FAILED"));case 4:case"end":return e.stop()}}),e)}))))}}))},o=0,i=Object.entries(this.images);o<i.length;o++)r();return n.createElement("div",null,e)}},{key:"_renderSelectedImages",value:function(){var t,e=this,r=[],o=j(this.selected);try{var i=function(){var o=t.value;r.push(n.createElement("img",{key:o,id:o,src:e.images[o],alt:o,className:"image_base",onDoubleClick:function(){u.Q.withDialog(S(O().mark((function t(){var r,n,i,a;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e._toUnselect(o);case 2:if(t.sent){r=e.selected,e.selected=[],n=j(r);try{for(n.s();!(i=n.n()).done;)(a=i.value)!==o&&e.selected.push(a)}catch(t){n.e(t)}finally{n.f()}e.forceUpdate()}else alert(A.getText("UNSELECT_IMG_FAILED"));case 4:case"end":return t.stop()}}),t)}))))}}))};for(o.s();!(t=o.n()).done;)i()}catch(t){o.e(t)}finally{o.f()}return n.createElement("div",null,r)}},{key:"_loadImageSource",value:(s=S(O().mark((function t(){var e,r=this;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e="".concat("/remote-imageSelector/aitianyu/cn/app/image/selector/getter/list","?token=").concat(this.token),t.abrupt("return",new Promise(function(){var t=S(O().mark((function t(n){var o,i,a,c,u,s,l,f;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,o=new E(e),t.next=4,o.openAsync();case 4:if(!(i=t.sent).response){t.next=32;break}if(!(a=i.response).valid){t.next=32;break}c=0,document.title="".concat(A.getText("IMAGE_SELECTOR_TITLE")," - ").concat(A.getText("IMAGE_SELECTOR_TITLE_LOADING"),"(").concat(c,"/").concat(a.all.length,")"),r.selected=a.selected,u=[],s=j(a.all),t.prev=13,f=O().mark((function t(){var e;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=l.value,u.push(S(O().mark((function t(){return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r._loadImage(e);case 2:c++,document.title="".concat(A.getText("IMAGE_SELECTOR_TITLE")," - ").concat(A.getText("IMAGE_SELECTOR_TITLE_LOADING"),"(").concat(c,"/").concat(a.all.length,")");case 4:case"end":return t.stop()}}),t)})))());case 2:case"end":return t.stop()}}),t)})),s.s();case 16:if((l=s.n()).done){t.next=20;break}return t.delegateYield(f(),"t0",18);case 18:t.next=16;break;case 20:t.next=25;break;case 22:t.prev=22,t.t1=t.catch(13),s.e(t.t1);case 25:return t.prev=25,s.f(),t.finish(25);case 28:return u.push(new Promise((function(t){setTimeout(t,2e4)}))),t.next=31,Promise.all(u);case 31:document.title="".concat(A.getText("IMAGE_SELECTOR_TITLE")," - ").concat(A.getText("IMAGE_SELECTOR_TITLE_COUNT"),"(").concat(a.all.length,")");case 32:t.next=37;break;case 34:t.prev=34,t.t2=t.catch(0),r.hasError=!0;case 37:return t.prev=37,n(),t.finish(37);case 40:case"end":return t.stop()}}),t,null,[[0,34,37,40],[13,22,25,28]])})));return function(e){return t.apply(this,arguments)}}()));case 2:case"end":return t.stop()}}),t,this)}))),function(){return s.apply(this,arguments)})},{key:"_loadImage",value:(c=S(O().mark((function t(e){var r,n,o,i,a,c,u;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=new w("/remote-imageSelector/aitianyu/cn/app/image/selector/getter/images"),n={token:this.token,images:[e]},r.setSend(JSON.stringify(n)),t.t0=JSON,t.next=6,r.openAsync("Post");case 6:if(t.t1=t.sent,(o=t.t0.parse.call(t.t0,t.t1)).response){i=o.response,a=j(i);try{for(a.s();!(c=a.n()).done;)u=c.value,this.images[u.name]=u.image}catch(t){a.e(t)}finally{a.f()}}case 9:case"end":return t.stop()}}),t,this)}))),function(t){return c.apply(this,arguments)})},{key:"_toSelect",value:(a=S(O().mark((function t(e){var r;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r="".concat("/remote-imageSelector/aitianyu/cn/app/image/selector/select","?token=").concat(this.token,"&images=").concat(e),t.abrupt("return",new Promise(function(){var t=S(O().mark((function t(e){var n,o;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=!1,t.prev=1,o=new E(r),t.next=5,o.openAsync();case 5:"success"===t.sent.response&&(n=!0);case 7:return t.prev=7,e(n),t.finish(7);case 10:case"end":return t.stop()}}),t,null,[[1,,7,10]])})));return function(e){return t.apply(this,arguments)}}()));case 2:case"end":return t.stop()}}),t,this)}))),function(t){return a.apply(this,arguments)})},{key:"_toUnselect",value:(i=S(O().mark((function t(e){var r;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r="".concat("/remote-imageSelector/aitianyu/cn/app/image/selector/unselect","?token=").concat(this.token,"&images=").concat(e),t.abrupt("return",new Promise(function(){var t=S(O().mark((function t(e){var n,o;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=!1,t.prev=1,o=new E(r),t.next=5,o.openAsync();case 5:"success"===t.sent.response&&(n=!0);case 7:return t.prev=7,e(n),t.finish(7);case 10:case"end":return t.stop()}}),t,null,[[1,,7,10]])})));return function(e){return t.apply(this,arguments)}}()));case 2:case"end":return t.stop()}}),t,this)}))),function(t){return i.apply(this,arguments)})}],r&&P(e.prototype,r),o&&P(e,o),Object.defineProperty(e,"prototype",{writable:!1}),f}(n.Component),C=(0,a.y)("image-selector","app");document.title=C.getText("IMAGE_SELECTOR_TITLE");var M=document.getElementById("tianyu_shell_ui_major");if(!M)throw new c.bu("tianyu shell major page is not ready");var F=o.createRoot(M);i?F.render(n.createElement("div",{className:"main_body"},C.getText("NOT_SUPPORT_FOR_MOBILE"))):F.render(n.createElement(G,null))},4964:function(t,e,r){var n=r(5112)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[n]=!1,"/./"[t](e)}catch(t){}}return!1}},7850:function(t,e,r){var n=r(111),o=r(4326),i=r(5112)("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},3929:function(t,e,r){var n=r(7850),o=TypeError;t.exports=function(t){if(n(t))throw o("The method doesn't accept regular expressions");return t}},6048:function(t,e,r){var n=r(9781),o=r(3353),i=r(3070),a=r(9670),c=r(5656),u=r(1956);e.f=n&&!o?Object.defineProperties:function(t,e){a(t);for(var r,n=c(e),o=u(e),s=o.length,l=0;s>l;)i.f(t,r=o[l++],n[r]);return t}},5296:function(t,e){"use strict";var r={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,o=n&&!r.call({1:2},1);e.f=o?function(t){var e=n(this,t);return!!e&&e.enumerable}:r},4699:function(t,e,r){var n=r(9781),o=r(1702),i=r(1956),a=r(5656),c=o(r(5296).f),u=o([].push),s=function(t){return function(e){for(var r,o=a(e),s=i(o),l=s.length,f=0,p=[];l>f;)r=s[f++],n&&!c(o,r)||u(p,t?[r,o[r]]:o[r]);return p}};t.exports={entries:s(!0),values:s(!1)}},1150:function(t){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}},6699:function(t,e,r){"use strict";var n=r(2109),o=r(1318).includes,i=r(7293),a=r(1223);n({target:"Array",proto:!0,forced:i((function(){return!Array(1).includes()}))},{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),a("includes")},9720:function(t,e,r){var n=r(2109),o=r(4699).entries;n({target:"Object",stat:!0},{entries:function(t){return o(t)}})},2023:function(t,e,r){"use strict";var n=r(2109),o=r(1702),i=r(3929),a=r(4488),c=r(1340),u=r(4964),s=o("".indexOf);n({target:"String",proto:!0,forced:!u("includes")},{includes:function(t){return!!~s(c(a(this)),c(i(t)),arguments.length>1?arguments[1]:void 0)}})},4723:function(t,e,r){"use strict";var n=r(6916),o=r(7007),i=r(9670),a=r(8554),c=r(7466),u=r(1340),s=r(4488),l=r(8173),f=r(1530),p=r(7651);o("match",(function(t,e,r){return[function(e){var r=s(this),o=a(e)?void 0:l(e,t);return o?n(o,e,r):new RegExp(e)[t](u(r))},function(t){var n=i(this),o=u(t),a=r(e,n,o);if(a.done)return a.value;if(!n.global)return p(n,o);var s=n.unicode;n.lastIndex=0;for(var l,h=[],v=0;null!==(l=p(n,o));){var y=u(l[0]);h[v]=y,""===y&&(n.lastIndex=f(o,c(n.lastIndex),s)),v++}return 0===v?null:h}]}))},4765:function(t,e,r){"use strict";var n=r(6916),o=r(7007),i=r(9670),a=r(8554),c=r(4488),u=r(1150),s=r(1340),l=r(8173),f=r(7651);o("search",(function(t,e,r){return[function(e){var r=c(this),o=a(e)?void 0:l(e,t);return o?n(o,e,r):new RegExp(e)[t](s(r))},function(t){var n=i(this),o=s(t),a=r(e,n,o);if(a.done)return a.value;var c=n.lastIndex;u(c,0)||(n.lastIndex=0);var l=f(n,o);return u(n.lastIndex,c)||(n.lastIndex=c),null===l?-1:l.index}]}))},6755:function(t,e,r){"use strict";var n,o=r(2109),i=r(1470),a=r(1236).f,c=r(7466),u=r(1340),s=r(3929),l=r(4488),f=r(4964),p=r(1913),h=i("".startsWith),v=i("".slice),y=Math.min,d=f("startsWith");o({target:"String",proto:!0,forced:!!(p||d||(n=a(String.prototype,"startsWith"),!n||n.writable))&&!d},{startsWith:function(t){var e=u(l(this));s(t);var r=c(y(arguments.length>1?arguments[1]:void 0,e.length)),n=u(t);return h?h(e,n,r):v(e,r,r+n.length)===n}})},7294:function(t,e,r){"use strict";t.exports=r(2408)}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,n),i.exports}n.m=e,t=[],n.O=function(e,r,o,i){if(!r){var a=1/0;for(l=0;l<t.length;l++){for(var[r,o,i]=t[l],c=!0,u=0;u<r.length;u++)(!1&i||a>=i)&&Object.keys(n.O).every((function(t){return n.O[t](r[u])}))?r.splice(u--,1):(c=!1,i<a&&(a=i));if(c){t.splice(l--,1);var s=o();void 0!==s&&(e=s)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[r,o,i]},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={917:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,i,[a,c,u]=r,s=0;if(a.some((function(e){return 0!==t[e]}))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(u)var l=u(n)}for(e&&e(r);s<a.length;s++)i=a[s],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},r=self.webpackChunkaitianyu_cn=self.webpackChunkaitianyu_cn||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var o=n.O(void 0,[675,758,954],(function(){return n(8286)}));o=n.O(o)}();