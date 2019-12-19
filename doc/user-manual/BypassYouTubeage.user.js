// ==UserScript==
// @name        Bypass YouTube age verification Improved
// @id          DelvinFox.Userscript.Bypass-YouTube-age-verification
// @namespace   delvin@userscripts.org
// @description A script that bypasses YouTube age verification without logging in.
// @author      DelvinFox, Volkan K.
// @license     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// @copyright   2011 DelvinFox, 2012-2017+ Volkan K.
// @homepageURL https://greasyfork.org/en/scripts/3848-bypass-youtube-age-verification-improved
// @supportURL  https://greasyfork.org/en/scripts/3848-bypass-youtube-age-verification-improved/feedback
// @version     4.6
// @domain      youtube.com
// @domain      www.youtube.com
// @include     http://youtube.com/*
// @include     http://www.youtube.com/*
// @include     https://youtube.com/*
// @include     https://www.youtube.com/*
// @grant 		unsafeWindow
// @grant 		GM_xmlhttpRequest
// @grant 		GM_registerMenuCommand
// @grant 		GM_addStyle
// @require 	https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require 	https://cdnjs.cloudflare.com/ajax/libs/js-url/2.0.2/url.min.js
// @require 	https://cdn.jsdelivr.net/phpjs/0.1/xml/utf8_decode.js
// @run-at 		document-end
// ==/UserScript==

/* #################### SETTINGS START #################### */
var yt_autostart = 1; // 1= enable autoplay, 0= disable autoplay. only for SWFobject inclusions. (embed)
var yt_showrelated = 1; // 1=enable related videos, 0=disable related videos. only for SWFobject inclusions. (embed)
var bypass_method = 3;
// 1 = Googlebot useragent method (use GM_xmlhttpRequest to get player and replace current page)
// 2 = SWFobject inclusion method (call http://youtube.com/v/VIDEO_ID SWF object from the current page)
// 3 = Get embed variables and load player using these variables
var force_html5 = 0;
// 0= use HTML5 if HTMLVideoElement is supported (default)
// 1= force HTML5 player
var debug_internal = 1; // 1=enable debug , 0 =disable debug
var disable_material = 0; // 1=disable polymer , 0=dont disable.
var disable_spf = 1; // disable Red Bar aka SPF
// INTERNALS
var please_no_more_action = false;
var base_tag_needed = false;
var url=null;
/* #################### SETTINGS END #################### */

this.$ = this.jQuery = jQuery.noConflict(true);

var bypass_method_original=bypass_method;

function debugLog(message) {
	if (debug_internal==1) {
		console.log("USER-SCRIPT YT-BYPASS | " + message);
	}
}

