// ==UserScript==
// @name        Bypass YouTube age verification Improved
// @id          DelvinFox.Userscript.Bypass-YouTube-age-verification
// @namespace   delvin@userscripts.org
// @description A script that bypasses YouTube age verification without logging in.
// @author      DelvinFox, Volkan K.
// @license     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// @copyright   2011 DelvinFox, 2012-2015+ Volkan K.
// @homepageURL https://greasyfork.org/en/scripts/3848-bypass-youtube-age-verification-improved
// @supportURL  https://greasyfork.org/en/scripts/3848-bypass-youtube-age-verification-improved/feedback
// @version     3.6.10
// @domain      youtube.com
// @domain      www.youtube.com
// @include     http://youtube.com/verify_age*
// @include     http://www.youtube.com/verify_age*
// @include     https://youtube.com/verify_age*
// @include     https://www.youtube.com/verify_age*
// @include     http://youtube.com/verify_controversy*
// @include     http://www.youtube.com/verify_controversy*
// @include     https://youtube.com/verify_controversy*
// @include     https://www.youtube.com/verify_controversy*
// @include     http://youtube.com/watch*
// @include     http://www.youtube.com/watch*
// @include     https://youtube.com/watch*
// @include     https://www.youtube.com/watch*
// @grant 		unsafeWindow
// @grant 		GM_xmlhttpRequest
// @grant 		GM_registerMenuCommand
// @require 	https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require 	https://cdnjs.cloudflare.com/ajax/libs/js-url/2.0.2/url.min.js
// @require 	https://cdn.jsdelivr.net/phpjs/0.1/xml/utf8_decode.js
// ==/UserScript==

/* #################### SETTINGS START #################### */
var yt_autostart = 1; // 1= enable autoplay, 0= disable autoplay. only for SWFobject inclusions. (embed)
var yt_showrelated = 1; // 1=enable related videos, 0=disable related videos. only for SWFobject inclusions. (embed)
var bypass_method = 2;
// 1 = Googlebot useragent method (use GM_xmlhttpRequest to get player and replace current page)
// 2 = SWFobject inclusion method (call http://youtube.com/v/VIDEO_ID SWF object from the current page)
var force_html5 = 0;
// 0= use HTML5 if HTMLVideoElement is supported (default)
// 1= force HTML5 player
// 2= force Flash player
/* #################### SETTINGS END #################### */

this.$ = this.jQuery = jQuery.noConflict(true);

if ( !(/watch/i.test(window.location)) ) { // this is not a video page?
	bypass_method = 1;
}
if ( $( "a[data-sessionlink*='feature=private_video']" ).length > 0 ) { // this is private video? we can not access private videos.
	bypass_method = 1;
	please_no_more_action = true;
}
var gm_page_changed = $('meta[name="GM_PAGE_CHANGED"]').attr("content");
if (gm_page_changed == "YES"){
	please_no_more_action = true;
	//alert("USER-SCRIPT YT-BYPASS: we already processed this page, it shouldn't be processed again."); // for debugging only.
}

if ( window.location.pathname.match("/verify_controversy") ) {
	please_no_more_action = true;
	if ( ignorecont=document.getElementById('ignorecont') ) {
		ignorecont.checked=true;
		ignorecont.form.submit();
	} 
	else if ( verify_actions=document.getElementById('verify-actions') ) {
		buttons=verify_actions.getElementsByTagName('button');
		for (var i=0;i<buttons.length;i++) {
			if ( buttons[i].getAttribute("type")=="submit" ) {
				buttons[i].click();
			}
		}
	}
}

var url=null;
var base_tag_needed=false;
var match_next_url = window.location.search.match( /[^?&]*next_url=([^&]*)/ );
if (match_next_url!=null){
	var base_tag_needed = true;
	var url = decodeURIComponent( match_next_url[1] );
	if ( (typeof please_no_more_action == "undefined") || (please_no_more_action != true) ){
		var ref = document.referrer;
		if (ref.match(/^https?:\/\/([^\/]+\.)?youtube\.com(\/|$)/i) || (window.url("?wait_a_minute")=="YES" || window.url("?wait_a_minute",url)=="YES") ) { // we don't want infinite loop. in case YT redirects us back to verify page.
			//alert("DEBUG: Came from YouTube. won't redirect!"); // for debugging
		} else { 
			// notice: it re-executes the script when we replace the page. WTF?!?
			if ( document.getElementById( "verify" ) || document.getElementById('watch7-player-age-gate-content') ) { // thats why we will triple-check. run the shit-detector..
				if (window.url('query',url)){
					window.location.assign(url+'&wait_a_minute=YES');
				} else {
					window.location.assign(url+'?wait_a_minute=YES');
				}
				please_no_more_action = true;
			}
		}
	}
}

