// ==UserScript==
// @name           Block Promoted Tweets and Stuff
// @name:fr        Bloque les Gazouillis Sponsorisés et Tout Ça
// @namespace      Itsnotlupus Industries
// @match          https://twitter.com/*
// @version        1.6
// @author         Itsnotlupus
// @description    If twitter promotes their tweet, we'll block it, or your money back!
// @description:fr Si twitter promouvois leur gazouillage, on les bloque, ou remboursé!
// @license        MIT
// @grant          GM_xmlhttpRequest
// @grant          GM_setValue
// @grant          GM_getValue
// @require        https://greasyfork.org/scripts/468394-itsnotlupus-tiny-utilities/code/utils.js
// @require        https://greasyfork.org/scripts/470991-moduleraid-with-unsafewindow/code/mr.js
// @require        https://greasyfork.org/scripts/471000-itsnotlupus-i18n-support/code/i18n.js
// ==/UserScript==
/*jshint esversion: 11 */
/*eslint no-return-assign:0, no-sequences:0 */
/*globals $$$, i18n, t, moduleraid, addStyles, untilDOM */

(async ()=> {

  // English twitter strings we use to find the bits of page content we need.
  const strings = [ 'Verified', 'Promoted', 'More', 'Get Verified'];

   await i18n.init({
    strings,
    async callback(strings) {
      // Translate twitter strings using Twitter's own data.
      // This (should) allow this script to work with all languages Twitter supports.
      const mR = new moduleraid({ entrypoint: "webpackChunk_twitter_responsive_web" });
      const [[,twitterI18N]] = mR.findConstructor('knownLanguages');
      await twitterI18N.loadLanguage('en');
      const stringIds = strings.filter(v=>v.sup).map(s=>Object.keys(twitterI18N).find(k => twitterI18N[k]===s));
      await twitterI18N.loadLanguage(document.documentElement.lang);
      return stringIds.map(id => twitterI18N[id]).reduce((o,v,i) => (o[strings[i]]=v,o), {});
    }
  });

  // inject styles to hide elmo's upselling - respect yoself, don't buy a checkmark
  addStyles(`
  [aria-label="${t`Verified`}"] {
    display: none !important;
  }
  `);

  // auto-block promoters.
  (async function blockPromotedAccounts() {
    while (true) {
      const tweets = await untilDOM(()=>$$$(`//article[@role='article']/div/div/div/div/div/div/div/span[text()='${t`Promoted`}']/../../../../..`));
      for (const tweet of tweets) {
        const moreButton = tweet.querySelector(`[aria-label="${t`More`}"]`);
        if (moreButton) {
          console.log("Found a promoted Tweet!", tweet.innerText);
          moreButton.click();
          (await untilDOM('[data-testid="block"]')).click();
          (await untilDOM('[data-testid="confirmationSheetConfirm"]')).click();
          console.log("Blocked tweet promoter");
        }
      }
      // twitter is buggy, so blocking someone doesn't necessarily remove their tweets immediately. sleep on it.
      await sleep(500);
    }
  })();

  // remove "Get Verified" upsell in the right column
  (async function removeGetVerifiedBlock() {
    while (true) {
      (await untilDOM(() => $$$(`.//*[text()[contains(.,'${t`Get Verified`}')]]/../../..`)[0])).remove();
    }
  })();

})();