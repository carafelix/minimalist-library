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
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Tagify = factory());
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

  // node_modules/assertion-error/index.js
  var require_assertion_error = __commonJS({
    "node_modules/assertion-error/index.js"(exports, module) {
      function exclude() {
        var excludes = [].slice.call(arguments);
        function excludeProps(res, obj) {
          Object.keys(obj).forEach(function(key) {
            if (!~excludes.indexOf(key))
              res[key] = obj[key];
          });
        }
        return function extendExclude() {
          var args = [].slice.call(arguments), i = 0, res = {};
          for (; i < args.length; i++) {
            excludeProps(res, args[i]);
          }
          return res;
        };
      }
      module.exports = AssertionError2;
      function AssertionError2(message, _props, ssf) {
        var extend = exclude("name", "message", "stack", "constructor", "toJSON"), props = extend(_props || {});
        this.message = message || "Unspecified AssertionError";
        this.showDiff = false;
        for (var key in props) {
          this[key] = props[key];
        }
        ssf = ssf || AssertionError2;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ssf);
        } else {
          try {
            throw new Error();
          } catch (e) {
            this.stack = e.stack;
          }
        }
      }
      AssertionError2.prototype = Object.create(Error.prototype);
      AssertionError2.prototype.name = "AssertionError";
      AssertionError2.prototype.constructor = AssertionError2;
      AssertionError2.prototype.toJSON = function(stack) {
        var extend = exclude("constructor", "toJSON", "stack"), props = extend({ name: this.name }, this);
        if (false !== stack && this.stack) {
          props.stack = this.stack;
        }
        return props;
      };
    }
  });

  // node_modules/pathval/index.js
  var require_pathval = __commonJS({
    "node_modules/pathval/index.js"(exports, module) {
      "use strict";
      function hasProperty(obj, name) {
        if (typeof obj === "undefined" || obj === null) {
          return false;
        }
        return name in Object(obj);
      }
      function parsePath(path) {
        var str = path.replace(/([^\\])\[/g, "$1.[");
        var parts = str.match(/(\\\.|[^.]+?)+/g);
        return parts.map(function mapMatches(value) {
          if (value === "constructor" || value === "__proto__" || value === "prototype") {
            return {};
          }
          var regexp = /^\[(\d+)\]$/;
          var mArr = regexp.exec(value);
          var parsed = null;
          if (mArr) {
            parsed = { i: parseFloat(mArr[1]) };
          } else {
            parsed = { p: value.replace(/\\([.[\]])/g, "$1") };
          }
          return parsed;
        });
      }
      function internalGetPathValue(obj, parsed, pathDepth) {
        var temporaryValue = obj;
        var res = null;
        pathDepth = typeof pathDepth === "undefined" ? parsed.length : pathDepth;
        for (var i = 0; i < pathDepth; i++) {
          var part = parsed[i];
          if (temporaryValue) {
            if (typeof part.p === "undefined") {
              temporaryValue = temporaryValue[part.i];
            } else {
              temporaryValue = temporaryValue[part.p];
            }
            if (i === pathDepth - 1) {
              res = temporaryValue;
            }
          }
        }
        return res;
      }
      function internalSetPathValue(obj, val, parsed) {
        var tempObj = obj;
        var pathDepth = parsed.length;
        var part = null;
        for (var i = 0; i < pathDepth; i++) {
          var propName = null;
          var propVal = null;
          part = parsed[i];
          if (i === pathDepth - 1) {
            propName = typeof part.p === "undefined" ? part.i : part.p;
            tempObj[propName] = val;
          } else if (typeof part.p !== "undefined" && tempObj[part.p]) {
            tempObj = tempObj[part.p];
          } else if (typeof part.i !== "undefined" && tempObj[part.i]) {
            tempObj = tempObj[part.i];
          } else {
            var next = parsed[i + 1];
            propName = typeof part.p === "undefined" ? part.i : part.p;
            propVal = typeof next.p === "undefined" ? [] : {};
            tempObj[propName] = propVal;
            tempObj = tempObj[propName];
          }
        }
      }
      function getPathInfo(obj, path) {
        var parsed = parsePath(path);
        var last = parsed[parsed.length - 1];
        var info = {
          parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
          name: last.p || last.i,
          value: internalGetPathValue(obj, parsed)
        };
        info.exists = hasProperty(info.parent, info.name);
        return info;
      }
      function getPathValue(obj, path) {
        var info = getPathInfo(obj, path);
        return info.value;
      }
      function setPathValue(obj, path, val) {
        var parsed = parsePath(path);
        internalSetPathValue(obj, val, parsed);
        return obj;
      }
      module.exports = {
        hasProperty,
        getPathInfo,
        getPathValue,
        setPathValue
      };
    }
  });

  // node_modules/chai/lib/chai/utils/flag.js
  var require_flag = __commonJS({
    "node_modules/chai/lib/chai/utils/flag.js"(exports, module) {
      module.exports = function flag(obj, key, value) {
        var flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
        if (arguments.length === 3) {
          flags[key] = value;
        } else {
          return flags[key];
        }
      };
    }
  });

  // node_modules/chai/lib/chai/utils/test.js
  var require_test = __commonJS({
    "node_modules/chai/lib/chai/utils/test.js"(exports, module) {
      var flag = require_flag();
      module.exports = function test(obj, args) {
        var negate = flag(obj, "negate"), expr = args[0];
        return negate ? !expr : expr;
      };
    }
  });

  // node_modules/type-detect/type-detect.js
  var require_type_detect = __commonJS({
    "node_modules/type-detect/type-detect.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.typeDetect = factory();
      })(exports, function() {
        "use strict";
        var promiseExists = typeof Promise === "function";
        var globalObject = typeof self === "object" ? self : global;
        var symbolExists = typeof Symbol !== "undefined";
        var mapExists = typeof Map !== "undefined";
        var setExists = typeof Set !== "undefined";
        var weakMapExists = typeof WeakMap !== "undefined";
        var weakSetExists = typeof WeakSet !== "undefined";
        var dataViewExists = typeof DataView !== "undefined";
        var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== "undefined";
        var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== "undefined";
        var setEntriesExists = setExists && typeof Set.prototype.entries === "function";
        var mapEntriesExists = mapExists && typeof Map.prototype.entries === "function";
        var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Set()).entries());
        var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Map()).entries());
        var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === "function";
        var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
        var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === "function";
        var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(""[Symbol.iterator]());
        var toStringLeftSliceLength = 8;
        var toStringRightSliceLength = -1;
        function typeDetect(obj) {
          var typeofObj = typeof obj;
          if (typeofObj !== "object") {
            return typeofObj;
          }
          if (obj === null) {
            return "null";
          }
          if (obj === globalObject) {
            return "global";
          }
          if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
            return "Array";
          }
          if (typeof window === "object" && window !== null) {
            if (typeof window.location === "object" && obj === window.location) {
              return "Location";
            }
            if (typeof window.document === "object" && obj === window.document) {
              return "Document";
            }
            if (typeof window.navigator === "object") {
              if (typeof window.navigator.mimeTypes === "object" && obj === window.navigator.mimeTypes) {
                return "MimeTypeArray";
              }
              if (typeof window.navigator.plugins === "object" && obj === window.navigator.plugins) {
                return "PluginArray";
              }
            }
            if ((typeof window.HTMLElement === "function" || typeof window.HTMLElement === "object") && obj instanceof window.HTMLElement) {
              if (obj.tagName === "BLOCKQUOTE") {
                return "HTMLQuoteElement";
              }
              if (obj.tagName === "TD") {
                return "HTMLTableDataCellElement";
              }
              if (obj.tagName === "TH") {
                return "HTMLTableHeaderCellElement";
              }
            }
          }
          var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
          if (typeof stringTag === "string") {
            return stringTag;
          }
          var objPrototype = Object.getPrototypeOf(obj);
          if (objPrototype === RegExp.prototype) {
            return "RegExp";
          }
          if (objPrototype === Date.prototype) {
            return "Date";
          }
          if (promiseExists && objPrototype === Promise.prototype) {
            return "Promise";
          }
          if (setExists && objPrototype === Set.prototype) {
            return "Set";
          }
          if (mapExists && objPrototype === Map.prototype) {
            return "Map";
          }
          if (weakSetExists && objPrototype === WeakSet.prototype) {
            return "WeakSet";
          }
          if (weakMapExists && objPrototype === WeakMap.prototype) {
            return "WeakMap";
          }
          if (dataViewExists && objPrototype === DataView.prototype) {
            return "DataView";
          }
          if (mapExists && objPrototype === mapIteratorPrototype) {
            return "Map Iterator";
          }
          if (setExists && objPrototype === setIteratorPrototype) {
            return "Set Iterator";
          }
          if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
            return "Array Iterator";
          }
          if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
            return "String Iterator";
          }
          if (objPrototype === null) {
            return "Object";
          }
          return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
        }
        return typeDetect;
      });
    }
  });

  // node_modules/chai/lib/chai/utils/expectTypes.js
  var require_expectTypes = __commonJS({
    "node_modules/chai/lib/chai/utils/expectTypes.js"(exports, module) {
      var AssertionError2 = require_assertion_error();
      var flag = require_flag();
      var type = require_type_detect();
      module.exports = function expectTypes(obj, types) {
        var flagMsg = flag(obj, "message");
        var ssfi = flag(obj, "ssfi");
        flagMsg = flagMsg ? flagMsg + ": " : "";
        obj = flag(obj, "object");
        types = types.map(function(t) {
          return t.toLowerCase();
        });
        types.sort();
        var str = types.map(function(t, index) {
          var art = ~["a", "e", "i", "o", "u"].indexOf(t.charAt(0)) ? "an" : "a";
          var or = types.length > 1 && index === types.length - 1 ? "or " : "";
          return or + art + " " + t;
        }).join(", ");
        var objType = type(obj).toLowerCase();
        if (!types.some(function(expected) {
          return objType === expected;
        })) {
          throw new AssertionError2(
            flagMsg + "object tested must be " + str + ", but " + objType + " given",
            void 0,
            ssfi
          );
        }
      };
    }
  });

  // node_modules/chai/lib/chai/utils/getActual.js
  var require_getActual = __commonJS({
    "node_modules/chai/lib/chai/utils/getActual.js"(exports, module) {
      module.exports = function getActual(obj, args) {
        return args.length > 4 ? args[4] : obj._obj;
      };
    }
  });

  // node_modules/get-func-name/index.js
  var require_get_func_name = __commonJS({
    "node_modules/get-func-name/index.js"(exports, module) {
      "use strict";
      var toString = Function.prototype.toString;
      var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
      var maxFunctionSourceLength = 512;
      function getFuncName(aFunc) {
        if (typeof aFunc !== "function") {
          return null;
        }
        var name = "";
        if (typeof Function.prototype.name === "undefined" && typeof aFunc.name === "undefined") {
          var functionSource = toString.call(aFunc);
          if (functionSource.indexOf("(") > maxFunctionSourceLength) {
            return name;
          }
          var match = functionSource.match(functionNameMatch);
          if (match) {
            name = match[1];
          }
        } else {
          name = aFunc.name;
        }
        return name;
      }
      module.exports = getFuncName;
    }
  });

  // (disabled):util
  var require_util = __commonJS({
    "(disabled):util"() {
    }
  });

  // node_modules/loupe/loupe.js
  var require_loupe = __commonJS({
    "node_modules/loupe/loupe.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.loupe = {}));
      })(exports, function(exports2) {
        "use strict";
        function _typeof(obj) {
          "@babel/helpers - typeof";
          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj2) {
              return typeof obj2;
            };
          } else {
            _typeof = function(obj2) {
              return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            };
          }
          return _typeof(obj);
        }
        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr))
            return arr;
        }
        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
            return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null)
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        function _unsupportedIterableToArray(o, minLen) {
          if (!o)
            return;
          if (typeof o === "string")
            return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor)
            n = o.constructor.name;
          if (n === "Map" || n === "Set")
            return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length)
            len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++)
            arr2[i] = arr[i];
          return arr2;
        }
        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var ansiColors = {
          bold: ["1", "22"],
          dim: ["2", "22"],
          italic: ["3", "23"],
          underline: ["4", "24"],
          // 5 & 6 are blinking
          inverse: ["7", "27"],
          hidden: ["8", "28"],
          strike: ["9", "29"],
          // 10-20 are fonts
          // 21-29 are resets for 1-9
          black: ["30", "39"],
          red: ["31", "39"],
          green: ["32", "39"],
          yellow: ["33", "39"],
          blue: ["34", "39"],
          magenta: ["35", "39"],
          cyan: ["36", "39"],
          white: ["37", "39"],
          brightblack: ["30;1", "39"],
          brightred: ["31;1", "39"],
          brightgreen: ["32;1", "39"],
          brightyellow: ["33;1", "39"],
          brightblue: ["34;1", "39"],
          brightmagenta: ["35;1", "39"],
          brightcyan: ["36;1", "39"],
          brightwhite: ["37;1", "39"],
          grey: ["90", "39"]
        };
        var styles = {
          special: "cyan",
          number: "yellow",
          bigint: "yellow",
          boolean: "yellow",
          undefined: "grey",
          null: "bold",
          string: "green",
          symbol: "green",
          date: "magenta",
          regexp: "red"
        };
        var truncator = "\u2026";
        function colorise(value, styleType) {
          var color = ansiColors[styles[styleType]] || ansiColors[styleType];
          if (!color) {
            return String(value);
          }
          return "\x1B[".concat(color[0], "m").concat(String(value), "\x1B[").concat(color[1], "m");
        }
        function normaliseOptions() {
          var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$showHidden = _ref.showHidden, showHidden = _ref$showHidden === void 0 ? false : _ref$showHidden, _ref$depth = _ref.depth, depth = _ref$depth === void 0 ? 2 : _ref$depth, _ref$colors = _ref.colors, colors = _ref$colors === void 0 ? false : _ref$colors, _ref$customInspect = _ref.customInspect, customInspect = _ref$customInspect === void 0 ? true : _ref$customInspect, _ref$showProxy = _ref.showProxy, showProxy = _ref$showProxy === void 0 ? false : _ref$showProxy, _ref$maxArrayLength = _ref.maxArrayLength, maxArrayLength = _ref$maxArrayLength === void 0 ? Infinity : _ref$maxArrayLength, _ref$breakLength = _ref.breakLength, breakLength = _ref$breakLength === void 0 ? Infinity : _ref$breakLength, _ref$seen = _ref.seen, seen = _ref$seen === void 0 ? [] : _ref$seen, _ref$truncate = _ref.truncate, truncate2 = _ref$truncate === void 0 ? Infinity : _ref$truncate, _ref$stylize = _ref.stylize, stylize = _ref$stylize === void 0 ? String : _ref$stylize;
          var options = {
            showHidden: Boolean(showHidden),
            depth: Number(depth),
            colors: Boolean(colors),
            customInspect: Boolean(customInspect),
            showProxy: Boolean(showProxy),
            maxArrayLength: Number(maxArrayLength),
            breakLength: Number(breakLength),
            truncate: Number(truncate2),
            seen,
            stylize
          };
          if (options.colors) {
            options.stylize = colorise;
          }
          return options;
        }
        function truncate(string, length) {
          var tail = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : truncator;
          string = String(string);
          var tailLength = tail.length;
          var stringLength = string.length;
          if (tailLength > length && stringLength > tailLength) {
            return tail;
          }
          if (stringLength > length && stringLength > tailLength) {
            return "".concat(string.slice(0, length - tailLength)).concat(tail);
          }
          return string;
        }
        function inspectList(list, options, inspectItem) {
          var separator = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ", ";
          inspectItem = inspectItem || options.inspect;
          var size = list.length;
          if (size === 0)
            return "";
          var originalLength = options.truncate;
          var output = "";
          var peek = "";
          var truncated = "";
          for (var i = 0; i < size; i += 1) {
            var last = i + 1 === list.length;
            var secondToLast = i + 2 === list.length;
            truncated = "".concat(truncator, "(").concat(list.length - i, ")");
            var value = list[i];
            options.truncate = originalLength - output.length - (last ? 0 : separator.length);
            var string = peek || inspectItem(value, options) + (last ? "" : separator);
            var nextLength = output.length + string.length;
            var truncatedLength = nextLength + truncated.length;
            if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) {
              break;
            }
            if (!last && !secondToLast && truncatedLength > originalLength) {
              break;
            }
            peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator);
            if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength) {
              break;
            }
            output += string;
            if (!last && !secondToLast && nextLength + peek.length >= originalLength) {
              truncated = "".concat(truncator, "(").concat(list.length - i - 1, ")");
              break;
            }
            truncated = "";
          }
          return "".concat(output).concat(truncated);
        }
        function quoteComplexKey(key) {
          if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
            return key;
          }
          return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        }
        function inspectProperty(_ref2, options) {
          var _ref3 = _slicedToArray(_ref2, 2), key = _ref3[0], value = _ref3[1];
          options.truncate -= 2;
          if (typeof key === "string") {
            key = quoteComplexKey(key);
          } else if (typeof key !== "number") {
            key = "[".concat(options.inspect(key, options), "]");
          }
          options.truncate -= key.length;
          value = options.inspect(value, options);
          return "".concat(key, ": ").concat(value);
        }
        function inspectArray(array, options) {
          var nonIndexProperties = Object.keys(array).slice(array.length);
          if (!array.length && !nonIndexProperties.length)
            return "[]";
          options.truncate -= 4;
          var listContents = inspectList(array, options);
          options.truncate -= listContents.length;
          var propertyContents = "";
          if (nonIndexProperties.length) {
            propertyContents = inspectList(nonIndexProperties.map(function(key) {
              return [key, array[key]];
            }), options, inspectProperty);
          }
          return "[ ".concat(listContents).concat(propertyContents ? ", ".concat(propertyContents) : "", " ]");
        }
        var toString = Function.prototype.toString;
        var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
        var maxFunctionSourceLength = 512;
        function getFuncName(aFunc) {
          if (typeof aFunc !== "function") {
            return null;
          }
          var name = "";
          if (typeof Function.prototype.name === "undefined" && typeof aFunc.name === "undefined") {
            var functionSource = toString.call(aFunc);
            if (functionSource.indexOf("(") > maxFunctionSourceLength) {
              return name;
            }
            var match = functionSource.match(functionNameMatch);
            if (match) {
              name = match[1];
            }
          } else {
            name = aFunc.name;
          }
          return name;
        }
        var getFuncName_1 = getFuncName;
        var getArrayName = function getArrayName2(array) {
          if (typeof Buffer === "function" && array instanceof Buffer) {
            return "Buffer";
          }
          if (array[Symbol.toStringTag]) {
            return array[Symbol.toStringTag];
          }
          return getFuncName_1(array.constructor);
        };
        function inspectTypedArray(array, options) {
          var name = getArrayName(array);
          options.truncate -= name.length + 4;
          var nonIndexProperties = Object.keys(array).slice(array.length);
          if (!array.length && !nonIndexProperties.length)
            return "".concat(name, "[]");
          var output = "";
          for (var i = 0; i < array.length; i++) {
            var string = "".concat(options.stylize(truncate(array[i], options.truncate), "number")).concat(i === array.length - 1 ? "" : ", ");
            options.truncate -= string.length;
            if (array[i] !== array.length && options.truncate <= 3) {
              output += "".concat(truncator, "(").concat(array.length - array[i] + 1, ")");
              break;
            }
            output += string;
          }
          var propertyContents = "";
          if (nonIndexProperties.length) {
            propertyContents = inspectList(nonIndexProperties.map(function(key) {
              return [key, array[key]];
            }), options, inspectProperty);
          }
          return "".concat(name, "[ ").concat(output).concat(propertyContents ? ", ".concat(propertyContents) : "", " ]");
        }
        function inspectDate(dateObject, options) {
          var stringRepresentation = dateObject.toJSON();
          if (stringRepresentation === null) {
            return "Invalid Date";
          }
          var split = stringRepresentation.split("T");
          var date = split[0];
          return options.stylize("".concat(date, "T").concat(truncate(split[1], options.truncate - date.length - 1)), "date");
        }
        function inspectFunction(func, options) {
          var name = getFuncName_1(func);
          if (!name) {
            return options.stylize("[Function]", "special");
          }
          return options.stylize("[Function ".concat(truncate(name, options.truncate - 11), "]"), "special");
        }
        function inspectMapEntry(_ref, options) {
          var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
          options.truncate -= 4;
          key = options.inspect(key, options);
          options.truncate -= key.length;
          value = options.inspect(value, options);
          return "".concat(key, " => ").concat(value);
        }
        function mapToEntries(map) {
          var entries = [];
          map.forEach(function(value, key) {
            entries.push([key, value]);
          });
          return entries;
        }
        function inspectMap(map, options) {
          var size = map.size - 1;
          if (size <= 0) {
            return "Map{}";
          }
          options.truncate -= 7;
          return "Map{ ".concat(inspectList(mapToEntries(map), options, inspectMapEntry), " }");
        }
        var isNaN = Number.isNaN || function(i) {
          return i !== i;
        };
        function inspectNumber(number, options) {
          if (isNaN(number)) {
            return options.stylize("NaN", "number");
          }
          if (number === Infinity) {
            return options.stylize("Infinity", "number");
          }
          if (number === -Infinity) {
            return options.stylize("-Infinity", "number");
          }
          if (number === 0) {
            return options.stylize(1 / number === Infinity ? "+0" : "-0", "number");
          }
          return options.stylize(truncate(number, options.truncate), "number");
        }
        function inspectBigInt(number, options) {
          var nums = truncate(number.toString(), options.truncate - 1);
          if (nums !== truncator)
            nums += "n";
          return options.stylize(nums, "bigint");
        }
        function inspectRegExp(value, options) {
          var flags = value.toString().split("/")[2];
          var sourceLength = options.truncate - (2 + flags.length);
          var source = value.source;
          return options.stylize("/".concat(truncate(source, sourceLength), "/").concat(flags), "regexp");
        }
        function arrayFromSet(set) {
          var values = [];
          set.forEach(function(value) {
            values.push(value);
          });
          return values;
        }
        function inspectSet(set, options) {
          if (set.size === 0)
            return "Set{}";
          options.truncate -= 7;
          return "Set{ ".concat(inspectList(arrayFromSet(set), options), " }");
        }
        var stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g");
        var escapeCharacters = {
          "\b": "\\b",
          "	": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          "'": "\\'",
          "\\": "\\\\"
        };
        var hex = 16;
        var unicodeLength = 4;
        function escape(char) {
          return escapeCharacters[char] || "\\u".concat("0000".concat(char.charCodeAt(0).toString(hex)).slice(-unicodeLength));
        }
        function inspectString(string, options) {
          if (stringEscapeChars.test(string)) {
            string = string.replace(stringEscapeChars, escape);
          }
          return options.stylize("'".concat(truncate(string, options.truncate - 2), "'"), "string");
        }
        function inspectSymbol(value) {
          if ("description" in Symbol.prototype) {
            return value.description ? "Symbol(".concat(value.description, ")") : "Symbol()";
          }
          return value.toString();
        }
        var getPromiseValue = function getPromiseValue2() {
          return "Promise{\u2026}";
        };
        try {
          var _process$binding = process.binding("util"), getPromiseDetails = _process$binding.getPromiseDetails, kPending = _process$binding.kPending, kRejected = _process$binding.kRejected;
          if (Array.isArray(getPromiseDetails(Promise.resolve()))) {
            getPromiseValue = function getPromiseValue2(value, options) {
              var _getPromiseDetails = getPromiseDetails(value), _getPromiseDetails2 = _slicedToArray(_getPromiseDetails, 2), state = _getPromiseDetails2[0], innerValue = _getPromiseDetails2[1];
              if (state === kPending) {
                return "Promise{<pending>}";
              }
              return "Promise".concat(state === kRejected ? "!" : "", "{").concat(options.inspect(innerValue, options), "}");
            };
          }
        } catch (notNode) {
        }
        var inspectPromise = getPromiseValue;
        function inspectObject(object, options) {
          var properties = Object.getOwnPropertyNames(object);
          var symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
          if (properties.length === 0 && symbols.length === 0) {
            return "{}";
          }
          options.truncate -= 4;
          options.seen = options.seen || [];
          if (options.seen.indexOf(object) >= 0) {
            return "[Circular]";
          }
          options.seen.push(object);
          var propertyContents = inspectList(properties.map(function(key) {
            return [key, object[key]];
          }), options, inspectProperty);
          var symbolContents = inspectList(symbols.map(function(key) {
            return [key, object[key]];
          }), options, inspectProperty);
          options.seen.pop();
          var sep = "";
          if (propertyContents && symbolContents) {
            sep = ", ";
          }
          return "{ ".concat(propertyContents).concat(sep).concat(symbolContents, " }");
        }
        var toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag ? Symbol.toStringTag : false;
        function inspectClass(value, options) {
          var name = "";
          if (toStringTag && toStringTag in value) {
            name = value[toStringTag];
          }
          name = name || getFuncName_1(value.constructor);
          if (!name || name === "_class") {
            name = "<Anonymous Class>";
          }
          options.truncate -= name.length;
          return "".concat(name).concat(inspectObject(value, options));
        }
        function inspectArguments(args, options) {
          if (args.length === 0)
            return "Arguments[]";
          options.truncate -= 13;
          return "Arguments[ ".concat(inspectList(args, options), " ]");
        }
        var errorKeys = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description"];
        function inspectObject$1(error, options) {
          var properties = Object.getOwnPropertyNames(error).filter(function(key) {
            return errorKeys.indexOf(key) === -1;
          });
          var name = error.name;
          options.truncate -= name.length;
          var message = "";
          if (typeof error.message === "string") {
            message = truncate(error.message, options.truncate);
          } else {
            properties.unshift("message");
          }
          message = message ? ": ".concat(message) : "";
          options.truncate -= message.length + 5;
          var propertyContents = inspectList(properties.map(function(key) {
            return [key, error[key]];
          }), options, inspectProperty);
          return "".concat(name).concat(message).concat(propertyContents ? " { ".concat(propertyContents, " }") : "");
        }
        function inspectAttribute(_ref, options) {
          var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
          options.truncate -= 3;
          if (!value) {
            return "".concat(options.stylize(key, "yellow"));
          }
          return "".concat(options.stylize(key, "yellow"), "=").concat(options.stylize('"'.concat(value, '"'), "string"));
        }
        function inspectHTMLCollection(collection, options) {
          return inspectList(collection, options, inspectHTML, "\n");
        }
        function inspectHTML(element, options) {
          var properties = element.getAttributeNames();
          var name = element.tagName.toLowerCase();
          var head = options.stylize("<".concat(name), "special");
          var headClose = options.stylize(">", "special");
          var tail = options.stylize("</".concat(name, ">"), "special");
          options.truncate -= name.length * 2 + 5;
          var propertyContents = "";
          if (properties.length > 0) {
            propertyContents += " ";
            propertyContents += inspectList(properties.map(function(key) {
              return [key, element.getAttribute(key)];
            }), options, inspectAttribute, " ");
          }
          options.truncate -= propertyContents.length;
          var truncate2 = options.truncate;
          var children = inspectHTMLCollection(element.children, options);
          if (children && children.length > truncate2) {
            children = "".concat(truncator, "(").concat(element.children.length, ")");
          }
          return "".concat(head).concat(propertyContents).concat(headClose).concat(children).concat(tail);
        }
        var symbolsSupported = typeof Symbol === "function" && typeof Symbol.for === "function";
        var chaiInspect = symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect";
        var nodeInspect = false;
        try {
          var nodeUtil = require_util();
          nodeInspect = nodeUtil.inspect ? nodeUtil.inspect.custom : false;
        } catch (noNodeInspect) {
          nodeInspect = false;
        }
        function FakeMap() {
          this.key = "chai/loupe__" + Math.random() + Date.now();
        }
        FakeMap.prototype = {
          // eslint-disable-next-line object-shorthand
          get: function get(key) {
            return key[this.key];
          },
          // eslint-disable-next-line object-shorthand
          has: function has(key) {
            return this.key in key;
          },
          // eslint-disable-next-line object-shorthand
          set: function set(key, value) {
            if (Object.isExtensible(key)) {
              Object.defineProperty(key, this.key, {
                // eslint-disable-next-line object-shorthand
                value,
                configurable: true
              });
            }
          }
        };
        var constructorMap = new (typeof WeakMap === "function" ? WeakMap : FakeMap)();
        var stringTagMap = {};
        var baseTypesMap = {
          undefined: function undefined$1(value, options) {
            return options.stylize("undefined", "undefined");
          },
          null: function _null(value, options) {
            return options.stylize(null, "null");
          },
          boolean: function boolean(value, options) {
            return options.stylize(value, "boolean");
          },
          Boolean: function Boolean2(value, options) {
            return options.stylize(value, "boolean");
          },
          number: inspectNumber,
          Number: inspectNumber,
          bigint: inspectBigInt,
          BigInt: inspectBigInt,
          string: inspectString,
          String: inspectString,
          function: inspectFunction,
          Function: inspectFunction,
          symbol: inspectSymbol,
          // A Symbol polyfill will return `Symbol` not `symbol` from typedetect
          Symbol: inspectSymbol,
          Array: inspectArray,
          Date: inspectDate,
          Map: inspectMap,
          Set: inspectSet,
          RegExp: inspectRegExp,
          Promise: inspectPromise,
          // WeakSet, WeakMap are totally opaque to us
          WeakSet: function WeakSet2(value, options) {
            return options.stylize("WeakSet{\u2026}", "special");
          },
          WeakMap: function WeakMap2(value, options) {
            return options.stylize("WeakMap{\u2026}", "special");
          },
          Arguments: inspectArguments,
          Int8Array: inspectTypedArray,
          Uint8Array: inspectTypedArray,
          Uint8ClampedArray: inspectTypedArray,
          Int16Array: inspectTypedArray,
          Uint16Array: inspectTypedArray,
          Int32Array: inspectTypedArray,
          Uint32Array: inspectTypedArray,
          Float32Array: inspectTypedArray,
          Float64Array: inspectTypedArray,
          Generator: function Generator() {
            return "";
          },
          DataView: function DataView2() {
            return "";
          },
          ArrayBuffer: function ArrayBuffer() {
            return "";
          },
          Error: inspectObject$1,
          HTMLCollection: inspectHTMLCollection,
          NodeList: inspectHTMLCollection
        };
        var inspectCustom = function inspectCustom2(value, options, type) {
          if (chaiInspect in value && typeof value[chaiInspect] === "function") {
            return value[chaiInspect](options);
          }
          if (nodeInspect && nodeInspect in value && typeof value[nodeInspect] === "function") {
            return value[nodeInspect](options.depth, options);
          }
          if ("inspect" in value && typeof value.inspect === "function") {
            return value.inspect(options.depth, options);
          }
          if ("constructor" in value && constructorMap.has(value.constructor)) {
            return constructorMap.get(value.constructor)(value, options);
          }
          if (stringTagMap[type]) {
            return stringTagMap[type](value, options);
          }
          return "";
        };
        var toString$1 = Object.prototype.toString;
        function inspect(value, options) {
          options = normaliseOptions(options);
          options.inspect = inspect;
          var _options = options, customInspect = _options.customInspect;
          var type = value === null ? "null" : _typeof(value);
          if (type === "object") {
            type = toString$1.call(value).slice(8, -1);
          }
          if (baseTypesMap[type]) {
            return baseTypesMap[type](value, options);
          }
          if (customInspect && value) {
            var output = inspectCustom(value, options, type);
            if (output) {
              if (typeof output === "string")
                return output;
              return inspect(output, options);
            }
          }
          var proto = value ? Object.getPrototypeOf(value) : false;
          if (proto === Object.prototype || proto === null) {
            return inspectObject(value, options);
          }
          if (value && typeof HTMLElement === "function" && value instanceof HTMLElement) {
            return inspectHTML(value, options);
          }
          if ("constructor" in value) {
            if (value.constructor !== Object) {
              return inspectClass(value, options);
            }
            return inspectObject(value, options);
          }
          if (value === Object(value)) {
            return inspectObject(value, options);
          }
          return options.stylize(String(value), type);
        }
        function registerConstructor(constructor, inspector) {
          if (constructorMap.has(constructor)) {
            return false;
          }
          constructorMap.set(constructor, inspector);
          return true;
        }
        function registerStringTag(stringTag, inspector) {
          if (stringTag in stringTagMap) {
            return false;
          }
          stringTagMap[stringTag] = inspector;
          return true;
        }
        var custom = chaiInspect;
        exports2.custom = custom;
        exports2.default = inspect;
        exports2.inspect = inspect;
        exports2.registerConstructor = registerConstructor;
        exports2.registerStringTag = registerStringTag;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/chai/lib/chai/config.js
  var require_config = __commonJS({
    "node_modules/chai/lib/chai/config.js"(exports, module) {
      module.exports = {
        /**
         * ### config.includeStack
         *
         * User configurable property, influences whether stack trace
         * is included in Assertion error message. Default of false
         * suppresses stack trace in the error message.
         *
         *     chai.config.includeStack = true;  // enable stack on error
         *
         * @param {Boolean}
         * @api public
         */
        includeStack: false,
        /**
         * ### config.showDiff
         *
         * User configurable property, influences whether or not
         * the `showDiff` flag should be included in the thrown
         * AssertionErrors. `false` will always be `false`; `true`
         * will be true when the assertion has requested a diff
         * be shown.
         *
         * @param {Boolean}
         * @api public
         */
        showDiff: true,
        /**
         * ### config.truncateThreshold
         *
         * User configurable property, sets length threshold for actual and
         * expected values in assertion errors. If this threshold is exceeded, for
         * example for large data structures, the value is replaced with something
         * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
         *
         * Set it to zero if you want to disable truncating altogether.
         *
         * This is especially userful when doing assertions on arrays: having this
         * set to a reasonable large value makes the failure messages readily
         * inspectable.
         *
         *     chai.config.truncateThreshold = 0;  // disable truncating
         *
         * @param {Number}
         * @api public
         */
        truncateThreshold: 40,
        /**
         * ### config.useProxy
         *
         * User configurable property, defines if chai will use a Proxy to throw
         * an error when a non-existent property is read, which protects users
         * from typos when using property-based assertions.
         *
         * Set it to false if you want to disable this feature.
         *
         *     chai.config.useProxy = false;  // disable use of Proxy
         *
         * This feature is automatically disabled regardless of this config value
         * in environments that don't support proxies.
         *
         * @param {Boolean}
         * @api public
         */
        useProxy: true,
        /**
         * ### config.proxyExcludedKeys
         *
         * User configurable property, defines which properties should be ignored
         * instead of throwing an error if they do not exist on the assertion.
         * This is only applied if the environment Chai is running in supports proxies and
         * if the `useProxy` configuration setting is enabled.
         * By default, `then` and `inspect` will not throw an error if they do not exist on the
         * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
         * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
         *
         *     // By default these keys will not throw an error if they do not exist on the assertion object
         *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
         *
         * @param {Array}
         * @api public
         */
        proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"]
      };
    }
  });

  // node_modules/chai/lib/chai/utils/inspect.js
  var require_inspect = __commonJS({
    "node_modules/chai/lib/chai/utils/inspect.js"(exports, module) {
      var getName = require_get_func_name();
      var loupe = require_loupe();
      var config2 = require_config();
      module.exports = inspect;
      function inspect(obj, showHidden, depth, colors) {
        var options = {
          colors,
          depth: typeof depth === "undefined" ? 2 : depth,
          showHidden,
          truncate: config2.truncateThreshold ? config2.truncateThreshold : Infinity
        };
        return loupe.inspect(obj, options);
      }
    }
  });

  // node_modules/chai/lib/chai/utils/objDisplay.js
  var require_objDisplay = __commonJS({
    "node_modules/chai/lib/chai/utils/objDisplay.js"(exports, module) {
      var inspect = require_inspect();
      var config2 = require_config();
      module.exports = function objDisplay(obj) {
        var str = inspect(obj), type = Object.prototype.toString.call(obj);
        if (config2.truncateThreshold && str.length >= config2.truncateThreshold) {
          if (type === "[object Function]") {
            return !obj.name || obj.name === "" ? "[Function]" : "[Function: " + obj.name + "]";
          } else if (type === "[object Array]") {
            return "[ Array(" + obj.length + ") ]";
          } else if (type === "[object Object]") {
            var keys = Object.keys(obj), kstr = keys.length > 2 ? keys.splice(0, 2).join(", ") + ", ..." : keys.join(", ");
            return "{ Object (" + kstr + ") }";
          } else {
            return str;
          }
        } else {
          return str;
        }
      };
    }
  });

  // node_modules/chai/lib/chai/utils/getMessage.js
  var require_getMessage = __commonJS({
    "node_modules/chai/lib/chai/utils/getMessage.js"(exports, module) {
      var flag = require_flag();
      var getActual = require_getActual();
      var objDisplay = require_objDisplay();
      module.exports = function getMessage(obj, args) {
        var negate = flag(obj, "negate"), val = flag(obj, "object"), expected = args[3], actual = getActual(obj, args), msg = negate ? args[2] : args[1], flagMsg = flag(obj, "message");
        if (typeof msg === "function")
          msg = msg();
        msg = msg || "";
        msg = msg.replace(/#\{this\}/g, function() {
          return objDisplay(val);
        }).replace(/#\{act\}/g, function() {
          return objDisplay(actual);
        }).replace(/#\{exp\}/g, function() {
          return objDisplay(expected);
        });
        return flagMsg ? flagMsg + ": " + msg : msg;
      };
    }
  });

  // node_modules/chai/lib/chai/utils/transferFlags.js
  var require_transferFlags = __commonJS({
    "node_modules/chai/lib/chai/utils/transferFlags.js"(exports, module) {
      module.exports = function transferFlags(assertion, object, includeAll) {
        var flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
        if (!object.__flags) {
          object.__flags = /* @__PURE__ */ Object.create(null);
        }
        includeAll = arguments.length === 3 ? includeAll : true;
        for (var flag in flags) {
          if (includeAll || flag !== "object" && flag !== "ssfi" && flag !== "lockSsfi" && flag != "message") {
            object.__flags[flag] = flags[flag];
          }
        }
      };
    }
  });

  // node_modules/deep-eql/index.js
  var require_deep_eql = __commonJS({
    "node_modules/deep-eql/index.js"(exports, module) {
      "use strict";
      var type = require_type_detect();
      function FakeMap() {
        this._key = "chai/deep-eql__" + Math.random() + Date.now();
      }
      FakeMap.prototype = {
        get: function get(key) {
          return key[this._key];
        },
        set: function set(key, value) {
          if (Object.isExtensible(key)) {
            Object.defineProperty(key, this._key, {
              value,
              configurable: true
            });
          }
        }
      };
      var MemoizeMap = typeof WeakMap === "function" ? WeakMap : FakeMap;
      function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
        if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
          return null;
        }
        var leftHandMap = memoizeMap.get(leftHandOperand);
        if (leftHandMap) {
          var result = leftHandMap.get(rightHandOperand);
          if (typeof result === "boolean") {
            return result;
          }
        }
        return null;
      }
      function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
        if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
          return;
        }
        var leftHandMap = memoizeMap.get(leftHandOperand);
        if (leftHandMap) {
          leftHandMap.set(rightHandOperand, result);
        } else {
          leftHandMap = new MemoizeMap();
          leftHandMap.set(rightHandOperand, result);
          memoizeMap.set(leftHandOperand, leftHandMap);
        }
      }
      module.exports = deepEqual;
      module.exports.MemoizeMap = MemoizeMap;
      function deepEqual(leftHandOperand, rightHandOperand, options) {
        if (options && options.comparator) {
          return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
        }
        var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
        if (simpleResult !== null) {
          return simpleResult;
        }
        return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
      }
      function simpleEqual(leftHandOperand, rightHandOperand) {
        if (leftHandOperand === rightHandOperand) {
          return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
        }
        if (leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
        rightHandOperand !== rightHandOperand) {
          return true;
        }
        if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
          return false;
        }
        return null;
      }
      function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
        options = options || {};
        options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
        var comparator = options && options.comparator;
        var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
        if (memoizeResultLeft !== null) {
          return memoizeResultLeft;
        }
        var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
        if (memoizeResultRight !== null) {
          return memoizeResultRight;
        }
        if (comparator) {
          var comparatorResult = comparator(leftHandOperand, rightHandOperand);
          if (comparatorResult === false || comparatorResult === true) {
            memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
            return comparatorResult;
          }
          var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
          if (simpleResult !== null) {
            return simpleResult;
          }
        }
        var leftHandType = type(leftHandOperand);
        if (leftHandType !== type(rightHandOperand)) {
          memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
          return false;
        }
        memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
        var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
        memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
        return result;
      }
      function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
        switch (leftHandType) {
          case "String":
          case "Number":
          case "Boolean":
          case "Date":
            return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
          case "Promise":
          case "Symbol":
          case "function":
          case "WeakMap":
          case "WeakSet":
            return leftHandOperand === rightHandOperand;
          case "Error":
            return keysEqual(leftHandOperand, rightHandOperand, ["name", "message", "code"], options);
          case "Arguments":
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "Array":
            return iterableEqual(leftHandOperand, rightHandOperand, options);
          case "RegExp":
            return regexpEqual(leftHandOperand, rightHandOperand);
          case "Generator":
            return generatorEqual(leftHandOperand, rightHandOperand, options);
          case "DataView":
            return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
          case "ArrayBuffer":
            return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
          case "Set":
            return entriesEqual(leftHandOperand, rightHandOperand, options);
          case "Map":
            return entriesEqual(leftHandOperand, rightHandOperand, options);
          case "Temporal.PlainDate":
          case "Temporal.PlainTime":
          case "Temporal.PlainDateTime":
          case "Temporal.Instant":
          case "Temporal.ZonedDateTime":
          case "Temporal.PlainYearMonth":
          case "Temporal.PlainMonthDay":
            return leftHandOperand.equals(rightHandOperand);
          case "Temporal.Duration":
            return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
          case "Temporal.TimeZone":
          case "Temporal.Calendar":
            return leftHandOperand.toString() === rightHandOperand.toString();
          default:
            return objectEqual(leftHandOperand, rightHandOperand, options);
        }
      }
      function regexpEqual(leftHandOperand, rightHandOperand) {
        return leftHandOperand.toString() === rightHandOperand.toString();
      }
      function entriesEqual(leftHandOperand, rightHandOperand, options) {
        if (leftHandOperand.size !== rightHandOperand.size) {
          return false;
        }
        if (leftHandOperand.size === 0) {
          return true;
        }
        var leftHandItems = [];
        var rightHandItems = [];
        leftHandOperand.forEach(function gatherEntries(key, value) {
          leftHandItems.push([key, value]);
        });
        rightHandOperand.forEach(function gatherEntries(key, value) {
          rightHandItems.push([key, value]);
        });
        return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
      }
      function iterableEqual(leftHandOperand, rightHandOperand, options) {
        var length = leftHandOperand.length;
        if (length !== rightHandOperand.length) {
          return false;
        }
        if (length === 0) {
          return true;
        }
        var index = -1;
        while (++index < length) {
          if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
            return false;
          }
        }
        return true;
      }
      function generatorEqual(leftHandOperand, rightHandOperand, options) {
        return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
      }
      function hasIteratorFunction(target) {
        return typeof Symbol !== "undefined" && typeof target === "object" && typeof Symbol.iterator !== "undefined" && typeof target[Symbol.iterator] === "function";
      }
      function getIteratorEntries(target) {
        if (hasIteratorFunction(target)) {
          try {
            return getGeneratorEntries(target[Symbol.iterator]());
          } catch (iteratorError) {
            return [];
          }
        }
        return [];
      }
      function getGeneratorEntries(generator) {
        var generatorResult = generator.next();
        var accumulator = [generatorResult.value];
        while (generatorResult.done === false) {
          generatorResult = generator.next();
          accumulator.push(generatorResult.value);
        }
        return accumulator;
      }
      function getEnumerableKeys(target) {
        var keys = [];
        for (var key in target) {
          keys.push(key);
        }
        return keys;
      }
      function getEnumerableSymbols(target) {
        var keys = [];
        var allKeys = Object.getOwnPropertySymbols(target);
        for (var i = 0; i < allKeys.length; i += 1) {
          var key = allKeys[i];
          if (Object.getOwnPropertyDescriptor(target, key).enumerable) {
            keys.push(key);
          }
        }
        return keys;
      }
      function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
        var length = keys.length;
        if (length === 0) {
          return true;
        }
        for (var i = 0; i < length; i += 1) {
          if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
            return false;
          }
        }
        return true;
      }
      function objectEqual(leftHandOperand, rightHandOperand, options) {
        var leftHandKeys = getEnumerableKeys(leftHandOperand);
        var rightHandKeys = getEnumerableKeys(rightHandOperand);
        var leftHandSymbols = getEnumerableSymbols(leftHandOperand);
        var rightHandSymbols = getEnumerableSymbols(rightHandOperand);
        leftHandKeys = leftHandKeys.concat(leftHandSymbols);
        rightHandKeys = rightHandKeys.concat(rightHandSymbols);
        if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
          if (iterableEqual(mapSymbols(leftHandKeys).sort(), mapSymbols(rightHandKeys).sort()) === false) {
            return false;
          }
          return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
        }
        var leftHandEntries = getIteratorEntries(leftHandOperand);
        var rightHandEntries = getIteratorEntries(rightHandOperand);
        if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
          leftHandEntries.sort();
          rightHandEntries.sort();
          return iterableEqual(leftHandEntries, rightHandEntries, options);
        }
        if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
          return true;
        }
        return false;
      }
      function isPrimitive(value) {
        return value === null || typeof value !== "object";
      }
      function mapSymbols(arr) {
        return arr.map(function mapSymbol(entry) {
          if (typeof entry === "symbol") {
            return entry.toString();
          }
          return entry;
        });
      }
    }
  });

  // node_modules/chai/lib/chai/utils/isProxyEnabled.js
  var require_isProxyEnabled = __commonJS({
    "node_modules/chai/lib/chai/utils/isProxyEnabled.js"(exports, module) {
      var config2 = require_config();
      module.exports = function isProxyEnabled() {
        return config2.useProxy && typeof Proxy !== "undefined" && typeof Reflect !== "undefined";
      };
    }
  });

  // node_modules/chai/lib/chai/utils/addProperty.js
  var require_addProperty = __commonJS({
    "node_modules/chai/lib/chai/utils/addProperty.js"(exports, module) {
      var chai2 = require_chai();
      var flag = require_flag();
      var isProxyEnabled = require_isProxyEnabled();
      var transferFlags = require_transferFlags();
      module.exports = function addProperty(ctx, name, getter) {
        getter = getter === void 0 ? function() {
        } : getter;
        Object.defineProperty(
          ctx,
          name,
          {
            get: function propertyGetter() {
              if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
                flag(this, "ssfi", propertyGetter);
              }
              var result = getter.call(this);
              if (result !== void 0)
                return result;
              var newAssertion = new chai2.Assertion();
              transferFlags(this, newAssertion);
              return newAssertion;
            },
            configurable: true
          }
        );
      };
    }
  });

  // node_modules/chai/lib/chai/utils/addLengthGuard.js
  var require_addLengthGuard = __commonJS({
    "node_modules/chai/lib/chai/utils/addLengthGuard.js"(exports, module) {
      var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {
      }, "length");
      module.exports = function addLengthGuard(fn, assertionName, isChainable) {
        if (!fnLengthDesc.configurable)
          return fn;
        Object.defineProperty(fn, "length", {
          get: function() {
            if (isChainable) {
              throw Error("Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
            }
            throw Error("Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".');
          }
        });
        return fn;
      };
    }
  });

  // node_modules/chai/lib/chai/utils/getProperties.js
  var require_getProperties = __commonJS({
    "node_modules/chai/lib/chai/utils/getProperties.js"(exports, module) {
      module.exports = function getProperties(object) {
        var result = Object.getOwnPropertyNames(object);
        function addProperty(property) {
          if (result.indexOf(property) === -1) {
            result.push(property);
          }
        }
        var proto = Object.getPrototypeOf(object);
        while (proto !== null) {
          Object.getOwnPropertyNames(proto).forEach(addProperty);
          proto = Object.getPrototypeOf(proto);
        }
        return result;
      };
    }
  });

  // node_modules/chai/lib/chai/utils/proxify.js
  var require_proxify = __commonJS({
    "node_modules/chai/lib/chai/utils/proxify.js"(exports, module) {
      var config2 = require_config();
      var flag = require_flag();
      var getProperties = require_getProperties();
      var isProxyEnabled = require_isProxyEnabled();
      var builtins = ["__flags", "__methods", "_obj", "assert"];
      module.exports = function proxify(obj, nonChainableMethodName) {
        if (!isProxyEnabled())
          return obj;
        return new Proxy(obj, {
          get: function proxyGetter(target, property) {
            if (typeof property === "string" && config2.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
              if (nonChainableMethodName) {
                throw Error("Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
              }
              var suggestion = null;
              var suggestionDistance = 4;
              getProperties(target).forEach(function(prop) {
                if (!Object.prototype.hasOwnProperty(prop) && builtins.indexOf(prop) === -1) {
                  var dist = stringDistanceCapped(
                    property,
                    prop,
                    suggestionDistance
                  );
                  if (dist < suggestionDistance) {
                    suggestion = prop;
                    suggestionDistance = dist;
                  }
                }
              });
              if (suggestion !== null) {
                throw Error("Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?');
              } else {
                throw Error("Invalid Chai property: " + property);
              }
            }
            if (builtins.indexOf(property) === -1 && !flag(target, "lockSsfi")) {
              flag(target, "ssfi", proxyGetter);
            }
            return Reflect.get(target, property);
          }
        });
      };
      function stringDistanceCapped(strA, strB, cap) {
        if (Math.abs(strA.length - strB.length) >= cap) {
          return cap;
        }
        var memo = [];
        for (var i = 0; i <= strA.length; i++) {
          memo[i] = Array(strB.length + 1).fill(0);
          memo[i][0] = i;
        }
        for (var j = 0; j < strB.length; j++) {
          memo[0][j] = j;
        }
        for (var i = 1; i <= strA.length; i++) {
          var ch = strA.charCodeAt(i - 1);
          for (var j = 1; j <= strB.length; j++) {
            if (Math.abs(i - j) >= cap) {
              memo[i][j] = cap;
              continue;
            }
            memo[i][j] = Math.min(
              memo[i - 1][j] + 1,
              memo[i][j - 1] + 1,
              memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1)
            );
          }
        }
        return memo[strA.length][strB.length];
      }
    }
  });

  // node_modules/chai/lib/chai/utils/addMethod.js
  var require_addMethod = __commonJS({
    "node_modules/chai/lib/chai/utils/addMethod.js"(exports, module) {
      var addLengthGuard = require_addLengthGuard();
      var chai2 = require_chai();
      var flag = require_flag();
      var proxify = require_proxify();
      var transferFlags = require_transferFlags();
      module.exports = function addMethod(ctx, name, method) {
        var methodWrapper = function() {
          if (!flag(this, "lockSsfi")) {
            flag(this, "ssfi", methodWrapper);
          }
          var result = method.apply(this, arguments);
          if (result !== void 0)
            return result;
          var newAssertion = new chai2.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };
        addLengthGuard(methodWrapper, name, false);
        ctx[name] = proxify(methodWrapper, name);
      };
    }
  });

  // node_modules/chai/lib/chai/utils/overwriteProperty.js
  var require_overwriteProperty = __commonJS({
    "node_modules/chai/lib/chai/utils/overwriteProperty.js"(exports, module) {
      var chai2 = require_chai();
      var flag = require_flag();
      var isProxyEnabled = require_isProxyEnabled();
      var transferFlags = require_transferFlags();
      module.exports = function overwriteProperty(ctx, name, getter) {
        var _get = Object.getOwnPropertyDescriptor(ctx, name), _super = function() {
        };
        if (_get && "function" === typeof _get.get)
          _super = _get.get;
        Object.defineProperty(
          ctx,
          name,
          {
            get: function overwritingPropertyGetter() {
              if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
                flag(this, "ssfi", overwritingPropertyGetter);
              }
              var origLockSsfi = flag(this, "lockSsfi");
              flag(this, "lockSsfi", true);
              var result = getter(_super).call(this);
              flag(this, "lockSsfi", origLockSsfi);
              if (result !== void 0) {
                return result;
              }
              var newAssertion = new chai2.Assertion();
              transferFlags(this, newAssertion);
              return newAssertion;
            },
            configurable: true
          }
        );
      };
    }
  });

  // node_modules/chai/lib/chai/utils/overwriteMethod.js
  var require_overwriteMethod = __commonJS({
    "node_modules/chai/lib/chai/utils/overwriteMethod.js"(exports, module) {
      var addLengthGuard = require_addLengthGuard();
      var chai2 = require_chai();
      var flag = require_flag();
      var proxify = require_proxify();
      var transferFlags = require_transferFlags();
      module.exports = function overwriteMethod(ctx, name, method) {
        var _method = ctx[name], _super = function() {
          throw new Error(name + " is not a function");
        };
        if (_method && "function" === typeof _method)
          _super = _method;
        var overwritingMethodWrapper = function() {
          if (!flag(this, "lockSsfi")) {
            flag(this, "ssfi", overwritingMethodWrapper);
          }
          var origLockSsfi = flag(this, "lockSsfi");
          flag(this, "lockSsfi", true);
          var result = method(_super).apply(this, arguments);
          flag(this, "lockSsfi", origLockSsfi);
          if (result !== void 0) {
            return result;
          }
          var newAssertion = new chai2.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };
        addLengthGuard(overwritingMethodWrapper, name, false);
        ctx[name] = proxify(overwritingMethodWrapper, name);
      };
    }
  });

  // node_modules/chai/lib/chai/utils/addChainableMethod.js
  var require_addChainableMethod = __commonJS({
    "node_modules/chai/lib/chai/utils/addChainableMethod.js"(exports, module) {
      var addLengthGuard = require_addLengthGuard();
      var chai2 = require_chai();
      var flag = require_flag();
      var proxify = require_proxify();
      var transferFlags = require_transferFlags();
      var canSetPrototype = typeof Object.setPrototypeOf === "function";
      var testFn = function() {
      };
      var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
        var propDesc = Object.getOwnPropertyDescriptor(testFn, name);
        if (typeof propDesc !== "object")
          return true;
        return !propDesc.configurable;
      });
      var call = Function.prototype.call;
      var apply = Function.prototype.apply;
      module.exports = function addChainableMethod(ctx, name, method, chainingBehavior) {
        if (typeof chainingBehavior !== "function") {
          chainingBehavior = function() {
          };
        }
        var chainableBehavior = {
          method,
          chainingBehavior
        };
        if (!ctx.__methods) {
          ctx.__methods = {};
        }
        ctx.__methods[name] = chainableBehavior;
        Object.defineProperty(
          ctx,
          name,
          {
            get: function chainableMethodGetter() {
              chainableBehavior.chainingBehavior.call(this);
              var chainableMethodWrapper = function() {
                if (!flag(this, "lockSsfi")) {
                  flag(this, "ssfi", chainableMethodWrapper);
                }
                var result = chainableBehavior.method.apply(this, arguments);
                if (result !== void 0) {
                  return result;
                }
                var newAssertion = new chai2.Assertion();
                transferFlags(this, newAssertion);
                return newAssertion;
              };
              addLengthGuard(chainableMethodWrapper, name, true);
              if (canSetPrototype) {
                var prototype = Object.create(this);
                prototype.call = call;
                prototype.apply = apply;
                Object.setPrototypeOf(chainableMethodWrapper, prototype);
              } else {
                var asserterNames = Object.getOwnPropertyNames(ctx);
                asserterNames.forEach(function(asserterName) {
                  if (excludeNames.indexOf(asserterName) !== -1) {
                    return;
                  }
                  var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
                  Object.defineProperty(chainableMethodWrapper, asserterName, pd);
                });
              }
              transferFlags(this, chainableMethodWrapper);
              return proxify(chainableMethodWrapper);
            },
            configurable: true
          }
        );
      };
    }
  });

  // node_modules/chai/lib/chai/utils/overwriteChainableMethod.js
  var require_overwriteChainableMethod = __commonJS({
    "node_modules/chai/lib/chai/utils/overwriteChainableMethod.js"(exports, module) {
      var chai2 = require_chai();
      var transferFlags = require_transferFlags();
      module.exports = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
        var chainableBehavior = ctx.__methods[name];
        var _chainingBehavior = chainableBehavior.chainingBehavior;
        chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
          var result = chainingBehavior(_chainingBehavior).call(this);
          if (result !== void 0) {
            return result;
          }
          var newAssertion = new chai2.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };
        var _method = chainableBehavior.method;
        chainableBehavior.method = function overwritingChainableMethodWrapper() {
          var result = method(_method).apply(this, arguments);
          if (result !== void 0) {
            return result;
          }
          var newAssertion = new chai2.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };
      };
    }
  });

  // node_modules/chai/lib/chai/utils/compareByInspect.js
  var require_compareByInspect = __commonJS({
    "node_modules/chai/lib/chai/utils/compareByInspect.js"(exports, module) {
      var inspect = require_inspect();
      module.exports = function compareByInspect(a, b) {
        return inspect(a) < inspect(b) ? -1 : 1;
      };
    }
  });

  // node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js
  var require_getOwnEnumerablePropertySymbols = __commonJS({
    "node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js"(exports, module) {
      module.exports = function getOwnEnumerablePropertySymbols(obj) {
        if (typeof Object.getOwnPropertySymbols !== "function")
          return [];
        return Object.getOwnPropertySymbols(obj).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
        });
      };
    }
  });

  // node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js
  var require_getOwnEnumerableProperties = __commonJS({
    "node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js"(exports, module) {
      var getOwnEnumerablePropertySymbols = require_getOwnEnumerablePropertySymbols();
      module.exports = function getOwnEnumerableProperties(obj) {
        return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
      };
    }
  });

  // node_modules/check-error/index.js
  var require_check_error = __commonJS({
    "node_modules/check-error/index.js"(exports, module) {
      "use strict";
      var getFunctionName = require_get_func_name();
      function compatibleInstance(thrown, errorLike) {
        return errorLike instanceof Error && thrown === errorLike;
      }
      function compatibleConstructor(thrown, errorLike) {
        if (errorLike instanceof Error) {
          return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
        } else if (errorLike.prototype instanceof Error || errorLike === Error) {
          return thrown.constructor === errorLike || thrown instanceof errorLike;
        }
        return false;
      }
      function compatibleMessage(thrown, errMatcher) {
        var comparisonString = typeof thrown === "string" ? thrown : thrown.message;
        if (errMatcher instanceof RegExp) {
          return errMatcher.test(comparisonString);
        } else if (typeof errMatcher === "string") {
          return comparisonString.indexOf(errMatcher) !== -1;
        }
        return false;
      }
      function getConstructorName(errorLike) {
        var constructorName = errorLike;
        if (errorLike instanceof Error) {
          constructorName = getFunctionName(errorLike.constructor);
        } else if (typeof errorLike === "function") {
          constructorName = getFunctionName(errorLike);
          if (constructorName === "") {
            var newConstructorName = getFunctionName(new errorLike());
            constructorName = newConstructorName || constructorName;
          }
        }
        return constructorName;
      }
      function getMessage(errorLike) {
        var msg = "";
        if (errorLike && errorLike.message) {
          msg = errorLike.message;
        } else if (typeof errorLike === "string") {
          msg = errorLike;
        }
        return msg;
      }
      module.exports = {
        compatibleInstance,
        compatibleConstructor,
        compatibleMessage,
        getMessage,
        getConstructorName
      };
    }
  });

  // node_modules/chai/lib/chai/utils/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/chai/lib/chai/utils/isNaN.js"(exports, module) {
      function isNaN(value) {
        return value !== value;
      }
      module.exports = Number.isNaN || isNaN;
    }
  });

  // node_modules/chai/lib/chai/utils/getOperator.js
  var require_getOperator = __commonJS({
    "node_modules/chai/lib/chai/utils/getOperator.js"(exports, module) {
      var type = require_type_detect();
      var flag = require_flag();
      function isObjectType(obj) {
        var objectType = type(obj);
        var objectTypes = ["Array", "Object", "function"];
        return objectTypes.indexOf(objectType) !== -1;
      }
      module.exports = function getOperator(obj, args) {
        var operator = flag(obj, "operator");
        var negate = flag(obj, "negate");
        var expected = args[3];
        var msg = negate ? args[2] : args[1];
        if (operator) {
          return operator;
        }
        if (typeof msg === "function")
          msg = msg();
        msg = msg || "";
        if (!msg) {
          return void 0;
        }
        if (/\shave\s/.test(msg)) {
          return void 0;
        }
        var isObject = isObjectType(expected);
        if (/\snot\s/.test(msg)) {
          return isObject ? "notDeepStrictEqual" : "notStrictEqual";
        }
        return isObject ? "deepStrictEqual" : "strictEqual";
      };
    }
  });

  // node_modules/chai/lib/chai/utils/index.js
  var require_utils = __commonJS({
    "node_modules/chai/lib/chai/utils/index.js"(exports) {
      var pathval = require_pathval();
      exports.test = require_test();
      exports.type = require_type_detect();
      exports.expectTypes = require_expectTypes();
      exports.getMessage = require_getMessage();
      exports.getActual = require_getActual();
      exports.inspect = require_inspect();
      exports.objDisplay = require_objDisplay();
      exports.flag = require_flag();
      exports.transferFlags = require_transferFlags();
      exports.eql = require_deep_eql();
      exports.getPathInfo = pathval.getPathInfo;
      exports.hasProperty = pathval.hasProperty;
      exports.getName = require_get_func_name();
      exports.addProperty = require_addProperty();
      exports.addMethod = require_addMethod();
      exports.overwriteProperty = require_overwriteProperty();
      exports.overwriteMethod = require_overwriteMethod();
      exports.addChainableMethod = require_addChainableMethod();
      exports.overwriteChainableMethod = require_overwriteChainableMethod();
      exports.compareByInspect = require_compareByInspect();
      exports.getOwnEnumerablePropertySymbols = require_getOwnEnumerablePropertySymbols();
      exports.getOwnEnumerableProperties = require_getOwnEnumerableProperties();
      exports.checkError = require_check_error();
      exports.proxify = require_proxify();
      exports.addLengthGuard = require_addLengthGuard();
      exports.isProxyEnabled = require_isProxyEnabled();
      exports.isNaN = require_isNaN();
      exports.getOperator = require_getOperator();
    }
  });

  // node_modules/chai/lib/chai/assertion.js
  var require_assertion = __commonJS({
    "node_modules/chai/lib/chai/assertion.js"(exports, module) {
      var config2 = require_config();
      module.exports = function(_chai, util2) {
        var AssertionError2 = _chai.AssertionError, flag = util2.flag;
        _chai.Assertion = Assertion2;
        function Assertion2(obj, msg, ssfi, lockSsfi) {
          flag(this, "ssfi", ssfi || Assertion2);
          flag(this, "lockSsfi", lockSsfi);
          flag(this, "object", obj);
          flag(this, "message", msg);
          return util2.proxify(this);
        }
        Object.defineProperty(Assertion2, "includeStack", {
          get: function() {
            console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
            return config2.includeStack;
          },
          set: function(value) {
            console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
            config2.includeStack = value;
          }
        });
        Object.defineProperty(Assertion2, "showDiff", {
          get: function() {
            console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
            return config2.showDiff;
          },
          set: function(value) {
            console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
            config2.showDiff = value;
          }
        });
        Assertion2.addProperty = function(name, fn) {
          util2.addProperty(this.prototype, name, fn);
        };
        Assertion2.addMethod = function(name, fn) {
          util2.addMethod(this.prototype, name, fn);
        };
        Assertion2.addChainableMethod = function(name, fn, chainingBehavior) {
          util2.addChainableMethod(this.prototype, name, fn, chainingBehavior);
        };
        Assertion2.overwriteProperty = function(name, fn) {
          util2.overwriteProperty(this.prototype, name, fn);
        };
        Assertion2.overwriteMethod = function(name, fn) {
          util2.overwriteMethod(this.prototype, name, fn);
        };
        Assertion2.overwriteChainableMethod = function(name, fn, chainingBehavior) {
          util2.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
        };
        Assertion2.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
          var ok = util2.test(this, arguments);
          if (false !== showDiff)
            showDiff = true;
          if (void 0 === expected && void 0 === _actual)
            showDiff = false;
          if (true !== config2.showDiff)
            showDiff = false;
          if (!ok) {
            msg = util2.getMessage(this, arguments);
            var actual = util2.getActual(this, arguments);
            var assertionErrorObjectProperties = {
              actual,
              expected,
              showDiff
            };
            var operator = util2.getOperator(this, arguments);
            if (operator) {
              assertionErrorObjectProperties.operator = operator;
            }
            throw new AssertionError2(
              msg,
              assertionErrorObjectProperties,
              config2.includeStack ? this.assert : flag(this, "ssfi")
            );
          }
        };
        Object.defineProperty(
          Assertion2.prototype,
          "_obj",
          {
            get: function() {
              return flag(this, "object");
            },
            set: function(val) {
              flag(this, "object", val);
            }
          }
        );
      };
    }
  });

  // node_modules/chai/lib/chai/core/assertions.js
  var require_assertions = __commonJS({
    "node_modules/chai/lib/chai/core/assertions.js"(exports, module) {
      module.exports = function(chai2, _) {
        var Assertion2 = chai2.Assertion, AssertionError2 = chai2.AssertionError, flag = _.flag;
        [
          "to",
          "be",
          "been",
          "is",
          "and",
          "has",
          "have",
          "with",
          "that",
          "which",
          "at",
          "of",
          "same",
          "but",
          "does",
          "still",
          "also"
        ].forEach(function(chain) {
          Assertion2.addProperty(chain);
        });
        Assertion2.addProperty("not", function() {
          flag(this, "negate", true);
        });
        Assertion2.addProperty("deep", function() {
          flag(this, "deep", true);
        });
        Assertion2.addProperty("nested", function() {
          flag(this, "nested", true);
        });
        Assertion2.addProperty("own", function() {
          flag(this, "own", true);
        });
        Assertion2.addProperty("ordered", function() {
          flag(this, "ordered", true);
        });
        Assertion2.addProperty("any", function() {
          flag(this, "any", true);
          flag(this, "all", false);
        });
        Assertion2.addProperty("all", function() {
          flag(this, "all", true);
          flag(this, "any", false);
        });
        function an(type, msg) {
          if (msg)
            flag(this, "message", msg);
          type = type.toLowerCase();
          var obj = flag(this, "object"), article = ~["a", "e", "i", "o", "u"].indexOf(type.charAt(0)) ? "an " : "a ";
          this.assert(
            type === _.type(obj).toLowerCase(),
            "expected #{this} to be " + article + type,
            "expected #{this} not to be " + article + type
          );
        }
        Assertion2.addChainableMethod("an", an);
        Assertion2.addChainableMethod("a", an);
        function SameValueZero(a, b) {
          return _.isNaN(a) && _.isNaN(b) || a === b;
        }
        function includeChainingBehavior() {
          flag(this, "contains", true);
        }
        function include(val, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag(this, "message"), negate = flag(this, "negate"), ssfi = flag(this, "ssfi"), isDeep = flag(this, "deep"), descriptor = isDeep ? "deep " : "";
          flagMsg = flagMsg ? flagMsg + ": " : "";
          var included = false;
          switch (objType) {
            case "string":
              included = obj.indexOf(val) !== -1;
              break;
            case "weakset":
              if (isDeep) {
                throw new AssertionError2(
                  flagMsg + "unable to use .deep.include with WeakSet",
                  void 0,
                  ssfi
                );
              }
              included = obj.has(val);
              break;
            case "map":
              var isEql = isDeep ? _.eql : SameValueZero;
              obj.forEach(function(item) {
                included = included || isEql(item, val);
              });
              break;
            case "set":
              if (isDeep) {
                obj.forEach(function(item) {
                  included = included || _.eql(item, val);
                });
              } else {
                included = obj.has(val);
              }
              break;
            case "array":
              if (isDeep) {
                included = obj.some(function(item) {
                  return _.eql(item, val);
                });
              } else {
                included = obj.indexOf(val) !== -1;
              }
              break;
            default:
              if (val !== Object(val)) {
                throw new AssertionError2(
                  flagMsg + "the given combination of arguments (" + objType + " and " + _.type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + _.type(val).toLowerCase(),
                  void 0,
                  ssfi
                );
              }
              var props = Object.keys(val), firstErr = null, numErrs = 0;
              props.forEach(function(prop) {
                var propAssertion = new Assertion2(obj);
                _.transferFlags(this, propAssertion, true);
                flag(propAssertion, "lockSsfi", true);
                if (!negate || props.length === 1) {
                  propAssertion.property(prop, val[prop]);
                  return;
                }
                try {
                  propAssertion.property(prop, val[prop]);
                } catch (err) {
                  if (!_.checkError.compatibleConstructor(err, AssertionError2)) {
                    throw err;
                  }
                  if (firstErr === null)
                    firstErr = err;
                  numErrs++;
                }
              }, this);
              if (negate && props.length > 1 && numErrs === props.length) {
                throw firstErr;
              }
              return;
          }
          this.assert(
            included,
            "expected #{this} to " + descriptor + "include " + _.inspect(val),
            "expected #{this} to not " + descriptor + "include " + _.inspect(val)
          );
        }
        Assertion2.addChainableMethod("include", include, includeChainingBehavior);
        Assertion2.addChainableMethod("contain", include, includeChainingBehavior);
        Assertion2.addChainableMethod("contains", include, includeChainingBehavior);
        Assertion2.addChainableMethod("includes", include, includeChainingBehavior);
        Assertion2.addProperty("ok", function() {
          this.assert(
            flag(this, "object"),
            "expected #{this} to be truthy",
            "expected #{this} to be falsy"
          );
        });
        Assertion2.addProperty("true", function() {
          this.assert(
            true === flag(this, "object"),
            "expected #{this} to be true",
            "expected #{this} to be false",
            flag(this, "negate") ? false : true
          );
        });
        Assertion2.addProperty("false", function() {
          this.assert(
            false === flag(this, "object"),
            "expected #{this} to be false",
            "expected #{this} to be true",
            flag(this, "negate") ? true : false
          );
        });
        Assertion2.addProperty("null", function() {
          this.assert(
            null === flag(this, "object"),
            "expected #{this} to be null",
            "expected #{this} not to be null"
          );
        });
        Assertion2.addProperty("undefined", function() {
          this.assert(
            void 0 === flag(this, "object"),
            "expected #{this} to be undefined",
            "expected #{this} not to be undefined"
          );
        });
        Assertion2.addProperty("NaN", function() {
          this.assert(
            _.isNaN(flag(this, "object")),
            "expected #{this} to be NaN",
            "expected #{this} not to be NaN"
          );
        });
        function assertExist() {
          var val = flag(this, "object");
          this.assert(
            val !== null && val !== void 0,
            "expected #{this} to exist",
            "expected #{this} to not exist"
          );
        }
        Assertion2.addProperty("exist", assertExist);
        Assertion2.addProperty("exists", assertExist);
        Assertion2.addProperty("empty", function() {
          var val = flag(this, "object"), ssfi = flag(this, "ssfi"), flagMsg = flag(this, "message"), itemsCount;
          flagMsg = flagMsg ? flagMsg + ": " : "";
          switch (_.type(val).toLowerCase()) {
            case "array":
            case "string":
              itemsCount = val.length;
              break;
            case "map":
            case "set":
              itemsCount = val.size;
              break;
            case "weakmap":
            case "weakset":
              throw new AssertionError2(
                flagMsg + ".empty was passed a weak collection",
                void 0,
                ssfi
              );
            case "function":
              var msg = flagMsg + ".empty was passed a function " + _.getName(val);
              throw new AssertionError2(msg.trim(), void 0, ssfi);
            default:
              if (val !== Object(val)) {
                throw new AssertionError2(
                  flagMsg + ".empty was passed non-string primitive " + _.inspect(val),
                  void 0,
                  ssfi
                );
              }
              itemsCount = Object.keys(val).length;
          }
          this.assert(
            0 === itemsCount,
            "expected #{this} to be empty",
            "expected #{this} not to be empty"
          );
        });
        function checkArguments() {
          var obj = flag(this, "object"), type = _.type(obj);
          this.assert(
            "Arguments" === type,
            "expected #{this} to be arguments but got " + type,
            "expected #{this} to not be arguments"
          );
        }
        Assertion2.addProperty("arguments", checkArguments);
        Assertion2.addProperty("Arguments", checkArguments);
        function assertEqual(val, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object");
          if (flag(this, "deep")) {
            var prevLockSsfi = flag(this, "lockSsfi");
            flag(this, "lockSsfi", true);
            this.eql(val);
            flag(this, "lockSsfi", prevLockSsfi);
          } else {
            this.assert(
              val === obj,
              "expected #{this} to equal #{exp}",
              "expected #{this} to not equal #{exp}",
              val,
              this._obj,
              true
            );
          }
        }
        Assertion2.addMethod("equal", assertEqual);
        Assertion2.addMethod("equals", assertEqual);
        Assertion2.addMethod("eq", assertEqual);
        function assertEql(obj, msg) {
          if (msg)
            flag(this, "message", msg);
          this.assert(
            _.eql(obj, flag(this, "object")),
            "expected #{this} to deeply equal #{exp}",
            "expected #{this} to not deeply equal #{exp}",
            obj,
            this._obj,
            true
          );
        }
        Assertion2.addMethod("eql", assertEql);
        Assertion2.addMethod("eqls", assertEql);
        function assertAbove(n, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
          if (doLength && objType !== "map" && objType !== "set") {
            new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
          }
          if (!doLength && (objType === "date" && nType !== "date")) {
            errorMessage = msgPrefix + "the argument to above must be a date";
          } else if (nType !== "number" && (doLength || objType === "number")) {
            errorMessage = msgPrefix + "the argument to above must be a number";
          } else if (!doLength && (objType !== "date" && objType !== "number")) {
            var printObj = objType === "string" ? "'" + obj + "'" : obj;
            errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
          } else {
            shouldThrow = false;
          }
          if (shouldThrow) {
            throw new AssertionError2(errorMessage, void 0, ssfi);
          }
          if (doLength) {
            var descriptor = "length", itemsCount;
            if (objType === "map" || objType === "set") {
              descriptor = "size";
              itemsCount = obj.size;
            } else {
              itemsCount = obj.length;
            }
            this.assert(
              itemsCount > n,
              "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}",
              "expected #{this} to not have a " + descriptor + " above #{exp}",
              n,
              itemsCount
            );
          } else {
            this.assert(
              obj > n,
              "expected #{this} to be above #{exp}",
              "expected #{this} to be at most #{exp}",
              n
            );
          }
        }
        Assertion2.addMethod("above", assertAbove);
        Assertion2.addMethod("gt", assertAbove);
        Assertion2.addMethod("greaterThan", assertAbove);
        function assertLeast(n, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
          if (doLength && objType !== "map" && objType !== "set") {
            new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
          }
          if (!doLength && (objType === "date" && nType !== "date")) {
            errorMessage = msgPrefix + "the argument to least must be a date";
          } else if (nType !== "number" && (doLength || objType === "number")) {
            errorMessage = msgPrefix + "the argument to least must be a number";
          } else if (!doLength && (objType !== "date" && objType !== "number")) {
            var printObj = objType === "string" ? "'" + obj + "'" : obj;
            errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
          } else {
            shouldThrow = false;
          }
          if (shouldThrow) {
            throw new AssertionError2(errorMessage, void 0, ssfi);
          }
          if (doLength) {
            var descriptor = "length", itemsCount;
            if (objType === "map" || objType === "set") {
              descriptor = "size";
              itemsCount = obj.size;
            } else {
              itemsCount = obj.length;
            }
            this.assert(
              itemsCount >= n,
              "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}",
              "expected #{this} to have a " + descriptor + " below #{exp}",
              n,
              itemsCount
            );
          } else {
            this.assert(
              obj >= n,
              "expected #{this} to be at least #{exp}",
              "expected #{this} to be below #{exp}",
              n
            );
          }
        }
        Assertion2.addMethod("least", assertLeast);
        Assertion2.addMethod("gte", assertLeast);
        Assertion2.addMethod("greaterThanOrEqual", assertLeast);
        function assertBelow(n, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
          if (doLength && objType !== "map" && objType !== "set") {
            new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
          }
          if (!doLength && (objType === "date" && nType !== "date")) {
            errorMessage = msgPrefix + "the argument to below must be a date";
          } else if (nType !== "number" && (doLength || objType === "number")) {
            errorMessage = msgPrefix + "the argument to below must be a number";
          } else if (!doLength && (objType !== "date" && objType !== "number")) {
            var printObj = objType === "string" ? "'" + obj + "'" : obj;
            errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
          } else {
            shouldThrow = false;
          }
          if (shouldThrow) {
            throw new AssertionError2(errorMessage, void 0, ssfi);
          }
          if (doLength) {
            var descriptor = "length", itemsCount;
            if (objType === "map" || objType === "set") {
              descriptor = "size";
              itemsCount = obj.size;
            } else {
              itemsCount = obj.length;
            }
            this.assert(
              itemsCount < n,
              "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}",
              "expected #{this} to not have a " + descriptor + " below #{exp}",
              n,
              itemsCount
            );
          } else {
            this.assert(
              obj < n,
              "expected #{this} to be below #{exp}",
              "expected #{this} to be at least #{exp}",
              n
            );
          }
        }
        Assertion2.addMethod("below", assertBelow);
        Assertion2.addMethod("lt", assertBelow);
        Assertion2.addMethod("lessThan", assertBelow);
        function assertMost(n, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), errorMessage, shouldThrow = true;
          if (doLength && objType !== "map" && objType !== "set") {
            new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
          }
          if (!doLength && (objType === "date" && nType !== "date")) {
            errorMessage = msgPrefix + "the argument to most must be a date";
          } else if (nType !== "number" && (doLength || objType === "number")) {
            errorMessage = msgPrefix + "the argument to most must be a number";
          } else if (!doLength && (objType !== "date" && objType !== "number")) {
            var printObj = objType === "string" ? "'" + obj + "'" : obj;
            errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
          } else {
            shouldThrow = false;
          }
          if (shouldThrow) {
            throw new AssertionError2(errorMessage, void 0, ssfi);
          }
          if (doLength) {
            var descriptor = "length", itemsCount;
            if (objType === "map" || objType === "set") {
              descriptor = "size";
              itemsCount = obj.size;
            } else {
              itemsCount = obj.length;
            }
            this.assert(
              itemsCount <= n,
              "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}",
              "expected #{this} to have a " + descriptor + " above #{exp}",
              n,
              itemsCount
            );
          } else {
            this.assert(
              obj <= n,
              "expected #{this} to be at most #{exp}",
              "expected #{this} to be above #{exp}",
              n
            );
          }
        }
        Assertion2.addMethod("most", assertMost);
        Assertion2.addMethod("lte", assertMost);
        Assertion2.addMethod("lessThanOrEqual", assertMost);
        Assertion2.addMethod("within", function(start, finish, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), doLength = flag(this, "doLength"), flagMsg = flag(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag(this, "ssfi"), objType = _.type(obj).toLowerCase(), startType = _.type(start).toLowerCase(), finishType = _.type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = startType === "date" && finishType === "date" ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
          if (doLength && objType !== "map" && objType !== "set") {
            new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
          }
          if (!doLength && (objType === "date" && (startType !== "date" || finishType !== "date"))) {
            errorMessage = msgPrefix + "the arguments to within must be dates";
          } else if ((startType !== "number" || finishType !== "number") && (doLength || objType === "number")) {
            errorMessage = msgPrefix + "the arguments to within must be numbers";
          } else if (!doLength && (objType !== "date" && objType !== "number")) {
            var printObj = objType === "string" ? "'" + obj + "'" : obj;
            errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
          } else {
            shouldThrow = false;
          }
          if (shouldThrow) {
            throw new AssertionError2(errorMessage, void 0, ssfi);
          }
          if (doLength) {
            var descriptor = "length", itemsCount;
            if (objType === "map" || objType === "set") {
              descriptor = "size";
              itemsCount = obj.size;
            } else {
              itemsCount = obj.length;
            }
            this.assert(
              itemsCount >= start && itemsCount <= finish,
              "expected #{this} to have a " + descriptor + " within " + range,
              "expected #{this} to not have a " + descriptor + " within " + range
            );
          } else {
            this.assert(
              obj >= start && obj <= finish,
              "expected #{this} to be within " + range,
              "expected #{this} to not be within " + range
            );
          }
        });
        function assertInstanceOf(constructor, msg) {
          if (msg)
            flag(this, "message", msg);
          var target = flag(this, "object");
          var ssfi = flag(this, "ssfi");
          var flagMsg = flag(this, "message");
          try {
            var isInstanceOf = target instanceof constructor;
          } catch (err) {
            if (err instanceof TypeError) {
              flagMsg = flagMsg ? flagMsg + ": " : "";
              throw new AssertionError2(
                flagMsg + "The instanceof assertion needs a constructor but " + _.type(constructor) + " was given.",
                void 0,
                ssfi
              );
            }
            throw err;
          }
          var name = _.getName(constructor);
          if (name === null) {
            name = "an unnamed constructor";
          }
          this.assert(
            isInstanceOf,
            "expected #{this} to be an instance of " + name,
            "expected #{this} to not be an instance of " + name
          );
        }
        ;
        Assertion2.addMethod("instanceof", assertInstanceOf);
        Assertion2.addMethod("instanceOf", assertInstanceOf);
        function assertProperty(name, val, msg) {
          if (msg)
            flag(this, "message", msg);
          var isNested = flag(this, "nested"), isOwn = flag(this, "own"), flagMsg = flag(this, "message"), obj = flag(this, "object"), ssfi = flag(this, "ssfi"), nameType = typeof name;
          flagMsg = flagMsg ? flagMsg + ": " : "";
          if (isNested) {
            if (nameType !== "string") {
              throw new AssertionError2(
                flagMsg + "the argument to property must be a string when using nested syntax",
                void 0,
                ssfi
              );
            }
          } else {
            if (nameType !== "string" && nameType !== "number" && nameType !== "symbol") {
              throw new AssertionError2(
                flagMsg + "the argument to property must be a string, number, or symbol",
                void 0,
                ssfi
              );
            }
          }
          if (isNested && isOwn) {
            throw new AssertionError2(
              flagMsg + 'The "nested" and "own" flags cannot be combined.',
              void 0,
              ssfi
            );
          }
          if (obj === null || obj === void 0) {
            throw new AssertionError2(
              flagMsg + "Target cannot be null or undefined.",
              void 0,
              ssfi
            );
          }
          var isDeep = flag(this, "deep"), negate = flag(this, "negate"), pathInfo = isNested ? _.getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name];
          var descriptor = "";
          if (isDeep)
            descriptor += "deep ";
          if (isOwn)
            descriptor += "own ";
          if (isNested)
            descriptor += "nested ";
          descriptor += "property ";
          var hasProperty;
          if (isOwn)
            hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
          else if (isNested)
            hasProperty = pathInfo.exists;
          else
            hasProperty = _.hasProperty(obj, name);
          if (!negate || arguments.length === 1) {
            this.assert(
              hasProperty,
              "expected #{this} to have " + descriptor + _.inspect(name),
              "expected #{this} to not have " + descriptor + _.inspect(name)
            );
          }
          if (arguments.length > 1) {
            this.assert(
              hasProperty && (isDeep ? _.eql(val, value) : val === value),
              "expected #{this} to have " + descriptor + _.inspect(name) + " of #{exp}, but got #{act}",
              "expected #{this} to not have " + descriptor + _.inspect(name) + " of #{act}",
              val,
              value
            );
          }
          flag(this, "object", value);
        }
        Assertion2.addMethod("property", assertProperty);
        function assertOwnProperty(name, value, msg) {
          flag(this, "own", true);
          assertProperty.apply(this, arguments);
        }
        Assertion2.addMethod("ownProperty", assertOwnProperty);
        Assertion2.addMethod("haveOwnProperty", assertOwnProperty);
        function assertOwnPropertyDescriptor(name, descriptor, msg) {
          if (typeof descriptor === "string") {
            msg = descriptor;
            descriptor = null;
          }
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object");
          var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
          if (actualDescriptor && descriptor) {
            this.assert(
              _.eql(descriptor, actualDescriptor),
              "expected the own property descriptor for " + _.inspect(name) + " on #{this} to match " + _.inspect(descriptor) + ", got " + _.inspect(actualDescriptor),
              "expected the own property descriptor for " + _.inspect(name) + " on #{this} to not match " + _.inspect(descriptor),
              descriptor,
              actualDescriptor,
              true
            );
          } else {
            this.assert(
              actualDescriptor,
              "expected #{this} to have an own property descriptor for " + _.inspect(name),
              "expected #{this} to not have an own property descriptor for " + _.inspect(name)
            );
          }
          flag(this, "object", actualDescriptor);
        }
        Assertion2.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
        Assertion2.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
        function assertLengthChain() {
          flag(this, "doLength", true);
        }
        function assertLength(n, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), objType = _.type(obj).toLowerCase(), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi"), descriptor = "length", itemsCount;
          switch (objType) {
            case "map":
            case "set":
              descriptor = "size";
              itemsCount = obj.size;
              break;
            default:
              new Assertion2(obj, flagMsg, ssfi, true).to.have.property("length");
              itemsCount = obj.length;
          }
          this.assert(
            itemsCount == n,
            "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}",
            "expected #{this} to not have a " + descriptor + " of #{act}",
            n,
            itemsCount
          );
        }
        Assertion2.addChainableMethod("length", assertLength, assertLengthChain);
        Assertion2.addChainableMethod("lengthOf", assertLength, assertLengthChain);
        function assertMatch(re, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object");
          this.assert(
            re.exec(obj),
            "expected #{this} to match " + re,
            "expected #{this} not to match " + re
          );
        }
        Assertion2.addMethod("match", assertMatch);
        Assertion2.addMethod("matches", assertMatch);
        Assertion2.addMethod("string", function(str, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
          new Assertion2(obj, flagMsg, ssfi, true).is.a("string");
          this.assert(
            ~obj.indexOf(str),
            "expected #{this} to contain " + _.inspect(str),
            "expected #{this} to not contain " + _.inspect(str)
          );
        });
        function assertKeys(keys) {
          var obj = flag(this, "object"), objType = _.type(obj), keysType = _.type(keys), ssfi = flag(this, "ssfi"), isDeep = flag(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = flag(this, "message");
          flagMsg = flagMsg ? flagMsg + ": " : "";
          var mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
          if (objType === "Map" || objType === "Set") {
            deepStr = isDeep ? "deeply " : "";
            actual = [];
            obj.forEach(function(val, key) {
              actual.push(key);
            });
            if (keysType !== "Array") {
              keys = Array.prototype.slice.call(arguments);
            }
          } else {
            actual = _.getOwnEnumerableProperties(obj);
            switch (keysType) {
              case "Array":
                if (arguments.length > 1) {
                  throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
                }
                break;
              case "Object":
                if (arguments.length > 1) {
                  throw new AssertionError2(mixedArgsMsg, void 0, ssfi);
                }
                keys = Object.keys(keys);
                break;
              default:
                keys = Array.prototype.slice.call(arguments);
            }
            keys = keys.map(function(val) {
              return typeof val === "symbol" ? val : String(val);
            });
          }
          if (!keys.length) {
            throw new AssertionError2(flagMsg + "keys required", void 0, ssfi);
          }
          var len = keys.length, any = flag(this, "any"), all = flag(this, "all"), expected = keys;
          if (!any && !all) {
            all = true;
          }
          if (any) {
            ok = expected.some(function(expectedKey) {
              return actual.some(function(actualKey) {
                if (isDeep) {
                  return _.eql(expectedKey, actualKey);
                } else {
                  return expectedKey === actualKey;
                }
              });
            });
          }
          if (all) {
            ok = expected.every(function(expectedKey) {
              return actual.some(function(actualKey) {
                if (isDeep) {
                  return _.eql(expectedKey, actualKey);
                } else {
                  return expectedKey === actualKey;
                }
              });
            });
            if (!flag(this, "contains")) {
              ok = ok && keys.length == actual.length;
            }
          }
          if (len > 1) {
            keys = keys.map(function(key) {
              return _.inspect(key);
            });
            var last = keys.pop();
            if (all) {
              str = keys.join(", ") + ", and " + last;
            }
            if (any) {
              str = keys.join(", ") + ", or " + last;
            }
          } else {
            str = _.inspect(keys[0]);
          }
          str = (len > 1 ? "keys " : "key ") + str;
          str = (flag(this, "contains") ? "contain " : "have ") + str;
          this.assert(
            ok,
            "expected #{this} to " + deepStr + str,
            "expected #{this} to not " + deepStr + str,
            expected.slice(0).sort(_.compareByInspect),
            actual.sort(_.compareByInspect),
            true
          );
        }
        Assertion2.addMethod("keys", assertKeys);
        Assertion2.addMethod("key", assertKeys);
        function assertThrows(errorLike, errMsgMatcher, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), ssfi = flag(this, "ssfi"), flagMsg = flag(this, "message"), negate = flag(this, "negate") || false;
          new Assertion2(obj, flagMsg, ssfi, true).is.a("function");
          if (errorLike instanceof RegExp || typeof errorLike === "string") {
            errMsgMatcher = errorLike;
            errorLike = null;
          }
          var caughtErr;
          try {
            obj();
          } catch (err) {
            caughtErr = err;
          }
          var everyArgIsUndefined = errorLike === void 0 && errMsgMatcher === void 0;
          var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
          var errorLikeFail = false;
          var errMsgMatcherFail = false;
          if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
            var errorLikeString = "an error";
            if (errorLike instanceof Error) {
              errorLikeString = "#{exp}";
            } else if (errorLike) {
              errorLikeString = _.checkError.getConstructorName(errorLike);
            }
            this.assert(
              caughtErr,
              "expected #{this} to throw " + errorLikeString,
              "expected #{this} to not throw an error but #{act} was thrown",
              errorLike && errorLike.toString(),
              caughtErr instanceof Error ? caughtErr.toString() : typeof caughtErr === "string" ? caughtErr : caughtErr && _.checkError.getConstructorName(caughtErr)
            );
          }
          if (errorLike && caughtErr) {
            if (errorLike instanceof Error) {
              var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);
              if (isCompatibleInstance === negate) {
                if (everyArgIsDefined && negate) {
                  errorLikeFail = true;
                } else {
                  this.assert(
                    negate,
                    "expected #{this} to throw #{exp} but #{act} was thrown",
                    "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""),
                    errorLike.toString(),
                    caughtErr.toString()
                  );
                }
              }
            }
            var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
            if (isCompatibleConstructor === negate) {
              if (everyArgIsDefined && negate) {
                errorLikeFail = true;
              } else {
                this.assert(
                  negate,
                  "expected #{this} to throw #{exp} but #{act} was thrown",
                  "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
                  errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike),
                  caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)
                );
              }
            }
          }
          if (caughtErr && errMsgMatcher !== void 0 && errMsgMatcher !== null) {
            var placeholder = "including";
            if (errMsgMatcher instanceof RegExp) {
              placeholder = "matching";
            }
            var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
            if (isCompatibleMessage === negate) {
              if (everyArgIsDefined && negate) {
                errMsgMatcherFail = true;
              } else {
                this.assert(
                  negate,
                  "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}",
                  "expected #{this} to throw error not " + placeholder + " #{exp}",
                  errMsgMatcher,
                  _.checkError.getMessage(caughtErr)
                );
              }
            }
          }
          if (errorLikeFail && errMsgMatcherFail) {
            this.assert(
              negate,
              "expected #{this} to throw #{exp} but #{act} was thrown",
              "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
              errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike),
              caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)
            );
          }
          flag(this, "object", caughtErr);
        }
        ;
        Assertion2.addMethod("throw", assertThrows);
        Assertion2.addMethod("throws", assertThrows);
        Assertion2.addMethod("Throw", assertThrows);
        function respondTo(method, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), itself = flag(this, "itself"), context2 = "function" === typeof obj && !itself ? obj.prototype[method] : obj[method];
          this.assert(
            "function" === typeof context2,
            "expected #{this} to respond to " + _.inspect(method),
            "expected #{this} to not respond to " + _.inspect(method)
          );
        }
        Assertion2.addMethod("respondTo", respondTo);
        Assertion2.addMethod("respondsTo", respondTo);
        Assertion2.addProperty("itself", function() {
          flag(this, "itself", true);
        });
        function satisfy(matcher, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object");
          var result = matcher(obj);
          this.assert(
            result,
            "expected #{this} to satisfy " + _.objDisplay(matcher),
            "expected #{this} to not satisfy" + _.objDisplay(matcher),
            flag(this, "negate") ? false : true,
            result
          );
        }
        Assertion2.addMethod("satisfy", satisfy);
        Assertion2.addMethod("satisfies", satisfy);
        function closeTo(expected, delta, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
          new Assertion2(obj, flagMsg, ssfi, true).is.a("number");
          if (typeof expected !== "number" || typeof delta !== "number") {
            flagMsg = flagMsg ? flagMsg + ": " : "";
            var deltaMessage = delta === void 0 ? ", and a delta is required" : "";
            throw new AssertionError2(
              flagMsg + "the arguments to closeTo or approximately must be numbers" + deltaMessage,
              void 0,
              ssfi
            );
          }
          this.assert(
            Math.abs(obj - expected) <= delta,
            "expected #{this} to be close to " + expected + " +/- " + delta,
            "expected #{this} not to be close to " + expected + " +/- " + delta
          );
        }
        Assertion2.addMethod("closeTo", closeTo);
        Assertion2.addMethod("approximately", closeTo);
        function isSubsetOf(subset, superset, cmp, contains, ordered) {
          if (!contains) {
            if (subset.length !== superset.length)
              return false;
            superset = superset.slice();
          }
          return subset.every(function(elem, idx) {
            if (ordered)
              return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
            if (!cmp) {
              var matchIdx = superset.indexOf(elem);
              if (matchIdx === -1)
                return false;
              if (!contains)
                superset.splice(matchIdx, 1);
              return true;
            }
            return superset.some(function(elem2, matchIdx2) {
              if (!cmp(elem, elem2))
                return false;
              if (!contains)
                superset.splice(matchIdx2, 1);
              return true;
            });
          });
        }
        Assertion2.addMethod("members", function(subset, msg) {
          if (msg)
            flag(this, "message", msg);
          var obj = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
          new Assertion2(obj, flagMsg, ssfi, true).to.be.an("array");
          new Assertion2(subset, flagMsg, ssfi, true).to.be.an("array");
          var contains = flag(this, "contains");
          var ordered = flag(this, "ordered");
          var subject, failMsg, failNegateMsg;
          if (contains) {
            subject = ordered ? "an ordered superset" : "a superset";
            failMsg = "expected #{this} to be " + subject + " of #{exp}";
            failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}";
          } else {
            subject = ordered ? "ordered members" : "members";
            failMsg = "expected #{this} to have the same " + subject + " as #{exp}";
            failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}";
          }
          var cmp = flag(this, "deep") ? _.eql : void 0;
          this.assert(
            isSubsetOf(subset, obj, cmp, contains, ordered),
            failMsg,
            failNegateMsg,
            subset,
            obj,
            true
          );
        });
        function oneOf(list, msg) {
          if (msg)
            flag(this, "message", msg);
          var expected = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi"), contains = flag(this, "contains"), isDeep = flag(this, "deep");
          new Assertion2(list, flagMsg, ssfi, true).to.be.an("array");
          if (contains) {
            this.assert(
              list.some(function(possibility) {
                return expected.indexOf(possibility) > -1;
              }),
              "expected #{this} to contain one of #{exp}",
              "expected #{this} to not contain one of #{exp}",
              list,
              expected
            );
          } else {
            if (isDeep) {
              this.assert(
                list.some(function(possibility) {
                  return _.eql(expected, possibility);
                }),
                "expected #{this} to deeply equal one of #{exp}",
                "expected #{this} to deeply equal one of #{exp}",
                list,
                expected
              );
            } else {
              this.assert(
                list.indexOf(expected) > -1,
                "expected #{this} to be one of #{exp}",
                "expected #{this} to not be one of #{exp}",
                list,
                expected
              );
            }
          }
        }
        Assertion2.addMethod("oneOf", oneOf);
        function assertChanges(subject, prop, msg) {
          if (msg)
            flag(this, "message", msg);
          var fn = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
          new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
          var initial;
          if (!prop) {
            new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
            initial = subject();
          } else {
            new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
            initial = subject[prop];
          }
          fn();
          var final = prop === void 0 || prop === null ? subject() : subject[prop];
          var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
          flag(this, "deltaMsgObj", msgObj);
          flag(this, "initialDeltaValue", initial);
          flag(this, "finalDeltaValue", final);
          flag(this, "deltaBehavior", "change");
          flag(this, "realDelta", final !== initial);
          this.assert(
            initial !== final,
            "expected " + msgObj + " to change",
            "expected " + msgObj + " to not change"
          );
        }
        Assertion2.addMethod("change", assertChanges);
        Assertion2.addMethod("changes", assertChanges);
        function assertIncreases(subject, prop, msg) {
          if (msg)
            flag(this, "message", msg);
          var fn = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
          new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
          var initial;
          if (!prop) {
            new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
            initial = subject();
          } else {
            new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
            initial = subject[prop];
          }
          new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
          fn();
          var final = prop === void 0 || prop === null ? subject() : subject[prop];
          var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
          flag(this, "deltaMsgObj", msgObj);
          flag(this, "initialDeltaValue", initial);
          flag(this, "finalDeltaValue", final);
          flag(this, "deltaBehavior", "increase");
          flag(this, "realDelta", final - initial);
          this.assert(
            final - initial > 0,
            "expected " + msgObj + " to increase",
            "expected " + msgObj + " to not increase"
          );
        }
        Assertion2.addMethod("increase", assertIncreases);
        Assertion2.addMethod("increases", assertIncreases);
        function assertDecreases(subject, prop, msg) {
          if (msg)
            flag(this, "message", msg);
          var fn = flag(this, "object"), flagMsg = flag(this, "message"), ssfi = flag(this, "ssfi");
          new Assertion2(fn, flagMsg, ssfi, true).is.a("function");
          var initial;
          if (!prop) {
            new Assertion2(subject, flagMsg, ssfi, true).is.a("function");
            initial = subject();
          } else {
            new Assertion2(subject, flagMsg, ssfi, true).to.have.property(prop);
            initial = subject[prop];
          }
          new Assertion2(initial, flagMsg, ssfi, true).is.a("number");
          fn();
          var final = prop === void 0 || prop === null ? subject() : subject[prop];
          var msgObj = prop === void 0 || prop === null ? initial : "." + prop;
          flag(this, "deltaMsgObj", msgObj);
          flag(this, "initialDeltaValue", initial);
          flag(this, "finalDeltaValue", final);
          flag(this, "deltaBehavior", "decrease");
          flag(this, "realDelta", initial - final);
          this.assert(
            final - initial < 0,
            "expected " + msgObj + " to decrease",
            "expected " + msgObj + " to not decrease"
          );
        }
        Assertion2.addMethod("decrease", assertDecreases);
        Assertion2.addMethod("decreases", assertDecreases);
        function assertDelta(delta, msg) {
          if (msg)
            flag(this, "message", msg);
          var msgObj = flag(this, "deltaMsgObj");
          var initial = flag(this, "initialDeltaValue");
          var final = flag(this, "finalDeltaValue");
          var behavior = flag(this, "deltaBehavior");
          var realDelta = flag(this, "realDelta");
          var expression;
          if (behavior === "change") {
            expression = Math.abs(final - initial) === Math.abs(delta);
          } else {
            expression = realDelta === Math.abs(delta);
          }
          this.assert(
            expression,
            "expected " + msgObj + " to " + behavior + " by " + delta,
            "expected " + msgObj + " to not " + behavior + " by " + delta
          );
        }
        Assertion2.addMethod("by", assertDelta);
        Assertion2.addProperty("extensible", function() {
          var obj = flag(this, "object");
          var isExtensible = obj === Object(obj) && Object.isExtensible(obj);
          this.assert(
            isExtensible,
            "expected #{this} to be extensible",
            "expected #{this} to not be extensible"
          );
        });
        Assertion2.addProperty("sealed", function() {
          var obj = flag(this, "object");
          var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
          this.assert(
            isSealed,
            "expected #{this} to be sealed",
            "expected #{this} to not be sealed"
          );
        });
        Assertion2.addProperty("frozen", function() {
          var obj = flag(this, "object");
          var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
          this.assert(
            isFrozen,
            "expected #{this} to be frozen",
            "expected #{this} to not be frozen"
          );
        });
        Assertion2.addProperty("finite", function(msg) {
          var obj = flag(this, "object");
          this.assert(
            typeof obj === "number" && isFinite(obj),
            "expected #{this} to be a finite number",
            "expected #{this} to not be a finite number"
          );
        });
      };
    }
  });

  // node_modules/chai/lib/chai/interface/expect.js
  var require_expect = __commonJS({
    "node_modules/chai/lib/chai/interface/expect.js"(exports, module) {
      module.exports = function(chai2, util2) {
        chai2.expect = function(val, message) {
          return new chai2.Assertion(val, message);
        };
        chai2.expect.fail = function(actual, expected, message, operator) {
          if (arguments.length < 2) {
            message = actual;
            actual = void 0;
          }
          message = message || "expect.fail()";
          throw new chai2.AssertionError(message, {
            actual,
            expected,
            operator
          }, chai2.expect.fail);
        };
      };
    }
  });

  // node_modules/chai/lib/chai/interface/should.js
  var require_should = __commonJS({
    "node_modules/chai/lib/chai/interface/should.js"(exports, module) {
      module.exports = function(chai2, util2) {
        var Assertion2 = chai2.Assertion;
        function loadShould() {
          function shouldGetter() {
            if (this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol === "function" && this instanceof Symbol || typeof BigInt === "function" && this instanceof BigInt) {
              return new Assertion2(this.valueOf(), null, shouldGetter);
            }
            return new Assertion2(this, null, shouldGetter);
          }
          function shouldSetter(value) {
            Object.defineProperty(this, "should", {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          }
          Object.defineProperty(Object.prototype, "should", {
            set: shouldSetter,
            get: shouldGetter,
            configurable: true
          });
          var should2 = {};
          should2.fail = function(actual, expected, message, operator) {
            if (arguments.length < 2) {
              message = actual;
              actual = void 0;
            }
            message = message || "should.fail()";
            throw new chai2.AssertionError(message, {
              actual,
              expected,
              operator
            }, should2.fail);
          };
          should2.equal = function(val1, val2, msg) {
            new Assertion2(val1, msg).to.equal(val2);
          };
          should2.Throw = function(fn, errt, errs, msg) {
            new Assertion2(fn, msg).to.Throw(errt, errs);
          };
          should2.exist = function(val, msg) {
            new Assertion2(val, msg).to.exist;
          };
          should2.not = {};
          should2.not.equal = function(val1, val2, msg) {
            new Assertion2(val1, msg).to.not.equal(val2);
          };
          should2.not.Throw = function(fn, errt, errs, msg) {
            new Assertion2(fn, msg).to.not.Throw(errt, errs);
          };
          should2.not.exist = function(val, msg) {
            new Assertion2(val, msg).to.not.exist;
          };
          should2["throw"] = should2["Throw"];
          should2.not["throw"] = should2.not["Throw"];
          return should2;
        }
        ;
        chai2.should = loadShould;
        chai2.Should = loadShould;
      };
    }
  });

  // node_modules/chai/lib/chai/interface/assert.js
  var require_assert = __commonJS({
    "node_modules/chai/lib/chai/interface/assert.js"(exports, module) {
      module.exports = function(chai2, util2) {
        var Assertion2 = chai2.Assertion, flag = util2.flag;
        var assert3 = chai2.assert = function(express, errmsg) {
          var test = new Assertion2(null, null, chai2.assert, true);
          test.assert(
            express,
            errmsg,
            "[ negation message unavailable ]"
          );
        };
        assert3.fail = function(actual, expected, message, operator) {
          if (arguments.length < 2) {
            message = actual;
            actual = void 0;
          }
          message = message || "assert.fail()";
          throw new chai2.AssertionError(message, {
            actual,
            expected,
            operator
          }, assert3.fail);
        };
        assert3.isOk = function(val, msg) {
          new Assertion2(val, msg, assert3.isOk, true).is.ok;
        };
        assert3.isNotOk = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotOk, true).is.not.ok;
        };
        assert3.equal = function(act, exp, msg) {
          var test = new Assertion2(act, msg, assert3.equal, true);
          test.assert(
            exp == flag(test, "object"),
            "expected #{this} to equal #{exp}",
            "expected #{this} to not equal #{act}",
            exp,
            act,
            true
          );
        };
        assert3.notEqual = function(act, exp, msg) {
          var test = new Assertion2(act, msg, assert3.notEqual, true);
          test.assert(
            exp != flag(test, "object"),
            "expected #{this} to not equal #{exp}",
            "expected #{this} to equal #{act}",
            exp,
            act,
            true
          );
        };
        assert3.strictEqual = function(act, exp, msg) {
          new Assertion2(act, msg, assert3.strictEqual, true).to.equal(exp);
        };
        assert3.notStrictEqual = function(act, exp, msg) {
          new Assertion2(act, msg, assert3.notStrictEqual, true).to.not.equal(exp);
        };
        assert3.deepEqual = assert3.deepStrictEqual = function(act, exp, msg) {
          new Assertion2(act, msg, assert3.deepEqual, true).to.eql(exp);
        };
        assert3.notDeepEqual = function(act, exp, msg) {
          new Assertion2(act, msg, assert3.notDeepEqual, true).to.not.eql(exp);
        };
        assert3.isAbove = function(val, abv, msg) {
          new Assertion2(val, msg, assert3.isAbove, true).to.be.above(abv);
        };
        assert3.isAtLeast = function(val, atlst, msg) {
          new Assertion2(val, msg, assert3.isAtLeast, true).to.be.least(atlst);
        };
        assert3.isBelow = function(val, blw, msg) {
          new Assertion2(val, msg, assert3.isBelow, true).to.be.below(blw);
        };
        assert3.isAtMost = function(val, atmst, msg) {
          new Assertion2(val, msg, assert3.isAtMost, true).to.be.most(atmst);
        };
        assert3.isTrue = function(val, msg) {
          new Assertion2(val, msg, assert3.isTrue, true).is["true"];
        };
        assert3.isNotTrue = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotTrue, true).to.not.equal(true);
        };
        assert3.isFalse = function(val, msg) {
          new Assertion2(val, msg, assert3.isFalse, true).is["false"];
        };
        assert3.isNotFalse = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotFalse, true).to.not.equal(false);
        };
        assert3.isNull = function(val, msg) {
          new Assertion2(val, msg, assert3.isNull, true).to.equal(null);
        };
        assert3.isNotNull = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotNull, true).to.not.equal(null);
        };
        assert3.isNaN = function(val, msg) {
          new Assertion2(val, msg, assert3.isNaN, true).to.be.NaN;
        };
        assert3.isNotNaN = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotNaN, true).not.to.be.NaN;
        };
        assert3.exists = function(val, msg) {
          new Assertion2(val, msg, assert3.exists, true).to.exist;
        };
        assert3.notExists = function(val, msg) {
          new Assertion2(val, msg, assert3.notExists, true).to.not.exist;
        };
        assert3.isUndefined = function(val, msg) {
          new Assertion2(val, msg, assert3.isUndefined, true).to.equal(void 0);
        };
        assert3.isDefined = function(val, msg) {
          new Assertion2(val, msg, assert3.isDefined, true).to.not.equal(void 0);
        };
        assert3.isFunction = function(val, msg) {
          new Assertion2(val, msg, assert3.isFunction, true).to.be.a("function");
        };
        assert3.isNotFunction = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotFunction, true).to.not.be.a("function");
        };
        assert3.isObject = function(val, msg) {
          new Assertion2(val, msg, assert3.isObject, true).to.be.a("object");
        };
        assert3.isNotObject = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotObject, true).to.not.be.a("object");
        };
        assert3.isArray = function(val, msg) {
          new Assertion2(val, msg, assert3.isArray, true).to.be.an("array");
        };
        assert3.isNotArray = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotArray, true).to.not.be.an("array");
        };
        assert3.isString = function(val, msg) {
          new Assertion2(val, msg, assert3.isString, true).to.be.a("string");
        };
        assert3.isNotString = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotString, true).to.not.be.a("string");
        };
        assert3.isNumber = function(val, msg) {
          new Assertion2(val, msg, assert3.isNumber, true).to.be.a("number");
        };
        assert3.isNotNumber = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotNumber, true).to.not.be.a("number");
        };
        assert3.isFinite = function(val, msg) {
          new Assertion2(val, msg, assert3.isFinite, true).to.be.finite;
        };
        assert3.isBoolean = function(val, msg) {
          new Assertion2(val, msg, assert3.isBoolean, true).to.be.a("boolean");
        };
        assert3.isNotBoolean = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotBoolean, true).to.not.be.a("boolean");
        };
        assert3.typeOf = function(val, type, msg) {
          new Assertion2(val, msg, assert3.typeOf, true).to.be.a(type);
        };
        assert3.notTypeOf = function(val, type, msg) {
          new Assertion2(val, msg, assert3.notTypeOf, true).to.not.be.a(type);
        };
        assert3.instanceOf = function(val, type, msg) {
          new Assertion2(val, msg, assert3.instanceOf, true).to.be.instanceOf(type);
        };
        assert3.notInstanceOf = function(val, type, msg) {
          new Assertion2(val, msg, assert3.notInstanceOf, true).to.not.be.instanceOf(type);
        };
        assert3.include = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.include, true).include(inc);
        };
        assert3.notInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.notInclude, true).not.include(inc);
        };
        assert3.deepInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.deepInclude, true).deep.include(inc);
        };
        assert3.notDeepInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.notDeepInclude, true).not.deep.include(inc);
        };
        assert3.nestedInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.nestedInclude, true).nested.include(inc);
        };
        assert3.notNestedInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.notNestedInclude, true).not.nested.include(inc);
        };
        assert3.deepNestedInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.deepNestedInclude, true).deep.nested.include(inc);
        };
        assert3.notDeepNestedInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.notDeepNestedInclude, true).not.deep.nested.include(inc);
        };
        assert3.ownInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.ownInclude, true).own.include(inc);
        };
        assert3.notOwnInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.notOwnInclude, true).not.own.include(inc);
        };
        assert3.deepOwnInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.deepOwnInclude, true).deep.own.include(inc);
        };
        assert3.notDeepOwnInclude = function(exp, inc, msg) {
          new Assertion2(exp, msg, assert3.notDeepOwnInclude, true).not.deep.own.include(inc);
        };
        assert3.match = function(exp, re, msg) {
          new Assertion2(exp, msg, assert3.match, true).to.match(re);
        };
        assert3.notMatch = function(exp, re, msg) {
          new Assertion2(exp, msg, assert3.notMatch, true).to.not.match(re);
        };
        assert3.property = function(obj, prop, msg) {
          new Assertion2(obj, msg, assert3.property, true).to.have.property(prop);
        };
        assert3.notProperty = function(obj, prop, msg) {
          new Assertion2(obj, msg, assert3.notProperty, true).to.not.have.property(prop);
        };
        assert3.propertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.propertyVal, true).to.have.property(prop, val);
        };
        assert3.notPropertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.notPropertyVal, true).to.not.have.property(prop, val);
        };
        assert3.deepPropertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.deepPropertyVal, true).to.have.deep.property(prop, val);
        };
        assert3.notDeepPropertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
        };
        assert3.ownProperty = function(obj, prop, msg) {
          new Assertion2(obj, msg, assert3.ownProperty, true).to.have.own.property(prop);
        };
        assert3.notOwnProperty = function(obj, prop, msg) {
          new Assertion2(obj, msg, assert3.notOwnProperty, true).to.not.have.own.property(prop);
        };
        assert3.ownPropertyVal = function(obj, prop, value, msg) {
          new Assertion2(obj, msg, assert3.ownPropertyVal, true).to.have.own.property(prop, value);
        };
        assert3.notOwnPropertyVal = function(obj, prop, value, msg) {
          new Assertion2(obj, msg, assert3.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
        };
        assert3.deepOwnPropertyVal = function(obj, prop, value, msg) {
          new Assertion2(obj, msg, assert3.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
        };
        assert3.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
          new Assertion2(obj, msg, assert3.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
        };
        assert3.nestedProperty = function(obj, prop, msg) {
          new Assertion2(obj, msg, assert3.nestedProperty, true).to.have.nested.property(prop);
        };
        assert3.notNestedProperty = function(obj, prop, msg) {
          new Assertion2(obj, msg, assert3.notNestedProperty, true).to.not.have.nested.property(prop);
        };
        assert3.nestedPropertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.nestedPropertyVal, true).to.have.nested.property(prop, val);
        };
        assert3.notNestedPropertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
        };
        assert3.deepNestedPropertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
        };
        assert3.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
          new Assertion2(obj, msg, assert3.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
        };
        assert3.lengthOf = function(exp, len, msg) {
          new Assertion2(exp, msg, assert3.lengthOf, true).to.have.lengthOf(len);
        };
        assert3.hasAnyKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.hasAnyKeys, true).to.have.any.keys(keys);
        };
        assert3.hasAllKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.hasAllKeys, true).to.have.all.keys(keys);
        };
        assert3.containsAllKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.containsAllKeys, true).to.contain.all.keys(keys);
        };
        assert3.doesNotHaveAnyKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys);
        };
        assert3.doesNotHaveAllKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.doesNotHaveAllKeys, true).to.not.have.all.keys(keys);
        };
        assert3.hasAnyDeepKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.hasAnyDeepKeys, true).to.have.any.deep.keys(keys);
        };
        assert3.hasAllDeepKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.hasAllDeepKeys, true).to.have.all.deep.keys(keys);
        };
        assert3.containsAllDeepKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.containsAllDeepKeys, true).to.contain.all.deep.keys(keys);
        };
        assert3.doesNotHaveAnyDeepKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys);
        };
        assert3.doesNotHaveAllDeepKeys = function(obj, keys, msg) {
          new Assertion2(obj, msg, assert3.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys);
        };
        assert3.throws = function(fn, errorLike, errMsgMatcher, msg) {
          if ("string" === typeof errorLike || errorLike instanceof RegExp) {
            errMsgMatcher = errorLike;
            errorLike = null;
          }
          var assertErr = new Assertion2(fn, msg, assert3.throws, true).to.throw(errorLike, errMsgMatcher);
          return flag(assertErr, "object");
        };
        assert3.doesNotThrow = function(fn, errorLike, errMsgMatcher, msg) {
          if ("string" === typeof errorLike || errorLike instanceof RegExp) {
            errMsgMatcher = errorLike;
            errorLike = null;
          }
          new Assertion2(fn, msg, assert3.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
        };
        assert3.operator = function(val, operator, val2, msg) {
          var ok;
          switch (operator) {
            case "==":
              ok = val == val2;
              break;
            case "===":
              ok = val === val2;
              break;
            case ">":
              ok = val > val2;
              break;
            case ">=":
              ok = val >= val2;
              break;
            case "<":
              ok = val < val2;
              break;
            case "<=":
              ok = val <= val2;
              break;
            case "!=":
              ok = val != val2;
              break;
            case "!==":
              ok = val !== val2;
              break;
            default:
              msg = msg ? msg + ": " : msg;
              throw new chai2.AssertionError(
                msg + 'Invalid operator "' + operator + '"',
                void 0,
                assert3.operator
              );
          }
          var test = new Assertion2(ok, msg, assert3.operator, true);
          test.assert(
            true === flag(test, "object"),
            "expected " + util2.inspect(val) + " to be " + operator + " " + util2.inspect(val2),
            "expected " + util2.inspect(val) + " to not be " + operator + " " + util2.inspect(val2)
          );
        };
        assert3.closeTo = function(act, exp, delta, msg) {
          new Assertion2(act, msg, assert3.closeTo, true).to.be.closeTo(exp, delta);
        };
        assert3.approximately = function(act, exp, delta, msg) {
          new Assertion2(act, msg, assert3.approximately, true).to.be.approximately(exp, delta);
        };
        assert3.sameMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.sameMembers, true).to.have.same.members(set2);
        };
        assert3.notSameMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.notSameMembers, true).to.not.have.same.members(set2);
        };
        assert3.sameDeepMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.sameDeepMembers, true).to.have.same.deep.members(set2);
        };
        assert3.notSameDeepMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.notSameDeepMembers, true).to.not.have.same.deep.members(set2);
        };
        assert3.sameOrderedMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.sameOrderedMembers, true).to.have.same.ordered.members(set2);
        };
        assert3.notSameOrderedMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.notSameOrderedMembers, true).to.not.have.same.ordered.members(set2);
        };
        assert3.sameDeepOrderedMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set2);
        };
        assert3.notSameDeepOrderedMembers = function(set1, set2, msg) {
          new Assertion2(set1, msg, assert3.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set2);
        };
        assert3.includeMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.includeMembers, true).to.include.members(subset);
        };
        assert3.notIncludeMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.notIncludeMembers, true).to.not.include.members(subset);
        };
        assert3.includeDeepMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.includeDeepMembers, true).to.include.deep.members(subset);
        };
        assert3.notIncludeDeepMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
        };
        assert3.includeOrderedMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.includeOrderedMembers, true).to.include.ordered.members(subset);
        };
        assert3.notIncludeOrderedMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
        };
        assert3.includeDeepOrderedMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
        };
        assert3.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
          new Assertion2(superset, msg, assert3.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
        };
        assert3.oneOf = function(inList, list, msg) {
          new Assertion2(inList, msg, assert3.oneOf, true).to.be.oneOf(list);
        };
        assert3.changes = function(fn, obj, prop, msg) {
          if (arguments.length === 3 && typeof obj === "function") {
            msg = prop;
            prop = null;
          }
          new Assertion2(fn, msg, assert3.changes, true).to.change(obj, prop);
        };
        assert3.changesBy = function(fn, obj, prop, delta, msg) {
          if (arguments.length === 4 && typeof obj === "function") {
            var tmpMsg = delta;
            delta = prop;
            msg = tmpMsg;
          } else if (arguments.length === 3) {
            delta = prop;
            prop = null;
          }
          new Assertion2(fn, msg, assert3.changesBy, true).to.change(obj, prop).by(delta);
        };
        assert3.doesNotChange = function(fn, obj, prop, msg) {
          if (arguments.length === 3 && typeof obj === "function") {
            msg = prop;
            prop = null;
          }
          return new Assertion2(fn, msg, assert3.doesNotChange, true).to.not.change(obj, prop);
        };
        assert3.changesButNotBy = function(fn, obj, prop, delta, msg) {
          if (arguments.length === 4 && typeof obj === "function") {
            var tmpMsg = delta;
            delta = prop;
            msg = tmpMsg;
          } else if (arguments.length === 3) {
            delta = prop;
            prop = null;
          }
          new Assertion2(fn, msg, assert3.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
        };
        assert3.increases = function(fn, obj, prop, msg) {
          if (arguments.length === 3 && typeof obj === "function") {
            msg = prop;
            prop = null;
          }
          return new Assertion2(fn, msg, assert3.increases, true).to.increase(obj, prop);
        };
        assert3.increasesBy = function(fn, obj, prop, delta, msg) {
          if (arguments.length === 4 && typeof obj === "function") {
            var tmpMsg = delta;
            delta = prop;
            msg = tmpMsg;
          } else if (arguments.length === 3) {
            delta = prop;
            prop = null;
          }
          new Assertion2(fn, msg, assert3.increasesBy, true).to.increase(obj, prop).by(delta);
        };
        assert3.doesNotIncrease = function(fn, obj, prop, msg) {
          if (arguments.length === 3 && typeof obj === "function") {
            msg = prop;
            prop = null;
          }
          return new Assertion2(fn, msg, assert3.doesNotIncrease, true).to.not.increase(obj, prop);
        };
        assert3.increasesButNotBy = function(fn, obj, prop, delta, msg) {
          if (arguments.length === 4 && typeof obj === "function") {
            var tmpMsg = delta;
            delta = prop;
            msg = tmpMsg;
          } else if (arguments.length === 3) {
            delta = prop;
            prop = null;
          }
          new Assertion2(fn, msg, assert3.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
        };
        assert3.decreases = function(fn, obj, prop, msg) {
          if (arguments.length === 3 && typeof obj === "function") {
            msg = prop;
            prop = null;
          }
          return new Assertion2(fn, msg, assert3.decreases, true).to.decrease(obj, prop);
        };
        assert3.decreasesBy = function(fn, obj, prop, delta, msg) {
          if (arguments.length === 4 && typeof obj === "function") {
            var tmpMsg = delta;
            delta = prop;
            msg = tmpMsg;
          } else if (arguments.length === 3) {
            delta = prop;
            prop = null;
          }
          new Assertion2(fn, msg, assert3.decreasesBy, true).to.decrease(obj, prop).by(delta);
        };
        assert3.doesNotDecrease = function(fn, obj, prop, msg) {
          if (arguments.length === 3 && typeof obj === "function") {
            msg = prop;
            prop = null;
          }
          return new Assertion2(fn, msg, assert3.doesNotDecrease, true).to.not.decrease(obj, prop);
        };
        assert3.doesNotDecreaseBy = function(fn, obj, prop, delta, msg) {
          if (arguments.length === 4 && typeof obj === "function") {
            var tmpMsg = delta;
            delta = prop;
            msg = tmpMsg;
          } else if (arguments.length === 3) {
            delta = prop;
            prop = null;
          }
          return new Assertion2(fn, msg, assert3.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
        };
        assert3.decreasesButNotBy = function(fn, obj, prop, delta, msg) {
          if (arguments.length === 4 && typeof obj === "function") {
            var tmpMsg = delta;
            delta = prop;
            msg = tmpMsg;
          } else if (arguments.length === 3) {
            delta = prop;
            prop = null;
          }
          new Assertion2(fn, msg, assert3.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
        };
        assert3.ifError = function(val) {
          if (val) {
            throw val;
          }
        };
        assert3.isExtensible = function(obj, msg) {
          new Assertion2(obj, msg, assert3.isExtensible, true).to.be.extensible;
        };
        assert3.isNotExtensible = function(obj, msg) {
          new Assertion2(obj, msg, assert3.isNotExtensible, true).to.not.be.extensible;
        };
        assert3.isSealed = function(obj, msg) {
          new Assertion2(obj, msg, assert3.isSealed, true).to.be.sealed;
        };
        assert3.isNotSealed = function(obj, msg) {
          new Assertion2(obj, msg, assert3.isNotSealed, true).to.not.be.sealed;
        };
        assert3.isFrozen = function(obj, msg) {
          new Assertion2(obj, msg, assert3.isFrozen, true).to.be.frozen;
        };
        assert3.isNotFrozen = function(obj, msg) {
          new Assertion2(obj, msg, assert3.isNotFrozen, true).to.not.be.frozen;
        };
        assert3.isEmpty = function(val, msg) {
          new Assertion2(val, msg, assert3.isEmpty, true).to.be.empty;
        };
        assert3.isNotEmpty = function(val, msg) {
          new Assertion2(val, msg, assert3.isNotEmpty, true).to.not.be.empty;
        };
        (function alias(name, as) {
          assert3[as] = assert3[name];
          return alias;
        })("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")("isExtensible", "extensible")("isNotExtensible", "notExtensible")("isSealed", "sealed")("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")("isNotEmpty", "notEmpty");
      };
    }
  });

  // node_modules/chai/lib/chai.js
  var require_chai = __commonJS({
    "node_modules/chai/lib/chai.js"(exports) {
      var used = [];
      exports.version = "4.3.8";
      exports.AssertionError = require_assertion_error();
      var util2 = require_utils();
      exports.use = function(fn) {
        if (!~used.indexOf(fn)) {
          fn(exports, util2);
          used.push(fn);
        }
        return exports;
      };
      exports.util = util2;
      var config2 = require_config();
      exports.config = config2;
      var assertion = require_assertion();
      exports.use(assertion);
      var core2 = require_assertions();
      exports.use(core2);
      var expect2 = require_expect();
      exports.use(expect2);
      var should2 = require_should();
      exports.use(should2);
      var assert3 = require_assert();
      exports.use(assert3);
    }
  });

  // node_modules/chai/index.js
  var require_chai2 = __commonJS({
    "node_modules/chai/index.js"(exports, module) {
      module.exports = require_chai();
    }
  });

  // src/ts/index.ts
  var import_tagify = __toESM(require_tagify());
  localStorage.clear();
  var Library = class {
    constructor(name) {
      this.name = name;
      this.addBook = (b) => {
        this.storage.push(b);
      };
      this.deleteBook = (b) => {
        const index = this.storage.indexOf(b);
        this.storage.splice(index, 1);
      };
      this.nameToId = () => {
        return this.name.replace(/\s/g, "-").toLowerCase();
      };
      this.getBookFromID = () => {
      };
      this.storage = [];
    }
  };
  var House = class extends Array {
    constructor() {
      super(...arguments);
      this.renameLibrary = () => {
      };
      this.getIndexOfLibrary = () => {
      };
      this.sortHouseBySelectedLibrary = (l) => {
        this.sort((a, b) => a == l ? -1 : 1);
      };
      this.setPassword = (pass) => {
        this.password = pass;
      };
      this.changePassword = (pass) => {
      };
      this.deletePassword = () => {
        this.password = void 0;
      };
      this.forgotPassword = () => {
      };
    }
    removeLibrary(l) {
      const index = this.indexOf(l);
      this.splice(index, 1);
    }
    clearHouse() {
      localStorage.clear();
      window.location.reload();
    }
    createLibrary() {
      if (house.length >= 5) {
        alert("Max Libraries amount reached");
        return;
      }
      let l;
      do {
        l = prompt("Input new library name");
        if (l === "foo")
          l = "notFoo";
      } while (this.includesDuplicates(l));
      if (!l)
        return;
      const newBornLibrary = new Library(l);
      this.push(newBornLibrary);
      return newBornLibrary;
    }
    setDOMlibrary(l) {
      const anchorTemplate = document.getElementById("lib-template");
      nav?.appendChild(anchorTemplate.content.cloneNode(true));
      const anchor = document.getElementById("foo-library");
      anchor.setAttribute("href", `#${l.nameToId()}`);
      anchor.setAttribute("id", `${l.nameToId()}-library`);
      anchor.innerText = `${l.name}`;
      anchor.addEventListener("click", () => {
        this.sortHouseBySelectedLibrary(l);
      });
    }
    unsetDOMlibrary(l) {
      const domL = document.getElementById(l.nameToId());
      if (!domL)
        return "not okay";
      nav?.removeChild(domL);
    }
    includesDuplicates(inputName) {
      if (!inputName)
        return false;
      for (const l of this) {
        if (l.name == inputName) {
          return true;
        }
      }
      return false;
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
      this.setAddScreenValues = () => {
        const div = document.getElementById("book-info");
        if (!div)
          return;
        div.innerText = `
Pages: ${this.pages}${this.genre ? `
Genres: ${this.genre?.join(" ")}` : ""}${this.description ? `
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
      };
      this.briefDescription = () => {
        if (this.description)
          return this.description.split(" ").slice(0, 25).join(" ") + "...";
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
  var dropdownBooks = class {
    constructor(title, value, volume) {
      this.title = title;
      this.value = value;
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
            console.log(err);
            return false;
          }
        }
        const house2 = JSON.parse(decodedStr);
        for (const room of house2) {
          if (typeof room.name !== "string" || room.storage.constructor !== Array || room.check !== Library.toString()) {
            return false;
          }
        }
        return house2;
      };
    }
  };
  var recievedURLParams = new URLHouseParams(window.location.search);
  var cachedHouse = JSON.parse(localStorage.getItem("house"));
  var mainLibrary = new Library("Main Library");
  var house = recievedURLParams.isHouse() || cachedHouse || new House(mainLibrary);
  for (const libraries of house) {
    Object.setPrototypeOf(libraries, Library.prototype);
    for (const book of libraries.storage) {
      Object.setPrototypeOf(book, Book.prototype);
    }
  }
  var body = document.querySelector("body");
  var ground = document.querySelectorAll(".hidable");
  var nav = document.querySelector("nav");
  house.forEach((l) => house.setDOMlibrary(l));
  var addLibraryBtn = document.getElementById("new-library-btn");
  addLibraryBtn?.addEventListener("click", () => {
  });
  var main = document.querySelector("main");
  main?.addEventListener("mousedown", () => {
    const newBookDiv = document.getElementById("new-book-div");
    const tagifyDropdown = document.querySelector(".tagify__dropdown");
    if (newBookDiv)
      main.removeChild(newBookDiv);
    if (tagifyDropdown)
      body?.removeChild(tagifyDropdown);
    body?.classList.remove("opaque");
    ground?.forEach((n) => n.classList.remove("hide"));
  });
  var addBookTemplate = document.getElementById("new-book-template");
  var addBookBtn = document.getElementById("add-book");
  addBookBtn?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    body?.classList.add("opaque");
    ground?.forEach((n) => n.classList.add("hide"));
    main?.appendChild(addBookTemplate.content.cloneNode(true));
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
        "input": (e) => {
          if (e.detail.value.length > 1) {
            titleSelect.loading(true).dropdown.hide();
            titleSelect.googleGET(e.detail.value).then((r) => r.json()).then((data) => {
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
            });
          }
        },
        "change": () => {
          if (!titleSelect.value[0])
            return;
          titleSelect.value[0].googleVolumeInfoToBook().setAddScreenValues();
        }
      }
    });
    addBookForm?.addEventListener("submit", (ev2) => {
      ev2.preventDefault();
      const selectedBook = titleSelect.value[0].googleVolumeInfoToBook();
      const checkbox = document.querySelector('input[type="checkbox"]');
      selectedBook.read = checkbox.checked;
      house[0].addBook(selectedBook);
    });
  });
  localStorage.setItem("house", JSON.stringify(house));
  var encodedHouse = encodeURIComponent(JSON.stringify(house));

  // node_modules/chai/index.mjs
  var import_index = __toESM(require_chai2(), 1);
  var expect = import_index.default.expect;
  var version = import_index.default.version;
  var Assertion = import_index.default.Assertion;
  var AssertionError = import_index.default.AssertionError;
  var util = import_index.default.util;
  var config = import_index.default.config;
  var use = import_index.default.use;
  var should = import_index.default.should;
  var assert = import_index.default.assert;
  var core = import_index.default.core;
  var chai_default = import_index.default;

  // test/mocha/test.ts
  var assert2 = chai_default.assert;
  describe("House Object testing", () => {
    context("Libraries manipulation", () => {
      it("Create 3 libraries", () => {
        house.createLibrary();
        house.createLibrary();
        house.createLibrary();
        assert2.equal(house.length, 4);
      });
      it('Put library "e" in house[0]', () => {
        house.pop();
        house.pop();
        house.pop();
        house.pop();
        house.pop();
        console.log(house);
        console.log(house);
      });
    });
  });
})();
/*! Bundled license information:

assertion-error/index.js:
  (*!
   * assertion-error
   * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
   * MIT Licensed
   *)
  (*!
   * Return a function that will copy properties from
   * one object to another excluding any originally
   * listed. Returned function will create a new `{}`.
   *
   * @param {String} excluded properties ...
   * @return {Function}
   *)
  (*!
   * Primary Exports
   *)
  (*!
   * Inherit from Error.prototype
   *)
  (*!
   * Statically set name
   *)
  (*!
   * Ensure correct constructor
   *)

chai/lib/chai/utils/flag.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/test.js:
  (*!
   * Chai - test utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/expectTypes.js:
  (*!
   * Chai - expectTypes utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getActual.js:
  (*!
   * Chai - getActual utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/objDisplay.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getMessage.js:
  (*!
   * Chai - message composition utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/transferFlags.js:
  (*!
   * Chai - transferFlags utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

deep-eql/index.js:
  (*!
   * deep-eql
   * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Check to see if the MemoizeMap has recorded a result of the two operands
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @returns {Boolean|null} result
  *)
  (*!
   * Set the result of the equality into the MemoizeMap
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @param {Boolean} result
  *)
  (*!
   * Primary Export
   *)
  (*!
   * The main logic of the `deepEqual` function.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (optional) Additional options
   * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
   * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
      complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
      references to blow the stack.
   * @return {Boolean} equal match
  *)
  (*!
   * Compare two Regular Expressions for equality.
   *
   * @param {RegExp} leftHandOperand
   * @param {RegExp} rightHandOperand
   * @return {Boolean} result
   *)
  (*!
   * Compare two Sets/Maps for equality. Faster than other equality functions.
   *
   * @param {Set} leftHandOperand
   * @param {Set} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for generator objects such as those returned by generator functions.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Determine if the given object has an @@iterator function.
   *
   * @param {Object} target
   * @return {Boolean} `true` if the object has an @@iterator function.
   *)
  (*!
   * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
   * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
   *
   * @param {Object} target
   * @returns {Array} an array of entries from the @@iterator function
   *)
  (*!
   * Gets all entries from a Generator. This will consume the generator - which could have side effects.
   *
   * @param {Generator} target
   * @returns {Array} an array of entries from the Generator.
   *)
  (*!
   * Gets all own and inherited enumerable keys from a target.
   *
   * @param {Object} target
   * @returns {Array} an array of own and inherited enumerable keys from the target.
   *)
  (*!
   * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
   * each key. If any value of the given key is not equal, the function will return false (early).
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
   * for each enumerable key in the object.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Returns true if the argument is a primitive.
   *
   * This intentionally returns true for all objects that can be compared by reference,
   * including functions and symbols.
   *
   * @param {Mixed} value
   * @return {Boolean} result
   *)

chai/lib/chai/utils/isProxyEnabled.js:
  (*!
   * Chai - isProxyEnabled helper
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addProperty.js:
  (*!
   * Chai - addProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addLengthGuard.js:
  (*!
   * Chai - addLengthGuard utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getProperties.js:
  (*!
   * Chai - getProperties utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/proxify.js:
  (*!
   * Chai - proxify utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addMethod.js:
  (*!
   * Chai - addMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteProperty.js:
  (*!
   * Chai - overwriteProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/overwriteMethod.js:
  (*!
   * Chai - overwriteMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/addChainableMethod.js:
  (*!
   * Chai - addChainingMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)
  (*!
   * Module variables
   *)

chai/lib/chai/utils/overwriteChainableMethod.js:
  (*!
   * Chai - overwriteChainableMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/compareByInspect.js:
  (*!
   * Chai - compareByInspect utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js:
  (*!
   * Chai - getOwnEnumerablePropertySymbols utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/getOwnEnumerableProperties.js:
  (*!
   * Chai - getOwnEnumerableProperties utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies
   *)

chai/lib/chai/utils/isNaN.js:
  (*!
   * Chai - isNaN utility
   * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
   * MIT Licensed
   *)

chai/lib/chai/utils/index.js:
  (*!
   * chai
   * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Dependencies that are used for multiple exports are required here only once
   *)
  (*!
   * test utility
   *)
  (*!
   * type utility
   *)
  (*!
   * expectTypes utility
   *)
  (*!
   * message utility
   *)
  (*!
   * actual utility
   *)
  (*!
   * Inspect util
   *)
  (*!
   * Object Display util
   *)
  (*!
   * Flag utility
   *)
  (*!
   * Flag transferring utility
   *)
  (*!
   * Deep equal utility
   *)
  (*!
   * Deep path info
   *)
  (*!
   * Check if a property exists
   *)
  (*!
   * Function name
   *)
  (*!
   * add Property
   *)
  (*!
   * add Method
   *)
  (*!
   * overwrite Property
   *)
  (*!
   * overwrite Method
   *)
  (*!
   * Add a chainable method
   *)
  (*!
   * Overwrite chainable method
   *)
  (*!
   * Compare by inspect method
   *)
  (*!
   * Get own enumerable property symbols method
   *)
  (*!
   * Get own enumerable properties method
   *)
  (*!
   * Checks error against a given set of criteria
   *)
  (*!
   * Proxify util
   *)
  (*!
   * addLengthGuard util
   *)
  (*!
   * isProxyEnabled helper
   *)
  (*!
   * isNaN method
   *)
  (*!
   * getOperator method
   *)

chai/lib/chai/assertion.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Module dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   *)
  (*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   *)

chai/lib/chai/core/assertions.js:
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/expect.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/should.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)

chai/lib/chai/interface/assert.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai dependencies.
   *)
  (*!
   * Module export.
   *)
  (*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   *)
  (*!
   * Aliases.
   *)

chai/lib/chai.js:
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai version
   *)
  (*!
   * Assertion Error
   *)
  (*!
   * Utils for plugins (not exported)
   *)
  (*!
   * Utility Functions
   *)
  (*!
   * Configuration
   *)
  (*!
   * Primary `Assertion` prototype
   *)
  (*!
   * Core Assertions
   *)
  (*!
   * Expect interface
   *)
  (*!
   * Should interface
   *)
  (*!
   * Assert interface
   *)
*/