function keep_it_cuming_babe( url ) {
	var VIDEO_ID=get_video_id_from_yturl(url);
	var videoElement = document.createElement('video');
	var videoCompatible = videoElement && videoElement.canPlayType;
	if ( (force_html5==1) || (force_html5==0 && videoCompatible) ) {
		var use_html5 = true;
	} else {
		var use_html5 = false;
	}
	if ($('#player-api').length > 0) {
		var mytarget_dom_node=document.getElementById('player-api');
		$("#player-api").attr("id", "player-api_neo");
	} else {
		var mytarget_dom_node=document.getElementById('player-unavailable');
		$("#player-unavailable").attr("id", "player-api_neo");
	}
	if (mytarget_dom_node == null) { // we don't have ready space for player, lets use verify section
		var mytarget_dom_node=document.getElementById('verify');
		//mytarget_dom_node.className += " " + 'player-height player-width';
		$("#verify").attr("id", "player-api_neo");
		$('#player-api_neo').css('width', '');
		$("#player-api_neo").css("margin-top","1em");
		$("#player-api_neo").css("margin-left","auto");
		$("#player-api_neo").css("margin-right","auto");
	} 
	$('#player-unavailable, #verify').empty().addClass("hid").hide();
	$("#player-api_neo").removeClass("player-unavailable hid off-screen-target");
	$("#player-api_neo").addClass("player-height player-width player-api");
	while (mytarget_dom_node.firstChild) { // clear error messages etc
		mytarget_dom_node.removeChild(mytarget_dom_node.firstChild);
	}
	var yt_src_suffix = "?enablejsapi=1&playerapiid=ytplayer";
	if (yt_showrelated==0){
		yt_src_suffix += '&rel=0';
	} else {
		yt_src_suffix += '&rel=1';
	}
	if (yt_autostart==0){
		yt_src_suffix += '&autoplay=0';
	} else {
		yt_src_suffix += '&autoplay=1';
	}
	if ( use_html5 ) {
		// ADD HTML5 FRAME
		var yt_src_url = '//www.youtube.com/embed/'+VIDEO_ID + yt_src_suffix + '&html5=1&fs=1';
		$( mytarget_dom_node ).append('<iframe id="ytplayer" type="text/html" frameborder="0" height="100%" width="100%" style="overflow:hidden;height:100%;width:100%" src="'+yt_src_url+'" webkitallowfullscreen mozallowfullscreen allowfullscreen />')
	} else {
	// ADD DEFAULT FLASH PLAYER
	var newEmbed = document.createElement("embed"); // create our player
	newEmbed.setAttribute('name','movie_player_neo');
	newEmbed.setAttribute('id','movie_player_neo');
	newEmbed.setAttribute('width','100%');
	newEmbed.setAttribute('height','100%');
	newEmbed.setAttribute('wmode','opaque');
	newEmbed.setAttribute('bgcolor','#000000');
	newEmbed.setAttribute('allowscriptaccess','always');
	newEmbed.setAttribute('allowfullscreen','true');
	var yt_src_url = '//www.youtube.com/v/'+VIDEO_ID + yt_src_suffix;
	newEmbed.setAttribute('src',yt_src_url); 
	newEmbed.setAttribute('type','application/x-shockwave-flash');
	mytarget_dom_node.appendChild(newEmbed);
	}
	GM_registerMenuCommand("YT Cinema Mode", function(){
		if( $('#player-unavailable').length ){
			$("#page").removeClass("watch-non-stage-mode").addClass("watch-stage-mode");
			$("#watch7-container").addClass("watch-wide");
		} else {
			$("#page").css("background-color","#1b1b1b");
		}
		$("#content").addClass("watch-medium watch-multicamera");
		$("#player").removeClass("watch-small").addClass("watch-medium watch-multicamera");
		$("#player-api_neo").css("margin-top","0");
	});
	if ($('div#watch7-sidebar-modules div.watch-sidebar-section').length < 1) {
		$('div#watch7-sidebar-modules').append('<div class="watch-sidebar-section"></div>');
	}
	if ($('div.watch-sidebar-section div.watch-sidebar-body').length < 1) {
		$('div.watch-sidebar-section:first').append('<div class="watch-sidebar-body"></div>');
	}
	if ($('ul#watch-related').length < 1) {
		$('div.watch-sidebar-body:first').append('<ul id="watch-related" class="video-list"></ul>');
	}
	var emptyRvs = $("ul#watch-related").filter(function() {
		return $.trim($(this).text()) === "" && $(this).children().length === 0;
	});

	if (emptyRvs.length>0 && $("ul#watch-related li").length==0 ){
		//alert("DEBUG: we dont have related videos!");
		if (yt_showrelated!=0){
		GM_xmlhttpRequest({
			method: "GET",
			headers: { 'Referer': 'https://www.youtube.com/', 'X-Requested-With': 'ShockwaveFlash/19.0.0.245' },
			url: 'http://www.youtube.com/get_video_info?asv=3&hl=en_US&el=embedded&eurl=https%3A%2F%2Fwww.youtube.com%2F&video_id='+VIDEO_ID,
			onload: function( response ) {
				if ( response.status == 200 ) {
					rvs_decoded = loadStringVar("rvs", response.responseText);
					//rvs_decoded_2 = urldecode(rvs_decoded); // for debugging, do not leave this uncommented, double urldecode breaks some strings.
					//alert(rvs_decoded_2); /*alert(rvs_decoded);*/ // for debugging
					if (rvs_decoded!=""){ // I guess we got something, lets continue
						$.each(rvs_decoded.split(","), function( index, value ) {
							rv_id=loadStringVar("id", value);
							rv_time=loadStringVar("length_seconds", value);
							minutes = Math.floor(rv_time / 60);
							seconds = rv_time - minutes * 60;
							rv_time=minutes+":"+(seconds  < 10 ? "0" + seconds : seconds);
							rv_title=utf8_decode(urldecode(loadStringVar("title", value)));
							rv_author=utf8_decode(urldecode(loadStringVar("author", value)));
							if (rv_author==""){rv_author="<i>UnKnown</i>";rv_author_style='display:none;'} else {rv_author_style='';}
							rv_hits=loadStringVar("view_count", value);
							if (rv_hits==""){rv_hits="<i>UnKnown</i>";rv_hits_style='display:none;'} else {rv_hits_style='';}
							// for related playlists
							rv_vid=loadStringVar("video_id", value);
							rv_list=loadStringVar("list", value);
							rv_pl_title=utf8_decode(urldecode(loadStringVar("playlist_title", value)));
							rv_pl_length=loadStringVar("playlist_length", value);
							rv_pl_author=utf8_decode(urldecode(loadStringVar("playlist_author", value)));
							if (rv_pl_author==""){rv_pl_author="<i>UnKnown</i>";rv_pl_author_style='display:none;'} else {rv_pl_author_style='';}
							rv_html="";
							if (rv_id!=""){
								rv_html=""
+'<li class="video-list-item related-list-item">  <a class=" related-video spf-link  yt-uix-sessionlink" href="/watch?v='+rv_id+'"><span class="yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related"><img width="120" height="90" src="//i.ytimg.com/vi/'+rv_id+'/default.jpg" aria-hidden="true">'
+'<span class="video-time">'+rv_time+'</span></span>'
+'<span title="'+rv_title+'" class="title" dir="ltr">'+rv_title+'</span>'
+'<span class="stat attribution" style="'+rv_author_style+'"><span data-name="relmfu" class="g-hovercard">by <span class=" g-hovercard">'+rv_author+'</span></span></span>'
+'<span class="stat view-count" style="'+rv_hits_style+'">'+rv_hits+' views</span></a></li>';
							} else if (rv_vid!="") {
								rv_html=""
+'<li class="video-list-item related-list-item"><a class="related-playlist yt-pl-thumb-link  spf-link  mix-playlist resumable-list yt-uix-sessionlink" href="/watch?v='+rv_vid+'&amp;list='+rv_list+'">'  
+'<span class="yt-pl-thumb  is-small"><span class="video-thumb  yt-thumb yt-thumb-120"><span class="yt-thumb-default"><span class="yt-thumb-clip"><img width="120" src="//i.ytimg.com/vi/'+rv_vid+'/default.jpg" alt="" aria-hidden="true"><span class="vertical-align"></span></span></span></span>'
+'<span class="sidebar"><span class="yt-pl-sidebar-content yt-valign"><span class="yt-valign-container"><span class="formatted-video-count-label"><b>'+rv_pl_length+'</b> videos</span><span class="yt-pl-icon yt-pl-icon-mix yt-sprite"></span></span></span></span>'
+'<span class="yt-pl-thumb-overlay"><span class="yt-pl-thumb-overlay-content"><span class="play-icon yt-sprite"></span><span class="yt-pl-thumb-overlay-text">Play all</span></span></span></span>'
+'<span title="'+rv_pl_title+'" class="title" dir="ltr">'+rv_pl_title+'</span><span class="stat attribution" style="'+rv_pl_author_style+'">by '+rv_pl_author+'</span></a></li>';
							}
							$( "ul#watch-related" ).append( rv_html );
						});
					}
				}
			}
		});
		}
	}
}

