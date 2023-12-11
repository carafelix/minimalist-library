"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@yaireo/tagify/dist/tagify.js
  var require_tagify = __commonJS({
    "node_modules/@yaireo/tagify/dist/tagify.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Tagify = factory());
      })(exports, function() {
        "use strict";
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly && (symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })), keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread2(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          key = _toPropertyKey(key);
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function _toPrimitive(input, hint) {
          if (typeof input !== "object" || input === null)
            return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== void 0) {
            var res = prim.call(input, hint || "default");
            if (typeof res !== "object")
              return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (hint === "string" ? String : Number)(input);
        }
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, "string");
          return typeof key === "symbol" ? key : String(key);
        }
        var ZERO_WIDTH_CHAR = "\u200B";
        const sameStr = (s1, s2, caseSensitive, trim) => {
          s1 = "" + s1;
          s2 = "" + s2;
          if (trim) {
            s1 = s1.trim();
            s2 = s2.trim();
          }
          return caseSensitive ? s1 == s2 : s1.toLowerCase() == s2.toLowerCase();
        };
        const removeCollectionProp = (collection, unwantedProps) => collection && Array.isArray(collection) && collection.map((v) => omit(v, unwantedProps));
        function omit(obj, props) {
          var newObj = {}, p;
          for (p in obj)
            if (props.indexOf(p) < 0)
              newObj[p] = obj[p];
          return newObj;
        }
        function decode(s) {
          var el = document.createElement("div");
          return s.replace(/\&#?[0-9a-z]+;/gi, function(enc) {
            el.innerHTML = enc;
            return el.innerText;
          });
        }
        function parseHTML(s) {
          var parser = new DOMParser(), node = parser.parseFromString(s.trim(), "text/html");
          return node.body.firstElementChild;
        }
        function minify(s) {
          return s ? s.replace(/\>[\r\n ]+\</g, "><").split(/>\s+</).join("><").trim() : "";
        }
        function removeTextChildNodes(elm) {
          var iter = document.createNodeIterator(elm, NodeFilter.SHOW_TEXT, null, false), textnode;
          while (textnode = iter.nextNode()) {
            if (!textnode.textContent.trim())
              textnode.parentNode.removeChild(textnode);
          }
        }
        function getfirstTextNode(elm, action) {
          action = action || "previous";
          while (elm = elm[action + "Sibling"])
            if (elm.nodeType == 3)
              return elm;
        }
        function escapeHTML(s) {
          return typeof s == "string" ? s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/`|'/g, "&#039;") : s;
        }
        function isObject(obj) {
          var type = Object.prototype.toString.call(obj).split(" ")[1].slice(0, -1);
          return obj === Object(obj) && type != "Array" && type != "Function" && type != "RegExp" && type != "HTMLUnknownElement";
        }
        function extend(o, o1, o2) {
          if (!(o instanceof Object))
            o = {};
          copy(o, o1);
          if (o2)
            copy(o, o2);
          function copy(a, b) {
            for (var key in b)
              if (b.hasOwnProperty(key)) {
                if (isObject(b[key])) {
                  if (!isObject(a[key]))
                    a[key] = Object.assign({}, b[key]);
                  else
                    copy(a[key], b[key]);
                  continue;
                }
                if (Array.isArray(b[key])) {
                  a[key] = Object.assign([], b[key]);
                  continue;
                }
                a[key] = b[key];
              }
          }
          return o;
        }
        function concatWithoutDups() {
          const newArr = [], existingObj = {};
          for (let arr of arguments) {
            for (let item of arr) {
              if (isObject(item)) {
                if (!existingObj[item.value]) {
                  newArr.push(item);
                  existingObj[item.value] = 1;
                }
              } else if (!newArr.includes(item))
                newArr.push(item);
            }
          }
          return newArr;
        }
        function unaccent(s) {
          if (!String.prototype.normalize)
            return s;
          if (typeof s === "string")
            return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        function getNodeHeight(node) {
          var height, clone = node.cloneNode(true);
          clone.style.cssText = "position:fixed; top:-9999px; opacity:0";
          document.body.appendChild(clone);
          height = clone.clientHeight;
          clone.parentNode.removeChild(clone);
          return height;
        }
        var isChromeAndroidBrowser = () => /(?=.*chrome)(?=.*android)/i.test(navigator.userAgent);
        function getUID() {
          return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
        }
        function isNodeTag(node) {
          return node && node.classList && node.classList.contains(this.settings.classNames.tag);
        }
        function getCaretGlobalPosition() {
          const sel = document.getSelection();
          if (sel.rangeCount) {
            const r = sel.getRangeAt(0);
            const node = r.startContainer;
            const offset = r.startOffset;
            let rect, r2;
            if (offset > 0) {
              r2 = document.createRange();
              r2.setStart(node, offset - 1);
              r2.setEnd(node, offset);
              rect = r2.getBoundingClientRect();
              return {
                left: rect.right,
                top: rect.top,
                bottom: rect.bottom
              };
            }
            if (node.getBoundingClientRect)
              return node.getBoundingClientRect();
          }
          return {
            left: -9999,
            top: -9999
          };
        }
        function injectAtCaret(content, range) {
          var selection = window.getSelection();
          range = range || selection.getRangeAt(0);
          if (typeof content == "string")
            content = document.createTextNode(content);
          if (range) {
            range.deleteContents();
            range.insertNode(content);
          }
          return content;
        }
        function getSetTagData(tagElm, data, override) {
          if (!tagElm) {
            console.warn("tag element doesn't exist", tagElm, data);
            return data;
          }
          if (data)
            tagElm.__tagifyTagData = override ? data : extend({}, tagElm.__tagifyTagData || {}, data);
          return tagElm.__tagifyTagData;
        }
        function placeCaretAfterNode(node) {
          if (!node || !node.parentNode)
            return;
          var nextSibling = node, sel = window.getSelection(), range = sel.getRangeAt(0);
          if (sel.rangeCount) {
            range.setStartAfter(nextSibling);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
        function fixCaretBetweenTags(tags, TagifyHasFocuse) {
          tags.forEach((tag) => {
            if (getSetTagData(tag.previousSibling) || !tag.previousSibling) {
              var textNode = document.createTextNode(ZERO_WIDTH_CHAR);
              tag.before(textNode);
              TagifyHasFocuse && placeCaretAfterNode(textNode);
            }
          });
        }
        var DEFAULTS = {
          delimiters: ",",
          // [RegEx] split tags by any of these delimiters ("null" to cancel) Example: ",| |."
          pattern: null,
          // RegEx pattern to validate input by. Ex: /[1-9]/
          tagTextProp: "value",
          // tag data Object property which will be displayed as the tag's text
          maxTags: Infinity,
          // Maximum number of tags
          callbacks: {},
          // Exposed callbacks object to be triggered on certain events
          addTagOnBlur: true,
          // automatically adds the text which was inputed as a tag when blur event happens
          onChangeAfterBlur: true,
          // By default, the native way of inputs' onChange events is kept, and it only fires when the field is blured.
          duplicates: false,
          // "true" - allow duplicate tags
          whitelist: [],
          // Array of tags to suggest as the user types (can be used along with "enforceWhitelist" setting)
          blacklist: [],
          // A list of non-allowed tags
          enforceWhitelist: false,
          // Only allow tags from the whitelist
          userInput: true,
          // disable manually typing/pasting/editing tags (tags may only be added from the whitelist)
          keepInvalidTags: false,
          // if true, do not remove tags which did not pass validation
          createInvalidTags: true,
          // if false, do not create invalid tags from invalid user input
          mixTagsAllowedAfter: /,|\.|\:|\s/,
          // RegEx - Define conditions in which mix-tags content allows a tag to be added after
          mixTagsInterpolator: ["[[", "]]"],
          // Interpolation for mix mode. Everything between these will become a tag, if is a valid Object
          backspace: true,
          // false / true / "edit"
          skipInvalid: false,
          // If `true`, do not add invalid, temporary, tags before automatically removing them
          pasteAsTags: true,
          // automatically converts pasted text into tags. if "false", allows for further text editing
          editTags: {
            clicks: 2,
            // clicks to enter "edit-mode": 1 for single click. any other value is considered as double-click
            keepInvalid: true
            // keeps invalid edits as-is until `esc` is pressed while in focus
          },
          // 1 or 2 clicks to edit a tag. false/null for not allowing editing
          transformTag: () => {
          },
          // Takes a tag input string as argument and returns a transformed value
          trim: true,
          // whether or not the value provided should be trimmed, before being added as a tag
          a11y: {
            focusableTags: false
          },
          mixMode: {
            insertAfterTag: "\xA0"
            // String/Node to inject after a tag has been added (see #588)
          },
          autoComplete: {
            enabled: true,
            // Tries to suggest the input's value while typing (match from whitelist) by adding the rest of term as grayed-out text
            rightKey: false
            // If `true`, when Right key is pressed, use the suggested value to create a tag, else just auto-completes the input. in mixed-mode this is set to "true"
          },
          classNames: {
            namespace: "tagify",
            mixMode: "tagify--mix",
            selectMode: "tagify--select",
            input: "tagify__input",
            focus: "tagify--focus",
            tagNoAnimation: "tagify--noAnim",
            tagInvalid: "tagify--invalid",
            tagNotAllowed: "tagify--notAllowed",
            scopeLoading: "tagify--loading",
            hasMaxTags: "tagify--hasMaxTags",
            hasNoTags: "tagify--noTags",
            empty: "tagify--empty",
            inputInvalid: "tagify__input--invalid",
            dropdown: "tagify__dropdown",
            dropdownWrapper: "tagify__dropdown__wrapper",
            dropdownHeader: "tagify__dropdown__header",
            dropdownFooter: "tagify__dropdown__footer",
            dropdownItem: "tagify__dropdown__item",
            dropdownItemActive: "tagify__dropdown__item--active",
            dropdownItemHidden: "tagify__dropdown__item--hidden",
            dropdownInital: "tagify__dropdown--initial",
            tag: "tagify__tag",
            tagText: "tagify__tag-text",
            tagX: "tagify__tag__removeBtn",
            tagLoading: "tagify__tag--loading",
            tagEditing: "tagify__tag--editable",
            tagFlash: "tagify__tag--flash",
            tagHide: "tagify__tag--hide"
          },
          dropdown: {
            classname: "",
            enabled: 2,
            // minimum input characters to be typed for the suggestions dropdown to show
            maxItems: 10,
            searchKeys: ["value", "searchBy"],
            fuzzySearch: true,
            caseSensitive: false,
            accentedSearch: true,
            includeSelectedTags: false,
            // Should the suggestions list Include already-selected tags (after filtering)
            highlightFirst: false,
            // highlights first-matched item in the list
            closeOnSelect: true,
            // closes the dropdown after selecting an item, if `enabled:0` (which means always show dropdown)
            clearOnSelect: true,
            // after selecting a suggetion, should the typed text input remain or be cleared
            position: "all",
            // 'manual' / 'text' / 'all'
            appendTarget: null
            // defaults to document.body once DOM has been loaded
          },
          hooks: {
            beforeRemoveTag: () => Promise.resolve(),
            beforePaste: () => Promise.resolve(),
            suggestionClick: () => Promise.resolve()
          }
        };
        function initDropdown() {
          this.dropdown = {};
          for (let p in this._dropdown)
            this.dropdown[p] = typeof this._dropdown[p] === "function" ? this._dropdown[p].bind(this) : this._dropdown[p];
          this.dropdown.refs();
        }
        var _dropdown = {
          refs() {
            this.DOM.dropdown = this.parseTemplate("dropdown", [this.settings]);
            this.DOM.dropdown.content = this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-wrapper']");
          },
          getHeaderRef() {
            return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-header']");
          },
          getFooterRef() {
            return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-footer']");
          },
          getAllSuggestionsRefs() {
            return [...this.DOM.dropdown.content.querySelectorAll(this.settings.classNames.dropdownItemSelector)];
          },
          /**
           * shows the suggestions select box
           * @param {String} value [optional, filter the whitelist by this value]
           */
          show(value) {
            var _s = this.settings, firstListItem, firstListItemValue, allowNewTags = _s.mode == "mix" && !_s.enforceWhitelist, noWhitelist = !_s.whitelist || !_s.whitelist.length, noMatchListItem, isManual = _s.dropdown.position == "manual";
            value = value === void 0 ? this.state.inputText : value;
            if (noWhitelist && !allowNewTags && !_s.templates.dropdownItemNoMatch || _s.dropdown.enable === false || this.state.isLoading || this.settings.readonly)
              return;
            clearTimeout(this.dropdownHide__bindEventsTimeout);
            this.suggestedListItems = this.dropdown.filterListItems(value);
            if (value && !this.suggestedListItems.length) {
              this.trigger("dropdown:noMatch", value);
              if (_s.templates.dropdownItemNoMatch)
                noMatchListItem = _s.templates.dropdownItemNoMatch.call(this, {
                  value
                });
            }
            if (!noMatchListItem) {
              if (this.suggestedListItems.length) {
                if (value && allowNewTags && !this.state.editing.scope && !sameStr(this.suggestedListItems[0].value, value))
                  this.suggestedListItems.unshift({
                    value
                  });
              } else {
                if (value && allowNewTags && !this.state.editing.scope) {
                  this.suggestedListItems = [{
                    value
                  }];
                } else {
                  this.input.autocomplete.suggest.call(this);
                  this.dropdown.hide();
                  return;
                }
              }
              firstListItem = this.suggestedListItems[0];
              firstListItemValue = "" + (isObject(firstListItem) ? firstListItem.value : firstListItem);
              if (_s.autoComplete && firstListItemValue) {
                if (firstListItemValue.indexOf(value) == 0)
                  this.input.autocomplete.suggest.call(this, firstListItem);
              }
            }
            this.dropdown.fill(noMatchListItem);
            if (_s.dropdown.highlightFirst) {
              this.dropdown.highlightOption(this.DOM.dropdown.content.querySelector(_s.classNames.dropdownItemSelector));
            }
            if (!this.state.dropdown.visible)
              setTimeout(this.dropdown.events.binding.bind(this));
            this.state.dropdown.visible = value || true;
            this.state.dropdown.query = value;
            this.setStateSelection();
            if (!isManual) {
              setTimeout(() => {
                this.dropdown.position();
                this.dropdown.render();
              });
            }
            setTimeout(() => {
              this.trigger("dropdown:show", this.DOM.dropdown);
            });
          },
          /**
           * Hides the dropdown (if it's not managed manually by the developer)
           * @param {Boolean} overrideManual
           */
          hide(overrideManual) {
            var _this$DOM = this.DOM, scope = _this$DOM.scope, dropdown = _this$DOM.dropdown, isManual = this.settings.dropdown.position == "manual" && !overrideManual;
            if (!dropdown || !document.body.contains(dropdown) || isManual)
              return;
            window.removeEventListener("resize", this.dropdown.position);
            this.dropdown.events.binding.call(this, false);
            scope.setAttribute("aria-expanded", false);
            dropdown.parentNode.removeChild(dropdown);
            setTimeout(() => {
              this.state.dropdown.visible = false;
            }, 100);
            this.state.dropdown.query = this.state.ddItemData = this.state.ddItemElm = this.state.selection = null;
            if (this.state.tag && this.state.tag.value.length) {
              this.state.flaggedTags[this.state.tag.baseOffset] = this.state.tag;
            }
            this.trigger("dropdown:hide", dropdown);
            return this;
          },
          /**
           * Toggles dropdown show/hide
           * @param {Boolean} show forces the dropdown to show
           */
          toggle(show) {
            this.dropdown[this.state.dropdown.visible && !show ? "hide" : "show"]();
          },
          render() {
            var ddHeight = getNodeHeight(this.DOM.dropdown), _s = this.settings, enabled = typeof _s.dropdown.enabled == "number" && _s.dropdown.enabled >= 0;
            if (!enabled)
              return this;
            this.DOM.scope.setAttribute("aria-expanded", true);
            if (!document.body.contains(this.DOM.dropdown)) {
              this.DOM.dropdown.classList.add(_s.classNames.dropdownInital);
              this.dropdown.position(ddHeight);
              _s.dropdown.appendTarget.appendChild(this.DOM.dropdown);
              setTimeout(() => this.DOM.dropdown.classList.remove(_s.classNames.dropdownInital));
            }
            return this;
          },
          /**
           * re-renders the dropdown content element (see "dropdownContent" in templates file)
           * @param {String/Array} HTMLContent - optional
           */
          fill(HTMLContent) {
            HTMLContent = typeof HTMLContent == "string" ? HTMLContent : this.dropdown.createListHTML(HTMLContent || this.suggestedListItems);
            var dropdownContent = this.settings.templates.dropdownContent.call(this, HTMLContent);
            this.DOM.dropdown.content.innerHTML = minify(dropdownContent);
          },
          /**
           * Re-renders only the header & footer.
           * Used when selecting a suggestion and it is wanted that the suggestions dropdown stays open.
           * Since the list of sugegstions is not being re-rendered completely every time a suggestion is selected (the item is transitioned-out)
           * then the header & footer should be kept in sync with the suggestions data change
           */
          fillHeaderFooter() {
            var suggestions = this.dropdown.filterListItems(this.state.dropdown.query), newHeaderElem = this.parseTemplate("dropdownHeader", [suggestions]), newFooterElem = this.parseTemplate("dropdownFooter", [suggestions]), headerRef = this.dropdown.getHeaderRef(), footerRef = this.dropdown.getFooterRef();
            newHeaderElem && headerRef?.parentNode.replaceChild(newHeaderElem, headerRef);
            newFooterElem && footerRef?.parentNode.replaceChild(newFooterElem, footerRef);
          },
          /**
           * fill data into the suggestions list
           * (mainly used to update the list when removing tags while the suggestions dropdown is visible, so they will be re-added to the list. not efficient)
           */
          refilter(value) {
            value = value || this.state.dropdown.query || "";
            this.suggestedListItems = this.dropdown.filterListItems(value);
            this.dropdown.fill();
            if (!this.suggestedListItems.length)
              this.dropdown.hide();
            this.trigger("dropdown:updated", this.DOM.dropdown);
          },
          position(ddHeight) {
            var _sd = this.settings.dropdown;
            if (_sd.position == "manual")
              return;
            var rect, top, bottom, left, width, parentsPositions, ddElm = this.DOM.dropdown, placeAbove = _sd.placeAbove, isDefaultAppendTarget = _sd.appendTarget === document.body, appendTargetScrollTop = isDefaultAppendTarget ? window.pageYOffset : _sd.appendTarget.scrollTop, root = document.fullscreenElement || document.webkitFullscreenElement || document.documentElement, viewportHeight = root.clientHeight, viewportWidth = Math.max(root.clientWidth || 0, window.innerWidth || 0), positionTo = viewportWidth > 480 ? _sd.position : "all", ddTarget = this.DOM[positionTo == "input" ? "input" : "scope"];
            ddHeight = ddHeight || ddElm.clientHeight;
            function getParentsPositions(p) {
              var left2 = 0, top2 = 0;
              while (p && p != root) {
                left2 += p.offsetLeft || 0;
                top2 += p.offsetTop || 0;
                p = p.parentNode;
              }
              return {
                left: left2,
                top: top2
              };
            }
            function getAccumulatedAncestorsScrollTop() {
              var scrollTop = 0, p = _sd.appendTarget.parentNode;
              while (p) {
                scrollTop += p.scrollTop || 0;
                p = p.parentNode;
              }
              return scrollTop;
            }
            if (!this.state.dropdown.visible)
              return;
            if (positionTo == "text") {
              rect = getCaretGlobalPosition();
              bottom = rect.bottom;
              top = rect.top;
              left = rect.left;
              width = "auto";
            } else {
              parentsPositions = getParentsPositions(_sd.appendTarget);
              rect = ddTarget.getBoundingClientRect();
              top = rect.top - parentsPositions.top;
              bottom = rect.bottom - 1 - parentsPositions.top;
              left = rect.left - parentsPositions.left;
              width = rect.width + "px";
            }
            if (!isDefaultAppendTarget) {
              let accumulatedAncestorsScrollTop = getAccumulatedAncestorsScrollTop();
              top += accumulatedAncestorsScrollTop;
              bottom += accumulatedAncestorsScrollTop;
            }
            top = Math.floor(top);
            bottom = Math.ceil(bottom);
            placeAbove = placeAbove === void 0 ? viewportHeight - rect.bottom < ddHeight : placeAbove;
            ddElm.style.cssText = "left:" + (left + window.pageXOffset) + "px; width:" + width + ";" + (placeAbove ? "top: " + (top + appendTargetScrollTop) + "px" : "top: " + (bottom + appendTargetScrollTop) + "px");
            ddElm.setAttribute("placement", placeAbove ? "top" : "bottom");
            ddElm.setAttribute("position", positionTo);
          },
          events: {
            /**
             * Events should only be binded when the dropdown is rendered and removed when isn't
             * because there might be multiple Tagify instances on a certain page
             * @param  {Boolean} bindUnbind [optional. true when wanting to unbind all the events]
             */
            binding() {
              let bindUnbind = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
              var _CB = this.dropdown.events.callbacks, _CBR = this.listeners.dropdown = this.listeners.dropdown || {
                position: this.dropdown.position.bind(this, null),
                onKeyDown: _CB.onKeyDown.bind(this),
                onMouseOver: _CB.onMouseOver.bind(this),
                onMouseLeave: _CB.onMouseLeave.bind(this),
                onClick: _CB.onClick.bind(this),
                onScroll: _CB.onScroll.bind(this)
              }, action = bindUnbind ? "addEventListener" : "removeEventListener";
              if (this.settings.dropdown.position != "manual") {
                document[action]("scroll", _CBR.position, true);
                window[action]("resize", _CBR.position);
                window[action]("keydown", _CBR.onKeyDown);
              }
              this.DOM.dropdown[action]("mouseover", _CBR.onMouseOver);
              this.DOM.dropdown[action]("mouseleave", _CBR.onMouseLeave);
              this.DOM.dropdown[action]("mousedown", _CBR.onClick);
              this.DOM.dropdown.content[action]("scroll", _CBR.onScroll);
            },
            callbacks: {
              onKeyDown(e) {
                if (!this.state.hasFocus || this.state.composing)
                  return;
                var selectedElm = this.DOM.dropdown.querySelector(this.settings.classNames.dropdownItemActiveSelector), selectedElmData = this.dropdown.getSuggestionDataByNode(selectedElm);
                switch (e.key) {
                  case "ArrowDown":
                  case "ArrowUp":
                  case "Down":
                  case "Up": {
                    e.preventDefault();
                    var dropdownItems = this.dropdown.getAllSuggestionsRefs(), actionUp = e.key == "ArrowUp" || e.key == "Up";
                    if (selectedElm) {
                      selectedElm = this.dropdown.getNextOrPrevOption(selectedElm, !actionUp);
                    }
                    if (!selectedElm || !selectedElm.matches(this.settings.classNames.dropdownItemSelector)) {
                      selectedElm = dropdownItems[actionUp ? dropdownItems.length - 1 : 0];
                    }
                    this.dropdown.highlightOption(selectedElm, true);
                    break;
                  }
                  case "Escape":
                  case "Esc":
                    this.dropdown.hide();
                    break;
                  case "ArrowRight":
                    if (this.state.actions.ArrowLeft)
                      return;
                  case "Tab": {
                    if (this.settings.mode != "mix" && selectedElm && !this.settings.autoComplete.rightKey && !this.state.editing) {
                      e.preventDefault();
                      var value = this.dropdown.getMappedValue(selectedElmData);
                      this.input.autocomplete.set.call(this, value);
                      return false;
                    }
                    return true;
                  }
                  case "Enter": {
                    e.preventDefault();
                    this.settings.hooks.suggestionClick(e, {
                      tagify: this,
                      tagData: selectedElmData,
                      suggestionElm: selectedElm
                    }).then(() => {
                      if (selectedElm) {
                        this.dropdown.selectOption(selectedElm);
                        selectedElm = this.dropdown.getNextOrPrevOption(selectedElm, !actionUp);
                        this.dropdown.highlightOption(selectedElm);
                        return;
                      } else
                        this.dropdown.hide();
                      if (this.settings.mode != "mix")
                        this.addTags(this.state.inputText.trim(), true);
                    }).catch((err) => err);
                    break;
                  }
                  case "Backspace": {
                    if (this.settings.mode == "mix" || this.state.editing.scope)
                      return;
                    const value2 = this.input.raw.call(this);
                    if (value2 == "" || value2.charCodeAt(0) == 8203) {
                      if (this.settings.backspace === true)
                        this.removeTags();
                      else if (this.settings.backspace == "edit")
                        setTimeout(this.editTag.bind(this), 0);
                    }
                  }
                }
              },
              onMouseOver(e) {
                var ddItem = e.target.closest(this.settings.classNames.dropdownItemSelector);
                ddItem && this.dropdown.highlightOption(ddItem);
              },
              onMouseLeave(e) {
                this.dropdown.highlightOption();
              },
              onClick(e) {
                if (e.button != 0 || e.target == this.DOM.dropdown || e.target == this.DOM.dropdown.content)
                  return;
                var selectedElm = e.target.closest(this.settings.classNames.dropdownItemSelector), selectedElmData = this.dropdown.getSuggestionDataByNode(selectedElm);
                this.state.actions.selectOption = true;
                setTimeout(() => this.state.actions.selectOption = false, 50);
                this.settings.hooks.suggestionClick(e, {
                  tagify: this,
                  tagData: selectedElmData,
                  suggestionElm: selectedElm
                }).then(() => {
                  if (selectedElm)
                    this.dropdown.selectOption(selectedElm, e);
                  else
                    this.dropdown.hide();
                }).catch((err) => console.warn(err));
              },
              onScroll(e) {
                var elm = e.target, pos = elm.scrollTop / (elm.scrollHeight - elm.parentNode.clientHeight) * 100;
                this.trigger("dropdown:scroll", {
                  percentage: Math.round(pos)
                });
              }
            }
          },
          /**
           * Given a suggestion-item, return the data associated with it
           * @param {HTMLElement} tagElm
           * @returns Object
           */
          getSuggestionDataByNode(tagElm) {
            var value = tagElm && tagElm.getAttribute("value");
            return this.suggestedListItems.find((item) => item.value == value) || null;
          },
          getNextOrPrevOption(selected) {
            let next = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            var dropdownItems = this.dropdown.getAllSuggestionsRefs(), selectedIdx = dropdownItems.findIndex((item) => item === selected);
            return next ? dropdownItems[selectedIdx + 1] : dropdownItems[selectedIdx - 1];
          },
          /**
           * mark the currently active suggestion option
           * @param {Object}  elm            option DOM node
           * @param {Boolean} adjustScroll   when navigation with keyboard arrows (up/down), aut-scroll to always show the highlighted element
           */
          highlightOption(elm, adjustScroll) {
            var className = this.settings.classNames.dropdownItemActive, itemData;
            if (this.state.ddItemElm) {
              this.state.ddItemElm.classList.remove(className);
              this.state.ddItemElm.removeAttribute("aria-selected");
            }
            if (!elm) {
              this.state.ddItemData = null;
              this.state.ddItemElm = null;
              this.input.autocomplete.suggest.call(this);
              return;
            }
            itemData = this.dropdown.getSuggestionDataByNode(elm);
            this.state.ddItemData = itemData;
            this.state.ddItemElm = elm;
            elm.classList.add(className);
            elm.setAttribute("aria-selected", true);
            if (adjustScroll)
              elm.parentNode.scrollTop = elm.clientHeight + elm.offsetTop - elm.parentNode.clientHeight;
            if (this.settings.autoComplete) {
              this.input.autocomplete.suggest.call(this, itemData);
              this.dropdown.position();
            }
          },
          /**
           * Create a tag from the currently active suggestion option
           * @param {Object} elm  DOM node to select
           * @param {Object} event The original Click event, if available (since keyboard ENTER key also triggers this method)
           */
          selectOption(elm, event) {
            var _this$settings$dropdo = this.settings.dropdown, clearOnSelect = _this$settings$dropdo.clearOnSelect, closeOnSelect = _this$settings$dropdo.closeOnSelect;
            if (!elm) {
              this.addTags(this.state.inputText, true);
              closeOnSelect && this.dropdown.hide();
              return;
            }
            event = event || {};
            var value = elm.getAttribute("value"), isNoMatch = value == "noMatch", tagData = this.suggestedListItems.find((item) => (item.value ?? item) == value);
            this.trigger("dropdown:select", {
              data: tagData,
              elm,
              event
            });
            if (!value || !tagData && !isNoMatch) {
              closeOnSelect && setTimeout(this.dropdown.hide.bind(this));
              return;
            }
            if (this.state.editing) {
              this.onEditTagDone(null, extend({
                __isValid: true
              }, this.normalizeTags([tagData])[0]));
            } else {
              this[this.settings.mode == "mix" ? "addMixTags" : "addTags"]([tagData || this.input.raw.call(this)], clearOnSelect);
            }
            if (!this.DOM.input.parentNode)
              return;
            setTimeout(() => {
              this.DOM.input.focus();
              this.toggleFocusClass(true);
            });
            closeOnSelect && setTimeout(this.dropdown.hide.bind(this));
            elm.addEventListener("transitionend", () => {
              this.dropdown.fillHeaderFooter();
              setTimeout(() => elm.remove(), 100);
            }, {
              once: true
            });
            elm.classList.add(this.settings.classNames.dropdownItemHidden);
          },
          // adds all the suggested items, including the ones which are not currently rendered,
          // unless specified otherwise (by the "onlyRendered" argument)
          selectAll(onlyRendered) {
            this.suggestedListItems.length = 0;
            this.dropdown.hide();
            this.dropdown.filterListItems("");
            var tagsToAdd = this.dropdown.filterListItems("");
            if (!onlyRendered)
              tagsToAdd = this.state.dropdown.suggestions;
            this.addTags(tagsToAdd, true);
            return this;
          },
          /**
           * returns an HTML string of the suggestions' list items
           * @param {String} value string to filter the whitelist by
           * @param {Object} options "exact" - for exact complete match
           * @return {Array} list of filtered whitelist items according to the settings provided and current value
           */
          filterListItems(value, options) {
            var _s = this.settings, _sd = _s.dropdown, options = options || {}, list = [], exactMatchesList = [], whitelist = _s.whitelist, suggestionsCount = _sd.maxItems >= 0 ? _sd.maxItems : Infinity, searchKeys = _sd.searchKeys, whitelistItem, valueIsInWhitelist, searchBy, isDuplicate, niddle, i = 0;
            value = _s.mode == "select" && this.value.length && this.value[0][_s.tagTextProp] == value ? "" : value;
            if (!value || !searchKeys.length) {
              list = _sd.includeSelectedTags ? whitelist : whitelist.filter((item) => !this.isTagDuplicate(isObject(item) ? item.value : item));
              this.state.dropdown.suggestions = list;
              return list.slice(0, suggestionsCount);
            }
            niddle = _sd.caseSensitive ? "" + value : ("" + value).toLowerCase();
            function stringHasAll(s, query) {
              return query.toLowerCase().split(" ").every((q) => s.includes(q.toLowerCase()));
            }
            for (; i < whitelist.length; i++) {
              let startsWithMatch, exactMatch;
              whitelistItem = whitelist[i] instanceof Object ? whitelist[i] : {
                value: whitelist[i]
              };
              let itemWithoutSearchKeys = !Object.keys(whitelistItem).some((k) => searchKeys.includes(k)), _searchKeys = itemWithoutSearchKeys ? ["value"] : searchKeys;
              if (_sd.fuzzySearch && !options.exact) {
                searchBy = _searchKeys.reduce((values, k) => values + " " + (whitelistItem[k] || ""), "").toLowerCase().trim();
                if (_sd.accentedSearch) {
                  searchBy = unaccent(searchBy);
                  niddle = unaccent(niddle);
                }
                startsWithMatch = searchBy.indexOf(niddle) == 0;
                exactMatch = searchBy === niddle;
                valueIsInWhitelist = stringHasAll(searchBy, niddle);
              } else {
                startsWithMatch = true;
                valueIsInWhitelist = _searchKeys.some((k) => {
                  var v = "" + (whitelistItem[k] || "");
                  if (_sd.accentedSearch) {
                    v = unaccent(v);
                    niddle = unaccent(niddle);
                  }
                  if (!_sd.caseSensitive)
                    v = v.toLowerCase();
                  exactMatch = v === niddle;
                  return options.exact ? v === niddle : v.indexOf(niddle) == 0;
                });
              }
              isDuplicate = !_sd.includeSelectedTags && this.isTagDuplicate(isObject(whitelistItem) ? whitelistItem.value : whitelistItem);
              if (valueIsInWhitelist && !isDuplicate)
                if (exactMatch && startsWithMatch)
                  exactMatchesList.push(whitelistItem);
                else if (_sd.sortby == "startsWith" && startsWithMatch)
                  list.unshift(whitelistItem);
                else
                  list.push(whitelistItem);
            }
            this.state.dropdown.suggestions = exactMatchesList.concat(list);
            return typeof _sd.sortby == "function" ? _sd.sortby(exactMatchesList.concat(list), niddle) : exactMatchesList.concat(list).slice(0, suggestionsCount);
          },
          /**
           * Returns the final value of a tag data (object) with regards to the "mapValueTo" dropdown setting
           * @param {Object} tagData
           * @returns
           */
          getMappedValue(tagData) {
            var mapValueTo = this.settings.dropdown.mapValueTo, value = mapValueTo ? typeof mapValueTo == "function" ? mapValueTo(tagData) : tagData[mapValueTo] || tagData.value : tagData.value;
            return value;
          },
          /**
           * Creates the dropdown items' HTML
           * @param  {Array} sugegstionsList  [Array of Objects]
           * @return {String}
           */
          createListHTML(sugegstionsList) {
            return extend([], sugegstionsList).map((suggestion, idx) => {
              if (typeof suggestion == "string" || typeof suggestion == "number")
                suggestion = {
                  value: suggestion
                };
              var mappedValue = this.dropdown.getMappedValue(suggestion);
              mappedValue = typeof mappedValue == "string" ? escapeHTML(mappedValue) : mappedValue;
              return this.settings.templates.dropdownItem.apply(this, [_objectSpread2(_objectSpread2({}, suggestion), {}, {
                mappedValue
              }), this]);
            }).join("");
          }
        };
        const VERSION = 1;
        const STORE_KEY = "@yaireo/tagify/";
        const getPersistedData = (id) => (key) => {
          let customKey = "/" + key, persistedData, versionMatch = localStorage.getItem(STORE_KEY + id + "/v", VERSION) == VERSION;
          if (versionMatch) {
            try {
              persistedData = JSON.parse(localStorage[STORE_KEY + id + customKey]);
            } catch (err) {
            }
          }
          return persistedData;
        };
        const setPersistedData = (id) => {
          if (!id)
            return () => {
            };
          localStorage.setItem(STORE_KEY + id + "/v", VERSION);
          return (data, key) => {
            let customKey = "/" + key, persistedData = JSON.stringify(data);
            if (data && key) {
              localStorage.setItem(STORE_KEY + id + customKey, persistedData);
              dispatchEvent(new Event("storage"));
            }
          };
        };
        const clearPersistedData = (id) => (key) => {
          const base = STORE_KEY + "/" + id + "/";
          if (key)
            localStorage.removeItem(base + key);
          else {
            for (let k in localStorage)
              if (k.includes(base))
                localStorage.removeItem(k);
          }
        };
        var TEXTS = {
          empty: "empty",
          exceed: "number of tags exceeded",
          pattern: "pattern mismatch",
          duplicate: "already exists",
          notAllowed: "not allowed"
        };
        var templates = {
          /**
           *
           * @param {DOM Object} input     Original input DOm element
           * @param {Object}     settings  Tagify instance settings Object
           */
          wrapper(input, _s) {
            return `<tags class="${_s.classNames.namespace} ${_s.mode ? `${_s.classNames[_s.mode + "Mode"]}` : ""} ${input.className}"
                    ${_s.readonly ? "readonly" : ""}
                    ${_s.disabled ? "disabled" : ""}
                    ${_s.required ? "required" : ""}
                    ${_s.mode === "select" ? "spellcheck='false'" : ""}
                    tabIndex="-1">
            <span ${!_s.readonly && _s.userInput ? "contenteditable" : ""} tabIndex="0" data-placeholder="${_s.placeholder || "&#8203;"}" aria-placeholder="${_s.placeholder || ""}"
                class="${_s.classNames.input}"
                role="textbox"
                aria-autocomplete="both"
                aria-multiline="${_s.mode == "mix" ? true : false}"></span>
                &#8203;
        </tags>`;
          },
          tag(tagData, _ref) {
            let _s = _ref.settings;
            return `<tag title="${tagData.title || tagData.value}"
                    contenteditable='false'
                    spellcheck='false'
                    tabIndex="${_s.a11y.focusableTags ? 0 : -1}"
                    class="${_s.classNames.tag} ${tagData.class || ""}"
                    ${this.getAttributes(tagData)}>
            <x title='' class="${_s.classNames.tagX}" role='button' aria-label='remove tag'></x>
            <div>
                <span class="${_s.classNames.tagText}">${tagData[_s.tagTextProp] || tagData.value}</span>
            </div>
        </tag>`;
          },
          dropdown(settings) {
            var _sd = settings.dropdown, isManual = _sd.position == "manual", className = `${settings.classNames.dropdown}`;
            return `<div class="${isManual ? "" : className} ${_sd.classname}" role="listbox" aria-labelledby="dropdown">
                    <div data-selector='tagify-suggestions-wrapper' class="${settings.classNames.dropdownWrapper}"></div>
                </div>`;
          },
          dropdownContent(HTMLContent) {
            var _s = this.settings, suggestions = this.state.dropdown.suggestions;
            return `
            ${_s.templates.dropdownHeader.call(this, suggestions)}
            ${HTMLContent}
            ${_s.templates.dropdownFooter.call(this, suggestions)}
        `;
          },
          dropdownItem(item) {
            return `<div ${this.getAttributes(item)}
                    class='${this.settings.classNames.dropdownItem} ${item.class ? item.class : ""}'
                    tabindex="0"
                    role="option">${item.mappedValue || item.value}</div>`;
          },
          /**
           * @param {Array} suggestions An array of all the matched suggested items, including those which were sliced away due to the "dropdown.maxItems" setting
           */
          dropdownHeader(suggestions) {
            return `<header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownHeader}"></header>`;
          },
          dropdownFooter(suggestions) {
            var hasMore = suggestions.length - this.settings.dropdown.maxItems;
            return hasMore > 0 ? `<footer data-selector='tagify-suggestions-footer' class="${this.settings.classNames.dropdownFooter}">
                ${hasMore} more items. Refine your search.
            </footer>` : "";
          },
          dropdownItemNoMatch: null
        };
        function EventDispatcher(instance) {
          var target = document.createTextNode("");
          function addRemove(op, events2, cb) {
            if (cb)
              events2.split(/\s+/g).forEach((name) => target[op + "EventListener"].call(target, name, cb));
          }
          return {
            off(events2, cb) {
              addRemove("remove", events2, cb);
              return this;
            },
            on(events2, cb) {
              if (cb && typeof cb == "function")
                addRemove("add", events2, cb);
              return this;
            },
            trigger(eventName, data, opts) {
              var e;
              opts = opts || {
                cloneData: true
              };
              if (!eventName)
                return;
              if (instance.settings.isJQueryPlugin) {
                if (eventName == "remove")
                  eventName = "removeTag";
                jQuery(instance.DOM.originalInput).triggerHandler(eventName, [data]);
              } else {
                try {
                  var eventData = typeof data === "object" ? data : {
                    value: data
                  };
                  eventData = opts.cloneData ? extend({}, eventData) : eventData;
                  eventData.tagify = this;
                  if (data.event)
                    eventData.event = this.cloneEvent(data.event);
                  if (data instanceof Object) {
                    for (var prop in data)
                      if (data[prop] instanceof HTMLElement)
                        eventData[prop] = data[prop];
                  }
                  e = new CustomEvent(eventName, {
                    "detail": eventData
                  });
                } catch (err) {
                  console.warn(err);
                }
                target.dispatchEvent(e);
              }
            }
          };
        }
        var deleteBackspaceTimeout;
        function triggerChangeEvent() {
          if (this.settings.mixMode.integrated)
            return;
          var inputElm = this.DOM.originalInput, changed = this.state.lastOriginalValueReported !== inputElm.value, event = new CustomEvent("change", {
            bubbles: true
          });
          if (!changed)
            return;
          this.state.lastOriginalValueReported = inputElm.value;
          event.simulated = true;
          if (inputElm._valueTracker)
            inputElm._valueTracker.setValue(Math.random());
          inputElm.dispatchEvent(event);
          this.trigger("change", this.state.lastOriginalValueReported);
          inputElm.value = this.state.lastOriginalValueReported;
        }
        var events = {
          // bind custom events which were passed in the settings
          customBinding() {
            this.customEventsList.forEach((name) => {
              this.on(name, this.settings.callbacks[name]);
            });
          },
          binding() {
            let bindUnbind = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
            var _CB = this.events.callbacks, _CBR, action = bindUnbind ? "addEventListener" : "removeEventListener";
            if (this.state.mainEvents && bindUnbind)
              return;
            this.state.mainEvents = bindUnbind;
            if (bindUnbind && !this.listeners.main) {
              this.events.bindGlobal.call(this);
              if (this.settings.isJQueryPlugin)
                jQuery(this.DOM.originalInput).on("tagify.removeAllTags", this.removeAllTags.bind(this));
            }
            _CBR = this.listeners.main = this.listeners.main || {
              focus: ["input", _CB.onFocusBlur.bind(this)],
              keydown: ["input", _CB.onKeydown.bind(this)],
              click: ["scope", _CB.onClickScope.bind(this)],
              dblclick: ["scope", _CB.onDoubleClickScope.bind(this)],
              paste: ["input", _CB.onPaste.bind(this)],
              drop: ["input", _CB.onDrop.bind(this)],
              compositionstart: ["input", _CB.onCompositionStart.bind(this)],
              compositionend: ["input", _CB.onCompositionEnd.bind(this)]
            };
            for (var eventName in _CBR) {
              this.DOM[_CBR[eventName][0]][action](eventName, _CBR[eventName][1]);
            }
            clearInterval(this.listeners.main.originalInputValueObserverInterval);
            this.listeners.main.originalInputValueObserverInterval = setInterval(_CB.observeOriginalInputValue.bind(this), 500);
            var inputMutationObserver = this.listeners.main.inputMutationObserver || new MutationObserver(_CB.onInputDOMChange.bind(this));
            inputMutationObserver.disconnect();
            if (this.settings.mode == "mix") {
              inputMutationObserver.observe(this.DOM.input, {
                childList: true
              });
            }
          },
          bindGlobal(unbind) {
            var _CB = this.events.callbacks, action = unbind ? "removeEventListener" : "addEventListener", e;
            if (!this.listeners || !unbind && this.listeners.global)
              return;
            this.listeners.global = this.listeners.global || [{
              type: this.isIE ? "keydown" : "input",
              // IE cannot register "input" events on contenteditable elements, so the "keydown" should be used instead..
              target: this.DOM.input,
              cb: _CB[this.isIE ? "onInputIE" : "onInput"].bind(this)
            }, {
              type: "keydown",
              target: window,
              cb: _CB.onWindowKeyDown.bind(this)
            }, {
              type: "blur",
              target: this.DOM.input,
              cb: _CB.onFocusBlur.bind(this)
            }, {
              type: "click",
              target: document,
              cb: _CB.onClickAnywhere.bind(this)
            }];
            for (e of this.listeners.global)
              e.target[action](e.type, e.cb);
          },
          unbindGlobal() {
            this.events.bindGlobal.call(this, true);
          },
          /**
           * DOM events callbacks
           */
          callbacks: {
            onFocusBlur(e) {
              var _s = this.settings, text = e.target ? this.trim(e.target.textContent) : "", currentDisplayValue = this.value?.[0]?.[_s.tagTextProp], type = e.type, ddEnabled = _s.dropdown.enabled >= 0, eventData = {
                relatedTarget: e.relatedTarget
              }, isTargetSelectOption = this.state.actions.selectOption && (ddEnabled || !_s.dropdown.closeOnSelect), isTargetAddNewBtn = this.state.actions.addNew && ddEnabled, isRelatedTargetX = e.relatedTarget && isNodeTag.call(this, e.relatedTarget) && this.DOM.scope.contains(e.relatedTarget), shouldAddTags;
              if (type == "blur") {
                if (e.relatedTarget === this.DOM.scope) {
                  this.dropdown.hide();
                  this.DOM.input.focus();
                  return;
                }
                this.postUpdate();
                _s.onChangeAfterBlur && this.triggerChangeEvent();
              }
              if (isTargetSelectOption || isTargetAddNewBtn)
                return;
              this.state.hasFocus = type == "focus" ? +/* @__PURE__ */ new Date() : false;
              this.toggleFocusClass(this.state.hasFocus);
              if (_s.mode == "mix") {
                if (type == "focus") {
                  this.trigger("focus", eventData);
                } else if (e.type == "blur") {
                  this.trigger("blur", eventData);
                  this.loading(false);
                  this.dropdown.hide();
                  this.state.dropdown.visible = void 0;
                  this.setStateSelection();
                }
                return;
              }
              if (type == "focus") {
                this.trigger("focus", eventData);
                if (_s.dropdown.enabled === 0 || !_s.userInput) {
                  this.dropdown.show(this.value.length ? "" : void 0);
                }
                return;
              } else if (type == "blur") {
                this.trigger("blur", eventData);
                this.loading(false);
                if (_s.mode == "select") {
                  if (isRelatedTargetX) {
                    this.removeTags();
                    text = "";
                  }
                  if (currentDisplayValue === text)
                    text = "";
                }
                shouldAddTags = text && !this.state.actions.selectOption && _s.addTagOnBlur;
                shouldAddTags && this.addTags(text, true);
              }
              this.DOM.input.removeAttribute("style");
              this.dropdown.hide();
            },
            onCompositionStart(e) {
              this.state.composing = true;
            },
            onCompositionEnd(e) {
              this.state.composing = false;
            },
            onWindowKeyDown(e) {
              var focusedElm = document.activeElement, isTag = isNodeTag.call(this, focusedElm), isBelong = isTag && this.DOM.scope.contains(document.activeElement), isReadyOnlyTag = isBelong && focusedElm.hasAttribute("readonly"), nextTag;
              if (!isBelong || isReadyOnlyTag)
                return;
              nextTag = focusedElm.nextElementSibling;
              switch (e.key) {
                case "Backspace": {
                  if (!this.settings.readonly) {
                    this.removeTags(focusedElm);
                    (nextTag ? nextTag : this.DOM.input).focus();
                  }
                  break;
                }
                case "Enter": {
                  setTimeout(this.editTag.bind(this), 0, focusedElm);
                  break;
                }
              }
            },
            onKeydown(e) {
              var _s = this.settings;
              if (this.state.composing || !_s.userInput)
                return;
              if (_s.mode == "select" && _s.enforceWhitelist && this.value.length && e.key != "Tab") {
                e.preventDefault();
              }
              var s = this.trim(e.target.textContent);
              this.trigger("keydown", {
                event: e
              });
              if (_s.mode == "mix") {
                switch (e.key) {
                  case "Left":
                  case "ArrowLeft": {
                    this.state.actions.ArrowLeft = true;
                    break;
                  }
                  case "Delete":
                  case "Backspace": {
                    if (this.state.editing)
                      return;
                    var sel = document.getSelection(), deleteKeyTagDetected = e.key == "Delete" && sel.anchorOffset == (sel.anchorNode.length || 0), prevAnchorSibling = sel.anchorNode.previousSibling, isCaretAfterTag = sel.anchorNode.nodeType == 1 || !sel.anchorOffset && prevAnchorSibling && prevAnchorSibling.nodeType == 1 && sel.anchorNode.previousSibling;
                    decode(this.DOM.input.innerHTML);
                    var lastTagElems = this.getTagElms(), isZWS = sel.anchorNode.length === 1 && sel.anchorNode.nodeValue == String.fromCharCode(8203), tagBeforeCaret, tagElmToBeDeleted, firstTextNodeBeforeTag;
                    if (_s.backspace == "edit" && isCaretAfterTag) {
                      tagBeforeCaret = sel.anchorNode.nodeType == 1 ? null : sel.anchorNode.previousElementSibling;
                      setTimeout(this.editTag.bind(this), 0, tagBeforeCaret);
                      e.preventDefault();
                      return;
                    }
                    if (isChromeAndroidBrowser() && isCaretAfterTag instanceof Element) {
                      firstTextNodeBeforeTag = getfirstTextNode(isCaretAfterTag);
                      if (!isCaretAfterTag.hasAttribute("readonly"))
                        isCaretAfterTag.remove();
                      this.DOM.input.focus();
                      setTimeout(() => {
                        placeCaretAfterNode(firstTextNodeBeforeTag);
                        this.DOM.input.click();
                      });
                      return;
                    }
                    if (sel.anchorNode.nodeName == "BR")
                      return;
                    if ((deleteKeyTagDetected || isCaretAfterTag) && sel.anchorNode.nodeType == 1) {
                      if (sel.anchorOffset == 0)
                        tagElmToBeDeleted = deleteKeyTagDetected ? lastTagElems[0] : null;
                      else
                        tagElmToBeDeleted = lastTagElems[Math.min(lastTagElems.length, sel.anchorOffset) - 1];
                    } else if (deleteKeyTagDetected)
                      tagElmToBeDeleted = sel.anchorNode.nextElementSibling;
                    else if (isCaretAfterTag instanceof Element)
                      tagElmToBeDeleted = isCaretAfterTag;
                    if (sel.anchorNode.nodeType == 3 && // node at caret location is a Text node
                    !sel.anchorNode.nodeValue && // has some text
                    sel.anchorNode.previousElementSibling)
                      e.preventDefault();
                    if ((isCaretAfterTag || deleteKeyTagDetected) && !_s.backspace) {
                      e.preventDefault();
                      return;
                    }
                    if (sel.type != "Range" && !sel.anchorOffset && sel.anchorNode == this.DOM.input && e.key != "Delete") {
                      e.preventDefault();
                      return;
                    }
                    if (sel.type != "Range" && tagElmToBeDeleted && tagElmToBeDeleted.hasAttribute("readonly")) {
                      placeCaretAfterNode(getfirstTextNode(tagElmToBeDeleted));
                      return;
                    }
                    if (e.key == "Delete" && isZWS && getSetTagData(sel.anchorNode.nextSibling)) {
                      this.removeTags(sel.anchorNode.nextSibling);
                    }
                    clearTimeout(deleteBackspaceTimeout);
                    deleteBackspaceTimeout = setTimeout(() => {
                      var sel2 = document.getSelection();
                      decode(this.DOM.input.innerHTML);
                      !deleteKeyTagDetected && sel2.anchorNode.previousSibling;
                      this.value = [].map.call(lastTagElems, (node, nodeIdx) => {
                        var tagData = getSetTagData(node);
                        if (node.parentNode || tagData.readonly)
                          return tagData;
                        else
                          this.trigger("remove", {
                            tag: node,
                            index: nodeIdx,
                            data: tagData
                          });
                      }).filter((n) => n);
                    }, 20);
                    break;
                  }
                }
                return true;
              }
              switch (e.key) {
                case "Backspace":
                  if (_s.mode == "select" && _s.enforceWhitelist && this.value.length)
                    this.removeTags();
                  else if (!this.state.dropdown.visible || _s.dropdown.position == "manual") {
                    if (e.target.textContent == "" || s.charCodeAt(0) == 8203) {
                      if (_s.backspace === true)
                        this.removeTags();
                      else if (_s.backspace == "edit")
                        setTimeout(this.editTag.bind(this), 0);
                    }
                  }
                  break;
                case "Esc":
                case "Escape":
                  if (this.state.dropdown.visible)
                    return;
                  e.target.blur();
                  break;
                case "Down":
                case "ArrowDown":
                  if (!this.state.dropdown.visible)
                    this.dropdown.show();
                  break;
                case "ArrowRight": {
                  let tagData = this.state.inputSuggestion || this.state.ddItemData;
                  if (tagData && _s.autoComplete.rightKey) {
                    this.addTags([tagData], true);
                    return;
                  }
                  break;
                }
                case "Tab": {
                  let selectMode = _s.mode == "select";
                  if (s && !selectMode)
                    e.preventDefault();
                  else
                    return true;
                }
                case "Enter":
                  if (this.state.dropdown.visible && _s.dropdown.position != "manual")
                    return;
                  e.preventDefault();
                  setTimeout(() => {
                    if (this.state.dropdown.visible || this.state.actions.selectOption)
                      return;
                    this.addTags(s, true);
                  });
              }
            },
            onInput(e) {
              this.postUpdate();
              var _s = this.settings;
              if (_s.mode == "mix")
                return this.events.callbacks.onMixTagsInput.call(this, e);
              var value = this.input.normalize.call(this), showSuggestions = value.length >= _s.dropdown.enabled, eventData = {
                value,
                inputElm: this.DOM.input
              }, validation = this.validateTag({
                value
              });
              if (_s.mode == "select") {
                this.toggleScopeValidation(validation);
              }
              eventData.isValid = validation;
              if (this.state.inputText == value)
                return;
              this.input.set.call(this, value, false);
              if (value.search(_s.delimiters) != -1) {
                if (this.addTags(value)) {
                  this.input.set.call(this);
                }
              } else if (_s.dropdown.enabled >= 0) {
                this.dropdown[showSuggestions ? "show" : "hide"](value);
              }
              this.trigger("input", eventData);
            },
            onMixTagsInput(e) {
              var rangeText, match, matchedPatternCount, tag, showSuggestions, selection, _s = this.settings, lastTagsCount = this.value.length, matchFlaggedTag, matchDelimiters, tagsElems = this.getTagElms(), fragment = document.createDocumentFragment(), range = window.getSelection().getRangeAt(0), remainingTagsValues = [].map.call(tagsElems, (node) => getSetTagData(node).value);
              if (e.inputType == "deleteContentBackward" && isChromeAndroidBrowser()) {
                this.events.callbacks.onKeydown.call(this, {
                  target: e.target,
                  key: "Backspace"
                });
              }
              fixCaretBetweenTags(this.getTagElms());
              this.value.slice().forEach((item) => {
                if (item.readonly && !remainingTagsValues.includes(item.value))
                  fragment.appendChild(this.createTagElem(item));
              });
              if (fragment.childNodes.length) {
                range.insertNode(fragment);
                this.setRangeAtStartEnd(false, fragment.lastChild);
              }
              if (tagsElems.length != lastTagsCount) {
                this.value = [].map.call(this.getTagElms(), (node) => getSetTagData(node));
                this.update({
                  withoutChangeEvent: true
                });
                return;
              }
              if (this.hasMaxTags())
                return true;
              if (window.getSelection) {
                selection = window.getSelection();
                if (selection.rangeCount > 0 && selection.anchorNode.nodeType == 3) {
                  range = selection.getRangeAt(0).cloneRange();
                  range.collapse(true);
                  range.setStart(selection.focusNode, 0);
                  rangeText = range.toString().slice(0, range.endOffset);
                  matchedPatternCount = rangeText.split(_s.pattern).length - 1;
                  match = rangeText.match(_s.pattern);
                  if (match)
                    tag = rangeText.slice(rangeText.lastIndexOf(match[match.length - 1]));
                  if (tag) {
                    this.state.actions.ArrowLeft = false;
                    this.state.tag = {
                      prefix: tag.match(_s.pattern)[0],
                      value: tag.replace(_s.pattern, "")
                      // get rid of the prefix
                    };
                    this.state.tag.baseOffset = selection.baseOffset - this.state.tag.value.length;
                    matchDelimiters = this.state.tag.value.match(_s.delimiters);
                    if (matchDelimiters) {
                      this.state.tag.value = this.state.tag.value.replace(_s.delimiters, "");
                      this.state.tag.delimiters = matchDelimiters[0];
                      this.addTags(this.state.tag.value, _s.dropdown.clearOnSelect);
                      this.dropdown.hide();
                      return;
                    }
                    showSuggestions = this.state.tag.value.length >= _s.dropdown.enabled;
                    try {
                      matchFlaggedTag = this.state.flaggedTags[this.state.tag.baseOffset];
                      matchFlaggedTag = matchFlaggedTag.prefix == this.state.tag.prefix && matchFlaggedTag.value[0] == this.state.tag.value[0];
                      if (this.state.flaggedTags[this.state.tag.baseOffset] && !this.state.tag.value)
                        delete this.state.flaggedTags[this.state.tag.baseOffset];
                    } catch (err) {
                    }
                    if (matchFlaggedTag || matchedPatternCount < this.state.mixMode.matchedPatternCount)
                      showSuggestions = false;
                  } else {
                    this.state.flaggedTags = {};
                  }
                  this.state.mixMode.matchedPatternCount = matchedPatternCount;
                }
              }
              setTimeout(() => {
                this.update({
                  withoutChangeEvent: true
                });
                this.trigger("input", extend({}, this.state.tag, {
                  textContent: this.DOM.input.textContent
                }));
                if (this.state.tag)
                  this.dropdown[showSuggestions ? "show" : "hide"](this.state.tag.value);
              }, 10);
            },
            onInputIE(e) {
              var _this = this;
              setTimeout(function() {
                _this.events.callbacks.onInput.call(_this, e);
              });
            },
            observeOriginalInputValue() {
              if (!this.DOM.originalInput.parentNode)
                this.destroy();
              if (this.DOM.originalInput.value != this.DOM.originalInput.tagifyValue)
                this.loadOriginalValues();
            },
            onClickAnywhere(e) {
              if (e.target != this.DOM.scope && !this.DOM.scope.contains(e.target)) {
                this.toggleFocusClass(false);
                this.state.hasFocus = false;
              }
            },
            onClickScope(e) {
              var _s = this.settings, tagElm = e.target.closest("." + _s.classNames.tag), timeDiffFocus = +/* @__PURE__ */ new Date() - this.state.hasFocus;
              if (e.target == this.DOM.scope) {
                this.DOM.input.focus();
                return;
              } else if (e.target.classList.contains(_s.classNames.tagX)) {
                this.removeTags(e.target.parentNode);
                return;
              } else if (tagElm) {
                this.trigger("click", {
                  tag: tagElm,
                  index: this.getNodeIndex(tagElm),
                  data: getSetTagData(tagElm),
                  event: e
                });
                if (_s.editTags === 1 || _s.editTags.clicks === 1)
                  this.events.callbacks.onDoubleClickScope.call(this, e);
                return;
              } else if (e.target == this.DOM.input) {
                if (_s.mode == "mix") {
                  this.fixFirefoxLastTagNoCaret();
                }
                if (timeDiffFocus > 500) {
                  if (this.state.dropdown.visible)
                    this.dropdown.hide();
                  else if (_s.dropdown.enabled === 0 && _s.mode != "mix")
                    this.dropdown.show(this.value.length ? "" : void 0);
                  return;
                }
              }
              if (_s.mode == "select" && _s.dropdown.enabled === 0 && !this.state.dropdown.visible)
                this.dropdown.show();
            },
            // special proccess is needed for pasted content in order to "clean" it
            onPaste(e) {
              e.preventDefault();
              var _s = this.settings, selectModeWithoutInput = _s.mode == "select" && _s.enforceWhitelist;
              if (selectModeWithoutInput || !_s.userInput) {
                return false;
              }
              var clipboardData, pastedText;
              if (_s.readonly)
                return;
              clipboardData = e.clipboardData || window.clipboardData;
              pastedText = clipboardData.getData("Text");
              _s.hooks.beforePaste(e, {
                tagify: this,
                pastedText,
                clipboardData
              }).then((result) => {
                if (result === void 0)
                  result = pastedText;
                if (result) {
                  this.injectAtCaret(result, window.getSelection().getRangeAt(0));
                  if (this.settings.mode == "mix") {
                    this.events.callbacks.onMixTagsInput.call(this, e);
                  } else if (this.settings.pasteAsTags) {
                    this.addTags(this.state.inputText + result, true);
                  } else
                    this.state.inputText = result;
                }
              }).catch((err) => err);
            },
            onDrop(e) {
              e.preventDefault();
            },
            onEditTagInput(editableElm, e) {
              var tagElm = editableElm.closest("." + this.settings.classNames.tag), tagElmIdx = this.getNodeIndex(tagElm), tagData = getSetTagData(tagElm), textValue = this.input.normalize.call(this, editableElm), dataForChangedProp = {
                [this.settings.tagTextProp]: textValue,
                __tagId: tagData.__tagId
              }, isValid = this.validateTag(dataForChangedProp), hasChanged = this.editTagChangeDetected(extend(tagData, dataForChangedProp));
              if (!hasChanged && editableElm.originalIsValid === true)
                isValid = true;
              tagElm.classList.toggle(this.settings.classNames.tagInvalid, isValid !== true);
              tagData.__isValid = isValid;
              tagElm.title = isValid === true ? tagData.title || tagData.value : isValid;
              if (textValue.length >= this.settings.dropdown.enabled) {
                if (this.state.editing)
                  this.state.editing.value = textValue;
                this.dropdown.show(textValue);
              }
              this.trigger("edit:input", {
                tag: tagElm,
                index: tagElmIdx,
                data: extend({}, this.value[tagElmIdx], {
                  newValue: textValue
                }),
                event: e
              });
            },
            onEditTagPaste(tagElm, e) {
              var clipboardData = e.clipboardData || window.clipboardData, pastedText = clipboardData.getData("Text");
              e.preventDefault();
              var newNode = injectAtCaret(pastedText);
              this.setRangeAtStartEnd(false, newNode);
            },
            onEditTagFocus(tagElm) {
              this.state.editing = {
                scope: tagElm,
                input: tagElm.querySelector("[contenteditable]")
              };
            },
            onEditTagBlur(editableElm) {
              if (!this.state.hasFocus)
                this.toggleFocusClass();
              if (!this.DOM.scope.contains(editableElm))
                return;
              var _s = this.settings, tagElm = editableElm.closest("." + _s.classNames.tag), tagData = getSetTagData(tagElm), textValue = this.input.normalize.call(this, editableElm), dataForChangedProp = {
                [_s.tagTextProp]: textValue,
                __tagId: tagData.__tagId
              }, originalData = tagData.__originalData, hasChanged = this.editTagChangeDetected(extend(tagData, dataForChangedProp)), isValid = this.validateTag(dataForChangedProp), hasMaxTags, newTagData;
              if (!textValue) {
                this.onEditTagDone(tagElm);
                return;
              }
              if (!hasChanged) {
                this.onEditTagDone(tagElm, originalData);
                return;
              }
              hasMaxTags = this.hasMaxTags();
              newTagData = extend({}, originalData, {
                [_s.tagTextProp]: this.trim(textValue),
                __isValid: isValid
              });
              _s.transformTag.call(this, newTagData, originalData);
              isValid = (!hasMaxTags || originalData.__isValid === true) && this.validateTag(newTagData);
              if (isValid !== true) {
                this.trigger("invalid", {
                  data: newTagData,
                  tag: tagElm,
                  message: isValid
                });
                if (_s.editTags.keepInvalid)
                  return;
                if (_s.keepInvalidTags)
                  newTagData.__isValid = isValid;
                else
                  newTagData = originalData;
              } else if (_s.keepInvalidTags) {
                delete newTagData.title;
                delete newTagData["aria-invalid"];
                delete newTagData.class;
              }
              this.onEditTagDone(tagElm, newTagData);
            },
            onEditTagkeydown(e, tagElm) {
              if (this.state.composing)
                return;
              this.trigger("edit:keydown", {
                event: e
              });
              switch (e.key) {
                case "Esc":
                case "Escape": {
                  tagElm.parentNode.replaceChild(tagElm.__tagifyTagData.__originalHTML, tagElm);
                  this.state.editing = false;
                }
                case "Enter":
                case "Tab":
                  e.preventDefault();
                  e.target.blur();
              }
            },
            onDoubleClickScope(e) {
              var tagElm = e.target.closest("." + this.settings.classNames.tag), tagData = getSetTagData(tagElm), _s = this.settings, isEditingTag, isReadyOnlyTag;
              if (!tagElm || !_s.userInput || tagData.editable === false)
                return;
              isEditingTag = tagElm.classList.contains(this.settings.classNames.tagEditing);
              isReadyOnlyTag = tagElm.hasAttribute("readonly");
              if (_s.mode != "select" && !_s.readonly && !isEditingTag && !isReadyOnlyTag && this.settings.editTags)
                this.editTag(tagElm);
              this.toggleFocusClass(true);
              this.trigger("dblclick", {
                tag: tagElm,
                index: this.getNodeIndex(tagElm),
                data: getSetTagData(tagElm)
              });
            },
            /**
             *
             * @param {Object} m an object representing the observed DOM changes
             */
            onInputDOMChange(m) {
              m.forEach((record) => {
                record.addedNodes.forEach((addedNode) => {
                  if (addedNode.outerHTML == "<div><br></div>") {
                    addedNode.replaceWith(document.createElement("br"));
                  } else if (addedNode.nodeType == 1 && addedNode.querySelector(this.settings.classNames.tagSelector)) {
                    let newlineText = document.createTextNode("");
                    if (addedNode.childNodes[0].nodeType == 3 && addedNode.previousSibling.nodeName != "BR")
                      newlineText = document.createTextNode("\n");
                    addedNode.replaceWith(...[newlineText, ...[...addedNode.childNodes].slice(0, -1)]);
                    placeCaretAfterNode(newlineText);
                  } else if (isNodeTag.call(this, addedNode)) {
                    if (addedNode.previousSibling?.nodeType == 3 && !addedNode.previousSibling.textContent)
                      addedNode.previousSibling.remove();
                    if (addedNode.previousSibling && addedNode.previousSibling.nodeName == "BR") {
                      addedNode.previousSibling.replaceWith("\n" + ZERO_WIDTH_CHAR);
                      let nextNode = addedNode.nextSibling, anythingAfterNode = "";
                      while (nextNode) {
                        anythingAfterNode += nextNode.textContent;
                        nextNode = nextNode.nextSibling;
                      }
                      anythingAfterNode.trim() && placeCaretAfterNode(addedNode.previousSibling);
                    } else if (!addedNode.previousSibling || getSetTagData(addedNode.previousSibling)) {
                      addedNode.before(ZERO_WIDTH_CHAR);
                    }
                  }
                });
                record.removedNodes.forEach((removedNode) => {
                  if (removedNode && removedNode.nodeName == "BR" && isNodeTag.call(this, lastInputChild)) {
                    this.removeTags(lastInputChild);
                    this.fixFirefoxLastTagNoCaret();
                  }
                });
              });
              var lastInputChild = this.DOM.input.lastChild;
              if (lastInputChild && lastInputChild.nodeValue == "")
                lastInputChild.remove();
              if (!lastInputChild || lastInputChild.nodeName != "BR") {
                this.DOM.input.appendChild(document.createElement("br"));
              }
            }
          }
        };
        function Tagify2(input, settings) {
          if (!input) {
            console.warn("Tagify:", "input element not found", input);
            const mockInstance = new Proxy(this, {
              get() {
                return () => mockInstance;
              }
            });
            return mockInstance;
          }
          if (input.__tagify) {
            console.warn("Tagify: ", "input element is already Tagified - Same instance is returned.", input);
            return input.__tagify;
          }
          extend(this, EventDispatcher(this));
          this.isFirefox = /firefox|fxios/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent);
          this.isIE = window.document.documentMode;
          settings = settings || {};
          this.getPersistedData = getPersistedData(settings.id);
          this.setPersistedData = setPersistedData(settings.id);
          this.clearPersistedData = clearPersistedData(settings.id);
          this.applySettings(input, settings);
          this.state = {
            inputText: "",
            editing: false,
            composing: false,
            actions: {},
            // UI actions for state-locking
            mixMode: {},
            dropdown: {},
            flaggedTags: {}
            // in mix-mode, when a string is detetced as potential tag, and the user has chocen to close the suggestions dropdown, keep the record of the tasg here
          };
          this.value = [];
          this.listeners = {};
          this.DOM = {};
          this.build(input);
          initDropdown.call(this);
          this.getCSSVars();
          this.loadOriginalValues();
          this.events.customBinding.call(this);
          this.events.binding.call(this);
          input.autofocus && this.DOM.input.focus();
          input.__tagify = this;
        }
        Tagify2.prototype = {
          _dropdown,
          getSetTagData,
          helpers: {
            sameStr,
            removeCollectionProp,
            omit,
            isObject,
            parseHTML,
            escapeHTML,
            extend,
            concatWithoutDups,
            getUID,
            isNodeTag
          },
          customEventsList: ["change", "add", "remove", "invalid", "input", "click", "keydown", "focus", "blur", "edit:input", "edit:beforeUpdate", "edit:updated", "edit:start", "edit:keydown", "dropdown:show", "dropdown:hide", "dropdown:select", "dropdown:updated", "dropdown:noMatch", "dropdown:scroll"],
          dataProps: ["__isValid", "__removed", "__originalData", "__originalHTML", "__tagId"],
          // internal-uasge props
          trim(text) {
            return this.settings.trim && text && typeof text == "string" ? text.trim() : text;
          },
          // expose this handy utility function
          parseHTML,
          templates,
          parseTemplate(template, data) {
            template = this.settings.templates[template] || template;
            return parseHTML(template.apply(this, data));
          },
          set whitelist(arr) {
            const isArray = arr && Array.isArray(arr);
            this.settings.whitelist = isArray ? arr : [];
            this.setPersistedData(isArray ? arr : [], "whitelist");
          },
          get whitelist() {
            return this.settings.whitelist;
          },
          generateClassSelectors(classNames) {
            for (let name in classNames) {
              let currentName = name;
              Object.defineProperty(classNames, currentName + "Selector", {
                get() {
                  return "." + this[currentName].split(" ")[0];
                }
              });
            }
          },
          applySettings(input, settings) {
            DEFAULTS.templates = this.templates;
            var mixModeDefaults = {
              dropdown: {
                position: "text"
              }
            };
            var mergedDefaults = extend({}, DEFAULTS, settings.mode == "mix" ? mixModeDefaults : {});
            var _s = this.settings = extend({}, mergedDefaults, settings);
            _s.disabled = input.hasAttribute("disabled");
            _s.readonly = _s.readonly || input.hasAttribute("readonly");
            _s.placeholder = escapeHTML(input.getAttribute("placeholder") || _s.placeholder || "");
            _s.required = input.hasAttribute("required");
            this.generateClassSelectors(_s.classNames);
            if (_s.dropdown.includeSelectedTags === void 0)
              _s.dropdown.includeSelectedTags = _s.duplicates;
            if (this.isIE)
              _s.autoComplete = false;
            ["whitelist", "blacklist"].forEach((name) => {
              var attrVal = input.getAttribute("data-" + name);
              if (attrVal) {
                attrVal = attrVal.split(_s.delimiters);
                if (attrVal instanceof Array)
                  _s[name] = attrVal;
              }
            });
            if ("autoComplete" in settings && !isObject(settings.autoComplete)) {
              _s.autoComplete = DEFAULTS.autoComplete;
              _s.autoComplete.enabled = settings.autoComplete;
            }
            if (_s.mode == "mix") {
              _s.pattern = _s.pattern || /@/;
              _s.autoComplete.rightKey = true;
              _s.delimiters = settings.delimiters || null;
              if (_s.tagTextProp && !_s.dropdown.searchKeys.includes(_s.tagTextProp))
                _s.dropdown.searchKeys.push(_s.tagTextProp);
            }
            if (input.pattern)
              try {
                _s.pattern = new RegExp(input.pattern);
              } catch (e) {
              }
            if (_s.delimiters) {
              _s._delimiters = _s.delimiters;
              try {
                _s.delimiters = new RegExp(this.settings.delimiters, "g");
              } catch (e) {
              }
            }
            if (_s.disabled)
              _s.userInput = false;
            this.TEXTS = _objectSpread2(_objectSpread2({}, TEXTS), _s.texts || {});
            if (_s.mode == "select" && !settings.dropdown?.enabled || !_s.userInput) {
              _s.dropdown.enabled = 0;
            }
            _s.dropdown.appendTarget = settings.dropdown?.appendTarget || document.body;
            let persistedWhitelist = this.getPersistedData("whitelist");
            if (Array.isArray(persistedWhitelist))
              this.whitelist = Array.isArray(_s.whitelist) ? concatWithoutDups(_s.whitelist, persistedWhitelist) : persistedWhitelist;
          },
          /**
           * Returns a string of HTML element attributes
           * @param {Object} data [Tag data]
           */
          getAttributes(data) {
            var attrs = this.getCustomAttributes(data), s = "", k;
            for (k in attrs)
              s += " " + k + (data[k] !== void 0 ? `="${attrs[k]}"` : "");
            return s;
          },
          /**
           * Returns an object of attributes to be used for the templates
           */
          getCustomAttributes(data) {
            if (!isObject(data))
              return "";
            var output = {}, propName;
            for (propName in data) {
              if (propName.slice(0, 2) != "__" && propName != "class" && data.hasOwnProperty(propName) && data[propName] !== void 0)
                output[propName] = escapeHTML(data[propName]);
            }
            return output;
          },
          setStateSelection() {
            var selection = window.getSelection();
            var sel = {
              anchorOffset: selection.anchorOffset,
              anchorNode: selection.anchorNode,
              range: selection.getRangeAt && selection.rangeCount && selection.getRangeAt(0)
            };
            this.state.selection = sel;
            return sel;
          },
          /**
           * Get specific CSS variables which are relevant to this script and parse them as needed.
           * The result is saved on the instance in "this.CSSVars"
           */
          getCSSVars() {
            var compStyle = getComputedStyle(this.DOM.scope, null);
            const getProp = (name) => compStyle.getPropertyValue("--" + name);
            function seprateUnitFromValue(a) {
              if (!a)
                return {};
              a = a.trim().split(" ")[0];
              var unit = a.split(/\d+/g).filter((n) => n).pop().trim(), value = +a.split(unit).filter((n) => n)[0].trim();
              return {
                value,
                unit
              };
            }
            this.CSSVars = {
              tagHideTransition: ((_ref) => {
                let value = _ref.value, unit = _ref.unit;
                return unit == "s" ? value * 1e3 : value;
              })(seprateUnitFromValue(getProp("tag-hide-transition")))
            };
          },
          /**
           * builds the HTML of this component
           * @param  {Object} input [DOM element which would be "transformed" into "Tags"]
           */
          build(input) {
            var DOM = this.DOM;
            if (this.settings.mixMode.integrated) {
              DOM.originalInput = null;
              DOM.scope = input;
              DOM.input = input;
            } else {
              DOM.originalInput = input;
              DOM.originalInput_tabIndex = input.tabIndex;
              DOM.scope = this.parseTemplate("wrapper", [input, this.settings]);
              DOM.input = DOM.scope.querySelector(this.settings.classNames.inputSelector);
              input.parentNode.insertBefore(DOM.scope, input);
              input.tabIndex = -1;
            }
          },
          /**
           * revert any changes made by this component
           */
          destroy() {
            this.events.unbindGlobal.call(this);
            this.DOM.scope.parentNode.removeChild(this.DOM.scope);
            this.DOM.originalInput.tabIndex = this.DOM.originalInput_tabIndex;
            delete this.DOM.originalInput.__tagify;
            this.dropdown.hide(true);
            clearTimeout(this.dropdownHide__bindEventsTimeout);
            clearInterval(this.listeners.main.originalInputValueObserverInterval);
          },
          /**
           * if the original input has any values, add them as tags
           */
          loadOriginalValues(value) {
            var lastChild, _s = this.settings;
            this.state.blockChangeEvent = true;
            if (value === void 0) {
              const persistedOriginalValue = this.getPersistedData("value");
              if (persistedOriginalValue && !this.DOM.originalInput.value)
                value = persistedOriginalValue;
              else
                value = _s.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value;
            }
            this.removeAllTags();
            if (value) {
              if (_s.mode == "mix") {
                this.parseMixTags(value);
                lastChild = this.DOM.input.lastChild;
                if (!lastChild || lastChild.tagName != "BR")
                  this.DOM.input.insertAdjacentHTML("beforeend", "<br>");
              } else {
                try {
                  if (JSON.parse(value) instanceof Array)
                    value = JSON.parse(value);
                } catch (err) {
                }
                this.addTags(value, true).forEach((tag) => tag && tag.classList.add(_s.classNames.tagNoAnimation));
              }
            } else
              this.postUpdate();
            this.state.lastOriginalValueReported = _s.mixMode.integrated ? "" : this.DOM.originalInput.value;
          },
          cloneEvent(e) {
            var clonedEvent = {};
            for (var v in e)
              if (v != "path")
                clonedEvent[v] = e[v];
            return clonedEvent;
          },
          /**
           * Toogle global loading state on/off
           * Useful when fetching async whitelist while user is typing
           * @param {Boolean} isLoading
           */
          loading(isLoading) {
            this.state.isLoading = isLoading;
            this.DOM.scope.classList[isLoading ? "add" : "remove"](this.settings.classNames.scopeLoading);
            return this;
          },
          /**
           * Toogle a tag loading state on/off
           * @param {Boolean} isLoading
           */
          tagLoading(tagElm, isLoading) {
            if (tagElm)
              tagElm.classList[isLoading ? "add" : "remove"](this.settings.classNames.tagLoading);
            return this;
          },
          /**
           * Toggles class on the main tagify container ("scope")
           * @param {String} className
           * @param {Boolean} force
           */
          toggleClass(className, force) {
            if (typeof className == "string")
              this.DOM.scope.classList.toggle(className, force);
          },
          toggleScopeValidation(validation) {
            var isValid = validation === true || validation === void 0;
            if (!this.settings.required && validation && validation === this.TEXTS.empty)
              isValid = true;
            this.toggleClass(this.settings.classNames.tagInvalid, !isValid);
            this.DOM.scope.title = isValid ? "" : validation;
          },
          toggleFocusClass(force) {
            this.toggleClass(this.settings.classNames.focus, !!force);
          },
          triggerChangeEvent,
          events,
          fixFirefoxLastTagNoCaret() {
            return;
          },
          /** https://stackoverflow.com/a/59156872/104380
           * @param {Boolean} start indicating where to place it (start or end of the node)
           * @param {Object}  node  DOM node to place the caret at
           */
          setRangeAtStartEnd(start, node) {
            if (!node)
              return;
            start = typeof start == "number" ? start : !!start;
            node = node.lastChild || node;
            var sel = document.getSelection();
            if (sel.focusNode instanceof Element && !this.DOM.input.contains(sel.focusNode)) {
              return true;
            }
            try {
              if (sel.rangeCount >= 1) {
                ["Start", "End"].forEach((pos) => sel.getRangeAt(0)["set" + pos](node, start ? start : node.length));
              }
            } catch (err) {
            }
          },
          insertAfterTag(tagElm, newNode) {
            newNode = newNode || this.settings.mixMode.insertAfterTag;
            if (!tagElm || !tagElm.parentNode || !newNode)
              return;
            newNode = typeof newNode == "string" ? document.createTextNode(newNode) : newNode;
            tagElm.parentNode.insertBefore(newNode, tagElm.nextSibling);
            return newNode;
          },
          // compares all "__originalData" property values with the current "tagData" properties
          // and returns "true" if something changed.
          editTagChangeDetected(tagData) {
            var originalData = tagData.__originalData;
            for (var prop in originalData)
              if (!this.dataProps.includes(prop) && tagData[prop] != originalData[prop])
                return true;
            return false;
          },
          // returns the node which has the actual tag's content
          getTagTextNode(tagElm) {
            return tagElm.querySelector(this.settings.classNames.tagTextSelector);
          },
          // sets the text of a tag
          setTagTextNode(tagElm, HTML) {
            this.getTagTextNode(tagElm).innerHTML = escapeHTML(HTML);
          },
          /**
           * Enters a tag into "edit" mode
           * @param {Node} tagElm the tag element to edit. if nothing specified, use last last
           */
          editTag(tagElm, opts) {
            tagElm = tagElm || this.getLastTag();
            opts = opts || {};
            this.dropdown.hide();
            var _s = this.settings, editableElm = this.getTagTextNode(tagElm), tagIdx = this.getNodeIndex(tagElm), tagData = getSetTagData(tagElm), _CB = this.events.callbacks, that = this, isValid = true, delayed_onEditTagBlur = function() {
              setTimeout(() => _CB.onEditTagBlur.call(that, that.getTagTextNode(tagElm)));
            };
            if (!editableElm) {
              console.warn("Cannot find element in Tag template: .", _s.classNames.tagTextSelector);
              return;
            }
            if (tagData instanceof Object && "editable" in tagData && !tagData.editable)
              return;
            tagData = getSetTagData(tagElm, {
              __originalData: extend({}, tagData),
              __originalHTML: tagElm.cloneNode(true)
            });
            getSetTagData(tagData.__originalHTML, tagData.__originalData);
            editableElm.setAttribute("contenteditable", true);
            tagElm.classList.add(_s.classNames.tagEditing);
            editableElm.addEventListener("focus", _CB.onEditTagFocus.bind(this, tagElm));
            editableElm.addEventListener("blur", delayed_onEditTagBlur);
            editableElm.addEventListener("input", _CB.onEditTagInput.bind(this, editableElm));
            editableElm.addEventListener("paste", _CB.onEditTagPaste.bind(this, editableElm));
            editableElm.addEventListener("keydown", (e) => _CB.onEditTagkeydown.call(this, e, tagElm));
            editableElm.addEventListener("compositionstart", _CB.onCompositionStart.bind(this));
            editableElm.addEventListener("compositionend", _CB.onCompositionEnd.bind(this));
            if (!opts.skipValidation)
              isValid = this.editTagToggleValidity(tagElm);
            editableElm.originalIsValid = isValid;
            this.trigger("edit:start", {
              tag: tagElm,
              index: tagIdx,
              data: tagData,
              isValid
            });
            editableElm.focus();
            this.setRangeAtStartEnd(false, editableElm);
            return this;
          },
          /**
           * If a tag is invalid, for any reason, set its class to "not allowed" (see defaults file)
           * @param {Node} tagElm required
           * @param {Object} tagData optional
           * @returns true if valid, a string (reason) if not
           */
          editTagToggleValidity(tagElm, tagData) {
            var tagData = tagData || getSetTagData(tagElm), isValid;
            if (!tagData) {
              console.warn("tag has no data: ", tagElm, tagData);
              return;
            }
            isValid = !("__isValid" in tagData) || tagData.__isValid === true;
            if (!isValid) {
              this.removeTagsFromValue(tagElm);
            }
            this.update();
            tagElm.classList.toggle(this.settings.classNames.tagNotAllowed, !isValid);
            tagData.__isValid = isValid;
            return tagData.__isValid;
          },
          onEditTagDone(tagElm, tagData) {
            tagElm = tagElm || this.state.editing.scope;
            tagData = tagData || {};
            var eventData = {
              tag: tagElm,
              index: this.getNodeIndex(tagElm),
              previousData: getSetTagData(tagElm),
              data: tagData
            };
            this.trigger("edit:beforeUpdate", eventData, {
              cloneData: false
            });
            this.state.editing = false;
            delete tagData.__originalData;
            delete tagData.__originalHTML;
            if (tagElm && tagData[this.settings.tagTextProp]) {
              tagElm = this.replaceTag(tagElm, tagData);
              this.editTagToggleValidity(tagElm, tagData);
              if (this.settings.a11y.focusableTags)
                tagElm.focus();
              else
                placeCaretAfterNode(tagElm);
            } else if (tagElm)
              this.removeTags(tagElm);
            this.trigger("edit:updated", eventData);
            this.dropdown.hide();
            if (this.settings.keepInvalidTags)
              this.reCheckInvalidTags();
          },
          /**
           * Replaces an exisitng tag with a new one. Used for updating a tag's data
           * @param {Object} tagElm  [DOM node to replace]
           * @param {Object} tagData [data to create new tag from]
           */
          replaceTag(tagElm, tagData) {
            if (!tagData || !tagData.value)
              tagData = tagElm.__tagifyTagData;
            if (tagData.__isValid && tagData.__isValid != true)
              extend(tagData, this.getInvalidTagAttrs(tagData, tagData.__isValid));
            var newTagElm = this.createTagElem(tagData);
            tagElm.parentNode.replaceChild(newTagElm, tagElm);
            this.updateValueByDOMTags();
            return newTagElm;
          },
          /**
           * update "value" (Array of Objects) by traversing all valid tags
           */
          updateValueByDOMTags() {
            this.value.length = 0;
            [].forEach.call(this.getTagElms(), (node) => {
              if (node.classList.contains(this.settings.classNames.tagNotAllowed.split(" ")[0]))
                return;
              this.value.push(getSetTagData(node));
            });
            this.update();
          },
          /**
           * injects nodes/text at caret position, which is saved on the "state" when "blur" event gets triggered
           * @param {Node} injectedNode [the node to inject at the caret position]
           * @param {Object} selection [optional range Object. must have "anchorNode" & "anchorOffset"]
           */
          injectAtCaret(injectedNode, range) {
            range = range || this.state.selection?.range;
            if (!range && injectedNode) {
              this.appendMixTags(injectedNode);
              return this;
            }
            injectAtCaret(injectedNode, range);
            this.setRangeAtStartEnd(false, injectedNode);
            this.updateValueByDOMTags();
            this.update();
            return this;
          },
          /**
           * input bridge for accessing & setting
           * @type {Object}
           */
          input: {
            set() {
              let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
              let updateDOM = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              var hideDropdown = this.settings.dropdown.closeOnSelect;
              this.state.inputText = s;
              if (updateDOM)
                this.DOM.input.innerHTML = escapeHTML("" + s);
              if (!s && hideDropdown)
                this.dropdown.hide.bind(this);
              this.input.autocomplete.suggest.call(this);
              this.input.validate.call(this);
            },
            raw() {
              return this.DOM.input.textContent;
            },
            /**
             * Marks the tagify's input as "invalid" if the value did not pass "validateTag()"
             */
            validate() {
              var isValid = !this.state.inputText || this.validateTag({
                value: this.state.inputText
              }) === true;
              this.DOM.input.classList.toggle(this.settings.classNames.inputInvalid, !isValid);
              return isValid;
            },
            // remove any child DOM elements that aren't of type TEXT (like <br>)
            normalize(node) {
              var clone = node || this.DOM.input, v = [];
              clone.childNodes.forEach((n) => n.nodeType == 3 && v.push(n.nodeValue));
              v = v.join("\n");
              try {
                v = v.replace(/(?:\r\n|\r|\n)/g, this.settings.delimiters.source.charAt(0));
              } catch (err) {
              }
              v = v.replace(/\s/g, " ");
              return this.trim(v);
            },
            /**
             * suggest the rest of the input's value (via CSS "::after" using "content:attr(...)")
             * @param  {String} s [description]
             */
            autocomplete: {
              suggest(data) {
                if (!this.settings.autoComplete.enabled)
                  return;
                data = data || {
                  value: ""
                };
                if (typeof data == "string")
                  data = {
                    value: data
                  };
                var suggestedText = this.dropdown.getMappedValue(data);
                if (typeof suggestedText === "number")
                  return;
                var suggestionStart = suggestedText.substr(0, this.state.inputText.length).toLowerCase(), suggestionTrimmed = suggestedText.substring(this.state.inputText.length);
                if (!suggestedText || !this.state.inputText || suggestionStart != this.state.inputText.toLowerCase()) {
                  this.DOM.input.removeAttribute("data-suggest");
                  delete this.state.inputSuggestion;
                } else {
                  this.DOM.input.setAttribute("data-suggest", suggestionTrimmed);
                  this.state.inputSuggestion = data;
                }
              },
              /**
               * sets the suggested text as the input's value & cleanup the suggestion autocomplete.
               * @param {String} s [text]
               */
              set(s) {
                var dataSuggest = this.DOM.input.getAttribute("data-suggest"), suggestion = s || (dataSuggest ? this.state.inputText + dataSuggest : null);
                if (suggestion) {
                  if (this.settings.mode == "mix") {
                    this.replaceTextWithNode(document.createTextNode(this.state.tag.prefix + suggestion));
                  } else {
                    this.input.set.call(this, suggestion);
                    this.setRangeAtStartEnd(false, this.DOM.input);
                  }
                  this.input.autocomplete.suggest.call(this);
                  this.dropdown.hide();
                  return true;
                }
                return false;
              }
            }
          },
          /**
           * returns the index of the the tagData within the "this.value" array collection.
           * since values should be unique, it is suffice to only search by "value" property
           * @param {Object} tagData
           */
          getTagIdx(tagData) {
            return this.value.findIndex((item) => item.__tagId == (tagData || {}).__tagId);
          },
          getNodeIndex(node) {
            var index = 0;
            if (node)
              while (node = node.previousElementSibling)
                index++;
            return index;
          },
          getTagElms() {
            for (var _len = arguments.length, classess = new Array(_len), _key = 0; _key < _len; _key++) {
              classess[_key] = arguments[_key];
            }
            var classname = "." + [...this.settings.classNames.tag.split(" "), ...classess].join(".");
            return [].slice.call(this.DOM.scope.querySelectorAll(classname));
          },
          /**
           * gets the last non-readonly, not-in-the-proccess-of-removal tag
           */
          getLastTag() {
            var lastTag = this.DOM.scope.querySelectorAll(`${this.settings.classNames.tagSelector}:not(.${this.settings.classNames.tagHide}):not([readonly])`);
            return lastTag[lastTag.length - 1];
          },
          /**
           * Searches if any tag with a certain value already exis
           * @param  {String/Object} value [text value / tag data object]
           * @param  {Boolean} caseSensitive
           * @return {Number}
           */
          isTagDuplicate(value, caseSensitive, tagId) {
            var dupsCount = 0, _s = this.settings;
            if (_s.mode == "select")
              return false;
            for (let item of this.value) {
              let isSameStr = sameStr(this.trim("" + value), item.value, caseSensitive);
              if (isSameStr && tagId != item.__tagId)
                dupsCount++;
            }
            return dupsCount;
          },
          getTagIndexByValue(value) {
            var indices = [], isCaseSensitive = this.settings.dropdown.caseSensitive;
            this.getTagElms().forEach((tagElm, i) => {
              if (tagElm.__tagifyTagData && sameStr(this.trim(tagElm.__tagifyTagData.value), value, isCaseSensitive))
                indices.push(i);
            });
            return indices;
          },
          getTagElmByValue(value) {
            var tagIdx = this.getTagIndexByValue(value)[0];
            return this.getTagElms()[tagIdx];
          },
          /**
           * Temporarily marks a tag element (by value or Node argument)
           * @param  {Object} tagElm [a specific "tag" element to compare to the other tag elements siblings]
           */
          flashTag(tagElm) {
            if (tagElm) {
              tagElm.classList.add(this.settings.classNames.tagFlash);
              setTimeout(() => {
                tagElm.classList.remove(this.settings.classNames.tagFlash);
              }, 100);
            }
          },
          /**
           * checks if text is in the blacklist
           */
          isTagBlacklisted(v) {
            v = this.trim(v.toLowerCase());
            return this.settings.blacklist.filter((x) => ("" + x).toLowerCase() == v).length;
          },
          /**
           * checks if text is in the whitelist
           */
          isTagWhitelisted(v) {
            return !!this.getWhitelistItem(v);
          },
          /**
           * Returns the first whitelist item matched, by value (if match found)
           * @param {String} value [text to match by]
           */
          getWhitelistItem(value, prop, whitelist) {
            var result, prop = prop || "value", _s = this.settings, whitelist = whitelist || _s.whitelist;
            whitelist.some((_wi) => {
              var _wiv = typeof _wi == "string" ? _wi : _wi[prop] || _wi.value, isSameStr = sameStr(_wiv, value, _s.dropdown.caseSensitive, _s.trim);
              if (isSameStr) {
                result = typeof _wi == "string" ? {
                  value: _wi
                } : _wi;
                return true;
              }
            });
            if (!result && prop == "value" && _s.tagTextProp != "value") {
              result = this.getWhitelistItem(value, _s.tagTextProp, whitelist);
            }
            return result;
          },
          /**
           * validate a tag object BEFORE the actual tag will be created & appeneded
           * @param  {String} s
           * @param  {String} uid      [unique ID, to not inclue own tag when cheking for duplicates]
           * @return {Boolean/String}  ["true" if validation has passed, String for a fail]
           */
          validateTag(tagData) {
            var _s = this.settings, prop = "value" in tagData ? "value" : _s.tagTextProp, v = this.trim(tagData[prop] + "");
            if (!(tagData[prop] + "").trim())
              return this.TEXTS.empty;
            if (_s.mode != "mix" && _s.pattern && _s.pattern instanceof RegExp && !_s.pattern.test(v))
              return this.TEXTS.pattern;
            if (!_s.duplicates && this.isTagDuplicate(v, _s.dropdown.caseSensitive, tagData.__tagId))
              return this.TEXTS.duplicate;
            if (this.isTagBlacklisted(v) || _s.enforceWhitelist && !this.isTagWhitelisted(v))
              return this.TEXTS.notAllowed;
            if (_s.validate)
              return _s.validate(tagData);
            return true;
          },
          getInvalidTagAttrs(tagData, validation) {
            return {
              "aria-invalid": true,
              "class": `${tagData.class || ""} ${this.settings.classNames.tagNotAllowed}`.trim(),
              "title": validation
            };
          },
          hasMaxTags() {
            return this.value.length >= this.settings.maxTags ? this.TEXTS.exceed : false;
          },
          setReadonly(toggle, attrribute) {
            var _s = this.settings;
            document.activeElement.blur();
            _s[attrribute || "readonly"] = toggle;
            this.DOM.scope[(toggle ? "set" : "remove") + "Attribute"](attrribute || "readonly", true);
            this.settings.userInput = true;
            this.setContentEditable(!toggle);
          },
          setContentEditable(state) {
            if (!this.settings.userInput)
              return;
            this.DOM.input.contentEditable = state;
            this.DOM.input.tabIndex = !!state ? 0 : -1;
          },
          setDisabled(isDisabled) {
            this.setReadonly(isDisabled, "disabled");
          },
          /**
           * pre-proccess the tagsItems, which can be a complex tagsItems like an Array of Objects or a string comprised of multiple words
           * so each item should be iterated on and a tag created for.
           * @return {Array} [Array of Objects]
           */
          normalizeTags(tagsItems) {
            var _this$settings = this.settings, whitelist = _this$settings.whitelist, delimiters = _this$settings.delimiters, mode = _this$settings.mode, tagTextProp = _this$settings.tagTextProp, whitelistMatches = [], whitelistWithProps = whitelist ? whitelist[0] instanceof Object : false, isArray = Array.isArray(tagsItems), isCollection = isArray && tagsItems[0].value, mapStringToCollection = (s) => (s + "").split(delimiters).filter((n) => n).map((v) => ({
              [tagTextProp]: this.trim(v),
              value: this.trim(v)
            }));
            if (typeof tagsItems == "number")
              tagsItems = tagsItems.toString();
            if (typeof tagsItems == "string") {
              if (!tagsItems.trim())
                return [];
              tagsItems = mapStringToCollection(tagsItems);
            } else if (isArray) {
              tagsItems = [].concat(...tagsItems.map((item) => item.value != void 0 ? item : mapStringToCollection(item)));
            }
            if (whitelistWithProps && !isCollection) {
              tagsItems.forEach((item) => {
                var whitelistMatchesValues = whitelistMatches.map((a) => a.value);
                var filteredList = this.dropdown.filterListItems.call(this, item[tagTextProp], {
                  exact: true
                });
                if (!this.settings.duplicates)
                  filteredList = filteredList.filter((filteredItem) => !whitelistMatchesValues.includes(filteredItem.value));
                var matchObj = filteredList.length > 1 ? this.getWhitelistItem(item[tagTextProp], tagTextProp, filteredList) : filteredList[0];
                if (matchObj && matchObj instanceof Object) {
                  whitelistMatches.push(matchObj);
                } else if (mode != "mix") {
                  if (item.value == void 0)
                    item.value = item[tagTextProp];
                  whitelistMatches.push(item);
                }
              });
              if (whitelistMatches.length)
                tagsItems = whitelistMatches;
            }
            return tagsItems;
          },
          /**
           * Parse the initial value of a textarea (or input) element and generate mixed text w/ tags
           * https://stackoverflow.com/a/57598892/104380
           * @param {String} s
           */
          parseMixTags(s) {
            var _this$settings2 = this.settings, mixTagsInterpolator = _this$settings2.mixTagsInterpolator, duplicates = _this$settings2.duplicates, transformTag = _this$settings2.transformTag, enforceWhitelist = _this$settings2.enforceWhitelist, maxTags = _this$settings2.maxTags, tagTextProp = _this$settings2.tagTextProp, tagsDataSet = [];
            s = s.split(mixTagsInterpolator[0]).map((s1, i) => {
              var s2 = s1.split(mixTagsInterpolator[1]), preInterpolated = s2[0], maxTagsReached = tagsDataSet.length == maxTags, textProp, tagData, tagElm;
              try {
                if (preInterpolated == +preInterpolated)
                  throw Error;
                tagData = JSON.parse(preInterpolated);
              } catch (err) {
                tagData = this.normalizeTags(preInterpolated)[0] || {
                  value: preInterpolated
                };
              }
              transformTag.call(this, tagData);
              if (!maxTagsReached && s2.length > 1 && (!enforceWhitelist || this.isTagWhitelisted(tagData.value)) && !(!duplicates && this.isTagDuplicate(tagData.value))) {
                textProp = tagData[tagTextProp] ? tagTextProp : "value";
                tagData[textProp] = this.trim(tagData[textProp]);
                tagElm = this.createTagElem(tagData);
                tagsDataSet.push(tagData);
                tagElm.classList.add(this.settings.classNames.tagNoAnimation);
                s2[0] = tagElm.outerHTML;
                this.value.push(tagData);
              } else if (s1)
                return i ? mixTagsInterpolator[0] + s1 : s1;
              return s2.join("");
            }).join("");
            this.DOM.input.innerHTML = s;
            this.DOM.input.appendChild(document.createTextNode(""));
            this.DOM.input.normalize();
            var tagNodes = this.getTagElms();
            tagNodes.forEach((elm, idx) => getSetTagData(elm, tagsDataSet[idx]));
            this.update({
              withoutChangeEvent: true
            });
            fixCaretBetweenTags(tagNodes, this.state.hasFocus);
            return s;
          },
          /**
           * For mixed-mode: replaces a text starting with a prefix with a wrapper element (tag or something)
           * First there *has* to be a "this.state.tag" which is a string that was just typed and is staring with a prefix
           */
          replaceTextWithNode(newWrapperNode, strToReplace) {
            if (!this.state.tag && !strToReplace)
              return;
            strToReplace = strToReplace || this.state.tag.prefix + this.state.tag.value;
            var idx, nodeToReplace, selection = this.state.selection || window.getSelection(), nodeAtCaret = selection.anchorNode, firstSplitOffset = this.state.tag.delimiters ? this.state.tag.delimiters.length : 0;
            nodeAtCaret.splitText(selection.anchorOffset - firstSplitOffset);
            idx = nodeAtCaret.nodeValue.lastIndexOf(strToReplace);
            if (idx == -1)
              return true;
            nodeToReplace = nodeAtCaret.splitText(idx);
            newWrapperNode && nodeAtCaret.parentNode.replaceChild(newWrapperNode, nodeToReplace);
            return true;
          },
          /**
           * For selecting a single option (not used for multiple tags, but for "mode:select" only)
           * @param {Object} tagElm   Tag DOM node
           * @param {Object} tagData  Tag data
           */
          selectTag(tagElm, tagData) {
            var _s = this.settings;
            if (_s.enforceWhitelist && !this.isTagWhitelisted(tagData.value))
              return;
            this.input.set.call(this, tagData[_s.tagTextProp] || tagData.value, true);
            if (this.state.actions.selectOption)
              setTimeout(() => this.setRangeAtStartEnd(false, this.DOM.input));
            var lastTagElm = this.getLastTag();
            if (lastTagElm)
              this.replaceTag(lastTagElm, tagData);
            else
              this.appendTag(tagElm);
            this.value[0] = tagData;
            this.update();
            this.trigger("add", {
              tag: tagElm,
              data: tagData
            });
            return [tagElm];
          },
          /**
           * add an empty "tag" element in an editable state
           */
          addEmptyTag(initialData) {
            var tagData = extend({
              value: ""
            }, initialData || {}), tagElm = this.createTagElem(tagData);
            getSetTagData(tagElm, tagData);
            this.appendTag(tagElm);
            this.editTag(tagElm, {
              skipValidation: true
            });
          },
          /**
           * add a "tag" element to the "tags" component
           * @param {String/Array} tagsItems   [A string (single or multiple values with a delimiter), or an Array of Objects or just Array of Strings]
           * @param {Boolean}      clearInput  [flag if the input's value should be cleared after adding tags]
           * @param {Boolean}      skipInvalid [do not add, mark & remove invalid tags]
           * @return {Array} Array of DOM elements (tags)
           */
          addTags(tagsItems, clearInput, skipInvalid) {
            var tagElems = [], _s = this.settings, aggregatedinvalidInput = [], frag = document.createDocumentFragment();
            skipInvalid = skipInvalid || _s.skipInvalid;
            if (!tagsItems || tagsItems.length == 0) {
              return tagElems;
            }
            tagsItems = this.normalizeTags(tagsItems);
            switch (_s.mode) {
              case "mix":
                return this.addMixTags(tagsItems);
              case "select": {
                clearInput = false;
                this.removeAllTags();
              }
            }
            this.DOM.input.removeAttribute("style");
            tagsItems.forEach((tagData) => {
              var tagElm, tagElmParams = {}, originalData = Object.assign({}, tagData, {
                value: tagData.value + ""
              });
              tagData = Object.assign({}, originalData);
              _s.transformTag.call(this, tagData);
              tagData.__isValid = this.hasMaxTags() || this.validateTag(tagData);
              if (tagData.__isValid !== true) {
                if (skipInvalid)
                  return;
                extend(tagElmParams, this.getInvalidTagAttrs(tagData, tagData.__isValid), {
                  __preInvalidData: originalData
                });
                if (tagData.__isValid == this.TEXTS.duplicate)
                  this.flashTag(this.getTagElmByValue(tagData.value));
                if (!_s.createInvalidTags) {
                  aggregatedinvalidInput.push(tagData.value);
                  return;
                }
              }
              if ("readonly" in tagData) {
                if (tagData.readonly)
                  tagElmParams["aria-readonly"] = true;
                else
                  delete tagData.readonly;
              }
              tagElm = this.createTagElem(tagData, tagElmParams);
              tagElems.push(tagElm);
              if (_s.mode == "select") {
                return this.selectTag(tagElm, tagData);
              }
              frag.appendChild(tagElm);
              if (tagData.__isValid && tagData.__isValid === true) {
                this.value.push(tagData);
                this.trigger("add", {
                  tag: tagElm,
                  index: this.value.length - 1,
                  data: tagData
                });
              } else {
                this.trigger("invalid", {
                  data: tagData,
                  index: this.value.length,
                  tag: tagElm,
                  message: tagData.__isValid
                });
                if (!_s.keepInvalidTags)
                  setTimeout(() => this.removeTags(tagElm, true), 1e3);
              }
              this.dropdown.position();
            });
            this.appendTag(frag);
            this.update();
            if (tagsItems.length && clearInput) {
              this.input.set.call(this, _s.createInvalidTags ? "" : aggregatedinvalidInput.join(_s._delimiters));
              this.setRangeAtStartEnd(false, this.DOM.input);
            }
            _s.dropdown.enabled && this.dropdown.refilter();
            return tagElems;
          },
          /**
           * Adds a mix-content tag
           * @param {String/Array} tagData    A string (single or multiple values with a delimiter), or an Array of Objects or just Array of Strings
           */
          addMixTags(tagsData) {
            tagsData = this.normalizeTags(tagsData);
            if (tagsData[0].prefix || this.state.tag) {
              return this.prefixedTextToTag(tagsData[0]);
            }
            var frag = document.createDocumentFragment();
            tagsData.forEach((tagData) => {
              var tagElm = this.createTagElem(tagData);
              frag.appendChild(tagElm);
            });
            this.appendMixTags(frag);
            return frag;
          },
          appendMixTags(node) {
            var selection = !!this.state.selection;
            if (selection) {
              this.injectAtCaret(node);
            } else {
              this.DOM.input.focus();
              selection = this.setStateSelection();
              selection.range.setStart(this.DOM.input, selection.range.endOffset);
              selection.range.setEnd(this.DOM.input, selection.range.endOffset);
              this.DOM.input.appendChild(node);
              this.updateValueByDOMTags();
              this.update();
            }
          },
          /**
           * Adds a tag which was activly typed by the user
           * @param {String/Array} tagItem   [A string (single or multiple values with a delimiter), or an Array of Objects or just Array of Strings]
           */
          prefixedTextToTag(tagItem) {
            var _s = this.settings, tagElm, createdFromDelimiters = this.state.tag.delimiters;
            _s.transformTag.call(this, tagItem);
            tagItem.prefix = tagItem.prefix || this.state.tag ? this.state.tag.prefix : (_s.pattern.source || _s.pattern)[0];
            tagElm = this.createTagElem(tagItem);
            if (!this.replaceTextWithNode(tagElm)) {
              this.DOM.input.appendChild(tagElm);
            }
            setTimeout(() => tagElm.classList.add(this.settings.classNames.tagNoAnimation), 300);
            this.value.push(tagItem);
            this.update();
            if (!createdFromDelimiters) {
              var elm = this.insertAfterTag(tagElm) || tagElm;
              setTimeout(placeCaretAfterNode, 0, elm);
            }
            this.state.tag = null;
            this.trigger("add", extend({}, {
              tag: tagElm
            }, {
              data: tagItem
            }));
            return tagElm;
          },
          /**
           * appened (validated) tag to the component's DOM scope
           */
          appendTag(tagElm) {
            var DOM = this.DOM, insertBeforeNode = DOM.input;
            DOM.scope.insertBefore(tagElm, insertBeforeNode);
          },
          /**
           * creates a DOM tag element and injects it into the component (this.DOM.scope)
           * @param  {Object}  tagData [text value & properties for the created tag]
           * @param  {Object}  extraData [properties which are for the HTML template only]
           * @return {Object} [DOM element]
           */
          createTagElem(tagData, extraData) {
            tagData.__tagId = getUID();
            var tagElm, templateData = extend({}, tagData, _objectSpread2({
              value: escapeHTML(tagData.value + "")
            }, extraData));
            tagElm = this.parseTemplate("tag", [templateData, this]);
            removeTextChildNodes(tagElm);
            getSetTagData(tagElm, tagData);
            return tagElm;
          },
          /**
           * re-check all invalid tags.
           * called after a tag was edited or removed
           */
          reCheckInvalidTags() {
            var _s = this.settings;
            this.getTagElms(_s.classNames.tagNotAllowed).forEach((tagElm, i) => {
              var tagData = getSetTagData(tagElm), hasMaxTags = this.hasMaxTags(), tagValidation = this.validateTag(tagData), isValid = tagValidation === true && !hasMaxTags;
              if (_s.mode == "select")
                this.toggleScopeValidation(tagValidation);
              if (isValid) {
                tagData = tagData.__preInvalidData ? tagData.__preInvalidData : {
                  value: tagData.value
                };
                return this.replaceTag(tagElm, tagData);
              }
              tagElm.title = hasMaxTags || tagValidation;
            });
          },
          /**
           * Removes a tag
           * @param  {Array|Node|String}  tagElms         [DOM element(s) or a String value. if undefined or null, remove last added tag]
           * @param  {Boolean}            silent          [A flag, which when turned on, does not remove any value and does not update the original input value but simply removes the tag from tagify]
           * @param  {Number}             tranDuration    [Transition duration in MS]
           * TODO: Allow multiple tags to be removed at-once
           */
          removeTags(tagElms, silent, tranDuration) {
            var tagsToRemove, _s = this.settings;
            tagElms = tagElms && tagElms instanceof HTMLElement ? [tagElms] : tagElms instanceof Array ? tagElms : tagElms ? [tagElms] : [this.getLastTag()];
            tagsToRemove = tagElms.reduce((elms, tagElm) => {
              if (tagElm && typeof tagElm == "string")
                tagElm = this.getTagElmByValue(tagElm);
              var tagData = getSetTagData(tagElm);
              if (tagElm && tagData && !tagData.readonly)
                elms.push({
                  node: tagElm,
                  idx: this.getTagIdx(tagData),
                  // this.getNodeIndex(tagElm); // this.getTagIndexByValue(tagElm.textContent)
                  data: getSetTagData(tagElm, {
                    "__removed": true
                  })
                });
              return elms;
            }, []);
            tranDuration = typeof tranDuration == "number" ? tranDuration : this.CSSVars.tagHideTransition;
            if (_s.mode == "select") {
              tranDuration = 0;
              this.input.set.call(this);
            }
            if (tagsToRemove.length == 1 && _s.mode != "select") {
              if (tagsToRemove[0].node.classList.contains(_s.classNames.tagNotAllowed))
                silent = true;
            }
            if (!tagsToRemove.length)
              return;
            return _s.hooks.beforeRemoveTag(tagsToRemove, {
              tagify: this
            }).then(() => {
              function removeNode(tag) {
                if (!tag.node.parentNode)
                  return;
                tag.node.parentNode.removeChild(tag.node);
                if (!silent) {
                  this.trigger("remove", {
                    tag: tag.node,
                    index: tag.idx,
                    data: tag.data
                  });
                  this.dropdown.refilter();
                  this.dropdown.position();
                  this.DOM.input.normalize();
                  if (_s.keepInvalidTags)
                    this.reCheckInvalidTags();
                } else if (_s.keepInvalidTags)
                  this.trigger("remove", {
                    tag: tag.node,
                    index: tag.idx
                  });
              }
              function animation(tag) {
                tag.node.style.width = parseFloat(window.getComputedStyle(tag.node).width) + "px";
                document.body.clientTop;
                tag.node.classList.add(_s.classNames.tagHide);
                setTimeout(removeNode.bind(this), tranDuration, tag);
              }
              if (tranDuration && tranDuration > 10 && tagsToRemove.length == 1)
                animation.call(this, tagsToRemove[0]);
              else
                tagsToRemove.forEach(removeNode.bind(this));
              if (!silent) {
                this.removeTagsFromValue(tagsToRemove.map((tag) => tag.node));
                this.update();
                if (_s.mode == "select")
                  this.setContentEditable(true);
              }
            }).catch((reason) => {
            });
          },
          removeTagsFromDOM() {
            [].slice.call(this.getTagElms()).forEach((elm) => elm.parentNode.removeChild(elm));
          },
          /**
           * @param {Array/Node} tags to be removed from the this.value array
           */
          removeTagsFromValue(tags) {
            tags = Array.isArray(tags) ? tags : [tags];
            tags.forEach((tag) => {
              var tagData = getSetTagData(tag), tagIdx = this.getTagIdx(tagData);
              if (tagIdx > -1)
                this.value.splice(tagIdx, 1);
            });
          },
          removeAllTags(opts) {
            opts = opts || {};
            this.value = [];
            if (this.settings.mode == "mix")
              this.DOM.input.innerHTML = "";
            else
              this.removeTagsFromDOM();
            this.dropdown.refilter();
            this.dropdown.position();
            if (this.state.dropdown.visible)
              setTimeout(() => {
                this.DOM.input.focus();
              });
            if (this.settings.mode == "select") {
              this.input.set.call(this);
              this.setContentEditable(true);
            }
            this.update(opts);
          },
          postUpdate() {
            this.state.blockChangeEvent = false;
            var _s = this.settings, classNames = _s.classNames, hasValue = _s.mode == "mix" ? _s.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value.trim() : this.value.length + this.input.raw.call(this).length;
            this.toggleClass(classNames.hasMaxTags, this.value.length >= _s.maxTags);
            this.toggleClass(classNames.hasNoTags, !this.value.length);
            this.toggleClass(classNames.empty, !hasValue);
            if (_s.mode == "select") {
              this.toggleScopeValidation(this.value?.[0]?.__isValid);
            }
          },
          setOriginalInputValue(v) {
            var inputElm = this.DOM.originalInput;
            if (!this.settings.mixMode.integrated) {
              inputElm.value = v;
              inputElm.tagifyValue = inputElm.value;
              this.setPersistedData(v, "value");
            }
          },
          /**
           * update the origianl (hidden) input field's value
           * see - https://stackoverflow.com/q/50957841/104380
           */
          update(args) {
            const UPDATE_DELAY = 100;
            clearTimeout(this.debouncedUpdateTimeout);
            this.debouncedUpdateTimeout = setTimeout(reallyUpdate.bind(this), UPDATE_DELAY);
            function reallyUpdate() {
              var inputValue = this.getInputValue();
              this.setOriginalInputValue(inputValue);
              if ((!this.settings.onChangeAfterBlur || !(args || {}).withoutChangeEvent) && !this.state.blockChangeEvent)
                this.triggerChangeEvent();
              this.postUpdate();
            }
          },
          getInputValue() {
            var value = this.getCleanValue();
            return this.settings.mode == "mix" ? this.getMixedTagsAsString(value) : value.length ? this.settings.originalInputValueFormat ? this.settings.originalInputValueFormat(value) : JSON.stringify(value) : "";
          },
          /**
           * removes properties from `this.value` which are only used internally
           */
          getCleanValue(v) {
            return removeCollectionProp(v || this.value, this.dataProps);
          },
          getMixedTagsAsString() {
            var result = "", that = this, _s = this.settings, originalInputValueFormat = _s.originalInputValueFormat || JSON.stringify, _interpolator = _s.mixTagsInterpolator;
            function iterateChildren(rootNode) {
              rootNode.childNodes.forEach((node) => {
                if (node.nodeType == 1) {
                  const tagData = getSetTagData(node);
                  if (node.tagName == "BR") {
                    result += "\r\n";
                  }
                  if (tagData && isNodeTag.call(that, node)) {
                    if (tagData.__removed)
                      return;
                    else
                      result += _interpolator[0] + originalInputValueFormat(omit(tagData, that.dataProps)) + _interpolator[1];
                  } else if (node.getAttribute("style") || ["B", "I", "U"].includes(node.tagName))
                    result += node.textContent;
                  else if (node.tagName == "DIV" || node.tagName == "P") {
                    result += "\r\n";
                    iterateChildren(node);
                  }
                } else
                  result += node.textContent;
              });
            }
            iterateChildren(this.DOM.input);
            return result;
          }
        };
        Tagify2.prototype.removeTag = Tagify2.prototype.removeTags;
        return Tagify2;
      });
    }
  });

  // src/ts/index.ts
  var import_tagify = __toESM(require_tagify());

  // src/ts/main_initial.json
  var main_initial_default = {
    kind: "books#volumes",
    totalItems: 10,
    items: [
      {
        kind: "books#volume",
        id: "sCxaDwAAQBAJ",
        etag: "cyJUwV28j0Y",
        selfLink: "https://www.googleapis.com/books/v1/volumes/sCxaDwAAQBAJ",
        volumeInfo: {
          title: "Diadem: Selected Poems",
          authors: [
            "Marosa di Giorgio"
          ],
          publisher: "BOA Editions, Ltd.",
          publishedDate: "2012-10-16",
          description: `Marosa di Giorgio has one of the most distinct and recognizable voices in Latin American poetry. Her surreal and fable-like prose poems invite comparison to Franz Kafka, Julio Cort\xE1zar, or even contemporary American poets Russell Edson and Charles Simic. But di Giorgio's voice, imagery, and themes\u2014childhood, the Uruguayan countryside, a perception of the sacred\u2014are her own. Previously written off as "the mad woman of Uruguayan letters," di Giorgio's reputation has blossomed in recent years. Translator Adam Giannelli's careful selection of poems spans the enormous output of di Giorgio's career to help further introduce English-language readers to this vibrant and original voice. Marosa di Giorgio was born in Salto, Uruguay, in 1932. Her first book Poemas was published in 1953. Also a theater actress, she moved to Montevideo in 1978, where she lived until her death in 2004.`,
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9781934414989"
            },
            {
              type: "ISBN_10",
              identifier: "1934414980"
            }
          ],
          readingModes: {
            text: true,
            image: true
          },
          pageCount: 170,
          printType: "BOOK",
          categories: [
            "Poetry"
          ],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "1.1.2.0.preview.3",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=sCxaDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=sCxaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=sCxaDwAAQBAJ&printsec=frontcover&dq=inauthor:marosa+di+giorgio&hl=&cd=1&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=sCxaDwAAQBAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/Diadem_Selected_Poems.html?hl=&id=sCxaDwAAQBAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true,
            acsTokenLink: "http://books.google.cl/books/download/Diadem_Selected_Poems-sample-epub.acsm?id=sCxaDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          pdf: {
            isAvailable: true,
            acsTokenLink: "http://books.google.cl/books/download/Diadem_Selected_Poems-sample-pdf.acsm?id=sCxaDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          webReaderLink: "http://play.google.com/books/reader?id=sCxaDwAAQBAJ&hl=&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "Marosa di Giorgio has one of the most distinct and recognizable voices in Latin American poetry."
        }
      },
      {
        kind: "books#volume",
        id: "fMHSAQAACAAJ",
        etag: "lEJlg+HBzco",
        selfLink: "https://www.googleapis.com/books/v1/volumes/fMHSAQAACAAJ",
        volumeInfo: {
          title: "I Remember Nightfall",
          authors: [
            "Marosa Di Giorgio"
          ],
          publishedDate: "2017",
          description: "Poetry. Latino/Latina Studies. Translated from the Spanish by Jeannine Pitas in a bilingual edition. Cover art by Basil King. This new translation of Marosa di Giorgio, one of Uruguay's most famous poets, includes four book-length poems from the middle of her career: The History of Violets (1965); Magnolia (1968); The War of the Orchards (1971); and The Native Garden is in Flames (1975). Occupying the same childhood landscapes that may be familiar to English-language readers from the previously published volume The History of Violets (Ugly Duckling Presse, 2010), these serial prose poems explore memory, familial relationships, erotic desire, and war. Marosa di Giorgio uses the recurring setting of a garden as a stage for the ongoing encounter of nature and the supernatural.",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "1937027597"
            },
            {
              type: "ISBN_13",
              identifier: "9781937027599"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 0,
          printType: "BOOK",
          categories: [
            "Prose poems, Spanish"
          ],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=fMHSAQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=fMHSAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=fMHSAQAACAAJ&dq=inauthor:marosa+di+giorgio&hl=&cd=2&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=fMHSAQAACAAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/I_Remember_Nightfall.html?hl=&id=fMHSAQAACAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=fMHSAQAACAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "Occupying the same childhood landscapes that may be familiar to English-language readers from the previously published volume The History of Violets (Ugly Duckling Presse, 2010), these serial prose poems explore memory, familial ..."
        }
      },
      {
        kind: "books#volume",
        id: "TD1VMQAACAAJ",
        etag: "4PYuXjb9k0I",
        selfLink: "https://www.googleapis.com/books/v1/volumes/TD1VMQAACAAJ",
        volumeInfo: {
          title: "POEMS OF OLGA OROZCO MAROSA DI",
          authors: [
            "Olga Orozco Marosa Di Giorgio",
            "Jorge Palma"
          ],
          publisher: "Americas Poetry",
          publishedDate: "2017-02-01",
          description: "This first volume in Vagabond's new Americas series brings together three poets from South America spanning three different generations, each with a distinct voice and a unique world to explore.",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "1922181803"
            },
            {
              type: "ISBN_13",
              identifier: "9781922181800"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 152,
          printType: "BOOK",
          categories: [
            "Poetry"
          ],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=TD1VMQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=TD1VMQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=TD1VMQAACAAJ&dq=inauthor:marosa+di+giorgio&hl=&cd=3&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=TD1VMQAACAAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/POEMS_OF_OLGA_OROZCO_MAROSA_DI.html?hl=&id=TD1VMQAACAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=TD1VMQAACAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "This first volume in Vagabond&#39;s new Americas series brings together three poets from South America spanning three different generations, each with a distinct voice and a unique world to explore: Olga Orozco, Marosa di Giorgio and Jorge ..."
        }
      },
      {
        kind: "books#volume",
        id: "WaEIzgEACAAJ",
        etag: "m7/lKFA2+1c",
        selfLink: "https://www.googleapis.com/books/v1/volumes/WaEIzgEACAAJ",
        volumeInfo: {
          title: "Carnation and Tenebrae Candle",
          authors: [
            "Marosa di Giorgio"
          ],
          publishedDate: "2020-11-02",
          description: `Poetry. Latinx Studies. Women's Studies. Translated by Jeannine Marie Pitas. "This new collection by Marosa di Giorgio, long considered a major figure in Latin American literature, is the work of a translator who has immersed herself, with great thoughtfulness and dedication, in the life of a writer whose poetry is foreboding, mystical, dangerous and magnificent. Everywhere in di Giorgio's oeuvre, there are wars, crimes, monsters, possessed plants and animals, ghosts, illnesses and miracles animating a world that is always on the verge of explosion. Di Giorgio's writing is as foreboding as it is tentacular, as intricate as it is unsettling. Jeannine Marie Pitas' ongoing and remarkable engagement with di Giorgio has brought us an exciting and valuable gift."--Daniel Borzutzky "'It seemed as if everything was coming to an end,' writes Marosa di Giorgio in the first section of CARNATION AND TENEBRAE CANDLE, preparing the reader for the wondrous and terrifying world of contradictions that will follow: a lush countryside filled with enormous hares and enchanted begonias, meals of rats and apples as well as a 'wheat field of stars,' where readers must constantly renegotiate the borders between the inanimate and the living, the living and the dead. Even the most familiar relations transform until a father becomes the 'Chosen One' as well as 'an Oak Tree of Fine Understanding,' and a mother can be both savior to and the victim of her daughter. There are ghosts and 'war storms,' rapes and resurrections in a location both unmappable and as recognizable as the first prayers whispered from the mouth of a child who cannot possibly understand them. But there's nothing na\xEFve about di Giorgio's work, and no other voice that sounds quite like hers. '[J]ust as I was walking among the eucalyptus apothecaries, at that time when the walls become filled with stars,' di Giorgio writes, 'I saw the language, and I immediately understood it, as if it had always been my own.' Jeannine Marie Pitas's English translations have helped bring this Uruguayan writer to a new audience. CARNATION AND TENEBRAE CANDLE will continue to solidify di Giorgio as a major voice from Latin America."--Susan Briante "In di Giorgio's childhood Salto, a wide-ranging and ever-vibrant flora and fauna nourished the memories she'd draw on for her work's extraordinary transfigurations. Eggs, insects, and reptiles exit or enter the body, either being born or invading the body's depths, generating an intense and shocking pleasure. Despite her Italian background, she affirms her belonging to an ancestral earth, to an indigenous enclave that nourishes her: she paints herself as 'a native princess under her anacahuita tree.' Bringing this landscape to life became a task of joy and responsibility for di Giorgio, her own unique mission, and one which she devoted herself to with passion and perseverance."--Roberto Echavarren "Marosa di Giorgio's CARNATION AND TENEBRAE CANDLE is a complex world, where the present and past coexist, where animals and plants are humanized, and where the oneiric, the real, and the magical operate on the same plane, guided by an immersive, surrealist rhythm."--Laura Cesarco Eglin`,
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "1945720212"
            },
            {
              type: "ISBN_13",
              identifier: "9781945720215"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 126,
          printType: "BOOK",
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=WaEIzgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=WaEIzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=WaEIzgEACAAJ&dq=inauthor:marosa+di+giorgio&hl=&cd=4&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=WaEIzgEACAAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/Carnation_and_Tenebrae_Candle.html?hl=&id=WaEIzgEACAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=WaEIzgEACAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "&quot;This new collection by Marosa di Giorgio, long considered a major figure in Latin American literature, is the work of a translator who has immersed herself, with great thoughtfulness and dedication, in the life of a writer whose poetry is ..."
        }
      },
      {
        kind: "books#volume",
        id: "oMJFAQAAIAAJ",
        etag: "AM49V3uooGQ",
        selfLink: "https://www.googleapis.com/books/v1/volumes/oMJFAQAAIAAJ",
        volumeInfo: {
          title: "The History of Violets",
          authors: [
            "Marosa Di Giorgio"
          ],
          publishedDate: "2010",
          description: `Originally published in 1965, The History of Violets (Historial de las violetas) twists the familiar face of a family farm, populating the fields and grounds with gods, monsters, and a whole "foamy army" of extras. Di Giorgio--whom Kent Johnson hails as "one of the most spectacular and strange Latin American poets of the past fifty years"--locks the natural and supernatural in a perilous dance, balancing humor and violence, beauty and danger, simple childhood memory and complex domestic drama. With disarming grace, these poems leave the reader swirling about, among the flowers, where no one is safe. "There's a lot at stake here, namely the opportunity for a new generation of American poets to take di Giorgio as a model for wresting the 'poetry of witness' away from humanism's easy faith in testimony and remembering that the imagination is the organ of compassion." --Farid Matuk`,
          industryIdentifiers: [
            {
              type: "OTHER",
              identifier: "STANFORD:36105217003875"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 92,
          printType: "BOOK",
          categories: [
            "Uruguayan poetry"
          ],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "0.3.1.0.preview.0",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=oMJFAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=oMJFAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=oMJFAQAAIAAJ&q=inauthor:marosa+di+giorgio&dq=inauthor:marosa+di+giorgio&hl=&cd=5&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=oMJFAQAAIAAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/The_History_of_Violets.html?hl=&id=oMJFAQAAIAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=oMJFAQAAIAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "Originally published in 1965, The History of Violets (Historial de las violetas) twists the familiar face of a family farm, populating the fields and grounds with gods, monsters, and a whole &quot;foamy army&quot; of extras."
        }
      },
      {
        kind: "books#volume",
        id: "ciymwCyn0T4C",
        etag: "oGaD7oVR8fY",
        selfLink: "https://www.googleapis.com/books/v1/volumes/ciymwCyn0T4C",
        volumeInfo: {
          title: "La flor de lis",
          authors: [
            "Marosa Di Giorgio"
          ],
          publisher: "El cuenco de plata",
          publishedDate: "2004",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "9872127468"
            },
            {
              type: "ISBN_13",
              identifier: "9789872127466"
            }
          ],
          readingModes: {
            text: false,
            image: true
          },
          pageCount: 136,
          printType: "BOOK",
          categories: [
            "Poetry"
          ],
          averageRating: 2,
          ratingsCount: 1,
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "0.2.4.0.preview.1",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=ciymwCyn0T4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=ciymwCyn0T4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "es",
          previewLink: "http://books.google.cl/books?id=ciymwCyn0T4C&printsec=frontcover&dq=inauthor:marosa+di+giorgio&hl=&cd=6&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=ciymwCyn0T4C&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/La_flor_de_lis.html?hl=&id=ciymwCyn0T4C"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: true,
            acsTokenLink: "http://books.google.cl/books/download/La_flor_de_lis-sample-pdf.acsm?id=ciymwCyn0T4C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          webReaderLink: "http://play.google.com/books/reader?id=ciymwCyn0T4C&hl=&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        }
      },
      {
        kind: "books#volume",
        id: "vGZlAAAAMAAJ",
        etag: "3hg/1f4JFNk",
        selfLink: "https://www.googleapis.com/books/v1/volumes/vGZlAAAAMAAJ",
        volumeInfo: {
          title: "Misales",
          subtitle: "relatos er\xF3ticos",
          authors: [
            "Marosa Di Giorgio"
          ],
          publisher: "El cuenco de plata",
          publishedDate: "2005",
          industryIdentifiers: [
            {
              type: "OTHER",
              identifier: "UOM:39015064895033"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 148,
          printType: "BOOK",
          categories: [
            "Erotic stories, Uruguayan"
          ],
          averageRating: 1,
          ratingsCount: 1,
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "0.4.3.0.preview.0",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=vGZlAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=vGZlAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "es",
          previewLink: "http://books.google.cl/books?id=vGZlAAAAMAAJ&q=inauthor:marosa+di+giorgio&dq=inauthor:marosa+di+giorgio&hl=&cd=7&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=vGZlAAAAMAAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/Misales.html?hl=&id=vGZlAAAAMAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=vGZlAAAAMAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        }
      },
      {
        kind: "books#volume",
        id: "V8neHAAACAAJ",
        etag: "h6QPG3ijzSI",
        selfLink: "https://www.googleapis.com/books/v1/volumes/V8neHAAACAAJ",
        volumeInfo: {
          title: "Magnolia",
          authors: [
            "Marosa Di Giorgio"
          ],
          publishedDate: "1965",
          industryIdentifiers: [
            {
              type: "OTHER",
              identifier: "OCLC:10482373"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 64,
          printType: "BOOK",
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          language: "es",
          previewLink: "http://books.google.cl/books?id=V8neHAAACAAJ&dq=inauthor:marosa+di+giorgio&hl=&cd=8&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=V8neHAAACAAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/Magnolia.html?hl=&id=V8neHAAACAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=V8neHAAACAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        }
      },
      {
        kind: "books#volume",
        id: "sCxaDwAAQBAJ",
        etag: "uzCm6E2wdII",
        selfLink: "https://www.googleapis.com/books/v1/volumes/sCxaDwAAQBAJ",
        volumeInfo: {
          title: "Diadem: Selected Poems",
          authors: [
            "Marosa di Giorgio"
          ],
          publisher: "BOA Editions, Ltd.",
          publishedDate: "2012-10-16",
          description: `Marosa di Giorgio has one of the most distinct and recognizable voices in Latin American poetry. Her surreal and fable-like prose poems invite comparison to Franz Kafka, Julio Cort\xE1zar, or even contemporary American poets Russell Edson and Charles Simic. But di Giorgio's voice, imagery, and themes\u2014childhood, the Uruguayan countryside, a perception of the sacred\u2014are her own. Previously written off as "the mad woman of Uruguayan letters," di Giorgio's reputation has blossomed in recent years. Translator Adam Giannelli's careful selection of poems spans the enormous output of di Giorgio's career to help further introduce English-language readers to this vibrant and original voice. Marosa di Giorgio was born in Salto, Uruguay, in 1932. Her first book Poemas was published in 1953. Also a theater actress, she moved to Montevideo in 1978, where she lived until her death in 2004.`,
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9781934414989"
            },
            {
              type: "ISBN_10",
              identifier: "1934414980"
            }
          ],
          readingModes: {
            text: true,
            image: true
          },
          pageCount: 170,
          printType: "BOOK",
          categories: [
            "Poetry"
          ],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "1.1.2.0.preview.3",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=sCxaDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=sCxaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=sCxaDwAAQBAJ&pg=PT19&dq=inauthor:marosa+di+giorgio&hl=&cd=9&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=sCxaDwAAQBAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/Diadem_Selected_Poems.html?hl=&id=sCxaDwAAQBAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true,
            acsTokenLink: "http://books.google.cl/books/download/Diadem_Selected_Poems-sample-epub.acsm?id=sCxaDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          pdf: {
            isAvailable: true,
            acsTokenLink: "http://books.google.cl/books/download/Diadem_Selected_Poems-sample-pdf.acsm?id=sCxaDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          webReaderLink: "http://play.google.com/books/reader?id=sCxaDwAAQBAJ&hl=&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "... <b>di Giorgio</b> and Edgardo Russo (Buenos Aires: El Cuenco de Plata, 2010), 40. 3. Ibid., 72. 4. C\xE9sar Aira, Diccionario de autores latinoamericanos, 174. 5. Marosa <b>di Giorgio</b>, No develar\xE1s el misterio, 41, 76. 6. Russell Edson, \u201CThe Prose&nbsp;..."
        }
      },
      {
        kind: "books#volume",
        id: "oMJFAQAAIAAJ",
        etag: "YD1v5kLoW7U",
        selfLink: "https://www.googleapis.com/books/v1/volumes/oMJFAQAAIAAJ",
        volumeInfo: {
          title: "The History of Violets",
          authors: [
            "Marosa Di Giorgio"
          ],
          publishedDate: "2010",
          description: `Originally published in 1965, The History of Violets (Historial de las violetas) twists the familiar face of a family farm, populating the fields and grounds with gods, monsters, and a whole "foamy army" of extras. Di Giorgio--whom Kent Johnson hails as "one of the most spectacular and strange Latin American poets of the past fifty years"--locks the natural and supernatural in a perilous dance, balancing humor and violence, beauty and danger, simple childhood memory and complex domestic drama. With disarming grace, these poems leave the reader swirling about, among the flowers, where no one is safe. "There's a lot at stake here, namely the opportunity for a new generation of American poets to take di Giorgio as a model for wresting the 'poetry of witness' away from humanism's easy faith in testimony and remembering that the imagination is the organ of compassion." --Farid Matuk`,
          industryIdentifiers: [
            {
              type: "OTHER",
              identifier: "STANFORD:36105217003875"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 92,
          printType: "BOOK",
          categories: [
            "Uruguayan poetry"
          ],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "0.3.1.0.preview.0",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=oMJFAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=oMJFAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=oMJFAQAAIAAJ&q=inauthor:marosa+di+giorgio&dq=inauthor:marosa+di+giorgio&hl=&cd=10&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=oMJFAQAAIAAJ&dq=inauthor:marosa+di+giorgio&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/The_History_of_Violets.html?hl=&id=oMJFAQAAIAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=oMJFAQAAIAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "Marosa <b>Di Giorgio</b>. Poetry $15.00 There is no doubt at this point that Marosa <b>di Giorgio</b> is one of the greatest Latin American writers of the twentieth century. Her work, which cuts across all genres, has opened up new avenues for poetry&nbsp;..."
        }
      },
      {
        kind: "books#volume",
        id: "IS17zdkCWysC",
        etag: "QhkpI1sM38Q",
        selfLink: "https://www.googleapis.com/books/v1/volumes/IS17zdkCWysC",
        volumeInfo: {
          title: "Fragmentos de la Vida, Lo que escribo, Cuento y Canto",
          authors: [
            "Rodrigo Antonio Navarro Fernandez"
          ],
          publisher: "Palibrio",
          publishedDate: "2012-06",
          description: "Es un compendio pluricultural art\xEDstico musical literario, que cuenta con pensamientos, poes\xEDas, canciones y cinco historias que cuento, en este trabajo literario, haciendo una recopilaci\xF3n de canciones escritas y difundidas en el trascurrir de mi vida, como m\xFAsico, cantante, compositor, educador, abogado y defensor de los derechos humanos; Trabajo literario que pretendo difundir entre la poblaci\xF3n que de una u otra forma este vinculada con las artes y con la intenci\xF3n de desarrollar habilidades que alejen a nuestro adultos mayores del mal de Alzheimer ya que en este mismo trabajo literario trato de instar a realizar diferentes actividades que inducir\xEDan a un proceso de estimulaci\xF3n cognitiva; Aprendizaje este adquirido en mi desempe\xF1o como director de la fundaci\xF3n Alzheimer de Venezuela capitulo Zulia, desde donde estamos trabajando para llevar la informaci\xF3n necesaria y conocer mas de esta enfermedad para difundir entre el mayor numero de personas posible; Quiero dejar en este apreciado trabajo la intenci\xF3n de compartir algunos saberes adquiridos y difundirlos en cualquier parte del mundo por intermedio del taller de estimulaci\xF3n cognitiva Alzheimer y familia el cual he estado difundiendo desde el 2010. que no es otra cosa que instar al colectivo a realizar estas actividades, agradeciendo con humildad el que se puedan convertir en multiplicador de esta noble intenci\xF3n de llevar luces y conocimientos al que las necesite, mil gracias. Si desea establecer un contacto directo: Rodrigo-navarro1@hotmail.com 02617332671, 04140709524, 04166626343. Maracaibo, Estado Zulia, Venezuela.",
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9781463327811"
            },
            {
              type: "ISBN_10",
              identifier: "1463327811"
            }
          ],
          readingModes: {
            text: true,
            image: true
          },
          pageCount: 207,
          printType: "BOOK",
          categories: [
            "Literary Collections"
          ],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "0.2.3.0.preview.3",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail: "http://books.google.com/books/content?id=IS17zdkCWysC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail: "http://books.google.com/books/content?id=IS17zdkCWysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink: "http://books.google.cl/books?id=IS17zdkCWysC&pg=PA77&dq=intitle:fragmentos+a+su+iman&hl=&cd=1&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=IS17zdkCWysC&dq=intitle:fragmentos+a+su+iman&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/Fragmentos_de_la_Vida_Lo_que_escribo_Cue.html?hl=&id=IS17zdkCWysC"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true,
            acsTokenLink: "http://books.google.cl/books/download/Fragmentos_de_la_Vida_Lo_que_escribo_Cue-sample-epub.acsm?id=IS17zdkCWysC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          pdf: {
            isAvailable: true,
            acsTokenLink: "http://books.google.cl/books/download/Fragmentos_de_la_Vida_Lo_que_escribo_Cue-sample-pdf.acsm?id=IS17zdkCWysC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          webReaderLink: "http://play.google.com/books/reader?id=IS17zdkCWysC&hl=&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet: "... <b>im\xE1n</b> Eres sanguijuela cuando quieres Cuando te toca el deseo nada m\xE1s Dulzura amarga con veneno de Alacr\xE1n unos zapatos viejos que botar. Carita de \xE1ngel que simula la verdad Que te atrapa y te pegas como <b>im\xE1n</b> Enga\xF1adora te resistes al&nbsp;..."
        }
      },
      {
        kind: "books#volume",
        id: "9h-wPAAACAAJ",
        etag: "m9Mv/cbo3A0",
        selfLink: "https://www.googleapis.com/books/v1/volumes/9h-wPAAACAAJ",
        volumeInfo: {
          title: "Remembrance of Things Past, Part One Combray",
          authors: [
            "Marcel Proust"
          ],
          publishedDate: "2001-01-01",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "0605010765"
            },
            {
              type: "ISBN_13",
              identifier: "9780605010765"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          printType: "BOOK",
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          language: "en",
          previewLink: "http://books.google.cl/books?id=9h-wPAAACAAJ&dq=intitle:Combray+inauthor:proust&hl=&cd=2&source=gbs_api",
          infoLink: "http://books.google.cl/books?id=9h-wPAAACAAJ&dq=intitle:Combray+inauthor:proust&hl=&source=gbs_api",
          canonicalVolumeLink: "https://books.google.com/books/about/Remembrance_of_Things_Past_Part_One_Comb.html?hl=&id=9h-wPAAACAAJ"
        },
        saleInfo: {
          country: "CL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "CL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink: "http://play.google.com/books/reader?id=9h-wPAAACAAJ&hl=&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        }
      }
    ]
  };

  // src/ts/index.ts
  var Library = class {
    constructor(name, initialBooks) {
      this.name = name;
      this.initialBooks = initialBooks;
      this.addBook = (b) => {
        this.storage.push(b);
      };
      this.deleteBook = (b) => {
        const index = this.storage.indexOf(b);
        this.storage.splice(index, 1);
      };
      this.clearLibrary = () => {
        this.storage = [];
      };
      this.nameToId = () => {
        return this.name.replace(/\s/g, "-").toLowerCase();
      };
      this.isDuplicateBook = (incomingBook) => {
        for (const book of this.storage) {
          if (incomingBook.author === book.author && incomingBook.title === book.title) {
            return true;
          }
        }
        return false;
      };
      this.DOMpopulateWithBooks = () => {
        const bookTemplate = document.getElementById("book-template");
        const stand = document.getElementById("stand");
        const oldBooks = document.querySelectorAll(".book-container");
        oldBooks.forEach((v) => stand.removeChild(v));
        this.storage.forEach((_) => {
          const book = bookTemplate.content.cloneNode(true);
          stand?.appendChild(book);
        });
        const emptyBooks = document.querySelectorAll(".book");
        this.storage.forEach((book, i) => {
          emptyBooks[i].setAttribute("data-id", book.id);
          emptyBooks[i].addEventListener("mouseover", (ev) => {
            ev.stopPropagation();
            const mouse = ev;
            const x = mouse.clientX;
            const y = mouse.clientY;
            if (!hoverBookDiv)
              return console.error("Hover Div is non existent");
            book.fillDivWithBookValues("hover-book-div", true, true, true);
            hoverBookDiv.classList.remove("display-none");
            hoverBookDiv.style.left = x + "px";
            hoverBookDiv.style.top = y + "px";
          });
        });
        house.saveHouse();
      };
      this.searchBookMatches = (searchInput) => {
        const matches = [];
        for (const book of this.storage) {
          if (book.author.match(searchInput)) {
            matches.push(book.id);
          } else if (book.title.match(searchInput)) {
            matches.push(book.id);
          } else if (book.description?.match(searchInput)) {
            matches.push(book.id);
          }
        }
        if (matches[0]) {
          return matches;
        } else
          return null;
      };
      /**
       * @param attribute is the selected value on the select input
       * 0 = Title
       * 1 = Author
       * 2 = Read Status
       * 3 = Pages
       * 4 = Genre
       */
      this.sortBy = (attribute) => {
        switch (attribute) {
          case 0:
            this.storage.sort((a, b) => {
              return a.title > b.title ? 1 : -1;
            });
            break;
          case 1:
            this.storage.sort((a, b) => {
              return a.author > b.author ? 1 : -1;
            });
            break;
          case 2:
            this.storage.sort((a) => {
              return a.read ? 0 : 1;
            });
            break;
          case 3:
            this.storage.sort((a, b) => {
              let aP = a.pages ? a.pages : 0;
              let bP = b.pages ? b.pages : 0;
              if (!a.pages)
                a;
              return aP > bP ? 1 : -1;
            });
            break;
          case 4:
            this.storage.sort((a, b) => {
              let aG = a.genre?.[0] ? a.genre?.[0] : "";
              let bG = b.genre?.[0] ? b.genre?.[0] : "";
              return aG > bG ? 1 : -1;
            });
            break;
        }
        this.DOMpopulateWithBooks();
      };
      this.storage = initialBooks || [];
    }
  };
  var House = class extends Array {
    constructor() {
      super(...arguments);
      this.removeLibrary = (l) => {
        if (this.length === 1) {
          alert("Cannot delete your last library. Please add a new one and delete this one if you like");
          return;
        }
        ;
        const index = this.indexOf(l);
        if (index === -1)
          return;
        const active2 = this.isActive(l);
        this.splice(index, 1);
        this.popDOMlibrary(l);
        if (active2) {
          const newActiveLibraryAnchor = document.getElementById(`${this[this.length - 1].nameToId()}-library`);
          this.setActive(this[this.length - 1], newActiveLibraryAnchor);
        }
        this.saveHouse();
      };
      this.clearHouse = () => {
        localStorage.clear();
        window.location.reload();
      };
      this.createLibrary = () => {
        if (house.length >= 5) {
          alert("Max Libraries amount reached");
          return;
        }
        let l = prompt("Input new library name");
        if (this.isDuplicateLibrary(l)) {
          alert("Please input a non-duplicate library name");
          return;
        } else if (!l?.replace(/\s/g, "").length) {
          alert("Please input a valid name");
          return;
        } else if (!l)
          return;
        else if (l === "foo")
          l = "notFoo";
        l = l?.trim();
        const newBornLibrary = new Library(l);
        this.push(newBornLibrary);
        this.saveHouse();
        return newBornLibrary;
      };
      this.pushDOMlibrary = (l) => {
        const anchorTemplate = document.getElementById("lib-template");
        navUl?.appendChild(anchorTemplate.content.cloneNode(true));
        const libraryAnchor = document.getElementById("foo-library");
        libraryAnchor.setAttribute("href", `#${l.nameToId()}`);
        libraryAnchor.setAttribute("id", `${l.nameToId()}-library`);
        libraryAnchor.innerText = `${l.name} Library`;
        libraryAnchor.addEventListener("mousedown", () => {
          this.setActive(l, libraryAnchor);
        });
        const deleteBin = document.getElementById("delete-foo");
        deleteBin?.setAttribute("id", `delete-${l.nameToId()}`);
        deleteBin?.addEventListener("mousedown", () => {
          this.removeLibrary(l);
        });
        if (l === this?.[0]) {
          libraryAnchor.classList.add("active");
          libraryAnchor.parentElement?.classList.add("active");
        }
      };
      this.popDOMlibrary = (l) => {
        const domL = document.getElementById(`delete-${l.nameToId()}`);
        if (!domL)
          return console.error("Library ID doesnt exist");
        const parentLi = domL.parentElement;
        if (!parentLi)
          return console.error("There is no parent");
        navUl?.removeChild(domL.parentElement);
      };
      this.isDuplicateLibrary = (inputName) => {
        if (!inputName)
          return true;
        for (const l of this) {
          if (l.name == inputName) {
            return true;
          }
        }
        return false;
      };
      this.saveHouse = () => {
        localStorage.setItem("house", JSON.stringify(this));
      };
      this.setActive = (l, selectedLibrary) => {
        this.sortHouseBySelectedLibrary(l);
        this?.[0].DOMpopulateWithBooks();
        const allAnchors = document.querySelectorAll(".libraries");
        allAnchors.forEach((a) => {
          a.classList.remove("active");
          a.parentElement?.classList.remove("active");
        });
        selectedLibrary.classList.add("active");
        selectedLibrary.parentElement?.classList.add("active");
      };
      this.renameLibrary = () => {
      };
      this.isActive = (l) => {
        const selectedLibrary = document.getElementById(`${l.nameToId()}-library`);
        return selectedLibrary?.classList.contains("active");
      };
      this.sortHouseBySelectedLibrary = (l) => {
        this.sort((a, b) => a === l ? -1 : 1);
      };
    }
  };
  var Book = class {
    constructor(title, author, read, img, pages, genre, isbn, description) {
      this.title = title;
      this.author = author;
      this.read = read;
      this.img = img;
      this.pages = pages;
      this.genre = genre;
      this.isbn = isbn;
      this.description = description;
      this.setId = () => {
        const str = this.title + this.author;
        const reduce_Uint8 = new TextEncoder().encode(str).reduce((a, b) => a + b);
        return `${reduce_Uint8 + (/* @__PURE__ */ new Date()).getTime()}`;
      };
      this.getMainGenre = () => {
        if (this.genre?.[0]) {
          return this.genre[0];
        }
      };
      this.getThisBookIfMatches = (inputID) => {
        if (inputID === this.id)
          return this;
      };
      this.fillDivWithBookValues = (idSelector, printAuthor, printTitle, bin) => {
        const div = document.getElementById(idSelector);
        if (!div)
          return;
        div.innerHTML = "";
        div.innerText = `
${printTitle ? "Title: " + this.title + "\n" : ""}                        ${printAuthor ? "Author: " + this.author + "\n" : ""}                        Pages: ${this.pages ? this.pages : "Unknown"}
                        ${this.genre ? `
Genres: ${this.genre?.join(" ")}` : ""}                        ${this.description ? `
Description:
${this.briefDescription()}` : ""}`;
        let imgEl = document.getElementById("book-img");
        if (!imgEl) {
          imgEl = new Image();
          imgEl.setAttribute("alt", "book-cover");
          imgEl.setAttribute("src", this.img.href);
          div.insertBefore(imgEl, div.firstChild);
        } else {
          imgEl.setAttribute("src", this.img.href);
        }
        if (bin) {
          const spanDeleteBin = document.createElement("span");
          spanDeleteBin.classList.add("material-symbols-rounded");
          spanDeleteBin.classList.add("delete");
          spanDeleteBin.innerText = "delete";
          spanDeleteBin.addEventListener("mousedown", this.confirmBookDeletion);
          div.appendChild(spanDeleteBin);
        }
      };
      this.briefDescription = () => {
        if (this.description)
          return this.description.split(" ").slice(0, 25).join(" ") + "...";
      };
      this.confirmBookDeletion = () => {
        const confirm = window.confirm("You really want to remove this book from your library?");
        if (!confirm)
          return;
        house[0].deleteBook(this);
        house[0].DOMpopulateWithBooks;
        house[0].sortBy(sortByBtn.selectedIndex);
      };
      this.checkValidBook = () => {
        if (this.title !== void 0 && this.author !== void 0 && this.read !== void 0 && this.img !== void 0) {
          return true;
        }
        return false;
      };
      this.id = this.setId();
      if (this.img.protocol === "http:")
        this.img.protocol = "https:";
    }
  };
  var selectTagify = class extends import_tagify.default {
    constructor() {
      super(...arguments);
      // const googleApiKey = 'AIzaSyBbLoGrfBpVZrXlPHSeFkLniUZzG0o8NI8'
      this.googleApiKey = "AIzaSyBLwUmLLP_bdYf4hEY5umKkIf_WgdkOkzQ";
      this.googleGET = async (input) => {
        const general_search = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=${this.googleApiKey}&langRestrict=en&maxResults=40`, {
          method: "GET"
        });
        return general_search;
      };
    }
    static {
      this.tagifyDropdownSettings = {
        classname: "color-blue",
        enforceWhitelist: true,
        enabled: 2,
        // show the dropdown immediately on focus
        maxItems: 40,
        closeOnSelect: true,
        // keep the dropdown open after selecting a suggestion
        searchKeys: ["value", "author"]
      };
    }
  };
  var preBook = class {
    constructor(volume) {
      this.volume = volume;
      this.googleVolumeInfoToBook = () => {
        return new Book(
          this.volume.title,
          this.volume.authors ? this.volume.authors.join(", ") : "unknown",
          false,
          this.volume.imageLinks?.thumbnail ? new URL(this.volume.imageLinks.thumbnail) : new URL("https://raw.githubusercontent.com/carafelix/minimalist-library/main/assets/placeholder.png"),
          this.volume.pageCount,
          this.volume.categories,
          this.volume.industryIdentifiers?.[0] ? this.volume.industryIdentifiers[0] : void 0,
          this.volume.description
        );
      };
    }
  };
  var dropdownBooks = class extends preBook {
    constructor(title, value, volume) {
      super(volume);
      this.title = title;
      this.value = value;
      this.volume = volume;
    }
  };
  var URLHouseParams = class extends URLSearchParams {
    constructor() {
      super(...arguments);
      this.isHouse = () => {
        const encodedStr = this.get("house");
        if (!encodedStr)
          return false;
        const decodedStr = decodeURIComponent(encodedStr);
        try {
          JSON.parse(decodedStr);
        } catch (err) {
          if (err) {
            return false;
          }
        }
        const tentativeUrlHouse = JSON.parse(decodedStr);
        console.log(tentativeUrlHouse);
        return composeHouseAndCheckValidity(tentativeUrlHouse);
      };
    }
  };
  var placeholderBooks = main_initial_default.items.map((v) => new preBook(v.volumeInfo).googleVolumeInfoToBook());
  var recievedURLParams = new URLHouseParams(window.location.search);
  var cachedHouse = JSON.parse(localStorage.getItem("house"));
  var mainLibrary = new Library("Main", placeholderBooks);
  var house = recievedURLParams.isHouse() || composeHouseAndCheckValidity(cachedHouse) || new House(mainLibrary);
  function composeHouseAndCheckValidity(cachedHouse2) {
    if (!cachedHouse2?.[0].name)
      return null;
    const reParsedHouse = new House(...cachedHouse2.map((cachedLibrary) => new Library(cachedLibrary.name)));
    for (const library in cachedHouse2) {
      for (const cachedBook of cachedHouse2[library].storage) {
        const currentBook = new Book(
          cachedBook?.title,
          cachedBook?.author,
          cachedBook?.read,
          new URL(cachedBook?.img),
          cachedBook?.pages,
          cachedBook?.genre,
          cachedBook?.isbn,
          cachedBook?.description
        );
        reParsedHouse[library].storage.push(currentBook);
        if (!currentBook.checkValidBook()) {
          return null;
        }
      }
    }
    return reParsedHouse;
  }
  for (const libraries of house) {
    Object.setPrototypeOf(libraries, Library.prototype);
    for (const book of libraries.storage) {
      Object.setPrototypeOf(book, Book.prototype);
    }
  }
  var body = document.querySelector("body");
  var main = document.querySelector("main");
  body?.addEventListener("mousedown", (ev) => {
    DOMremove_NewBookDiv(ev);
  });
  main?.addEventListener("mouseover", () => {
    hoverBookDiv?.classList.add("display-none");
  });
  body?.addEventListener("mousedown", () => {
    settingsDiv?.classList.add("hide");
  });
  var hidable = document.querySelectorAll(".hidable");
  var navUl = document.getElementById("libraries-ul");
  var hoverBookDiv = document.getElementById("hover-book-div");
  hoverBookDiv?.addEventListener("mouseleave", (ev) => {
    ev.stopPropagation();
    hoverBookDiv.classList.add("display-none");
  });
  var settingsDiv = document.getElementById("sidenav-library-selection");
  settingsDiv?.addEventListener("mousedown", (ev) => {
    ev.stopPropagation();
  });
  var settingsBtn = document.getElementById("settings");
  var active = false;
  settingsBtn?.addEventListener("mousedown", (ev) => {
    ev.stopPropagation();
    if (!active) {
      settingsDiv?.classList.remove("hide");
      active = true;
    } else {
      settingsDiv?.classList.add("hide");
      active = false;
    }
  });
  var sortByBtn = document.getElementById("sort-by");
  sortByBtn?.addEventListener("input", () => {
    house[0].sortBy(sortByBtn.selectedIndex);
  });
  house.forEach((l) => house.pushDOMlibrary(l));
  house[0].DOMpopulateWithBooks();
  var searchBar = document.getElementById("lookup");
  searchBar?.addEventListener("input", (ev) => {
    const books = document.querySelectorAll(".book");
    books.forEach((b) => {
      b.classList.remove("match");
    });
    const input = ev.target;
    if (input.value == "" || input.value == " ")
      return;
    const searchTerm = new RegExp(input.value, "i");
    const matchingBooks = house[0].searchBookMatches(searchTerm);
    if (!matchingBooks)
      return;
    matchingBooks.forEach((id) => {
      const targetBook = document.querySelector(`[data-id="${id}"]`);
      targetBook?.classList.add("match");
    });
  });
  var addLibraryBtn = document.getElementById("new-library-btn");
  addLibraryBtn?.addEventListener("click", () => {
    const newBorn = house.createLibrary();
    if (!newBorn)
      return;
    house.pushDOMlibrary(newBorn);
  });
  var addBookTemplate = document.getElementById("new-book-template");
  var addBookBtn = document.getElementById("add-book");
  addBookBtn?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    body?.classList.add("opaque");
    hidable?.forEach((n) => n.classList.add("hide"));
    body?.appendChild(addBookTemplate.content.cloneNode(true));
    const addBookDiv = document.getElementById("new-book-div");
    addBookDiv?.addEventListener("mousedown", (ev2) => ev2.stopPropagation());
    const addBookForm = document.getElementById("new-book-form");
    const title = document.getElementById("title");
    if (!title)
      return;
    const titleSelect = new selectTagify(title, {
      // todo - add method to tagify, resolve all any:
      enforceWhitelist: true,
      mode: "select",
      whitelist: [""],
      dropdown: selectTagify.tagifyDropdownSettings,
      callbacks: {
        "input": (ev2) => {
          if (ev2.detail.value.length > 1) {
            titleSelect.loading(true).dropdown.hide();
            titleSelect.googleGET(ev2.detail.value).then((r) => r.json()).then((data) => {
              const volumes = data.items;
              const g_volumeInfo = volumes.map((b) => b.volumeInfo);
              return g_volumeInfo.map((volume) => {
                return new dropdownBooks(
                  volume?.description ? volume.description : "",
                  (volume.title.length >= 80 ? volume.title.slice(0, 80) + "..." : volume.title) + " \u2014by\u2014\n" + (volume?.authors ? volume.authors[0] : "unknown"),
                  volume
                );
              });
            }).then((reformated) => {
              titleSelect.whitelist = reformated;
              titleSelect.loading(false).dropdown.show();
              const dropdownItems = document.querySelectorAll(".tagify__dropdown__item");
              dropdownItems.forEach((el) => el.addEventListener("mousedown", (ev3) => ev3.stopPropagation()));
              dropdownItems.forEach((el) => el.addEventListener("mouseup", (ev3) => ev3.stopPropagation()));
              dropdownItems.forEach((el) => el.addEventListener("click", (ev3) => ev3.stopPropagation()));
            });
          }
        },
        "change": () => {
          if (!titleSelect.value[0])
            return;
          titleSelect.value[0].googleVolumeInfoToBook().fillDivWithBookValues("book-info");
        }
      }
    });
    addBookForm?.addEventListener("submit", (ev2) => {
      ev2.preventDefault();
      if (!titleSelect.value[0])
        return console.error("select a book lol");
      const selectedBook = titleSelect.value[0].googleVolumeInfoToBook();
      const checkbox = document.querySelector('input[type="checkbox"]');
      selectedBook.read = checkbox.checked;
      if (!house[0].isDuplicateBook(selectedBook)) {
        house[0].addBook(selectedBook);
        house[0].DOMpopulateWithBooks();
      }
      DOMremove_NewBookDiv();
      house[0].sortBy(sortByBtn.selectedIndex);
    });
  });
  localStorage.setItem("house", JSON.stringify(house));
  function DOMremove_NewBookDiv(ev) {
    const target = ev?.target;
    if (target?.className == "tagify__dropdown__item tagify__dropdown__item--active tagify__dropdown__item--hidden")
      return;
    const newBookDiv = document.getElementById("new-book-div");
    const tagifyDropdown = document.querySelector(".tagify__dropdown");
    if (newBookDiv)
      body.removeChild(newBookDiv);
    if (tagifyDropdown)
      body?.removeChild(tagifyDropdown);
    body?.classList.remove("opaque");
    hidable?.forEach((n) => n.classList.remove("hide"));
  }
})();
