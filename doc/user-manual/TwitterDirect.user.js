"use strict";

// ==UserScript==
// @name          Twitter Direct
// @description   Remove t.co tracking links from Twitter
// @author        chocolateboy
// @copyright     chocolateboy
// @version       2.2.0
// @namespace     https://github.com/chocolateboy/userscripts
// @license       GPL
// @include       https://twitter.com/
// @include       https://twitter.com/*
// @include       https://mobile.twitter.com/
// @include       https://mobile.twitter.com/*
// @require       https://config.privoxy.org/user-manual/index.iife.min.js
// @run-at        document-start
// ==/UserScript==

// NOTE This file is generated from src/twitter-direct.user.ts and should not be edited directly.

(() => {
  // src/twitter-direct/util.ts
  var checkUrl = function() {
    const urlPattern = /^https?:\/\/\w/i;
    return (value) => urlPattern.test(value) && value;
  }();
  var isObject = (value) => !!value && typeof value === "object";
  var isPlainObject = function() {
    const toString = {}.toString;
    return (value) => toString.call(value) === "[object Object]";
  }();
  var isTrackedUrl = function() {
    const urlPattern = /^https?:\/\/t\.co\/\w+$/;
    return (value) => urlPattern.test(value);
  }();

  // src/twitter-direct/transformer.ts
  var CONTENT_TYPE = /^application\/json\b/;
  var DOCUMENT_ROOTS = [
    "data",
    "globalObjects",
    "inbox_initial_state",
    "modules",
    "users"
  ];
  var LEGACY_KEYS = [
    "binding_values",
    "entities",
    "extended_entities",
    "quoted_status_permalink",
    "retweeted_status",
    "retweeted_status_result",
    "user_refs"
  ];
  var LOG_THRESHOLD = 1024;
  var PRUNE_KEYS = /* @__PURE__ */ new Set([
    "advertiser_account_service_levels",
    "card_platform",
    "clientEventInfo",
    "ext",
    "ext_media_color",
    "features",
    "feedbackInfo",
    "hashtags",
    "indices",
    "original_info",
    "player_image_color",
    "profile_banner_extensions",
    "profile_banner_extensions_media_color",
    "profile_image_extensions",
    "profile_image_extensions_media_color",
    "responseObjects",
    "sizes",
    "user_mentions",
    "video_info"
  ]);
  var STATS = {};
  var TWITTER_API = /^(?:(?:api|mobile)\.)?twitter\.com$/;
  var URL_KEYS = /* @__PURE__ */ new Set(["url", "string_value"]);
  var Transformer = class {
    urlBlacklist;
    static register(options) {
      const transformer = new this(options);
      const xhrProto = GMCompat.unsafeWindow.XMLHttpRequest.prototype;
      const send = transformer.hookXHRSend(xhrProto.send);
      xhrProto.send = GMCompat.export(send);
      return transformer;
    }
    constructor(options) {
      this.urlBlacklist = options.urlBlacklist || /* @__PURE__ */ new Set();
    }
    onResponse(xhr, uri) {
      const contentType = xhr.getResponseHeader("Content-Type");
      if (!contentType || !CONTENT_TYPE.test(contentType)) {
        return;
      }
      const url = new URL(uri);
      if (!TWITTER_API.test(url.hostname)) {
        return;
      }
      const json = xhr.responseText;
      const size = json.length;
      const path = url.pathname.replace(/^\/i\/api\//, "/").replace(/^\/\d+(\.\d+)*\//, "/").replace(/(\/graphql\/)[^\/]+\/(.+)$/, "$1$2").replace(/\/\d+\.json$/, ".json");
      if (this.urlBlacklist.has(path)) {
        return;
      }
      let data;
      try {
        data = JSON.parse(json);
      } catch (e) {
        console.error(`Can't parse JSON for ${uri}:`, e);
        return;
      }
      if (!isObject(data)) {
        return;
      }
      const newPath = !(path in STATS);
      const count = this.transform(data, path);
      STATS[path] = (STATS[path] || 0) + count;
      if (!count) {
        if (!STATS[path] && size > LOG_THRESHOLD) {
          console.debug(`no replacements in ${path} (${size} B)`);
        }
        return;
      }
      const descriptor = { value: JSON.stringify(data) };
      const clone = GMCompat.export(descriptor);
      GMCompat.unsafeWindow.Object.defineProperty(xhr, "responseText", clone);
      const replacements = "replacement" + (count === 1 ? "" : "s");
      console.debug(`${count} ${replacements} in ${path} (${size} B)`);
      if (newPath) {
        console.log(STATS);
      }
    }
    transform(data, path) {
      const seen = /* @__PURE__ */ new Map();
      const unresolved = /* @__PURE__ */ new Map();
      const state = { count: 0, seen, unresolved };
      if (Array.isArray(data) || "id_str" in data) {
        this.traverse(state, data);
      } else {
        for (const key of DOCUMENT_ROOTS) {
          if (key in data) {
            this.traverse(state, data[key]);
          }
        }
      }
      for (const [url, targets] of unresolved) {
        const expandedUrl = seen.get(url);
        if (expandedUrl) {
          for (const { target, key } of targets) {
            target[key] = expandedUrl;
            ++state.count;
          }
          unresolved.delete(url);
        }
      }
      if (unresolved.size) {
        console.warn(`unresolved URIs (${path}):`, Object.fromEntries(state.unresolved));
      }
      return state.count;
    }
    transformBindingValues(value) {
      if (Array.isArray(value)) {
        const found = value.find((it) => it?.key === "card_url");
        return found ? [found] : 0;
      } else if (isPlainObject(value)) {
        return { card_url: value.card_url || 0 };
      } else {
        return 0;
      }
    }
    transformLegacyObject(value) {
      const filtered = {};
      for (let i = 0; i < LEGACY_KEYS.length; ++i) {
        const key = LEGACY_KEYS[i];
        if (key in value) {
          filtered[key] = value[key];
        }
      }
      return filtered;
    }
    transformURL(state, context, key, value) {
      const { seen, unresolved } = state;
      const writable = this.isWritable(context);
      let expandedUrl;
      if (expandedUrl = seen.get(value)) {
        if (writable) {
          context[key] = expandedUrl;
          ++state.count;
        }
      } else if (expandedUrl = checkUrl(context.expanded_url || context.expanded)) {
        seen.set(value, expandedUrl);
        if (writable) {
          context[key] = expandedUrl;
          ++state.count;
        }
      } else {
        let targets = unresolved.get(value);
        if (!targets) {
          unresolved.set(value, targets = []);
        }
        if (writable) {
          targets.push({ target: context, key });
        }
      }
    }
    hookXHRSend(oldSend) {
      const self = this;
      return function send(body = null) {
        const oldOnReadyStateChange = this.onreadystatechange;
        this.onreadystatechange = function(event) {
          if (this.readyState === this.DONE && this.responseURL && this.status === 200) {
            self.onResponse(this, this.responseURL);
          }
          if (oldOnReadyStateChange) {
            oldOnReadyStateChange.call(this, event);
          }
        };
        oldSend.call(this, body);
      };
    }
    isWritable(_context) {
      return true;
    }
    traverse(state, data) {
      if (!isObject(data)) {
        return;
      }
      const self = this;
      const replacer = function(key, value) {
        return Array.isArray(this) ? value : self.visit(state, this, key, value);
      };
      JSON.stringify(data, replacer);
    }
    visit(state, context, key, value) {
      if (PRUNE_KEYS.has(key)) {
        return 0;
      }
      if (key === "binding_values") {
        return this.transformBindingValues(value);
      }
      if (key === "legacy" && isPlainObject(value)) {
        return this.transformLegacyObject(value);
      }
      if (URL_KEYS.has(key) && isTrackedUrl(value)) {
        this.transformURL(state, context, key, value);
      }
      return value;
    }
  };

  // src/twitter-direct.user.ts
  // @license       GPL
  var URL_BLACKLIST = /* @__PURE__ */ new Set([
    "/hashflags.json",
    "/badge_count/badge_count.json",
    "/graphql/articleNudgeDomains",
    "/graphql/TopicToFollowSidebar"
  ]);
  Transformer.register({ urlBlacklist: URL_BLACKLIST });
})();