function do_your_thing_romeo( url , base_tag_needed ) {
 //alert(url); return false; // for debug
 GM_xmlhttpRequest({
  method: "GET",
  headers: {
   "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  },
  url: url,
  onload: function( response ) {
   if ( response.status == 200 ) {
    if( response.finalUrl.match( "/verify_controversy" ) ) {
     window.location.href = url + "&skipcontrinter=1";
    } else {
	 result=response.responseText;
	 result = result.replace(/(<head[^>]*>)([ \t]*)([\r]?[\n]?)/ig, '$1$2$3<meta name="GM_PAGE_CHANGED" content="YES">$3');
	 if (base_tag_needed && !(/<base /i.test(response.responseText)) && response.finalUrl) {
     	result = result.replace(/(<head[^>]*>)([ \t]*)([\r]?[\n]?)/ig, '$1$2$3<base href="'+response.finalUrl+'">$3');
		replace_my_page(result);
     } else {
		replace_my_page(result);
     }
    }
   }
  }
 });
}

function get_video_id_from_yturl (yturl) {
	var parser = document.createElement('a');
	parser.href = yturl;
	return loadStringVar("v", parser.search);
}

function loadStringVar (sVar, mystring) {
  if ( !(/^[&?]/.test(mystring)) ) {
    mystring="?"+mystring;
  }
  return unescape(mystring.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
function loadPageVar (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
 
function replace_my_page(resultHTML){
	unsafeWindow.my_resultHTML=resultHTML;
	replace_js='document.open( "text/html", "replace" );'+"\r\n"
	+'document.write(my_resultHTML);'+"\r\n"
	+'document.close();'+"\r\n";
	addScript(document.body, replace_js);
}

function urldecode(str) {
//       discuss at: http://phpjs.org/functions/urldecode/
  return decodeURIComponent((str + '')
    .replace(/%(?![\da-f]{2})/gi, function() {
      // PHP tolerates poorly formed escape sequences
      return '%25';
    })
    .replace(/\+/g, '%20'));
}

// Function : addScript()
// Source: http://userscripts.org/groups/51

function addScript(body, js, link) {
	if (!body){
		var body = document.body; 
	}
	script = document.createElement('script');
    if (!body) return;
    script.type = 'text/javascript';
	if ( (js=='') && (link!='') ){
		script.src = link;
	} else {
		script.textContent = js;
	}
    body.appendChild(script);
	//return script;
}

function helloworld(){
	if( url && url.match( /^\/|(https?:\/\/([^\/]+\.)?youtube\.com(\/|$))/i ) && document.getElementById( "verify" ) ) {
		// notice: it re-executes the script when we replace the page. WTF?!?
		if ( (typeof please_no_more_action == "undefined") || (please_no_more_action != true) ){
			if ( bypass_method == 1 ) { // 
				do_your_thing_romeo(url, base_tag_needed);
			} else {
				keep_it_cuming_babe(url);
			}
			please_no_more_action = true;
		}
	} else if ( document.getElementById('watch7-player-age-gate-content') ) { 
		// notice: it re-executes the script when we replace the page. WTF?!?
		if ( (typeof please_no_more_action == "undefined") || (please_no_more_action != true) ){
			if ( bypass_method == 1 ) {
				do_your_thing_romeo(window.location.href);
			} else {
				keep_it_cuming_babe(window.location.href);
			}
			please_no_more_action = true;
		}
	}
}

// unwraps the element so we can use its methods freely
function unwrap(elem) {
	if (elem) {
		if ( typeof XPCNativeWrapper === 'function' && typeof XPCNativeWrapper.unwrap === 'function' ) {
			return XPCNativeWrapper.unwrap(elem);
		} else if (elem.wrappedJSObject) {
			return elem.wrappedJSObject;
		}
	}
	return elem;
}

var uw;

// get the raw window object of the YouTube page
uw = typeof unsafeWindow !== 'undefined' ? unsafeWindow : unwrap(window);

// disable Red Bar aka SPF
if (uw._spf_state && uw._spf_state.config) {
	uw._spf_state.config['navigate-limit'] = 0;
	uw._spf_state.config['navigate-part-received-callback'] = function (targetUrl) {
		location.href = targetUrl;
	};
}

window.addEventListener("load", helloworld, false);