function create_world(){
	debugLog("create_world function called");
	please_no_more_action = false;
	base_tag_needed = false;
	bypass_method = bypass_method_original;
	if ( !(/watch/i.test(window.location)) ) { // this is not a video page?
		debugLog("this is not a video page?");
		bypass_method = 1;
	}
	if ( $( "a[data-sessionlink*='feature=private_video']" ).length > 0 ) { // this is private video? we can not access private videos.
		debugLog("this is private video? we can not access private videos.");
		bypass_method = 0;
		please_no_more_action = true;
	}
	var gm_page_changed = $('meta[name="GM_PAGE_CHANGED"]').attr("content");
	if (gm_page_changed == "YES"){
		please_no_more_action = true;
		debugLog("we already processed this page, it shouldn't be processed again."); // for debugging only.
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

	var match_next_url = window.location.search.match( /[^?&]*next_url=([^&]*)/ );
	if (match_next_url!=null){
		var base_tag_needed = true;
		var url = decodeURIComponent( match_next_url[1] );
		if ( (typeof please_no_more_action == "undefined") || (please_no_more_action != true) ){
			var ref = document.referrer;
			if (ref.match(/^https?:\/\/([^\/]+\.)?youtube\.com(\/|$)/i) || (window.url("?wait_a_minute")=="YES" || window.url("?wait_a_minute",url)=="YES") ) { // we don't want infinite loop. in case YT redirects us back to verify page.
				debugLog("Came from YouTube. won't redirect!"); // for debugging
			} else { 
				// notice: it re-executes the script when we replace the page. WTF?!?
				if ( is_it_bypass_page() ) { // thats why we will triple-check. run the shit-detector..
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
}

function worker_html_create( url ) {
	debugLog("worker_html_create function called with url ="+url);
	var VIDEO_ID=get_video_id_from_yturl(url);
	if ( jQuery( "[data-videoid='"+VIDEO_ID+"']" ).length>0 ) {
		return true;
	}
	jQuery( "iframe#ytplayer, embed#movie_player_neo" ).remove();
	var videoElement = document.createElement('video');
	var videoCompatible = videoElement && videoElement.canPlayType;
	if ( (force_html5==1) || (videoCompatible) ) {
		var use_html5 = true;
	} else {
		var use_html5 = false;
	}
	if ($('#error-screen').length > 0) {
		//alert("smth"); // are we running?
		$('#error-screen').children().hide();
		var mytarget_dom_node=$("#error-screen").css('padding', '0').append('<div id="player-api_neo"></div>')[0];
		//$("#top #player").empty().width($("#player.skeleton .player-api").width()).height($("#player.skeleton .player-api").height()).attr("id", "player-api_neo");
		dont_play_with_class=true;
	}else if ($('#player-api').length > 0) {
		var mytarget_dom_node=document.getElementById('player-api');
		$("#player-api").attr("id", "player-api_neo");
	} else if ($('#player-unavailable').length > 0) {
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
	if (typeof dont_play_with_class == "undefined") {
		$("#player-api_neo").addClass("player-height player-width player-api");
	}
	while (mytarget_dom_node.firstChild) { // clear error messages etc
		mytarget_dom_node.removeChild(mytarget_dom_node.firstChild);
	}
	var yt_src_suffix = '?enablejsapi=1&playerapiid=ytplayer';
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
		$( mytarget_dom_node ).append('<iframe data-videoid="'+VIDEO_ID+'" id="ytplayer" type="text/html" frameborder="0" height="100%" width="100%" style="overflow:hidden;height:100%;width:100%" src="'+yt_src_url+'" webkitallowfullscreen mozallowfullscreen allowfullscreen />')
	} else {
	// ADD DEFAULT FLASH PLAYER
	var newEmbed = document.createElement("embed"); // create our player
	newEmbed.setAttribute('name','movie_player_neo');
	newEmbed.setAttribute('id','movie_player_neo');
	newEmbed.setAttribute('data-videoid',VIDEO_ID);
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
	check_and_fill_rvs (VIDEO_ID);
}

function check_and_fill_rvs (VIDEO_ID) {
	debugLog("check_and_fill_rvs function called with VIDEO_ID ="+VIDEO_ID);
	if ($('#error-screen').length > 0) {
		GM_addStyle("ul.video-list {list-style: none !important;}");
		GM_addStyle(".video-list-item a{position: relative; padding: 0 5px; display: block; overflow: hidden; color: #333}.video-list-item .content-wrapper a{padding: 0}.video-list-item a:hover{background: #fff; text-decoration: none}.yt-tile-default.video-list-item a:hover{background: transparent}.video-list-item a:visited .title{color: #408}.video-list-item a:hover .title{text-decoration: underline}.video-list-item a:visited .video-thumb .img{opacity: .75; filter: alpha(opacity=75)}.video-list-item a:hover .video-thumb .img{opacity: 1; filter: none}.video-list-item .title{display: block; font-size: 1.1666em; font-weight: normal; line-height: 1.2; color: #03c; max-height: 3.6em; margin-bottom: 2px; overflow: hidden; cursor: pointer; cursor: hand}.video-list-item .episodic-item .title{overflow: hidden; white-space: nowrap; word-wrap: normal; -o-text-overflow: ellipsis; text-overflow: ellipsis}.video-list-item .stat{display: block; font-size: .9166em; color: #666; line-height: 1.4em; height: 1.4em; white-space: nowrap}.video-list-item .stat .time-created{margin-left: .25em; padding-left: .5em; border-left: 1px solid #ccc; white-space: nowrap}.video-list-item .mix-playlist .stat{white-space: normal}.video-list-item .stat strong{color: #333}.video-list-item .views{color: #333; font-weight: 500}.video-list-item .alt{float: right; margin-right: 5px}.video-list-item .playlist-video-count{margin-left: 10px}.video-list-item .playlist-video{height: 15px; overflow: hidden}.video-list-item .ux-thumb-wrap .video-count{position: absolute; top: 2px; right: 2px; padding: 2px; background: rgba(0,0,0,.8); color: #fff; font-weight: normal; font-size: 90%; line-height: 1; text-align: center}.video-list-item .ux-thumb-wrap .video-count strong{display: block}.video-grid .video-list-item{float: left; clear: none; width: 116px}.video-grid .video-list-item .video-thumb{float: none; margin: 0}.video-grid .video-list-item .title{width: 100%; max-height: 3.6em; overflow: hidden}.ad-badge-byline{margin-right: 3px}.video-list .video-list-item .title{color: #333; font-size: 14px; font-weight: 500}.video-list .video-list-item .title:hover{text-decoration: underline}.video-list .video-list-item .title:visited{color: #036}.video-list .video-list-item .description,.video-list .video-list-item .stat{color: #767676; font-size: 11px}.video-list .video-list-item .description{line-height: 1.2em; max-height: 2.4em; overflow: hidden}.video-list .video-list-item a.related-channel{padding-left: 61px}.video-list .yt-thumb-64 .yt-thumb-square{background-color: #333}.video-list .related-list-item-compact-movie-vertical-poster a.related-movie{text-align: center}.video-list .related-list-item-compact-movie-vertical-poster .content-wrapper,.video-list .related-list-item-compact-movie-vertical-poster .content-wrapper .content-link{height: 100%}.video-list .movie-data{font-size: 11px; line-height: 1.4em; color: #767676; text-overflow: ellipsis; overflow: hidden}.video-list .movie-data li{white-space: nowrap}.video-list .related-list-item-compact-movie-vertical-poster .movie-data{margin-top: 2px}.video-list .movie-description{margin-top: 4px}.video-list .related-list-item-compact-movie-vertical-poster .movie-description{margin-top: 7px}.video-list .movie-bottom-aligned-badge{position: absolute; bottom: 0; left: 0}.related-list-item .content-wrapper{margin-left: 181px}.related-list-item .content-link{display: block; min-height: 94px; text-decoration: none}.related-list-item .thumb-wrapper{position: absolute; top: 0; margin: 0 5px; width: 168px; height: 94px; overflow: hidden}.related-list-item.related-list-item-compact-movie,.related-list-item.related-list-item-compact-movie .thumb-wrapper{height: 94px}.related-list-item.related-list-item-compact-movie-vertical-poster,.related-list-item.related-list-item-compact-movie-vertical-poster .thumb-wrapper{height: 174px}.related-list-item .thumb-wrapper a{padding: 0}.related-list-item .video-actions{position: absolute; right: -60px; bottom: 2px}.related-list-item .video-time,.related-list-item .video-time-overlay,.related-list-item .video-actions:focus,.related-list-item:hover .video-actions{right: 2px}.related-list-item:hover .video-time,.related-list-item:hover .video-time-overlay{right: -60px}.related-list-item.show-video-time:hover .video-time,.related-list-item.show-video-time:hover .video-time-overlay{right: 2px}.video-list-item .yt-uix-simple-thumb-wrap{float: left; margin: 0 8px 0 0}a:hover .yt-uix-simple-thumb-wrap .video-time,a:hover .yt-uix-simple-thumb-wrap .video-time-overlay{display: none}.video-time,.video-time-overlay{position: absolute; right: 2px; bottom: 2px;}.video-time{margin-top: 0; margin-right: 0; padding: 0 4px; font-weight: 500; font-size: 11px; background-color: #000; color: #fff!important; height: 14px; line-height: 14px; opacity: .75; filter: alpha(opacity=75); display: -moz-inline-stack; vertical-align: top; display: inline-block;}.yt-uix-simple-thumb-wrap{position: relative; overflow: hidden; display: inline-block}#watch7-sidebar .video-list-item:hover .title,#watch7-sidebar .video-list-item:hover .title .yt-deemphasized-text{color: #167ac6; text-decoration: none}.video-list-item a:hover{text-decoration: none}a{text-decoration: none}");
	}
	if ($('div#watch7-sidebar-modules div.watch-sidebar-section').length < 1) {
		$('div#watch7-sidebar-modules, #related').append('<div class="watch-sidebar-section"></div>');
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

	if (emptyRvs.length>0 && $("ul#watch-related li").length==0 && $("ytd-compact-video-renderer").length==0){
		debugLog("we dont have related videos in page source!");
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
+'<li class="video-list-item related-list-item">  <a class=" related-video yt-uix-sessionlink" href="/watch?v='+rv_id+'"><span class="yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related"><img width="120" height="90" src="//i.ytimg.com/vi/'+rv_id+'/default.jpg" aria-hidden="true">'
+'<span class="video-time">'+rv_time+'</span></span>'
+'<span title="'+rv_title+'" class="title" dir="ltr">'+rv_title+'</span>'
+'<span class="stat attribution" style="'+rv_author_style+'"><span data-name="relmfu" class="g-hovercard">by <span class=" g-hovercard">'+rv_author+'</span></span></span>'
+'<span class="stat view-count" style="'+rv_hits_style+'">'+rv_hits+' views</span></a></li>';
							} else if (rv_vid!="") {
								rv_html=""
+'<li class="video-list-item related-list-item"><a class="related-playlist yt-pl-thumb-link  mix-playlist resumable-list yt-uix-sessionlink" href="/watch?v='+rv_vid+'&amp;list='+rv_list+'">'  
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

function worker_js_create( url ) {
	debugLog("worker_js_create function called with url ="+url);
 	var VIDEO_ID=get_video_id_from_yturl(url);
	if ($('#error-screen').length > 0) {
		$('#error-screen').css('padding', '0').children().hide();
		$('#player-container').children().remove();
		target_node="error-screen";
	}else if ($('#player-api').length > 0) {
		$('#player-api').css({'padding': '0','left':'0'}).children().hide();
		target_node="player-api";
		$('#player-unavailable').remove();
	} else if ($('#player-unavailable').length > 0) {
		$('#player-unavailable').css('padding', '0').children().hide();
		target_node="player-unavailable";
	}
	addScript(document.body, "var ytplayer = ytplayer || {};"
+"yt.setConfig=function (){ ytplayer.config = {'VIDEO_ID': \""+VIDEO_ID+"\"};"
+"ytplayer.config['args']={'autoplay':"+yt_autostart+",'rel':"+yt_showrelated+",'c':'WEB_EMBEDDED_PLAYER','el':'embedded','video_id':\""+VIDEO_ID+"\"};}");
	addScript(document.body, 'ytplayer.load = function() {'
+'    yt.player.Application.create("'+target_node+'", ytplayer.config);'
+'    ytplayer.config.loaded = true;'
+'};'
+'writeEmbed = function() {'
+'    ytplayer.load();/*alert("writeEmbed called")*/'
+'};yt.setConfig();writeEmbed();');
 check_and_fill_rvs (VIDEO_ID);
}

function worker_http_request( url , base_tag_needed ) {
	debugLog("worker_http_request function called with url ="+url);
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

function are_we_on_youtube(url) {
	if (!(typeof url === 'string' || url instanceof String)){
		url = window.location.href;
	}
	if (url && url.match( /^\/|(https?:\/\/([^\/]+\.)?youtube\.com(\/|$))/i ) ){
		return true;
	}
	return false;
}

function is_it_bypass_page() {
	if (document.getElementById( "verify" )) {
		return true;
	}
	if (document.getElementById('watch7-player-age-gate-content')) {
		return true;
	}
	if ($("ytd-button-renderer.ytd-player-error-message-renderer").length>0) {
		return true;
	}
	if (document.getElementsByTagName( "ytd-player-error-message-renderer" ).length>0) {
		return true;
	}	
	return false;
}

function helloworld(){
	debugLog("helloworld function called");
	create_world();
	jQuery( "a.spf-link" ).removeClass( "spf-link" );

	if( url && are_we_on_youtube(url) && is_it_bypass_page()) {
		debugLog("DEBUG: SECTION HELLO 1");
		// notice: it re-executes the script when we replace the page. WTF?!?
		if ( (typeof please_no_more_action == "undefined") || (please_no_more_action != true) ){
			if ( bypass_method == 1 ) { // 
				debugLog("DEBUG: FUNC CALL AT H.1-1");
				worker_http_request(url, base_tag_needed);
			} else if ( bypass_method == 2 ) {
				debugLog("DEBUG: FUNC CALL AT H.1-2");
				worker_html_create(url);
			} else { // 3
				debugLog("DEBUG: FUNC CALL AT H.1-3");
				worker_js_create(url);
			}
			please_no_more_action = true;
		}
	} else if ( is_it_bypass_page() ) { 
		debugLog("DEBUG: SECTION HELLO 2"); debugLog("ytd-player-error-message-renderer="+document.getElementsByTagName( "ytd-player-error-message-renderer" ).length);
		// notice: it re-executes the script when we replace the page. WTF?!?
		if ( (typeof please_no_more_action == "undefined") || (please_no_more_action != true) ){
			if ( bypass_method == 1 ) {
				debugLog("DEBUG: FUNC CALL AT H.2-1");
				worker_http_request(window.location.href);
			} else if ( bypass_method == 2 ) {
				debugLog("DEBUG: FUNC CALL AT H.2-2");
				worker_html_create(window.location.href);
			} else { // 3
				debugLog("DEBUG: FUNC CALL AT H.2-3");
				worker_js_create(window.location.href);
			}
			please_no_more_action = true;
		}
	}
	// Thanks to Polymer, videos need to be paused manually
	if ( ($('iframe#ytplayer').length > 0) && !(jQuery('iframe#ytplayer').is(':visible'))){
		$('iframe#ytplayer')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
	}
	if ( ($('#video-player').length > 0) && !(jQuery('#video-player').is(':visible'))){
		$('#video-player')[0].pauseVideo();
	}
	debugLog("DEBUG: AT HELLOWORLD EXIT");

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
if (disable_spf==1){
	uw._spf_state = uw._spf_state || {};
	uw._spf_state.enabled = false;
	uw._spf_state.config = uw._spf_state.config || {};
	uw._spf_state.config['navigate-limit'] = 0;
	uw._spf_state.config['reload-identifier'] =null;
	uw.ytspf = uw.ytspf || {};
	uw.ytspf.enabled = false;
	uw.ytspf.config = uw.ytspf.config || {};
	uw.ytspf.config['navigate-limit'] = 0;

	/*disable_spf=function(stateobj,title,url){
		var a = document.createElement('a');
		a.href = url;
		if (window.location.href!=a.href){
			$('body').fadeOut("normal", function() {
				$(this).remove();
			});
			window.location.assign(url);
		}
	}
	history.pushState=disable_spf;
	history.replaceState=disable_spf;*/
	if (typeof ytcfg != "undefined" && typeof ytcfg.data_.EXPERIMENT_FLAGS.pbj_navigate_limit != "undefined") {
		ytcfg.data_.EXPERIMENT_FLAGS.pbj_navigate_limit=0
	}
}

$( window ).load(helloworld);
window.addEventListener("yt-page-data-updated", helloworld_caller, false);
window.addEventListener("yt-navigate-start", helloworld_caller, false);
window.addEventListener("yt-navigate-finish", helloworld_caller, false);
window.addEventListener("popstate", helloworld_caller, false);
window.addEventListener("spfdone", helloworld_caller, false);
window.addEventListener("spfpartdone", helloworld_caller, false);
helloworld();
function helloworld_caller() {
	//setTimeout(helloworld,1000);
	helloworld();
}

debugLog("DEBUG: AT EXIT");

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}

function start() {
    var cookie = getPref(),
        pref = "f6=8";
    if(cookie === "fIsAlreadySet") {
        return;
    } else if(cookie !== "noPref"){
        for(var i = 0; i < cookie.length; ++i) {
            pref = pref + "&" + cookie[i].key + "=" + cookie[i].value;
        }
    }
    changePref(pref);
}
    
function changePref(values) {
    var d = new Date();
    d.setTime(d.getTime() + (100*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "PREF=" + values + ";" + expires + ";domain=.youtube.com;hostonly=false;path=/";
    location.reload();
}

function getPref() {
    var cookie = document.cookie,
        splitC = cookie.split(";");
    for(var i = 0; i < splitC.length; ++i) {
        if(splitC[i].trim().indexOf("PREF") === 0) {
            if(splitC[i].trim().indexOf("f6=8") > -1) {
                return "fIsAlreadySet";
            }
            var c = [],
                splitValues = splitC[i].substring(5).split("&");
            for(var k = 0; k < splitValues.length; ++k) {
                var splitV = splitValues[k].split("=");
                if(splitV[0] !== "f6") {
                    var kv = {};
                    kv.key = splitV[0];
                    kv.value = splitV[1];
                    c.push(kv);
                }
            }
            return c;
        }
    }
    return "noPref";
}
if (disable_material==1){ start(); }