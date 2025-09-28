"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-stringify@10.0.1";
exports.ids = ["vendor-chunks/rehype-stringify@10.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/rehype-stringify@10.0.1/node_modules/rehype-stringify/lib/index.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/.pnpm/rehype-stringify@10.0.1/node_modules/rehype-stringify/lib/index.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeStringify)\n/* harmony export */ });\n/* harmony import */ var hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-to-html */ \"(ssr)/./node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/index.js\");\n/**\n * @import {Root} from 'hast'\n * @import {Options} from 'hast-util-to-html'\n * @import {Compiler, Processor} from 'unified'\n */\n\n\n\n/**\n * Plugin to add support for serializing as HTML.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration (optional).\n * @returns {undefined}\n *   Nothing.\n */\nfunction rehypeStringify(options) {\n  /** @type {Processor<undefined, undefined, undefined, Root, string>} */\n  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.\n  const self = this\n  const settings = {...self.data('settings'), ...options}\n\n  self.compiler = compiler\n\n  /**\n   * @type {Compiler<Root, string>}\n   */\n  function compiler(tree) {\n    return (0,hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__.toHtml)(tree, settings)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vcmVoeXBlLXN0cmluZ2lmeUAxMC4wLjEvbm9kZV9tb2R1bGVzL3JlaHlwZS1zdHJpbmdpZnkvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxZQUFZLE1BQU07QUFDbEIsWUFBWSxTQUFTO0FBQ3JCLFlBQVkscUJBQXFCO0FBQ2pDOztBQUV3Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNlO0FBQ2YsYUFBYSwwREFBMEQ7QUFDdkU7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFdBQVcseURBQU07QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy8uL25vZGVfbW9kdWxlcy8ucG5wbS9yZWh5cGUtc3RyaW5naWZ5QDEwLjAuMS9ub2RlX21vZHVsZXMvcmVoeXBlLXN0cmluZ2lmeS9saWIvaW5kZXguanM/M2Y4MiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBpbXBvcnQge1Jvb3R9IGZyb20gJ2hhc3QnXG4gKiBAaW1wb3J0IHtPcHRpb25zfSBmcm9tICdoYXN0LXV0aWwtdG8taHRtbCdcbiAqIEBpbXBvcnQge0NvbXBpbGVyLCBQcm9jZXNzb3J9IGZyb20gJ3VuaWZpZWQnXG4gKi9cblxuaW1wb3J0IHt0b0h0bWx9IGZyb20gJ2hhc3QtdXRpbC10by1odG1sJ1xuXG4vKipcbiAqIFBsdWdpbiB0byBhZGQgc3VwcG9ydCBmb3Igc2VyaWFsaXppbmcgYXMgSFRNTC5cbiAqXG4gKiBAcGFyYW0ge09wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkfSBbb3B0aW9uc11cbiAqICAgQ29uZmlndXJhdGlvbiAob3B0aW9uYWwpLlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqICAgTm90aGluZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVoeXBlU3RyaW5naWZ5KG9wdGlvbnMpIHtcbiAgLyoqIEB0eXBlIHtQcm9jZXNzb3I8dW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgUm9vdCwgc3RyaW5nPn0gKi9cbiAgLy8gQHRzLWV4cGVjdC1lcnJvcjogVFMgaW4gSlNEb2MgZ2VuZXJhdGVzIHdyb25nIHR5cGVzIGlmIGB0aGlzYCBpcyB0eXBlZCByZWd1bGFybHkuXG4gIGNvbnN0IHNlbGYgPSB0aGlzXG4gIGNvbnN0IHNldHRpbmdzID0gey4uLnNlbGYuZGF0YSgnc2V0dGluZ3MnKSwgLi4ub3B0aW9uc31cblxuICBzZWxmLmNvbXBpbGVyID0gY29tcGlsZXJcblxuICAvKipcbiAgICogQHR5cGUge0NvbXBpbGVyPFJvb3QsIHN0cmluZz59XG4gICAqL1xuICBmdW5jdGlvbiBjb21waWxlcih0cmVlKSB7XG4gICAgcmV0dXJuIHRvSHRtbCh0cmVlLCBzZXR0aW5ncylcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/rehype-stringify@10.0.1/node_modules/rehype-stringify/lib/index.js\n");

/***/ })

};
;