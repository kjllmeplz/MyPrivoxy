// ==UserScript==
// @name        Disable YouTube Video Ads
// @namespace   DisableYouTubeVideoAds
// @version     1.2.21
// @license     AGPLv3
// @author      jcunews
// @website     https://greasyfork.org/en/users/85671-jcunews
// @description Disable YouTube video & screen based ads at home page, and right before or in the middle of the main video playback. For new YouTube layout (Polymer) only.
// @include     https://www.youtube.com/*
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

((window, fn, ipse, haia, hca, rpo) => {

  fn = (a, et) => {

    if ((a = document.scripts[document.scripts.length - 1]) && (a.id === "dyvaUjs")) a.remove();

    et = window.InstallTrigger ? "beforescriptexecute" : "message"; //Firefox workaround

    JSON.parse_ = JSON.parse;
    JSON.parse = function(a) {
      var m, z;
      if (rpo) {
        a = rpo;
        try {
          if (a.forEach) {
            a.forEach((p, a) => {
              if (p.player && p.player.args && p.player.args.player_response) {
                a = p.player_response_;
                patchPlayerResponse(a); 
                p.player_response = JSON.stringify(a);
              } else if (p.playerResponse) {
                patchPlayerResponse(p.playerResponse);
              }
            });
          } else patchPlayerResponse(a);
        } catch(z) {}
        rpo = null;
      } else if (a && a.match && (m = a.match(/^(.*player_response=)([^&]+)(.*)/))) {
        try {
          a = JSON.parse_(decodeURIComponent(m[2]));
          patchPlayerResponse(a);
          a = m[1] + encodeURIComponent(JSON.stringify(a)) + m[3];
        } catch(z) {}
      } else return JSON.parse_(a);
      return a;
    };

    var ftc = window.fetch;
    window.fetch = function(u) {
      if (u) {
        if (u.substr && /\/v1\/player\/ad_break/.test(u)) return new Promise(() => {});
        if (u.url && u.url.substr && /\/v1\/player\/ad_break/.test(u.url)) return new Promise(() => {});
      }
      return ftc.apply(this, arguments);
    };

    var rj = Response.prototype.json;
    Response.prototype.json = function() {
      var rs = this, p = rj.apply(this, arguments), pt = p.then;
      p.then = function(fn) {
        var fn_ = fn;
        fn = function(j) {
          if (/\/v1\/player\?/.test(rs.url)) rpo = j;
          if ("function" === typeof fn_) return fn_.apply(this, arguments);
        };
        return pt.apply(this, arguments);
      };
      return p;
    };
    var rt = Response.prototype.text;
    Response.prototype.text = function() {
      var rs = this, p = rt.apply(this, arguments), pt = p.then;
      p.then = function(fn) {
        var fn_ = fn;
        fn = function(t) {
          if (/\/v1\/player\?/.test(rs.url)) rpo = JSON.parse_(t);
          if ("function" === typeof fn_) return fn_.apply(this, arguments);
        };
        return pt.apply(this, arguments);
      };
      return p;
    };

    window.XMLHttpRequest.prototype.open_dyva = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(mtd, url) {
      if (!(/get_midroll_info/).test(url) && !((/^\/watch/).test(location.pathname) && (/get_video_info/).test(url))) {
        this.url_dyva = url;
        return this.open_dyva.apply(this, arguments);
      }
    };
    window.XMLHttpRequest.prototype.addEventListener_dyva = window.XMLHttpRequest.prototype.addEventListener;
    window.XMLHttpRequest.prototype.addEventListener = function(typ, fn) {
      if (typ === "readystatechange") {
        var f = fn;
        fn = function() {
          var z;
          if ((this.readyState === 4) && (/\/watch\?|get_video_info/).test(this.url_dyva)) {
            rpo = JSON.parse_(this.responseText);
            try {
              rpo.forEach(p => {
                if (p.player && p.player.args && p.player.args.player_response) {
                  p.playerResponse_ = JSON.parse_(p.player_response);
                  if (p.playerResponse_.playabilityStatus && (p.playerResponse_.playabilityStatus.status === "LOGIN_REQUIRED")) {
                    nav.navigate({commandMetadata: {webCommandMetadata: {url: location.href, webPageType: "WEB_PAGE_TYPE_BROWSE"}}}, false);
                    return;
                  }
                  patchPlayerResponse(p.playerResponse_);
                  p.player_response = JSON.stringify(p.playerResponse_);
                } else if (p.playerResponse) {
                  patchPlayerResponse(p.playerResponse);
                }
              });
            } catch(z) {}
          }
          return f.apply(this, arguments);
        };
      }
      return this.addEventListener_dyva.apply(this, arguments);
    };

    window.Node.prototype.appendChild_dyva = window.Node.prototype.appendChild;
    window.Node.prototype.appendChild = function(node) {
      var a;
      if (!ipse && (a = document.querySelector('ytd-watch-flexy')) && (a = a.constructor.prototype) && a.isPlaShelfEnabled_) {
        a.isPlaShelfEnabled_ = () => false;
        ipse = true;
      }
      if ((!hca || !haia) && (a = document.querySelector('ytd-watch-next-secondary-results-renderer')) && (a = a.constructor.prototype)) {
        if (a.hasAllowedInstreamAd_ && !haia) {
          a.hasAllowedInstreamAd_ = () => false;
          haia = true;
        }
        if (a.hasCompanionAds_ && !hca) {
          a.hasCompanionAds_ = () => false;
          hca = true;
        }
      }
      if ((node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) && Array.from(node.childNodes).some((n, i) => {
        if (n.id === "masthead-ad") {
          n.remove();
          return true;
        }
      }));
      if (node.querySelector && (a = node.querySelector('.ytp-ad-skip-button'))) a.click();
      return this.appendChild_dyva.apply(this, arguments);
    };

    function patchPlayerResponse(playerResponse) {
      if (playerResponse.adPlacements) playerResponse.adPlacements = [];
      if (playerResponse.playerAds) playerResponse.playerAds = [];
    }

    function patchPlayerArgs(args, a) {
      if (args.ad_device) args.ad_device = "0";
      if (args.ad_flags) args.ad_flags = 0;
      if (args.ad_logging_flag) args.ad_logging_flag = "0";
      if (args.ad_preroll) args.ad_preroll = "0";
      if (args.ad_slots) delete args.ad_slots;
      if (args.ad_tag) delete args.ad_tag;
      if (args.ad3_module) args.ad3_module = "0";
      if (args.adsense_video_doc_id) delete args.adsense_video_doc_id;
      if (args.afv) args.afv = false;
      if (args.afv_ad_tag) delete args.afv_ad_tag;
      if (args.allow_html5_ads) args.allow_html5_ads = 0;
      if (args.csi_page_type) args.csi_page_type = args.csi_page_type.replace(/watch7ad/, "watch7");
      if (args.enable_csi) args.enable_csi = "0";
      if (args.pyv_ad_channel) delete args.pyv_ad_channel;
      if (args.show_pyv_in_related) args.show_pyv_in_related = false;
      if (args.vmap) delete args.vmap;
      if (args.player_response) {
        a = JSON.parse_(args.player_response);
        patchPlayerResponse(a);
        args.player_response = JSON.stringify(a);
      }
    }

    function patchSpf() {
      if (window.spf && !spf.request_dyva) {
        spf.request_dyva = spf.request;
        spf.request = function(a, b) {
          if (b && b.onDone) {
            var onDone_ = b.onDone;
            b.onDone = function(response) {
              var a = response;
              if (a && (/\/watch\?/).test(a.url) && (a = a.response) && (a = a.parts)) {
                a.forEach((p, a) => {
                  if (p.player && p.player.args && p.player.args.player_response) {
                    a = JSON.parse_((p = p.player.args).player_response);
                    patchPlayerResponse(a);
                    p.player_response = JSON.stringify(a);
                  } else if (p.playerResponse) {
                    patchPlayerResponse(p.playerResponse);
                  }
                });
              }
              return onDone_.apply(this, arguments);
            };
          }
          return this.request_dyva.apply(this, arguments);
        };
        return;
      }
    }

    var ldh;

    function do1(ev) {
      if (window.loadDataHook) {
        if (!window.loadDataHook.dyva) {
          ldh = window.loadDataHook;
          window.loadDataHook = function(ep, dt) {
            if (dt.playabilityStatus && (dt.playabilityStatus === "LOGIN_REQUIRED")) {
              location.href = location.href;
              throw "Ain't gonna login";
            }
            patchPlayerResponse(dt);
            return ldh.apply(this, arguments);
          };
          window.loadDataHook.dyva = true;
        }
      }
      if (window.ytcfg && window.ytcfg.set) {
        if (!window.ytcfg.set.dyva) {
          var ytcfgSet = window.ytcfg.set;
          window.ytcfg.set = function(ytConfig){
            if (window.ytInitialPlayerResponse) {
              if (ytInitialPlayerResponse.playabilityStatus && (ytInitialPlayerResponse.playabilityStatus === "LOGIN_REQUIRED")) {
                location.href = location.href;
                throw "Ain't gonna login";
              }
              patchPlayerResponse(window.ytInitialPlayerResponse);
            }
            patchSpf();
            if (ytConfig) {
              if (ytConfig.SKIP_RELATED_ADS === false) ytConfig.SKIP_RELATED_ADS = true;
              if (ytConfig.TIMING_ACTION) ytConfig.TIMING_ACTION = ytConfig.TIMING_ACTION.replace(/watch7ad/, "watch7");
              if (ytConfig.TIMING_INFO) {
                if (ytConfig.TIMING_INFO.yt_ad) ytConfig.TIMING_INFO.yt_ad = 0;
                if (ytConfig.TIMING_INFO.yt_ad_an) delete ytConfig.TIMING_INFO.yt_ad_an;
                if (ytConfig.TIMING_INFO.yt_ad_pr) ytConfig.TIMING_INFO.yt_ad_pr = 0;
              }
            }
            return ytcfgSet.apply(this, arguments);
          };
          window.ytcfg.set.dyva = true;
        }
      }
      if (window.yt) {
        if (window.yt.player && window.yt.player.Application) {
          if (window.yt.player.Application.create) {
            if (!window.yt.player.Application.create.dyva) {
              var ytPlayerApplicationCreate = window.yt.player.Application.create;
              window.yt.player.Application.create = function(id, ytPlayerConfig) {
                if ((id === "player-api") && ytPlayerConfig && ytPlayerConfig.args && ytPlayerConfig.args.vmap) delete ytPlayerConfig.args.vmap;
                return ytPlayerApplicationCreate.apply(this, arguments);
              };
              window.yt.player.Application.create.dyva = true;
            }
          }
          if (window.yt.player.Application.createAlternate) {
            if (!window.yt.player.Application.createAlternate.dyva) {
              var ytPlayerApplicationCreateAlternate = window.yt.player.Application.createAlternate;
              window.yt.player.Application.createAlternate = function(id, ytPlayerConfig) {
                if ((id === "player-api") && ytPlayerConfig && ytPlayerConfig.args && ytPlayerConfig.args.vmap) delete ytPlayerConfig.args.vmap;
                return ytPlayerApplicationCreateAlternate.apply(this, arguments);
              };
              window.yt.player.Application.createAlternate.dyva = true;
            }
          }
        }
        if (window.yt.setConfig) {
          if (!window.yt.setConfig.dyva) {
            var ytSetConfig = window.yt.setConfig;
            window.yt.setConfig = function(ytConfig){
              if (ytConfig && ytConfig.ADS_DATA) delete ytConfig.ADS_DATA;
              return ytSetConfig.apply(this, arguments);
            };
            window.yt.setConfig.dyva = true;
          }
        }
      }
      if (window.ytplayer && window.ytplayer.config && window.ytplayer.config.args) {
        if (!window.ytplayer.config.args.dvya) {
          patchPlayerArgs(window.ytplayer.config.args);
          window.ytplayer.config.args.dvya = true;
        }
        if (et === "message") {
          if (c.length === 6) {
            postMessage({});
          } else removeEventListener(et, do1);
        }
      }
    }
    addEventListener(et, do1);
    if (et === "message") postMessage({});
    do1();

    addEventListener("spfpartprocess", function(ev) { //old youtube
      if (ev.detail && ev.detail.part && ev.detail.part.data &&
          ev.detail.part.data.swfcfg && ev.detail.part.data.swfcfg.args) {
        patchPlayerArgs(ev.detail.part.data.swfcfg.args);
      }
    }, true);

    addEventListener("load", a => {
      if (!(a = window.ayvp_cssOverride)) {
        a = document.createElement("STYLE");
        a.id = "ayvp_cssOverride";
        a.innerHTML = `\/*
.video-ads{display:none!important}
.ytp-ad-overlay-open .caption-window.ytp-caption-window-bottom{margin-bottom:4em}
.ytp-autohide .caption-window.ytp-caption-window-bottom, .ytp-hide-controls .caption-window.ytp-caption-window-bottom{margin-bottom:0!important}`;
        document.documentElement.appendChild(a);
      }
    });
  };
  if (this.GM_info && (this.GM_info.scriptHandler === "FireMonkey")) {
    //workaround for FireMonkey's partial compatibility to GreaseMonkey specification.
    let e = document.createElement("SCRIPT");
    e.id = "dyvaUjs";
    e.text = "(" + fn + ")()";
    document.documentElement.appendChild(e);
  } else fn();

})(unsafeWindow);
