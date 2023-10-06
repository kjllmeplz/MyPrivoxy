// ==UserScript==
// @name         Facebook no ads
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Makes sponsored feeds invisible on facebook.com
// @author       Darmikon
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    let rootEl = null;
    let intervalId = null;
    let prevUrl = null;
    let page = null;

    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        }
    }

    const onUrlChange = (cb) => {
      setInterval(() => {
         if(location.href !== prevUrl) {
           prevUrl = location.href;
           cb();
         }
      }, 50);
    }

    const doHack = (feed) => {
         // 0. Alternatively find a block with aria-label
        const aWithLabel = feed.querySelector('[aria-label="Sponsored"]');

        if(aWithLabel) {
            return true;
        }

        // 1. Find this unique block inside the feed
        const spanWithId = feed.querySelector('span[id]');


        if(!spanWithId) return;

        const spanChildren = spanWithId.children;

        // 2. Check if the second child of spanWithId is not a DIV element
        if(spanChildren && spanChildren.length) {
            if(spanChildren[1]) {
                // if(spanChildren[1].nodeName !== 'SPAN') console.log(spanChildren[1].nodeName);

                return spanChildren[1].nodeName !== 'SPAN';
            }
        }
    }

    const trimAds = () => {
        let feeds;

        if(page === 'home') {
            feeds = [].slice.call(rootEl.children || []).filter(child => {
            return child.hasAttribute('data-pagelet');
        });
        }
        if(page === 'watch') {
            feeds = [].slice.call((((rootEl.firstElementChild || {}).firstElementChild || {}).firstElementChild || {}).children || []);
        }
        
        feeds.forEach((feed, i) => {
            try {
                if(doHack(feed)) {
                    // console.log('killed', feed.querySelector('h4 span'));
                    feed.style.display = "none";
                }
            } catch (e) {}
        });
    }

    const trimAdsForRoot = () => {
        rootEl = null;
        if(intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(() => {
            if(!rootEl) {
                const home = document.querySelector('[role="feed"]');
                const watch = document.querySelector('[data-pagelet="MainFeed"]');
                if(home) {
                    page = 'home';
                }
                if(watch) {
                    page = 'watch';
                }
                rootEl = home || watch;
            } else {
                clearInterval(intervalId);
                trimAds();
            }
        }, 50);
    }

    const runAdsKiller = () => {
        const throttleKill = throttle(trimAdsForRoot, 50);
        trimAdsForRoot();
        window.addEventListener('scroll', trimAdsForRoot);
        window.addEventListener('resize', trimAdsForRoot);
        onUrlChange(trimAdsForRoot);
    }

    const init = () => {
        runAdsKiller();
    }

    init();
})();
