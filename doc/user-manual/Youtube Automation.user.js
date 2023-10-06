// ==UserScript==
// @name			Youtube Automation
// @namespace		https://greasyfork.org/en/scripts?set=439787
// @homepage		https://greasyfork.org/scripts/419583-youtube-automation
// @version			2.0.3
// @description		Automatically cancels dialogs and removes Ads, making YouTube friendlier and lightweight.
// @author			V. H.
// @defaulticon		https://www.google.com/s2/favicons?domain=youtube.com
// @match			*://www.youtube.com/*
// @grant			GM_log
// @grant			GM_addStyle
// @grant			unsafeWindow
// @grant			window.onurlchange
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_deleteValue
// @require			https://config.privoxy.org/user-manual/UniQ.js
// @run-at			document-start
// @compatible		Chrome
// @license			AFL-3.0
// ==/UserScript==

/**
 * This is an AdBlock filter to turn off profile pictures in live chat, and thus, reduce network usage and cpu:
 * 	||yt4.ggpht.com/ytc$image,media,other,object,xmlhttprequest
 * 
 * This is an AdBlock rule to turn off livechat completely:
 * 	||youtube.com/live*$script,websocket,other,media,object,xmlhttprequest,ping,font,stylesheet,image
 */

void async function _script() {
	"use strict";
	
	var _clean, _redir, time = 0;
	
	unsafeWindow.ytautoconf_count = 0;
	
	//Get embedded player
	unsafeWindow._getPlayer = function _getPlayer() {
		let p;
		
		if (window.videoPlayer) {
			for (const i in window.videoPlayer) {
				if (window.videoPlayer[i] && window.videoPlayer[i].setPlaybackQuality) {
					p = window.videoPlayer[i];
					break;
				}
			}
		} else {
			p = window.document.getElementById("movie_player") ||
				window.document.getElementsByClassName("html5-video-player")[0] ||
				window.document.getElementById("movie_player-flash") ||
				window.document.getElementById("movie_player-html5") ||
				window.document.getElementById("movie_player-html5-flash");
		}
		
		return (window.videoPlayer = p);
	}; //_getPlayer
	
	//Lightweight
	window.addEventListener("urlchange", _redir = async e => {
		const url = new URL(e.url);
		
		time = 0;
		
		if (location.pathname.includes("watch") && !(GM_getValue("delay1", false) || url.searchParams.has("disable_polymer") || (location.search.includes("disable_polymer") && location.href.includes(url.href)))) {
			GM_setValue("delay1", true);
			GM_log(`Re-redirecting: ${e.url}  [${time}s]`);
			
			//url.pathname = "/v/" + url.searchParams.get("v");
			url.searchParams.set("hd", "0");
			url.searchParams.set("html5", "1");
			url.searchParams.set("disable_polymer", "1");
			url.searchParams.set("fmt", "298");
			url.searchParams.set("vq", "hd720");
			url.searchParams.set("enablejsapi", "1");
			
			location.search = url.search;
			
			return true;
		} else {
			GM_log(`Redirect sink: ${e.url}  [${time}s]`);
			
			if (!url.searchParams.has("ab_channel")) GM_deleteValue("delay1");
		}
		
		return false;
	});
	
	//Skin
	GM_addStyle(`
	/* V. H. ~ Youtube Automation */
	video {
		cursor: cell;
	}
	img, ytd-thumbnail, video {
		//border-radius: 3vmin;
	}
	#country-code::after {
		content: " - Modded";
	}
	#input, #search, #contenteditable-textarea {
		caret-color: aquamarine;
	}
	#columns, #primary {
		//background-image: radial-gradient(circle closest-side at center, #303030 10%, #101010 110%);
		//background-attachment: fixed;
		//background-repeat: no-repeat;
		//background-blend-mode: color-dodge;
		//background-position: center;
		//background-size: cover;
	}
	yt-formatted-string, span {
		//color: #CCCCCC;
	}
	/* */
	`);
	
	//(async () => { unsafeWindow.sleep(700); _redir({ url: location.href }); })();
	
	const banlist = [ "Video paused. Continue watching?", "Keep your music and videos playing with YouTube Premium." ],
		p = await _adjustQuality(),
		hide = () => unsafeWindow.do_if(document.querySelectorAll("paper-button#button"), btns => {
			for (const btn of btns) {
				if (btn.innerText === "HIDE CHAT") {
					setTimeout(() => btn.click(), 2000);
					
					return true;
				}
			}
			
			return false;
		});
	
	await unsafeWindow.try_max(() => document.body, 3, 500);
	
	const i = setInterval(_clean = async () => {
		if (p && p.getCurrentTime) time = ~~p.getCurrentTime();
		
		unsafeWindow.try_once(hide);
		
		//Error
		if (document.querySelector("a[href^='//support.google.com/youtube/?p=player_error']")) {
			GM_log("Error, reloading...");
			
			if (time) {
				const url = new URL(location.href);
				
				url.searchParams.set('t', `${time}s`);
				
				location.seach = url.search;
			} else location.reload();
			
			return clearInterval(i);
		}
		
		//Overlay
		if (document.getElementsByClassName("ytp-ad-player-overlay-instream-info").length) {
			GM_log(`Reloading to avoid Ad. ${time}`);
			
			if (time) {
				const url = new URL(location.href);
				
				url.searchParams.set('t', `${time}s`);
				
				location.seach = url.search;
			} else location.reload();
			
			return clearInterval(i);
		}
		
		//Box Ad
		document.getElementsByClassName("ytp-ad-overlay-close-button").forEach(ad => {
			window.ytautoconf_count++;
			GM_log("Removed an Ad box.");
			ad.click();
		});
		
		//Home screen Ad box
		document.getElementsByTagName("ytd-display-ad-renderer").forEach(ad => {
			window.ytautoconf_count++;
			GM_log("Removed home Ad.");
			ad.parentNode.parentNode.remove();
		});
		
		//Ad elements
		document.getElementsByClassName("ytp-ad-module").forEach(ad => {
			window.ytautoconf_count++;
			GM_log("Removed Ad module.");
			ad.remove();
		});
		
		//AFK
		document.getElementsByClassName("yt-confirm-dialog-renderer").forEach(diag => {
			if (banlist.includes(diag.innerText)) {
				if (diag.innerText === banlist[0]) diag.parentNode.parentNode.parentNode.querySelector("#confirm-button").click();
				else diag.parentNode.parentNode.parentNode.querySelector("#cancel-button").click();
				
				window.ytautoconf_count++;
				GM_log(`Skipped a dialog. (${diag.innerText})`);
			}
		});
		
		//Toast
		const toast = document.getElementById("toast");
		if (toast) {
			window.ytautoconf_count++;
			GM_log("Removed toast.");
			toast.remove();
		}
		
		//Giga Ad
		const masthead = document.getElementById("masthead-ad");
		if (masthead) {
			window.ytautoconf_count++;
			GM_log("Removed masthead.");
			masthead.remove();
		}
	}, 700);
	
	_clean();
	
	//Video Quality
	async function _adjustQuality() {
		localStorage.setItem("yt-player-quality", JSON.stringify({ "data": "hd720" }));
		localStorage.setItem("yt-player-av1-pref", "720");
		localStorage.setItem("yt-html5-player-modules::subtitlesModuleData::module-enabled", true);
		sessionStorage.setItem("yt-player-quality", JSON.stringify({ "data": "hd720" }));
		sessionStorage.setItem("yt-player-av1-pref", "720");
		sessionStorage.setItem("yt-html5-player-modules::subtitlesModuleData::module-enabled", true);
		
		const player = await unsafeWindow.try_max(unsafeWindow._getPlayer, 4, 500);
		
		if (player) {
			var _quality;
			
			player.seekTo(time, true);
			
			player.onPlaybackQualityChange = _quality = e => {
				player.setPlaybackQualityRange && player.setPlaybackQualityRange("large", "hd720");
				player.setPlaybackQuality && player.setPlaybackQuality("hd720");
				
				GM_log("Quality Adjusted.");
			};
			
			_quality();
		}
		
		return player;
	} //_adjustQuality
}();
