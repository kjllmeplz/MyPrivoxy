// ==UserScript==
// @name           Facebook Purity
// @namespace      http://steeev.freehostia.com
// @description    F.B Purity hides application spam and other clutter from your facebook homepage
// @icon           https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/373593_408502197558_209872631_q.jpg
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        https://*.facebook.com/ajax/*
// @exclude        http://*.channel.facebook.com/*
// @exclude        https://*.channel.facebook.com/*
// @exclude        http://*.facebook.com/xti.php?*
// @exclude        https://*.facebook.com/xti.php?*
// @exclude        http://*.facebook.com/xti.php*
// @exclude        https://*.facebook.com/xti.php*
// @exclude        http://*.facebook.com/ai.php?*
// @exclude        https://*.facebook.com/ai.php?*
// @exclude        http://*.facebook.com/ai.php*
// @exclude        https://*.facebook.com/ai.php*
// @exclude        https://www.facebook.com/facebookforbusiness/*
// @exclude        http://www.facebook.com/facebookforbusiness/*
// @exclude        http://developers.facebook.com/*
// @exclude        https://developers.facebook.com/*
// @run-at document-start
// @grant          GM_getValue
// @grant          GM_setValue
// @version        17.2.0 - 19 Dec 2016
// ==/UserScript==

// these 2 excludes commented out for now, till we investigate which pages we need to exclude, as we need to run on certain "connect" pages for blocking apps.
// @exclude        http://*.facebook.com/connect/*
// @exclude        https://*.facebook.com/connect/*

//
// (C) 2009 - 2016 Stephen Fernandez - http://www.fbpurity.com
//

// If you like this script please donate, big or small donations, anything is welcome : 

// http://donate.fbpurity.com/

// ------------------------------------------------------------
// F.B. Purity Home Page  : http://www.fbpurity.com
// F.B  Purity Install    : http://install.fbpurity.com
// F.B. Purity Fan Page   : http://fans.fbpurity.com
// F.B. Purity UserGuide  : http://user-guide.fbpurity.com
// F.B. Purity Custom CSS : http://css.fbpurity.com
// F.B. Purity FAQ / Help : http://faq.fbpurity.com
// F.B. Purity Search     : http://search.fbpurity.com
// ------------------------------------------------------------

// ABOUT
// -----
// This greasemonkey script hides all third party facebook application messages from your fb homepage.
// Instructions on how to edit the "whitelist" are available here: http://whitelist.fbpurity.com
// Instructions on how to edit the "extras" are available here:    http://extras.fbpurity.com
// Make donations to F.B. Purity, to show your appreciation here:  http://donate.fbpurity.com

// INSTALLATION
// ------------
// This script is compatible with the following web browsers: Firefox, Google Chrome, Opera and Safari
//
// Full installation instructions are available here: 
// http://install.fbpurity.com
//
// If you have any problems, please see the Frequently Asked Questions / Help page:
// http://faq.fbpurity.com

// UPDATES
// -------
// Full Update Log can now be accessed at http://www.fbpurity.com/change-log.htm
// 12.0.0    3rdOct2014 Fixed hide birthdays in right hand column option, fixed full date+time option for firefox, fixed hide related stories popup, fixed hide people you may know, fixed hide events in left column, fixed hide wrote on wall, added hide "Your Pages" box, fixed "hide newsfeed" option, new hide search box popup option, new hide auto tag suggestions option, fixed photos in chat opening in a new window
// 12.1.0   12thOct2014 Fixed hide sponsored box for some users, Fixed tag suggestions for "Share" popup menu (share in group/share on friend's timeline) Fixed tagging users in photos, and locations, Fixed tag suggestions on "View as" page. Auto click "more stories" button on initial load, updated sort most recent code, new hide friend requests icon in top nav bar option, updated the hide games and apps to completely hide "games you may like" instead of filtering it to the extras tab
// 12.1.3               Fixed "Sort: Most Recent" to allow viewing of "Top Stories", Fixed the redirect to Find Friends page for some users,
// 12.2.x               Fixed hide stickers in comments, fixed fbp options screen so it doesnt lose scroll position,
// 12.5.1   19thOct2014 Added warning if app or game requests email address, fixed redirects on pages feed and friends list pages, fixed "hide all video" option, swapped FBP's disable autoplay functionality with a link on the options screen that turns Facebook's own built in disable autoplay option.
// 12.5.1.2 21stOct2014 Re-enabled FBP's disable autoplay function for people who don't have Facebooks native disable option. Fixed redirect when previewing pdf files in a group
// 12.7.0    3rdNov2014 Deleted Friends alerts are now more persistent. Fixed Donation request. Fixed opera 12 slowdown bug. Fixed Share animated gif bug.
// 12.8.0   11thDec2014 Fixed hidden privacy selectors when hide emoticons option is turned on, if show full timestamps option is on, now if you hover over the date/timestamp it shows the short time style (how many minutes/hours ago it was posted)
//                      Added "is watching / is listening to" filter, fixed set as background image functionality, fixed disable autoplay, added display logout button in top navbar option, added hide status button in top nav bar option, fixed sort most recent option for new search
// 12.9.1    6thMay2015 Fixed intermittent bug with show logout button option (its related to slow pages), removed single column timeline option as its not needed anymore, fixed automatic "turn off disable autoplay link", added "Z" keyboard shortcut for zapping comments with just name tags or stickers, fixed hide group suggestions in right column option,
//                      Fixed full screen chat for new thin chat sidebar, fixed fbp update check, fixed fbp news check, removed disable autoplay option, fixed on this day page redirecting back to newsfeed when sort most recent option selected, fixed hide on this day, and "new group" left column link options, fixed cant view facebook videos when "sort most recent" option turned on, added "replied to a comment on this" to the "commented on this" filter
// 13.0.0   27thMay2015 Fixed filtering on friend list feeds
// 13.2.0   24thJun2015 Fixed sort:most recent, fixed hide left column link options, fixed hide offline friends option, added a hide new stories popup button option, replaced unread stories feed option with friend feed option
// 13.2.1   25thJun2015 Fixed home link not working on profile/timeline pages when "Sort Feed: Most Recent" option was turned on.
// 13.2.3    2ndJul2015 Fixed newsfeed filtering (some posts were evading fbps filters), fixed application/game post filtering, Fixed transparent newsfeed option, Removed hide status button in top nav bar option.
// 13.3.1   30thJul2015 New: Hide Group Conversations in Chat option. New: Hide Send Money Button option, fixed "changed location" filter, improved newsfeed most recent/top stories etc dropdown menu handling, new hide "edit profile" left column link option, fixed "switching to most recent" bug when clicking a notification
// 13.4.1    6thAug2015 Fixed Filtering on List Pages
// 13.4.2   25thNov2015 New: filters for hiding "your memories" AND "shared a memory", fixed position of logout button, added "liked x's comment" pattern to "liked this" filter, added "replied to a comment" pattern to "commented on this" filter, added visual indicator for whitelisted posts, added option to hide new "Suggested" section in left column, fixed hide stickers, fixed empty comment (tags only) zap function, fixed hide all videos option, fixed filtering ads from the newsfeed for latest firefox
//                      Fixed FBP link position, Fixed game/app filters. Fixed show more friends in chat, fixed full screen chat option, fixed revert bubble chat option, fixed some issues with background colours, added hiding the "topics" section in the left column to the hide trending topics option, fixed filtering out "interested in" event, fixed hide emoticons/stickers option.
// 14.0.0   22ndDec2015 Fixed newsfeed filtering for FF41/42/43+, Fixed "Set Background Image" link for photo theatre mode, added "remove image from background" option, fixed hide send money icon in inbox, fixed hide "pages you may like" stories in newsfeed, added "playing" to the "watching/listening" to filter, new hide trending search suggestions option, updated nagging questions filter to hide seasonal / promotional messages in the status update box, added hide "sale groups" to hide left column link options.
// 14.1.0    8thJan2016 Fixed sort most recent (also changed name of option), added option to make "friend feed" the default, temporarily stop hiding games if user chooses to view gamesfeed, fixed filtering app/game posts in ticker, fixed hide "liked page" filter, fixed top nav bar colour/image/logout button options, "Z" keyboard shortcut now zaps comments featuring text from Text Filter box
// 14.2.0   29thJan2016 Fixed some issues with the filter the ticker option, fixed some issues with hide auto tag suggestions, added option to hide "Suggest Edits" link in left column, added check to see if FB language is not English
//                      Updated : renamed "Trending Articles" filter option to "Trending Stories", and fixed it to filter out trending stories from the newsfeed, updated external link fixing code, added a hide profile hovercards option, fixed chrome extension instability if extension has been disabled in the background
// 14.3.1   17thFeb2016 New: Font Preview window, New: Show Full URLs on shared links option, Fixed: "Expand News Column" option, Improved hide emoticons option to show text in some cases, Fixed news notification from showing up on every install, renamed wrote on wall wrote on timeline, added Preview individual font link, removed freeze top nav bar option, updated hide trending search suggestions to remove political debate search, fixed hide birthday posts in newsfeed, updated "hide nagging questions" option to stop facebooks prompts to update your status with current events (such as political debates or public holidays), updated "Hide Games and Apps" (Timeline Options) option to hide all games and apps on timeline pages except whitelisted apps.
// 14.5.0   26thFeb2016 New: Hide Reactions bar option, new export settings to text file function, fixed hiding "page stories you might like", removed left column links for gifts, fbiphone,fbandroid, fixed show logout button option,fixed hide padlock, hide smileys now hides reaction emojis too, new tagged in this option, fixed existing "liked" newsfeed filters to filter out "reacted to" too
// 14.7.0   29thMar2016 New: Custom Reactions Pack option, New Import Settings from file function, fixed background colour issue in groups
// 14.8.0   21stMay2016 Added options to hide "Live" box in right column and hide "Discover Groups" in left column, Fixed Custom Reactions (also for those with different languages) also for new style SVG reactions, New: Option to hide Live Map, Whitelisted "Mentions" App, Fixed "hide/edit comment" button wasn't showing when hide emoticons option was on, fixed text filtering for some users (style="display:block visibility:visible" on posts), fixed hide smileys, added "people also like" to hide "recommended pages" option, added hide "upcoming events" box on Pages to the "hide events section" option, fixed redirect when "show logout" button was turned on, fixed clear ad prefs, restored freeze top nav bar option
// 14.9.1   15thJun2016 Updated "Sort Feed: Most Recent" option to also show most recent on Friend's Timeline pages. Fixed Friend feed functionality, fixed invisible notification icons and page videos if bg was set to black, removed "Sort Feed: Friend Feed" option because Facebook removed the "Friend Feed" page, fixed hidden "edit" button, if "hide smileys" option was turned on, fixed duplicate smileys when font size is set, fixed hide new smiley type in chat popup and notifications, added hide "your posts" left col link option, fixed fbp news check (data-time -> data-utime), added show live user grid option to livemap page
// 15.0.1   23rdJul2016 Fixed FBP link not showing for some people, fixed hide post menu opening, fixed various top nav bar options, fixed new user welcome screen not showing, fixed attending event filter, fixed live grid function, fixed descriptions in shared links sometimes not showing if show full url option was on, added a hide fundraisers left column link option, fixed compatibility with maxthon 4.9, added hide "Todays games" right column option
// 15.1.0   10thAug2016 Fixed hiding sponsored posts, Fixed Newsfeed filtering options, Fixed app blocking (BA) button in the newsfeed, Fixed Revert Bubble Chat option, Fixed FB Purity Settings link in Facebook dropdown menu, removed some obsolete code, added Send Page HTML function (chrome only for now), fixed hide "your posts" left column link, fixed status composer box dark background issue, fixed hide find friends link in top navbar, fixed export settings to file for edge
// 16.0.0    2ndSep2016 New options for filtering images based on image content, Fixed Clear Ad Prefs functionality, Fixed friends feed link showing in left column for people with new LC design, Updated Custom Reactions options, new options: hide cookies policy bar, hide whole left column, hide whole right column, fixed posts in sale groups being hidden, fixed hide send money button option, fixed hidden posts and left side panels and cover images on timelines due to ad filtering, fixed status box hiding behind posts, hide birthday videos if hide right column birthday option is selected, fixed hide newsfeed option for people with new left column
// 16.1.0    8thOct2016 Added preview window for Custom Reaction Image Select box, fixed emoticon and text showing when font size is set, fixed position of facebook hide menu caret, fixed showing online indicator status and video volume control if background colour is set, fixed block app button on app/game permission request page, fixed some hide left column link options for new left column design, new options: hide "Shops" link in left column and hide "start a call" Button option under "Chat Options", fixed hiding page stories you might like, fixed hiding "install messenger" box in right column, fixed hiding "celebrate "x" day" posts if hide "nagging questions" option is ticked
// 17.1.2   10thDec2016 New option to hide moments link in left column, Moved hide trending topics and ticker bar options to "hide right column links section", new hide is typing a comment option, added hide add quick cam pic button chat option, added hide play game button chat option, Fix large font for short statuses, added youtube app to default app whitelist, fixed some background colour issues, fixed hiding ads in groups, added "year in review" to the hide "shared a memory" filter
// 17.2.0   19thDec2016 New options: Autoclick "Explore : See More" & Autoclick "Shortcuts :See More", Removed Freeze left column option,
                      //Fixed hide moments link in left column, fixed removing advertisers from edit advertising profile page, fixed deleted friend alert replay link not showing in left column of new left column design, fixed fbp news link not showing in left column of new left column design, added a  new image content filter: "smoking image", image classification feature now works on a multi image post, added new reaction image set (shia labeouf), removed hide "Interests section" option from "hide left column links" section (as facebook has removed that feature), added "create a frame to the hide "create section" option under "hide left column links" heading, fixed transparent issue with left column, fixed wrote on wall option, fixed hiding colour statuses
					  //Fixed hide graphical emoticons option now hides the streaming/floating reaction icons on live videos

// added hide shortcuts option under left column links section, fixed smileys displaying wrong, fixed not being able to switch to top stories.

// (C) Stephen Fernandez 2009-2016   http://www.fbpurity.com

// If you like F.B. Purity please donate, big or small donations, anything is welcome 
// http://donate.fbpurity.com

//'use strict';

(function() {
  var fbpVersion = "v17.2.0";
  var debug=0;
  var pageisreloading=0;
  if(window.location.href.match(/#debug/))
    debug=1;

  if(debug)
    console.log('starting fbp...');

  // BEGIN IMPORT OLD CHROME EXTENSION (FBP 14.5.X AND UNDER) SETTINGS
  if(typeof(chrome)!='undefined' && chrome.extension && (typeof(chrome.runtime.id)!='undefined')) {
    /*if (chrome.runtime.id.match(/^(higjj|gcclf|bdhlj)/)) {
      return;
    }*/
	if (isValidChromeRuntime()) {
		var ChromeStorage=chrome.storage.local; // sync
        chrome.runtime.sendMessage({method: "dumpLocalStorage"}, function(response) {
 		  //if(debug)
		  //  console.log("we in call back, and heres the data: " + response.data);
	      if((typeof(response)=='undefined') || (typeof(response.data)=='undefined')) {
			if(debug)
 			  console.log('Response from dumpLocalStorage was null.');
		  }
		  else {
			if(debug) {
			  console.log("heres the old localstorage data:");
		      console.dir(response.data);
			}
		    if(typeof(response.data.fbpfirstrun)!="undefined") { // check if user data is stored in old location
			  if(debug)
			    console.log("first run=" + response.data.fbpfirstrun);
			if(typeof ChromeStorage !='undefined') {
		      ChromeStorage.set(response.data, function() {
                // Notify that we saved. (first check if theres an error)
		        if(typeof(chrome.runtime.lastError)=='undefined') {
			      //if(debug)
		          //console.log('Settings saved: name:' + name + '  value:'  + value);
			      //clearLocalStorage
				  chrome.runtime.sendMessage({method: "clearLocalStorage"}, function(response) {
 		            //if(debug)
		            //  console.log("we in call back, and heres the data: " + response.data);
	                if((typeof(response)=='undefined') || (typeof(response.data)=='undefined')) {
			          if(debug)
 			            console.log('Response from clearLocalStorage on Background page was null.');
		            }
		            else {
			          //results of clearLocalStorage);
					  if(debug)
		                console.log(response.data);
					  //if(window.confirm("FBP has completed the data storage upgrade process, and now needs to reload the page."))
					    window.location.reload(true); // ensure imported data is acted upon.
		            }
				  });
		        }
	            else
			      console.log(chrome.runtime.lastError);
                response.data=null;
              });
	        }
		   }
		  }
        });
    }
  }
  // END IMPORT OLD CHROME FBP SETTINGS
  
  var FBPFanPageURL = 'fluffbustingpurity'; //bookfacepurity
  var FBPFanPageURL2= 'bookfacepurity';
  var FBPFanPageURLRegex = new RegExp("facebook.com\/(" + FBPFanPageURL + "|"  +  FBPFanPageURL2 + ")");
  var FBPFanPageID="408502197558"; //158385957596495
  var FBPDevPageID="464154953615751";
  var fbpStyleApps= ".fbpblocked {border-style: dashed !important; border-width:1px !important; border-top: 0px !important; border-color: red !important; display:block !important} .fbpblockedx {display:none !important} .fbpnormal {display:none !important} ";
  var fbpStyleExtras= ".fbpblocked {display:none !important} .fbpblockedx, .fbpblockedx.fbpnormal {border-style: dashed !important; border-width:1px !important; border-top: 0px !important; border-color: blue !important; display:block !important} .fbpnormal {display:none !important} ";
  var fbpStyleNormal= ".fbpblocked {display:none !important} .fbpblockedx,.fbpblockedx.fbpnormal {display:none !important} .fbpnormal {display:block !important} div.fbpWL div.userContentWrapper [data-tooltip-content^='Shared with']:after {color:green !important;position:absolute;left:17px;top:-4px;content:'Whitelisted'} ";
  var wrotewallicon   = 'span.accessible_elem+i.mhs.img';//i.sx_901c27,i.sx_a47b78,i.sx_2ca344,i.sx_912649,i.sx_6e018b,i.sx_f13405,i.sx_8e1650
  //var wrotewalliconCSS= "span.accessible_elem+i.mhs.img { background-image: url(https://i.imgur.com/RzR6C6A.gif); display: inline-block !important; background-position: 0px 0px !important; width:11px !important;height: 9px !important;}";
  var friendIconClass = 'https://i.imgur.com/SgZaFxf.png';

  var fbpoptsobj = {}; // object to store prefs etc
  try {
    if (window.top!=window.self) // dont run on framed pages
	  if(!window.location.href.match(/connect\/uiserver\.php\?/))  // but allow it to work on embedded permissions pages
        return;
  }
  catch (e) {
    console.dir(e); //return;
    //alert('caught error ' + e.message);
	//unsafeWindow.console.log(e);
  }

  // only run on actual facebook pages
  try {
    if(!window.location.hostname.match(/facebook\.com$/))
      return;
  }
  catch(e) {
     console.dir(e);
	//alert('caught error ' + e.message);
	//unsafeWindow.console.log(e);
  }

  var isedge=false;
  // Preliminary Edge & WebExtension Suppport
  if (typeof msBrowser !== 'undefined') {
    chrome = msBrowser;
	isedge = true;
  }
  else if (typeof browser != 'undefined') {
    chrome = browser;
  }
  
  // set browser type
  var isfirefox=window.navigator.userAgent.match(/Firefox/);
  var ischrome=(typeof(chrome)!='undefined' && chrome.extension);
  var issafari= (typeof GM_info === "undefined") && (typeof(window.navigator.vendor)!='undefined') && (window.navigator.vendor.match(/Apple Computer, Inc\./)) && (window.navigator.userAgent.match(/Version\/(5|6|7|8|9|10|11|12)\./));
  try{
    var ismaxthon=typeof(window.external.mxGetRuntime)=="function"; //window.navigator.userAgent.match(/Maxthon/);
    if(ismaxthon)
      var maxthonruntime = window.external.mxGetRuntime();
  }
  catch(e){
	console.log(e,"opera chokes on this maxthon test");
  }
  try {
    var isopera=(typeof(widget) && typeof(widget.preferences));
  }
  catch(e) {
    var isopera=0;
  }
  var isasync=(ischrome || issafari);

  if (ischrome && (!chrome.runtime)) {
    // Chrome 20-21
    chrome.runtime = chrome.extension;
  } else if(ischrome && (!chrome.runtime.onMessage)) {
    // Chrome 22-25
    chrome.runtime.onMessage = chrome.extension.onMessage;
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
    //chrome.runtime.onConnect = chrome.extension.onConnect;
    //chrome.runtime.connect = chrome.extension.connect;
  }
  
  // TESTING new chrome storage system (asynchronous) sync wont work because too much data.
  /* commenting this out should make it go back to normal? */
  if (ischrome)
    var ChromeStorage=chrome.storage.local; // chrome.storage.sync
  
  //check if another version of the script is running at the same time and if so give a warning.
  function checkforfbpcollision (){
    //console.log('checking for fbp collision');
   if(document.getElementById('fbpboxstyler')) { // if that element is already there, there must be another version of fbp running
    var collisionerrormsg='Error: You seem to be running 2 versions of FB Purity at the same time, perhaps you are running the addon and the script version, you need to uninstall or disable one of them, otherwise FBP wont function correctly.';
    if(document.getElementById('FBPNewsAlert')) {
      document.getElementById('FBPNewsAlert').innerHTML='<span style="color:white !important">' + collisionerrormsg + ' (<a href="http://faq.fbpurity.com/#collision">More Info</a>)</span>';
	  document.getElementById('FBPNewsAlert').style.display='inline !important';
	}
    else {
      if(window.confirm(collisionerrormsg + "\n\nWould you like to see the Troubleshooting Guide help for this issue?"))
	    window.open('http://faq.fbpurity.com/#collision','_blank'); // popup blocker is sometimes stopping the window from opening
	    //window.location.href='http://faq.fbpurity.com/#collision';
	}
   }
  }

  var fbpstyle=document.createElement('style'); 
  var hashead=document.getElementsByTagName('head').length;

  var fbpfreestyle=document.createElement('style'); // for setting a "global" font etc
  fbpfreestyle.setAttribute('id','fbpfreestyler');
  fbpfreestyle.setAttribute('type','text/css');

  var fbpboxstyle=document.createElement('style'); // for setting whether boxes are on or off
  fbpboxstyle.setAttribute('id','fbpboxstyler');
  fbpboxstyle.setAttribute('type','text/css');

  var fbpcssstyle=document.createElement('style'); // for adding the user's Custom CSS and general css stuff
  fbpcssstyle.setAttribute('id','fbpcssstyler');
  fbpcssstyle.setAttribute('type','text/css');

  var fbptlstyle=document.createElement('style');
  fbptlstyle.setAttribute('id','fbptlstyle');
  fbptlstyle.setAttribute('type','text/css');

  var ncstyle=document.createElement('style');
  ncstyle.setAttribute('id','newscolstyle');
  ncstyle.setAttribute('type','text/css');

var fbpescaperegex = function(str){
   // to escape brackets entered in the custom text filter, fixes some problems, but causes others... (users regexes that require brackets wont work, but not many users will be using that functionality )
    var replacements = {
        '(': '\\(',
        ')': '\\)',
        '[': '\\[',
        ']': '\\]',
        '{': '\\{',
        '}': '\\}'
    }
    var ret = this;
    try {
      for(var key in replacements) {
        str = str.replace('' + key, replacements[''+ key],'g');
      }
    }
    catch(e) {
      console.log('error in fbpescaperegex function.',e);
    }
    return str;
};

var fbpoptslist='becamefriends,becamefan,joinedgroup,attendevent,attendedevent,createdevent,commentlikeslink,commentwall,commentgroupwall,commentpagewall,commenteventwall,updatedprofile,changedprofilepic,changedrelationship,suggestionsbox,connectbox,sponsoredbox,pokebox,happeningnowbar,newstoriesbutt,typingcomment,betabox,offlinefriends,offlinemobilefriends,groupconvos,requestsbox,eventsbox,questionsbox,checkedin,uploadedphoto,sharedphoto,uploadedvideo,taggedinvideo,livevideo,postednote,taggedinnote,commentedonthis,likedthis,taggedthis,postedlink,readarticle,fontfix,fontcolourfix,linkcolourfix,fontbgcolourfix,fbpfont,fbpfontfix,fbpwebfontfix,topnavcolourfix,topnavfontcolourfix,backgroundimagefix,topnavimagefix,homelink,homelinkcounter,leftcolumncounters,newsfeed,filterappmessages,recentactivity,chatbox,smileys,reactions,expandnewscolumn,pagestory,sortmostrecent,sortfriendfeed,fixarticleredirects,upcomingevents,sharedevent,likedlink,sharedpage,commentedlink,likepagebutton,hideallphotos,taggedphoto,likedphoto,commentedphoto,sharedvideo,likedvideo,commentedvideo,youtubevideo,sharedstatus,likedstatus,commentedstatus,taggedstatus,hideallvideos,hidealllinks,wholeleftcolumn,colouredbg,lcadvertmgr,lcconnect,lcallpages,lcpagesfeed,lclikepages,lcallapps,lcappcenter,lceditprofile,lcevents,lcgamesfeed,lcpokes,lcmusic,lcplaceseditor,lcallgroups,lccreategroup,lccreatepage,lcfindfriends,lcfindnewgroups,lcdeveloper,lcfundraisers,lcfriends,lconthisday,lcbrowse,lcfbpnews,lcwelcome,lcnotes,lclinks,lcoffers,lcmanagegroups,lcsaved,lcshops,lcsuggested,lcsuggestedits,lccreateevent,lcphotos,lcsalegroups,lcpayments,lclivemap,lcdiscovergroups,lcyourposts,lcmoments,lcrecommendations,lccreate,lcshortcuts,notificationpopup,wholerightcolumn,rcrecommendedpages,rcrelatedgroups,rcpokes,rcbirthdays,rcfriendrequests,rcgamerequests,rctodaysgames,rcyourpages,rclive,trendingbox,deletedfriendalerts,bubblechat,condensedchat,fullscreenchat,newstickertextfilter,fulltimestamps,fullURL,tlgamesapps,tlinvitefriendslikepage,tllikesbox,pymk,nonags,fbpnewsnotifier,listheaderimage,listsuggestions,stretchbkgimg,transnewsfeed,hidesearchbox,hidepadlock,widescreenfeed,tagsuggestions,hidesearchpopup,hidesearchtrending,hidefriendreqtopnav,watchinglistening,topnavbarlogout,sendmoneybutt,startcallbutt,chatquickcambutt,chatplaygamebutt,sharedmemory,yourmemories,hovercards,reactionsimagepack,reactionsimagepackfix,reactionsboost,freezetopnav,cookiespolicy,catphoto,dogphoto,babyphoto,memephoto,selfiephoto,couplephoto,foodphoto,smokingphoto,customphotoblocklist,customphotoblocklistfix,imagetagsonhover,seemoreexplore,seemoreshortcuts,fixedleftcolumn';  // stopautoplayvideo, timelineonecol, lcpagesandpublicfigures, hidetopnavstatusbutt,  lcfbiphone,lcfbandroid, lcfundraiserscreate,lcfundraisersfind,animatedgifs,commentbutton,lcallinterests,

var fbpoptsarr=fbpoptslist.split(',');

var optsdiv=document.createElement('div');
optsdiv.setAttribute('id','fbpoptsdiv');
optsdiv.style.zIndex='300';
optsdiv.style.position='absolute';
optsdiv.style.top='1px';
//optsdiv.style.setProperty('background-color','white','important');
optsdiv.style.border='3px solid black';
optsdiv.style.display='none';

// BEGIN new OOP stuff for deleted friends alerts
function deletedfriendsalert (theheaderhtml, thefooterhtml) {
    
    this.headerhtml = theheaderhtml;
	this.footerhtml = thefooterhtml;
	if(typeof(this.headerhtml)=='undefined')
	  this.headerhtml = "<b>F.B. Purity has detected that the following people are no longer in your Friends List:</b>";
	if(typeof(thefooterhtml)=='undefined')
	  this.footerhtml = '<b>Possible reasons for this:</b> They may have \"un-friended\" you / blocked you / temporarily deactivated or deleted their Facebook account, they may have been banned from facebook, it could be a facebook glitch, or you may have removed them from your friends list yourself.<br/><p/><b>Please note:-</b> <ul><!--li><p><b>&bull;</b> If you have a large number of friends (over 450 or more) these alerts may report inaccurate results.--><li><p><b>&bull;</b> In the case of friends missing due to temporary account deactivation, or temporary ban, or Facebook glitch, when the account is reactivated or the fb glitch ends, your friend will be back in your friend list again.<p/></li><li><p><b>&bull;</b> Deleted Friends Alerts can be turned off via the FBP Options screen.</p></li><li><p><b>&bull;</b> You can show this alert again after the alert is closed, by pressing the "<b>F</b>" key, or by clicking the "Deleted Friends Alert" link in the left column of the newsfeed.</p></li></ul><div style="text-align:center"><a id="cleardfalink" title="Reset Deleted Friends Alert" href="javascript:;">Clear Deleted Friends Alert</a>&nbsp;&nbsp; | &nbsp;&nbsp;<a id="closeDFA1" href="javascript:;">Close Alert</a></div>';

    if(!document.getElementById('delfriendsalertdiv'))  {
      this.dfa=document.createElement('div');
      this.dfa.setAttribute('id','delfriendsalertdiv');
      this.dfa.style.zIndex='156';
      this.dfa.style.position='absolute';
      this.dfa.style.left='300px';
      this.dfa.style.top='1px';
      this.dfa.style.backgroundColor='white';
      this.dfa.style.border='3px solid black';
	  this.dfa.style.padding='5px';
	  this.dfa.style.width='300px';
      this.dfa.style.display='none';
      this.dfa.innerHTML='<div style="position:absolute;top:0px;left:300px"><a title="Close Alert" id="closeDFA2" href="javascript:;" style="color:red;font-weight:bold">X</a></div>' + "<div id='dfaheader' style='margin-bottom:10px'><table><tr><td><img src='https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash1/373017_408502197558_1955093413_q.jpg'></td><td>" + this.headerhtml + "</td></tr></table></div><div id='dfabelly'></div><div id='dfafooter' style='margin-top:20px'>" + this.footerhtml + "</div>"; //old image code, may need it again:         //graph.facebook.com/" + FBPFanPageURL + "/picture?size=small
    }
    else {
       this.dfa=document.getElementById('delfriendsalertdiv');
       document.getElementById('dfabelly').innerHTML='';
    }
}

deletedfriendsalert.prototype = {
  constructor: deletedfriendsalert,
  init:function() {
    if(!document.getElementById('delfriendsalertdiv')) {
	  if(document.getElementById('content')) // check if we are on a main fb page
	    document.getElementById('content').appendChild(this.dfa);
	  else
	    return;
      //document.getElementById('dfaheader').innerHTML=this.headerhtml;
	  //document.getElementById('dfafooter').innerHTML=this.footerhtml;
	}
	else {
      this.dfa=document.getElementById('delfriendsalertdiv');
      document.getElementById('dfabelly').innerHTML='';
	}
  },
  show:function ()  {
    window.localStorage.scrollTop = (document.documentElement.scrollTop||document.body.scrollTop);
    document.getElementById('closeDFA1').addEventListener('click',closeDFAbox,false);
	document.getElementById('closeDFA2').addEventListener('click',closeDFAbox,false);
	document.getElementById('cleardfalink').addEventListener('click',resetdfa,false);
	window.scrollTo(0,0);
    document.getElementById('delfriendsalertdiv').style.display='block';
  },
  hide:function ()  {
    document.getElementById('delfriendsalertdiv').style.display='none';
  },
  addline:function (htmltoadd)  {
    //document.getElementById('dfabelly').innerHTML+=htmltoadd;
	document.getElementById('dfabelly').insertAdjacentHTML("beforeend", htmltoadd);
  },
  reset:function () {
    document.getElementById('dfabelly').innerHTML="";
  }
}
// END new OOP stuff for deleted friends alerts

var fbptips=[
'<br/>&nbsp;<b>FBP Tip</b>: Want some help with using the Text Filter? Visit the <a target="_blank" href="http://www.fbpurity.com/extras.htm?src=fbptips#customtextfilter">Text Filter Help Section</a>',
'<br/>&nbsp;<b>FBP Tip</b>: Want to further customise Facebook? <a target="_blank" href="http://fbpurity.com/css.htm?src=fbptips">Check out FBP\'s Custom CSS</a>',
'<br/>&nbsp;<b>FBP Tip</b>: If you have any questions or problems with FBP <a target="_blank" href="http://fbpurity.com/faq.htm?src=fbptips">Check out FBP\'s FAQ (Frequently Asked Questions) / Help Page</a>',
'<br/>&nbsp;<b>FBP Tip</b>: Donations help keep the FB Purity project alive, <a href="http://donate.fbpurity.com">Please show your support and Donate</a>.',
'<br/>&nbsp;<b>FBP Tip</b>: Want to help test out new versions of FBP before they are officially released? <a href="http://www.facebook.com/puritytest">Join the FBP Beta Testing Page</a>.',
'<br/>&nbsp;<b>FBP Tip</b>: Please help me out by telling all your friends about FB Purity: <a href="http://www.facebook.com/sharer.php?u=http://facebook.com/fluffbustingpurity#fbpshr">Share FB Purity</a>.',
'<br/>&nbsp;<b>FBP Tip</b>: If you notice your newsfeed is not in chronological order, press the <b>R</b> key and FBP should (R)e-sort the feed into proper chronological order.',
'<br/>&nbsp;<b>FBP Tip</b>: If you accidentally dismiss a &quot;Deleted Friends Alert&quot; without reading it fully, or just want to see it again you can re-display it by pressing the &quot;F&quot; key. Please note the alerts are cleared around an hour after they first popup.',
'<br/>&nbsp;<b>FBP Tip</b>: You can get <a target="_blank" href="http://feedburner.google.com/fb/a/mailverify?uri=FacebookPurity">FB Purity News via Email</a>, you can also Follow <a target="_blank" href="http://twitter.com/fbpurity">FB Purity News on Twitter</a> and on <a target="_blank" href="http://gplus.to/fbpurity">Google Plus</a>',
'<br/>&nbsp;<b>FBP Tip</b>: If you hover your mouse over any of the options on the FBP options screen, extra information about that option is usually displayed.',
'<br/>&nbsp;<b>FBP Tip</b>: You can backup your FBP settings by using the "Export Settings" link at the bottom of the FBP options screen. This allows you to transfer your settings from one computer to another, and also restore your settings if they get wiped out accidentally.',
'<br/>&nbsp;<b>FBP Tip</b>: Did you know you can easily "Whitelist" Facebook Games / Apps, whose posts you want to see in your newsfeed. Do this by clicking the green "WL" link on Game/App posts that have been hidden by FBPs "App" filter.',
'<br/>&nbsp;<b>FBP Tip</b>: Did you know Facebook are blocking people from sharing direct links to the FBPURITY.COM website, because they don\'t want anyone to know how good it is and they don\'t want Facebook users having control over what they see on their own computers. You can get around this by sharing links to the FBP fan page at http://facebook.com/fluffbustingpurity instead',
'<br/>&nbsp;<b>FBP Tip</b>: If you have the Sort: Most Recent option turned on, there is a short delay when loading the newsfeed before it switches from "Top Stories" to "Most Recent", if you start reading an interesting story just before FBP switches you to the "Most Recent" feed, you can easily go back to that story by using the "Newsfeed" selector at the top left of the newsfeed to switch yourself back to "Top Stories" where you will be able to continue reading your story.',
'<br/>&nbsp;<b>FBP Tip</b>: Did you know Facebook tracks which websites you visit in your browser and uses that along with other information they gather about you from your Facebook activities to build an advertising profile about you. You can check the advertising profile they have built for you at the following page: <a href="https://www.facebook.com/ads/preferences">Facebook Ad Prefs</a>. F.B. Purity adds buttons to that page that let you easily erase the advertising data profile they have built for you.'
];

var fbpoptshtml= '<div style="float:left;"><table style="top:0px;margin-left:4px;"><tr>'+
'<td valign="top"><a title="www.fbpurity.com" href="http://www.fbpurity.com"><img width="100" height="100" border="0" alt="F.B. Purity Logo" src="https://sites.google.com/site/st333v/fbp-1/fbp-ghost-lid-icon-100x100.png"></a></td>'+
'<td width="800" valign="top">' +
'<h2 style="display:inline" class="uiHeaderTitle">F.B. Purity ' + fbpVersion + ' Options</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
'<table cellpadding="0" cellspacing="0" style="margin-top:3px;width:100%"><tr><td><a target="_blank" title="The Home of the FB Purity browser extension" href="http://www.fbpurity.com">FBP Website</a> | <a title="Get the latest news about F.B. Purity" target="_blank" href="http://news.fbpurity.com">News</a> | <a title="Learn how to use F.B. Purity" target="_blank" href="http://user-guide.fbpurity.com">User Guide</a> | <a title="Get Help with F.B. Purity via the FAQ ( Frequently Asked Questions )" target="_blank" href="http://faq.fbpurity.com">FAQ / Help Page</a> | <a title="Become a fan of FB Purity and get the latest FBP news directly in your newsfeed" target="_blank" href="http://fans.fbpurity.com">Fan Page</a> | <a title="Get in touch" target="_blank" href="http://contact.fbpurity.com">Contact</a> | <a title="Donate to FB Purity and help support the project" target="_blank" href="http://donate.fbpurity.com/">Donate</a></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>[ <a id="closeoptslink" title="Close Options Screen" href="javascript:;"><b>X</b></a> ]</td></tr></table>'+
'<table style="margin-bottom:-20px"><tr><td><a target="_blank" href="http://www.fbpurity.com/install.htm?v=' + fbpVersion.split(/v/)[1] + '">Check for latest version of FBP</a> &nbsp;&nbsp;|&nbsp;&nbsp; "Like" the <a target="_blank" title="" href="http://fans.fbpurity.com">FB Purity Fan Page</a>.</td><td><iframe src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2F' + FBPFanPageURL + '&amp;width=292&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=false&amp;height=62&amp;ref=FBP_OPTIONS_SCREEN" scrolling="no" frameborder="0" marginwidth="0" style="border:none; overflow:hidden; width:250px; height:67px;" allowTransparency="true"></iframe></td></tr></table></td>'+
'<td><!--a target="_blank" href="http://donate.fbpurity.com"><img style="margin-top:3px" border="0" src="https://www.paypal.com/en_US/GB/i/btn/btn_donateCC_LG.gif"></a--></td>'+
'</tr></table></div>'+

'<div style="clear:both"></div>'+
'<div id="localeproblem" style="color:red;font-weight:bold;margin-left:25px;margin-right:25px;margin-bottom:10px"></div>'+
'<table><tr><td valign="top">';

// add new dynamic opts
function optionsbox(mode) {
  var table, rowstyle,tinput;
  this.rownum=1;
  var openallboxes='<a title="Open/Close All" href="javascript:;" onclick="this.firstChild.getAttribute(\'class\')==\'fbpclosedlist\' ? this.firstChild.setAttribute(\'class\',\'fbpopenlist\') : this.firstChild.setAttribute(\'class\',\'fbpclosedlist\'); document.getElementById(\'fbvariousopts\').click();document.getElementById(\'fbstatusopts\').click();document.getElementById(\'fblinkopts\').click();document.getElementById(\'fbphotoopts\').click();document.getElementById(\'fbvideoopts\').click();document.getElementById(\'fbeventopts\').click();return false;"><span class="fbpclosedlist"></span></a>'; //&#9660;
  if (typeof mode !='undefined' && mode=='extras') {
    this.table='<table><tr><td>'+ openallboxes +'&nbsp;<b>Newsfeed Filters</b>&nbsp;&nbsp;<a title="Help with Extra Stories List" target="_blank" href="http://www.fbpurity.com/extras.htm"><b>?</b></a> </td><td><b>Hide</b></td></tr>';
	}
  else
    //this.table="<table width='100%'>";
	this.table="";
  
 // Use tbody to group tables instead of divs ! :)
  this.addTableHeader = function (title, hint, varname) {
	this.table+='<tbody><tr title=""><td><p style="margin-top:3px;margin-bottom:3px;font-weight:bold"><a title="' + hint + '" style="margin-top:2px" href="javascript:;" onclick="document.getElementById(\'' + varname + '\').style.display==\'none\' ? (function(){document.getElementById(\'' + varname + '\').style.display=\'table-row-group\';document.getElementById(\'' + 'fb'+ varname + '\').setAttribute(\'class\',\'fbpopenlist\');return false;})() : (function(){document.getElementById(\'' + varname + '\').style.display=\'none\';document.getElementById(\'' + 'fb' + varname + '\').setAttribute(\'class\',\'fbpclosedlist\');return false;})();"><span id="' + 'fb' + varname + '" class="fbpclosedlist">' + title + '</span></a></p></td><td></td></tr></tbody><tbody id="' + varname + '" style="display:none">';
  }
  this.addTableSubHeader = function (title, hint) {
	this.table+='<tr style="background-color:lightgrey" title="' + hint + '"><td colspan="2"><p style="margin-top:3px;margin-bottom:3px;font-weight:bold">' + title + '</p></td></tr>';
  }
  this.addTableRow = function(title,hint,varname,inputtype) {
    if(inputtype!='')
	  tinput="<input id='" + varname + "' type='" + inputtype + "'/>";
	else
	  tinput="";
	this.table+="<tr title='" + hint + "' style='" + ((this.rownum++ % 2) ? "background-color:#ECEFF5 !important" : "") + "'><td> <label style='color:black;font-weight:normal' for='" + varname + "'>" + title + "</label></td>" + "<td>" + tinput + "</td></tr>";
  }
  this.addTableFooter =function(){
	this.table+="</tbody>";
  }
  this.buildTable =function(endmode){
    if(typeof endmode=='undefined')
      return this.table;
	else
	  return this.table + '</table>';
  }
}

var newoptscolumn='';

// Various Options
var v = new optionsbox('extras');
v.addTableHeader('Various Story Types','Hide Various story types from your newsfeed', 'variousopts');
v.addTableRow('Fan Page Stories','Hide stories posted by Pages you have liked from your newsfeed','pagestory', 'checkbox');
v.addTableRow('Became Friends','Hide Became Friends stories from your newsfeed','becamefriends','checkbox');
v.addTableRow('Watching / Listening to','Hide "is watching" / "is listening to" / "playing" stories','watchinglistening','checkbox');
v.addTableRow('Changed Location','Hide Changed Location (Check-in) Stories','checkedin','checkbox');
v.addTableRow('Updated Profile Info','Hide Updated Profile Stories','updatedprofile','checkbox');
v.addTableRow('Joined a Group','Hide Joined Group Stories (and other group related stories)','joinedgroup','checkbox');
v.addTableRow('Posted a Note','Hide Posted Note Stories','postednote','checkbox');
v.addTableRow('Tagged in Note','Hide Tagged in Note Stories','taggedinnote','checkbox');
v.addTableRow('Shared a Memory','Hide "Shared a Memory" Stories','sharedmemory','checkbox');
v.addTableRow('Your Memories','Hide "Your Memories on Facebook" stories','yourmemories','checkbox');
v.addTableRow('Trending Stories','Hide Trending Stories / Articles / Trending Videos / Most Shared on / Recent Articles About stories from your newsfeed','readarticle', 'checkbox');
v.addTableRow('Facebook Questions','Hide Facebook Questions stories','questionsbox','checkbox');
v.addTableRow('Changed Relationship','Hide Changed Relationship stories from your newsfeed - (N.B This option no longer works)','changedrelationship', 'checkbox');
v.addTableRow('Commented on This','Hide &quot;Commented on This&quot; Stories','commentedonthis','checkbox');
v.addTableRow('Tagged in This','Hide &quot;Tagged in This&quot; Stories','taggedthis','checkbox');
v.addTableRow('Liked This','Hide &quot;Liked (and Reacted to) This&quot; Stories','likedthis','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable();

// Event Options
v=null
v= new optionsbox();
v.addTableHeader('Event Stories','Hide event stories from your newsfeed', 'eventopts');
v.addTableRow('Upcoming Events','Hide Upcoming Events / Upcoming Concerts','upcomingevents','checkbox');
v.addTableRow('Attending Event','Hide Attending Event / Interested in Event','attendevent','checkbox');
v.addTableRow('Attended Event','Hide Attended Event','attendedevent','checkbox');
v.addTableRow('Created Event','Hide Created Event','createdevent','checkbox');
//v.addTableRow('Liked Event','Hide Liked Events','likedevent','checkbox');
v.addTableRow('Shared Event','Hide Shared Events','sharedevent','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable();

// Link / Page Options
v=null;
v = new optionsbox();
v.addTableHeader('Link / Page Stories','Hide Link / Page stories from your Newsfeed', 'linkopts');
//v.addTableRow('Hide All External Links','All External Links from your Newsfeed','hidealllinks', 'checkbox');
v.addTableRow('Liked Page','Hide (Liked / Rated / Recommended) Page Stories','becamefan','checkbox');
v.addTableRow('Shared Page','Hide Shared Page Stories','sharedpage','checkbox');
v.addTableRow('Liked Link','Hide Liked (and Reacted to) Link Stories','likedlink','checkbox');
v.addTableRow('Shared Link','Hide Shared Link Stories from your Newsfeed','postedlink','checkbox');
v.addTableRow('Commented on Link','Hide Commented on Link Stories','commentedlink','checkbox');
v.addTableRow('&quotLike Page&quot; buttons','Hide the &quot;Like Page&quot; buttons from shared items in the newsfeed','likepagebutton','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable();

// Photo Options
v=null;
v = new optionsbox();
v.addTableHeader('Photo Stories','Hide photo stories from your newsfeed', 'photoopts');
v.addTableRow('Hide All Photos','Hide All Photo stories from your newsfeed','hideallphotos', 'checkbox');
v.addTableRow('Shared Photo','Hide Shared Photo / Album stories from your newsfeed','sharedphoto','checkbox');
v.addTableRow('Updated Profile Picture','Hide Updated Profile Picture / Cover Photo stories from your newsfeed','changedprofilepic', 'checkbox');
v.addTableRow('Uploaded Photo','Hide Added Photo Stories','uploadedphoto','checkbox');
v.addTableRow('Tagged in Photo','Hide Tagged in Photo / Album stories','taggedphoto','checkbox');
v.addTableRow('Liked Photo','Hide Liked (and Reacted to) Photo / Album stories','likedphoto','checkbox');
v.addTableRow('Commented on Photo','Hide Commented on Photo / Album stories','commentedphoto','checkbox');

v.addTableSubHeader('Image Modifiers','Modify the image in some way');
v.addTableRow('Show Image Classifications on Hover','Show Facebooks AI image classification data (if available) when you hover over image posts in the newsfeed','imagetagsonhover','checkbox');

v.addTableSubHeader('Hide Images Based on Their Contents','Hide images depending on what Facebook&apos;s image recognition AI has identified in the picture');
v.addTableRow('Cat Photo','Hide photos containing cats','catphoto','checkbox');
v.addTableRow('Dog Photo','Hide photos containing dogs','dogphoto','checkbox');
v.addTableRow('Baby Photo','Hide Photos containing babies','babyphoto','checkbox');
v.addTableRow('Meme Image','Hide Memes / Quotation Images / Images featuring text','memephoto','checkbox');
v.addTableRow('Smoking Photo','Hide photos containing people smoking','smokingphoto','checkbox');
v.addTableRow('Selfie Photo','Hide &quot;Selfie&quot; photos','selfiephoto','checkbox');
v.addTableRow('Happy Couple Photo','Hide photos containing happy couples (2 people smiling)','couplephoto','checkbox');
v.addTableRow('Food Photo','Hide photos containing food','foodphoto','checkbox');
v.addTableSubHeader('Comma separated list of photo subjects<br/>you wish to hide','Put a comma separated list of photo subjects you wish to hide. E.G. horse,cow,toilet');
v.addTableRow('<input type="text" id="customphotoblocklist">','Hide photos containing any of the subjects in this comma separated list e.g snake,smoking,toilet','customphotoblocklistfix','checkbox');

v.addTableFooter();
newoptscolumn+=v.buildTable();

// Video Options
v=null;
v = new optionsbox();
v.addTableHeader('Video Stories','Hide Video stories from your Newsfeed', 'videoopts');
v.addTableRow('<a onclick="window.localStorage.turnOffAutoplay=1" title="Facebook now has a built in option for disabling autoplay, click here to go to Facebook\'s video settings screen" target="_blank" href="https://www.facebook.com/settings?tab=videos"><b>Click to Disable Autoplay</b></a>','Stop videos from playing automatically','stopautoplayvideo', '');
//v.addTableRow('Disable Autoplay','Stop videos from playing automatically','stopautoplayvideo', 'checkbox');
v.addTableRow('Hide All Videos','Hide All Video Stories from your newsfeed','hideallvideos', 'checkbox');
v.addTableRow('Live Video','Hide "Is Live Now" / "Was Live" Videos','livevideo', 'checkbox');
v.addTableRow('Shared Video','Hide Shared FB Video Stories from your newsfeed','sharedvideo','checkbox');
v.addTableRow('Uploaded Video','Hide Added Video Stories','uploadedvideo','checkbox');
v.addTableRow('Tagged in Video','Hide Tagged in Video Stories','taggedinvideo','checkbox');
v.addTableRow('Liked Video','Hide Liked (and Reacted to) Video Stories','likedvideo','checkbox');
v.addTableRow('Commented on Video','Hide Commented on Video Stories','commentedvideo','checkbox');
v.addTableRow('Youtube / Vimeo Videos','Hide Youtube and Vimeo Video Stories','youtubevideo','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable();

// Status / Wall Options
v=null;
v = new optionsbox();
v.addTableHeader('Status / Wall Stories','Hide Status / Wall stories from your newsfeed', 'statusopts');
v.addTableRow('Shared Status','Hide Shared Status & Shared Post Stories','sharedstatus','checkbox');
v.addTableRow('Liked Status','Hide &quot;Liked (and Reacted to) Status&quot; Stories','likedstatus','checkbox');
v.addTableRow('Commented on Status','Hide Commented on Status/Note/Activity/Post stories','commentedstatus','checkbox');
v.addTableRow('Tagged in Status','Hide Tagged / Mentioned in (Status/ Life Event/ Note/ Post) Stories','taggedstatus','checkbox');
v.addTableRow('Wrote on Timeline','Hide &quot;Wrote on Timeline&quot; Stories (This should work for comments posted to event, page, user and group timelines)','commentwall','checkbox');
v.addTableRow('Coloured Statuses','Return Coloured Status Updates to normal (no background colour, normal font, normal alignment, normal height','colouredbg','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable('complete');

newoptscolumn+="<table style='padding-top:1px'><tr><td style='font-weight:bold;padding-left:15px' colspan='2'>Other Options</td></tr>" +
// right column links options
'<tr title=""><td colspan="2"><p style="margin-top:3px;margin-bottom:3px;font-weight:bold"><a title="Click to open/close the Hide Links in Right Hand Column Options" style="margin-top:2px" href="#" onclick="document.getElementById(\'rightcolopts\').style.display==\'block\' ? (function(){document.getElementById(\'rightcolopts\').style.display=\'none\';document.getElementById(\'fbprightcolopts\').setAttribute(\'class\',\'fbpclosedlist\')})() : (function(){document.getElementById(\'rightcolopts\').style.display=\'block\';document.getElementById(\'fbprightcolopts\').setAttribute(\'class\',\'fbpopenlist\')})();"><span id="fbprightcolopts" class="fbpclosedlist">Hide Right Column Links</span></a></p><div id="rightcolopts" style="display:none"><table width="100%"><tr title="Hide the whole right column of the newsfeed page completely" style="background-color:lightgrey !important"><td>Whole Right Column</td><td><input type="checkbox" id="wholerightcolumn"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Hide the Trending Topics box in the right hand column"><td><label style="color:black;font-weight:normal" for="trendingbox">Trending Topics</label></td><td><input id="trendingbox" type="checkbox"></td></tr>'+
'<tr title="The ticker bar is the scrolling news feed in the right hand column"><td><label style="color:black;font-weight:normal" for="happeningnowbar">News Ticker Bar</label></td><td><input id="happeningnowbar" type="checkbox"></td></tr>'+
'<tr title="Hide Game Requests / Recommended Games etc" style="background-color:#ECEFF5 !important"><td>Game / App Requests</td><td><input type="checkbox" id="rcgamerequests"></td></tr><tr title="Hide &quot;Recommended Pages&quot; & &quot;People Also Like&quot;"><td>Recommended Pages</td><td><input type="checkbox" id="rcrecommendedpages"></td></tr><tr title="Hide Today&apos;s Games" style="background-color:#ECEFF5 !important"><td>Today&apos;s Games</td><td><input type="checkbox" id="rctodaysgames"></td></tr><tr><td>Suggested Groups</td><td><input type="checkbox" id="rcrelatedgroups"></td></tr><tr style="background-color:#ECEFF5 !important"><td>Pokes</td><td><input type="checkbox" id="rcpokes"></td></tr><tr title="Hide the list of popular Live videos in the right hand column"><td>Live</td><td><input type="checkbox" id="rclive"></td></tr><tr style="background-color:#ECEFF5 !important"><td>Events</td><td><input type="checkbox" id="eventsbox"></td></tr><tr><td>Friend Requests</td><td><input type="checkbox" id="rcfriendrequests"></td></tr><tr style="background-color:#ECEFF5 !important"><td>Your Pages</td><td><input type="checkbox" id="rcyourpages"></td></tr><tr><td>Birthdays</td><td><input type="checkbox" id="rcbirthdays"></td></tr></table></div></td></tr>'+
// left column links options
'<tr title=""><td colspan="2"><p style="margin-top:3px;margin-bottom:3px;font-weight:bold"><a title="Click to open/close the Hide Links in Left Column Options" style="margin-top:2px" href="#" onclick="document.getElementById(\'leftcolopts\').style.display==\'block\' ? (function(){document.getElementById(\'leftcolopts\').style.display=\'none\';document.getElementById(\'fbpleftcolopts\').setAttribute(\'class\',\'fbpclosedlist\')})() : (function(){document.getElementById(\'leftcolopts\').style.display=\'block\';document.getElementById(\'fbpleftcolopts\').setAttribute(\'class\',\'fbpopenlist\')})();"><span id="fbpleftcolopts" class="fbpclosedlist">Left Column Links</span></a></p><div id="leftcolopts" style="display:none"><table width="100%">'+
'<tr title="Freezes the left column of the newsfeed page in place even when you scroll the page down"><td><label style="color:black;font-weight:normal" for="fixedleftcolumn">Freeze Left Column</label></td><td><input id="fixedleftcolumn" type="checkbox"></td></tr>'+ 
'<tr title="Autoclicks the &quot;Shortcuts: See More&quot; link in the Left Column"><td><label style="color:black;font-weight:normal" for="seemoreshortcuts">Autoclick &quot;Shortcuts : See More&quot;</label></td><td><input id="seemoreshortcuts" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Autoclicks the &quot;Explore: See More&quot; link in the Left Column"><td><label style="color:black;font-weight:normal" for="seemoreexplore">Autoclick &quot;Explore : See More&quot;</label></td><td><input id="seemoreexplore" type="checkbox"></td></tr>'+
'<tr><td style="text-align:right;font-weight:bold" colspan="2">Hide</td></tr>'+
'<tr style="background-color:darkgray !important" title="Completely Hides the left column of the Newsfeed"><td>Whole Left Column</td><td><input id="wholeleftcolumn" type="checkbox"></td></tr><tr style="background-color:darkgrey !important" title="Hides the activity count numbers to the right of the links in the left column"><td>Story Numbers</td><td><input id="leftcolumncounters" type="checkbox"></td></tr><tr><td>Browse</td><td><input type="checkbox" id="lcbrowse"></td></tr><tr title="This option will hide all links under the CONNECT heading" ><td>Connect Section</td><td><input type="checkbox" id="lcconnect"></td></tr><tr title="Hide the Create Section (and all Create links in left column)"><td>Create Section</td><td><input type="checkbox" id="lccreate"></td></tr><tr><td>Create Page</td><td><input type="checkbox" id="lccreatepage"></td></tr><tr title="Hide Create Advert / Adverts Manager"><td>Create Advert</td><td><input type="checkbox" id="lcadvertmgr"></td></tr><tr><td>Create Event</td><td><input type="checkbox" id="lccreateevent"></td></tr><tr><td>Create Group</td><td><input type="checkbox" id="lccreategroup"></td></tr><tr title="This option hides all links under the DEVELOPER section including Manage Apps"><td>Developer Section</td><td><input type="checkbox" id="lcdeveloper"></td></tr><tr><td>Discover Groups</td><td><input type="checkbox" id="lcdiscovergroups"></td></tr><tr><td>Edit Profile</td><td><input type="checkbox" id="lceditprofile"></td></tr><tr><td>Events Section</td><td><input type="checkbox" id="lcevents"></td></tr><tr title="This option will hide all links under the Explore heading of the left column"><td>Explore Section</td><td><input type="checkbox" id="lcallapps"></td></tr><tr><td>F.B. Purity News</td><td><input type="checkbox" id="lcfbpnews"></td></tr><tr><td>Find Friends</td><td><input type="checkbox" id="lcfindfriends"></td></tr><tr title="This option will hide all links under the FRIENDS section"><td>Friends Section</td><td><input type="checkbox" id="lcfriends"></td></tr><tr title="This option will hide the Fundraisers section"><td>Fundraisers Section</td><td><input type="checkbox" id="lcfundraisers"></td></tr><tr><td>Games<!-- App Center--></td><td><input type="checkbox" id="lcappcenter"></td></tr><tr><td>Games Feed</td><td><input type="checkbox" id="lcgamesfeed"></td></tr><tr title="This option will hide all links under the GROUPS heading"><td>Groups Section</td><td><input type="checkbox" id="lcallgroups"></td></tr><tr><td>Like Pages</td><td><input type="checkbox" id="lclikepages"></td></tr><tr><td>Links</td><td><input type="checkbox" id="lclinks"></td></tr><tr title="Hide Live Video aka Live Map link"><td>Live Video</td><td><input type="checkbox" id="lclivemap"></td></tr><tr><td>Manage Your Groups</td><td><input type="checkbox" id="lcmanagegroups"></td></tr><tr><td>Moments</td><td><input type="checkbox" id="lcmoments"></td></tr><tr><td>Music</td><td><input type="checkbox" id="lcmusic"></td></tr><tr><td>New Groups</td><td><input type="checkbox" id="lcfindnewgroups"></td></tr><tr><td>Notes</td><td><input type="checkbox" id="lcnotes"></td></tr><tr><td>Offers</td><td><input type="checkbox" id="lcoffers"></td></tr><tr title="Hide This day in History"><td>On This Day</td><td><input type="checkbox" id="lconthisday"></td></tr><tr><td>Pages Feed</td><td><input type="checkbox" id="lcpagesfeed"></td></tr><tr title="This option will hide all links under the PAGES heading"><td>Pages Section</td><td><input type="checkbox" id="lcallpages"></td></tr><tr title="This option hides all links under the Payments Heading"><td>Payments Section</td><td><input type="checkbox" id="lcpayments"></td></tr><tr><td>Photos</td><td><input type="checkbox" id="lcphotos"></td></tr><tr><td>Places Editor</td><td><input type="checkbox" id="lcplaceseditor"></td></tr><tr><td>Pokes</td><td><input type="checkbox" id="lcpokes"></td></tr><tr><td>Recommendations</td><td><input type="checkbox" id="lcrecommendations"></td></tr><tr title="aka Buy and Sell Groups"><td>Sale Groups</td><td><input type="checkbox" id="lcsalegroups"></td></tr><tr><td>Saved</td><td><input type="checkbox" id="lcsaved"></td></tr><tr><td>Shops</td><td><input type="checkbox" id="lcshops"></td></tr><tr title="This option will hide the Shortcuts section in the left column"><td>Shortcuts Section</td><td><input type="checkbox" id="lcshortcuts"></td></tr><tr title="This option will hide the the Suggest Edits link in the left column"><td>Suggest Edits</td><td><input type="checkbox" id="lcsuggestedits"></td></tr><tr title="This option will hide all the links under the Suggested heading in the left column"><td>Suggested Section</td><td><input type="checkbox" id="lcsuggested"></td></tr><tr><td>Your Posts</td><td><input type="checkbox" id="lcyourposts"></td></tr><tr><td>Welcome</td><td><input type="checkbox" id="lcwelcome"></td></tr></table></div></td></tr>';
//<tr title="This option will hide all links under the INTERESTS heading"><td>Interests Section</td><td><input type="checkbox" id="lcallinterests"></td></tr>

//Timeline Options
v=null;
v = new optionsbox();
v.addTableHeader('Timeline Options','Alter the options for Timeline pages', 'timelineopts');
//v.addTableRow('Timeline : Single Column','Lets you view Fan Page Timeline pages in a single column layout.','timelineonecol','checkbox');
v.addTableRow('Hide Nagging Questions','Hide the nagging questions pestering you to fill in your timeline profile, and prompts nagging you to update your Facebook status','nonags','checkbox');
v.addTableRow('Hide Game + App Posts','Hide Games and App Stories on Timeline pages','tlgamesapps','checkbox');
v.addTableRow('Hide Likes Boxes','Hide the Likes Boxes (including Music, TV Shows, Movies, Books, Sports) on Timeline pages','tllikesbox','checkbox');
v.addTableRow('Hide Invite Friends','Hide the "Invite Friends to Like this Page" box','tlinvitefriendslikepage','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable();

//List Options
v=null;
v = new optionsbox();
v.addTableHeader('List Options','Alter the options for Friend and Interest List Feeds', 'friendlistopts');
v.addTableRow('Hide Random Header Image','Hides the random image displayed at the top of Interest and Friend List feeds','listheaderimage','checkbox');
v.addTableRow('Hide List Suggestions','Hides the List Suggestions box in the right column','listsuggestions','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable();

//Chat Options
v=null;
v = new optionsbox();
v.addTableHeader('Chat Options','Choose Your Chat Options', 'chatopts');
v.addTableRow('Full Screen Chat','Open Chat/Message Conversations in the Inbox (Full Screen Chat Mode)','fullscreenchat','checkbox');
v.addTableRow('Revert Bubble Chat','Change Bubble Chat Back to the Old Style Chat','bubblechat','checkbox');
v.addTableRow('Show More Friends','Fit more friends into the Chat List, so you dont have to scroll it so much','condensedchat','checkbox');
v.addTableRow('Hide Offline Friends','Hide Offline Friends in Chat','offlinefriends','checkbox');
v.addTableRow('Hide Offline &amp; Mobile Friends','Hide Offline and Mobile Friends in Chat','offlinemobilefriends','checkbox');
v.addTableRow('Hide Group Conversations','Hide Group Conversations in Chat Sidebar','groupconvos','checkbox');
v.addTableRow('Hide Send Money Button','Hide the Send Money Button in Chat','sendmoneybutt','checkbox');
v.addTableRow('Hide Start a Call Button','Hide the Start a Video / Voice Call Buttons in Chat','startcallbutt','checkbox');
v.addTableRow('Hide Play a Game Button','Hide the Play a Game Button in Chat','chatplaygamebutt','checkbox');
v.addTableRow('Hide Quick Cam Button','Hide the Take a Picture using Quick Cam Button in Chat','chatquickcambutt','checkbox');
v.addTableRow('Hide Chat Box','Hide the Chat Box','chatbox','checkbox');
v.addTableFooter();
newoptscolumn+=v.buildTable();


var fonts=['ABeeZee','Abel','Abril Fatface','Aclonica','Acme','Actor','Adamina','Advent Pro','Aguafina Script','Akronim','Aladin','Aldrich','Alef','Alegreya','Alegreya SC','Alex Brush','Alfa Slab One','Alice','Alike','Alike Angular','Allan','Allerta','Allerta Stencil','Allura','Almendra','Almendra Display','Almendra SC','Amarante','Amaranth','Amatic SC','Amethysta','Anaheim','Andada','Andika','Angkor','Annie Use Your Telescope','Anonymous Pro','Antic','Antic Didone','Antic Slab','Anton','Arapey','Arbutus','Arbutus Slab','Architects Daughter','Archivo Black','Archivo Narrow','Arial Black','Arial Narrow','Arimo','Arizonia','Armata','Artifika','Arvo','Asap','Asset','Astloch','Asul','Atomic Age','Aubrey','Audiowide','Autour One','Average','Average Sans','Averia Gruesa Libre','Averia Libre','Averia Sans Libre','Averia Serif Libre','Bad Script','Balthazar','Bangers','Basic','Battambang','Baumans','Bayon','Belgrano','Bell MT','Bell MT Alt','Belleza','BenchNine','Bentham','Berkshire Swash','Bevan','Bigelow Rules','Bigshot One','Bilbo','Bilbo Swash Caps','Bitter','Black Ops One','Bodoni','Bokor','Bonbon','Boogaloo','Bowlby One','Bowlby One SC','Brawler','Bree Serif','Bubblegum Sans','Bubbler One','Buenard','Butcherman','Butcherman Caps','Butterfly Kids','Cabin','Cabin Condensed','Cabin Sketch','Caesar Dressing','Cagliostro','Calibri','Calligraffitti','Cambo','Cambria','Candal','Cantarell','Cantata One','Cantora One','Capriola','Cardo','Carme','Carrois Gothic','Carrois Gothic SC','Carter One','Caudex','Cedarville Cursive','Ceviche One','Changa One','Chango','Chau Philomene One','Chela One','Chelsea Market','Chenla','Cherry Cream Soda','Cherry Swash','Chewy','Chicle','Chivo','Cinzel','Cinzel Decorative','Clara','Clicker Script','Coda','Codystar','Combo','Comfortaa','Coming Soon','Concert One','Condiment','Consolas','Content','Contrail One','Convergence','Cookie','Copse','Corben','Corsiva','Courgette','Courier New','Cousine','Coustard','Covered By Your Grace','Crafty Girls','Creepster','Creepster Caps','Crete Round','Crimson Text','Croissant One','Crushed','Cuprum','Cutive','Cutive Mono','Damion','Dancing Script','Dangrek','Dawning of a New Day','Days One','Delius','Delius Swash Caps','Delius Unicase','Della Respira','Denk One','Devonshire','Dhyana','Didact Gothic','Diplomata','Diplomata SC','Domine','Donegal One','Doppio One','Dorsa','Dosis','Dr Sugiyama','Droid Arabic Kufi','Droid Arabic Naskh','Droid Sans','Droid Sans Mono','Droid Sans TV','Droid Serif','Duru Sans','Dynalight','EB Garamond','Eagle Lake','Eater','Eater Caps','Economica','Electrolize','Elsie','Elsie Swash Caps','Emblema One','Emilys Candy','Engagement','Englebert','Enriqueta','Erica One','Esteban','Euphoria Script','Ewert','Exo','Expletus Sans','Fanwood Text','Fascinate','Fascinate Inline','Faster One','Fasthand','Fauna One','Federant','Federo','Felipa','Fenix','Finger Paint','Fjalla One','Fjord One','Flamenco','Flavors','Fondamento','Fontdiner Swanky','Forum','Francois One','Freckle Face','Fredericka the Great','Fredoka One','Freehand','Fresca','Frijole','Fruktur','Fugaz One','GFS Didot','GFS Neohellenic','Gabriela','Gafata','Galdeano','Galindo','Garamond','Gentium Basic','Gentium Book Basic','Geo','Geostar','Geostar Fill','Germania One','Gilda Display','Give You Glory','Glass Antiqua','Glegoo','Gloria Hallelujah','Goblin One','Gochi Hand','Gorditas','Goudy Bookletter 1911','Graduate','Grand Hotel','Gravitas One','Great Vibes','Griffy','Gruppo','Gudea','Habibi','Hammersmith One','Hanalei','Hanalei Fill','Handlee','Hanuman','Happy Monkey','Headland One','Helvetica Neue','Henny Penny','Herr Von Muellerhoff','Holtwood One SC','Homemade Apple','Homenaje','IM Fell DW Pica','IM Fell DW Pica SC','IM Fell Double Pica','IM Fell Double Pica SC','IM Fell English','IM Fell English SC','IM Fell French Canon','IM Fell French Canon SC','IM Fell Great Primer','IM Fell Great Primer SC','Iceberg','Iceland','Imprima','Inconsolata','Inder','Indie Flower','Inika','Irish Grover','Irish Growler','Istok Web','Italiana','Italianno','Jacques Francois','Jacques Francois Shadow','Jim Nightshade','Jockey One','Jolly Lodger','Josefin Sans','Josefin Sans Std Light','Josefin Slab','Joti One','Judson','Julee','Julius Sans One','Junge','Jura','Just Another Hand','Just Me Again Down Here','Kameron','Karla','Kaushan Script','Kavoon','Keania One','Kelly Slab','Kenia','Khmer','Kite One','Knewave','Kotta One','Koulen','Kranky','Kreon','Kristi','Krona One','La Belle Aurore','Lancelot','Lateef','Lato','League Script','Leckerli One','Ledger','Lekton','Lemon','Libre Baskerville','Life Savers','Lilita One','Lily Script One','Limelight','Linden Hill','Lobster','Lobster Two','Londrina Outline','Londrina Shadow','Londrina Sketch','Londrina Solid','Lora','Love Ya Like A Sister','Loved by the King','Lovers Quarrel','Luckiest Guy','Lusitana','Lustria','Macondo','Macondo Swash Caps','Magra','Maiden Orange','Mako','Marcellus','Marcellus SC','Marck Script','Margarine','Marko One','Marmelad','Marvel','Mate','Mate SC','Maven Pro','McLaren','Meddon','MedievalSharp','Medula One','Megrim','Meie Script','Merienda','Merienda One','Merriweather','Merriweather Sans','Metal','Metal Mania','Metamorphous','Metrophobic','Michroma','Milonga','Miltonian','Miltonian Tattoo','Miniver','Miss Fajardose','Miss Saint Delafield','Modern Antiqua','Molengo','Monda','Monofett','Monoton','Monsieur La Doulaise','Montaga','Montez','Montserrat','Montserrat Alternates','Montserrat Subrayada','Moul','Moulpali','Mountains of Christmas','Mouse Memoirs','Mr Bedford','Mr Bedfort','Mr Dafoe','Mr De Haviland','Mrs Saint Delafield','Mrs Sheppards','Muli','Mystery Quest','Neucha','Neuton','New Rocker','News Cycle','Niconne','Nixie One','Nobile','Nokora','Norican','Nosifer','Nosifer Caps','Nothing You Could Do','Noticia Text','Noto Sans','Noto Sans UI','Noto Serif','Nova Cut','Nova Flat','Nova Mono','Nova Oval','Nova Round','Nova Script','Nova Slim','Nova Square','Numans','Nunito','OFL Sorts Mill Goudy TT','Odor Mean Chey','Offside','Old Standard TT','Oldenburg','Oleo Script','Oleo Script Swash Caps','Open Sans','Oranienbaum','Orbitron','Oregano','Orienta','Original Surfer','Oswald','Over the Rainbow','Overlock','Overlock SC','Ovo','Oxygen','Oxygen Mono','PT Mono','PT Sans','PT Sans Caption','PT Sans Narrow','PT Serif','PT Serif Caption','Pacifico','Paprika','Parisienne','Passero One','Passion One','Pathway Gothic One','Patrick Hand','Patrick Hand SC','Patua One','Paytone One','Peralta','Permanent Marker','Petit Formal Script','Petrona','Philosopher','Piedra','Pinyon Script','Pirata One','Plaster','Play','Playball','Playfair Display','Playfair Display SC','Podkova','Poiret One','Poller One','Poly','Pompiere','Pontano Sans','Port Lligat Sans','Port Lligat Slab','Prata','Preahvihear','Press Start 2P','Princess Sofia','Prociono','Prosto One','Proxima Nova','Proxima Nova Tabular Figures','Puritan','Purple Purse','Quando','Quantico','Quattrocento','Quattrocento Sans','Questrial','Quicksand','Quintessential','Qwigley','Racing Sans One','Radley','Raleway','Raleway Dots','Rambla','Rammetto One','Ranchers','Rancho','Rationale','Redressed','Reenie Beanie','Revalia','Ribeye','Ribeye Marrow','Righteous','Risque','Roboto','Roboto Condensed','Roboto Slab','Rochester','Rock Salt','Rokkitt','Romanesco','Ropa Sans','Rosario','Rosarivo','Rouge Script','Ruda','Rufina','Ruge Boogie','Ruluko','Rum Raisin','Ruslan Display','Russo One','Ruthie','Rye','Sacramento','Sail','Salsa','Sanchez','Sancreek','Sansita One','Sarina','Satisfy','Scada','Scheherazade','Schoolbell','Seaweed Script','Sevillana','Seymour One','Shadows Into Light','Shadows Into Light Two','Shanti','Share','Share Tech','Share Tech Mono','Shojumaru','Short Stack','Siamreap','Siemreap','Sigmar One','Signika','Signika Negative','Simonetta','Sintony','Sirin Stencil','Six Caps','Skranji','Slackey','Smokum','Smythe','Snippet','Snowburst One','Sofadi One','Sofia','Sonsie One','Sorts Mill Goudy','Source Code Pro','Source Sans Pro','Special Elite','Spicy Rice','Spinnaker','Spirax','Squada One','Stalemate','Stalin One','Stalinist One','Stardos Stencil','Stint Ultra Condensed','Stint Ultra Expanded','Stoke','Strait','Sue Ellen Francisco','Sunshiney','Supermercado One','Suwannaphum','Swanky and Moo Moo','Syncopate','Tahoma','Tangerine','Taprom','Tauri','Telex','Tenor Sans','Terminal Dosis','Terminal Dosis Light','Text Me One','Thabit','The Girl Next Door','Tienne','Tinos','Titan One','Titillium Web','Trade Winds','Trocchi','Trochut','Trykker','Tulpen One','Ubuntu','Ubuntu Condensed','Ubuntu Mono','Ultra','Uncial Antiqua','Underdog','Unica One','UnifrakturMaguntia','Unkempt','Unlock','Unna','VT323','Vampiro One','Varela','Varela Round','Vast Shadow','Vibur','Vidaloka','Viga','Voces','Volkhov','Vollkorn','Voltaire','Waiting for the Sunrise','Wallpoet','Walter Turncoat','Warnes','Wellfleet','Wendy One','Wire One','Yanone Kaffeesatz','Yellowtail','Yeseva One','Yesteryear','Zeyada'];
var webfontselecthtml='<select id="fbpwebfont">';
for(var i=0;i<fonts.length;i++) 
  webfontselecthtml+='<option value="' +  fonts[i] + '">' + fonts[i] + '</option>';
webfontselecthtml+="</select>";
//select.options[select.options.length] = new Option(fonts[i],fonts[i]);

var customreactions = {
"Adventure Time":"https://i.imgur.com/Gdvm4bc.png",
"AnpanMan":"https://i.imgur.com/jQzyny0.png",
"Animated - Facebook":"https://i.imgur.com/34siCew.gif,https://i.imgur.com/OR6zHrB.gif,https://i.imgur.com/tmE6axL.gif,https://i.imgur.com/CeBrx43.gif,https://i.imgur.com/4I6Kr7w.gif,https://i.imgur.com/BAwvnaq.gif",
"Animated - Videogames":"https://i.imgur.com/9OZgHbx.gif,https://i.imgur.com/onwugKW.gif,https://i.imgur.com/W2YhMCV.gif,https://i.imgur.com/zU4eawb.gif,https://i.imgur.com/ufgwvuJ.gif,https://i.imgur.com/egBHOda.gif",
"Barack Obama":"https://i.imgur.com/1rpZjXj.png",
"Benedict Cumberbatch":"https://i.imgur.com/SgSq05B.png",
"Bernie Sanders":"https://i.imgur.com/V9FH2bo.png",
"Beyonce":"https://i.imgur.com/lQElvPg.png",
"Bob Lam":"https://i.imgur.com/E42D6OJ.png",
"Britney Spears 1":"https://i.imgur.com/8vZf0I1.png",
"Britney Spears 2":"https://i.imgur.com/6odiGTY.png",
"Bruce Lee":"https://i.imgur.com/xnhUTG8.png",
"Bulldog":"https://i.imgur.com/WB7GTCW.png",
"Chip N Dale":"https://i.imgur.com/CRiXYer.png",
"Cute Bear":"https://i.imgur.com/Xxh3tjm.png",
"Cute Cat":"https://i.imgur.com/OH1lbq4.png",
"Cute Cat2":"https://i.imgur.com/FgQyDg7.png",
"Cute Fox":"https://i.imgur.com/V4DvAlV.png",
"Cute Pug":"https://i.imgur.com/hcG5bSb.png",
"Dave Grohl":"https://i.imgur.com/lL7uRWY.png",
"Doraemon":"https://i.imgur.com/ixfW79Y.png",
"Donald Trump":"https://i.imgur.com/AAsk9g0.png",
"Dr Who":"https://i.imgur.com/G9zAP2l.png",
"Fifi":"https://i.imgur.com/T3eHHAB.png",
"Friends":"https://i.imgur.com/f9GEXXI.png",
"Game Of Thrones":"https://i.imgur.com/fSbIxkU.png",
"Greys Anatomy":"https://i.imgur.com/zFhXpXX.png",
"Harry Potter":"https://i.imgur.com/ckRvNf3.png",
"Hatsune":"https://i.imgur.com/wBHa9yZ.png",
"Homer Simpson":"https://i.imgur.com/yKE0ttE.png",
"Halloween - Facebook":"https://i.imgur.com/SmRJ301.png",
"Hillary Clinton":"https://i.imgur.com/Fex9Kjd.png",
"Inside Out":"https://i.imgur.com/xDc1Uus.png",
"Justin Trudeau":"https://i.imgur.com/N1FOQRV.png",
"Kanye West":"https://i.imgur.com/bk1Dsat.png",
"Leonardo Dicaprio":"https://i.imgur.com/Se9ByJ3.png",
"Mark Zuckerberg":"https://i.imgur.com/r1IHiQk.png",
"Mark Zuckerberg 2":"https://i.imgur.com/p7MHpz7.png",
"My Little Pony":"https://i.imgur.com/VFZgHsc.png",
"Mabel Pines":"https://i.imgur.com/wcJt9zu.png",
"Marshmallow":"https://i.imgur.com/9il7XN1.png",
"Marvel":"https://i.imgur.com/4Xe7TiN.png",
"Memes":"https://i.imgur.com/QPWKaia.png",
"Michael Scott":"https://i.imgur.com/quD04by.png",
"Minions 1":"https://i.imgur.com/tlxreEb.png",
"Minions 2":"https://i.imgur.com/O46l4eM.png",
"Minions 3":"https://i.imgur.com/jcj4kHy.jpg",
"Morty (Rick&)":"https://i.imgur.com/4oCbmrB.png",
"Mr T":"https://i.imgur.com/9G6zNBR.png",
"Oddballs":"https://i.imgur.com/EoiYOzi.png",
"Pearl":"https://i.imgur.com/TaM5ImT.png",
"Pepe Frog":"https://i.imgur.com/L2FffNF.png",
"Pokemon":"https://i.imgur.com/YJC3YPN.png",
"Rage Faces":"https://i.imgur.com/jO5O7S3.png",
"Reimu Hakurei":"https://i.imgur.com/DgPcN4p.png",
"Rhianna":"https://i.imgur.com/DAr56oW.png",
"Rick (&Morty)":"https://i.imgur.com/QJJqZm0.png",
"ScruffBoy":"https://i.imgur.com/IMD9o4z.png",
"Shia LaBeouf":"https://i.imgur.com/kWnjJtA.png",
"Sims 4":"https://i.imgur.com/JbB2LXR.png",
"Smurfs":"https://i.imgur.com/hXcstVD.png",
"StarWars1":"https://i.imgur.com/bIuPXNw.png",
"StarWars2":"https://i.imgur.com/hJpFhAi.png",
"Steven Seagal":"https://i.imgur.com/8tasD6Q.png",
"The Oatmeal":"https://i.imgur.com/8dBNzEU.png",
"Vladimir Putin":"https://i.imgur.com/GYjqzDl.png",
"World of Tanks":"https://i.imgur.com/5TbU7ZO.png",
"Zelda Link":"https://i.imgur.com/KXDjhZz.png"
};
//"ChiBird":"https://i.imgur.com/96OJaoG.png",

var reactionselectbox="<select id=\"reactionselect\" title=\"Click to select a Custom Set of Reaction Images\"><option value=\"\">Select a Reaction Pack</option>";
for(i in customreactions) {
  reactionselectbox+='<option value=\"' + customreactions[i] + "\">" + i +"</option>";
}
reactionselectbox+="</select>";

newoptscolumn+=
// fonts and colours section
'<tr><td colspan="2" align="center"><p style="margin-top:3px;margin-bottom:3px;font-weight:bold"><a title="Click to open/close Font and Colour Options" href="#" style="margin-top:2px" onclick="document.getElementById(\'fontColorSection\').style.display==\'block\' ? (function(){document.getElementById(\'fontColorSection\').style.display=\'none\';document.getElementById(\'fbpfacopts\').setAttribute(\'class\',\'fbpclosedlist\')})() : (function(){document.getElementById(\'fontColorSection\').style.display=\'block\';document.getElementById(\'fbpfacopts\').setAttribute(\'class\',\'fbpopenlist\')})()"><span id="fbpfacopts" class="fbpclosedlist">Font, Colour &amp; Design</span></a></p>'+
'<table id="fontColorSection" style="display:none">' +
'<tr><td><b>Font Size</b></td><td><b>Set</b></td></tr><tr style="background-color:#ECEFF5 !important"><td><input style="text-align:right;width:40px" id="fontsize" type="number" value="14" min="8" max="60"> px</td><td><input id="fontfix" type="checkbox"></td></tr>' +
'<tr><td colspan="2"><b>Web Font</b> <!--&nbsp;&nbsp;&nbsp;<i><a title="See all available Web Font styles (Opens in new tab/window)" target="_blank" href="https://www.google.com/fonts">Preview all available Web Fonts</a></i>--></td></tr><tr style="background-color:#ECEFF5 !important" title="Select a Google Web Font name e.g Arial,Helvetica,Verdana,Courier"><td>' + webfontselecthtml + ' &nbsp;<a title="Preview Selected Font" id="fontpreview"><i>Preview</i></a></td><td><input id="fbpwebfontfix" type="checkbox"></td></tr>' +
'<tr><td><b>Installed Font</b></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter a font name e.g Arial,Helvetica,Verdana,Courier, etc of a font you have installed on your computer. (If the font name has a space in it, put quote marks around the name)"><td><input style="width:90px" id="fbpfont" value="verdana"></td><td><input id="fbpfontfix" type="checkbox"></td></tr>' +
'<tr><td><b>Font Colour</b></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter a colour e.g Black,White,Blue,Red,Green etc (You can also use CSS/HTML colour codes)"><td><input style="width:90px" id="fontcolour" value="white" type="color"></td><td><input id="fontcolourfix" type="checkbox"></td></tr>' +
'<tr title="This will change the colour of links on Facebook"><td><b>Link Colour</b></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter a colour e.g Black,White,Blue,Red,Green etc (You can also use CSS/HTML colour codes)"><td><input style="width:90px" id="linkcolour" value="white" type="color"></td><td><input id="linkcolourfix" type="checkbox"></td></tr>' +
'<tr><td><b>Background Colour</b></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important"><td title="Enter a colour e.g Black,White,Blue,Red,Green etc (You can also use CSS/HTML colour codes)"><input style="width:90px" id="fontbgcolour" value="black" type="color"></td><td><input id="fontbgcolourfix" type="checkbox"></td></tr>' +
'<tr title="Enter the full URL of the background image you wish to use, e.g https://somesite.com/someimage.jpg (Local files cannot be used) If you want to use an image file from your computer, first upload it to Facebook, then open the image on fb and click the Set as Background link. If you want to use an image host other than facebook make sure they provide secure URLs, as the URL must begin with https://"><td><b>Background Image</b></td><td></td></tr>'+
'<tr title="Enter the full URL of the background image you wish to use, e.g https://somesite.com/someimage.jpg (Local files cannot be used) If you want to use an image file from your computer, first upload it to Facebook, then open the image on fb and click the Set as Background link. If you want to use an image host other than facebook make sure they provide secure URLs, as the URL must begin with https://" style="background-color:#ECEFF5 !important"><td><input style="width:98%" id="backgroundimage" value=""></td><td><input id="backgroundimagefix" type="checkbox"></td></tr>' +
'<tr style="background-color:#ECEFF5 !important" title="Stretch Background image to fit the screen"><td>Stretch Background Image to fit</td><td><input id="stretchbkgimg" type="checkbox"></td></tr>' +
'<tr><td title="Set the same background image for the top Nav Bar as well">Use same Bkg Image for Top Nav Bar</b></td><td><input id="topnavimagefix" type="checkbox"></td></tr>' +
'<tr><tr style="background-color:#ECEFF5 !important"><td>Make Newsfeed Transparent</td><td><input id="transnewsfeed" type="checkbox"></td></tr>' +
//<br><input type="range"> transparency range
'</table></td></tr>'+


// Custom Reactions Section
'<tr><td colspan="2" align="center"><p style="margin-top:3px;margin-bottom:3px;font-weight:bold"><a title="Click to open/close Custom Reactions Options" href="#" style="margin-top:2px" onclick="document.getElementById(\'customReactionsSection\').style.display==\'block\' ? (function(){document.getElementById(\'customReactionsSection\').style.display=\'none\';document.getElementById(\'fbpcropts\').setAttribute(\'class\',\'fbpclosedlist\')})() : (function(){document.getElementById(\'customReactionsSection\').style.display=\'block\';document.getElementById(\'fbpcropts\').setAttribute(\'class\',\'fbpopenlist\')})()"><span id="fbpcropts" class="fbpclosedlist">Custom Reactions</span></a></p>'+
'<table id="customReactionsSection" style="display:none">' +
'<tr><td colspan="2">'+
reactionselectbox +
'</td></tr>' +
//'<tr><td colspan="2"><b><a title="Click to set the URL for a Pack of Reaction Images" href="#">Image Pack</a> / <a title="Click to set the URLs for individual Reaction Images" href="#">Individual Images</a></b></td></tr>' +
'<tr><td title="Enter the URL for a Custom Reactions Image Pack, or a comma separated list of individual Reaction Image URLs in the following order: Like,Love,Haha,Wow,Sad,Angry"><b>Image Pack</b> &nbsp;<a target="_blank" title="Custom Reactions Help / Info" href="http://www.fbpurity.com/customize-facebook-reactions.htm"><b>Help</b></a></td><td><b>Set</b></td></tr><tr style="background-color:#ECEFF5 !important"><td title="Enter the URL for a Custom Reactions Image Pack, or a comma separated list of individual 48x48 pixels Reaction Image URLs in the following order: Like,Love,Haha,Wow,Sad,Angry"><input id="reactionsimagepack" value="" type="text"></td><td title="Tick/Untick box to turn Custom Reactions On/Off"><input id="reactionsimagepackfix" type="checkbox"></td></tr>' +
'<tr style="background-color:#ECEFF5 !important" title="Make the Reaction images grow larger when you select them"><td>Enlarge Reaction Images</td><td><input id="reactionsboost" type="checkbox"></td></tr>'+
// https://i.imgur.com/8dBNzEU.png
//'<tr><td title="Like Reaction Image"><b>Like Image URL</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the URL for a reactions image"><td><input id="reactionsimagepack" value="http://i.imgur.com/8dBNzEU.png" type="text"></td><td><input id="likeimagefix" type="checkbox"></td></tr>' +
//'<tr><td title="Love Reaction Image"><b>Love Image URL</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the URL for a reactions image"><td><input id="reactionsimagepack" value="http://i.imgur.com/8dBNzEU.png" type="text"></td><td><input id="loveimagefix" type="checkbox"></td></tr>' +
//'<tr><td title="Haha Reaction Image"><b>Haha Image URL</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the URL for a reactions image"><td><input id="reactionsimagepack" value="http://i.imgur.com/8dBNzEU.png" type="text"></td><td><input id="hahaimagefix" type="checkbox"></td></tr>' +
//'<tr><td title="Wow Reaction Image"><b>Wow Image URL</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the URL for a reactions image"><td><input id="reactionsimagepack" value="http://i.imgur.com/8dBNzEU.png" type="text"></td><td><input id="wowimagefix" type="checkbox"></td></tr>' +
//'<tr><td title="Sad Reaction Image"><b>Sad Image URL</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the URL for a reactions image"><td><input id="reactionsimagepack" value="http://i.imgur.com/8dBNzEU.png" type="text"></td><td><input id="sadimagefix" type="checkbox"></td></tr>' +
//'<tr><td title="Angry Reaction Image"><b>Angry Image URL</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the URL for a reactions image"><td><input id="reactionsimagepack" value="http://i.imgur.com/8dBNzEU.png" type="text"></td><td><input id="angryimagefix" type="checkbox"></td></tr>' +
'</table>' +

// top nav bar options
'<tr><td colspan="2" align="center"><p style="margin-top:3px;margin-bottom:3px;font-weight:bold"><a title="Click to open/close Top Nav Bar Options" href="#" style="margin-top:2px" onclick="document.getElementById(\'topnavSection\').style.display==\'block\' ? (function(){document.getElementById(\'topnavSection\').style.display=\'none\';document.getElementById(\'fbptopnavopts\').setAttribute(\'class\',\'fbpclosedlist\')})() : (function(){document.getElementById(\'topnavSection\').style.display=\'block\';document.getElementById(\'fbptopnavopts\').setAttribute(\'class\',\'fbpopenlist\')})()"><span id="fbptopnavopts" class="fbpclosedlist">Top Nav Bar Options</span></a></p>'+
'<table id="topnavSection" style="display:none">' +
'<tr><td title="Top Nav Bar Background Colour"><b>Top Nav Bar Bkg Colour</b></td><td><b>Set</b></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter a colour e.g Black,White,Blue,Red,Green etc (You can also use CSS/HTML colour codes)"><td><input style="width:90px" id="topnavcolour" value="white" type="color"></td><td><input id="topnavcolourfix" type="checkbox"></td></tr>' +
'<tr><td><b>Top Nav Bar Font Colour</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter a colour e.g Black,White,Blue,Red,Green etc (You can also use CSS/HTML colour codes)"><td><input style="width:90px" id="topnavfontcolour" value="white" type="color"></td><td><input id="topnavfontcolourfix" type="checkbox"></td></tr>' +
//'<tr><td title="Set a Background image for the top Nav Bar"><b>Top Nav Bar Bkg Image</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the full URL of the background image you wish to use, e.g https://somesite.com/someimage.jpg (Local files cannot be used)"><td><input style="width:140px" id="topnavimage" value=""></td><td><input id="topnavimagefix" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Freezes the top nav bar so it doesnt disappear when the page is scrolled down"><td>Freeze Top Nav Bar</td><td><input id="freezetopnav" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr title="Hides the Home link in the top nav bar"><td>Hide &quot;Home&quot; Link</td><td><input id="homelink" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Hides the counter next to the Home link in the top nav bar"><td>Hide &quot;Home&quot; Link Count</td><td><input id="homelinkcounter" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr title="Hides the Padlock icon in the top nav bar"><td>Hide Padlock Icon</td><td><input id="hidepadlock" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Hides the search box in the top nav bar"><td>Hide Search Box</td><td><input id="hidesearchbox" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr title="Hides the Graph Search box pop up suggestions in the top nav bar"><td>Hide Search Box Popup</td><td><input id="hidesearchpopup" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Hides the Trending / Popular / Recent  Search Suggestions in the Search box pop up"><td>Hide the Trending Search Suggestions</td><td><input id="hidesearchtrending" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr title="Hides the Cookies Policy Bar in the Top Nav Bar"><td>Hide the "Cookies Policy" bar</td><td><input id="cookiespolicy" type="checkbox"></td></tr>' +
//'<tr><td></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Hide the Status button in the top nav bar"><td>Hide Status Button</td><td><input id="hidetopnavstatusbutt" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr style="background-color:#ECEFF5 !important" title="Hides Friend Requests icon in the top nav bar"><td>Hide Friend Requests</td><td><input id="hidefriendreqtopnav" type="checkbox"></td></tr>' +
'<tr><td></td><td><b></b></td></tr><tr title="Shows the Logout button in the top nav bar"><td>Show Log Out button</td><td><input id="topnavbarlogout" type="checkbox"></td></tr>' +
//'<tr><td title="Change the Facebook F logo image in the top left corner"><b>Facebook F logo image</b></td><td></td></tr><tr style="background-color:#ECEFF5 !important" title="Enter the full URL of the 28 by 28 pixel image you wish to use to replace the F logo in the top left corner, e.g https://somesite.com/someimage.jpg (Local files cannot be used)"><td><input style="width:140px" id="fblogoimg" value=""></td><td><input id="fblogoimgfix" type="checkbox"></td></tr>' +
'</table></td></tr>'+

// beta options
'<tr><td colspan="2" align="center"><p style="margin-top:3px;margin-bottom:3px;font-weight:bold"><a title="Click to open/close Experimental Options. *Please note these options may not work correctly*" href="#" style="margin-top:2px" onclick="document.getElementById(\'betaSection\').style.display==\'block\' ? (function(){document.getElementById(\'betaSection\').style.display=\'none\';document.getElementById(\'fbpbetaopts\').setAttribute(\'class\',\'fbpclosedlist\')})() : (function(){document.getElementById(\'betaSection\').style.display=\'block\';document.getElementById(\'fbpbetaopts\').setAttribute(\'class\',\'fbpopenlist\')})()"><span id="fbpbetaopts" class="fbpclosedlist">Experimental Options</span></a></p>'+
'<table id="betaSection" style="display:none">' +
'<tr style="background-color:#ECEFF5 !important"><td colspan="2">These options are experimental, <br/>and not working 100%, and will<br/>cause display problems. Only use them<br/>if you are aware of this.</td></tr>' +
'<tr title="Experimental Feature: This option will apply your newsfeed filters to the stories in the news ticker in the right hand column. N.B This option currently only works when you are on the newsfeed page"><td><label style="color:black;font-weight:normal" for="newstickertextfilter">Apply Filters to News Ticker</label></td><td><input id="newstickertextfilter" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Experimental Feature: This option will optimise the newsfeed for widescreen monitors. (has only been tested at a resolution of 1920 x 1080) N.B This option only works on the newsfeed page, and will cause display glitches on other pages"><td><label style="color:black;font-weight:normal" for="widescreenfeed">Widescreen Newsfeed</label></td><td><input id="widescreenfeed" type="checkbox"></td></tr>'+
//'<tr style="background-color:#ECEFF5 !important" valign="top" title="Experimental Feature: Enables the display of animated gifs on Facebook. (Converts links to animated gifs on external sites to actual gifs) - This option is now obsolete, as Facebook displays the gifs itself."><td><label style="color:black;font-weight:normal" for="animatedgifs">Show Animated Gifs</label></td><td><input id="animatedgifs" type="checkbox"></td></tr>'+  //onclick="if (this.checked) if(confirm(\'The Show Animated Gifs option is an experimental feature.\\n\\nBy their nature Animated Gifs can use up lots of CPU cycles, RAM and bandwidth.\\n\\nAre you sure you want to turn this feature on?\')) return true; else return false;"
//'<tr title="** UPDATE: Please note this option no longer works ** : Selecting this option restores the comment button, though submitting a comment will be a 2 step submit process for techical reasons, if you dont like it, untick this box to make it hidden again. Theres a shortcut for submitting a comment when you have the comment button option enabled, and it is to press Tab, then Enter, then Enter again."><td><label style="color:black;font-weight:normal" for="commentbutton"><strike>Restore Comment Button</strike></label></td><td><input id="commentbutton" type="checkbox"></td></tr>'+
'</table></td></tr>'+

'</table>';

// end new options layout
fbpoptshtml += newoptscolumn ;
var loadingfriendlistmsg="Loading friend list...";
var deletedfriendsstate=''; // this variable doesnt seem necessary, can be removed...

fbpoptshtml += '</td><td valign="top">'+
'<table><tr><td valign="top"><b>More Options</b></td><td valign="top"><b>Hide</b></td><td rowspan="23" width="12"></td><td valign="top" rowspan="23" width="405"> ' +
// new custom text filter/ css / app whitelist tabs
'<span id="custextheader" title="Click to access the Text Filter" style="font-weight:bold;background:#ECEFF5;border:1 solid"><a href="#">Text Filter</a></span> - ' +
'<span id="friendwhitelistheader" title="Click to access the Friend Whitelist"><a href="#">Friend Whitelist</a></span> - ' +
'<span id="appwhitelistheader"><a title="Click to access the Application Whitelist" href="#">App Whitelist</a></span> - ' +
'<span id="custcssheader"><a title="Click to access the Custom CSS BOX" href="#">CSS</a></span><br/>' +
'<span id="custextdesc" style="background:#ECEFF5;" title="Please note, \'Regular Expressions\' can also be used.">Enter the words or phrases, on separate lines, that you wish to filter from your news feed. (<a title="Help with the Text Filter" target="_blank" href="http://www.fbpurity.com/extras.htm#customtextfilter"><b>Text Filter Help</b></a>) <br/></span><span style="display:none" id="custcssdesc">Enter the Custom CSS code you would like applied to facebook.  (<a title="Help with Custom CSS" target="_blank" href="http://www.fbpurity.com/css.htm"><b>CSS Help and examples</b></a>)</span><span style="display:none" id="friendwhitelistdesc">Add friends whose posts you dont want filtered out (<a title="Help with Friend Whitelist" target="_blank" href="http://www.fbpurity.com/whitelist.htm#friends"><b>Friend Whitelist Help</b></a>)</span><span style="display:none" id="appwhitelistdesc">Enter the numeric application IDs, on separate lines, of the apps whose stories you wish to allow in your news feed (<a title="Help with Application Whitelist" target="_blank" href="http://www.fbpurity.com/whitelist.htm"><b>App Whitelist Help</b></a>)</span>' +
'<textarea style="width:404px;height:275px" id="custextta">cust text filter</textarea><textarea style="display:none;" id="custcssta">Custom CSS</textarea><div id="friendwhitelistta" style="display:none"><div id="friendlistloadingdiv"><p/><b>' + loadingfriendlistmsg + '</b></div><p/><div id="friendselectdiv"></div><p/><div id="friendwhitelistdiv"></div></div><textarea style="display:none;" id="appwhitelistta">app whitelist</textarea>' +

fbptips[Math.floor(Math.random() * fbptips.length)] +

'<br/><div id="fbpnewsdiv"></div>'+
'<div id="donatediv" style="margin-top:25px">' +
'<p>If you like F.B. Purity and would like to show your appreciation for all the work I have put into it and also support future development, please <a href="http://donate.fbpurity.com/">make a donation</a>.<br/></p>' +
'<table><tr><td><a target="_blank" href="http://donate.fbpurity.com"><img style="margin-top:3px" border="0" height="47" width="160" src="https://www.paypal.com/en_US/GB/i/btn/btn_donateCC_LG.gif"></a></td><td>&nbsp;</td><td>Please tell all your friends about FBP too</td><td><a href="http://www.facebook.com/sharer.php?u=http://facebook.com/' + FBPFanPageURL + '#fbpshr" title="Share on Facebook" target="_blank"><img style="vertical-align:bottom" width="123" height="22" border="0" src="https://sites.google.com/site/st333v/fbp-1/shareonfacebook.gif" alt="Share on Facebook"></a></td></tr></table>'+
'</div>'+
'</td></tr>'+

'<tr style="background-color:#ECEFF5 !important" title="Hiding the sponsored box also hides Sponsored stories in the newsfeed, Suggested Posts, Facebook Offers, the people you may know, people to subscribe to boxes"><td><label style="color:black;font-weight:normal" for="sponsoredbox">Sponsored Box / Stories</label></td><td><input id="sponsoredbox" type="checkbox"></td></tr>'+
'<tr title="Un-Tick this if you dont want FBP to filter out application and game stories"><td><label style="color:black;font-weight:normal" for="filterappmessages">Game + App Stories</label></td><td><input id="filterappmessages" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="This option hides the smileys and stickers and replaces them with their text equivalent, if possible"><td><label style="color:black;font-weight:normal" for="smileys">Graphical Smileys / Emoticons</label></td><td><input id="smileys" type="checkbox"></td></tr>'+
'<tr title="This option hides the Reactions bar that shows the different like types (Reactions) when you hover over the like button"><td><label style="color:black;font-weight:normal" for="reactions">Reactions Bar</label></td><td><input id="reactions" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="This option hides Facebook\'s Notification box that pops up in the bottom left corner"><td><label style="color:black;font-weight:normal" for="notificationpopup">Notification Popup Box</label></td><td><input id="notificationpopup" type="checkbox"></td></tr>'+
'<tr title="Hides the People You May Know Boxes"><td><label style="color:black;font-weight:normal" for="pymk">People You May Know</label></td><td><input id="pymk" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Hides the Tag Suggestions that popup while you are typing. N.B. When this option is set, you can re-enable tag suggestions temporarily by typing the \'@\' symbol"><td><label style="color:black;font-weight:normal" for="tagsuggestions">Auto Tag Suggestions</label></td><td><input id="tagsuggestions" type="checkbox"></td></tr>'+
'<tr title="Hides the info popups that show when you hover over a User\'s or Page\'s name or icon"><td><label style="color:black;font-weight:normal" for="hovercards">Profile Hovercards</label></td><td><input id="hovercards" type="checkbox"></td></tr>'+
//'<tr style="background-color:#ECEFF5 !important" title="Hide the Trending Topics box in the right hand column"><td><label style="color:black;font-weight:normal" for="trendingbox">Trending Topics</label></td><td><input id="trendingbox" type="checkbox"></td></tr>'+
//'<tr title="The ticker bar is the scrolling news feed in the right hand column"><td><label style="color:black;font-weight:normal" for="happeningnowbar">News Ticker Bar</label></td><td><input id="happeningnowbar" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Hides the &apos;New Stories&apos; Popup Button"><td><label style="color:black;font-weight:normal" for="newstoriesbutt">&apos;New Stories&apos; Popup Button</label></td><td><input id="newstoriesbutt" type="checkbox"></td></tr>'+
'<tr title="Hides the &apos;is typing a comment&apos; box that appears when someone is writing a comment on a post"><td><label style="color:black;font-weight:normal" for="typingcomment">&apos;Is Typing a Comment&apos;</label></td><td><input id="typingcomment" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Completely hide the Newsfeed (the middle column of stories). If you need a break from the constant news updates, this option will totally hide the Newsfeed"><td>Newsfeed</td><td><input id="newsfeed" type="checkbox"></td></tr>' +
'<tr style="display:none"><td>Beta Tester Box</td><td><input id="betabox" type="checkbox"></td></tr>'+

'<tr><td style="padding-top:10px"><b>Further Options</b></td><td title="Set (Meaning: Turn On)" style="padding-top:10px"><b>Set</b></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="With this option ticked FBP will alert you if any of your friends un-friend you."><td><label style="color:black;font-weight:normal" for="deletedfriendalerts">Deleted Friend Alerts</label></td><td><input id="deletedfriendalerts" type="checkbox" ' +  deletedfriendsstate + '></td></tr>'+
'<tr title="Force the Newsfeed to stay on \'Most Recent\'. N.B If you don\'t want new Comments or Likes on old stories pushing the stories back to the top of the Most Recent feed, you should also tick the hide \'Commented on This\' and hide \'Liked This\' options under the \'Various Story Types\' heading."><td><label style="color:black;font-weight:normal" for="sortmostrecent">News Sort : Most Recent</label></td><td><input id="sortmostrecent" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Force the Newsfeed to stay on \'Friends Feed\'. The friends feed only shows stories from your friends in chronological order, none from Fan Pages, so it should load quicker if you just want to check what your friends are up to."><td><label style="color:black;font-weight:normal" for="sortfriendfeed">News Sort: Friends Feed</label></td><td><input id="sortfriendfeed" type="checkbox"></td></tr>'+
'<tr  title="Expands the main news column\'s width and hides the reminders column (including birthdays)"><td><label style="color:black;font-weight:normal" for="expandnewscolumn">Expand News Column</label></td><td><input id="expandnewscolumn" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important" title="Makes external links go directly to the site rather than being redirected by Facebook"><td><label style="color:black;font-weight:normal" for="fixarticleredirects">Fix External Links</label></td><td><input id="fixarticleredirects" type="checkbox"></td></tr>'+
'<tr title="Display the full URL of shared link stories in the newsfeed"><td><label style="color:black;font-weight:normal" for="fullURL">Show Full URL on Shared Links</label></td><td><input id="fullURL" type="checkbox"></td></tr>'+
'<tr style="background-color:#ECEFF5 !important"  title="Display the full date and time on posts in the newsfeed"><td><label style="color:black;font-weight:normal" for="fulltimestamps">Show Full Date/Time on Posts</label></td><td><input id="fulltimestamps" type="checkbox"></td></tr>'+
'<tr><td colspan="2" style="text-align:center;padding-top:26px"><input id="fbpsavesettings" type="button" onclick="this.disabled=1;" value="Save and Close" class="inputsubmit uiButton uiButtonConfirm uiButtonMedium"> <input id="closefbpsettings" type="button" value="Cancel" class="inputsubmit uiButton uiButtonConfirm uiButtonMedium"></td></tr>'+
'</table>' +

//'<p/><p/>'+

'<br/><form><textarea id="fbpsettingstext" style="display:none"></textarea></form></td></tr></table>'+
'<div><div style="float:left;margin-bottom:10px;margin-left:10px;margin-top:-10px"><a id="exportsettingslink" title="Backup your FBP Settings" href="javascript:;">Export Settings</a> / <a id="importsettingslink" title="Import your previously saved FBP settings" href="javascript:;">Import Settings</a> / <a title="Help with Exporting and Importing Settings" target="_blank" href="http://www.fbpurity.com/faq.htm#importexport"><b>?</b></a> <input type="file" id="fileElem" accept=".txt" style="display:none"/></div><div style="float:right;margin:10px"></div></div>';

var fbpfirstrunhtml='<div id="fbpfirstrundiv" style="width:600px;border:solid 3px;margin-left:150px;padding:8px;font-size:14px;font-family:verdana;background:white !important">'+
'<table width="100%"><tr><td width="66%" style="text-align:right"><a target="_blank" href="http://www.fbpurity.com"><img style="margin-left:auto;margin-right:auto" border="0" src="https://s-media-cache-ak0.pinimg.com/236x/dd/d1/cf/ddd1cfe41f4c70b1594a965492e47f32.jpg"></a></td><td width="33%" valign="top" style="text-align:right"><a href="#" title="Close" onclick="document.getElementById(\'fbpfirstrundiv\').style.display=\'none\'"><b>X</b></a></td></tr></table>'+
'<br/>'+
'<div id="firstpara"><p>Hello there! It looks like this is your first time running <b>F.B. Purity</b> <a title="If you are repeatedly seeing this message, then it means FBP cannot save its settings, or its settings are getting wiped out, please click here for the Troubleshooting Guide" href="http://www.fbpurity.com/faq.htm#troubleshooting"><b>*</b></a>'+
'<br/><span style="font-size:9px">If you are seeing this screen repeatedly, you need to follow the <a href="http://www.fbpurity.com/faq.htm#troubleshooting">FB Purity Troubleshooting Guide</a>.</span></p>' +
'<p>The functionality of this extension is closely linked to the current design of the Facebook website. When Facebook change the design or functionality of the site, this can sometimes stop F.B. Purity from working correctly.</p>' +
'<p>In order to keep up to date with news of any changes that may break F.B. Purity and for news of new versions of F.B Purity that fix any problems or add new functionality, it is extremely important that you click the like button for the F.B. Purity Fan page on Facebook (below). By doing this you should receive news of updates directly in your newsfeed, and you will also be able to leave feedback about the extension there too.<p/>'+
'<div><p><b>First Step:</b> Click Like: <iframe src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2F' + FBPFanPageURL + '&amp;width=292&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=false&amp;height=62&amp;ref=FBP_WELCOME_POPUP" scrolling="no" frameborder="0" marginwidth="0" style="border:none; overflow:hidden; width:295px; height:67px;" allowTransparency="true"></iframe></p></div>'+
'<p></p><p><b>Next Step:</b> <a onclick="document.getElementById(\'firstpara\').style.display=\'none\';document.getElementById(\'secondpara\').style.display=\'block\';" href="javascript:;">Click here for instructions on how to use F.B. Purity</a></p></div>'+

'<div id="secondpara" style="display:none"><p>To change F.B. Purity&apos;s settings, click either the &apos;<b>FBP</b>&apos; or &apos;<b>F.B. Purity</b>&apos; link at the top of your newsfeed and to learn more about how F.B. Purity works, please read the <a target="_blank" href="http://www.fbpurity.com/user-guide.htm">F.B. Purity User Guide</a><p/>'+
'<p>If you have any problems with F.B. Purity, please check out the <a target="_blank" href="http://www.fbpurity.com/#troubleshooting">F.B. Purity Troubleshooting Guide / Help Page</a></p>'+
'<p>If you have any questions about F.B. Purity, please first read the <a target="_blank" href="http://www.fbpurity.com/faq.htm">F.B. Purity FAQ (Frequently Asked Questions)</a> as your questions are most likely answered there.</p>'+

'<p>If you like F.B. Purity, please show your support by <a target="_blank" href="http://www.fbpurity.com/donate.htm">Donating</a>, as developing, maintaining and supporting this project is an awful lot of work, and I dont get paid for this. Please also tell all your friends about F.B. Purity too.</p>'+
'<p>Thanks!</p>'+
'<p>Steve -  The Developer of <a target="_blank" href="http://www.fbpurity.com">F.B. (Fluff Busting) Purity</a></p>'+
'<table width="100%"><tr><td style="text-align:center"><a onclick="document.getElementById(\'fbpfirstrundiv\').style.display=\'none\'" href="#">Close</a></td></tr></table></div>'+
'</div>';

function hideotherdivs(e) {
  var tastyle="";
  var divname=e.target.parentNode.id.split(/header/)[0];
  var boxlist="custext,friendwhitelist,appwhitelist,custcss";
  var boxarr=boxlist.split(',');
  for (var i in boxarr)
    if(boxarr[i]==divname) {
	  document.getElementById(divname + "header").setAttribute('style','background:#ECEFF5; font-weight:bold; font-size:15; border:1 solid');
	  document.getElementById(divname + "desc").setAttribute('style','display:block;background:#ECEFF5;');
	  tastyle="display:block;width:404px;height:275px";
	  if(divname=='friendwhitelist')
	    tastyle+=";overflow-y:auto";
	  document.getElementById(divname + "ta").setAttribute('style',tastyle);
    }
    else {
	  document.getElementById(boxarr[i] + 'header').setAttribute('style','background:white;font-weight:normal;font-size:14;border:0');
	  document.getElementById(boxarr[i] + 'desc').setAttribute('style','display:none');
	  document.getElementById(boxarr[i] + 'ta').setAttribute('style','display:none;');
    }
}

function closefontpreview(ev) {
  document.getElementById('fontpreviewdiv').style.display="none";
}

function showfontpreview(ev) {
  var fontpreviewstyle,fontpreviewdiv,fontsampletext;
  if(!document.getElementById('fontpreviewstyle')){
	createfontlink('fontpreviewstyle');
	fontpreviewdiv=document.createElement('div');
	fontpreviewdiv.id='fontpreviewdiv';
	fontpreviewdiv.innerHTML="<h1 align='center' style='color:white;margin-bottom:10px'>FB Purity Font Preview Window</h1><div id='fontsampletext' style='padding:10px'>THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG<br/>the quick brown fox jumped over the lazy dog<br/></div><button id='closefontpreview' style='margin-top:15px'>Close Font Preview</button>";
	fontpreviewdiv.setAttribute('style','position:relative;clear:both;padding:10px;border:3px solid;background-color:rgb(58, 87, 149);top:-560px;left:380px;width:400px;height:auto;text-align:center;z-Index:1000');
	document.getElementById('fbpoptsdiv').appendChild(fontpreviewdiv);
  }
  if(!fontpreviewdiv)
	fontpreviewdiv=document.getElementById('fontpreviewdiv');

  if(fontpreviewdiv.style.display=="none")
	fontpreviewdiv.style.display="block";

  document.getElementById('closefontpreview').addEventListener('click',closefontpreview,false);
  
  document.getElementById('fontpreviewstyle').setAttribute('href','https://fonts.googleapis.com/css?family=' + document.getElementById('fbpwebfont')[document.getElementById('fbpwebfont').selectedIndex].value);
  if(document.getElementById('fontcolourfix').checked)
	document.getElementById('fontsampletext').style.setProperty ("color",document.getElementById('fontcolour').value);
  else
	document.getElementById('fontsampletext').style.setProperty ("color","black");

  if(document.getElementById('fontbgcolourfix').checked)
	document.getElementById('fontsampletext').style.setProperty ("background-color",document.getElementById('fontbgcolour').value);
  else
	document.getElementById('fontsampletext').style.setProperty ("background-color","white");

  if(document.getElementById('fontfix').checked)
    document.getElementById('fontsampletext').style.setProperty ("font-size",document.getElementById('fontsize').value + "px", "important");
  else
	document.getElementById('fontsampletext').style.setProperty ("font-size","inherit");  

  document.getElementById('fontsampletext').style.setProperty ("font-family",document.getElementById('fbpwebfont')[document.getElementById('fbpwebfont').selectedIndex].value,"important");

}

function reactionselect(e){
	var rs=document.getElementById("reactionselect");
	document.getElementById('reactionsimagepack').value=rs[rs.selectedIndex].value;
	document.getElementById('reactionsimagepackfix').checked=true;
	showreactionspreview();
	rs=null;
}

function showcurrentreactionselection(){
  var rs=document.getElementById("reactionselect");
  var curpack=document.getElementById('reactionsimagepack').value;
  
  for(i in rs.options) 
	if(rs[i].value==curpack) {
      rs.selectedIndex=i;
	  break;
	}
}

function closereactionspreview(ev) {
  document.getElementById('reactionspreviewdiv').style.display="none";
}

function showreactionspreview(ev) {
  var reactionspreviewdiv;
  var reactarr=["like","love","haha","wow","sad","angry"];
  if(!document.getElementById('reactionspreviewdiv')){
	reactionspreviewdiv=document.createElement('div');
	reactionspreviewdiv.id='reactionspreviewdiv';
	reactionspreviewdiv.innerHTML="<h1 align='center' style='color:white;margin-bottom:10px'>FB Purity Custom Reactions Preview Window</h1><div id='reactionssample' style='padding:10px'><i title='Like' class='like'></i><i title='Love' class='love'></i><i title='Haha' class='haha'></i><i title='Wow' class='wow'></i><i title='Sad' class='sad'></i><i title='Angry' class='angry'></i><button id='closereactionspreview' style='margin-top:15px'>Close Reactions Preview</button>";
	reactionspreviewdiv.setAttribute('style','position:relative;clear:both;padding:10px;border:3px solid;background-color:rgb(58, 87, 149);top:-560px;left:380px;width:400px;height:auto;text-align:center;z-Index:1000');
	document.getElementById('fbpoptsdiv').appendChild(reactionspreviewdiv);
  }
  else
	reactionspreviewdiv=document.getElementById('reactionspreviewdiv');

  if(reactionspreviewdiv.style.display=="none")
	reactionspreviewdiv.style.display="block";

  if(!document.getElementById('reactionspreviewstyle')){
	  var reactionspreviewstyle=document.createElement('style');
	  reactionspreviewstyle.setAttribute('id','reactionspreviewstyle');
	  document.getElementsByTagName('head')[0].appendChild(reactionspreviewstyle);
  }
  var selectedReactionValue=document.getElementById('reactionselect')[document.getElementById('reactionselect').selectedIndex].value;
  
  if(!selectedReactionValue.match(/,/)) { // single image for all reactions
    document.getElementById('reactionspreviewstyle').innerText="#reactionspreviewdiv i.like {background-position:0 -144px!important} #reactionspreviewdiv i.love {background-position:0 -192px!important} #reactionspreviewdiv i.haha {background-position:0 -95px!important} #reactionspreviewdiv i.wow {background-position:0 -288px!important} #reactionspreviewdiv i.sad {background-position:0 -240px!important} #reactionspreviewdiv i.angry {background-position:0 0!important}" +
      "#reactionspreviewdiv i {background-image:url(" + document.getElementById('reactionselect')[document.getElementById('reactionselect').selectedIndex].value +");background-size:auto;background-repeat:no-repeat;height:48px;width:48px;display:inline-block}";
  }
  else { // separate reaction images
    //console.log('separate reaction images');
	//document.getElementById('reactionspreviewstyle').innerText="#reactionspreviewdiv i.like {background-image:url("
	var rcount=0;
	document.getElementById('reactionspreviewstyle').innerText="";
	for(i in reactarr) {
	  document.getElementById('reactionspreviewstyle').innerText+="#reactionspreviewdiv i." + reactarr[i] + " {background-image:url(" + selectedReactionValue.split(',')[rcount] + ")" + ";background-size:auto;background-repeat:no-repeat;height:48px;width:48px;display:inline-block}";
	  rcount++;
	}
  }
  // show labels  
  document.getElementById('reactionspreviewstyle').innerText+="#reactionspreviewdiv i:after { top: -20px !important; position: relative;font-weight:bold} #reactionspreviewdiv i.like:after { content: 'Like'} #reactionspreviewdiv i.love:after { content: 'Love'} #reactionspreviewdiv i.haha:after { content: 'Haha'} #reactionspreviewdiv i.wow:after { content: 'Wow'} #reactionspreviewdiv i.sad:after { content: 'Sad'} #reactionspreviewdiv i.angry:after { content: 'Angry'}";
	

  document.getElementById('closereactionspreview').addEventListener('click',closereactionspreview,false);
  
}
	
function importSettingsTxtFile(e) {
  var tFile = e.target.files[0];
 
  if (tFile) {
    var r = new FileReader();
      r.onload = function(e) {
	    var contents = e.target.result;
		console.log("Attempting File Import\nFile Contents:\n----\n" + contents);
		processImportedSettingsText(contents);
        /*window.alert( "Got the file.n" 
              +"name: " + tFile.name + "n"
              +"type: " + tFile.type + "n"
              +"size: " + tFile.size + " bytesn"
              + "starts with: " + contents.substr(1, contents.indexOf("n"))
        );*/  
      }
      r.readAsText(tFile);
  } else { 
      window.alert("Failed to load file");
  }
}

function importsettingsbasic(ev) {

  ev.preventDefault();
  
  if((typeof(window.btoa)=="function") && window.confirm('Do you wish to import your FBP\'s settings from a text file?')) {
	var fileElem = document.getElementById("fileElem");
    if (fileElem) {
	  if(isopera)
		fileElem.style.display="block";
	  fileElem.addEventListener("change",importSettingsTxtFile,false);
	  fileElem.click();  
    }
  } else
      var fbpsettingstext=window.prompt('F.B. Purity Settings Importer\n\nPaste in your saved FBP settings text, then click OK.\n\nOr if you want to reset your FBP settings to the defaults, enter the word "Reset" without the quotes.');
 
  processImportedSettingsText(fbpsettingstext);
  
}

function processImportedSettingsText(fbpsettingstext) {
  if(fbpsettingstext==null)
    return;
  
  if(fbpsettingstext.toLowerCase()=="reset") {
    window.alert('Your settings will now be reset to the installation defaults, and the page will reload.');
	fbpsavevalue('fbpoptsjson-' + currentuserid,"");
	//close prefs screen
    document.getElementById('fbpoptsdiv').style.display='none';
	window.location.reload(true);
    return;
  }

  if(!fbpsettingstext.length) {
     window.alert('You didnt enter valid settings text');
     return;
  }
  else {
    try {
      JSON.parse(fbpsettingstext);
    }
    catch(e) {
      window.alert('Error, settings text malformed, not valid. Import failed!');
      return;
    }
    fbpsavevalue('fbpoptsjson-' + currentuserid,fbpsettingstext);

    window.alert('Import Successful. FBP Settings have been updated! Page will now reload.');

    //close prefs screen
    document.getElementById('fbpoptsdiv').style.display='none';

    //reload page to refresh preferences
    window.location.reload(true);
  }
}
function exportsettingsbasic(ev) {
  ev.preventDefault();
  exportsettingsbasic2();
}

// figure out how to use callbacks, may be a better solution here....

function b64EncodeUnicode(str) { // needed for saving unicode text with BTOA
    return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function exportsettingsbasic2(opts) {
 var exporttext,el;
 var edge=0;
 if(window.navigator.userAgent.match(/Edge\/\d+/))
	 edge=1;
 if((!edge) && (!ischrome)) {
  if(!opts && opts!='') {
    if (issafari)
	  exporttext=fbploadvalue('exportfbpoptsjson-' + currentuserid,exportsettingsbasic2);
	else
      exporttext=fbploadvalue('fbpoptsjson-' + currentuserid,exportsettingsbasic2);
    if(exporttext==-999)
      return
  }
  else
    exporttext=opts;

  if ((typeof(exporttext)=='undefined') || (exporttext.length =="")) {
    if (issafari)
	  exporttext=fbploadvalue('exportfbpoptsjson-' + currentuserid,exportsettingsbasic2);
	else
      exporttext=fbploadvalue('fbpoptsjson-' +currentuserid,exportsettingsbasic2);
	if(exporttext==-999)
      return;
  }
 }
 else { // ms edge or chrome/chrome clone (FF WX/Edge etc)
   exporttext=JSON.stringify(fbpoptsobj);
 }
  var d = new Date();
  var date = d.toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3');
  
  var saveFBPSettingsButt=document.createElement('a');
  saveFBPSettingsButt.style="position:relative;left:200px;margin-top:5px";
  saveFBPSettingsButt.textContent="Save FBP Settings to a Text File";
  saveFBPSettingsButt.id="saveFBPSettingsButt";
  saveFBPSettingsButt.setAttribute('download',"FBP-Settings-" + date + ".txt");
  console.log('download',"FBP-Settings-" + date + ".txt");
  
  //document.getElementById('fbpsettingstext').parentNode.insertBefore(saveFBPSettingsButt,document.getElementById('fbpsettingstext').nextSibling);
  //saveFBPSettingsButt.addEventListener('click', function(e){e.preventDefault();e.stopPropagation();window.location.href="data:application/octet-stream;base64," +btoa(document.getElementById('fbpsettingstext').textContent);},false);

  if((typeof(window.btoa)=="function") && window.confirm('Do you wish to Save FBP\'s settings to a text file?')) {
	saveFBPSettingsButt.href="data:application/octet-stream;base64," +b64EncodeUnicode(exporttext);//btoa

	if(isfirefox) {
	  try{
	    var blob = new File([exporttext], "FBP-Settings-" + date + ".txt", {"type": "application/octet-stream"});
        var tempa = document.createElement("a");
        tempa.href = URL.createObjectURL(blob);
        window.location.href=tempa;
		blob=tempa=null;
	  }
	  catch(e) { // for older versions of firefox?
		window.alert('Due to a bug in firefox the FBP settings file will be saved in your default firefox downloads directory with a random filename.\n\nClick OK on the dialog box that opens after this one, then open the Firefox Downloads Manager (by clicking the down pointing arrow button in the Firefox toolbar at the top of the browser window)\n\nNext, click the folder icon next to the most recent download, which will open your file manager, then rename the most recently saved file in that directory to something like FBPSettings.txt');
	    document.body.appendChild(saveFBPSettingsButt);
	    document.getElementById('saveFBPSettingsButt').click();
	    document.getElementById('saveFBPSettingsButt').parentNode.removeChild(document.getElementById('saveFBPSettingsButt'));
	  }
	}
	else if(window.navigator.userAgent.match(/Edge\/\d+/)){
	  //console.log('isedge about to save file...\n\n' , exporttext);
	  
	  var sheize='try {'+
	  'var blob = new Blob([\'' + exporttext + '\'],{"type": "application/octet-stream"});'+
	  'if ( window.navigator.msSaveOrOpenBlob ) {'+
      '  window.navigator.msSaveOrOpenBlob( blob, "FBP-Settings-" + "' + date + '" + ".txt"  );'+
	  '}'+
	  '} catch(e) {'+
		'console.log("error in save file routine (edge)");'+
		'alert(e);'+
	  '}';
	  var savescript=document.createElement('script');
	  savescript.id="fbpedgeexportscript";
	  savescript.innerText=sheize;
	  document.getElementsByTagName('head')[0].appendChild(savescript);
	  document.getElementById('fbpedgeexportscript').parentNode.removeChild(document.getElementById('fbpedgeexportscript'));
	  savescript=sheize=null;
	}
	else
      saveFBPSettingsButt.click();
  }
  else {
	document.getElementById('fbpsettingstext').textContent=exporttext;
    window.alert('Copy the FBP settings text from the text box below and save it in a document or text file. If you ever need to restore your settings from that file, simply copy the text from the file, click the Import Settings link and paste the text in.');
	document.getElementById('fbpsettingstext').setAttribute('style','display:block;width:600px;height:220px');
    // autoselect the text in the textarea
    el=document.getElementById('fbpsettingstext');
    var range;
    if ((/textarea/i.test(el.tagName)) || ((/input/i.test(el.tagName)) && (/text/i.test(el.type)))) {
      el.select();
    } else if (!!window.getSelection) { // FF, Safari, Chrome, Opera
      var sel = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(el);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
  // testing this without the following line, maybe put it back in if the test pans out...
  //exporttext=saveFBPSettingsButt=null;
}

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function set_cookie (name,value) {
  document.cookie = name+ "=" + escape(value)+ ';expires=01/04/2099 00:00:00';
}

// check for GM_set/get API
var isgmapi, islocstor;
try {
  if(typeof(GM_setValue)!='undefined') {
    GM_setValue('test',1)
    if ( GM_getValue('test')==1)
      isgmapi=1;
    else
      isgmapi=0;
  }
  else
    isgmapi=0;
}
catch (e) {
  console.log(e);
  isgmapi=0;
}
// check for localstorage
try {
  if(typeof(window.localStorage)!='undefined')
    islocstor=1;
  else
    islocstor=0;
  }
catch(e) {
  islocstor=0;
}

function fbpsavevalue(name,value){
  if(debug)
    console.log('fbpsavevalue: ' + name + ' ; ' + value );
  try {
    if(isgmapi) {
	  GM_setValue(name,value+""); // convert value to string, because when we save a numerical date its too big for gm_setvalue which can only store 32bit integers
	}
	else if(ischrome) { // ischrome
	  if(typeof ChromeStorage !='undefined') {
		var items={};
		items[name]=value;
		ChromeStorage.set(items, function() {
          // Notify that we saved. (first check if theres an error)
		  if(typeof(chrome.runtime.lastError)=='undefined') {
			if(debug)
		      console.log('Settings saved: name:' + name + '  value:'  + value);
		  }
	      else
			console.log(chrome.runtime.lastError);
		  items=null;
        });
	  } else {
        chrome.runtime.sendMessage({method: "setLocalStorage", key: name, value: value}, function(response) {
          ;//console.log(response.data);
        });
	  }
	}
	else if(issafari) {
	  safari.self.tab.dispatchMessage("setLocalStorage",{key: name, value: value});
	}
	else if(isopera) {
	  widget.preferences[name]=value;
	}
	else if(ismaxthon) {
      maxthonruntime.storage.setConfig(name, value);
	}
	/* if i support localstorage and cookie, the user will repeatedly get the new user screen when the cookies are cleared, so lets comment this out
	else if(locstor) {
	  window.localStorage[name]=value;
	}
	else
	  set_cookie(name,value);
	*/
  }
  catch (e) {
    // if(debug)
    //console.log(e);
    if(islocstor)
      window.localStorage[name]=value;
	else
      set_cookie(name,value); 
  }
}

  if(issafari) {
	  //function replyToMessage(response) { // doesnt work in strict mode
	  var replyToMessage = function(response) {
	    if(debug) {
		  console.log(response.message);
		  console.log(response.name);
		  console.dir(response.message);
		}

		if(response.name == "fbpfirstrun") {
          if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  fbpfirstruncheck(response.message[1]);
		} else
        if(response.name == "fbplastupdatecheck") {
		  if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
          checkupdatefeed(response.message[1]);
        } else 
        if(response.name == "fbpoptsjson") {
		  if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  fbpgetprefs(response.message[1]); 
		} else 
		if(response.name == "exportfbpoptsjson") {
		  if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  exportsettingsbasic2(response.message[1]);
		} else 
		if (response.name == "lastfriendcheck") {
		  if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  lastfriendcheckfunc(response.message[1]); 
		} else
		if (response.name == "oldfriendstore") {
		  if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  graboldfriendstore(response.message[1]);
		} else
		if (response.name == "deletedfriendstore") {
		  if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  dspdeletedfriendalert(response.message[1]);
		} else
		if (response.name == "lastnewscheck") {
		  if(debug)
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  checkforlastnewsupdate(response.message[1]);
		} else
		if (response.name == "reset-lastnewscheck") {
		  if(debug) {
		    console.log('we in reset-lastnewscheck');
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  }
		  resetnewscounter(response.message[1]);
		} else
		if (response.name == "fbpaskedfordonation") {
		  if(debug) {
		    console.log('we in fbpaskedfordonation');
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  }
		  suggestDonation(response.message[1]);
		}
		else
		if (response.name == "checkdelfriendstorage-deletedfriendstore") {
		  if(debug) {
		    console.log('we in checkdelfriendstorage-deletedfriendstore');
		    console.log(response.message[0]  + ' : ' + response.message[1]);
		  }
		  checkdelfriendstorage(response.message[1]);
		}
      }

	  // register for message events
      safari.self.addEventListener("message", replyToMessage, false);
  }

  function isValidChromeRuntime() {
    // Check if the chrome extension is working ok (finished installing/updating or is disabled)
    return chrome.runtime && !!chrome.runtime.getManifest();
}

function fbploadvalue(name,funct){
  var val;
  if(debug)
    console.trace();
    //console.log('entering function : ' + arguments.callee.name);

  try {
    if(isgmapi) {
	  val = GM_getValue(name);
	}
	else if(ischrome) {
	  if(typeof ChromeStorage != 'undefined') {
	    ChromeStorage.get(name, function(storageResult) {
		  if(typeof(storageResult)!='undefined') {
			if(debug) {
			  console.log("storage result:");
			  console.log(storageResult);
			}
			if(!storageResult[name]){
			  if(debug)
			    console.log("property not found");
			  funct("");
			}
			else
              funct(storageResult[name]);
		  }
		  else {
		    //funct(storageResult[name]);
		    console.log('storageResult is undefined...');
		  }
        });
	  }
	  else {
	  // Chrome Extension
	    if (isValidChromeRuntime()) {
          chrome.runtime.sendMessage({method: "getLocalStorage", key: name}, function(response) {
		    //fbpdynamicreload(response.data);
		    if(funct) {
		      if(debug)
		        console.log("we in call back, and heres the data: " + response.data);
			  if((typeof(response)=='undefined') || (typeof(response.data)=='undefined')) {
			    if(debug)
			      console.log('Response from get localstorage was null.');
			    funct('');
			  }
			  else
			    funct(response.data);
		    }
          });
	    } else {
	        console.log("Can't connect to FBP extension. Perhaps it has been disabled, or it hasn't finished installing/updating yet.");
	        if(confirm("The FB Purity code on this page cannot currently connect to the FBP chrome extension, perhaps it has been disabled or has not yet finished the install or update process. To return this page to normal functionality, it needs to reload now.\n\nClick OK to reload the page.") && (!pageisreloading)) {
		      pageisreloading=1;
		      window.location.reload(true);
			  // maybe we should throw a custom exception here...
			}
	      }
	  }
	  val=-999;
	  if(debug)
	    console.log('name: ' + name + ' value' + val);
	}
	else if(issafari) {
      // Safari Extension
      safari.self.tab.dispatchMessage("getLocalStorage",name);
	  val=-999;
	}
	else if(isopera) {
	  if((typeof(widget.preferences[name]) !='undefined') ) { 
		val = widget.preferences[name];
		//fbpdynamicreload();
	  }
	    else val='';
	}
	else if(ismaxthon) {
	  val = maxthonruntime.storage.getConfig(name);
	}
  }
  catch (e) {
	console.dir(e);
    if(islocstor)
      val=window.localStorage[name];
	else
      val=get_cookie(name); 
  }
  return val;
}

function initundef() {
  if(typeof (fbpoptsobj.filterappmessages) =='undefined')
    fbpoptsobj.filterappmessages=1;
  if(typeof (fbpoptsobj.sortmostrecent) =='undefined')
    fbpoptsobj.sortmostrecent=0;
  if(typeof (fbpoptsobj.sortfriendfeed) =='undefined')
    fbpoptsobj.sortfriendfeed=0;
  if(typeof (fbpoptsobj.fixarticleredirects) =='undefined')
    fbpoptsobj.fixarticleredirects=1;
  if(typeof (fbpoptsobj.deletedfriendalerts) =='undefined')
    fbpoptsobj.deletedfriendalerts=1;
  if(typeof (fbpoptsobj.fbpnewsnotifier) =='undefined')
    fbpoptsobj.fbpnewsnotifier=1;
}

function fbpgetprefs(opts) {
  if(debug) {
    console.trace();
	// console.log(arguments.callee.length); // commented out because it doesnt work in strict mode
    console.log(opts);
	//console.log('entering function : ' + arguments.callee.name);
  }

  var optsdump;
  if(typeof(opts)!='undefined') {
    if(opts && opts.length) {
	  if(debug)
	    console.log("opts=" + opts);
      optsdump=opts;
	  try {
	    fbpoptsobj=JSON.parse(optsdump);
	  }
	  catch(e) {
	    console.log('error reading json in fbpgetprefs');
	    console.dir(e);
	    return;
	  }
	  initundef();
	  initstage2();
	  finalstage();
	}
	else {
	  if(debug)
	    console.log('are we at the top?');
      fbpoptsobjinit();
	  initundef();
	  initstage2();
	  finalstage();
	}
  }
  else {
    //console.log("user" + currentuserid);
    optsdump = fbploadvalue('fbpoptsjson-' + currentuserid,fbpgetprefs);//'fbpgetprefs'
	if(optsdump!=-999) { //if(!isasync) {
	  if(optsdump && optsdump.length) {
	    try{
	      fbpoptsobj=JSON.parse(optsdump);
		}
		catch(e) {
		  console.log("FBP ERROR: optsdump=" + optsdump);
		  fbpoptsobj=JSON.parse(decodeURIComponent(optsdump)); // this line is to make it compatible with older firefox extension which urlencoded/decoded saved values inside the extension
		}
        initundef();
		initstage2();
		finalstage();
	  }
	  else {
		if(debug)
		  console.log('are we at the bottom?');
        fbpoptsobjinit();
		initundef();
	    initstage2();
		finalstage();
      }
	}
  }
  //unsafeWindow.console.log(typeof(optsdump) + '  xxx  ' + optsdump  + 'xxx' + optsdump.length);
}

function suggestDonation (fbpaskedfordonation) {
  if(debug){
    console.log("isfirefox? = " +isfirefox);
    console.log('suggestDonation()');
  }
  if(typeof (fbpaskedfordonation)=='undefined') {
    var tmpd=fbploadvalue("fbpaskedfordonation",suggestDonation);
	if (tmpd=="-999")
	  return;
	else 
	  fbpaskedfordonation=tmpd;
	if(debug)
 	  console.log("fbpaskedfordonation="+fbpaskedfordonation);
  }
  if(typeof(fbpaskedfordonation!="undefined") && fbpaskedfordonation=="1") {
    if(debug)
      console.log('have shown donation screen before');
    return;
  }
  else
    if (confirm("Hello from FB Purity!\n\nI'm just letting you know that its been 2 months since you first installed FB Purity, I hope you are enjoying using it :)\n\nI first started work on FB Purity in March 2009, it is the product of many years of hard work, and takes a lot of time and effort to keep it running.\n\nWould you like to donate to help support FB Purity and keep the project going?\n\nIf you have already donated, can't or don't want to donate, click 'Cancel', otherwise please click 'OK' to open the donation page" + (isfirefox ? "" : " in a new browser tab")  + ".\n\nCheers,\n\nSteve (The FBP Developer)")) {
	  window.alert('Excellent, Thanks! Opening the FB Purity Donations page...');
	  fbpsavevalue('fbpaskedfordonation','1');
	  if(!isfirefox)
	    window.open('http://donate.fbpurity.com');
	  else  
	    window.location.href="http://donate.fbpurity.com";
	}
	else {
	  if(debug)
	    console.log('Didnt want to / couldnt donate, or already donated...');
	  fbpsavevalue('fbpaskedfordonation','1');
	}
}

function mdiff(to,from) { 
    var months = to.getMonth() - from.getMonth()  + (12 * (to.getFullYear() - from.getFullYear()));

    if(to.getDate() < from.getDate()){
        months--;
    }
    return months;
}

function fbpfirstruncheck(result) {
  var firstrundiv;
  
  if(debug) {
    console.trace();
	console.log('firstrun? ' + result);
  }
  //console.log('entering function : ' + arguments.callee.name);
  var fbpfirstrun,ph;
  //alert("firstres = " + result);
  //if(result || (result=='')) { was working on chrome and firefox and opera?
  if(typeof(result)!='undefined') {
    fbpfirstrun=result;
  }
  else	
    fbpfirstrun=fbploadvalue('fbpfirstrun',fbpfirstruncheck);
  if(fbpfirstrun==-999)
    return;

  //alert("secondres = " + fbpfirstrun); // make sure user is logged in (pageLogo element is there)
  if (((fbpfirstrun=='') || (typeof(fbpfirstrun)=='undefined') || (fbpfirstrun==null)) && (!(window.location.href.match(/^https?:\/\/apps\.facebook|^https?:\/\/blog\.facebook|^https?:\/\/secure\.facebook/)))) {
    if(!document.getElementById('fbpfirstrundiv')) {
	  ph=document.querySelector('#pagelet_bluebar,#fb2k_pagelet_bluebar');
	  if(!(ph && ph.querySelector("a[data-gt*='logo_chrome']"))) {
		console.log('didnt find blue bar and logo, exiting fbpfirstruncheck func');
		return;
	  }
	  firstrundiv=document.createElement('div');
	  firstrundiv.innerHTML=fbpfirstrunhtml;
	  if(ph.firstChild)
  	    ph.firstChild.parentNode.insertBefore(firstrundiv, ph.firstChild.nextSibling);
      fbpsavevalue('fbpfirstrun',new Date() + "");
	}
  }
  else 
    if(fbpfirstrun.length) {
	  if(debug)
        console.log("FBP was first installed in this browser on: " + fbpfirstrun + " Which was " + mdiff(new Date(),new Date(fbpfirstrun)) + " months ago.");
	  if(mdiff(new Date(),new Date(fbpfirstrun))>2) {
	    if(debug)
	      console.log('it was over 2 months ago since first installation');
		suggestDonation();
	  }
    }
}

/* BEGIN MARKER - UPDATE CODE COMMENTED OUT BECAUSE OF MOZILLAS ANNOYING POLICIES */
function checkifupdaterequired(currver,latestver) {
  if(debug)
    console.trace();
	//console.log('versions ' + currver,latestver);
    //console.log('entering function : ' + arguments.callee.name);
  if (currver && latestver) {
    var fbpupdatehtml = "**<a title='An update is available for F.B. Purity (v" +  latestver +").\nClick here to begin the upgrade process' href='http://www.fbpurity.com/install.htm?v=" + currver + "' style='color:red'><b>Update</b></a>** ";
    if (currver==latestver)
	  return; //window.alert('Congrats! You have the latest version of FB Purity :)');
    else {
	  var cvpart1,cvpart2,cvpart3,lvpart1,lvpart2,lvpart3;
      cvpart1=currver.split(/\./)[0];
      cvpart2=currver.split(/\./)[1];
      cvpart3=currver.split(/\./)[2];
      lvpart1=latestver.split(/\./)[0];
      lvpart2=latestver.split(/\./)[1];
      lvpart3=latestver.split(/\./)[2];
      if(parseInt(cvpart1)<parseInt(lvpart1)) {
	    if(document.getElementById('fbpupgradeinfo'))
          document.getElementById('fbpupgradeinfo').innerHTML=fbpupdatehtml;
	  }
      else if (parseInt(cvpart1) == parseInt(lvpart1)) {
        if(parseInt(cvpart2) < parseInt(lvpart2)) {
 	      if(document.getElementById('fbpupgradeinfo'))
            document.getElementById('fbpupgradeinfo').innerHTML=fbpupdatehtml;
		}
        else if (parseInt(cvpart2) == parseInt(lvpart2)) {
          if(parseInt(cvpart3) < parseInt(lvpart3))
		    if(document.getElementById('fbpupgradeinfo'))
              document.getElementById('fbpupgradeinfo').innerHTML=fbpupdatehtml;
        }
      }
      
    }
  }
}

function checkupdatefeed(result) {
  if(debug) {
    console.trace();
    //console.log('entering function : ' + arguments.callee.name); // commented out because cant use callee.name in strict mode
    console.log("checkupdatefeed result parameter= " + result);
  }
  //console.log("chu= " + result);
  var fbplastupdatecheck;
  /*if(result || (result=='')) {
    if(debug)
      console.log('fbplastupdatecheck val = ' + result);
    fbplastupdatecheck=result;
	if(typeof(fbplastupdatecheck)=='undefined')
	  fbplastupdatecheck='';
  }*/
  
  if(!result && result!='') {
    //console.log('do we even get here:?>?');
    fbplastupdatecheck=fbploadvalue('fbplastupdatecheck',checkupdatefeed);
    if(fbplastupdatecheck==-999) {
	  if(debug)
	    console.log("fbplastupdatecheck=" + fbplastupdatecheck);
      return
	}
  }
  else
    fbplastupdatecheck=result;
  //console.log("fbplastupdatecheck=" + fbplastupdatecheck);
  
  
  /*
  if(typeof(result)=='undefined') { // with this code firefox update notification works, but without it, it doesnt, whats going on?
	console.log('is this point reached we may need to delete it');
    fbplastupdatecheck="";
  }
  */
  
  
  /*
  else
    fbplastupdatecheck=fbploadvalue('fbplastupdatecheck',checkupdatefeed);
  if(fbplastupdatecheck==-999)
    return;
  */
  fbplastupdatecheck=decodeURIComponent(fbplastupdatecheck);
  if(debug)
    console.log('fbplastupdate=' + fbplastupdatecheck);
  
  var currtime = new Date().getTime(); // creates a new Date representing today
  //console.log(currtime);
  var currver = fbpVersion.replace('v','');
  
  /*
  console.log('is firefox getting here 1?');
  console.log(typeof(fbplastupdatecheck)!='undefined');
  console.log(fbplastupdatecheck != "");
  console.log(fbplastupdatecheck != null);
  */
  
  if( (typeof(fbplastupdatecheck)!='undefined') && (fbplastupdatecheck != "") && (fbplastupdatecheck!=null)) {
	//console.log('is firefox getting here 2?');
    var fbplastupdatecheckdate=fbplastupdatecheck.split(/\:/)[0];
	var fbplastupdatecheckver=fbplastupdatecheck.split(/\:/)[1];
	if((typeof(fbplastupdatecheckver) !='undefined') && (!fbplastupdatecheckver.match(/\./)))
	  fbplastupdatecheckver='';
	if(debug)
	  console.log('lastupdate check version= '+ fbplastupdatecheckver);
    if((typeof(fbplastupdatecheckdate) !='undefined') && fbplastupdatecheckdate.match(/^\d+$/)) {
      //To compute the difference, convert both to their millisecond representations and subtract:
      var diff = currtime - fbplastupdatecheckdate;
      //In this case the difference will be negative, as d1 preceeds d2.
      var num_days = (((diff / 1000) / 60) / 60) / 24;
      if(num_days < 1) {
	    //var cachedupdatever=fbploadvalue(fbpupdatever);
		if((typeof(fbplastupdatecheckver)!='undefined') && (fbplastupdatecheckver != ''))
		  checkifupdaterequired(currver,fbplastupdatecheckver);
        return;
      }
    }
	else {
	  // time value is corrupted somehow?
	  if (typeof(unsafeWindow) =='undefined') 
	    ;//console.log('error: fbplastupdatecheck= ' + fbplastupdatecheck); 
      else 
	    ;//unsafeWindow.console.log('error: fbplastupdatecheck= ' + fbplastupdatecheck);
	  return;
	}
  }

  //fbpsavevalue('fbplastupdatecheck',currtime + '');
  var http = new window.XMLHttpRequest();
  var url = window.location.protocol + "//www.facebook.com/purityupdates" ;
  var responsematch,latestver;
  //url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&q=" + url;
  
  //console.log('performing http request');
  http.open("GET", url, true);
  //http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
	  //console.log("we have results");//http.responseText);
	  
	  /* JSON VERSION (no longer works since fb disabled json feed)
	  try {
	    var fbpfeed = JSON.parse(http.responseText);
	  }
      catch (e) {
		http=fbpfeed=null;
		return;
      }
	  if(fbpfeed.entries[0].title.length && fbpfeed.entries[0].title.match(/F.B. Purity v(\d{1,}\.\d{1,}\.\d{1,}) /))
	    latestver=fbpfeed.entries[0].title.match(/F.B. Purity v(\d{1,}\.\d{1,}\.\d{1,}) /)[1];
      else
	    return;
	  */
	  // RSS2 version
	  responsematch = http.response.match(/F.B. Purity v(\d{1,}\.\d{1,}\.\d{1,}) is out/);
	  if(responsematch && typeof(responsematch[1]) !='undefined')
	    latestver=responsematch[1];
	  else {
		http=null;
		responsematch=null;
		return;
	  }
	  /*
	  if(http.responseText.match(/<title>/)) {
		titlearr=http.responseText.match(/\<title\>[\s\S]+?\<\/title\>/g);
		//console.dir(titlearr);
		if(titlearr.length && titlearr[1].match(/F.B. Purity v(\d{1,}\.\d{1,}\.\d{1,}) /))
	      latestver=titlearr[1].match(/F.B. Purity v(\d{1,}\.\d{1,}\.\d{1,}) /)[1];
      else
	    return;
	  }
	  */
		  
	  //var x = new Date (fbpfeed.entries[0].published);
      //newsa.setAttribute('title', "Published - " + x.toLocaleDateString());	
	  //alert(currver + ' '  + latestver);
	  fbpsavevalue('fbplastupdatecheck', currtime + ':' + latestver);
	  checkifupdaterequired(currver,latestver);
      http=null;
    }
  }
  http.send();
}

// check for updates to fbp
window.setTimeout(function() {
    checkupdatefeed();
}, 5000); // wait a bit, to ensure fbpinfobar will be there...
/* 
END MARKER - UPDATE CODE COMMENTED OUT BECAUSE OF MOZILLAS ANNOYING POLICIES
*/

if(debug)
  console.log('Code Marker: just after checkupdatefeed');

function showfriendwhitelistbox(){
  if(debug)
    console.log("in showfriendwhitelistbox");
  lastfriendcheckfunc(100000000000); // use a fake epoch date = 1973 so it triggers the friendlist grabber;
}

function closeFBPoptions() {
  if((typeof(window.localStorage.scrollTop)!='undefined') && (window.localStorage.scrollTop > 0)){
    window.scrollTo(0,window.localStorage.scrollTop);
  } 
  document.getElementById('fbpoptsdiv').style.display='none';
}

function closeDFAbox() {
  if((typeof(window.localStorage.scrollTop)!='undefined') && (window.localStorage.scrollTop > 0)){
    window.scrollTo(0,window.localStorage.scrollTop);
  } 
  document.getElementById('delfriendsalertdiv').style.display='none';
}

function fbppopulateprefs() {
  if(debug)
    console.trace();
    //console.log('entering function : ' + arguments.callee.name);
	
  // if options screen has been wiped out, re-insert it
  if(!document.getElementById('fbpoptsdiv') && document.getElementById('content') ) {
    document.getElementById('content').appendChild(optsdiv);
	
    document.getElementById('fbpsavesettings').addEventListener('click',fbpsavesettings,false);
	
    document.getElementById("closeoptslink").addEventListener('click',closeFBPoptions,false);
    document.getElementById('closefbpsettings').addEventListener('click',closeFBPoptions,false);

    document.getElementById('exportsettingslink').addEventListener('click',exportsettingsbasic,false);
    document.getElementById('importsettingslink').addEventListener('click',importsettingsbasic,false);
	
	document.getElementById('custextheader').addEventListener('click',hideotherdivs,false);
	document.getElementById('friendwhitelistheader').addEventListener('click',hideotherdivs,false);

	document.getElementById('friendwhitelistheader').addEventListener('click',showfriendwhitelistbox,false);
	document.getElementById('appwhitelistheader').addEventListener('click',hideotherdivs,false);
	document.getElementById('custcssheader').addEventListener('click',hideotherdivs,false);
	
	document.getElementById('fontpreview').addEventListener('click',showfontpreview,false);
	document.getElementById('fbpwebfont').addEventListener('change',showfontpreview,false);
	
	document.getElementById('reactionselect').addEventListener('change',reactionselect,false);
  }

  // fill out the preferences form with current settings
  for(var i=0;i<fbpoptsarr.length;i++) {
    if(document.getElementById(fbpoptsarr[i])) {
      if(fbpoptsobj[fbpoptsarr[i]]==1) {
        document.getElementById(fbpoptsarr[i]).checked=true; 
        //unsafeWindow.console.log (filterapptext, fbpoptsarr[i] + ' ' + ' ' + fbpoptsobj[fbpoptsarr[i]]);
        }
      else
        document.getElementById(fbpoptsarr[i]).checked=false;
    }
  }
  if(fbpoptsobj.customtextfilter && fbpoptsobj.customtextfilter.length) {
	document.getElementById('custextta').value=fbpoptsobj.customtextfilter.replace(/\,/g,"\n").replace(/&#44;/g,','); // replace comma placeholders with actual commas
	//unsafeWindow.console.log(fbpoptsobj.customtextfilter);
  }
  else  
    document.getElementById('custextta').value='';
    
  if(fbpoptsobj.userappwhitelist && fbpoptsobj.userappwhitelist.length) {
	document.getElementById('appwhitelistta').value=fbpoptsobj.userappwhitelist.replace(/\,/g,"\n");
	//unsafeWindow.console.log(fbpoptsobj.userappwhitelist);
  }
  else {
	document.getElementById('appwhitelistta').value='';
  }
    
  if(fbpoptsobj.fontsize)
    document.getElementById('fontsize').value=fbpoptsobj.fontsize;
	
  if(fbpoptsobj.fontcolour)
    document.getElementById('fontcolour').value=fbpoptsobj.fontcolour;
	
  if(fbpoptsobj.fontbgcolour)
    document.getElementById('fontbgcolour').value=fbpoptsobj.fontbgcolour;
  
  if(fbpoptsobj.fontbgcolour)
    document.getElementById('linkcolour').value=fbpoptsobj.linkcolour;
	
  if(fbpoptsobj.fbpfont)
    document.getElementById('fbpfont').value=fbpoptsobj.fbpfont;
  
  if(fbpoptsobj.fbpwebfont && fbpoptsobj.fbpwebfont.length){
    var wfsel=document.getElementById('fbpwebfont');
	var wfregex = new RegExp("^" +fbpoptsobj.fbpwebfont + "$");
	for (i=0;i<wfsel.options.length;i++) {
	  if(wfsel.options[i].text.match(wfregex))
	    wfsel.options[i].setAttribute('Selected','true');
	}
	wfsel=null;	
  }
	
  if(fbpoptsobj.backgroundimage)
    document.getElementById('backgroundimage').value=fbpoptsobj.backgroundimage;
  
  //if(fbpoptsobj.topnavimage)
  //  document.getElementById('topnavimage').value=fbpoptsobj.topnavimage;
  
  if(fbpoptsobj.topnavcolour)
    document.getElementById('topnavcolour').value=fbpoptsobj.topnavcolour;
  
  if(fbpoptsobj.topnavfontcolour)
    document.getElementById('topnavfontcolour').value=fbpoptsobj.topnavfontcolour;
	
  if(fbpoptsobj.fbpcustomcss && (typeof(fbpoptsobj.fbpcustomcss) != 'undefined')) {
	document.getElementById('custcssta').value=fbpoptsobj.fbpcustomcss;
	//unsafeWindow.console.log(fbpoptsobj.fbpcustomcss);
  }
  else  
    document.getElementById('custcssta').value='';

  if(fbpoptsobj.reactionsimagepack)
    document.getElementById('reactionsimagepack').value=fbpoptsobj.reactionsimagepack;

  if(fbpoptsobj.customphotoblocklist)
    document.getElementById('customphotoblocklist').value=fbpoptsobj.customphotoblocklist;

  if((!(typeof(fbpoptsobj.seenLocaleWarning)===undefined)||(fbpoptsobj.seenLocaleWarning==0))) {
	var langCodeMatch=String(document.body && document.body.className).match(/Locale_([a-z]{2}_[A-Z]{2})/);
	if(langCodeMatch && (!langCodeMatch[1].match(/^en/)))
      document.getElementById("localeproblem").innerHTML="Please note: Your Facebook language setting is: \"<span style='color:black'>" + langCodeMatch[1] + "</span>\". If you want FBP's list of built in newsfeed filtering options to work correctly <br/>You should <a target='_blank' href='https://www.facebook.com/settings?tab=language'>change your language setting to English (UK or US)</a>. Otherwise, you can create your own newsfeed filters in your own language with the 'Text Filter' box below.<br/>Most other options should still work ok, however.";
  }
}

function fbpsavesettings(ev) {
	
  if((document.getElementById('fontcolour').value == document.getElementById('fontbgcolour').value) && (document.getElementById('fontbgcolourfix').checked && document.getElementById('fontcolourfix').checked)) {
    window.alert("You can't have the same values for Background Colour and Font Colour, otherwise you wont be able to see any text.\n\n Please change one or the other before clicking Save, so you will actually be able to read the text on the screen.");
    document.getElementById('fbpsavesettings').disabled=false;
	return;
  }

  if(document.getElementById('backgroundimagefix').checked && (!document.getElementById('backgroundimage').value.match(/^https\:\/\//))) {
	document.getElementById('backgroundimagefix').checked=false;
    window.alert("Your Background Image must be hosted on a secure server, so the image URL must begin with https:// otherwise it won't work.\n\nIf you don't understand what this means, you can simply upload the image you want to use as a background image to facebook, then open the image on facebook and click the 'Set as Background' link to set that image as your background image.");
    document.getElementById('fbpsavesettings').disabled=false;
	return;
  }
  
  for(var i=0;i<fbpoptsarr.length;i++) {
    if(document.getElementById(fbpoptsarr[i]) && document.getElementById(fbpoptsarr[i]).checked==true)
      fbpoptsobj[fbpoptsarr[i]]=1;
    else
      fbpoptsobj[fbpoptsarr[i]]=0;
  }
 
  if(document.getElementById('custextta').value.length) {
    //fbpoptsobj.customtextfilter=document.getElementById('customtextfilter').value.replace(/, *$/,'','g'); // replace trailing comma and spaces
	// replace actual commas with &#44; (ascii code for comma)
	var tempcustomtextfilter=document.getElementById('custextta').value.replace(/,/g,"&#44;").replace(/[\r\n|\r|\n]/g,"\,").replace(/\,{1,}/g,'\,').replace(/,$/,'').replace(/^,/,'');
	fbpoptsobj.customtextfilter='';
	var ctfarr=tempcustomtextfilter.split(',');
	//for(i=ctfarr.length-1;i>=0;i--)
	for(i=0;i<ctfarr.length;i++)
	  if (ctfarr[i].replace(/^ {1,}$/,'')!='')
	     fbpoptsobj.customtextfilter+=ctfarr[i] + ','; // strip out lines that are just spaces.
		 
    fbpoptsobj.customtextfilter=fbpoptsobj.customtextfilter.replace(/,$/,''); // strip trailing comma
//	alert(fbpoptsobj.customtextfilter);
  }
  else  
    fbpoptsobj.customtextfilter='';

  if(document.getElementById('appwhitelistta').value.length) {
    fbpoptsobj.userappwhitelist=document.getElementById('appwhitelistta').value.replace(/ /g,'').replace(/[\r\n|\r|\n]/g,"\,").replace(/\,{1,}/g,'\,').replace(/,$/,'').replace(/^,/,'');
	//alert(fbpoptsobj.userappwhitelist);
  }
  else  
    fbpoptsobj.userappwhitelist='';
  
  // begin new custom css box
  if(document.getElementById('custcssta').value.length) {
	fbpoptsobj.fbpcustomcss=document.getElementById('custcssta').value;
  }
  else  
    fbpoptsobj.fbpcustomcss='';
  // end new custom css box

  fbpoptsobj.fontsize=document.getElementById('fontsize').value;
  fbpoptsobj.fontcolour=document.getElementById('fontcolour').value;
  fbpoptsobj.fontbgcolour=document.getElementById('fontbgcolour').value;
  fbpoptsobj.linkcolour=document.getElementById('linkcolour').value;
  fbpoptsobj.fbpfont=document.getElementById('fbpfont').value;
  fbpoptsobj.fbpwebfont=document.getElementById('fbpwebfont').value;
  fbpoptsobj.backgroundimage=document.getElementById('backgroundimage').value;
  //fbpoptsobj.topnavimage=document.getElementById('topnavimage').value;
  fbpoptsobj.topnavcolour=document.getElementById('topnavcolour').value;
  fbpoptsobj.topnavfontcolour=document.getElementById('topnavfontcolour').value;
  fbpoptsobj.reactionsimagepack=document.getElementById('reactionsimagepack').value;
  fbpoptsobj.customphotoblocklist=document.getElementById('customphotoblocklist').value;

  // save friend whitelist
  var friendslists=document.querySelectorAll('[id*=frienddiv-]');
  var friendswhitelistArr={};
  if(friendslists.length)
    for(i=0;i<friendslists.length;i++) {
	  friendswhitelistArr[ friendslists[i].getElementsByTagName('input')[0].value.split(/::/)[1]]=friendslists[i].getElementsByTagName('input')[0].value.split(/::/)[0];
	}
  fbpoptsobj.friendswhitelistArr=JSON.stringify(friendswhitelistArr);
  //save to prefs obj to localstorage
  fbpsavevalue('fbpoptsjson-' + currentuserid, JSON.stringify(fbpoptsobj));
  
  //console.log(JSON.stringify(fbpoptsobj));
  
  //close prefs screen
  document.getElementById('fbpoptsdiv').style.display='none';
  
  //reload page to refresh preferences
  window.location.reload(true);

  // Dynamically update the page instead of reloading the whole page, only problem is if the page contains many posts, this is very slow.
  /*
  document.getElementById("fbpsavesettings").disabled=false;
  fbpgetprefs();
  resetclasses(); // need to also reset other filters and css
  initstage2();
  //updateblockedcount(); // doesnt seem to do anything and clear the shizzle, should automatically update it. (we are getting nodes with 2 classes fbpnormal and fbpblocked
  cleartheshizzle(document);
  */
}

function fbpoptsobjinit() {
  if(debug)
    console.trace();
    //console.log('entering function : ' + arguments.callee.name);
	
  // set up default options
  fbpoptsobj.filterappmessages=1;
  fbpoptsobj.becamefriends=1;
  fbpoptsobj.becamefan=1;
  fbpoptsobj.joinedgroup=1;
  fbpoptsobj.attendevent=1;
  fbpoptsobj.attendedevent=1;
  fbpoptsobj.createdevent=0;
  fbpoptsobj.watchinglistening=0;

  fbpoptsobj.commentlikeslink=0;
  fbpoptsobj.commentwall=0;
  fbpoptsobj.commentgroupwall=0;
  fbpoptsobj.commentpagewall=0;
  fbpoptsobj.commenteventwall=0;
  fbpoptsobj.updatedprofile=0;
  fbpoptsobj.changedprofilepic=0;
  fbpoptsobj.changedrelationship=0;
  
  fbpoptsobj.uploadedphoto=0;
  fbpoptsobj.sharedphoto=0;
  fbpoptsobj.uploadedvideo=0;
  fbpoptsobj.taggedinvideo=0;
  fbpoptsobj.livevideo=0;
  fbpoptsobj.postednote=0;
  fbpoptsobj.taggedinnote=0;
  fbpoptsobj.sharedmemory=0;
  fbpoptsobj.yourmemories=0;
  fbpoptsobj.commentedonthis=0;
  fbpoptsobj.likedthis=0;
  fbpoptsobj.taggedthis=0;
  fbpoptsobj.postedlink=0;
  fbpoptsobj.readarticle=0;
  fbpoptsobj.checkedin=0;
  
  fbpoptsobj.suggestionsbox=0;
  fbpoptsobj.connectbox=0;
  fbpoptsobj.sponsoredbox=1;
  fbpoptsobj.pokebox=0;
  fbpoptsobj.happeningnowbar=0;
  fbpoptsobj.newstoriesbutt=0;
  fbpoptsobj.typingcomment=0;
  fbpoptsobj.betabox=0;
  //fbpoptsobj.commentbutton=0;
  fbpoptsobj.offlinefriends=1;
  fbpoptsobj.offlinemobilefriends=0;
  fbpoptsobj.groupconvos=1;
  
  fbpoptsobj.requestsbox=0;
  fbpoptsobj.eventsbox=0;
  fbpoptsobj.questionsbox=0;
  fbpoptsobj.chatbox=0;
  fbpoptsobj.pagestory=0;
  fbpoptsobj.trendingbox=0;
  fbpoptsobj.bubblechat=0;
  fbpoptsobj.condensedchat=0;
  fbpoptsobj.tagsuggestions=0;
  fbpoptsobj.hidesearchpopup=0;
  fbpoptsobj.hidesearchtrending=0;
  fbpoptsobj.cookiespolicy=0;
  fbpoptsobj.hidefriendreqtopnav=0;
  fbpoptsobj.topnavbarlogout=0;
  fbpoptsobj.sendmoneybutt=0;
  fbpoptsobj.startcallbutt=0;
  fbpoptsobj.chatplaygamebutt=0;
  fbpoptsobj.chatquickcambutt=0;
  //fbpoptsobj.hidetopnavstatusbutt=0;
  
  //fbpoptsobj.commentslikestopnews=0;
  fbpoptsobj.recentactivity=0;
  
  fbpoptsobj.fontsize='13';
  fbpoptsobj.fontfix='0';
  
  fbpoptsobj.fontcolour='';
  fbpoptsobj.fontcolourfix=0;
  fbpoptsobj.fontbgcolour='';
  fbpoptsobj.fontbgcolourfix=0;
  fbpoptsobj.linkcolour='';
  fbpoptsobj.linkcolourfix=0;
  fbpoptsobj.fbpfont='';
  fbpoptsobj.fbpfontfix=0; 
  fbpoptsobj.fbpwebfont='';
  fbpoptsobj.fbpwebfontfix=0;
  
  fbpoptsobj.topnavcolour='';
  fbpoptsobj.topnavcolourfix=0;
  fbpoptsobj.topnavfontcolour='';
  fbpoptsobj.topnavfontcolourfix=0;
  fbpoptsobj.backgroundimage='';
  fbpoptsobj.backgroundimagefix=0;
  fbpoptsobj.freezetopnav=0;
  //fbpoptsobj.topnavimage='';
  fbpoptsobj.topnavimagefix=0;
  
  fbpoptsobj.reactionsimagepack="";
  fbpoptsobj.reactionsimagepackfix=0;
  fbpoptsobj.reactionsboost=0;
  
  fbpoptsobj.customphotoblocklist="";
  
  fbpoptsobj.stretchbkgimg=0;
  fbpoptsobj.transnewsfeed=0;
  fbpoptsobj.hidesearchbox=0;
  fbpoptsobj.hidepadlock=0;
  
  fbpoptsobj.newsfeed=0;
  fbpoptsobj.widescreenfeed=0;
  fbpoptsobj.leftcolumncounters=0;
  fbpoptsobj.homelink=0;
  fbpoptsobj.homelinkcounter=0;
  
  fbpoptsobj.sortmostrecent=0;
  fbpoptsobj.sortfriendfeed=0;
  fbpoptsobj.fixarticleredirects=1;
  //fbpoptsobj.timelineonecol=0;
  //fbpoptsobj.animatedgifs=0;
  fbpoptsobj.hovercards=0;
  
  // left hand column options
  fbpoptsobj.wholeleftcolumn=0;
  fbpoptsobj.colouredbg=1;
  fbpoptsobj.lcadvertmgr=0;
  fbpoptsobj.lcconnect=0;
  fbpoptsobj.lcallpages=0;
  //fbpoptsobj.lcpagesandpublicfigures=0;
  fbpoptsobj.lcpagesfeed=0;
  fbpoptsobj.lclikepages=0;
  fbpoptsobj.lcallapps=0;
  fbpoptsobj.lcappcenter=0;
  fbpoptsobj.lceditprofile=0;
  fbpoptsobj.lcevents=0;
  fbpoptsobj.lcgamesfeed=0;
  fbpoptsobj.lcpokes=0;
  fbpoptsobj.lcmusic=0;
  fbpoptsobj.lcplaceseditor=0;
  fbpoptsobj.lcallgroups=0;
  //fbpoptsobj.lcallinterests=0;
  fbpoptsobj.lcfindfriends=0;
  fbpoptsobj.lcfindnewgroups=0;
  fbpoptsobj.lccreatepage=0;
  fbpoptsobj.lccreategroup=0;
  fbpoptsobj.lcdeveloper=0;
  fbpoptsobj.lcfundraisers=0;
  //fbpoptsobj.lcfundraiserscreate=0;
  //fbpoptsobj.lcfundraisersfind=0;
  fbpoptsobj.lcfriends=0;
  fbpoptsobj.lconthisday=0;
  fbpoptsobj.lcbrowse=0;
  //fbpoptsobj.lcfbiphone=0;
  //fbpoptsobj.lcfbandroid=0;
  fbpoptsobj.lcfbpnews=0;
  fbpoptsobj.lcwelcome=0;
  fbpoptsobj.lcnotes=0;
  fbpoptsobj.lclinks=0;
  fbpoptsobj.lcmanagegroups=0;
  fbpoptsobj.lcsaved=0;
  fbpoptsobj.lcshops=0;
  fbpoptsobj.lcsuggested=0;
  fbpoptsobj.lcsuggestedits=0;
  fbpoptsobj.lccreateevent=0;
  fbpoptsobj.lcphotos=0;
  fbpoptsobj.lcsalegroups=0;
  fbpoptsobj.lcpayments=0;
  fbpoptsobj.lclivemap=0;
  fbpoptsobj.lcdiscovergroups=0;
  fbpoptsobj.lcyourposts=0;
  fbpoptsobj.lcmoments=0;
  fbpoptsobj.lcrecommendations=0;
  fbpoptsobj.lccreate=0;
  fbpoptsobj.lcshortcuts=0;
  
  // right hand column options
  fbpoptsobj.wholerightcolumn=0;
  fbpoptsobj.rcrecommendedpages=0;
  fbpoptsobj.rcrelatedgroups=1;
  fbpoptsobj.rcpokes=0;
  fbpoptsobj.rcbirthdays=0;
  fbpoptsobj.rcfriendrequests=0;
  fbpoptsobj.rcgamerequests=0;
  fbpoptsobj.rcyourpages=0;
  fbpoptsobj.rclive=0;
  fbpoptsobj.rctodaysgames=0;
  
  fbpoptsobj.upcomingevents=0;
  fbpoptsobj.sharedevent=0;
  
  fbpoptsobj.sharedpage=0;
  fbpoptsobj.likedlink=0;
  fbpoptsobj.commentedlink=0;
  fbpoptsobj.likepagebutton=0;
  fbpoptsobj.hideallphotos=0;
  fbpoptsobj.taggedphoto=0;
  fbpoptsobj.likedphoto=0;
  fbpoptsobj.commentedphoto=0;

  fbpoptsobj.sharedvideo=0;
  fbpoptsobj.likedvideo=0;
  fbpoptsobj.commentedvideo=0;
  fbpoptsobj.youtubevideo=0;
  //fbpoptsobj.stopautoplayvideo=0;

  fbpoptsobj.sharedstatus=0;
  fbpoptsobj.likedstatus=0;
  fbpoptsobj.commentedstatus=0;
  fbpoptsobj.taggedstatus=0;
  fbpoptsobj.smileys=0;
  fbpoptsobj.reactions=0;
  fbpoptsobj.notificationpopup=0;
  
  fbpoptsobj.hidealllinks=0;
  fbpoptsobj.hideallvideos=0;
  fbpoptsobj.fixedleftcolumn=0;
  fbpoptsobj.expandnewscolumn=0;
  fbpoptsobj.deletedfriendalerts=1;
  fbpoptsobj.newstickertextfilter=0;
  fbpoptsobj.fulltimestamps=0;
  fbpoptsobj.fullURL=0;
  fbpoptsobj.fbpnewsnotifier=1;
  
  fbpoptsobj.listheaderimage=0;
  fbpoptsobj.listsuggestions=0;
  
  //timeline options
  fbpoptsobj.tlgamesapps=0;
  fbpoptsobj.tlinvitefriendslikepage=0;
  fbpoptsobj.tllikesbox=0;
  fbpoptsobj.pymk=0;
  fbpoptsobj.nonags=0;

  fbpoptsobj.customtextfilter='';
  fbpoptsobj.userappwhitelist='';
  fbpoptsobj.fbpcustomcss='';
  
}

// APPLICATION WHITELIST
// ---------------------

// If you would like to edit the list of applications in the user whitelist, 
// theres detailed instructions here: http://whitelist.fbpurity.com

var defaultappwhitelist = "6628568379,115463795461,48119224995,5895217474,56212371378,146139331013,2254487659,2915120374,74769995908,4620273157,14405921260,10754253724,2483740875,22950410511,43769862066,2550392059,8109791468,2238752371,21370137768,6195724695,6694405826,2231777543,53702860994,20407635301,38125372145,56137638329,10732101402,16297770890,2877035514,41158896424,72687635881,350685531728,30713015083,111527682205237,121958126090,2330519541,49340319393,26463759431,21810043296,24420472648,183319479511,189818072392,302006227267,90376669494,108160725869250,39010226174,247431880944,66746580154,96105046534,143907478979139,146563558702544,131289390231340,9953271133,45439413586,131732509879,23723376453,76456527540,105130332854716,27694818115,67878695711,79763977758,139682082719810,122580857763901,24553799497,159348674082705,112618498804176,148061315211358,104142802965358,149588628439275,7933375107,135892916448833,48505437520,198446803501767,193278124048833,165907476854626,213546525407071,531615603522381,149859461799466,178645865537776,220353874751486,124024574287414,283116811738331,221427911240457,136165049846511,318117675023626,800871226593160,87741124305";

// the application ids in the default app whitelist above belong to, in order:
// 6628568379   = facebook iphone application
// 115463795461 = selective twitter
// 48119224995  = tumblr
// 5895217474   = digsby
// 56212371378  = tweetdeck
// 146139331013 = tweetdeck for iphone
// 2254487659   = facebook for blackberry
// 2915120374   = facebook mobile widget
// 74769995908  = facebook for android
// 4620273157   = facebook for palm
// 14405921260  = facebook for motorola (motoblur)
// 10754253724  = iphoto uploader
// 2483740875   = picasa uploader
// 22950410511  = sprint/samsung? photo/video uploader
// 43769862066  = SonyEricsson
// 2550392059   = MusicPlayer
// 8109791468   = Status Shuffle
// 2238752371   = Facebook Exporter for iPhoto
// 21370137768  = official flickr application
// 6195724695   = Windows Phone
// 6694405826   = Posterous
// 2231777543   = Twitter
// 53702860994  = LG Mobile
// 20407635301  = Snaptu
// 38125372145  = SonyEricsson Panel
// 56137638329  = Nokia
// 10732101402  = ping.fm
// 16297770890  = 3Skypephone 'S2'
// 2877035514   = Gwibber
// 41158896424  = HTC Sense 
// 24420472648  = HTC Sense
// 72687635881  = Samsung Mobile
// 350685531728 = facebook for android
// 30713015083  = windows live messenger
// 111527682205237 = O2 social link
// 121958126090 = LG Phone
// 2330519541   = Bloom photo uploader
// 49340319393  = Ovi by Nokia
// 26463759431  = My INQ Mobile
// 21810043296  = Facebook for the T-Mobile Sidekick
// 183319479511 = HootSuite
// 189818072392 = live journal
// 302006227267 = Sony Ericsson X10 mini pro
// 90376669494  = Yahoo
// 108160725869250 = Sony Ericsson
// 39010226174  = Vlingo
// 247431880944 = Droid
// 66746580154  = Dell Mobile
// 96105046534  = RockMelt
// 143907478979139 = RockMelt Beta
// 146563558702544 = Friendly for Ipad
// 131289390231340 = Slide
// 9953271133   = networked blogs
// 45439413586  = RSS Grafitti
// 131732509879 = Twitter Feed
// 23723376453  = Seesmic
// 76456527540  = Facebook mobile by Opentech ENG
// 105130332854716 = flipboard
// 27694818115     = Ovi by Nokia
// 67878695711     = Nokia N900
// 79763977758     = Kodak Easy Share
// 139682082719810 = Snaptu for Facebook
// 122580857763901 = eBuddy
// 24553799497     = mobileblog
// 159348674082705 = Photoloader
// 112618498804176 = FriendCaster for Android
// 148061315211358 = Friendcaster Pro for android
// 104142802965358 = My INQ Mobile
// 149588628439275 = Twidroyd for Twitter
// 7933375107      = Windows Phone
// 135892916448833 = Facebook for Windows Phone
// 48505437520 = Sony Ericsson Web Albums
// 198446803501767 = HTC ChaCha
// 193278124048833 = HTC Sense
// 165907476854626 = Facebook Pages Manager
// 213546525407071 = iOS
// 531615603522381 = Facebook Site Governance voting app
// 149859461799466 = Sony Xperia Smartphone
// 178645865537776 = Blackberry
// 220353874751486 = Facebook for Blackberry 10
// 124024574287414 = Instagram
// 318117675023626 = Instagram
// 283116811738331 = Paper
// 221427911240457 = Nokia
// 136165049846511 = OS X
// 800871226593160 = Facebook Mentions
// 87741124305     = Youtube

// EXTRA STORIES ( see http://extras.fbpurity.com for more info )
// Read option settings and set extra story codes

////////////////////////
/// BEGIN opts 
////////////////////////   

var arrwhitelist2={}; // this is the main application whitelist array
var extraTextFilter;
var headerTextFilter;
var cleancustomtextfilter='';
var headertextfilterRX;
var textfilterRX;
var photosubjectfilterlist="";
var filterapptext;
var fbpboxstyles;
//var fbpfanpageid="408502197558";    // 10150502187552559 (alternative id?)
//var fbpdevpageid="464154953615751"; // 639625812735330   (alternative id?)

function getuserid(){
  if(debug)
    console.trace();
	
  var userid='';
  try {
    userid=document.cookie.match(/c_user=(\d+)/)[1];
  }
  catch(e) {
    console.log('problem getting logged in user id: ' + e);
  }
  if(debug)
    console.log("userid= " + userid);
	
  return userid;
}

var currentuserid=getuserid();

if(debug)
  console.log('Code Marker: just after getuserid function');
  
// comment this section out for testing offline pages
 if(currentuserid=="") {
  var loginandoutstyle=document.createElement('style');
  loginandoutstyle.textContent='div.fbIndexFeaturedRegistration > div.lfloat, .-cx-PRIVATE-fbAdUnit__root, #pagelet_rhc_footer, #SetAsHomepage_Callout, .gradientContent > div[data-ad^="{"], #findFriendsNav, #navFindFriends, div[data-ad], body.UIPage_LoggedOut #globalContainer div.lfloat {display:none} body.UIPage_LoggedOut #globalContainer div.userContentWrapper div.lfloat,#reg_box .lfloat._ohe {display:block !important}';
  var h=document.getElementsByTagName('head');
  var waitforhead1=window.setInterval(function(){
      if(document.getElementsByTagName('head').length ) {
		h[0].appendChild(loginandoutstyle);  
	    window.clearInterval(waitforhead1);
      }
    }, 500)
  console.log('FBP Exiting because user is not logged in yet.');
  return;  // exit script if the user isnt logged in... though this screws with debugging offline pages
}

var useridwhitelistRX;
if (!currentuserid.length)
  //var useridwhitelistRX=new RegExp(fbpfanpageid + "|" + fbpdevpageid );
  var useridwhitelist=FBPFanPageID + "|" + FBPDevPageID ;
else
  //var useridwhitelistRX=new RegExp(fbpfanpageid + "|" + fbpdevpageid + "|" + currentuserid);
  var useridwhitelist=FBPFanPageID + "|" + FBPDevPageID + "|" + currentuserid;

var refreshwhitelist = function () {
  var whitelist;
  if (fbpoptsobj.userappwhitelist && fbpoptsobj.userappwhitelist.length)
    whitelist = defaultappwhitelist + "," + fbpoptsobj.userappwhitelist;
  else
    whitelist = defaultappwhitelist;

  whitelist = whitelist.replace(/,,/g,''); // remove blanks (if any)
  whitelist = whitelist.replace(/ /g,'');  // remove spaces (if any)
  whitelist = whitelist.replace(/,$/,'');  // remove trailing comma (if any)
  
  var arrwhitelist=whitelist.split(',');

  for (var i in arrwhitelist)
    arrwhitelist2[arrwhitelist[i]]=true; // create hashmap
}

var fixsortorder = function() {
  var feedRedirectURL,feedRedirectName;
  if(debug)
    console.log('fix sort order function');

  var tsdiv=document.createElement('div');
  tsdiv.id='topstoriesdiv';
  if(document.getElementById('fbpurityinfowrapper')){
    tsdiv.setAttribute('style',"position:absolute;top:" + document.getElementById('fbpurityinfowrapper').offsetTop + "px;left:185px");
  }

  if(window.location.href.match(/\/?sk=friends/)) {
	tsdiv.textContent="Viewing Friends Feed";
	document.getElementById('fbpurityinfowrapper').parentNode.insertBefore(tsdiv,document.getElementById('fbpurityinfowrapper'));
  }
  else if(window.location.href.match(/\?sk=photos/)) {
	tsdiv.textContent="Viewing Photos Feed";
	document.getElementById('fbpurityinfowrapper').parentNode.insertBefore(tsdiv,document.getElementById('fbpurityinfowrapper'))    
  }
  else if(window.location.href.match(/\?sk=pages/)) {
	tsdiv.textContent="Viewing Pages Feed";
	document.getElementById('fbpurityinfowrapper').parentNode.insertBefore(tsdiv,document.getElementById('fbpurityinfowrapper'))    
  }  
  else if(window.location.href.match(/\?sk=groups/)) {
	tsdiv.textContent="Viewing Groups Feed";
	document.getElementById('fbpurityinfowrapper').parentNode.insertBefore(tsdiv,document.getElementById('fbpurityinfowrapper'))    
  }

  if(fbpoptsobj.sortmostrecent) {
	feedRedirectURL="https://www.facebook.com/?sk=h_chr";  
	feedRedirectName="Most Recent";
	
	// redirect if theres a "posts you havent seen" section on user timelines...
	if(document.querySelector('div[data-pnref="unseen-section"]')) {
	  if(document.getElementById('recent_capsule_container'))
	    document.getElementById('recent_capsule_container').innerHTML='<h3>Switching to Most Recent Posts</h3>';
	  window.location.reload(true);
	}
  }
  if(fbpoptsobj.sortfriendfeed) {
	feedRedirectURL="https://www.facebook.com/?sk=friends";
	feedRedirectName="Friends Feed";
  }

  if((fbpoptsobj.sortmostrecent || fbpoptsobj.sortfriendfeed) && !window.location.hash.match(/#topstories/)) { // force feed to sort by most recent
	if(document.querySelector(".litestandClassicWelcomeBox,#userNav[data-testid='fb_welcome_box'],#sideNav>div>li a[data-gt*='\"bookmark_type\":\"type_self_timeline\"']") && (!window.location.href.match(/\/addgroup|\/pokes|\/addlist|\/notes|\/support|\/pages|\/todayinhistory|\/onthisday|\/(music|photo|video|permalink)\.php|\/videos|\?.*sk=(friends|trans|photos|pages|groups|notes|video|music|media|albums|fl_)/)) && (window.location.href.split(/\//).length<5)) {
	  //deal with top stories when there is no indicator (h_nor) in the URL 
	  if(!document.querySelector('a[href$="\?sk=h_nor"]') && !document.getElementById('pagelet_insights')) { // check we are not on a fan page
	    document.getElementById('globalContainer').innerHTML="<div id='switchsortmsg' style='text-align:center;font-size:60px;font-weight:bold;'>F.B. Purity:<br/> Switching to: " + feedRedirectName + ".</div>";
		window.location.href=feedRedirectURL;
	  }
	}

	if(window.location.href.match(/\?sk=h_nor$/)) {
	  if(document.getElementById('globalContainer'))
	    document.getElementById('globalContainer').innerHTML="<div id='switchsortmsg' style='text-align:center;font-size:60px;font-weight:bold;'>F.B. Purity:<br/> Switching to: " + feedRedirectName + "!</h1>";
	  window.location.href= feedRedirectURL;
	}
    /* https://www.facebook.com/?sk=h_nor : Top Stories
       https://www.facebook.com/?sk=h_chr : Most Recent
	
	   change newsfeed links to point to most recent feed
	   left hand newsfeed link 
	*/
	var tmplefthlink;
	if(document.getElementById('pinnedNav'))
	  tmplefthlink=document.querySelector("#pinnedNav a[data-gt*='\"bookmark_type\":\"type_newsfeed\"']");
    else if (document.getElementById('universalNav'))
	  tmplefthlink=document.querySelector("#universalNav a[data-gt*='\"bookmark_type\":\"type_newsfeed\"']");
	if(tmplefthlink) {
	  tmplefthlink.setAttribute('href',feedRedirectURL);
	  tmplefthlink.setAttribute('data-gt','');
	  // try removing event listeners by cloning the node and replacing it
      var new_element = tmplefthlink.cloneNode(true);
      tmplefthlink.parentNode.replaceChild(new_element, tmplefthlink);
	  new_element=null;
	}

	// BEGIN trying this code again, seems to be working ok now.
	if(document.querySelector("a[data-gt*='home_chrome']"))
	  document.querySelector("a[data-gt*='home_chrome']").setAttribute('href',feedRedirectURL);

	if(document.querySelector("a[data-gt*='logo_chrome']"))
	  document.querySelector("a[data-gt*='logo_chrome']").setAttribute('href',feedRedirectURL);
	// END trying this code again, seems to be working ok now.

  } // end if sortmostrecent is enabled
  else {
    if((fbpoptsobj.sortmostrecent || fbpoptsobj.sortfriendfeed)&& window.location.hash.match(/#topstories/)) {
	   //<div style="position:absolute;top:94px;left:185px">Viewing Top Stories</div>
	   tsdiv.textContent="Viewing Top Stories";
	   //tsdiv.id='topstoriesdiv';
	   document.getElementById('fbpurityinfowrapper').parentNode.insertBefore(tsdiv,document.getElementById('fbpurityinfowrapper'))
	}
    if(debug)
	  console.log('Sort most recent option is not enabled or #topstories is present in location.href');
  }
}

function clearBlankComments () {
  var x=document.querySelectorAll('.UFIRow.UFIComment');
  var tmptextholder;
  for(i in x) { 
    //console.log(x[i].textContent);
    try {
	  if(x[i].querySelector && (x[i].querySelector('div[style*="-dragon-"],a[rel="nofollow"],a[href^="https://www.facebook.com/photo.php"][rel="theater"]')))
	  { // comment contains sticker/external link or photo
		continue;
	  }
	  // BEGIN applying text filter
	  if(!x[i].querySelector)
		return;
	  tmptextholder=removeTags(x[i].querySelector('.UFICommentContent').innerHTML);
	  //console.log(tmptextholder);
	  if((tmptextholder=="") || tmptextholder.match(textfilterRX)) {
	    x[i].style.display="none";
		if(x[i].nextSibling && x[i].nextSibling.classList && (typeof(x[i].nextSibling.classList!='undefined')) && x[i].nextSibling.classList.contains('UFIReplyList'))
	      x[i].nextSibling.style.display="none";
	  }
	  // END applying text filter
	  
	  //console.log(removeTags(x[i].querySelector('.UFICommentContent').innerHTML));
	  
	  if(x[i].querySelector && removeTags(x[i].querySelector('.UFICommentContent').innerHTML)=="") {
	    x[i].style.display="none";
		if(x[i].nextSibling && x[i].nextSibling.classList && x[i].nextSibling.classList.contains('UFIReplyList'))
	      x[i].nextSibling.style.display="none";
	  }
	}
	catch(e) {
	  console.log(e);
	}
  }
}

function removeTags(string){
  if(typeof(string)!="undefined") {
	var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#\$%&\(\)\*\+,\-\.\/:;<=>\?@\[\]\^_`\{\|\}~]/g;
	
    return string.replace(/<br>/gi,'')
	           .replace(/<!--[\s\S]*?-->/g,'')
	           .replace(/<a[^>]*>.*?<\/a>/g, ' ')
               .replace(/<div[^>]*>.*?<\/div>/g, ' ')
               .replace(/<\/div>/g,'')
               .replace(/(<span[^>]*>|<\/span>)/g, ' ')
			   .replace(punctRE,'')
               .replace(/\s{2,}/g, ' ')
               .trim();
  }
  else 
    return "";
}

var createfontlink = function(fontlinkid) {

  //console.log('creating font link');
  if(document.getElementById(fontlinkid))
    return;
  var fontlink = document.createElement('link');
  fontlink.setAttribute('id',fontlinkid);
  fontlink.setAttribute('type','text/css');
  fontlink.setAttribute('href','');
  fontlink.setAttribute('rel','stylesheet');
  if(document.getElementsByTagName('head').length)
    document.getElementsByTagName('head')[0].appendChild(fontlink);
  fontlink=null;
}

var initstage2 = function () {
  if(debug)
    console.trace();
    //console.log('entering function : ' + arguments.callee.name);

  extraTextFilter='';
  headerTextFilter='';
  if(fbpoptsobj.filterappmessages==1) {
    filterapptext=' fbpblocked';
	headerTextFilter += ', played .*,started playing,started using';
	extraTextFilter += ',games your friends are playing,Games You May Like';
  }
  else
    filterapptext=' fbpnormal';

  if(fbpoptsobj.becamefriends==1)
    headerTextFilter += ',are now friends,is now friends with,now allows subscribers,subscribed to updates from,subscribed to .*\'s updates,subscribed to the list, followed .*\.,commented on their own friendship,commented on h.. own friendship'; // can probably get rid of subscribed to now (as they switched to follow)
  
  if(fbpoptsobj.watchinglistening==1)
    headerTextFilter += ', watching , listening to, playing '; //(is|was)? watching, (is|was)? listening to

  if(fbpoptsobj.becamefan==1){
	headerTextFilter += ', recommends, likes \\d+ pages, likes .* and \\d* other pages,wrote a recommendation for, rated .*';
    extraTextFilter += ',Liked\\d,Like Page\\d.* Like,\\d LikesLike Page,\\d LikesLiked,Like this Page,Find More Pages ·, Write a recommendation ';
  }
 
  if(fbpoptsobj.joinedgroup==1) {
	headerTextFilter += ",.* was added to ,uploaded a .* in the group, was invited to, were invited to, invited .* to ,updated the description of the group,updated the group";
	extraTextFilter += ",· Join Group";
  }

  if(fbpoptsobj.attendevent==1)
	headerTextFilter += ",attending , is going to, are going to , interested in";

  if(fbpoptsobj.attendedevent==1)
	headerTextFilter += ", attended the event, were attending, was attending, went to .*\.";

  if(fbpoptsobj.createdevent==1)
    headerTextFilter += ",created an event,created a private event,added an event,updated the event photo";

  if((typeof fbpoptsobj.upcomingevents !=='undefined') && (fbpoptsobj.upcomingevents==1))
    extraTextFilter += ",Upcoming Events,Upcoming Concerts";

  if((typeof fbpoptsobj.sharedevent !=='undefined') && (fbpoptsobj.sharedevent==1))
    headerTextFilter += ",shared an event, shared .*\\'s event, posted an event, shared h.. event,shared their event";
	//extraTextFilter += ",people are goingjoin" // may also filter out "created an event" stories

  if (typeof fbpoptsobj.checkedin == "undefined")
    fbpoptsobj.checkedin = 0;

  if(fbpoptsobj.checkedin==1)
	headerTextFilter += ", is with .*,was tagged at, is in .*\., was in .*\., is at .*\., was at .*\., were at .*\., are at .*\., was with ,travelling to,traveling to,checked in to";

  if((typeof fbpoptsobj.likedstatus !=='undefined') && (fbpoptsobj.likedstatus==1))
	headerTextFilter += ", likes .*\'s status, like .*\'s status, like a status, likes (h..|their) own status,likes (h..|their) own post,likes a status, likes a post,liked this post,likes .*\'s post,like .*\'s post,likes .*'s life event,reacted to .* status, reacted to .* post,reacted to .* life event";

  if((typeof fbpoptsobj.commentedstatus !=='undefined') && (fbpoptsobj.commentedstatus==1))
	headerTextFilter += ",commented on .* status, commented on .* note, commented on .*'s life event, commented on .* activity,commented on .* post, replied to a comment on a post";

  if((typeof fbpoptsobj.taggedstatus !=='undefined') && fbpoptsobj.taggedstatus==1)
    headerTextFilter += ", tagged .* status\., tagged in a life event, mentioned in a status, mentioned in a post, tagged in .* note, tagged in a post";

  if((typeof fbpoptsobj.sharedstatus !=='undefined') && (fbpoptsobj.sharedstatus==1))
	headerTextFilter += ", shared .*\'s status, shared a status, shared .*\'s post,shared a post,shared h.. post,shared their post";

  if((typeof fbpoptsobj.taggedphoto !=='undefined') && (fbpoptsobj.taggedphoto==1))
    headerTextFilter += ",tagged in (h..|their) own photo, tagged in \\d+ photos,tagged in a photo,tagged in .*\'s photo,tagged in h.. own album, tagged in .*\'s album,was added as a contributor to the album,tagged h..self in.^photo,tagged h..self in album";

  if((typeof fbpoptsobj.likedphoto !=='undefined') && (fbpoptsobj.likedphoto==1))
    headerTextFilter += ",liked .* photo,likes .* photo,likes? a photo,likes .*\'s album, reacted to .* photo,reacted to .*\'s album,reacted to a photo, like .*\'s photo";

  if((typeof fbpoptsobj.commentedphoto !=='undefined') && (fbpoptsobj.commentedphoto==1))
    headerTextFilter += ",commented on .*\'s photo,commented on h.. own photo,commented on h.. own album,commented on a photo,commented on .*\'s album";

  if((fbpoptsobj.commentedlink !== 'undefined') && (fbpoptsobj.commentedlink==1)) {
    headerTextFilter += ",commented on .*\'s link,commented on .* link,commented on .*\.com\.";
  }

  if((fbpoptsobj.likedlink !== 'undefined') && (fbpoptsobj.likedlink==1)) {
    headerTextFilter += ",likes an article,recommends a link,likes h.. own link,likes a link,like a link,like .*\'s link,likes .*\'s link,likes \\d+ links,reacted to .*\'s link,reacted to a link";
  }

  if((fbpoptsobj.sharedpage !== 'undefined') && (fbpoptsobj.sharedpage==1)) {
    headerTextFilter += ",shared a Page,shared \d+ pages";
  }

  if(fbpoptsobj.commentwall==1) {
	headerTextFilter += ",posted in,commented on .* post,commented on .* article,wrote on .*\'s timeline, to .*\'s timeline"; //commented on h.. own post,commented on .*\'s post in,commented on a Post,
	extraTextFilter  += ",posted .* to .*\'s timeline";
  }

// updated profile
  if (typeof fbpoptsobj.updatedprofile == "undefined")
    fbpoptsobj.updatedprofile = 0;

  if(fbpoptsobj.updatedprofile==1)
	headerTextFilter += ",added .* to h.. education\.,updated h.. education,added .* to h.. work\.,has worked on,updated h.. current .* to .*\\.,added .* as h.. hometown\\.,updated h.. work and education,added .* to h.. list of inspirational people\\.,to the inspirational people,added .* to h.. favourite sports\\.,added .* to h.. favourite teams\\.,added .* to h.. favourite athletes\\.,added .* to h.. activities\\.,added .* to h.. interests\\.,added .* to h.. profile\\.,to .* previous employers,added .* to h.. timeline,added a job at , now works at , took .* at .*,added details about,added a life event,added \\d+ life events,updated h.. bio,updated his bio,updated their bio";

// changed profile pic
  if (typeof fbpoptsobj.changedprofilepic == "undefined")
    fbpoptsobj.changedprofilepic = 0;

  if(fbpoptsobj.changedprofilepic==1)
    headerTextFilter += ",changed (h..|their) profile picture,updated (h..|their) profile picture,updated (h..|their) profile video,updated (h..|their) cover photo,added a temporary profile picture";

// changed relationship
  if (typeof fbpoptsobj.changedrelationship == "undefined")
    fbpoptsobj.changedrelationship = 0;

  if(fbpoptsobj.changedrelationship==1) {
    headerTextFilter += ',went from being \".*\" to \".*\",went from being \".*\" to being \".*\",is in a relationship,complicated relationship,is single,is married,is engaged,is in a domestic partnership';
	extraTextFilter += ',See Relationship,· In a Relationship,· in a complicated relationship';
  }

// uploaded photo 
  if (typeof fbpoptsobj.uploadedphoto == "undefined")
    fbpoptsobj.uploadedphoto = 0;

  if(fbpoptsobj.uploadedphoto==1){
    headerTextFilter += ",added a photo,posted a photo,added a new photo,added \\d+ new photos,added \\d+ photos,took a photo with,took \\d+ photos with,added a collage,added .* featured photo";
	extraTextFilter +=', (\\d+ photos)';
  }

// shared photo 
  if (typeof fbpoptsobj.sharedphoto == "undefined")
    fbpoptsobj.sharedphoto = 0;

  if(fbpoptsobj.sharedphoto==1){
    headerTextFilter += ",shared a photo,shared h.. photo,shared their photo,shared .*\'s album,shared h.. album,shared their album,shared a collage,shared h.. collage,shared their collage,shared .*\'s collage";//shared .*\'s photo,
	extraTextFilter += ",shared .*?'s photo"; //by\:
  }

//  uploaded video  
  if (typeof fbpoptsobj.uploadedvideo == "undefined")
    fbpoptsobj.uploadedvideo = 0;

  if(fbpoptsobj.uploadedvideo==1){
	headerTextFilter += ",posted a video,added a video,added a new video,added \\d+ videos,added \\d+ new videos,uploaded.* video";
  }

// tagged in video
  if (typeof fbpoptsobj.taggedinvideo == "undefined")
    fbpoptsobj.taggedinvideo = 0;

  if(fbpoptsobj.taggedinvideo==1)
	headerTextFilter += ", tagged in .*\'s video, tagged in a video";

// live video
  if (typeof fbpoptsobj.livevideo == "undefined")
    fbpoptsobj.livevideo = 0;

  if(fbpoptsobj.livevideo==1)
	headerTextFilter += ", is live now, was live";

  // shared video
  if((typeof fbpoptsobj.sharedvideo!=='undefined') && (fbpoptsobj.sharedvideo==1))
    // we also add a check for classname "shareMediaVideo" to improve filter coverage
    headerTextFilter += ",shared a video,shared h.. video,shared their video,shared .*\'s video,shared .*\'s live video,shared \\d+ videos,reblogged a video";
 
  // liked video
  if((typeof fbpoptsobj.likedvideo!=='undefined') && (fbpoptsobj.likedvideo==1))
    headerTextFilter += ",liked a video,likes a video,likes .*\'s video,likes h.. own video, likes their own video,liked .*\'s video,likes .*\'s live video, reacted to .* video, reacted to a video";
  // commented video
  if((typeof fbpoptsobj.commentedvideo!=='undefined') && (fbpoptsobj.commentedvideo==1))
    headerTextFilter += ",commented on a video,commented on .*'s video,commented on .*'s live video";
  // youtube / vimeo videos
  if((typeof fbpoptsobj.youtubevideo!=='undefined') && (fbpoptsobj.youtubevideo==1)){
    extraTextFilter += ",youtube\.com,youtu\.be,vimeo\.com";
	headerTextFilter += ",shared \\d+ links on YouTube,shared a link on youtube";
  }

  //if(fbpoptsobj.hideallvideos==1)
  //  ; // we are dealing wtih this by  running a check on the node for the "shareMediaVideo" class
  //       should it also hide gifs? yes, because they are videos...

  //if(fbpoptsobj.hidealllinks==1)
  // Need to Add all links filter here?

// posted note
  if (typeof fbpoptsobj.postednote == "undefined")
    fbpoptsobj.postednote = 0;

  if(fbpoptsobj.postednote==1)
	headerTextFilter += ",posted a note,published a note";

//  tagged in note
  if (typeof fbpoptsobj.taggedinnote == "undefined")
    fbpoptsobj.taggedinnote = 0;

  if(fbpoptsobj.taggedinnote==1)
	headerTextFilter += ",tagged in a note,tagged in a Post,tagged in .* life event";

// Shared a memory
  if(fbpoptsobj.sharedmemory === "undefined")
	fbpoptsobj.sharedmemory=0;

  if (fbpoptsobj.sharedmemory ==1) {
	headerTextFilter+= ",Shared a memory,shared (h..|their) life event";
    extraTextFilter+= ",Friends on Facebook with .* for \\d+ Year,TodaySee Your Memories,Facebook!See your memories,yearinreview";
  }

//  Your memories
  if(fbpoptsobj.yourmemories === "undefined")
	fbpoptsobj.yourmemories=0;

  if (fbpoptsobj.yourmemories ==1)
	extraTextFilter+= ",Your Memories on Facebook,Years of Friendship on Facebook,Celebrate Your Friendship With,see more memories";

// new birthday posts in newsfeed
  if(fbpoptsobj.rcbirthdays ==1) {
	extraTextFilter+= ",Birthday: Today,Birthday: Yesterday,want to miss a chance to wish her a happy birthday,want to miss a chance to wish him a happy birthday,want to miss a chance to wish them a happy birthday,'s birthday video!";
	headerTextFilter+=",'s Birthday";
  }

// commented on this
  if (typeof fbpoptsobj.commentedonthis == "undefined")
    fbpoptsobj.commentedonthis = 0;

  if(fbpoptsobj.commentedonthis==1){
	headerTextFilter += ",commented on this\\.,replied to a comment,replied to .*'s comment";
	extraTextFilter+=",commented on this\\.";
  }

// tagged in this
  if (typeof fbpoptsobj.taggedthis == "undefined")
    fbpoptsobj.taggedthis = 0;

  if(fbpoptsobj.taggedthis==1)
	headerTextFilter += ", tagged in this";

// liked this
  if (typeof fbpoptsobj.likedthis == "undefined")
    fbpoptsobj.likedthis = 0;

  if(fbpoptsobj.likedthis==1)
	headerTextFilter += ",liked this\\.,liked this post, like. .*'s comment, liked a comment,reacted to this,likes .* activity,reacted to .* activity";

// posted link
  if (typeof fbpoptsobj.postedlink == "undefined")
    fbpoptsobj.postedlink = 0;

  if(fbpoptsobj.postedlink==1)
	headerTextFilter += ",shared link\\.,shared a link\\.,shared \\d+ links";

// read an article
  if (typeof fbpoptsobj.readarticle == "undefined")
    fbpoptsobj.readarticle = 0;

  if(fbpoptsobj.readarticle==1) {
	headerTextFilter += ",read an article, recently read articles\\., read \\d* articles\\., is trending\\.,· Trending";
	extraTextFilter += ",· Trending,Trending Articles,Trending Videos,Most Shared on ,Recent Articles About ";
  }

// facebook questions
  if(fbpoptsobj.questionsbox==1) {
    headerTextFilter += ", replied to: , asked: ,answered .*'s question,asked.*a question";
	extraTextFilter += ",· Ask friends ·";
  }

// hide sponsored stories in newsfeed
  if(fbpoptsobj.sponsoredbox==1) {
    extraTextFilter += ",Recently Released Albums,Get Offer ·,Pages You May Like,Links you may like,Page Stories you may like,Sponsored ·";//,Â·
	headerTextFilter += ", claimed an offer from, posted an offer";
	fbpfreestyle.textContent += ' #contentArea div[data-dedupekey][data-ft*=\'"ei":\'],div[data-ft*=\'"ei":\'],#contentArea div[data-xt]:not([data-xt*="module"]):not([data-xt*="recent_activity_story"]):not([data-xt*="ProfileTilesTimelineUnit"]):not([data-xt*="cover_photo"]):not([data-xt*="intro_card"]):not([id^="mall_post_"]) {display:none}';
  }

  if(fbpoptsobj.nonags==1) { 
    // facebook celebrates "x" day today type posts
	extraTextFilter +=",app-facebook";
  }

// disable auto tag suggestions
  if (fbpoptsobj.tagsuggestions) {
    fbpfreestyle.textContent +=' html.fbpstopautotags div.uiTypeaheadView {display:none} html.fbpstopautotags div.uiInlineTokenizerView html.fbpstopautotags div.uiContextualLayerPositioner ul._599r {display:none} html.fbpstopautotags div.uiContextualLayerPositioner ul._5u8_ {display:none} {display:block !important}';
  }

if(!fbpoptsobj.smileys){  // hide (duplicated) ascii smiley unless we have the hide smileys option turned on. (hide colour statuses caused the duplicated smileys bug to reappear)
  fbpfreestyle.textContent +=' span._4mcd, span._skr, span._7oe {display:none}'; 
}
// fix font size
  if(fbpoptsobj.fontfix==1) {
	fbpfreestyle.textContent +='div.actorName{display:inline;margin-right:3px !important} a.subject,div.preview,.mall_post_body_text,div,span,p,textarea,input,select,td,label,h3,h4,h5,h6{font-size:' + fbpoptsobj.fontsize + 'px !important} ' + 'div.commentContent {font-size:' + (fbpoptsobj.fontsize-1) +'px !important}' + ' .ginormousProfileName { font-size: 20px !important} ' + ' .emote_text {display:none}' + ' div.tickerFeedMessage, div.linkWrap,#facebook div.userContentWrapper ._6m3 ._6mb.ellipsis {line-height:' + fbpoptsobj.fontsize + 'px !important} div.userContent i span.accessible_elem, span.UFICommentBody i span.accessible_elem { overflow: inherit !important}';
  }

// fix font colour
  if(fbpoptsobj.fontcolourfix==1) {
	fbpfreestyle.textContent +=' * {color:' + fbpoptsobj.fontcolour + ' !important} #photos_snowlift div.snowliftOverlayBar {background-color:rgba(255,255,255,0.4) !important} div.tooltipContent {background-color:grey !important}'; //span.fwb {color:' + fbpoptsobj.fontcolour + ' !important}';
  }

// fix font background colour
  if(fbpoptsobj.fontbgcolourfix==1) {
  fbpfreestyle.textContent +=' * {background-color:' + fbpoptsobj.fontbgcolour + ' !important} .uiSideNav .item {border-bottom:1px solid #999} .fbChatSidebar .fbFeedTicker .fbFeedTickerStory {border-top-color: #999 !important} .fbFeedTicker .tickerStoryActive, .fbFeedTicker .tickerStoryClickable:hover { background-color:#999 !important} ._5uch { border-bottom: 1px solid #999 !important} ._585- {-webkit-box-shadow: inset 0 0 0 1px #999, inset 0 1px 0 0 #999, 0 -1px 0 0 #999 !important} .uiBoxLightblue { border: 1px solid #777 !important } .uiListLight { border-color: #333; } textarea, .inputtext, .inputpassword { border: 1px solid #555} .uiUfi .ufiItem { border-bottom: 1px dotted darkgray} n.tagsWrapper *, #fbPhotoTheaterTags, .tagsWrapper, .fbPhotosPhotoTagboxes *, #fbPhotoTheaterStageActions, .fbQuestionsPollClickTarget, .fbPhotosPhotoTagboxes, .flashUploaderOverlayButton, .fluploader_swfdiv, .coverBorder, .frame, .mat, .graph-canvas, .overlay, span.label, div.label, span.fwb ,#snowliftStageActions, .fbPhotoTagger, .faceBox, .typeaheadWrapper, .groupsJumpCoverBorder, .-cx-PRIVATE-uiFileInput__wrap, #fullScreenSwitch, #fbProfileCoverPhotoSelector, #fbProfileCoverPhotoSelector .wrap, #fbProfilePicSelector, #fbProfilePicSelector .wrap, .snowliftPager, .snowliftPager i, a.fbPhotoViewLarger, div._7m4, #pagelet_timeline_medley_events *, div.userContentWrapper a, #fbProfilePicSelector > div, #fbProfilePicSelector > div > a, div.friendName, body.timelineLayout div.fbPhotoCurationControlWrapper div, div[role="article"] *, div.userContentWrapper a i, #stream_pagelet div.clearfix a, #notifications_stream *, ._5mo7,._5mo5,._452y, ._3251, div.videoStage *,div._53j5 *, div._3uzl, div._jfi {background-color:transparent !important} .fbQuestionsPollResultsBar .shaded, .bar {background-color: #6C83B2 !important}  .tagName, ol.balancingCapsule, div.fbTimelineFilters, ol.fbTimelineCapsule {background-color: ' + fbpoptsobj.fontbgcolour + ' !important} .hasSmurfbar #blueBarHolder #blueBar {background-image:url("") !important} /* like button: */ div._55k4, /*camera icon under composer*/ div._3jk , /* profile pic*/ i._96h, /* group count in left column*/ div.-cx-PRIVATE-blendedBookmarksNonLitestand__bookmark, div._5duc, div[data-reactid], #fbTimelineHeadline div.actions, #fbTimelineHeadline div.actionsDropdown, div.cover *, div.fbPhotoCurationControl, ._5b_0, /* pics on notification page*/ ._ohf.rfloat>div>div:nth-child(2) {background-color:transparent !important} /* attach image to comment icon*/ i.UFICommentPhotoIcon, div.userContentWrapper form.commentable_item div.UFICommentStickerIcon, div.userContentWrapper form.commentable_item span.UFICommentPhotoIcon {background-color:lightgrey !important} form.fbCalendarActions a[role="button"], div.fbCalendarHeader a[role="button"],div.fbCalendarHeader button {background-image: none} body.timelineLayout a.friendHovercard .name, ._5b_0 div { background-color: rgba(255,255,255,0.2) !important} div#fbProfileCover *, div[data-ft=\'{"tn":"H"}\'] i, div.listSection a.blockClick, div.listSection a.viewProfile {background-color:transparent !important} div#fbProfileCover span, div#fbProfileCover div.fsxxl {background-color: rgba(149,149,149,0.3) !important} #blueBar {background-image:none !important } #blueBarDOMInspector>div, #blueBarDOMInspector div[role="banner"] {background-image:none !important} img._4-od {z-Index:10} a[aria-label="Press Esc to close"] {z-Index:11} #pagelet_web_messenger a[rel="theater"] div, #ChatTabsPagelet a[rel="theater"] div, /* group stuff*/ #pagelet_group_ div._jfi, div._1hkb, div._5n01, div._4hsn ,div._4hsm,div._1li5,div._1av3,div._4ev6, div[role="heading"] a, a[rel="theater"] *, a[data-video-id] *, div.scaledImage > div {background-color:transparent !important} #BuddylistPagelet div._5bon>div._568z span,#pagelet_sidebar div._5bon>div._568z span {background: rgb(66, 183, 42) !important; border-radius: 50%; display: inline-block; height: 6px; margin-left: 4px; width: 6px} body.timelineLayout a[data-testid="upload_photo_button"],body.timelineLayout div.autofocus,body.timelineLayout a[data-action-type="take_photo"],body.timelineLayout a[data-tooltip-content="Edit Thumbnail"], div._4-oi, div._3h_t[role="banner"],#globalContainer div.leaflet-map-pane svg {background-color:transparent !important} #pagelet_dock a.fbNubButton span.label {background-color:'+ fbpoptsobj.fontbgcolour +' !important} /* video volume control */ div._2-mn {background-color:#4080ff !important} div._2-ml{background-color:rgba(255,255,255,0.5) !important}';
	//console.log(fbpoptsobj.fontbgcolour);
	if(fbpoptsobj.fontbgcolour=='#000000' || (fbpoptsobj.fontbgcolour=='black')) // ensure notification icons are invisible
	  fbpfreestyle.textContent += ' #pagelet_bluebar a.jewelButton>div, #userNavigationLabel,#pagelet_bluebar a[data-testid="privacy_lite_jewel_button_test_id"] > div {background-color: #444444 !important} #pagelet_sidebar div.fbChatTypeahead a {background-color:lightgrey !important} #pagelet_sidebar div.fbChatTypeahead input {background-color:#f6f7f9 !important}';
	if(fbpoptsobj.fontcolourfix)
	  fbpfreestyle.textContent +=  ' a[href*="?sk=insights&section=navPosts"] {color:' + fbpoptsobj.fontbgcolour + " !important}";
  }
  else { // make sure fbp options screen has a white background in case user is using 
    fbpfreestyle.textContent += ' #fbpoptsdiv {background-color:white !important}';
  }

  // #photos_snowlift div.snowliftOverlayBar (photo info bar in theatre mode, if font colour is set, we may need to change colour of this bar, maybe transparent white)

// fix link colour
  if(fbpoptsobj.linkcolourfix==1) {
	fbpfreestyle.textContent+=' a {color:' + fbpoptsobj.linkcolour + ' !important}'; //span.fwb {color:' + fbpoptsobj.fontcolour + ' !important}'; #photos_snowlift div.snowliftOverlayBar {background-color:rgba(255,255,255,0.4) !important}
  }   
  // fix font 
  if(fbpoptsobj.fbpfontfix==1) {
	fbpfreestyle.textContent +=' * {font-family:' + fbpoptsobj.fbpfont + ' !important}';
	//fbpfreestyle.textContent +=' @import url(http://fonts.googleapis.com/css?family=' + fbpoptsobj.fbpfont.replace("'",'','g').replace(/'"','','g'/).replace(/ /,'','g') + ') \n\n* {font-family:' + fbpoptsobj.fbpfont + ' !important} ';
  }

  // web font stuff
  if(fbpoptsobj.fbpwebfontfix==1) {
	fbpfreestyle.textContent += " * {font-family:'" + fbpoptsobj.fbpwebfont + "',sans-serif !important} .fbPhotoStarGridElement {display: block !important}";
  }

  // freeze top navbar
  if(fbpoptsobj.freezetopnav) {
    fbpfreestyle.textContent +=' #blueBarDOMInspector>div {height:auto;position:fixed !important} #contentArea, #rightCol,#headerArea,#pages_manager_top_bar_container{margin-top:30px !important}';
  }

  // top navbar colour
  if(fbpoptsobj.topnavcolourfix==1 && (typeof(fbpoptsobj.topnavcolour)!="undefined") && (fbpoptsobj.topnavcolour!="")) {
    fbpfreestyle.textContent +=' #blueBarDOMInspector>div, #blueBarDOMInspector div[role="banner"], #fb2k_pagelet_bluebar>#blueBarDOMInspector>div>div {background-color:' + fbpoptsobj.topnavcolour  +' !important; background-image:none!important }';
    if(fbpoptsobj.topnavcolour=='#000000' || (fbpoptsobj.topnavcolour=='black')) // ensure notification icons arent invisible
	  fbpfreestyle.textContent += ' #pagelet_bluebar a.jewelButton>div, #userNavigationLabel,#fb2k_pagelet_bluebar a.jewelButton {background-color: rgba(255,255,255,0.2) !important}';
  }
  // top navbar font colour
  if(fbpoptsobj.topnavfontcolourfix==1 && (typeof(fbpoptsobj.topnavfontcolour)!="undefined") && (fbpoptsobj.topnavfontcolour!=""))
    fbpfreestyle.textContent +=' #blueBarDOMInspector * {color:' + fbpoptsobj.topnavfontcolour + ' !important} '; //#blueBarNAXAnchor

  // background image
  var tmpbgimg;
  if(fbpoptsobj.backgroundimagefix==1 && (typeof(fbpoptsobj.backgroundimage)!="undefined") && (fbpoptsobj.backgroundimage!="") && (fbpoptsobj.backgroundimage.match(/^https:\/\//))) {
	//if(!fbpoptsobj.backgroundimage.match(/^https\:\/\//)) 
	//  tmpbgimg='https://www.fbsbx.com/animated.php?url='+fbpoptsobj.backgroundimage;
	//else 
	tmpbgimg=fbpoptsobj.backgroundimage;
	fbpfreestyle.textContent +=" body { background-attachment: fixed !important; background-image:url('" + tmpbgimg + "') !important} #contentCol, #content div._fbEventsPermalink__mainColLayout {background-color:transparent !important} div.homeSideNav, div[id*='PagePostsSectionPagelet'] a.uiMorePagerPrimary, #timeline_tab_content_extra a.uiMorePagerPrimary, #sideNav, #switchsortmsg, div#fbTimelineLogBody div[id*='month_'], div#sharerDialog textarea, #sharerDialog div._8yb *, body.pagesTimelineLayout #mainContainer div._5ss8, #browse_lhc_filter_pagelet div.fixed_always {background-color:rgba(255,255,255,0.4) !important} div#sharerDialog textarea, #sharerDialog div._8yb * {color:black !important} #pagelet_welcome_box a, #pagelet_bookmark_nav h4.navHeader, div[id*='PageScrubberPagelet_'], #fbxPhotoContentContainer div.photoDetailsContainer, #pageFooter div[role='contentinfo'],#fbPhotoPageHeader a, #fbPhotoPageHeader .uiHeaderTitle, #rightColContent ul.fbTimelineScrubber, div#sharerDialog div.UIShareStage_ShareContent, #pagelet_pinned_posts, #pagelet_event_composer div div, li.adminableItem,div.fbProfileBrowserResult, body.plugin div._3-8y {background-color:rgba(255,255,255,0.5)} #fbxPhotoContentContainer td.stageContainer {background-color:rgba(255,255,255,0.2)} #fbxPhotoContentContainer div.fbPhotoContributor>div {background-color:white} div[id*='PageScrubberPagelet_'] *, #SettingsPage_Content span.fbSettingsListItemContent {color:#333} #sideNav h4.navHeader>a, #event_left_navigation h4.navHeader, #pagelet_welcome_box a.fbxWelcomeBoxName, div#sharerDialog textarea, #pagelet_pinned_posts span, #pagelet_event_composer div div {color:black} #event_this_week_nav a, #event_this_week_nav span, #rightColContent ul.fbTimelineScrubber a, div[id*='PagePostsSectionPagelet'] a.uiMorePagerPrimary, #timeline_tab_content_extra a.uiMorePagerPrimary, #sideNav div.bookmarksNavSeeAll, #pagelet_main_column_personal li.sideNavItem *, #pagelet_main_column_personal div.actionLinks * {color:#141823} body > pre, #SettingsPage_Content, .uiHeaderTitle, div.UIFullPage_Container, div.core,#blog_right_column,#blog_main_column, li.notification, #fbpsgdiv, #topstoriesdiv, div.invite_history, div.filtermatchtext {background-color: rgba(255,255,255,0.8) !important} #profile_page_insights_hubble ._5xyo a { background-color: rgba(255,255,255,0.4); color: black !important}"; //#fbPhotoPageCaption, #fbPhotoPageAuthorName, #fbPhotoPageFeedback, #fbPhotoPageTagList,

  }
// top nav background image
  var tmpnavbarbgimg;
  if((fbpoptsobj.topnavimagefix==1) && (fbpoptsobj.backgroundimagefix==1) && (typeof(fbpoptsobj.backgroundimage)!="undefined")) {
    fbpfreestyle.textContent +=" #pagelet_bluebar > div:not(id) > #blueBarDOMInspector > div, #pagelet_bluebar > #blueBarDOMInspector div[role='banner'], #fb2k_pagelet_bluebar>#blueBarDOMInspector>div>div { background-image:url('" + tmpbgimg + "') !important; }";
  }

  // stretch background image
  if(fbpoptsobj.stretchbkgimg) {
    fbpfreestyle.textContent +=' body {background-size:100% 100% !important; background-repeat:no-repeat !important} #pagelet_bluebar > div:not(id) > #blueBarDOMInspector > div, #pagelet_bluebar > #blueBarDOMInspector div[role="banner"] { background-size:100% !important;  background-repeat:no-repeat !important }';
  }
  // transparent newsfeed
  if(fbpoptsobj.transnewsfeed) {
    fbpfreestyle.textContent +=' #BuddylistPagelet div.fbNubFlyoutBody, #pagelet_sidebar div.fbChatSidebar, #rightCol div.cardRightCol, #pagelet_composer>div, div.fbpnormal,div.fbpblocked,div.fbpblockedx, div.questionsFeedback  { background-color: rgba(255,255,255,0.8) !important } div.UFIContainer,div.UFILikeSentence, div.UFIRow,#pagelet_rhc_ticker div.fbFeedTickerStory, #contentArea div[data-dedupekey]>div,#contentArea div[data-dedupekey]>div>div, #pagelet_composer>div>div , #pagelet_composer div._2dck._4-u3._4-u8 {background-color:transparent !important} #pagelet_composer div._1mwp._1mwq._4c_p._5bu_._5yk1, div.UFIAddCommentInput {background-color:rgba(255,255,255,0.6) !important}';
  }
  // hide searchbox
  if(fbpoptsobj.hidesearchbox) {
    fbpfreestyle.textContent +=' #blueBarDOMInspector div[role="search"], #searchBarClickRef {display:none}';
  }
  // hide padlock
  if(fbpoptsobj.hidepadlock) {
    fbpfreestyle.textContent +=' #navPrivacy, #blueBarDOMInspector a[data-testid="privacy_lite_jewel_button"], /* Hide quick help icon in top nav bar */ #pagelet_bluebar a[data-tooltip-content="Quick Help"] {display:none}'; // #blueBarDOMInspector a[aria-label="Privacy Shortcuts"],#blueBarDOMInspector a[data-tooltip-content="Privacy Shortcuts"],
  }
  // hide newsfeed
  if(fbpoptsobj.newsfeed) {
    fbpfreestyle.textContent +=' body.newsfeed #stream_pagelet {opacity:0} #navItem_4748854339 {display:none} #stream_pagelet:after {content: "You have selected the Hide Newsfeed option in FB Purity"}' ;//#pinnedNav li.selectedItem {display:none} ';
	//fbpfreestyle.textContent +=' #stream_pagelet div[id^="topnews_main_stream_"] {opacity:0} div._4-u2.mvm._495i, #fbpurityinfowrapper {display:none !important}'; // hiding the fbpurity bar caused other issues 
  }
  // hide home link
  if(fbpoptsobj.homelink) {
    fbpfreestyle.textContent +=' #blueBarDOMInspector a[data-gt*="home_chrome"] {display:none}';
  }
  // hide home link counter
  if(fbpoptsobj.homelinkcounter) {
    fbpfreestyle.textContent +=' #blueBarDOMInspector a[data-gt*="home_chrome"] div {display:none}';
  }
  // hide left column counters
  if(fbpoptsobj.leftcolumncounters) {
    fbpfreestyle.textContent +=' span.uiSideNavCount, #sidebar_navigation_top a div > div, #sideNav span.countValue, body.timelineLayout div[role="article"] div._34mw {display: none !important}';
  }
  // hide the like page button
  if(fbpoptsobj.likepagebutton==1) {
    fbpfreestyle.textContent +=' div.uiStreamShareLikePageBox  div.uiPageLikeButton, div.genericStreamStory a.PageLikeButton, div[data-dedupekey] span.PageLikeButton, div.shareFooter .shareLikeButton, #pagelet_litestand_section a.PageLikeButton, div.shareRedesign label.PageLikeButton, div.userContentWrapper button.PageLikeButton  {display:none} ';
  }
  // Custom Reactions
  var reactarr=["Like","Love","Haha","Wow","Sad","Angry"];
  //var reactarr2=["like","love","haha","wow","sorry","anger"];
  var reactarr2=["_3j7l","_3j7m","_3j7o","_3j7n","_3j7r","_3j7q"];
  var reactarr3=["0 -144px","0 -192px","0 -95px","0 -288px","0 -240px","0 0"]; // positions used for larger size
  var reactprefixlarge="._2jry i._9-_";
  var reactprefixsmall="i._9--";
  var reactSVGIndex=[1,2,4,3,7,8]; // more SVG SHiZ
  var reactimagearr;
  if ((typeof(fbpoptsobj.reactionsboost)!="undefined") && fbpoptsobj.reactionsboost==1) {
	  fbpfreestyle.textContent += '._iuy ._39n {transform: scale(4, 4) translate(0, -6px) !important}';
  }
  if((fbpoptsobj.reactionsimagepackfix==1) && (typeof(fbpoptsobj.reactionsimagepack)!="undefined") && fbpoptsobj.reactionsimagepack!='') {
	if(!fbpoptsobj.reactionsimagepack.match(/\,/)){
      //fbpfreestyle.textContent +=' i._iuz { background-image: url(' + fbpoptsobj.reactionsimagepack + ') !important;} i._2p7a { background-image: url(' + fbpoptsobj.reactionsimagepack + ') !important;background-size:99% !important} i._2p7a.like{ background-position: 0 -48px !important;} i._2p7a.anger{ background-position: 0 0 !important} i._2p7a.haha{ background-position: 0 -32px !important} i._2p7a.sorry{ background-position: 0 -80px; !important} i._2p7a.love{ background-position: 0 -64px; !important} i._2p7a.wow{ background-position: 0 -98px; !important}';
      //fbpfreestyle.textContent +=' i._iuz { background-image: url(' + fbpoptsobj.reactionsimagepack + ') !important;} i._2p7a { background-image: url(' + fbpoptsobj.reactionsimagepack + ') !important;background-size:99% !important} i._2p7a._3j7l{ background-position: 0 -47px !important;} i._2p7a._3j7q{ background-position: 0 0 !important} i._2p7a._3j7o{ background-position: 0 -31px !important} i._2p7a._3j7r{ background-position: 0 -79px; !important} i._2p7a._3j7m{ background-position: 0 -63px; !important} i._2p7a._3j7n{ background-position: 0 -94px; !important}';
	  // small sizes

	  // START DEAL WITH SVG SHIZ
	  fbpfreestyle.textContent +=' span._iuw svg {display:none}';
      fbpfreestyle.textContent +=' span._iuw>div>div>div[style] {background-image:url(' + fbpoptsobj.reactionsimagepack + ')}';
	  // END DEAL WITH SVG SHIZ // ',' + reactprefixsmall.replace(/--$/,'-y') +  (fix for individual reaction icon, but they are 13x13 which screws up the positioning)
      fbpfreestyle.textContent +=' ' + reactprefixsmall + ' { background-image: url(' + fbpoptsobj.reactionsimagepack + ') !important;background-size:99% !important} i._2p78._3j7l{ background-position: 0 -47px !important} i._2p78._3j7q{ background-position: 0 0 !important} i._2p78._3j7o{ background-position: 0 -31px !important} i._2p78._3j7r{ background-position: 0 -79px !important} i._2p78._3j7m{ background-position: 0 -63px !important} i._2p78._3j7n{ background-position: 0 -94px !important}';
	  // large (medium) sizes
	  for(i=0;i<reactarr2.length;i++) {
	    fbpfreestyle.textContent += ' ' + reactprefixlarge + '.' + reactarr2[i] + '{background-image: url(' + fbpoptsobj.reactionsimagepack + ') !important; ' + 'background-position: ' + reactarr3[i] + '!important}' ;
		// START Deal with new style SVG shiZ
		fbpfreestyle.textContent += ' ' + 'span._iuw>div[data-reaction="' + reactSVGIndex[i] + '"]>div>div[style] {background-position: ' + reactarr3[i] + '!important}';
		// END Deal with new style SVG shiZ
	  }
	  fbpfreestyle.textContent +=' i._9-y._3j7l {background-image: url(' + fbpoptsobj.reactionsimagepack + ') !important; background-size: 99% !important; height:16px;width:16px}'; // fix for like icon on comments
    } 
    else {
	  reactimagearr=fbpoptsobj.reactionsimagepack.split(",");
	  // START DEAL WITH SVG SHIZ
	  fbpfreestyle.textContent +=' span._iuw svg {display:none}';
      fbpfreestyle.textContent +=' span._iuw>div>div>div[style] {background-image:url(' + fbpoptsobj.reactionsimagepack + ')}';
	  // END DEAL WITH SVG SHIZ
	  for(i=0;i<reactimagearr.length;i++){
		//fbpfreestyle.textContent +=' span[aria-label="' + reactarr[i] + '"] i._2p78 {background-image: url(' + reactimagearr[i] + ') !important;background-position:0 0 !important} ._2p78._9--.'+ reactarr2[i] +' {background-image:url(' + reactimagearr[i] + ') !important;background-size:16px 16px !important;background-position:0 0 !important} ';
		fbpfreestyle.textContent +=' ' + reactprefixlarge + '.' + reactarr2[i] + '._2p78 {background-image: url(' + reactimagearr[i] + ') !important;background-position:0 0 !important} ' + reactprefixsmall + '._2p78.' + reactarr2[i] +' {background-image:url(' + reactimagearr[i] + ') !important;background-size:16px 16px !important;background-position:0 0 !important} ';
		// START Deal with new style SVG shiZ
		fbpfreestyle.textContent += ' ' + 'span._iuw>div[data-reaction="' + reactSVGIndex[i] + '"]>div>div[style] {background-image: url(' + reactimagearr[i] + ') !important;background-position:0 0 !important}';
		// END Deal with new style SVG shiZ
	  }
	  fbpfreestyle.textContent +=' .x2 ._2p78 {background-size:inherit !important}'; // fix for retina
	  fbpfreestyle.textContent +=' i._9-y._3j7l {background-image: url(' + reactimagearr[0] + ') !important; background-size: 99% !important; height:16px;width:16px;background-position:0 0 !important}'; // fix for like icon on comments
    }
  } // end if reactions

  var lcoptsarr="wholeleftcolumn,colouredbg,lcadvertmgr,lcconnect,lcallpages,lcpagesfeed,lclikepages,lcallapps,lcappcenter,lceditprofile,lcevents,lcgamesfeed,lcpokes,lcmusic,lcplaceseditor,lcallgroups,lccreategroup,lccreatepage,lcfindfriends,lcfindnewgroups,lcdeveloper,lcfundraisers,lcfriends,lconthisday,lcbrowse,lcfbpnews,lcwelcome,lcnotes,lclinks,lcoffers,lcmanagegroups,lcsaved,lcshops,lcsuggested,lcsuggestedits,lccreateevent,lcphotos,lcsalegroups,lcpayments,lclivemap,lcdiscovergroups,lcyourposts,lcmoments,lcrecommendations,lccreate,lcshortcuts,wholerightcolumn,rcrecommendedpages,rcrelatedgroups,rcpokes,rcbirthdays,rcfriendrequests,rcgamerequests,rcyourpages,rclive,rctodaysgames,catphoto,dogphoto,babyphoto,memephoto,selfiephoto,couplephoto,foodphoto,smokingphoto,customphotoblocklistfix,imagetagsonhover,chatquickcambutt,chatplaygamebutt,typingcomment,seemoreexplore,seemoreshortcuts".split(','); // lcfbiphone,lcfbandroid,lcfundraiserscreate,lcfundraisersfind,lcallinterests
  for(var b=0;b<lcoptsarr.length;b++)
    if (typeof fbpoptsobj[lcoptsarr[b]] == "undefined")
      fbpoptsobj[lcoptsarr[b]]=0;

    // start left column options
	if(fbpoptsobj.wholeleftcolumn==1)
      fbpfreestyle.textContent +=' #leftCol {display:none !important}';
		
	if(fbpoptsobj.colouredbg==1) // neutralise coloured status updates
	  fbpfreestyle.textContent+=' div.userContent span{font-size:inherit !important;font-weight:inherit!important;padding:inherit !important;color:inherit!important;background-color:inherit !important;text-align:inherit!important;padding-left: 6px !important} div.userContent div{background-image:inherit !important;background-color:inherit !important;}';
   
    if(fbpoptsobj.lcconnect==1)
      fbpfreestyle.textContent +=' #connectNav {display:none !important}';

    if(fbpoptsobj.lcallpages==1)
      fbpfreestyle.textContent +=' #pagesNav, #sidenav a[href="/bookmarks/pages"],#navItem_2530096808 {display:none !important}';

    if(fbpoptsobj.lcallapps==1)
      fbpfreestyle.textContent +=' #appsNav, #sidenav a[href="/bookmarks/apps?ref=bookmarks"] {display:none !important}';

    if(fbpoptsobj.lcallgroups==1)
      fbpfreestyle.textContent +=' #groupsNav, #sidenav a[href^="/groups/?category=membership"],#navItem_1434659290104689, #navItem_139518143156711 {display:none !important}';

    /* no longer needed since fb retired interest lists
	if(fbpoptsobj.lcallinterests==1)
      fbpfreestyle.textContent +=' #interestsNav, #navItem_1558938261022542 {display:none !important}';
    */

    if(fbpoptsobj.lcfriends==1)
      fbpfreestyle.textContent +=' #listsNav, #navItem_1572366616371383 {display:none !important}';

    if(fbpoptsobj.lcadvertmgr==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="400915586638539"], #adsNav, #navItem_400915586638539, #uiLeftNavFoldItem_6802152230, #uiLeftNavFoldItem_400915586638539, #createNav a[href^="/campaign/landing.php"]  {display:none !important}';

    if(fbpoptsobj.lcpagesfeed==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="140472815972081"], #navItem_140472815972081, #uiLeftNavFoldItem_140472815972081 {display:none !important}';

//	if(fbpoptsobj.lcpagesandpublicfigures==1)
//	  fbpfreestyle.textContent += ' '; // removed because code is different for each user

    if(fbpoptsobj.lclikepages==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="357937250942127"], #navFindFriends, #navItem_357937250942127, #uiLeftNavFoldItem_357937250942127 {display:none !important}';

    if(fbpoptsobj.lcappcenter==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="140332009231"], #navItem_140332009231, #uiLeftNavFoldItem_140332009231 {display:none !important}';

    if(fbpoptsobj.lcevents==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="2344061033"], #eventsNav, #navItem_2344061033, #sidenav a[href^="/events/upcoming?ref="], div[id^="PageEventsContainerPagelet_"]  {display:none !important}';

    if(fbpoptsobj.lceditprofile==1)
	  fbpfreestyle.textContent += ' #pagelet_welcome_box li.fbxWelcomeBoxSmallRow:nth-child(2) {display:none !important}';
  
    if(fbpoptsobj.lcgamesfeed==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="261369767293002"], #navItem_261369767293002, #uiLeftNavFoldItem_261369767293002 {display:none !important}';

    if(fbpoptsobj.lcpokes==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="183217215062060"], #navItem_183217215062060, #uiLeftNavFoldItem_183217215062060 {display:none !important}';

    if(fbpoptsobj.lcmusic==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="119960514742544"], #navItem_119960514742544 {display:none !important}';

    if(fbpoptsobj.lcplaceseditor==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="219124168114356"], #navItem_219124168114356 {display:none !important}';

	if(fbpoptsobj.lcphotos==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="2305272732"], #navItem_2305272732, #uiLeftNavFoldItem_2305272732 {display:none !important}';

    if(fbpoptsobj.lccreategroup==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="230259100322928"], #navItem_230259100322928, #uiLeftNavFoldItem_230259100322928, #createNav a[ajaxify^="/ajax/groups/create_get.php"] {display:none !important}';

	if(fbpoptsobj.lccreateevent==1)
	  fbpfreestyle.textContent +=' #eventsNav div[data-itemid="704148512977427"], #navItem_704148512977427, #uiLeftNavFoldItem_704148512977427, #createNav a[ajaxify^="/events/dialog/create/"] {display:none !important}';

    if(fbpoptsobj.lccreatepage==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="188619144602540"], #navItem_188619144602540, #uiLeftNavFoldItem_188619144602540, #createNav a[href^="/pages/create/"] {display:none !important}';

    if(fbpoptsobj.lcfindfriends==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="2356318349"], #findFriendsNav, #navItem_2356318349 {display:none !important}';

	if(fbpoptsobj.lcfindnewgroups==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="637803516301738"], #navItem_637803516301738, #navItem_983686418327131, #uiLeftNavFoldItem_983686418327131 {display:none !important}'

    if(fbpoptsobj.lcdeveloper==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="2345053339"], #developerNav, #navItem_2345053339, #sideNav a[href="https://developers.facebook.com/apps/724415894355608"]  {display:none !important}';

    if(fbpoptsobj.lcfundraisers==1)
      fbpfreestyle.textContent +=' #fundraisersNav,#sideNav li[data-nav-item-id="1728089634133276"],#sideNav li[data-nav-item-id="245113592539937"],#navItem_1728089634133276,#navItem_245113592539937,#navItem_193356651002223, #createNav a[ajaxify^="/fundraiser/person_to_charity/create_dialog/"] {display:none !important}';
    /*
    if(fbpoptsobj.lcfundraiserscreate==1)
      fbpfreestyle.textContent +=' #sideNav li[data-nav-item-id="1728089634133276"] {display:none}';
    if(fbpoptsobj.lcfundraisersfind==1)
      fbpfreestyle.textContent +=' #sideNav li[data-nav-item-id="245113592539937"] {display:none}';
    */
	if(fbpoptsobj.lconthisday==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="263908567073788"], #navItem_303257506544370, #uiLeftNavFoldItem_303257506544370 {display:none !important}';

	if(fbpoptsobj.lcbrowse==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="300909120010335"], #navItem_300909120010335 {display:none !important}';
    /*
  	if(fbpoptsobj.lcfbiphone==1)
	  fbpfreestyle.textContent +=' div[data-itemid="6628568379"], #navItem_6628568379 {display:none}';

  	if(fbpoptsobj.lcfbandroid==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="350685531728"], #navItem_350685531728 {display:none}';
    */
    if(fbpoptsobj.lcfbpnews==1)
	  //fbpfreestyle.textContent +=' #sideNav div[data-itemid="408502197558"], #navItem_page_408502197558 {display:none}';
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="' + FBPFanPageID + '"], #navItem_page_' + FBPFanPageID + ' {display:none}';

    if(fbpoptsobj.lcwelcome==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="156203961126022"], #navItem_156203961126022 {display:none !important}';

	if(fbpoptsobj.lcnotes==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="2347471856"], #navItem_2347471856, #uiLeftNavFoldItem_2347471856 {display:none !important}';

	if(fbpoptsobj.lclinks==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="2309869772"], #navItem_2309869772 {display:none !important}';

	if(fbpoptsobj.lcoffers==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="526732794016279"], #navItem_526732794016279 {display:none !important}';

 	if(fbpoptsobj.lcmanagegroups==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="1453691111529322"], #navItem_1453691111529322 {display:none !important}';

	if(fbpoptsobj.lcsaved==1)
	  fbpfreestyle.textContent +=' #sideNav div[data-itemid="586254444758776"], #navItem_586254444758776, #uiLeftNavFoldItem_586254444758776 {display:none !important}';

    if(fbpoptsobj.lcshops==1)
	  fbpfreestyle.textContent +=' #navItem_181728832201978 {display:none !important}';

	if(fbpoptsobj.lcsuggested==1)
	  fbpfreestyle.textContent += ' #suggestedNav {display:none !important}';

  	if(fbpoptsobj.lcsuggestedits==1)
	  fbpfreestyle.textContent += ' #sideNav div[data-itemid="219124168114356"], #navItem_219124168114356, #uiLeftNavFoldItem_219124168114356 {display:none !important}';
  
    if(fbpoptsobj.lcsalegroups==1)
	  fbpfreestyle.textContent += ' #sideNav div[data-itemid="1433252076974635"], #navItem_1433252076974635 {display:none !important}';

    if(fbpoptsobj.lcpayments==1)
      fbpfreestyle.textContent +=' #paymentsNav, #navItem_969105076459966 {display:none !important}'; 

    if(fbpoptsobj.lclivemap==1)
      fbpfreestyle.textContent +=' #navItem_1031093773624602 {display:none !important}'; 
  
    if(fbpoptsobj.lcdiscovergroups==1)
      fbpfreestyle.textContent +=' #navItem_1728807357362356 {display:none !important}';
  
    if(fbpoptsobj.lcyourposts==1)
      fbpfreestyle.textContent +=' #your_posts_bookmark, #pagelet_welcome_box a[href*="/allactivity"], #navItem_1567751916853788 {display:none !important}';

    if(fbpoptsobj.lcmoments==1)
      fbpfreestyle.textContent +=' #sideNav div[data-itemid="285162308271788"],#navItem_285162308271788 {display:none !important}';
  
    if(fbpoptsobj.lcrecommendations==1)
      fbpfreestyle.textContent +=' #navItem_577076605805053 {display:none !important}';

    if(fbpoptsobj.lccreate==1){
      fbpfreestyle.textContent +=' #createNav, ' +
    //create page
    '#sideNav div[data-itemid="188619144602540"], #navItem_188619144602540, #uiLeftNavFoldItem_188619144602540, #createNav a[href^="/pages/create/"],' +
    // create advert
    '#sideNav div[data-itemid="400915586638539"], #adsNav, #navItem_400915586638539, #uiLeftNavFoldItem_6802152230, #uiLeftNavFoldItem_400915586638539, #createNav a[href^="/campaign/landing.php"],' +
    // create group
    '#sideNav div[data-itemid="230259100322928"], #navItem_230259100322928, #uiLeftNavFoldItem_230259100322928, #createNav a[ajaxify^="/ajax/groups/create_get.php"],' +
    // create event
    '#eventsNav div[data-itemid="704148512977427"], #navItem_704148512977427, #uiLeftNavFoldItem_704148512977427, #createNav a[ajaxify^="/events/dialog/create/"], ' +
	// create a frame
	'#navItem_336549256737756 {display:none !important}';
	}
	
	if(fbpoptsobj.lcshortcuts==1)
	  fbpfreestyle.textContent +=' #pinnedNav {display:none}';
  
    // start hide right column options
	if(fbpoptsobj.wholerightcolumn==1)
      fbpfreestyle.textContent +=' #rightCol {display:none !important}';
	
	if(fbpoptsobj.rcrecommendedpages==1) // "recommended pages" and "PEOPLE ALSO LIKE"
      fbpfreestyle.textContent +=' #pages_reminders_link, div[id^="PageRelatedPagesSecondaryPagelet_"] {display:none !important}'

    if(fbpoptsobj.rcbirthdays==1)
      fbpfreestyle.textContent +=' #birthday_reminders_link, #pagelet_birthday_this_week, #pagelet_reminders a[ajaxify="/birthday/reminder/dialog/"] {display:none}'; // , #fbNotificationsFlyout li[data-gt*="\"notif_type\":\"birthday_reminder\""] // birthday notifications flyout. not sure if it works or not due to escaped quotes. needs testing

	if(fbpoptsobj.rcgamerequests==1)
      fbpfreestyle.textContent +=' #custom_reminders_link, #pagelet_canvas_nav_content, #pagelet_games_rhc, #pagelet_reminders div[id^="fbReminderAppReqStory_"], div.fbChatOrderedList i.sx_f985f5 {display:none !important}';

    if(fbpoptsobj.rcfriendrequests==1)
      fbpfreestyle.textContent +=' #friends_reminders_link {display:none !important}';

    if(fbpoptsobj.rcpokes==1)
      fbpfreestyle.textContent +=' #poke_reminders_link, #pagelet_pokes {display:none !important}';

    if(fbpoptsobj.rcrelatedgroups==1)
      fbpfreestyle.textContent +=' #pagelet_ego_contextual_group, div.groupRecommendationsList, #GroupsRHCSuggestionSection {display:none !important}';

    if(fbpoptsobj.rctodaysgames==1)
      fbpfreestyle.textContent +=' #live_games_rhc {display:none !important}';
  
	if(fbpoptsobj.widescreenfeed==1)
	  fbpfreestyle.textContent +=' html ._5vb_._5vb_.hasLeftCol .hasRightCol div#contentArea { width: 800px} #contentArea {position:absolute;top:5px !important} #rightCol {position:relative;left:330px} ._5v3q ._4-eo,._6m5,._6n_,._5vb_ ._5aqh, ._2a2q, div._5mly._45oh,uiScaledImageContainer _5ind {margin-left:auto; margin-right:auto}';

	if(fbpoptsobj.rcyourpages==1)
      fbpfreestyle.textContent +=' #pagelet_advertiser_panel, div._4-u2.mbm._5v6e {display:none}';

    if(fbpoptsobj.rclive==1)
	  fbpfreestyle.textContent +=' #pagelet_live_videos_v2 {display:none}';
  
    if((typeof(fbpoptsobj.groupconvos)!='undefined') && fbpoptsobj.groupconvos==1) {
	  fbpfreestyle.textContent += ' div.moreOnlineFriends[data-reactid$="$group_separator"]{display:none} li._42fz[data-reactid*="$group_threads"]{display:none}';
	}
	else {
	  fbpfreestyle.textContent += ' div.moreOnlineFriends[data-reactid$="$group_separator"]{display:block !important} li._42fz[data-reactid*=group_threads]{display:block !important}';
	}
	
	if(fbpoptsobj.newstickertextfilter) { //show the more stories button, otherwise it gets frozen
	  fbpfreestyle.textContent += ' div.tickerMorePager>div.uiMorePager {display:block !important}';
	}
    // hide useless bottom right footer + ads on login + logout screen + useless links in top nav bar
    fbpfreestyle.textContent += 'div.fbIndexFeaturedRegistration > div.lfloat, .-cx-PRIVATE-fbAdUnit__root, #SetAsHomepage_Callout, .gradientContent > div[data-ad^="{"], #findFriendsNav, #navFindFriends, div[data-ad]  {display:none !important} #pagelet_rhc_footer {display:none} #logout_form2:hover, #FBPBUTT:hover {background-color:rgba(0,0,0,0.1)}';

    // hide contact importer at bottom of feed
    fbpfreestyle.textContent += ' .contact_importer_widget {display:none} #ci_compact_right {display:none}';

    // add red border to publish permissions request and make light grey blurb black and bold
    fbpfreestyle.textContent += ' .permissionsPublishActionsBadge {border:4px solid red} .gdpBlurb {color:black !important ; font-weight:bold !important} .tosPane > .sectionContent, .tosPane .legalese, .tosPane .sectionHeader {color:black !important} .tosPane .mbm {color:black; border: 4px red solid}'; // .fcb > div,

    // add open and close list styles
    fbpfreestyle.textContent += ' span.fbpopenlist:before {content:"▼ "}  span.fbpclosedlist:before {content:"► "}';

	// fix text overflow on link descriptions
	fbpfreestyle.textContent +=' ._5qqr ._6m6, ._5qqr ._6m7 {white-space: normal}';
	
	// set background colour for fbp menu item
	fbpfreestyle.textContent +=' #FBPOptionsMenuLinkContainer:hover,#FBPOptionsMenuLinkContainer *:hover{background-color:#4267b2;color:white}';
	
	// fix status composer box
	fbpfreestyle.textContent +=' #contentArea div._3u15 {display:none}'; // was causing status box to hide behind posts for some people: #pagelet_composer div._3u14 div._3u16, #timeline_composer_container div._3u14 div._3u16 {z-index: initial} 
	
	// hide find friends link in top navbar
	fbpfreestyle.textContent +=' #blueBarDOMInspector a._5yf._2-do[href*="?sk=ff"], #blueBarDOMInspector a._5yf._2-do[href*="find-friends/browser"] {display:none}';
	
	// fix position of facebooks "hide" menu
	fbpfreestyle.textContent+=' ._423x {position:inherit !important}';
	
	// make font size for short statuses the same size as normal posts 
    fbpfreestyle.textContent+=' div._58jw { font-size: inherit !important}';

///////////////
/// END OPTS 
///////////////         

refreshwhitelist();

//unsafeWindow.console.log("etf= " + extraTextFilter);

var tmptextfilter='';
tmptextfilter=fbpoptsobj.customtextfilter;
if (tmptextfilter) 
  tmptextfilter += ',' + extraTextFilter; // add emergency extra text filter
else 
  tmptextfilter = extraTextFilter;

if( tmptextfilter.length ) {
  tmptextfilter=tmptextfilter.replace(/,,/g,','); // remove blanks (if any)
  tmptextfilter=tmptextfilter.replace(/,+$|^,+/g,'');  // remove trailing or leading commas
  cleancustomtextfilter=fbpescaperegex(tmptextfilter); // escape regex special chars (brackets)

  if(debug)
    console.log("textfilter string= " + cleancustomtextfilter);

  try {
    textfilterRX = new RegExp(cleancustomtextfilter.replace(/,/g,'|').replace(/&#44;/g,','),"gi"); // swap commas with pipes, change comma placeholders with actual commas + generate regex
  }
  catch (e)  {
    window.alert('F.B. Purity: Error building Custom Text Filter RegEx: ' +  fbpoptsobj.customtextfilter + "\n\nHave you pasted CSS code into the Text filter by mistake? If yes, go to the FBP options sceen, remove it and put it into the CSS Box instead.")
	textfilterRX=new RegExp("fbpurity1234567890xyz"); // set a dummy regex, so firefox browser doesnt freeze, and user can go and reset the fbp options
  }
}

//unsafeWindow.console.log('htf=' + headerTextFilter);

headerTextFilter=headerTextFilter.replace(/^,/,'');  // remove leading comma (if any)

if( headerTextFilter && headerTextFilter.length ) {
  try {
    headertextfilterRX = new RegExp(headerTextFilter.replace(/,/g,'|'),"gi");
  }
  catch (e)  {
    window.alert('F.B. Purity: regex error building header text filter : ' +  headerTextFilter);
    headertextfilterRX=null;
  }
}

//unsafeWindow.console.log(fbpoptsobj.customtextfilter);

if(fbpoptsobj.customphotoblocklistfix && fbpoptsobj.customphotoblocklist.length){
  photosubjectfilterlist+=fbpoptsobj.customphotoblocklist.replace(',','|');
}
if(fbpoptsobj.catphoto)
  photosubjectfilterlist+="|\\bcat\\b|\\bcats\\b";
if(fbpoptsobj.dogphoto)
  photosubjectfilterlist+="|\\bdog\\b|\\bdogs\\b";
if(fbpoptsobj.babyphoto)
  photosubjectfilterlist+="|\\bbaby\\b|\\bbabies\\b";
if(fbpoptsobj.memephoto)
  photosubjectfilterlist+="|\\bmeme\\b|\\btext\\b";
if(fbpoptsobj.selfiephoto)
  photosubjectfilterlist+="|\\bselfie\\b";
if(fbpoptsobj.couplephoto)
  photosubjectfilterlist+="|\\b2 people\\b.*\\bpeople smiling\\b";
if(fbpoptsobj.foodphoto)
  photosubjectfilterlist+="|\\bfood\\b";
if(fbpoptsobj.smokingphoto)
  photosubjectfilterlist+="|\\bsmoking\\b";
if(photosubjectfilterlist.length) {
  //console.log(photosubjectfilterlist);
  photosubjectfilterlist=photosubjectfilterlist.replace(/^\|/,'');
  photosubjectfilterlistRX = new RegExp(photosubjectfilterlist);
}

  fbpboxstyles='';

  // hide suggestions box if option has been set
  if (fbpoptsobj.suggestionsbox) {
    fbpboxstyles +=' #ego_pane {display:none} #netego_organic {display:none} #pagelet_tips_box {display:none}';
  }
  // hide Get Connected (was: connect with friends) box if option has been set
  if (fbpoptsobj.connectbox) {
    fbpboxstyles +=' #pagelet_netego_lower {display:none} #pagelet_connectbox {display:none}';
  }

  if (fbpoptsobj.betabox) {
    fbpboxstyles +=' #pagelet_betabox {display:none}';
  }

  if (fbpoptsobj.pokebox) {
    fbpboxstyles +=' #pagelet_netego_pokes, #pagelet_pokes,  #navItem_app_183217215062060 {display:none}';
  }

  if (fbpoptsobj.happeningnowbar) {
    fbpboxstyles +=' .ticker_stream, #pagelet_ticker, #pagelet_rhc_ticker {display:none}';
  }

  if(fbpoptsobj.newstoriesbutt) { // new stories popup button
	fbpboxstyles +=' ._2f6b { display:none !important}';
  }
  
  if(fbpoptsobj.typingcomment) {
	fbpboxstyles +=' div._j-l {display:none}';
  }

  if (fbpoptsobj.questionsbox) { // I think this option is no longer needed, and can be deleted...
    fbpboxstyles +=' #pagelet_netego_questions, #pagelet_questionsbox {display:none}';
  }

  if (fbpoptsobj.eventsbox) {
    fbpboxstyles +=' #event_reminders_link {display:none}'; // hide left column events too #navItem_app_2344061033 {display:none} just hide create event link #pagelet_reminders [ajaxify="/ajax/plans/create/dialog.php"] * { display: none !important;}
  }

  if (fbpoptsobj.requestsbox) {
    fbpboxstyles +=' #pagelet_netego_requests {display:none}';
  }

  if (fbpoptsobj.sponsoredbox) {
	fbpboxstyles +=' #stream_pagelet div[data-ownerid],#stream_pagelet div[data-ownerid]>div.mvm.clearfix, #stream_pagelet div[data-ownerid*="jsonp"], body.pagesTimelineLayout div._5lmx,div._5j5u,div[data-adblock-hash],div.megaphone_location_pages_feed, #pagelet_canvas_storybox, #pagelet_canvas_nav_content, .applifier, #side_ad_frame, .-cx-PRIVATE-suggestionOnLiking__body, .canvasRecommended, li.ownsection, li[aria-label="Sponsored"], #pagelet_adbox, #pagelet_search_ads2, #adcolumn_advertise, #ssponsor, #adcolumn_more_ads, #pagelet_friendship_netego_ads, #pagelet_ego_pane, .fbPhotosSideColumn, #pagelete_ego_pane_home_ads, #pagelet_ad_page_upsell, #fbPhotoSnowboxAdsBottom, .fbPhotoSnowboxAdsSponsored, .fbTimelineSideAds, #pagelet_ego_pane_m, #pagelet_organic_ego_pane, #pagelet_ego_pane_w, #pagelet_ads_when_no_friend_list_suggestion, #pagelet_side_ads, #fbPhotoSnowliftAdsSide, #MessagingNetegoSidebar, .-cx-PRIVATE-fbTimelineStyleAds__vertical, .-cx-PRIVATE-fbTimelineStyleAds__root, .-cx-PRIVATE-snowliftAds__root, ._24q, .rhcFooter, div[data-ad^="{"],.-cx-PRIVATE-suggestionOnSourceLiking__body, #endOfFeedPymlContainer, div[data-ad], #fbRequestsPYMLContainer, div._5t-6, div._2bex, ._4-u2._la, ._54bx._54bz, div[id^="PageAdsPagelet_"], #rightCol div._29vg._43mf, article[data-ft*=\'"ei"\'], #headerArea div._fbGamesDesktopAppInstaller__banner, div._1wcc, #pagelet_group_mall div[id^="mall_post_"][id*=";"] {display:none !important} #sidebar_ads, #pagelet_ads, #pagelet_netego_ads, .UIStandardFrame_SidebarAds, #gb_muffin_area, .adsContainer, .fbPhotoAdsCol {visibility:hidden !important} ';
  }
  else  {
    fbpboxstyles +=' #contentCol div[data-ad] {display:block !important}'; //fixes the fact login ads are being hidden when logged out so we need to override when logged in
  }

  if (fbpoptsobj.filterappmessages) { // hide app and game messages in the ticker.
	fbpboxstyles +=' div.fbFeedTickerStory[data-app] {display:none} ';
	// loop through app whitelist, and make exceptions.
	var tempappwhitelist='';
	for (var app in arrwhitelist2){
	  tempappwhitelist +=' div.fbFeedTickerStory[data-app="' + app + '"],';
	}
	if(tempappwhitelist.length)
	  fbpboxstyles += tempappwhitelist.replace(/,$/,'')+ ' {display:block !important}';
    tempappwhitelist=app=null;
  }
  
  if (fbpoptsobj.tlgamesapps) { // hide app and game messages on timeline pages
	//fbpboxstyles +=' body.timelineLayout #timeline_tab_content div[data-gt*="\"appid\":] {display:none}';
	fbpboxstyles +=' body.timelineLayout #timeline_tab_content div[data-gt*=\'"appid":\'] {display:none}';
	// make sure apps/games show up on current user's timeline page...
	fbpboxstyles +=' body.timelineLayout #pagelet_timeline_main_column[data-gt^=\'{"profile_owner":"' + currentuserid + '"\'] #timeline_tab_content div[data-gt*=\'"appid":\'] {display:block !important}'
	
	// loop through app whitelist, and make exceptions.
	var tempappwhitelist='';
	for (var app in arrwhitelist2){
	  tempappwhitelist +=' #timeline_tab_content div[data-gt*=\'"appid":' + app + '\'],'; //body.timelineLayout 
	}
	if(tempappwhitelist.length)
	  fbpboxstyles += tempappwhitelist.replace(/,$/,'')+ ' {display:block !important}';
    tempappwhitelist=app=null;
  }

  if (fbpoptsobj.chatbox) {
    fbpboxstyles +=' #pagelet_presence, #pagelet_friends_online, #pagelet_chat, #BuddylistPagelet, div.fbChatSidebarBody, #pagelet_sidebar div.fbChatSidebarMessage.clearfix {display:none}'; //  #ChatTabsPagelet  removed this cos it hampers ability to send direct messages via "hover over username / click message button" and also doesnt actually close the popup tab windows, just hides them
  }

  if (fbpoptsobj.hidesearchpopup) {
    fbpboxstyles +=' #facebar_typeahead_view_list ,div.litestandTypeaheadview[data-click="Search"]{display:none}';
  }

  if (fbpoptsobj.cookiespolicy) {
    fbpboxstyles +=' div[data-testid="cookie-policy-banner"] {display:none !important}';
  }
  
  if (fbpoptsobj.hidesearchtrending) {
    fbpboxstyles +=' #facebar_typeahead_view_list._21c._2yob, #blueBarDOMInspector div.injectedSearchSuggestion, div._21es {display:none}';
  }

  if( fbpoptsobj.hidefriendreqtopnav) {
    fbpboxstyles +=' #fbRequestsJewel, #fb2k_pagelet_bluebar a.jewelButton[data-gt=\'{"ua_id":"jewel:requests"}\'] {display:none}';
  }

  if (fbpoptsobj.fullscreenchat) {
  	fbpboxstyles +=' #ChatTabsPagelet {display:none}';
  }

  if (fbpoptsobj.trendingbox) {
    fbpboxstyles +=' #pagelet_trending_tags_and_topics, #under_composer_trending, #trending_reminders_link, div.userContentWrapper a[href^=\'/topic/\'][href*=\'?source=fttp\'], div.userContentWrapper a[href^=\'/topic/\'][href*=\'?source=ftp\'], div.userContentWrapper a[href*=\'facebook.com/hashtag/\'][href*=\'?source=ftp\'], div.userContentWrapper a[href*=\'facebook.com/hashtag/\'][href*=\'?source=fttp\'], div._5g-l, #topicFeedsNav {display:none} #rightCol div.cardRightCol {height:0px} #pagelet_reminders div.fbRemindersStory, #pagelet_friendlist_sidecol,#notes_pagelet, #pagelet_rhc_ticker {background-color:rgba(255,255,255,0.8)}';
  }

  if (fbpoptsobj.bubblechat) {
	fbpboxstyles +=' ._kso, ._5yt9, ._55r0{clear:both;float:none !important} div._5yt9 * {clear:both;float:none !important} div._5yt9  {float:none !important} .fbDockChatTabFlyout .fbNubFlyoutBody {background-color: #fff !important} div._5yt9, div._kso {font-family: inherit !important;font-size: inherit !important;line-height: inherit !important;color:inherit !important} div._5w1r { background: transparent none !important; border: none; border-radius: 0; box-shadow: none; text-shadow: none; color: #000; max-width:230px !important; width:auto !important } div._1nc7  {background-color:#dbedfe !important} ._5w1r::after,._5w1r::before {width:0px !important} ._1nc7 ._5ys_ { top: 5px; } ._5w1r { margin-left: 0px !important;padding-left: 0px !important; padding-right: 0px !important; padding-top:2px !important; padding-bottom:2px !important} ._5wd4 {padding-top:2px !important; padding-bottom:2px !important} ._1nc7._2cnu ._5wdf { margin-bottom: 0px !important;  margin-top: 0px !important} ._1nc7 ._5ys- {position:relative; right: -35px !important} ._1nc7 ._5wd9 {min-height: initial !important} span.emoticon_text,span.emoticon_smile {float:none !important} /* new stuff 25thNov15*/ #ChatTabsPagelet div.conversation * {border:0px !important} #ChatTabsPagelet div.conversation * {box-shadow: none !important} #ChatTabsPagelet div.conversation div._5wd9 {clear:right !important; float:left !important} #ChatTabsPagelet div.conversation div._5wd4 {padding-top:0px !important} #ChatTabsPagelet div.conversation div._5wd4 {padding-bottom:0px !important} #ChatTabsPagelet div._4tdt div._31o4 {top:5px} #ChatTabsPagelet div.fbNub.opened.focusedTab div.fbNubFlyoutTitlebar, #BuddylistPagelet div.fbNubFlyoutTitlebar {background-color:#4267b2 !important} #ChatTabsPagelet div._d97 {background-color:inherit !important;color:black !important} div._d97 a {color: #365899 !important} #ChatTabsPagelet div.fbNub.opened .titlebarText {color: black} #ChatTabsPagelet div.fbNub.opened.focusedTab .titlebarText {color: white} div._1nc6 {justify-content:inherit !important}';
  }

  if (fbpoptsobj.condensedchat) {
    fbpboxstyles += ' div.fbChatOrderedList  ul li * { line-height: inherit !important} div.fbChatOrderedList ul ._55ln, div.fbChatOrderedList ul ._55lp {line-height:15px; height:15px !important; margin-bottom:-3px; overflow:hidden !important} div.fbChatOrderedList  ul img[width="28"] {position:relative;top:-4px}';
  }

  if ((typeof fbpoptsobj.sendmoneybutt !=='undefined') && fbpoptsobj.sendmoneybutt) {
	fbpboxstyles +=' #ChatTabsPagelet ._10nr ._5uqy,#ChatTabsPagelet div._10nr._6gd, #pagelet_web_messenger ._10nr ._5uqy, #ChatTabsPagelet a[role="button"][title="Send Money"], #pagelet_web_messenger a[role="button"][title="Send Money"] {display:none !important}';
  }
  
  if ((typeof fbpoptsobj.startcallbutt !=='undefined') && fbpoptsobj.startcallbutt) {
	fbpboxstyles +=' #ChatTabsPagelet a[data-gt^="{\\"videochat\\""], #pagelet_web_messenger button[data-tooltip-content^="Start a video call"] {display:none !important}';
  }

  if ((typeof fbpoptsobj.chatplaygamebutt !=='undefined') && fbpoptsobj.chatplaygamebutt) {
	fbpboxstyles +=' #ChatTabsPagelet a._6gb._4cf0 {display:none !important}';
  }
  
  if ((typeof fbpoptsobj.chatquickcambutt !=='undefined') && fbpoptsobj.chatquickcambutt) {
	fbpboxstyles +=' #ChatTabsPagelet a._6gb._5yhk._30yy {display:none !important}';
  }
  
  if ((typeof fbpoptsobj.smileys !=='undefined') && fbpoptsobj.smileys) {
    fbpboxstyles +=' h5 i.img.sp_8bdjxq.sx_a5061a,i.img.sx_aa9390, i.img.sx_bfe526, i.img.sx_dfebf7, i.img.sx_5455e0,' + wrotewallicon + ', img.wallArrowIcon, .emoticon_text, h5.uiStreamHeadline i.img, a.fbStreamPrivacy i.img, div.audienceSelector i.img, i.UFILikeIcon, div[data-hover="tooltip"][aria-label^="Shared"] i, a[data-hover="tooltip"][aria-label] i,i.UFILikeLinkIcon,i.UFICommentLinkIcon,i.UFIShareLinkIcon, div.userContentWrapper span._55pe img[width="16"][height="16"],i.UFIOrderingModeSelectorDownCaret, body.pagesTimelineLayout i[aria-label="Pinned Post"], div>button>i, div._5pcp i.img,i[data-tooltip-content="Pinned Post"],div.UFICommentContentBlock a.UFICommentCloseButton i,div.UFICommentContentBlock div.UFICommentCloseButton i  {display:inline-block !important} li.webMessengerMessageGroup div span p span, .emoticon, div.userContentWrapper span[title~="emoticon"] img,img.img[height="30"][width="30"],img[height="24"][width="24"] {display:none !important} i.-cx-PRIVATE-fbEntstreamEmoji__image, i.-cx-PRIVATE-ogAttachedSentenceToken__icon, span.-cx-PRIVATE-fbEmoji__icon, h5.uiStreamMessage img, span.userContent i.img, .userContentSecondary i.img, span.hasCaption i.img, div.shareSubtext i.img, div.uiStreamAttachments i.img, div.UFICommentContent span._1a-, div.userContentWrapper i.img,div.userContentWrapper img[width="16"][height="16"], h5.uiStreamMessage i.img, span.userContentSecondary img[height="16"], div.tickerFeedMessage i.img, div[data-dedupekey] h5 img[width="16"][height="16"],h6 img[width="16"][height="16"], #pagelet_ticker div.tickerStoryContent img[width="16"][height="16"], #pagelet_rhc_ticker div.tickerStoryContent img[width="16"][height="16"], #pagelet_ticker div.tickerStoryContent img[width="16"][height="16"], #ChatTabsPagelet div.conversation img._1ift, #blueBarDOMInspector a.messagesContent img._1ift {display: none} #pagelet_web_messenger li.webMessengerMessageGroup div.mvs, table.conversationContainer div.mvs, #ChatTabsPagelet div.stickerContainer,#ChatTabsPagelet div.conversation div[style*="www.facebook.com/stickers/asset/"] {word-spacing:-999px;letter-spacing: -999px; height:18px !important; width:100px; visibility: hidden} #pagelet_web_messenger li.webMessengerMessageGroup div.mvs:before, table.conversationContainer div.mvs:before, #ChatTabsPagelet div.stickerContainer:before, #ChatTabsPagelet div.conversation div[style*="www.facebook.com/stickers/asset/"]:before {content: \"**sticker**\";visibility: visible;word-spacing:normal;letter-spacing: normal} div.UFICommentContent div[style*="fbcdn-dragon"], div[data-testid="ufi_comment_sticker"]{display: none} .emoticon_text {position:relative;top:4px;clip:auto;height:auto;width:auto;background-color:#EEEEFF} #ChatTabsPagelet span[style^=\'background-image: url("/images/emoticons/\'] {visibility: hidden} #ChatTabsPagelet span[style^=\'background-image: url("/images/emoticons/\']:after {content: " " attr(title);visibility: visible } i[style*="/images/emoji.php"],span.UFICommentBody i._1az._1a- {background-image:url("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==") !important} i[style*="/images/emoji.php"]>span.accessible_elem, span.UFICommentBody i._1az._1a-  span.accessible_elem, span._7oe {clip:unset !important;width:inherit !important;height:inherit!important} span.UFICommentReactionIconContainer {margin-right:6px}';
	// deal with new reaction emojis
	//fbpboxstyles +=' span[role="toolbar"] {width:auto !important} a[ajaxify^="/ufi/reaction"]>span._1g5v {margin-left: 6px} div._4ar- a._3emk {margin:0 5px 0 5px} i.like,i.wow,i.haha,i.love,i.sorry,i.anger{visibility: hidden;word-spacing: -999px; letter-spacing: -999px} i.like:before,i.wow:before,i.haha:before,i.love:before,i.sorry:before,i.anger:before {visibility: visible;word-spacing: normal;letter-spacing: normal; font-size:13px !important} i.like:before {content: "like" !important} i.wow:before{content: "wow" !important} i.haha:before{content: "haha" !important} i.love:before{content: "love" !important} i.sorry:before{content: "sad" !important} i.anger:before {content: "ang" !important} a.UFILikeLink>i.like,a.UFILikeLink>i.wow,a.UFILikeLink>i.haha,a.UFILikeLink>i.love,a.UFILikeLink>i.sorry,a.UFILikeLink>i.anger {display:none}';
	fbpboxstyles +=' span[role="toolbar"] {width:auto !important} a[ajaxify^="/ufi/reaction"]>span._1g5v {margin-left: 6px} div._4ar- a._3emk {margin:0 5px 0 5px} i._3j7l,i._3j7n,i._3j7o,i._3j7m,i._3j7r,i._3j7q{visibility: hidden;word-spacing: -999px; letter-spacing: -999px} i._3j7l:before,i._3j7n:before,i._3j7o:before,i._3j7m:before,i._3j7r:before,i._3j7q:before {visibility: visible;word-spacing: normal;letter-spacing: normal; font-size:13px !important} i._3j7l:before {content: "like" !important} i._3j7n:before{content: "wow" !important} i._3j7o:before{content: "haha" !important} i._3j7m:before{content: "love" !important} i._3j7r:before{content: "sad" !important} i._3j7q:before {content: "ang" !important} a.UFILikeLink>i._3j7l,a.UFILikeLink>i._3j7n,a.UFILikeLink>i._3j7o,a.UFILikeLink>i._3j7m,a.UFILikeLink>i._3j7r,a.UFILikeLink>i._3j7q, /* hide floating reactions on live videos */ div._f5b._3htz {display:none}';
	//var reactarr2=["like","love","haha","wow","sorry","anger"];
    //var reactarr2=["_3j7l","_3j7m","_3j7o","_3j7n","_3j7r","_3j7q"];
	if(fbpoptsobj.fontfix){ // fix for ascii smileys not showing if font size has been changed
	  fbpboxstyles += ' span._4mcd {font-size:' + fbpoptsobj.fontsize + 'px}';
	}
	else {
	  fbpboxstyles += ' span._4mcd {font-size: inherit}';
	}
  }

  if ((typeof fbpoptsobj.reactions !=='undefined') && fbpoptsobj.reactions) {
    fbpboxstyles +=' div._iu-[role="toolbar"],span._3t54[role="toolbar"]{display:none}'; // div.userContentWrapper a[href^="/ufi/reaction/profile/browser/"]:after{content:"Likes";position:relative;left:-40px}
  }

  if ((typeof fbpoptsobj.notificationpopup !=='undefined') && fbpoptsobj.notificationpopup) {
    fbpboxstyles +=" ul[data-gt^='{\"ref\":\"beeper\"'] {display:none}"; // hide thread popup notifications div.fbNubGroup
  }

  if ((typeof fbpoptsobj.fixedleftcolumn !=='undefined') && fbpoptsobj.fixedleftcolumn) {
    fbpboxstyles +=' .home #leftCol {position:fixed !important}';
  }

  if ((typeof fbpoptsobj.sortmostrecent !=='undefined') && fbpoptsobj.sortmostrecent) { // VARIABLE CSS NAME(will need regular updating) this is the heading that says "Viewing Most Recent Stories" on the new newsfeed design
    fbpboxstyles +=' div._4-u2.mvm._495i {position:relative; top:-21px; width:135px; height:10px; overflow:hidden !important; padding :0px; padding-top:1px; padding-bottom:6px; margin-top:0px; margin-bottom:-17px}';
  }

  if ((typeof fbpoptsobj.expandnewscolumn !=='undefined') && fbpoptsobj.expandnewscolumn && (!window.location.href.match(/\/events\/|\/groups\/|\/allactivity/))) {
    //ncstyle.textContent='#contentArea {width:auto !important} #rightCol {display:none}';
	window.setTimeout(fbpexpandnewscoltoggle,4500);
	window.setTimeout(function(){if(document.querySelector('body.timelineLayout')) { ncstyle.textContent=''; if(!window.location.href.match(/comment_id/)) { window.scrollTo(5,5);window.scrollTo(0,0)} }},5000);
  }

  if (fbpoptsobj.listsuggestions) {
	fbpboxstyles +=' #pagelet_friend_list_suggestions {display:none}';
  }

  if (fbpoptsobj.listheaderimage) {
	fbpboxstyles +=' #pagelet_friend_list_header, #pagelet_feed_cover_photo {display:none}';
  }

  if((typeof fbpoptsobj.fulltimestamps !=='undefined') && fbpoptsobj.fulltimestamps) {
	fbpboxstyles += ' abbr[data-utime]span {font-size:0em !important} abbr[data-utime]:after {content: " " attr(title);font-size:13px}  div.userContentWrapper a.fbStreamPrivacy {vertical-align:middle} ';
	//fbpboxstyles += ' abbr[data-utime]:hover {font-size:inherit !important} abbr[data-utime]:hover:after {content: "";display: inline-block;width: 140px;}  div.userContentWrapper a.fbStreamPrivacy {vertical-align:middle}';	
	//fbpboxstyles += ' #pagelet_web_messenger abbr[data-utime]:hover:after {content: "";width: 0px; !important}'; // fix for inbox timestamps
    fbpboxstyles += ' #pagelet_web_messenger abbr[data-utime] {font-size:inherit}'; // fix for inbox timestamps
  }

  if((typeof fbpoptsobj.fullURL !=='undefined') && fbpoptsobj.fullURL) {
	fbpboxstyles += ' div._6m6 a:after { content: attr(href); font-size: 12px; display: block; color: grey; } /* make link box bigger so description will also fit */ div._59ap div._6m3,div._6m6, div._6m7,div._3ekx {height:auto !important;max-height: 600px !important} #facebook div._6m7._3bt9.hidden_elem {display:block !important}';
  }

  if(fbpoptsobj.tlgamesapps) { 
    // hide games and apps on timeline pages
    fbpboxstyles +=' div[data-gt*="PlatformAppUserActionSpikeUnit"], div[data-gt*="249944898349166"],div[data-gt*="PlatformAppUserActionUnit"],#pagelet_timeline_medley_games {display:none !important}';
  }

  if(fbpoptsobj.tllikesbox) { 
    // hide games and apps on timeline pages
    fbpboxstyles +=" div[data-gt*='LikesEgoReportUnit'], /* General Likes */ div.timelineReportContainer[data-gt*='\"app_id\":\"2409997254\"'], /* Books */ div.timelineReportContainer[data-gt*='\"app_id\":\"332953846789204\"'], /* TV Shows*/ div.timelineReportContainer[data-gt*='\"app_id\":\"309918815775486\"'], /* Movies */ div.timelineReportContainer[data-gt*='\"app_id\":\"177822289030932\"'], /* Music */ div.timelineReportContainer[data-gt*='\"app_id\":\"221226937919712\"'], /* Sports */ div.timelineReportContainer[data-gt*='\"app_id\":\"330076653784935\"'], div.timelineUnitContainer[data-gt*='TimelinePagesLikedPagesUnit'] {display:none !important}";
  }

  if(fbpoptsobj.pymk) { 
    // hide people you may know
    fbpboxstyles +=' #fbRequestsPYMKContainer, #pagelet_pymk_timeline, #pagelet_timeline_main_column div[title="Other People You May Know"], #welcome_dashboard li.step.last, div._3nzq, #stream_pagelet > ._4-u2._2ph_._3-95, #pagelet_timeline_main_column .escapeHatchMinimal._4__g._32jy, ul.search li.typeaheadHeader[title="People You May Know"], ul.search li.pymk {display:none}';
  }

  if(fbpoptsobj.tlinvitefriendslikepage) { 
    // hide the invite friends to like this page box on timeline pages
    fbpboxstyles +=" #NonAdminInvite {display:none}";
  }

  if(fbpoptsobj.nonags) { 
    // hide the invite friends to like this page box on timeline pages and other annoying questions fb asks / prompts such as seasonal greetings in status box etc.
    fbpboxstyles +=" #pagelet_like_toast, li.-cx-PRIVATE-fbTimelineAboutUnitQuestion__root, #timeline_profile_questions_unit, #nf_megaphone_school_add_content, #nf_megaphone_school_add, #timeline_info_review_unit, div[data-fieldtype='437814382994308'],div[data-fieldtype='562499510465814'],div[data-fieldtype='199661640205353'],div[data-fieldtype='181177592065522'],#mobile_mirror_banner, #bootloadComposerPromptIcon, #bootloadSemiinlineRoot, #bootloadComposerPromptPlaceholder,div._4bl9._1sek, #stream_pagelet div[data-ft^='{\"daily_dialogue_'],#dd_lw_content, #pagelet_megaphone, #pagelet_prompts,#stream_pagelet div[id^='feed_scoreboard'],body.timelineLayout div[data-xt-vimp] {display:none !important}"; 
  }

  fbpboxstyle.textContent = fbpboxstyles;

  // set custom css (if user has specified any styles)
  if (fbpoptsobj.fbpcustomcss) {
	fbpcssstyle.textContent = fbpoptsobj.fbpcustomcss;
  }
  if(debug)
    console.log('BEFORE WHITELIST IS FINALISED - '+typeof(fbpoptsobj.friendswhitelistArr) + ' ' + fbpoptsobj.friendswhitelistArr);
  // Set up user whitelist regexp (includes fbp fan and dev pages)
  if(typeof(fbpoptsobj.friendswhitelistArr)!='undefined') {
    var friendswhitelistArr=JSON.parse(fbpoptsobj.friendswhitelistArr);
	if(typeof (friendswhitelistArr)=='object') {
      for(i in friendswhitelistArr) { // i is the friend id 
        useridwhitelist+= '|' + i;
      }
	}
	if(debug)
	  console.log("AFTER WHITELIST IS FINALISED userwhitelist= :  " + useridwhitelist);
    useridwhitelistRX=new RegExp(useridwhitelist);
  }
  else if(typeof(useridwhitelist)!="undefined") {
    useridwhitelistRX=new RegExp(useridwhitelist);
  }

  if(debug)
    console.log('are we here at the end of initstage 2?');

} //END FUNCTION INITSTAGE2

var fbpdynamicreload = function (opts) {
  fbpgetprefs(opts);
  if(document.getElementById('fbpoptsdiv') && document.getElementById('fbpoptsdiv').style.display=='block') {
    document.getElementById('fbpoptsdiv').style.display='none';
	fbptoggleopts();
  }
  resetclasses();
  initstage2();
  cleartheshizzle(document);
}

  function fbpInsertedNodeDomHandler(event) {
    	
	if(!event.target.nodeName)
	  return;
	/*
	console.log(event.target.nodeName);
	console.log(event.target);
	console.log('id= ' + event.target.id);
	console.log('class= ' + event.target.className);
	console.log(event.target.textContent);
	if(event.target.nodeName==='DIV')
	  console.log(event.target.outerHTML);
	*/
	
    if((event.target.nodeName=='LI') ||  (event.target.nodeName=='UL'))  {
	  //if ((document.getElementById('pagelet_home_stream') || (document.getElementById('hashtag_permalink_feed'))) && (!document.getElementById('fb_multi_friend_selector'))) {
	  if (document.getElementById('pagelet_home_stream') && (!document.getElementById('fb_multi_friend_selector'))) {
	    //console.log(event.target.nodeName);
        cleartheshizzle(event.target);
      }
      else {
        ; // do nothing for now
      }
	  if(fbpoptsobj.fixarticleredirects && event.target.getElementsByTagName('a').length)
	    unmanglelinks(event.target);
    }
    else if(event.target.nodeName=='DIV') {
      //var functRef = callLater(adddelreqbuttons,event.target);
      //setTimeout(functRef, 1500);
	  if (document.getElementById('pagelet_litestand_section') || document.getElementById('stream_pagelet') || event.target.querySelector('div.fbFeedTickerStory') || event.target.classList.contains('fbFeedTickerStory'))  {
	    //console.log(event.target.nodeName);
		
		// DEBUGGGING 
		/*
		console.log('div inserted');
		console.log("id= " +  event.target.getAttribute('id'));
		console.log("class= " + event.target.getAttribute('class'));
		console.log("dedupekey= " + event.target.getAttribute('data-dedupekey'));
		console.log(event.target.querySelectorAll("div[data-dedupekey]").length);
		console.log(event.target.textContent);
		*/
		// DEBUGGGING 
		
		
		//cleartheshizzle(event.target);
		
		// BEGIN deal with change in feeds
		if(event.target.getAttribute('id') && event.target.getAttribute('id').match(/^u_jsonp|^u_/) && event.target.parentNode.getAttribute('data-dedupekey')) {
		  /*if(event.target.parentNode.classList.contains('fbpnormal')){
			console.log('already processed guv!');
		    event.target.parentNode.setAttribute('class', event.target.parentNode.getAttribute('class').replace(/fbpnormal/,''));
		  }*/
		  /*console.log('hit it 1');
		  console.log(event.target.id);
		  console.log(event.target.textContent);
		  console.log(event.target.parentNode.id);
		  console.log(event.target.parentNode.textContent);
		  */
		  cleartheshizzle(event.target.parentNode);
		} // END deal with change in friend list feed
		else { // perhaps check for dedupekey here, to stop an unneccesary call to cleartheshizzle // if(event.target.getAttribute && event.target.getAttribute('data-dedupekey'))
          cleartheshizzle(event.target);
		  /*console.log('hit it 2');
		  console.log(event.target.id);
		  console.log(event.target.textContent);
		  */
		}

		//unmanglelinks(event.target);

      }
	  if((event.target.getAttribute('id')=='platform_dialog_content') || (event.target.querySelector('.tosPane,.uiLayer')) || (event.target.getAttribute('class') && event.target.getAttribute('class').match(/tosPane|\buiLayer\b/)))  {
	    //its most likely a facebook application requesting permissions
		highlightemailrequest();
		addblockbuttontopermreq();
	  }
	  if(event.target.getAttribute('class') && event.target.getAttribute('class').match('middle_area_content')){
	    if(window.location.href.match(/\/games\//)) // i dont think this bit of code is necessary any more
	      highlightemailrequest();
	  }
	  else if(event.target.getAttribute('class') && event.target.getAttribute('class').match(/uiLayer/)){
		if(event.target.querySelector('ul.uiList span') && event.target.querySelector('ul.uiList span').textContent.match(/fbpurity\.com/)) {
		  if(document.querySelector('div.uiLayer ul.uiList li').innerHTML.match(/our security systems/)) {
		    document.querySelector('div.uiLayer ul.uiList li').innerHTML=document.querySelector('div.uiLayer ul.uiList li').innerHTML.replace('our security systems detected to be unsafe',"Facebook's security systems detected to be completely safe, but because it lets you clean up the junk such as ads and other stuff you don't want to see and gives you cool options that Facebook doesn't want to give you, they are blocking the link");
		    document.querySelector('div.uiLayer ul.uiList li').innerHTML=document.querySelector('div.uiLayer ul.uiList li').innerHTML.replace('to continue.',"to continue, and replace it with <b>facebook.com/fluffbustingpurity</b> which is the URL for the FB Purity fan page on Facebook.<p/>Don't let Facebook fool you, FB Purity *is* safe, free and top rated. Help spread the word, by telling your friends about it on Facebook also Twitter, Pinterest, Google Plus, email, forums etc, thanks!");
		  }
		  else {
			  ; // either they have changed the text, or its another language.
		  }
		  document.querySelectorAll('div.uiLayer ul.uiList li')[1].style.display="none";
		  //console.log('they are blocking fbpurity.com');
		}
      }
		  
	  if(fbpoptsobj.fixarticleredirects && event.target.getElementsByTagName('a').length)
	    unmanglelinks(event.target);

      //setTimeout(function(){adddelreqbuttons(event.target)},1000); // add delete friend request buttons if required
    }
	else if((event.target.nodeName=='SPAN') && (event.target.getAttribute && event.target.getAttribute('class') && event.target.getAttribute('class').match(/hasCaption/))) {
	  //console.log('hit a spanner');
	  unmanglelinks(event.target);
	}

  } // END fbpInsertedNodeDomHandler function

  function updateblockedcount() {
    var crappyappmsgcounter=document.getElementsByClassName('fbpblocked').length;
    var fbpblockcountspan=document.getElementById('fbpblockcount');
    if(fbpblockcountspan) 
      fbpblockcountspan.innerHTML=crappyappmsgcounter;

    var xtramsgcounter=document.getElementsByClassName('fbpblockedx').length;
    var fbpblockxcountspan=document.getElementById('fbpblockxcount');
    if(fbpblockxcountspan) 
      fbpblockxcountspan.innerHTML=xtramsgcounter;
  }

  function destroyblockedappstories (appid,killmode) {
    if(debug)
	  console.log('destroyblockdappstories');
    var appnodes=document.getElementsByClassName('aid_' + appid);
    var appnodeslength=appnodes.length;
    for (var i=0;i<appnodeslength;i++){
      if(killmode=='kill')
        appnodes[0].parentNode.removeChild(appnodes[0]);
      else if(killmode=='allow')
        appnodes[i].className = appnodes[i].className.replace(/\bfbpblocked\b/,'fbpnormal');

	  if(document.getElementById('fbpblockcount')) {
		var crappyappmsgcounter=document.getElementById('fbpblockcount').textContent;
		--crappyappmsgcounter;
		document.getElementById('fbpblockcount').textContent=crappyappmsgcounter;
		}
    }
	updateblockedcount();
    //check if there are any blocked msgs left and if not, return to normal homepage view
    var blockedmsgs=document.getElementsByClassName('fbpblocked');
    if(!blockedmsgs.length)
      fbpshowblocked();
    appnodes=null;

  }// END destroyblockedappstories function

  function getdtsg() {
    var fb_dtsg='';
	if(document.getElementsByClassName('autoexpand_mode').length) {
      if(document.getElementsByClassName('autoexpand_mode')[0].wrappedJSObject)
        fb_dtsg = document.getElementsByClassName('autoexpand_mode')[0].wrappedJSObject.fb_dtsg.value;
      else
        fb_dtsg = document.getElementsByClassName('autoexpand_mode')[0].fb_dtsg.value;
    }
	else {
	  var navinps=document.getElementsByTagName('input');
	  for(var i=0;i<navinps.length;i++)
		if(navinps[i].getAttribute('name')=='fb_dtsg') {
		  fb_dtsg=navinps[i].getAttribute('value');
		  break;
		}
	}
    return fb_dtsg;
  }

  function allowapp(appid, appname) {
    if (confirm("Do you want to whitelist application : '" + appname +"'" + ".\n\nApplication ID: " + appid)) {
      if(fbpoptsobj.userappwhitelist.length) {
        // theres already value/s in userwhitelist
        try {
          fbpoptsobj.userappwhitelist+=','+appid;
          fbpsavevalue('fbpoptsjson-' + currentuserid, JSON.stringify(fbpoptsobj));
		  
          window.alert(appname + ' has been Saved to your whitelist');
          refreshwhitelist();
          destroyblockedappstories(appid,'allow');
        }
        catch(e) {
          window.alert('error saving id to whitelist');
        }
      }
      else {
        // userwhitelist is blank
        try {
          fbpoptsobj.userappwhitelist=appid;
          fbpsavevalue('fbpoptsjson-' + currentuserid, JSON.stringify(fbpoptsobj));
          window.alert(appname + ' has been Saved to your whitelist');
          refreshwhitelist();
          destroyblockedappstories(appid,'allow');
        }
        catch(e) {
          window.alert('error saving id to whitelist');
        }
      }
    }
    else
      return;

  } // END allowapp function

  function blockapp(appid, appname, nodeid, autoblock){
    //https://www.facebook.com/ajax/privacy/block_app?dpr=1
	var fb_dtsg = getdtsg();
	if(typeof currentuserid=='undefined' || currentuserid=='')
	  currentuserid=getuserid();

    //unsafeWindow.pages_show_block_app("49572793475", "block", "about");

    // if not autoblocking - check if there are multiple apps to block, if so ask if user wants to block all at once
    if(typeof(autoblock)=='undefined') {
      var app2bcount=document.getElementsByClassName('fbpblocked').length;
      if (!confirm("Do you want to block application : '" + appname +"'"))
        return;
	  if (app2bcount>1) // check if user wants to block all the currently shown applications
         if(blockallapps())
           return;
    }
    if(document.getElementById('blockapplab'))
	  document.getElementById('blockapplab').style.display='none';

    document.getElementById(nodeid).setAttribute('style','background:#DCDCDC !important;text-align:center');
    document.getElementById(nodeid).innerHTML='<b>F.B. Purity</b> : Blocking Application : "<span style="color:red">' + appname + '</span>"&nbsp;&nbsp;&nbsp;&nbsp;<img style="text-align:middle" src="//www.facebook.com/images/loaders/indicator_blue_small.gif">';

    var http = new window.XMLHttpRequest();	
	var url = window.location.protocol + "//" + window.location.hostname + "/ajax/privacy/block_app.php?dpr=1";
    var params = "objectID=" + appid + "&__user=" + currentuserid + "&__a=1" + "&__dyn=" + "xyz123abc890" + "&__req=1g&__be=-1&__pc=PHASED:DEFAULT&fb_dtsg=" + fb_dtsg + "&ttstamp=2658171908345876910549114455865817073117122988357777052&__rev:2486274";

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
  	  if(http.readyState == 4 && http.status == 200) {
		if(!http.responseText.match('\"errorSummary\"')){
		  //unsafeWindow.console.log("successfully blocked app : '" + appname +  "' with id=" +appid + "\n");
		  if((nodeid!='platform_dialog_content') &&(nodeid!='pagelet_canvas_content') &&(nodeid!='platformDialogForm'))
		    destroyblockedappstories (appid,'kill');
		  else {
		    document.getElementById(nodeid).innerHTML= '<p style="margin-top:20px;font-size:25px"><a title="App was blocked by the F.B. Purity Browser Extension" href="http://www.fbpurity.com"><img style="vertical-align:middle" src="https://sites.google.com/site/st333v/fbp-1/fbp-ghost-lid-icon-48x48.jpg"></a> ' +appname + ' has been BLOCKED!' + '</p><div style="height:2px"></div><p style="text-align:center;font-size:12px;font-color:red;font-weight:bold"><a href="/">Return to Facebook</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <a href="https://www.facebook.com/settings?tab=blocking">Review Blocked Apps</a></p>';
		    if(document.getElementsByClassName('platform_dialog_bottom_bar_table').length)
		      document.getElementsByClassName('platform_dialog_bottom_bar_table')[0].style.display='none';
		  }
		}
		else {
		  if(http.responseText.match(/\"errorSummary\"\:/))
		    var errorsum=http.responseText.match(/\"errorSummary\"\:\"(.*)\",\"error/)[1];
		  else
		    var errorsum="";
		  if(http.responseText.match(/\"errorDescription\"\:/))
		    var errordesc=http.responseText.match(/\"errorDescription\"\:\"(.*)\",/)[1];
		  else
		    var errordesc="";
		  if( errorsum.length && errordesc.length )
		    var wholeerror = errorsum + ' : ' + errordesc;
		  else
		    var wholeerror = http.responseText;
		  if((nodeid!='platform_dialog_content') &&(nodeid!='pagelet_canvas_content') &&(nodeid!='platformDialogForm'))
			document.getElementById(nodeid).innerHTML='<span style="color:red">App block failed for the following reason:\n\n' + wholeerror +"</span>";
		  else
		    window.alert('app block failed for some reason:\n\n' + wholeerror);		  
		}
		http=null;
	  } else if((http.readyState==4)) {
		  document.getElementById(nodeid).innerHTML='<span style="color:red">App block failed for the following reason:\n\n' + "Server Error: " + http.status + " : " +  http.statusText +"</span>";
	  }
    }
    http.send(params);
	
  }

  function blockappev(ev) {
    ev.preventDefault();
    var appname=this.getAttribute('appname');
    var appid=this.getAttribute('appid');
	var nodeid=this.getAttribute('nodeid');
    blockapp(appid,appname,nodeid);
  } // END blockappev function

  function allowappev(ev) {
    ev.preventDefault();
    var appname=this.getAttribute('appname');
    var appid=this.getAttribute('appid');
    var nodeid=this.getAttribute('nodeid');
    document.getElementById(nodeid).setAttribute('class', document.getElementById(nodeid).getAttribute('class') + ' aid_' + appid);
    allowapp(appid,appname);
  } // END allowappev function

  function showhiddendivs() {
	if(debug)
	  console.log('show hidden divs');
    var hiddivs=document.querySelectorAll("div[id*='substream_'] > .hidden_elem");
	for(var i=0;i<hiddivs.length;i++)
	  if (hiddivs[i].getAttribute('class').match(/hidden_elem/)) {
	    hiddivs[i].setAttribute('class',hiddivs[i].getAttribute('class').replace('hidden_elem',''));
		hiddivs[i].parentNode.setAttribute('style',"");
	  }
	hiddivs=null;
  }

  function fbpshowblocked() {

    var showhidelink=document.getElementById('fbpshowblockedlink');
    var showorhidetext=showhidelink.textContent;
    var showhidelinkx=document.getElementById('fbpshowblockedxlink');
    var showorhidetextx=showhidelinkx.textContent;
    var blockedmsgs=document.getElementsByClassName('fbpblocked');

    if (showorhidetext=='Show') {
      if(!blockedmsgs.length) {
	    updateblockedcount();
        return;
	  }
      showhidelink.innerHTML='Hide';
      showhidelink.title='Hide Application + Game Stories';
      showhidelinkx.innerHTML='Show';
      showhidelinkx.title='Show Extras (Friend/Group/Fan/Event etc Stories)';
      fbpstyle.textContent=fbpStyleApps;
    }
    else  {
      showhidelink.innerHTML='Show';
      showhidelink.title='Show Game + Application Stories';
      fbpstyle.textContent=fbpStyleNormal;
    }    

	showhiddendivs();
    //works better in reverse order
    for(i=(blockedmsgs.length-1); i>=0; i--) {
      dspBlockLink(blockedmsgs[i]);      
    }
    blockedmsgs=null;

  } // END fbpshowblocked function

  function fbpshowblockedx() {
    var showhidelinkx=document.getElementById('fbpshowblockedxlink');
    var showorhidetextx=showhidelinkx.textContent;
    var showhidelink=document.getElementById('fbpshowblockedlink');
    var showorhidetext=showhidelink.textContent;
    var blockedmsgs=document.getElementsByClassName('fbpblockedx'); 

    if (showorhidetextx=='Show') {
      if(!blockedmsgs.length)
        return;
      showhidelinkx.innerHTML='Hide';
      showhidelinkx.title='Hide Extras (Friend/Group/Fan/Event etc Stories)';
      showhidelink.innerHTML='Show';
      showhidelink.title='Show Game + Application Stories';
      fbpstyle.textContent=fbpStyleExtras;
    }
    else  {
      showhidelinkx.innerHTML='Show';
      showhidelinkx.title='Show Extras (Friend/Group/Fan/Event etc Stories)';
      fbpstyle.textContent=fbpStyleNormal;
    }
	showhiddendivs(); //removed because causes too much stream loading
    blockedmsgs=null;

  } // END fbpshowblockedx

  var fbpshowblockedev = function (ev) {
    ev.preventDefault();
    fbpshowblocked();
  }

  var fbpshowblockedxev = function(ev) {
    ev.preventDefault();
    fbpshowblockedx();
  }

  function dspBlockLink(node, blockmode) {
    if(debug)
	  console.log('dspBlockLink func');
    if (node.getElementsByClassName('blocklink').length)
      return;

	var appid;
    var appname='';
	// check if its a new FB Actions / Frictionless sharing app
    if (typeof(blockmode)=='undefined') {
      var footernode, headernode;
	  headernode=node.getElementsByClassName('uiStreamMessage');
	  if(!headernode.length)
	    headernode=node.getElementsByTagName('h5');

	  if(node.querySelector("a[href^='https://www.facebook.com/apps/application.php?']")) {
		footernode=node.querySelector("a[href^='https://www.facebook.com/apps/application.php?']").parentNode;
	  }
	  else
	    if(node.querySelector('a[data-gt*=\'{\"appid\"\']')) {
		  footernode=node.querySelector('a[data-gt*=\'{\"appid\"\']').parentNode;
		  appid=node.querySelector('a[data-gt*=\'{\"appid\"\']').getAttribute('data-gt').match(/"appid":"?(\d+)"?/)[1];
		  appname=node.querySelector('a[data-gt*=\'{\"appid\"\']').getAttribute('data-appname');
        }
	  else
		if(node.querySelector('div[data-gt*=\"appid\"]')) {
		  footernode=null;
		  appid=node.querySelector('div[data-gt*=\"appid\"]').getAttribute('data-gt').match(/"appid":(\d+)/)[1]; 
		  if(node.querySelector('a[data-appname]') && node.querySelector('a[data-appname]').getAttribute('data-appname'))
		    appname=node.querySelector('a[data-appname]').getAttribute('data-appname');
		  else
			appname="App Name Unkown";
	    }
	  else{
        footernode='x'; //invalid node will cause exception, luckily we have an exception handler isnt it ;-)
      }

	  if(footernode=='x')
	    console.log('oops footer node=x that means theres a problem finding the footernode');

	  //console.log('are we here?');

	 if((typeof(appid)=='undefined') && (!appname.length)) {
	  //its possibly an app posing as a normal facebook message, so lets try and get the appid from the footer
	  if(headernode.length && headernode[0].innerHTML.match(/application\.php\?id=(\d+)/)) {
	    appid=headernode[0].innerHTML.match(/application\.php\?id=(\d+)/)[1];
	  }
      else if((typeof(footernode)!='undefined') && (typeof(footernode.innerHTML)!='undefined') && footernode.innerHTML.match(/php\?id=(\d+)\"|\&quot\;app_id\&quot\;\:(\d+)\,/)) {
        if((typeof(footernode)!='undefined') && (typeof(footernode.innerHTML)!='undefined') && typeof footernode.innerHTML.match(/php\?id=(\d+)\"|\&quot\;app_id\&quot\;\:(\d+)\,/)[1] !='undefined')
          appid=footernode.innerHTML.match(/php\?id=(\d+)\"|\&quot\;app_id\&quot\;\:(\d+)\,/)[1];
        else if((typeof(footernode)!='undefined') && (typeof(footernode.innerHTML)!='undefined') && typeof footernode.innerHTML.match(/php\?id=(\d+)\"|\&quot\;app_id\&quot\;\:(\d+)\,/)[2] !='undefined')
          appid=footernode.innerHTML.match(/php\?id=(\d+)\"|\&quot\;app_id\&quot\;\:(\d+)\,/)[2];
      }
      else
		if((typeof(footernode)!='undefined') && (typeof(footernode.innerHTML)!='undefined') && footernode.innerHTML.match(/application\.php\?id=(\d+)/)) {
		  if(footernode.innerHTML.match(/application\.php\?id=(\d+)/)[1]!='undefined')
		    appid=footernode.innerHTML.match(/application\.php\?id=(\d+)/)[1];
		}
		else
          return;

      try {
		if((typeof(footernode)!='undefined') && (typeof(footernode.innerHTML)!='undefined') && footernode.innerHTML.match(/data-appname=/))
		  appname=footernode.innerHTML.match(/data-appname="([^"]*)"/)[1] ;
		else if (headernode[0].innerHTML.match(/application.php/)){
          appname=headernode[0].innerHTML.match(/application\.php\?id=.*\>(.*)<\/\a\>/)[1];
		}
		else 
		{
          flinks=footernode.getElementsByTagName('a');
          appname=flinks[flinks.length-1].textContent;
		  if(appname=='')
            appname=flinks[flinks.length-2].textContent;
	    }
      } catch (e) {
          appname='mystery app x';
		  console.log('error getting app name in dspblocklink function');
      }

	 } // end if we havent yet got the appid and appname
    
    } // END if blockmode=normal (if !blockmode.length)
    else {
      // we are doing this for "started using app/game" (sua) type posts
	  var uism = node.getElementsByClassName('uiStreamMessage');
	  if(!uism.length)
	    uism=node.getElementsByTagName('h5');
      var alinks=uism[0].getElementsByTagName('a');
	  for(var i=0;i<alinks.length;i++){
	    var datahover=alinks[i].getAttribute('data-hovercard');
		if(datahover) {
		  var datahovermatch=datahover.match(/\/hovercard\/application\.php\?id\=(\d*)/);
	      if(datahovermatch) {
		    appid=datahovermatch[1];
		    appname=alinks[i].textContent;
		    break;
		  }
		}
	  }
  	  if(typeof(appid)=='undefined' || appid =='') { // dealing with frictionless sharing apps such as netflix
	    if(node.getAttribute('data-gt')) {
		  //"appid":"163114453728333"
		  if(node.getAttribute('data-gt').match(/\"appid\":\"\d+\"/)) {
		    appid=node.getAttribute('data-gt').match(/\"appid\":\"(\d+)\"/)[1];
			footerstuff=node.getElementsByClassName("uiStreamFooter");
			if(footerstuff.length){
			  footerimagelink=footerstuff[0].getElementsByTagName('a');
			  if(footerimagelink.length)
			    if(footerimagelink[0].getAttribute('data-appname'))
				  appname=footerimagelink[0].getAttribute('data-appname');
			}
		  }
	    }
	  }
	  alinks=null;
    }

    var hidebuttonclass='uiPopover'; //old one was hideButton
    var hidebuttonclasses='uiStreamContextButton uiPopoverTriggerElem';
    var linkclasses='blocklink mlm hideButton';
    var blinkinsertpoint=node.getElementsByClassName(hidebuttonclass)[0];
    var emergencymeasures=0; // var to tell us whether we need to rearrange the ba + wl buttons

    if(typeof blinkinsertpoint == 'undefined') {
      var uism=node.getElementsByClassName('uiStreamMessage');
	  if(!uism.length) {
	    emergencymeasures=1;
	    uism=node.getElementsByTagName('h5');
	  }
      if(uism && uism.length)
        blinkinsertpoint=uism[0];
      else
        return;
    }

    node.setAttribute('class', node.getAttribute('class') + ' aid_' + appid); // lets do it for all apps (cos on profile pages apps sometimes dont include this class)
    var blinkspan=document.createElement('span');

    if(!emergencymeasures) // new style of footer
      blinkspan.setAttribute('style',"position:relative;opacity:0.5; top : 2px; left: -6px");
	else
	  blinkspan.setAttribute('style',"position:relative;opacity:0.5; margin-top: -20px; left:345px");

    blinkspan.className=hidebuttonclasses;

    blinkspan.innerHTML="<a class='" + linkclasses +"' style='text-decoration: none;' onmouseover='this.style.background=\"red\";this.style.color=\"white\";this.parentNode.style.opacity=\"1\"' onmouseout='this.style.background=\"white\";this.style.color=\"#3B5998\";this.parentNode.style.opacity=\"0.5\"' title='FBP - Block this application' nodeid='" + node.getAttribute('id') + "' appid='" + appid + "' appname='" + appname.replace('"','','g').replace("'",'','g') + "' href='javascript:;'><b><nobr>BA</nobr></b></a>";
    blinkspan.getElementsByTagName('a')[0].addEventListener("click", blockappev, false);
    //blinkinsertpoint.parentNode.insertBefore(blinkspan, blinkinsertpoint); //(insert before pattern)
    blinkinsertpoint.appendChild(blinkspan);
    if(!emergencymeasures)
      blinkinsertpoint.appendChild(document.createElement('br')); // separate the 2 links

    var alinkspan=document.createElement('span');
    if(!emergencymeasures)
      alinkspan.setAttribute('style',"position:relative; opacity:0.5; top : 2px; left: -6px");
	else
	  alinkspan.setAttribute('style',"position:relative; opacity:0.5; left:345px");
    alinkspan.className=hidebuttonclasses;

    alinkspan.innerHTML="<a class='" + linkclasses + "'style='text-decoration: none;' onmouseover='this.style.background=\"green\";this.style.color=\"white\";this.parentNode.style.opacity=\"1\"' onmouseout='this.style.background=\"white\";this.style.color=\"#3B5998\";this.parentNode.style.opacity=\"0.5\"' title='FBP - Whitelist this application' nodeid='" + node.getAttribute('id') + "' appid='" + appid + "' appname='" + appname.replace('"','','g').replace("'",'','g') + "' href='javascript:;'><b><nobr>WL</nobr></b></a>";
    alinkspan.getElementsByTagName('a')[0].addEventListener("click", allowappev, false);
    //blinkinsertpoint.parentNode.insertBefore(alinkspan, blinkinsertpoint); //(insert before pattern)
    blinkinsertpoint.appendChild(alinkspan);

	if (node.querySelector("div.userContentWrapper div.uiPopover")) {
	  node.querySelector("div.userContentWrapper div.uiPopover").style.zIndex='2';
	}
  } // END dspBlockLink function
   
  function callLater(paramA, paramB, paramC, paramD, paramE){
    return (function(){
      //blockapp(appid, appname, nodeid, auto);
      paramA(paramB, paramC, paramD, paramE);
      //unsafeWindow.console.log(paramA,paramB, paramC, paramD)
    });
  }

  var blockallapps = function()  {
    var appdump=document.getElementsByClassName('fbpblocked');
    var apparray=[];
    var appnamelist='';
	var applength=0;
    for(var i=0;i<appdump.length;i++) {
      if(appdump[i].getElementsByClassName('blocklink').length && !apparray[appdump[i].getElementsByClassName('blocklink')[0].getAttribute('appid')]) {
        apparray[appdump[i].getElementsByClassName('blocklink')[0].getAttribute('appid')] = appdump[i].getAttribute('id') + ',' + appdump[i].getElementsByClassName('blocklink')[0].getAttribute('appname');
        appnamelist+= appdump[i].getElementsByClassName('blocklink')[0].getAttribute('appname') + '\n';
		    applength++;
      }
    }

    if(applength==1)
	  return false; // return and use normal block app function

    if(!confirm('Would you also like to block *ALL* ' + applength + ' of the following facebook applications?\n' + '-------------------------------------------------------------------------------\n\n' + appnamelist.replace(/\n$/,'')))
      return false;

    i=0;
    for(var j in apparray) {
      i++;
      var functRef = callLater(blockapp,j,apparray[j].split(/,/)[1], apparray[j].split(/,/)[0], 1);
      window.setTimeout(functRef, 1600*i);
    }

    window.scrollTo(0,0); // scroll up, so user can see its working
    appdump=null;
    apparray=null;
    appnamelist=null;
    return true;
  } // END blockallapps function  

  var fbpexpandnewscoltoggle = function(e) {
	var firstrun=typeof(e)==="undefined";
	//console.log(firstrun,typeof e);
    if(!firstrun)
      e.preventDefault();
    var newswidth;
    var ncstyle=document.getElementById('newscolstyle');
	if(ncstyle) {
	  if(ncstyle.textContent.length) {
	    ncstyle.textContent="";
		if(!firstrun)
		  fbpoptsobj.expandnewscolumn=false;
	  }
	  else {
		var x1=getPosition(document.querySelector("#contentArea")).x;
	    var x2=getPosition(document.querySelector("div.fbChatSidebar")).x;
	    if(x2>0) {
		  newswidth=(x2-x1)-10;	
		  //console.log("nw="+newswidth);
	    }
	    else
		  newswidth=(window.innerWidth-x1)-30;
        ncstyle.textContent="#contentArea {width:" + newswidth + "px !important} #rightCol {display:none}";
		if(!firstrun)
		  fbpoptsobj.expandnewscolumn=true;
	  }
	}
	else {
	  ncstyle=document.createElement('style');
	  ncstyle.setAttribute('id','newscolstyle')
	  
	  var x1=getPosition(document.querySelector("#contentArea")).x;
	  var x2=getPosition(document.querySelector("div.fbChatSidebar")).x;
	  if(x2>0) {
		var newswidth=(x2-x1)-10;	
		//console.log("nw="+newswidth);
	  }
	  else
		newswidth=(window.innerWidth-x1)-30;
	  ncstyle.textContent="#contentArea {width:"+ newswidth + "px !important} #rightCol {display:none}";

	  document.getElementsByTagName('head')[0].appendChild(ncstyle);
	  if(!firstrun)
	    fbpoptsobj.expandnewscolumn=true;
	}
	//save to prefs obj to localstorage
	if(!firstrun)
      fbpsavevalue('fbpoptsjson-' + currentuserid, JSON.stringify(fbpoptsobj));
  }

  var fbptoggleopts=function(e) {
    if(e)
      e.preventDefault();

	window.localStorage.scrollTop = (document.documentElement.scrollTop||document.body.scrollTop);

	if(document.querySelector("li.openToggler")) { // close fb menu if its open. they are now using div rather than li, so this part of the code seems redundant now.
	  document.querySelector("li.openToggler").setAttribute('class',document.querySelector("li.openToggler").getAttribute('class').replace(/openToggler/,''));
	}
    if(!document.getElementById('fbpoptsdiv') && document.getElementById('content') ) {
      optsdiv.innerHTML=fbpoptshtml;
      document.getElementById('content').appendChild(optsdiv);
      document.getElementById('fbpsavesettings').addEventListener('click',fbpsavesettings,false);

	  document.getElementById("closeoptslink").addEventListener('click',closeFBPoptions,false);
      document.getElementById('closefbpsettings').addEventListener('click',closeFBPoptions,false);

      document.getElementById('exportsettingslink').addEventListener('click',exportsettingsbasic,false);
      document.getElementById('importsettingslink').addEventListener('click',importsettingsbasic,false);

	  document.getElementById('custextheader').addEventListener('click',hideotherdivs,false);
	  document.getElementById('friendwhitelistheader').addEventListener('click',hideotherdivs,false);

	  document.getElementById('friendwhitelistheader').addEventListener('click',showfriendwhitelistbox,false);
	  document.getElementById('appwhitelistheader').addEventListener('click',hideotherdivs,false);
	  document.getElementById('custcssheader').addEventListener('click',hideotherdivs,false);
	  
	  document.getElementById('fontpreview').addEventListener('click',showfontpreview,false);
	  document.getElementById('fbpwebfont').addEventListener('change',showfontpreview,false);
	  
	  document.getElementById('reactionselect').addEventListener('change',reactionselect,false);
	 
	  // fix alternating colours on leftcolumn links section
	  var x=document.getElementById('leftcolopts').getElementsByTagName('table')[0].getElementsByTagName('tr');for(i=1;i<x.length;i++)x[i].setAttribute('style',''); for(i=1;i<x.length;i++) if(i%2) x[i].setAttribute('style','background-color:#ECEFF5 !important');
	  x=null;
    }
	else if(document.getElementById('fbpsavesettings') && (document.getElementById('fbpsavesettings').disabled==true) )
	  document.getElementById('fbpsavesettings').disabled=false;

    window.scrollTo(0, 0); // jump to top to ensure options screen is visible.
    //fbpgetprefs(); // is this call really neccessary? opts obj should already be populated, though perhaps opts have changed in another tab/window
    fbppopulateprefs();
	if(document.getElementById('fbpoptsdiv').style.display=='block')
	  document.getElementById('fbpoptsdiv').style.display='none';
	else
	  document.getElementById('fbpoptsdiv').style.display='block';

    if(document.getElementById('reactionsimagepack') && document.getElementById('reactionsimagepack').value!="")
	  showcurrentreactionselection();
	 
	popuplatefriendwhitelist();
	// get latest fbp news
	getfbpnews();
  }

  //------------------------
  // BEGIN News Counter Code
  //------------------------
  var fbpnewsinterval=90; // 90=1.5 hours 250=4 hours
  //var fbpnewsinterval=1; // TEST VALUE (2 minutes)
  var FBP_FEED = "www.facebook.com/fluffbustingpurity";
  //var FBP_FEED = "www.facebook.com/pages/F-B-Purity/387126378040"; // TEST FEED
  var newscounterdata='';

  function resetnewscounter(resetdata) {
    if(debug) {
      if(typeof(resetdata)!='undefined')
        console.log("resetdata='" + resetdata +"'");
	  else
	    console.log("resetdata is not defined");
	}  
	if(document.getElementById('FBPNewsAlert'))
	  document.getElementById('FBPNewsAlert').style.display='none';

    if(!resetdata && resetdata!='' || (typeof(resetdata)=='object')) { // .match(/^\[object/)) { // if its from a click in navbar, it gets a mouse event object
	  if(issafari)
        var resetdata=fbploadvalue('reset-lastnewscheck-' +currentuserid, resetnewscounter);
      else
	    var resetdata=fbploadvalue('lastnewscheck-' +currentuserid, resetnewscounter);
	  if(resetdata==-999) {
	    if(debug)
	      console.log("resetdata=" + resetdata);
        return
	  }
	}
	//console.log("resetdata=" + resetdata);
	var y=JSON.parse(resetdata);
    var x={};
    x.lastCheckTime=Date.now()+'';
	x.lastEntryDate=y.lastEntryDate;
	x.numStories=0;
	fbpsavevalue("lastnewscheck-" +currentuserid, JSON.stringify(x));
	window.setTimeout(function() {
	  if(document.getElementById('FBPNewsAlert'))
	    document.getElementById('FBPNewsAlert').style.display='none';
	  if(debug)
	    console.log('resetting news counter');
	  /*if(document.getElementById('navItem_page_408502197558')) {
		document.querySelector("#navItem_page_408502197558 span.countValue").textContent="";
		document.querySelector("#navItem_page_408502197558 span.count").className+=" hidden_elem";
	  }*/
	  if(document.getElementById("navItem_page_" + FBPFanPageID)) {
		document.querySelector("#navItem_page_" + FBPFanPageID + " span.countValue").textContent="";
		document.querySelector("#navItem_page_" + FBPFanPageID + " span.count").className+=" hidden_elem";
	  }
	  
	},10000);
	x=y=null;
  }

  function checkforlastnewsupdate(lastnewsupdatedata) {
	//x={lastCheckTime:Date.now(),lastEntryDate:"12/12/112",numStories:"12"} // format of json data
	// {"lastCheckTime":"1389401950445","lastEntryDate":"2014-01-11T00:04:37+00:00","numStories":0} // example json data
	//if(window.location.href.match(/facebook\.com\/fluffbustingpurity/))// if we are on the fbp fan page, reset the counter
	if(window.location.href.match(FBPFanPageURLRegex))
      resetnewscounter();

	if(debug) {
	  if(typeof(lastnewsupdatedata)!='undefined')
        console.log("lastnewsupdatedata='" + lastnewsupdatedata +"'");
	  else
	    console.log("lastnewsupdatedata is not defined");
	}
	if( !lastnewsupdatedata && lastnewsupdatedata!='') {
      var lastnewsupdatedata=fbploadvalue('lastnewscheck-' +currentuserid, checkforlastnewsupdate);
      if(lastnewsupdatedata==-999) {
	    if(debug)
	      console.log("lastnewsupdatedata=" + lastnewsupdatedata);
        return
	  }
    }

	if(debug)
	  console.log("lastnewsupdatedata='" + lastnewsupdatedata +"'");

	if((lastnewsupdatedata=='') || (typeof(lastnewsupdatedata)=='undefined') || (lastnewsupdatedata==null)){
	  if(debug)
	    console.log('grab fbp newsfeed and count it');
	  getfbpnewscount();
	}
	else {
	  newscounterdata=JSON.parse(lastnewsupdatedata);
	  if((currtime-newscounterdata.lastCheckTime)/1000/60 >= fbpnewsinterval) { // its time to check the feed again
		try {
		  getfbpnewscount();  
		} catch(e) {console.dir(e)}
	  }
	  else { // not yet time to check newsfeed, so lets see if theres any "unseen" news items to put in the counter.
	    if(debug)
	      console.log(((currtime-newscounterdata.lastCheckTime)/1000/60) + ' minutes have elapsed since last fbp fanpage feed check');
	    if(newscounterdata.numStories>=1) {
		  if(document.getElementById('FBPNewsAlert') && document.getElementById('FBPNewsCount')) {
		    document.getElementById('FBPNewsCount').setAttribute('title',document.getElementById('FBPNewsCount').getAttribute('title').replace(/\d+/,newscounterdata.numStories));
		    document.getElementById('FBPNewsCount').textContent=document.getElementById('FBPNewsCount').textContent.replace(/\d+/,newscounterdata.numStories);
		    document.getElementById('FBPNewsAlert').style.display="inline";
		  }
		  /*if(document.getElementById('navItem_page_408502197558')) {
		    document.querySelector("#navItem_page_408502197558 span.countValue").textContent=newscounterdata.numStories;
		    document.querySelector("#navItem_page_408502197558 span.count").className=document.querySelector("#navItem_page_408502197558 span.count").className.replace(/hidden_elem/,'');
		  }*/
		  if(document.getElementById("navItem_page_" + FBPFanPageID )) {
		    document.querySelector("#navItem_page_" + FBPFanPageID + " span.countValue").textContent=newscounterdata.numStories;
		    document.querySelector("#navItem_page_" + FBPFanPageID + " span.count").className=document.querySelector("#navItem_page_" + FBPFanPageID + " span.count").className.replace(/hidden_elem/,'');
		  }
		}
	  }
	}
  }

  function getfbpnewscount() {

	if((typeof(newscounterdata) !="undefined") && (typeof(newscounterdata.lastEntryDate) !="undefined"))
	  var lastnewsentry=newscounterdata.lastEntryDate;
	else
	  var lastnewsentry=""; // (make sure user wont see old news)

    var FBP_FEED_URL =  window.location.protocol +"\/\/" + FBP_FEED ; 

	var http = new window.XMLHttpRequest();
    http.open("GET", FBP_FEED_URL, true);
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
	    try {
		  var fbpfeed = http.responseText;
	    }
        catch (e) {
		  //fbpnewsdiv.innerHTML+='Error : Cant get the news. This can occur if you are logged in to FB as a page Admin.' ;
		  if(debug)
		    console.log('Error : Cant get the FBP news. This can occur if you are logged in to FB as a page Admin.');
		  http=fbpfeed=null;
		  return;
        }
		// also need to check for whether feed is accessible or not, then take appropriate action...

		if(fbpfeed.match(/data-utime="(\d+)"/)) {
		  var lastEntryDate=fbpfeed.match(/data-utime="(\d+)"/)[1]
		  if(lastnewsentry=="")
			i=0;
	      else if(new Date(lastEntryDate +"000" -0).getTime() > new Date(lastnewsentry.match(/^\d+$/) ? (lastnewsentry + "000") -0: lastnewsentry ).getTime())
		  //else if(lastEntryDate + 0  > lastnewsentry + 0)
		   i=1;
		  else 
		   i=0;
		  /* debugging stuff
		  console.log("lastEntryDate",lastEntryDate);
		  console.log("lastnewsentry",lastnewsentry);
		  console.log(i,"number of new stories");

		  zx=new Date(lastEntryDate +"000" -0);
		  yz=new Date(lastnewsentry.match(/^\d+$/) ? (lastnewsentry + "000") -0: lastnewsentry );
		  console.log("new = " + zx.getTime());
		  console.log("old = " + yz.getTime());
		  */

	    // "i" is now the number of *new* news items in the feed, so we need to update the counter next to the FB Purity News link;
		if(debug)
	      console.log("number of new fan page stories= "+ i);
		var x={};
		x.lastCheckTime=Date.now()+'';
		x.lastEntryDate=lastEntryDate;

		if((typeof(newscounterdata)!='undefined') && (typeof(newscounterdata.numStories)!='undefined'))
		  x.numStories= i + newscounterdata.numStories;
		else
		  x.numStories=i;
		fbpsavevalue( "lastnewscheck-" +currentuserid, JSON.stringify(x));
		checkforlastnewsupdate(); // <- why is this function here???
		http=fbpfeed=x=null;
		
	  } // end we matched "data-utime"

	  } // end http status=200
    }
	http.send();
  }
  //----------------------
  // END News Counter Code
  //----------------------

  // display news notifications tickbox on fbp options screen
  var getfbpnews=function() {

	var fbpnewsdiv=document.getElementById('fbpnewsdiv');
	fbpnewsdiv.style.marginLeft='4px';
	fbpnewsdiv.style.marginTop='4px';
	if(fbpnewsdiv.innerHTML.length)
	  return;
	fbpnewsdiv.innerHTML+='<h4 style="margin-top:4px"><a title="news.fbpurity.com" href="http://www.fbpurity.com/news.htm">F.B. Purity Latest News</a> <span style="margin-left:10px;font-weight:normal !important" title="Show FBP News notifications in the top nav bar"><input type="checkbox" id="fbpnewsnotifier" style="vertical-align:middle"><label for="fbpnewsnotifier">Show FBP News Notifications</label></span></h4>';

	// create the tickbox
	if(document.getElementById('fbpnewsnotifier') && fbpoptsobj && fbpoptsobj.fbpnewsnotifier) // we need to init this checkbox here, because its added later than the rest of the options
	  document.getElementById('fbpnewsnotifier').checked=true;
  } // END getfbpnews function

  function fullscreenchat() { //open chat messages in full screen mode
	window.addEventListener('click',function(e) {
      //console.log(e.target); //console.log(e.button);
	  //console.log(e.target.offsetParent);
	  //console.log(e.button);
	  var chatbar=document.querySelector('.fbChatSidebar');
	  var chatlist=document.querySelector('#BuddylistPagelet div.fbChatOrderedList');
	  var buddylist=document.querySelector('#BuddylistPagelet');
	  var sidebarchat=document.querySelector('#pagelet_sidebar div.fbChatSidebarBody div.fbChatOrderedList');

	  if(buddylist && e.target.offsetParent && e.target.offsetParent.classList.contains("fbNubFlyoutTitlebar")) {
		// deal with 'new message' button at top of chat buddylist
		//console.log('hit on the nail;');
		if(e.target.nodeName=="A" && (e.target.getAttribute('aria-label')=='New Message')){
		  e.preventDefault();
		  if(e.stopPropagation)
		    e.stopPropagation();
		  window.location.href="/messages/new/";
		}
	  }
	  if((chatlist && chatlist.contains(e.target))||(sidebarchat && sidebarchat.contains(e.target))) {
	     // if friend is clicked in buddy list in right hand chat pane or sidebar chat list
		 //console.log('we are in the list');
		 var a=e.target,c;
         c=a; 
		 while((c=c.parentNode)&&c.nodeName!=='LI');
		 if(c){ // we hit gold
		   //console.log(c.nodeName + ' ' + c.getAttribute('data-id'))
		   e.preventDefault();
		   if(e.stopPropagation)
		     e.stopPropagation();
		   window.location.href="/messages/" + c.getAttribute('data-id');
		 }
		 else
		   return;
	  }
	  // we are now redirecting clicks in the right hand chat window via a new Chat object function via code injection (scratch that)
	  if (e.target.offsetParent && (typeof(e.target.offsetParent.href) !='undefined') && e.target.offsetParent.href.match(/\/messages\//)  && (e.target.nodeName!='I')) {  // message links in top bar flyout // && (e.button!=1)
		if(e.target.parentNode.getAttribute('href') && e.target.parentNode.getAttribute('href').match(/#/)){ // handle sticker store preview/add buttons
	      console.log('is this what we are hitting? 1'); 
		  return;
		}
		if(e.button==2) // right click
		  return;
		if(e.button==1) {// middle click
		  //window.open(e.target.offsetParent.href); // commented out because it was causing 2 tabs to open
		  return;
		}
		if((e.target.offsetParent.getAttribute('ajaxify') && e.target.offsetParent.getAttribute('ajaxify').match(/^\/ajax\/flash\/expand_inline\.php/))) {
		  // fixes reload when youtube vids are clicked in inbox
	      return;
        }
		e.preventDefault();
		if(e.stopPropagation)
		  e.stopPropagation();
		window.location.href=e.target.offsetParent.href;
	  }
	  else if((typeof(e.target.dataset['reactid'])!=='undefined') && e.target.dataset['reactid'].match(/_(users|friends|list)\.\$/)) {
		if(e.button==2) // right click
		  return;
		e.preventDefault();
		  if(e.stopPropagation)
		    e.stopPropagation();
		  if(e.button==1) // middle click
		    window.open('https://www.facebook.com/messages/' + e.target.dataset['reactid'].match(/_(users|friends|list)\.\$(\d+)\./)[2]);
		  else
		    window.location.href="/messages/" + e.target.dataset['reactid'].match(/_(users|friends|list)\.\$(\d+)\./)[2];
	  }
	  else if(e.target.nodeName=='A' && (e.target.href.match(/\/ajax\/messaging\/composer\.php|\/messages\/new\//) || (e.target.getAttribute('ajaxify') && (e.target.getAttribute('ajaxify').match(/\/ajax\/messaging\/composer\.php/))))) {  // composer link in top bar flyout
		if(e.button==2) // right click
		  return;
		e.preventDefault();
		  if(e.stopPropagation)
		    e.stopPropagation();
		  if(e.button==1) { // middle click
		    if(e.target.getAttribute('ajaxify') && (e.target.getAttribute('ajaxify').match(/\/ajax\/messaging\/composer\.php\?ids/)))
		      window.open(e.target.href);
		    else
		      window.open('https://www.facebook.com/messages/new');
		  }
		  else {
		    if(e.target.getAttribute('ajaxify') && (e.target.getAttribute('ajaxify').match(/\/ajax\/messaging\/composer\.php\?ids/)))
			  window.location.href=e.target.href;
			else
		      window.location.href='https://www.facebook.com/messages/new';
		  }
	  }
	  else if(e.target.parentElement && e.target.parentElement.nodeName && e.target.parentElement.nodeName=='A' && (e.target.className && e.target.className.match(/HovercardMessagesButton/)) || (e.target.parentElement.className && e.target.parentElement.className.match(/HovercardMessagesButton/))) {  // message buttons on hovercards
	    if(e.button==2) // right click
		  return;
		e.preventDefault();
		if(e.stopPropagation)
		  e.stopPropagation();
		if(e.button==1)
		  window.open(e.target.offsetParent.href);
		else
		  window.location.href=e.target.offsetParent.href;
	  }
	  else if(e.target.nodeName=='SPAN' && e.target.parentElement.getAttribute('ajaxify') && e.target.parentElement.getAttribute('ajaxify').match(/\/ajax\/messaging\/composer\.php\?/)) {
		if(e.button==2) // right click
		  return;
		e.preventDefault();
		if(e.stopPropagation)
		  e.stopPropagation();
		if(e.button==1)
		  window.open(e.target.parentElement.href);
		else
		  window.location.href=e.target.parentElement.href;
	  }
	  else if(chatbar && chatbar.contains(e.target) && e.target.getAttribute('data-reactid') && e.target.getAttribute('data-reactid').match(/\$\d/)) {
		if(e.button==2) // right click
		  return;
		e.preventDefault();
		if(e.stopPropagation)
		  e.stopPropagation();
		if(e.button==1) { // middle click - // check if group convo
		  if(e.target.getAttribute('data-reactid') && e.target.getAttribute('data-reactid').match(/group_threads/))
			window.open("https://www.facebook.com/messages/conversation-" + e.target.getAttribute('data-reactid').match(/\$(\d+)/)[1]);
		  else
		    window.open("https://www.facebook.com/messages/" + e.target.getAttribute('data-reactid').match(/\$(\d+)/)[1]);
		}
		else {
		  if(e.target.getAttribute('data-reactid') && e.target.getAttribute('data-reactid').match(/group_threads/))
			window.location.href="https://www.facebook.com/messages/conversation-" + e.target.getAttribute('data-reactid').match(/\$(\d+)/)[1];
		  else
		    window.location.href="https://www.facebook.com/messages/" + e.target.getAttribute('data-reactid').match(/\$(\d+)/)[1];
		}
	  }
    } ,true);
  } // end fullscreenchat function

  function filtermatchmsg(mnode, msg) {
    if(mnode.getElementsByClassName('filtermatchtext').length)
      mnode.getElementsByClassName('filtermatchtext')[0].textContent=msg;
    else {
	  var matchspan=document.createElement('div');
	  matchspan.setAttribute('class','filtermatchtext');
	  matchspan.style.color='grey';
	  matchspan.style.marginBottom='4px';
	  matchspan.style.marginLeft='10px';
	  matchspan.style.marginTop='-4px';
	  matchspan.appendChild(document.createTextNode(msg));
	  mnode.appendChild(matchspan);
	  matchspan=null;
	}
  }

  function cleartheshizzle(thenode) {
    if((typeof(fbpStyleNormal) === 'undefined') || window.location.href.match(/facebook\.com\/messages\//))
	  return;
    if(typeof thenode==='undefined'){
	  thenode=document;
	  console.log("fbp:cleartheshizzle was called without a passed in node");
	}

    if(debug) {
      console.log('clearing the shizzle a : '  + window.location.href);
	  if(thenode && thenode.getAttribute && thenode.getAttribute('class'))
	    console.log(thenode.getAttribute('class'));
	  if(thenode && thenode.textContent)	
	    console.log(thenode.textContent);
	}
	//if(thenode.parentNode.getAttribute("data-dedupekey"))
	//  console.log(thenode.parentNode.getAttribute("data-dedupekey"));
    //console.log(thenode.id);

	var oldfeedstyle=document.getElementById('pagelet_home_stream');
    var newfeedstyle=document.getElementById('pagelet_litestand_section');
	var neweststyle= document.getElementById('stream_pagelet');
	
	var fbpblockcountspan,fbpblockxcountspan,insertpoint;
	//var hashtagstyle=document.getElementById('hashtag_permalink_feed');
	
	//if(!(oldfeedstyle || newfeedstyle || neweststyle || hashtagstyle)) {
	if((!(oldfeedstyle || newfeedstyle || neweststyle)) && !(thenode.querySelector('div.fbFeedTickerStory') || thenode.classList.contains('fbFeedTickerStory'))) {
	  console.log('FBP Error: couldnt find the news stream');
	  return;
	}
    //if(!document.getElementById('pagelet_home_stream') || (!document.getElementById('pagelet_litestand_section')))
	//  return;
	
	//if( thenode.getAttribute('data-dedupekey')) {
    //  console.log(thenode.getAttribute('data-dedupekey'));
	//}

    if(!document.getElementById('fbpblockcount')) {

      var crappyappmsgcounter=0;
      fbpstyle.textContent=fbpStyleNormal;

      if(document.getElementById('pagelet_fl_composer')) // friends list page
        insertpoint = document.getElementById('pagelet_fl_composer');
      else if (document.getElementById('profile_stream_composer'))  //profile page or fanpage
        insertpoint = document.getElementById('profile_stream_composer');
      else if (document.getElementById('pagelet_composer')) //homepage
        insertpoint = document.getElementById('pagelet_composer');
	  else if (document.getElementById('stream_pagelet')) // some friends lists/ interest lists dont have a composer box
	    insertpoint = document.getElementById('stream_pagelet');
	  /*else if (document.getElementById('hashtag_permalink_feed'))
	    if(document.getElementsByClassName('uiPubContentStories').length)
		  var insertpoint = document.getElementsByClassName('uiPubContentStories')[0];
	    else if(document.getElementById('hashtag_permalink_feed').firstChild && document.getElementById('hashtag_permalink_feed').firstChild.firstChild)
	      var insertpoint = document.getElementById('hashtag_permalink_feed').firstChild.firstChild;
		else
		  var insertpoint = document.getElementById('hashtag_permalink_feed');
	  */
	  /*else if(document.getElementById('timelineNavContent')) {
	    return; 
	    //var insertpoint = document.getElementById('timelineNavContent');
	  }*/
      else if(window.location.href.match(/facebook\.com\/apps\/feed/) || window.location.href.match(/facebook\.com\/pages\/feed/) || window.location.href.match(/\?sk=pages/))
	    insertpoint = document.getElementById('contentArea'); 

      if(insertpoint) {
        if(document.getElementsByClassName('uiHeaderPage') && document.getElementsByClassName('uiHeaderPage').length)
          document.getElementsByClassName('uiHeaderPage')[0].setAttribute('style','padding-bottom:5px');
        var fbpurityinfowrapper=document.createElement('div');
        if(oldfeedstyle || neweststyle)
          fbpurityinfowrapper.style.marginTop='-10px';
		fbpurityinfowrapper.style.marginBottom='2px';
		fbpurityinfowrapper.setAttribute('id','fbpurityinfowrapper');
		if(document.getElementById('boulder_fixed_header'))
		   document.getElementById('boulder_fixed_header').firstChild.style.marginTop='13px';
        var fbpurityinfo=document.createElement('div');
        fbpurityinfo.setAttribute('id','fbpurityinfobar');
        var fbpclear=document.createElement('div');
        fbpclear.style.clear='both';

        fbpurityinfo.style.cssFloat='right';
        fbpurityinfo.style.background='whitesmoke';
        fbpurityinfo.innerHTML='<span id="fbpupgradeinfo" style="color:red"></span>&nbsp;<a id="fbpoptslink" title="' + fbpVersion + ' - Fluff Busting Purity - Options" href="javascript:;"><b>F.B. Purity</b></a> <span id="fbperrormsg" style="color:red"></span> hid: &nbsp;<span id="fbpblockcount">0</span> <abbr title="Application + Game Stories">app</abbr> [ <a title="Show Game + Application Stories" id="fbpshowblockedlink" href="javascript:;">Show</a> ] &nbsp;<span id="fbpblockxcount">0</span> <abbr title="Friend/Group/Fan/Event etc Stories">extra</abbr> [ <a title="Show Friend/Group/Fan/Event etc Stories" id="fbpshowblockedxlink" href="javascript:;">Show</a> ]&nbsp;<a id="fbpexpandnewscoltoggle" href="javascript:;" title="Expand/Contract News Column"><b style="font-size:14px">&hArr;</b></a>';

        fbpurityinfowrapper.appendChild(fbpurityinfo);
        fbpurityinfowrapper.appendChild(fbpclear);

        if((document.getElementById('pagelet_composer') || document.getElementById('pagelet_fl_composer')) && (!document.getElementById('fbpurityinfobar'))) // homepage // fanpage or // friends list page
          insertpoint.parentNode.insertBefore(fbpurityinfowrapper, insertpoint.nextSibling); // after composer
        else if (document.getElementById('profile_stream_composer')  && (!document.getElementById('fbpurityinfobar')))
          insertpoint.parentNode.insertBefore(fbpurityinfowrapper, insertpoint.nextSibling);
		else if (window.location.href.match(/facebook\.com\/lists/) && document.getElementById('stream_pagelet')  && (!document.getElementById('fbpurityinfobar'))) 
		  insertpoint.parentNode.insertBefore(fbpurityinfowrapper, insertpoint);
		//else if (window.location.href.match(/facebook\.com\/hashtag/) && document.getElementById('hashtag_permalink_feed')  && (!document.getElementById('fbpurityinfobar'))) 
		//  insertpoint.parentNode.insertBefore(fbpurityinfowrapper, insertpoint);
		else if (document.getElementById('timelineNavContent') && (!document.getElementById('fbpurityinfobar'))) {
		  fbpurityinfowrapper.style.display='none'; // we not showing bar for now, as filtering doesnt work on timeline yet
          insertpoint.appendChild(fbpurityinfowrapper);
		}
		else if(window.location.href.match(/facebook\.com\/apps\/feed/) || window.location.href.match(/facebook\.com\/pages\/feed/) || window.location.href.match(/\?sk=(pages|groups)/)) { // games feed page
		  insertpoint.insertBefore(fbpurityinfowrapper, insertpoint.firstChild);
		}

		/* //commented out for now, as not working as expected...
		if(document.querySelector('div._4-u2.mvm._495i span')) { // add chrono sort to "Viewing most recent" text if its there
		  document.querySelector('div._4-u2.mvm._495i span').addEventListener('click',function(){ document.removeEventListener("DOMNodeInserted", fbpInsertedNodeDomHandler);chronoSortStream(); document.addEventListener("DOMNodeInserted", fbpInsertedNodeDomHandler, false)},false);
		  document.querySelector('div._4-u2.mvm._495i span').setAttribute('title','Click to sort the feed Chronologically with FBP');
		}*/

        if(document.getElementById('fbpshowblockedlink'))
          document.getElementById('fbpshowblockedlink').addEventListener("click", fbpshowblockedev, false);
		if(document.getElementById('fbpshowblockedxlink'))
          document.getElementById('fbpshowblockedxlink').addEventListener("click", fbpshowblockedxev, false);
        if(document.getElementById('fbpoptslink'))
          document.getElementById('fbpoptslink').addEventListener("click", fbptoggleopts, false);
		if(document.getElementById('fbpexpandnewscoltoggle'))
          document.getElementById('fbpexpandnewscoltoggle').addEventListener("click", fbpexpandnewscoltoggle, false);

        fbpblockcountspan=document.getElementById('fbpblockcount');
        fbpblockxcountspan=document.getElementById('fbpblockxcount');

      }

    }

    //if we navigate away from the page then come back, the event listeners seem to disappear, so lets re-add them here.
    if( document.getElementById('fbpshowblockedlink') ) {
      document.getElementById('fbpshowblockedlink').removeEventListener("click", fbpshowblockedev, false);
      document.getElementById('fbpshowblockedlink').addEventListener("click", fbpshowblockedev, false);
    }
    if( document.getElementById('fbpshowblockedxlink') ) {
      document.getElementById('fbpshowblockedxlink').removeEventListener("click", fbpshowblockedxev, false);
      document.getElementById('fbpshowblockedxlink').addEventListener("click", fbpshowblockedxev, false);
    }
    if( document.getElementById('fbpoptslink') ) {
      document.getElementById('fbpoptslink').removeEventListener("click", fbptoggleopts, false);
      document.getElementById('fbpoptslink').addEventListener("click", fbptoggleopts, false);
    }
    if( document.getElementById('fbpexpandnewscoltoggle') ) {
      document.getElementById('fbpexpandnewscoltoggle').removeEventListener("click", fbpexpandnewscoltoggle, false);
      document.getElementById('fbpexpandnewscoltoggle').addEventListener("click", fbpexpandnewscoltoggle, false);
    }

	//filter the ticker 
	if((typeof(fbpoptsobj.newstickertextfilter)!='undefined') && fbpoptsobj.newstickertextfilter) {
	  var tickerstories=thenode.querySelectorAll('.fbFeedTickerStory');
	  if(!tickerstories[0])
	    if(thenode.getAttribute && thenode.getAttribute('class') && thenode.getAttribute('class').length && thenode.getAttribute('class').match(/fbFeedTickerStory/)) {
		  tickerstories=[];
		  tickerstories[0]=thenode;
	    }
	  var user;
      for(var t in tickerstories) {
        user='';
        if(tickerstories[t].getAttribute && tickerstories[t].getAttribute('data-actor'))
          user=tickerstories[t].getAttribute('data-actor');
        if(user.length && user.match(useridwhitelistRX))
          continue;

        if(tickerstories[t].textContent && tickerstories[t].textContent.match(headertextfilterRX)) {
		  tickerstories[t].style.setProperty ("display", "none", "important");
		  continue;
		}
        if(tickerstories[t].textContent && tickerstories[t].textContent.match(textfilterRX)) {
		  tickerstories[t].style.setProperty ("display", "none", "important");
		  continue;
		}
	    if(fbpoptsobj.becamefan && tickerstories[t].getAttribute && tickerstories[t].getAttribute('data-flyoutdata') && tickerstories[t].getAttribute('data-flyoutdata').match(/EntFanPageEdgeStory/)) {
		  tickerstories[t].style.display='none';
		  continue;
		}
	  	if(fbpoptsobj.commentwall && tickerstories[t].querySelector && tickerstories[t].querySelector('img.wallArrowIcon')){
		  tickerstories[t].style.display='none';
		  continue;
		}
      }
	  tickerstories=t=user=null;
	}

    var storynodes, singlestory;
    singlestory=0;

	// new newsfeed design
    //storynodes=thenode.querySelectorAll("div[data-dedupekey],div[data-insertion-position]");

    // temp debug code	 
	/*
	console.log(typeof(thenode));
	if((typeof(thenode.getAttribute)!='undefined') && (!thenode.getAttribute("data-dedupekey")))
	  console.log(thenode.textContent);
	*/
	// temp debug code

	storynodes=thenode.querySelectorAll("div[data-dedupekey]");

	// TEMP DEBUGGING CODE
	/*
	if (storynodes[0]) {
	  console.log(storynodes.length);
	  console.dir(storynodes[0]);
      console.log(storynodes[0].textContent)
	}
    else  {
      console.log("no dedupekey nodes");
	}
	*/
	/* if((typeof(storynodes[0])!="undefined") && (typeof(storynodes[0].getAttribute)!='undefined') && storynodes[0].getAttribute('class') && storynodes[0].getAttribute('class').match(/userContentWrapper/) && storynodes[0].parentNode && storynodes[0].parentNode.id && storynodes[0].parentNode.id.match(/^u_jsonp/))
		 console.log(storynodes[0].parentNode.parentNode.textContent);
	*/
	// TEMP DEBUGGING CODE

    if (!storynodes[0])
	  //if(thenode.getAttribute && (thenode.getAttribute('data-dedupekey')|| thenode.getAttribute('data-insertion-position'))) {
      if(thenode.getAttribute && thenode.getAttribute('data-dedupekey')) {
		storynodes=[];
        storynodes[0]=thenode;
        singlestory=1;
		if(debug)
		  console.log('single story=1');
      }
      else {
        if(debug)
		  if(thenode.getAttribute && thenode.getAttribute('class'))
		    console.log('no generic: ' + thenode.getAttribute('class'));
		  else
			console.log('no generic');
        return;
      }

    var blockit, blockitx;
    var attribappid, applink;
	var storysaction, storysactiontext;
	var actorialink, actoriadatacard;
    var storylinks,storylink,storynodeslength,matchedtext;

    if(singlestory)
      storynodeslength=1;
    else  
      storynodeslength=storynodes.length;
    if(debug)
	  console.log("nodes length=" + storynodes.length)
    // START MAIN LOOP	
    for(i=0;i<storynodeslength;i++) {

      blockit=0;

	  if((typeof(storynodes[i])!='undefined') && storynodes[i].textContent=="") { // deal with initial blank entries on list pages. not sure why now, but these lines are necessary.
        continue; 
	  }

      /*console.log(storynodes[i].id,storynodes[i].className,storynodes[i].textContent);
	  if(storynodes[i].getAttribute('data-dedupekey')) {
	    console.log(storynodes[i].getAttribute('data-dedupekey'));
		console.log(storynodes[i].outerHTML);
	  }
	  */

	  //parse the story's header for the story type and check the header for any matches
      storysaction=storynodes[i].getElementsByTagName('h5');
	  if(storysaction && storysaction.length) {
	    //console.log(storysaction + storysaction.length + storysaction[0].textContent);
	    storysactiontext=storysaction[0].textContent;
	  }
      else {
        storysactiontext=storynodes[i].textContent;
      }
	  if(typeof storysactiontext=='undefined') 
	    storysactiontext='';

      if(debug)
  	    console.log(storysactiontext);

	  /* latest facebook code change broke this
      story_meta=storynodes[i].getAttribute('data-ft');
	  if(story_meta==null) {
        if(storynodes[i].className.match(/uiFacepile|uiListHorizontal|uiListVerticalItemBorder/)) { // deals with new feature of friends list pages
		  //console.log('continuing as data-ft is null');
		  continue;
        }
		//console.log('breaking as data-ft is null');
        break;
      }
	  */

	  storynodes[i].style=''; // 13/4/2016: deal with posts that have display:block !important and visibility:visible !important in the style attribute
	  // could the above line be causing other problems??? test this out... comments not loading from notifications on Page... etc
	  
	  // sponsored stories filter
	  if(fbpoptsobj.sponsoredbox && ((storynodes[i].querySelector("a.uiStreamSponsoredLink,div[data-ft*='\"ei\":'],div[data-xt],video[poster^='/images/ad_network/'],iframe.fbEmuTracking,a[href^='https://www.facebook.com/about/ads'],a[href^='https://www.facebook.com/ads/about'],a[href^='/about/ads'],a[href^='/ads/about']")))) { //,iframe[src^='/xti.php']
		storynodes[i].style.display='none';
		//storynodes[i].style.backgroundColor='red';
		if(debug)
		  console.log('Found An Ad!!');
		continue;
	  }
	  // "Games you may like" story filter
	  if(fbpoptsobj.filterappmessages && storynodes[i].querySelector("a[href='https://www.facebook.com/games/']")) {
		storynodes[i].style.display='none'; //storynodes[i].style.backgroundColor='red';
		continue;
	  }
      // people you may know story filter
	  if(fbpoptsobj.pymk && storynodes[i].getElementById && storynodes[i].getElementById("feed_pymk_header")) {
		storynodes[i].style.display='none'; //storynodes[i].style.backgroundColor='red';
		continue;
	  }
	  
	  // beef up the celebrate x day type posts filter (part of the hide nagging questions option)
	  if(fbpoptsobj.nonags && storynodes[i].querySelector('a[href^="/qp/action/"]')) {
		  storynodes[i].style.display='none'; //storynodes[i].style.backgroundColor='red';
		  continue;
	  }
	  // experimental swearing filter (seems a bit memory intensive..)
	  /*
	  var swearfilter=1;
	  if(swearfilter) {
	    storynodes[i].innerHTML=storynodes[i].innerHTML.split(/swear1|swear2|swear3/i).join("****");
	  }
	  */

      // start fan page story filter . also check that we are not on an fb fan page or the story is not by the current logged in user
	  actorialink=storynodes[i].querySelector("h5 a[data-hovercard]");
	  if(!actorialink)
	    actorialink=storynodes[i].querySelector("h5 a[data-hovercardx]");
	  if(actorialink) {
         actoriadatacard=actorialink.getAttribute('data-hovercard');
		 if(!actoriadatacard)
		   actoriadatacard=actorialink.getAttribute('data-hovercardx');
	  }
	  if(debug && actoriadatacard) {
	    console.log('datacard=' + actoriadatacard);
	    console.log('datacardmatch=' + actoriadatacard.match(useridwhitelistRX));
	  }
	  if(actoriadatacard) {
		if (actoriadatacard.match(useridwhitelistRX)) { // if its fbp or the current user
		  if(actoriadatacard.match(currentuserid)){ // dont add whitelisted text for current user
		    if(typeof(fbpoptsobj.yourmemories)!="undefined" && (fbpoptsobj.yourmemories==1)){ // need to make an exception for "your memories"
			  if(storynodes[i].querySelector("a[href^='/onthisday/?source=promotion_feed_story']")) {
			    storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ ' fbpblockedx');
			    filtermatchmsg(storynodes[i],'FBP : Story Type Filter Match - Your Memories');
			  }
			  else
			    storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ ' fbpnormal');
		    }
		    else
		      storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ ' fbpnormal');
		  }
	      else 
			storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ ' fbpnormal fbpWL');
          actoriadatacard=null;
          actorialink=null;
          //actoria=null;
          continue;
		}
		else if(fbpoptsobj.pagestory && (!document.getElementById('pagelet_pages_about')) && actoriadatacard.match(/page\.php/) && (!window.location.href.match(/facebook.com\/(pages\/feed|lists\/)/))) {
		  // if we are on the "page feed" or interest list leave it alone
          //if(actoriadatacard.match(/page\.php/) && (!actoriadatacard.match(/id=408502197558/))) {
          //its a page and its not fbp;
          storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ ' fbpblockedx');
		  filtermatchmsg(storynodes[i],'FBP : Story Type Filter Match - Fan Page Story');
          updateblockedcount();
          actoriadatacard=null;
          actorialink=null;
          //actoria=null;
          continue;
        }
        actoriadatacard=null;
      }
      actorialink=null;
      // end fan page story filter
		
	  if(fbpoptsobj.imagetagsonhover) { // show image classification text when mouse pointer hovers over single image post
		var imageisclassified=storynodes[i].querySelectorAll('img[alt*=":"]'); // need to loop through all matched images...
		if(imageisclassified.length) {
		  for(var imgindex=0; imgindex<imageisclassified.length; imgindex++) {
		    var imageisclassifiedtext=imageisclassified[imgindex].getAttribute('alt');
		    imageisclassified[imgindex].parentNode.parentNode.setAttribute('title',imageisclassifiedtext);
		  }
	    }
	  }
	  
      // need to refactor below code to work for multiple images... maybe just try and match on first image for now to get it working quickly, then figure out the rest later
	  if(photosubjectfilterlist.length) {
		// filter images based on contents
		if(((typeof (imageisclassified)!='undefined')&&(imageisclassified!=null)&&(imageisclassified.length)) ||  (storynodes[i].querySelector('img[alt*=":"]'))){
		//if(storynodes[i].querySelector('img[alt*=":"]')) {
		  if((typeof imageisclassifiedtext!='undefined') && (imageisclassifiedtext!=null))
			var psubjectmatch=imageisclassifiedtext.split(":")[1].match(photosubjectfilterlistRX);
		  else
		    var psubjectmatch=storynodes[i].querySelector('img[alt*=":"]').getAttribute('alt').split(":")[1].match(photosubjectfilterlistRX);	
		  //console.log(psubjectmatch);
	      if(psubjectmatch && psubjectmatch.length){
			matchedtext=psubjectmatch[0];
			if(matchedtext=='text')
			  matchedtext='meme';
		    if(matchedtext=='2 people')
			  matchedtext='happy couple';
		    filtermatchmsg(storynodes[i],'   FBP : Image Content Filter Match - ' + matchedtext);
		    storysactiontext=matchedtext=psubjectmatch='';
			storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ ' fbpblockedx');
		    updateblockedcount();
            continue;
		  }
			  
		}
	  }
	  if(typeof imageisclassified!='undefined')
	    imageisclassified=imageisclassifiedtext=null;

	  if(fbpoptsobj.checkedin && storynodes[i].querySelector("a[rel='dialog'][ajaxify^='/places/map']")) {
		storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ ' fbpblockedx');
		filtermatchmsg(storynodes[i],'FBP : Story Type Filter Match - Changed Location');
        updateblockedcount();
		continue;
	  }

	  //unsafeWindow.console.log('"'+storysactiontext+'"' + ' ' + headerTextFilter);
	  // lets check the header text filter
	  if(storysactiontext.length && headerTextFilter.length && storysactiontext.match(headertextfilterRX)) {
		storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpblockedx');
		matchedtext=storysactiontext.match(headertextfilterRX)[0];
		filtermatchmsg(storynodes[i],'   FBP : Story Type Filter Match - ' + matchedtext);
		storysactiontext=matchedtext='';
		updateblockedcount();
        continue;
	  }
      //console.log('here we are1', storynodes[i].textContent,storynodes[i].textContent.match(textfilterRX));
      // lets check the text filter
      if(cleancustomtextfilter.length && storynodes[i].textContent.length && storynodes[i].textContent.match(textfilterRX)) {
		// window.console.log("here we are 2",storynodes[i].textContent,textfilterRX,storynodes[i].textContent.match(textfilterRX));
        storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpblockedx');
		filtermatchmsg(storynodes[i],'   FBP : Text Filter Match - ' + storynodes[i].textContent.match(textfilterRX)[0]);
		updateblockedcount();
        continue;
      }

	  // if hide all photos option has specifically been ticked	  
	  if((typeof fbpoptsobj.hideallphotos!=='undefined') && fbpoptsobj.hideallphotos)
	   if(!window.location.href.match(/facebook\.com\/\?sk=photos/))
        if(storynodes[i].querySelectorAll("a[rel='theater']").length) {
		  storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpblockedx');
		  filtermatchmsg(storynodes[i],'   FBP : Story Type Filter Match - Hide All Photos');
		  updateblockedcount();
          continue;
		}

	  // hide trending stories from the newsfeed
	  if((typeof fbpoptsobj.readarticle!=='undefined') && fbpoptsobj.readarticle) {
	    if(storynodes[i].querySelector("div.userContentWrapper a[href$='?source=ftp'],div.userContentWrapper  a[href$='?source=fttp'],div.userContentWrapper  a[href^='/topic/']")) {
		  storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpblockedx');
		  filtermatchmsg(storynodes[i],'   FBP : Story Type Filter Match - Hide Trending Stories');
		  updateblockedcount();
          continue;
		}
	  }

	  if((typeof fbpoptsobj.hideallvideos!=='undefined') && fbpoptsobj.hideallvideos) {
		if(storynodes[i].querySelector('a[href*="video.php"],a[href*="youtube"],a[href*="youtu.be"],a[href*="vimeo.com"],img[src*="vthumb"],video,img._9_m,a[href*=".gifv"],input[type="button"][aria-label="Play video"]')) { //img._9_m = animated gif
		  //console.log('we found a vid');
		  storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpblockedx');
		  filtermatchmsg(storynodes[i],'   FBP : Story Type Filter Match - Hide All Videos');
		  updateblockedcount();
          continue;
		}
		/*else{
		  //console.log('we didnt find a video');
		}*/
	  }
	  else if ((typeof fbpoptsobj.sharedvideo!=='undefined') &&fbpoptsobj.sharedvideo){
	    var svid=storynodes[i].getElementsByClassName('shareMediaVideo');
	    if(svid.length) 
		  if(svid[0].getAttribute('href') &&  svid[0].getAttribute('href').match(/facebook\.com\/video\/video\.php/)) {
		    storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpblockedx');
		    filtermatchmsg(storynodes[i],'   FBP : Story Type Filter Match - Hide Shared Video');
		    updateblockedcount();
			svid=null;
            continue;
		  }
	  }

	  // NEED TO REFACTOR THIS SECTION OF CODE FOR FINDING APPID ETC
        // so far it looks like a normal story, but lets check if its been posted by an application
        blockit=0;

		if(storynodes[i].textContent.match(/·.* via .*·/)) {
		  applink=storynodes[i].querySelector("a[href^='https://www.facebook.com/apps/application.php']");
		  if(applink) { 
			attribappid=applink.getAttribute('href').match(/application\.php\?id=(\d+)/)[1];
			if(attribappid) {
			  if(!arrwhitelist2[attribappid])
                blockit=1; // its not in the whitelist so block it
			}
	      }
		}

        // this block is the old way of finding appid, maybe we can comment this if block out
		if(storynodes[i].querySelector('a[data-gt*=\'{\"appid\"\']')) {
		  attribappid = storynodes[i].querySelector('a[data-gt*=\'{\"appid\"\']').getAttribute('data-gt').match(/"appid":"?(\d+)"?/)[1];
		  if(attribappid) {
			if(!arrwhitelist2[attribappid])
              blockit=1; // its not in the whitelist so block it
          }
		}

		if(storynodes[i].querySelector('div[data-gt*=\"appid\"]')) {
		  attribappid = storynodes[i].querySelector('div[data-gt*=\"appid\"]').getAttribute('data-gt').match(/"appid":"?(\d+)"?/)[1];
		  if(attribappid) {
			if(!arrwhitelist2[attribappid])
              blockit=1; // its not in the whitelist so block it
          }
		}

		// new app checks for fb actions / frictionless sharing apps
		var sua=0;
		if(storysaction && storysaction.length) {
		  attribappid=storysaction[0].innerHTML.match(/\/hovercard\/application\.php\?id\=(\d*)/);
		  if(attribappid) {
		    if(!arrwhitelist2[attribappid[1]]) {
              blockit=1; // its not in the whitelist so block it
			  sua=1;  // sua = started using app?
		    }
		  }
		  else {
		    if(storynodes[i].getAttribute('data-gt')) {
			  //"appid":"163114453728333"
			  if(storynodes[i].getAttribute('data-gt').match(/\"appid\":\"\d+\"/)) {
			    attribappid=storynodes[i].getAttribute('data-gt').match(/\"appid\":\"(\d+)\"/)[1];
				if(!arrwhitelist2[attribappid]) {
                  blockit=1; // its not in the whitelist so block it
				  sua=1; // sua = started using app?
		        }
		      }
			}
		  }
		}

        if(blockit) {
          // mark app as blocked
		  if(document.location.href.match(/\/apps\/feed/)) // dont filter apps if on game feed page
            storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ " fbpnormal");
		  else
			storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+ filterapptext);
		  if(sua)
		    dspBlockLink(storynodes[i],"sua");
		  else
            dspBlockLink(storynodes[i]);
        } 
        else {
          //its probably a "normal" story node but lets check for attachments (photos or links)
		  if (fbpoptsobj.postedlink && (!storynodes[i].getAttribute('class').match(/fbp/)) ) {
			if(storynodes[i].querySelector('div[data-ft=\'{"tn":"H"}\']') && storynodes[i].querySelector('div[data-ft=\'{"tn":"H"}\']').querySelector('a[onclick^="LinkshimAsyncLink"]')) {
		      storynodes[i].setAttribute('class',storynodes[i].getAttribute('class').replace('fbpnormal','') +' fbpblockedx');
			  filtermatchmsg(storynodes[i],'   FBP : Story Type Filter - Shared a link');
			}
			else
		      storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpnormal');
			  //console.log("number of links = "+storylinks.length + "\n\n" + storynodes[i].textContent + "/n/n" + storylinks[0].textContent + "\n\n" + storylinks[0].href + "\n\n" + storylinks[0].onclick );
		  }
		  else
		    storynodes[i].setAttribute('class',storynodes[i].getAttribute('class')+' fbpnormal');
        }
		// check for wall posts
		if(fbpoptsobj.commentwall && (typeof(storynodes[i])!='undefined') && storynodes[i].getAttribute && storynodes[i].getAttribute('class').match(/fbpnormal/)) {
		  //var wallarrows=storynodes[i].getElementsByClassName('wallArrowIcon');
		  //if(wallarrows.length || storynodes[i].querySelector(wrotewallicon)) { 
		  if(storynodes[i].querySelector("span.accessible_elem+i+span.accessible_elem")){
			storynodes[i].setAttribute('class',storynodes[i].getAttribute('class').replace('fbpnormal','') + ' fbpblockedx');
			filtermatchmsg(storynodes[i],'   FBP : Story Type Filter Match - Wrote on Timeline');
		  }
		  //wallarrows=null;
		}

      updateblockedcount();

    } // End For Loop through feed nodes

    storynodes=storysaction=storysactiontext=null;

  }// END cleartheshizzle function

function redefineChatOpenTab() { // for injection
  /* this code no longer works, we need a new way to overide the chat object...
  var waitforchat=window.setInterval(function(){
    if(typeof(Chat)!='undefined') {
      Chat.openTab=function (r){window.location.href='/messages/'+r};
	  window.clearInterval(waitforchat);
	}
  }, 3000);
  */
  ;
}

function fixexternallinkredirects() { // for injection
  // fix external link redirects
  if(window.location.href.match(/#debug/)) {
    console.log("running fixexternallinkredirects code (injected)");
    console.trace();
  }
  //console.log('testing 123 fixexternallinkredirects');
  window.setTimeout(function() {if(typeof(UntrustedLink)!='undefined')UntrustedLink=null;if(typeof(LinkshimAsyncLink)!='undefined') LinkshimAsyncLink.referrer_log = LinkshimAsyncLink.swap = function(){;}; if(typeof(search_logged_ajax)!='undefined') search_logged_ajax=function(){;};},0);
  window.setTimeout(function() {if(typeof(UntrustedLink)!='undefined')UntrustedLink=null;if(typeof(LinkshimAsyncLink)!='undefined') LinkshimAsyncLink.referrer_log = LinkshimAsyncLink.swap = function(){;}; if(typeof(search_logged_ajax)!='undefined') search_logged_ajax=function(){;};},5000);
  window.setInterval(function(){if(typeof(UntrustedLink)!='undefined')UntrustedLink=null;if(typeof(LinkshimAsyncLink)!='undefined') LinkshimAsyncLink.referrer_log = LinkshimAsyncLink.swap = function(){;}; if(typeof(search_logged_ajax)!='undefined') search_logged_ajax=function(){;};},60000);

  function unmanglelinksextra(e) {
    if(window.location.href.match(/#debug/))
      console.trace();
    e = e || window.event;
	//console.log(e.target.parentNode.parentNode,e.target.parentNode.parentNode.href,e.target.parentNode.parentNode.href.match(/sk=h_nor/));
	/*
	console.log(e.target.nodeName);
	console.dir(e.target);
	console.log(e.target);
	console.log(e.target.href);
	console.log(e.target.getAttribute('href'));
	console.log('mouse button:' + e.which);
	*/
    /*switch (e.which) {
      case 1: alert('left button'); break;
      case 2: alert('middle button'); break;
      case 3: alert('right button'); break;
    }*/

	//console.log(e.target.href,e);
	if(e.target.nodeName && e.target.nodeName=="DIV") {
	  if(e.target.previousSibling && e.target.previousSibling.id && e.target.previousSibling.id.match(/^notif_flyout_/)) {
	    //console.log('mark as read button clicked on Fan Page notifications flyout');
	    return;
	  }
	}
    if(e.target.nodeName && e.target.nodeName=='A') {
	  //if(window.location.href.match(/#debug/))
	    //console.log('link clicked: '+ e.target.href + ' ' + e.target);
	  if(e.which==3 || e.which==2) // fix right click and middle click in firefox  
	    return;
	  if((e.target.getAttribute('ajaxify') && e.target.getAttribute('ajaxify').match(/^\/ajax\/flash\/expand_inline\.php/)) || (e.target.href && (e.target.href=='#'))) {
	    return;
	  }
	  if(e.target.href && (e.target.getAttribute('href')=="#") && e.target.textContent=="Mark All As Read") { // link on notifications flyout on Fan Pages
	    //console.log('mark all as read button on Page notification flyout clicked');
	    return;
	  }
	  if(e.target.href.match(/\/l\.php\?u=(.*)\&h=/)) {
	    e.preventDefault();
	    e.target.href=decodeURIComponent(e.target.href.match(/\/l\.php\?u=(.*)\&h=/)[1]);
	    window.open(e.target.href);
	  } 
      else if(!e.target.href.match(/(facebook\.com|^\/)/) && (e.target.href!="javascript:;") && (e.target.href!='') && (!e.target.href.match(/youtube\.com|youtu\.be|soundcloud\.com|vimeo\.com|reverbnation\.com|bandcamp\.com|dailymotion\.com/))){
	    if(e.target.getAttribute('aria-label') && e.target.getAttribute('aria-label').match(/Uploaded/))
		  return;
	    e.preventDefault();
		e.stopPropagation();
        window.open(e.target.href);
	  }
	  else if(window.navigator.userAgent.match(/Firefox/) && e.target.target && (e.target.target=='_blank') && e.target.href && (e.target.href.match(/facebook.com/))) {
	    if(e.target.href.match(/\/download\/preview\//)) {
		  e.preventDefault();
		  window.open(e.target.href);
		}
		else {
	      e.target.target=""; // fix scriptify tab opener bug by neutralising target="_blank"
		  return;
		}
	  }
	  //else if(e.target.getAttribute('ajaxify').match(/^\/ajax\/flash\/expand_inline\.php/)) {
	  //  e.preventDefault();
	  //}
    }
	else if(e.target.parentNode && e.target.parentNode.nodeName=='A'){
	  //console.log('the click was on an element inside an A tag');
	  //console.log(e.target.parentNode.getAttribute('href'));
	  if(e.target.parentNode.href && (!e.target.parentNode.href.match(/facebook\.com/)) && (e.target.parentNode.href!="javascript:;") && (e.target.parentNode.getAttribute('href')!="#") && (e.target.parentNode.href!='') && (!e.target.parentNode.href.match(/youtube\.com|youtu\.be|soundcloud\.com|vimeo\.com|reverbnation\.com|bandcamp\.com|dailymotion\.com|instagram\.com/))){
	    if((navigator.userAgent && navigator.userAgent.match(/Firefox/)) && (e.which==3 || e.which==2)) { // fix right click and middle click in firefox 
	      return;  
		}
		//console.log('are we here:?');
	    //if(e.target.getAttribute('aria-label') && e.target.getAttribute('aria-label').match(/Uploaded/))
		//  return;
	    e.preventDefault();
		e.stopPropagation();
        window.open(e.target.parentNode.href);
	  }
	}
	/*else if(e.target.nodeName && e.target.nodeName=='SPAN'){
	  console.log('Span Hit!');
    }*/
	else if(!window.location.href.match(/h_nor/) && e.target.parentNode && e.target.parentNode.parentNode && e.target.parentNode.parentNode.href && e.target.parentNode.parentNode.href.match(/sk=h_nor/)){
	  console.log("allowing top stories");
	  e.preventDefault();
	  //window.alert('hit it h_nor');
	  window.location.href='/?sk=h_nor#topstories';
	}
  }
  window.addEventListener('click',unmanglelinksextra,true);

  function unmanglelinks(nodetofix) {
    //console.log('embedded unmanglelinks');
	var hidehovercards=0;
	if(document.querySelector('html').className.match('hidehovercards'))
	  hidehovercards=1;
  
    if(window.location.href.match(/#debug/))
      console.trace();
      //console.log('unmangle links version 1 (injected version)');
	  //console.log(typeof(nodetofix));
    if(typeof(nodetofix)=='undefined')
      var nodetofix=document;
	if(nodetofix.getElementsByTagName) {
      var as=nodetofix.getElementsByTagName('a');
      for(var i=0;i<as.length;i++){
		// BEGIN HIDE HOVERCARDS
		if(hidehovercards){
	      if(as[i].getAttribute && as[i].getAttribute('data-hovercard') && as[i].getAttribute('data-hovercard').match(/\/ajax\//))
		    if(as[i].removeAttribute)
		      as[i].removeAttribute('data-hovercard');
	    }
		// END HIDE HOVERCARDS
        if(as[i].href && as[i].href.match(/\/l\.php\?/)) {
          as[i].href=decodeURIComponent(as[i].href.match(/\/l\.php\?u=(.*)\&h=/)[1]);
        }
		if(as[i].href && as[i].href.match(/(\?|\&)fb_action_ids/)){
		  as[i].href=as[i].href.split(/(\?|\&)fb_action_ids/)[0];
		}
	  }
	as=null;
	}
	nodetofix=null;
  }
  window.setTimeout(unmanglelinks,5000); // run on first load of page
}
// new fix links code
//as=document.getElementsByTagName('a');for(i=0;i<as.length;i++)if(as[i].href.match(/\/l\.php/))console.log(as[i].href)
// this function is duplicated, as it is also injected into the page's dom, so it can run from there too

var securegifchannel="" ;
//var securegifchannel="https://www.fbsbx.com/animated.php?url=" ; // to enable fetching all animated gifs via HTTPS, uncomment this line. (N.B Gifs will load much slower)

function unmanglelinks(nodetofix) {
  if(debug)
    console.trace();
  //console.log('are we running');
  //console.log('injected unmanglelinks');
  if(typeof(nodetofix)=='undefined') {
    var nodetofix=document;
  }
  if(nodetofix.getElementsByTagName) {
    var as=nodetofix.getElementsByTagName('a');
    for(var i=0;i<as.length;i++) {
	  //if(as[i].href.match(/l\.php/)) console.log((as[i].href));
	 if(typeof(fbpoptsobj.hovercards)!='undefined' && fbpoptsobj.hovercards){
	  if(as[i].getAttribute && as[i].getAttribute('data-hovercard') && as[i].getAttribute('data-hovercard').match(/\/ajax\//))
		if(as[i].removeAttribute)
		  as[i].removeAttribute('data-hovercard');
	  }
      if(as[i].href && as[i].href.match(/\/l\.php\?u=(.*)\&h=/)) {
	    as[i].href=decodeURIComponent(as[i].href.match(/\/l\.php\?u=(.*)\&h=/)[1]);
	  }
	  if(isfirefox && as[i].target && (as[i].target.href && (as[i].target.href.match(/(facebook\.com|^\/)/))) && as[i].target=="_blank") // fix tab opener bug caused by scriptify / firefox extension
	    as[i].target="";
	  if(as[i].href && as[i].href.match(/(\?|\&)fb_action_ids/)){
		as[i].href=as[i].href.split(/(\?|\&)fb_action_ids/)[0];
	  }
	}
	as=null;
  }
  nodetofix=null;
}
//  END Duplicated function

  // Not yet fully implemented
  function fixFacebookSharing (){
    if(window.location.href.match(/facebook\.com(\/sharer)?\/sharer\.php\?.*fbpurity\.com/)) {
      document.querySelector('h2.uiHeaderTitle').textContent="Facebook are blocking you from sharing the FBPURITY.COM URL"  
      document.querySelector('div.uiInterstitialContent').innerHTML="Unfortunately, Facebook are blocking the FBPURITY.COM URL because they do not want their users to have control over what they see in their newsfeed, and don't want to give their users the useful options that the safe, free and top rated FB Purity browser add-on gives you.<p/>Luckily, you can still share the link to the FB Purity Fan Page on Facebook instead. <div><h3><a id='fbpsharelink' href='https://www.facebook.com/sharer.php?u=http://facebook.com/fluffbustingpurity#fbpshr'>Click here to share the link to the FBP Fan Page</a></h3></div>"
	  document.getElementById('fbpsharelink').addEventListener('click',function(){window.location.href="https://facebook.com/sharer/sharer.php?u=http://facebook.com/fluffbustingpurity"},false);
    }
 }

/* // code to help with sharing FBP via the facebook share popup window or via email
var buttdiv=document.createElement('div');
var fbpsharecode="<a href=\"//www.facebook.com/sharer.php?u=%URL%#fbpshr\" onclick=\"javascript:window.open(this.href,  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;\">Share Gif</a>";
var encURL=encodeURIComponent(as[i].href);
fbpsharecode=fbpsharecode.replace(/%URL%/,encURL);
buttdiv.innerHTML="<div style='margin-left:40px'>" + fbpsharecode + " | <a title=\"Share via Email\" href=\"mailto:?subject=Check%20out%20this%20Animated%20Gif&amp;body=" + encodeURIComponent(as[i].href) + "%0D%0A%0D%0A----------%0D%0A%0D%0ABTW Did%20you%20know%20you%20can%20view%20Animated%20Gifs%20on%20Facebook%20with%20the%20safe,%20free%20and%20top%20rated%20FB%20Purity%20Browser%20Extension%3F%20%3A%20http%3A%2F%2Ffbpurity.com\">Mail Gif</a></div>";
contdiv.appendChild(buttdiv);
as[i].parentNode.appendChild(contdiv);
buttdiv=contdiv=encURL=null; 
*/
  function fbpsharer() { 
    console.log('fbpsharer()');
    var sd=document.getElementById('sharerDialog');
	var ss=document.querySelector('Textarea');
	var fbpsharemsg="Want more control over what you see on Facebook? F.B. Purity is a safe, free and top rated browser add-on that lets you clean up the junk on Facebook and customize it to make it just the way you like it. F.B. Purity has over 305,000 users worldwide and has been reviewed and highly recommended by The Washington Post, The New York Times, CNET, PCWorld, MacWorld and many other top tech journals. Get F.B. Purity free via FBPURITY .COM or the F.B. Purity Fan Page on Facebook";
	var fbpsharetags="#FBPurity #FluffBustingPurity #CleanUpFacebook #CustomizeFacebook";
	var tagtext="";
	if(!sd && !ss)
	  return;
    var sgdiv=document.createElement('div');
	sgdiv.id='fbpsgdiv';
	sgdiv.style.marginTop='5px';
	sgdiv.style.marginBottom='5px';
	sgdiv.style.styleFloat="left";
	sgdiv.innerHTML='<b>Include the following text with your message?</b> <input id="incfbptext" type="checkbox" title="Tick the box to include the text below in your post"><br/>'; // checked
	sgdiv.innerHTML+=fbpsharemsg+"<br/><br/>" + fbpsharetags;
	ss.parentNode.insertBefore(sgdiv,ss.nextSibling);
	if( document.querySelector('button.layerConfirm[name="__CONFIRM__"]'))
	  document.querySelector('button.layerConfirm[name="__CONFIRM__"]').addEventListener('click',function() {
	    if(document.getElementById('incfbptext').checked) {
	      if(document.querySelectorAll('div.uiPopover:Not(.rfloat)')[0].querySelector('a').textContent.match(/Share in a private message/))
		    tagtext=""
		  else 
		    tagtext=fbpsharetags;
	      document.querySelector("input.mentionsHidden").value+="\n\n\n------\n"+fbpsharemsg+"\n\n" + tagtext;
	    }
		fbpsharemsg=fbpsharetags=tagtext=null;
	    return false;
	  },false)
	 sd=ss=sgdiv=null;
  }

var chronosortrunning=0;

function chronoSortStream() {
  if(chronosortrunning) {
    console.log('Chrono Sort already running, aborting...')
  }
  chronosortrunning=1;
  console.log('ChronoSortStream called');
  var newfeeddesign=0;
  var nList  = document.getElementById('home_stream');
  if(!nList) {
    nList  = document.getElementById('substream_0');
	if(!nList) {
      console.log('Couldnt find the stream, maybe they have a newer newsfeed design...');
	  chronosortrunning=0;
      return;
    }
	else {
	  console.log('New newsfeed design detected.');
	  var newfeeddesign=1;
	}
  }

  // rename stream, hopefully it will stop new stories loading / dupes arriving/
  nList.setAttribute('id','tempStream');

  var nEntry = document.querySelectorAll("div[data-dedupekey]");

  var nEntryArray = Array.prototype.slice.call(nEntry, 0);

  if(debug)
    console.dir(nEntryArray);
  nEntryArray.sort(function(a,b){
    //  return a.firstChild.nodeValue - b.firstChild.nodeValue ( descending order) // swap for ascending order
	// check if the li has a datestamp or not
	if(!a.querySelector("abbr[data-utime]") && (!b.querySelector("abbr[data-utime]")))
      return 0;
    else if(!a.querySelector("abbr[data-utime]"))
        return 1;
    else if (!b.querySelector("abbr[data-utime]"))
      return -1;
    else
      return b.querySelector("abbr[data-utime]").getAttribute('data-utime') - a.querySelector("abbr[data-utime]").getAttribute('data-utime');
  })
  // 5. empty the nList and refill it with those in the correct order at the nEntryArray

  console.log('ChronoSort section 2');

  if (!newfeeddesign) {
    while (nList.lastChild) {
      nList.removeChild(nList.lastChild);
    }
  }
  else {
	var z=nEntry.length-1;
    while (z >=0) {
      //console.log(z + nEntry[z]);
      nEntry[z].parentNode.removeChild(nEntry[z]);
      --z;
    } 
  }

  var dupechecker={}; // for clearing out any duplicate entries

  console.log('ChronoSort section 3');
  for (var i=0; i<nEntryArray.length; i++)
  {
    if(nEntry[i].getAttribute('data-timestamp'))
	  if(typeof(dupechecker[nEntry[i].getAttribute('data-timestamp')])=='undefined') {
        dupechecker[nEntry[i].getAttribute('data-timestamp')]='1';
        nList.appendChild(nEntryArray[i]);
	  }
  }
  if(newfeeddesign) // rename the stream back to its original name
    nList.setAttribute('id','substream_0');
  else
    nList.setAttribute('id','home_stream');

  console.log('ChronoSort Final Section');
  dupechecker=nList=nEntry=nEntryArray=null;
  chronosortrunning=0;
}

/*function injectChronoSortCode() {
  var script = document.createElement('script');
  script.appendChild(document.createTextNode(chronoSortStream));
  ( document.head || document.body || document.documentElement).appendChild(script);
}*/

function addsetbackgroundimagelink () {
  /*var picdllink="";
  if(document.querySelector("#imagestage img"))
    picdllink=document.querySelector("#imagestage img").src; //document.querySelector('#fbPhotoPageActions a[href$="dl=1"]');
  */
  var picdllink=document.querySelector('#fbPhotoPageActions a[href^="/photo/download/"]')
  var setbkilink=document.createElement('a');
  setbkilink.title='FB Purity: Set Image as FB Background (aka wallpaper)';
  setbkilink.className='fbPhotosPhotoActionsItem';
  setbkilink.id='fbpsetbkilink';
  if((document.getElementById('photos_snowlift')) && !document.getElementById('photos_snowlift').getAttribute('class').match('hidden_elem')) {
    // photo theater view
	if(document.querySelector('#photos_snowlift #fbpsetbkilink'))
	  return;
    picdllink=document.querySelector("#photos_snowlift .spotlight").src.split(/\?/)[0].replace(/\/v\/[a-z]\d\.\d-\d?/,'');
	setbkilink.datahref=picdllink.replace(/\?dl=1$|\&dl=1$/,'');
	setbkilink.textContent='⍍ Set as Background';

	if(fbpoptsobj.backgroundimagefix) {
	  if(document.querySelector('img.spotlight'))
		if(fbpoptsobj.backgroundimage==document.querySelector('img.spotlight').getAttribute('src')) {
		  setbkilink.textContent='⍔ Remove Background Image';
		  setbkilink.title='FB Purity: Remove image from FB Background';
		}
	}
	var inpoint1=document.querySelector('#fbPhotoSnowliftFeedback div._42nr');// #fbPhotoSnowliftOwnerButtons');
	var inpoint2=document.querySelector('#photos_snowlift span.UIActionLinks_bottom');
	var inpoint3=document.querySelector('#fbPhotoSnowliftTimestamp'); // if the share toolbar isnt showing
	if(inpoint2) { // this branch no longer runs, since fb removed normal image page with large image, and replaced them with theatre popup
	  inpoint2.appendChild(document.createTextNode(' · '));
	  inpoint2.appendChild(setbkilink);
	  document.querySelector('#photos_snowlift span.UIActionLinks_bottom #fbpsetbkilink').addEventListener('click',fbpSetBackgroundImageClick,false);
	}
	else if(inpoint1)
	{
	  //inpoint1.appendChild(document.createElement('br'));
	  inpoint1.appendChild(setbkilink);
	  //inpoint1.parentNode.insertBefore(setbkilink,inpoint1);
	  document.querySelector('#fbPhotoSnowliftFeedback #fbpsetbkilink').addEventListener('click',fbpSetBackgroundImageClick,false);
	}
	else if(inpoint3)
	{
	  //inpoint1.appendChild(document.createElement('br'));
	  inpoint3.appendChild(setbkilink);
	  document.querySelector('#fbPhotoSnowliftTimestamp #fbpsetbkilink').addEventListener('click',fbpSetBackgroundImageClick,false);
	}
	else {
	  if(debug)
	    console.log('fbp: couldnt find insertion point (photos_snowlift)');
	}
	//setbkilink.className='fbPhotosPhotoActionsItem';
  }
  else if(picdllink) { // standard photo page // i don't think section is needed anymore
    //console.log('do we get here even? 3');
	if(document.getElementById('fbpsetbkilink'))
	  return;
	setbkilink.textContent='Set as Background Image';
	if(document.querySelector("#imagestage img"))
      setbkilink.datahref=document.querySelector("#imagestage img").src
	//setbkilink.datahref=picdllink; //picdllink.href.replace(/\&dl=1$|\?dl=1$/,'');
	setbkilink.className='fbpoldphotopage fbPhotosPhotoActionsItem';
	picdllink.parentNode.insertBefore(setbkilink,picdllink.nextSibling);
	document.getElementById('fbpsetbkilink').addEventListener('click',fbpSetBackgroundImageClick,false);
  }
}

///////////////////////////////
// BEGIN FUNCTION deleterecentactivitymodule
// function deleterecentactivitymodule is just a wrapper for the code, so we can inject it into the fb page
function deleterecentactivitymodule () {
/* BEGIN HISTORY STATE CHANGE HANDLER */
(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
		//document.getElementById('contentArea').innerHTML="<div>" + 'history state changed:' + arguments[0] + ' loc.href=' +location.href + "</div>" +document.getElementById('contentArea').innerHTML;

		//console.log('history state changed:' + arguments[0] + ' loc.href=' +location.href); // arguments[0] is the updated url
		// experiment to disable theatre mode
		//if(arguments[0].match(/\/photo\.php\?.*\&theater/))
		//  location.href=arguments[0];
	
		if(arguments[0].match(/facebook\.com\/fluffbustingpurity/) && (!arguments[0].match(/facebook\.com\/fluffbustingpurity\/settings/))) { // post message to reset the fbp news counter and initiate faq prompt 
		//if(arguments[0].match(/facebook\.com\/bookfacepurity/) && (!arguments[0].match(/facebook\.com\/bookfacepurity\/settings/))) {
		//if(arguments[0].match(FBPFanPageURLRegex) && (!arguments[0].match(RegExp("facebook\.com\/" + FBPFanPageURL + "\/settings")))) { // cannot use variables here because this code is injected
		  window.postMessage('RESETNEWS',"https://www.facebook.com");
		  window.postMessage('FAQPROMPT',"https://www.facebook.com");
		  window.postMessage('INITINVITEALL',"https://www.facebook.com");
		  if(arguments[0].match(/\/photos\//))
			window.postMessage( "FBP>TheaterMode", "https://www.facebook.com");
		}
		else if(arguments[0].match(/facebook\.com\/(WhoUnfriendedYou|hidepeopleyoumayknow|getridofsuggestedposts|hidetrendingtopics|hidepoliticsfromthenewsfeed|sortbymostrecent)/))
		  window.postMessage('INITINVITEALL',"https://www.facebook.com");
	    else if(arguments[0].match(/facebook\.com\/?$|\/\?sk=/)) {
		  //window.setTimeout(fixsortorder,5500); // this  line stops image viewer from working properly if the "if statement" above is not there
		  window.postMessage( "JSPAGEUPDATE", "https://www.facebook.com");
		}
		else if(arguments[0].match(/\/games\/|\/dialog\/oauth\//)) {
		  window.setTimeout(highlightemailrequest,6000);
		  window.setTimeout(addblockapplinktoapppage,6010);
		  window.setTimeout(addblockbuttontopermreq,6020)
		}
		else if(arguments[0].match(/\/photo(s\/|\.php)/)) { //.*&theater$
		  //console.log("theater mode engaged");
		  window.postMessage( "FBP>TheaterMode", "https://www.facebook.com");
		  //window.setTimeout(addsetbackgroundimagelink,4000);
		}
		else if(arguments[0].match(/\/bookmarks\/pages/)) {
		  window.postMessage( "FIXPAGEBOOKMARKS", "https://www.facebook.com");
		}
		else
		  window.postMessage( "JSPAGEUPDATE", "https://www.facebook.com");

        return pushState.apply(window.history, arguments);
    }
})(window.history);
/* END HISTORY STATE CHANGE HANDLER*/

}
// END FUNCTION deleterecentactivitymodule

var addexternallinkfix = function() {
/////////////////////////////////////////////////////////////
// BEGIN inject deleterecentactivitymodule code into fb page
  var scriptx = document.createElement('script');
  scriptx.setAttribute('id','scriptx');
  if(fbpoptsobj.fixarticleredirects)  // fix external link redirects
    scriptx.appendChild(document.createTextNode('('+ fixexternallinkredirects +')();'));
  
  if(fbpoptsobj.fullscreenchat)
    //scriptx.appendChild(document.createTextNode('( Chat.openTab= function (r){window.location.href='/messages/'+r}; )();'));
	scriptx.appendChild(document.createTextNode(' (' + redefineChatOpenTab + ') ();'));

	//window.setTimeout(function() { Chat.openTab= function (r){window.location.href='/messages/'+r ;},6000);

  scriptx.appendChild(document.createTextNode('('+ deleterecentactivitymodule +')();'));

  (document.head || document.body || document.documentElement).appendChild(scriptx);
// END inject deleterecentactivitymodule code into fb page
////////////////////////////////////////////////////////////////
}

var addblockbuttontopermreq = function() {
  if(debug)
    console.log("in addblockbuttontopermreq function");
  if(document.getElementById('blockapplab') || window.location.href.match(/sharer\.php|share\.php|facebook\.com\/groups\/|facebook\.com\/lists\/|\/dialog\/share|\/dialog\/feed|\/addlist|\?sk=fl_/))
	return;
  buttbars=document.getElementsByClassName('platform_dialog_buttons');
  if(!buttbars.length)
    buttbars=document.getElementsByClassName('rightContent');
  if(!buttbars.length)
    buttbars=document.getElementsByClassName('uiOverlayFooterButtons');
  if(!buttbars.length)
    buttbars=document.getElementsByClassName('permList');

  if(buttbars.length) {
    buttbar=buttbars[0];
	//if(location.href.match(/client_id=/)
	//var bappid=window.location.href.match(/[client|app]_id=(\d*)/)[1];
	var bappid;
	if(document.getElementById('input_app_id'))
	  bappid=document.getElementById('input_app_id').getAttribute('value');
	else if (document.getElementsByClassName('legalese').length) {
	  var legas=document.getElementsByClassName('legalese')[0].getElementsByTagName('a');
	  if(legas.length)
	    for(var v=legas.length-1;v>=0;v--)
		  if(legas[v].getAttribute('ajaxify').match(/cid=(\d+)/)) {
		    bappid=legas[v].getAttribute('ajaxify').match(/cid=(\d+)/)[1];
			break;
		  }
    }
	else if (document.getElementsByName('app_id').length ){
	  bappid=document.getElementsByName('app_id')[0].getAttribute('value');
	}

	var titleclass=document.getElementsByClassName('fsxl');
	if(titleclass.length)
	  var bapname=titleclass[0].textContent;
	else
	  if(document.getElementById('permPanel'))
	    bapname=document.getElementById('permPanel').getElementsByTagName('b')[0].textContent;
	else if (document.getElementsByClassName('permissions_app_name').length)
	  bapname=document.getElementsByClassName('permissions_app_name')[0].textContent;
	else if (document.getElementById('platformDialogForm').querySelector('span.fwb'))
	  bapname=document.getElementById('platformDialogForm').querySelector('span.fwb').textContent;
	else
      var bapname="Application";

	/* BEGIN NEW / OLD CODE */
	/* ---------------------*/
	blahlab=document.createElement('label');
    blahlab.setAttribute('class','uiButton uiButtonConfirm uiButtonLarge');
	blahlab.style.marginLeft="2px";
	blahlab.style.lineHeight="30px";
	blahlab.style.backgroundColor="red";
	blahlab.setAttribute('id','blockapplab');
	blahlab.setAttribute('appid',bappid);
	blahlab.setAttribute('appname',bapname);

	if(document.getElementById('platform_dialog_content'))
      blahlab.setAttribute('nodeid','platform_dialog_content');//globalContainer
	else if(document.getElementsByClassName('tosPane').length)
	  document.getElementsByClassName('tosPane')[0].setAttribute('id','platform_dialog_content');
	else if (document.getElementById('platformDialogForm')) {
	  blahlab.setAttribute('nodeid','platformDialogForm');
	  if (document.getElementById('platformDialogForm').querySelector('a[href="#"][data-hover="tooltip"]')) {
	    if (document.getElementById('platformDialogForm').querySelector('a[href="#"][data-hover="tooltip"]').parentNode.textContent.match(/email address/)) {
		  document.getElementById('platformDialogForm').querySelector('a[href="#"][data-hover="tooltip"]').parentNode.setAttribute('style',"border:3px solid red !important" + (fbpoptsobj.backgroundimagefix ? ";background-color:rgba(255,255,255,0.5)" : ""));
		  document.getElementById('platformDialogForm').querySelector('button[name="__CONFIRM__"]').addEventListener('click',function(e){e.preventDefault();if(e.stopPropagation) e.stopPropagation();if(confirm("Privacy Warning: By using this Game / App, you are giving it permission to access your email address, which may result in spam emails. Are you sure you want to continue?")) {e.target.removeEventListener("click", arguments.callee, false); e.target.click()}},false);
		}
	  }
	}

	blahlab.setAttribute('title','Block this application with F.B. Purity');
    blahlab.innerHTML='<input value="Block App" name="block" type="button" id="appblocker">';
	buttbar.appendChild(blahlab);

	if(document.getElementById('appblocker'))
	  document.getElementById('blockapplab').addEventListener('click',blockappev,false);
	/* -------------------*/
    /* END NEW / OLD CODE */

	// if requesting permission to send direct emails, warn user by highlighting it
	highlightemailrequest();
  }
  else {
    if( document.querySelector('a[ajaxify*="/ajax/appcenter/redirect_to_app?"]')){
	  var tclass=document.querySelector('a[ajaxify*="/ajax/appcenter/redirect_to_app?"]').className;
	  var blocklink=document.querySelector('a[ajaxify*="/ajax/apps/block_app.php?"]');
	  blocklink.className=tclass;
	  blocklink.style.position="absolute";
	  blocklink.style.top="90px";
	  blocklink.style.color="lightgrey";
	  blocklink.style.left="634px";
	  blocklink.style.width="232px";// !important"; // code to add to block link to mimic the play button;
	  
	  if (document.querySelector('input[name="GdpEmailBucket_grantEmailType"]')) {
	    document.querySelector('a[ajaxify*="/ajax/appcenter/redirect_to_app?"]').addEventListener('click',function(e){e.preventDefault();if(e.stopPropagation) e.stopPropagation();if(confirm("Privacy Warning: By using this Game / App, you are giving it permission to access your email address, which may result in spam emails. Are you sure you want to continue?")) {e.target.removeEventListener("click", arguments.callee, false); e.target.click()}},false);
	  }
	}
  }
}

var highlightemailrequest = function() {
  if(debug)
    console.log('in highlightemailrequest function');
  // if a facebook application is requesting the users email address highlight it
  var appperms=document.getElementsByClassName('gdp_list_item');
  if(appperms.length)
	for(var i=0;i<appperms.length;i++) {
	  if(appperms[i].getElementsByClassName('send-email-change-link').length)
	    appperms[i].setAttribute('style', 'border:4px solid red');
	  if(appperms[i].textContent.match(/Post on my behalf/))
		appperms[i].setAttribute('style', 'border:4px solid red');
	}
  var emailperms=document.getElementsByTagName('input');
  if(emailperms.length)
	for(i=0;i<emailperms.length;i++)
	  if(emailperms[i].getAttribute('name')=='GdpEmailBucket_grantEmailType')
	    emailperms[i].parentNode.setAttribute('style', 'border:4px solid red');
  if(document.getElementsByClassName && document.getElementsByClassName('gdp_right_container').length && document.getElementsByClassName('gdp_right_container')[0].getElementsByClassName('mbm').length)
	document.getElementsByClassName('gdp_right_container')[0].getElementsByClassName('mbm')[0].setAttribute('style','border:4px solid red; color:black !important'); // ( can post as you )
  if(document.getElementsByClassName && document.getElementsByClassName('permissionsPublishActionsBadge').length)  
	document.getElementsByClassName('permissionsPublishActionsBadge')[0].setAttribute('style','border:4px solid red');
  if(document.getElementsByClassName('tosPane').length) {
    var tossas=document.getElementsByClassName('tosPane')[0].getElementsByTagName('a');
	for(i=0;i<tossas.length;i++)
	  if(tossas[i].getAttribute('href') && tossas[i].getAttribute('href').match(/about\/privacy\/your-info-on-other\#applications/)) {
		if(!tossas[i].parentNode.textContent.match(tossas[i].getAttribute('aria-label'))) {
		  tossas[i].parentNode.appendChild(document.createTextNode(' - ' + tossas[i].getAttribute('aria-label') ));
		  break;
		}
	  }
  }
  if(document.querySelector('input[type="hidden"][value="email"]'))
    document.querySelector('input[type="hidden"][value="email"]').parentNode.style.border='4px solid red';
  tossas=appperms=emailperms=null;

  // add prominent block app button to app center app pages
  if((window.location.href.match(/facebook\.com\/games\//) || document.getElementsByTagName('body')[0].getAttribute('class').match(/app_center/)) && document.getElementsByClassName('mll').length) // if theres buttons {
    if(document.getElementById('block_app_link') && !document.getElementById('block_app_link2')) {
  
	  var aja=document.getElementById('block_app_link').getElementsByTagName('a')[0].getAttribute('ajaxify');
	  var ajatext=document.getElementById('block_app_link').getElementsByTagName('a')[0].textContent;
	  var ajalab=document.createElement('label');
	  ajalab.setAttribute('class','uiButton uiButtonConfirm uiButtonLarge');
	  ajalab.setAttribute('id','block_app_link2');
	  ajalab.setAttribute('title','Block this application with FB Purity');
	  ajalab.style.color='white';
	  ajalab.textContent= ajatext + ' App';
	  var ajalink=document.createElement('a');
	  ajalink.setAttribute('ajaxify',aja.replace('block_app_link','block_app_link2'));
	  ajalink.setAttribute('href','#');
	  ajalink.setAttribute('rel','dialog-post');
	  ajalink.setAttribute('role','button');
	  ajalink.appendChild(ajalab);
      document.getElementsByClassName('mll')[0].setAttribute('class','mll');
	  document.getElementsByClassName('mll')[0].appendChild(document.createTextNode('  '));
	  document.getElementsByClassName('mll')[0].appendChild(ajalink);
	}
 if(window.location.href.match(/facebook\.com\/games\/?/) || document.getElementsByTagName('body')[0].getAttribute('class').match(/app_center/)) {
   // add BA (and eventually WL) links to all app listings in app center (this part is a work in progress/not completed yet)
   if(document.getElementsByClassName('appsListHeader').length) {
     var topspan=document.createElement('span');
	 topspan.setAttribute('style','color:red;font-weight:bold;margin-left:10px')
     topspan.setAttribute('id','block_app_link');
     document.getElementsByClassName('appsListHeader')[0].appendChild(topspan);

	 var appslist = document.getElementsByClassName('appsListItem');
     var tspan,appid;
	 for(i=0;i<appslist.length;i++) {
       tspan=document.createElement('div');
       tspan.setAttribute('class','uiPopover appFeedbackMenu');
       tspan.setAttribute('style','top:18px');
	   if(appslist[i].getAttribute('data-gt'))
	     appid=appslist[i].getAttribute('data-gt').match(/appid":"?(\d+)"?/)[1]; //match(/appid\&quot;:\&quot;(\d+)\&quot;/)[1]
	   else
	     appid=appslist[i].querySelector('a[data-gt]').getAttribute('data-gt').match(/appid":"?(\d+)"?/)[1]; //match(/appid\&quot;:\&quot;(\d+)\&quot;/)[1]
	   tspan.innerHTML='<a title="Block Application with FB Purity" rel="dialog-post" ajaxify="/ajax/apps/block_app.php?app_id=' + appid + '&amp;type_index=0&amp;source=about&amp;confirm_id=block_app_link" href="#" role="button">BA</a>';
	   appslist[i].getElementsByClassName('appName')[0].appendChild(tspan);
	 }

   }
 }

} // END highlightemailrequest function

/* BEGIN add a "block application" link to the corner of all application pages */
function addblockapplinktoapppage() {
 if(debug)
   console.log("in addblockbuttontopermreq function");
 if (window.location.href.match(/\:\/\/apps\./)) {
  if(document.getElementById('footerContainer')) {
    var footzer=document.getElementById('footerContainer');
	var footytxt='footerContainer';
  }
  else {
    var footzer=document.getElementById('pagelet_canvas_footer_content');
	var footytxt='pagelet_canvas_footer_content';
  }
  if(footzer) {
    var fas=footzer.getElementsByTagName('a');
    for(var i=0;i<fas.length;i++)
      if(fas[i].getAttribute('ajaxify') && fas[i].getAttribute('ajaxify').match(/\/ajax\/report\.php\?content_type=17/)) {
	    zappid=fas[i].getAttribute('ajaxify').match(/cid=(\d*)/)[1];
        zapplink=document.createElement('a');
	    zapplink.textContent='Block Application ';
		if(document.getElementById(footytxt).getElementsByTagName('span').length)
	      zapptitle=document.getElementById(footytxt).getElementsByTagName('span')[0].textContent;
		else if(document.querySelector("div.rhcFooterCopyright>div"))
		  zapptitle=document.querySelector("div.rhcFooterCopyright>div").textContent;
	    zapplink.setAttribute('appname',zapptitle);
	    zapplink.setAttribute('appid',zappid);
	    zapplink.setAttribute('nodeid','pagelet_canvas_content');
	    zapplink.setAttribute('id','zapplink');
		zapplink.setAttribute('title','Block this application with F.B. Purity');
	    zparent=document.getElementById(footytxt).getElementsByClassName('fsm')[0];
	    zparent.insertBefore(zapplink,zparent.firstChild);
	    document.getElementById('zapplink').addEventListener('click',blockappev,false);
	    break;
	  }
  }
 }
}
/* END Add a block application link at bottom left of all application pages */

function tlbuttinit() {
  //console.log('TLBUTTINIT');
  var FBPBUTT=document.createElement('div');
  FBPBUTT.innerHTML='<a id="FBPBUTT" href="javascript:;" class="jewelButton" style="vertical-align:top;color:#D8DFEA;font-size:14px;font-weight:bold;top:5px;max-height:25px;">FBP</a>';
  FBPBUTT.innerHTML+='<div id="FBPNewsAlert" style="display:none;position:relative;z-index:40;left:-35px;top:20px;font-size:12px;background-color:red;"><a href="https://facebook.com/' + FBPFanPageURL + '" id="FBPNewsCount" title="FBP News - 0 New Stories - [ Click To Read ]" style="color:white;margin-left:2px">News: 0</a>&nbsp;&nbsp;&nbsp;<a id="FBPDismissNewsAlert" href="javascript:;" title="Dismiss FBP News Notification" style="margin-right:2px">X</a></div>';
  FBPBUTT.setAttribute('class','lfloat fbJewel');
  FBPBUTT.setAttribute('title','F.B. Purity ' + fbpVersion + ' Options');

  var waitforsearchbox=window.setInterval(function(){
  if(! (document.querySelector('div[role="search"]') || document.getElementById('searchBarClickRef')))
    return;
  else
    window.clearInterval(waitforsearchbox);

  FBPBUTT.setAttribute('style','top:0px;margin-left:0px;margin-right:7px;vertical-align:middle;font-weight:bold;');
  var firstJewelButt=document.querySelector('.jewelButton');
  if (firstJewelButt && (!document.getElementById('FBPBUTT'))) {
	/*if(firstJewelButt.parentNode.childNodes.length>1) {
	  console.log('choice 0');
	  FBPBUTT.style.marginTop="7px";
	  firstJewelButt.parentNode.insertBefore(FBPBUTT,firstJewelButt);
	}*/
    //else {
	FBPBUTT.style.marginTop="12px";
	firstJewelButt.parentNode.parentNode.parentNode.insertBefore(FBPBUTT,firstJewelButt.parentNode.parentNode);
	/*
	if(!document.querySelector('#fbRequestsJewel')) {
	  firstJewelButt.parentNode.parentNode.parentNode.insertBefore(FBPBUTT,firstJewelButt.parentNode.parentNode);
	}
	else {
	  firstJewelButt.parentNode.parentNode.parentNode.insertBefore(FBPBUTT,firstJewelButt.parentNode.parentNode);
	}
	*/
	//}
	document.getElementById('FBPBUTT').addEventListener("click", fbptoggleopts, false);
	document.getElementById('FBPNewsCount').addEventListener("click", resetnewscounter, false);
	document.getElementById('FBPDismissNewsAlert').addEventListener("click", resetnewscounter, false);
	
	if(document.getElementById('pageLoginAnchor') && (!document.getElementById('FBPOptionsMenuLink')))
	  document.getElementById('pageLoginAnchor').addEventListener('click',addFBPSettingsLinkToMenu,false);
  }
  else 
	console.log('didnt find jewelbutt in top navbar');
  }, 2000);
  // END wait for search box interval timed function
}

function resetclasses() {
  var fbpn,a;
  var arrResetClasses=['fbpnormal','fbpblockedx','fbpblocked'];
  for(a in arrResetClasses) {
    //console.log(arrResetClasses[a]);
    fbpn=document.getElementsByClassName(arrResetClasses[a]); 
	for(i=fbpn.length;i>0;i--) {
	  //console.log(i);
	  fbpn[i-1].setAttribute('class',fbpn[i-1].getAttribute('class').replace(arrResetClasses[a],''));
	}
	//console.log("fbpoptsobj.filterappmessages=" + fbpoptsobj.filterappmessages + " current arr length=" + document.getElementsByClassName(arrResetClasses[a]).length);
  }
}

function sortSelect(selElem, sortVal) {

  // Checks for an object or string. Uses string as ID. 
  switch(typeof selElem) {
    case "string":
      selElem = document.getElementById(selElem);
      break;
    case "object":
      if(selElem==null) return false;
      break;
    default:
      return false;
    }

    // Builds the options list.
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
      tmpAry[i] = new Array();
      tmpAry[i][0] = selElem.options[i].text;
      tmpAry[i][1] = selElem.options[i].value;
    }

    // allows sortVal to be optional, defaults to text.
    switch(sortVal) {
      case "value": // sort by value
        sortVal = 1;
        break;
      default: // sort by text
        sortVal = 0;
    }
    tmpAry.sort(function(a, b) {
      return a[sortVal] == b[sortVal] ? 0 : a[sortVal] < b[sortVal] ? -1 : 1;
    });

    // removes all options from the select.
    while (selElem.options.length > 0) {
      selElem.options[0] = null;
    }

    // recreates all options with the new order.
    for (var i=0;i<tmpAry.length;i++) {
      var op = new window.Option(tmpAry[i][0], tmpAry[i][1]);
      selElem.options[i] = op;
    }
    tmpAry=null;
    return true;
}

function addFBPSettingsLinkToMenu() {
  if(document.getElementById('FBPOptionsMenuLink'))
	return;
  var fbpoptionsmenulink=document.createElement('li');
  fbpoptionsmenulink.setAttribute('class','_54ni navSubmenu __MenuItem');
  fbpoptionsmenulink.setAttribute('id','FBPOptionsMenuLinkContainer');
  fbpoptionsmenulink.innerHTML='<a class="_54nc"><span><span id="FBPOptionsMenuLink" class="_54nh" style="cursor:pointer">F.B. Purity Settings</span></span></a>';
  var menuinsertpoint=document.querySelector('a[href="https://www.facebook.com/settings"]');
  if(menuinsertpoint) {
	menuinsertpoint=menuinsertpoint.parentNode;
	menuinsertpoint.parentNode.insertBefore(fbpoptionsmenulink, menuinsertpoint);
	document.getElementById('FBPOptionsMenuLink').parentNode.addEventListener("click", fbptoggleopts, false);
	document.getElementById('FBPOptionsMenuLink').parentNode.addEventListener("click", function(){document.getElementById('pageLoginAnchor').click()},false);
  }
  /*else { // commented out because it was adding 2 links
	if(debug)
	  console.log('couldnt find menu insert point, so gonna retry in a few seconds');
	window.setTimeout(function() {
	  var menuinsertpoint=document.querySelector('a[href="https://www.facebook.com/settings"]');
	  if(menuinsertpoint) {
  	    menuinsertpoint.parentNode.insertBefore(fbpoptionsmenulink, menuinsertpoint);
	    document.getElementById('FBPOptionsMenuLink').parentNode.addEventListener("click", fbptoggleopts, false);
	  }
	}, 4000);
  }*/
}

function removefriendfromwhitelist(e) {
  e.preventDefault();
  if(e.stopPropagation) e.stopPropagation();
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}
function addfriendtowhitelist() {
  // function grabs the currently selected friend in the select box
  //var friendwhitelistta=document.getElementById("friendwhitelistta");
  var friendwhitelistta=document.getElementById("friendwhitelistdiv");
  var select = document.getElementById("friendwhitelistselect");
  var inputfriend=document.createElement('input');
  var frienddiv=document.createElement('div');
  var deletelink=document.createElement('a');
  deletelink.textContent='X';
  deletelink.setAttribute('title',"Remove friend from whitelist");
  deletelink.style.marginLeft='4px';
  deletelink.style.color='red';
  deletelink.className='removefriend';
  //deletelink.addEventListener('click',removefriendfromwhitelist,false);
  var friendlink=document.createElement('a');
  friendlink.textContent='';

  if(select.options.length > 0) {
    //window.alert("Text: " + select.options[select.selectedIndex].text + "\nValue: " + select.options[select.selectedIndex].value);
	if(document.getElementById('frienddiv-'+select.options[select.selectedIndex].value.split(/::/)[1]))
	  return;
	inputfriend.setAttribute('type','hidden');
	inputfriend.setAttribute('id','friendinput-'+select.options[select.selectedIndex].value.split(/::/)[1]);
	inputfriend.value=select.options[select.selectedIndex].value;
	frienddiv.setAttribute('id','frienddiv-'+ select.options[select.selectedIndex].value.split(/::/)[1])
	friendlink.setAttribute('data-hovercard','/ajax/hovercard/hovercard.php?id=' + select.options[select.selectedIndex].value.split(/::/)[1] );
	friendlink.setAttribute('href','/' + select.options[select.selectedIndex].value.split(/::/)[1] );
	friendlink.setAttribute('target','_blank');
	friendlink.textContent=select.options[select.selectedIndex].text;
	frienddiv.appendChild(friendlink.cloneNode(true));
	frienddiv.appendChild(inputfriend.cloneNode());
	frienddiv.appendChild(deletelink.cloneNode(true));
	
	friendwhitelistta.appendChild(frienddiv.cloneNode(true));
	document.getElementById('frienddiv-'+ select.options[select.selectedIndex].value.split(/::/)[1]).querySelector('a.removefriend').addEventListener('click',removefriendfromwhitelist,false);
  }
  else {
    return;
  }
}
// END addfriendtowhitelist function

function popuplatefriendwhitelist() {
  if (typeof(fbpoptsobj)=='undefined')
    return;

  if(typeof(fbpoptsobj.friendswhitelistArr)=='undefined')
    return;

  if(debug)
    console.log('in populatefriendwhitelist ' + fbpoptsobj.friendswhitelistArr);

  //<div id="frienddiv-$ID">	 
  var friendtemplate='<a href="/$ID" data-hovercard="/ajax/hovercard/hovercard.php?id=$ID" target="_blank">$NAME</a><input type="hidden" id="friendinput-$ID" value="$NAME::$ID"><a class="removefriend" style="margin-left:4px;color:red" title="Remove friend from whitelist">X</a>';
  var newdiv=document.createElement('div');
  newdiv.innerHTML=friendtemplate;

  var friendswhitelistArr=JSON.parse(fbpoptsobj.friendswhitelistArr);
  for(i in friendswhitelistArr) { // i is the friend id 
    if(!document.getElementById('frienddiv-' +i)) {
	  newdiv.innerHTML=friendtemplate.replace(/\$NAME/g,friendswhitelistArr[i]).replace(/\$ID/g,i);
	  newdiv.setAttribute('id',"frienddiv-"+i);
	  document.getElementById('friendwhitelistdiv').appendChild(newdiv.cloneNode(true));
	  document.getElementById("frienddiv-"+i).querySelector('a.removefriend').addEventListener('click',removefriendfromwhitelist,false);
	}
  }
}

// BEGIN INIT FRIEND CHECKER FUNCTION VARIABLES
var firstrunfriendcheck=0;
var friendcheckinterval=60;
var lastfriendcheck;
var currtime = new Date().getTime(); // creates a new Date representing today
var oldfriendstore={};
var friendstore={};
var deletedfriendstore={};
var newdfa = new deletedfriendsalert();
// END INIT FRIEND CHECKER FUNCTION VARIABLES

//////////////////////////////////////
// BEGIN FRIEND CHECKING FUNCTIONALITY
//////////////////////////////////////

function dspdeletedfriendalert(deletedfriends){
  var delfriendstore;
  if(debug){
    if(typeof(deletedfriends)!='undefined')
      console.log("dspdeletedfriendsalert called second time: " + deletedfriends)
    else  
      console.log('dspdeletedfriendsalert called first time');
  }
  
  newdfa.init();

  if(!deletedfriends && deletedfriends!='') {
    delfriendstore=fbploadvalue('deletedfriendstore-' + currentuserid,dspdeletedfriendalert);
    if(delfriendstore==-999) {
	  if(debug)
	    console.log("delfriendstore=" + delfriendstore);
      return
	}
  }
  else
    delfriendstore=deletedfriends;
  if(debug)
    console.log('deletedfriends: ' + delfriendstore);
  if(typeof(delfriendstore)!='undefined' && (delfriendstore !=null) && (delfriendstore !=''))
    delfriendstore=JSON.parse(delfriendstore);
  if(debug)
    console.dir(delfriendstore);
  if(typeof(delfriendstore)!='object')
    return;
  
  var showflag=0;
  for(i in delfriendstore)  {
	if(typeof(delfriendstore[i])!='undefined'){
	  if(!document.querySelector("#delfriendsalertdiv a[href='/" + i + "/']"))
	    newdfa.addline("<div style='margin-bottom:2px;margin-left:75px;font-weight:bold'><a target='_blank' data-hovercard='/ajax/hovercard/hovercard.php?id=" + i + "' href='/" + i +"'><img src='//graph.facebook.com/" + i + "/picture?size=small' height='16' width='16' style='vertical-align:middle'></a> &nbsp;<a target='_blank' href='/" + i + "/' data-hovercard='/ajax/hovercard/hovercard.php?id=" + i + "'>" + delfriendstore[i] + "</a></div>");
	  if(debug)
	    console.log('name:' + delfriendstore[i]);
	  showflag=1;
	}
  }
  if(showflag)
    newdfa.show();
}

function processfriendsobject(friendsobj){
  // start code for friend whitelist and deleted friend alerts
  var friendwhitelistflag=0;
  var friendwhitelistbox=document.getElementById('friendwhitelistta');
  var friendwhitelistselect,friendwhitelistaddbutton;
  // if the options screen is showing, load up the friends whitelist
  if(document.getElementById('fbpoptsdiv') && document.getElementById('fbpoptsdiv').style.display=='block') {
    friendwhitelistflag=1;
	if(!document.getElementById("friendwhitelistselect")) {
	  friendwhitelistselect=document.createElement('select');
	  friendwhitelistselect.setAttribute('id','friendwhitelistselect');
	  friendwhitelistaddbutton=document.createElement('button');
	  friendwhitelistaddbutton.setAttribute('id','friendwhitelistaddbutton');
	  friendwhitelistaddbutton.textContent='Add friend to whitelist';
	  friendwhitelistaddbutton.setAttribute('class','inputsubmit uiButton uiButtonConfirm uiButtonMedium');
	  //friendwhitelistaddbutton.style.marginTop='3px';
	  friendwhitelistaddbutton.addEventListener('click',addfriendtowhitelist,false);
	}
	else {
	  friendwhitelistselect=document.getElementById("friendwhitelistselect");
	  friendwhitelistselect.options.length = 0; // reset options list
	}
  }
  // end code for friend whitelist

  for(i=0;i<friendsobj.payload.entries.length;i++)  { // need to check if friendsobj.payload = null... catch error
    //if(!friendsobj.payload.entries[i].names ==friendsobj.payload.entries[i].text)
    //  document.getElementById('fbpnewsdiv').innerHTML+=friendsobj.payload.entries[i].names + " :: " + friendsobj.payload.entries[i].text + "<Br>";
	//friendstore[friendsobj.payload.entries[i].uid]={};
	friendstore[friendsobj.payload.entries[i].uid]=friendsobj.payload.entries[i].text;
	if(friendwhitelistflag)
	  friendwhitelistselect.options[friendwhitelistselect.options.length]= new window.Option(friendsobj.payload.entries[i].text, friendsobj.payload.entries[i].text + "::" + friendsobj.payload.entries[i].uid);
	//if(typeof(oldfriendstore)!='undefined')
	//  console.log(typeof(oldfriendstore[friendsobj.payload.entries[i].uid]));
  }
  if(friendwhitelistflag && !document.getElementById("friendwhitelistselect")) {
	document.getElementById('friendselectdiv').appendChild(friendwhitelistselect);
	document.getElementById('friendselectdiv').appendChild(friendwhitelistaddbutton);
	document.getElementById('friendlistloadingdiv').style.display='none';
	popuplatefriendwhitelist();
  }
  if(friendwhitelistflag)
    sortSelect('friendwhitelistselect');

  // if friend whitelist box is showing, lets populate it
 /* if(document.getElementById('fbpoptsdiv').style.display=='block') {
    document.getElementById('friendwhitelistta').textContent=
  }*/

 if(debug)
    console.log(friendstore);
	
 if(!document.getElementById('friendwhitelistta') || (!(document.getElementById('friendwhitelistta').style.display=='block'))) {
  // if the whitelist page isnt showing, lets process the deleted friends
  newdfa.init();
  if(!firstrunfriendcheck)
  for(i in oldfriendstore)  {
    if(typeof(friendstore[i])=='undefined') {
	  //deletedfriendstore[i]={};
	  if(typeof(oldfriendstore[i].text)!='undefined'){
	    deletedfriendstore[i] = oldfriendstore[i].text;
		newdfa.addline("<div style='margin-bottom:2px;margin-left:75px;font-weight:bold'><a target='_blank' data-hovercard='/ajax/hovercard/hovercard.php?id=" + i + "' href='/" + i +"'><img src='//graph.facebook.com/" + i + "/picture?size=small' height='16' width='16' style='vertical-align:middle'></a> &nbsp;<a target='_blank' href='/" + i + "/' data-hovercard='/ajax/hovercard/hovercard.php?id=" + i + "'>" + oldfriendstore[i].text + "</a></div>"); // ( <a target='_blank' title='Show friendship' href='https://www.facebook.com/" + currentuserid +"?and=" + i + "'>F</a> ) 
	  }
	  else {
	    deletedfriendstore[i] = oldfriendstore[i];
		newdfa.addline("<div style='margin-bottom:2px;margin-left:75px;font-weight:bold'><a target='_blank' data-hovercard='/ajax/hovercard/hovercard.php?id=" + i + "' href='/" + i +"'><img src='//graph.facebook.com/" + i + "/picture?size=small' height='16' width='16' style='vertical-align:middle'></a> &nbsp;<a target='_blank' href='/" + i + "/' data-hovercard='/ajax/hovercard/hovercard.php?id=" + i + "'>" + oldfriendstore[i] + "</a></div>"); // ( <a target='_blank' title='Show friendship'  href='https://www.facebook.com/" + currentuserid +"?and=" + i + "'>F</a> )
	  }
	  //deletedfriendsmsg += oldfriendstore[i].text + "\n"; 
	}
  }

  fbpsavevalue('oldfriendstore-' + currentuserid, JSON.stringify(friendstore));
  fbpsavevalue('deletedfriendstore-' + currentuserid, JSON.stringify(deletedfriendstore));

  if(Object.keys(deletedfriendstore).length) {
    //console.log(Object.keys(deletedfriendstore).length);
    //window.alert(deletedfriendsmsg + deletedfriendsmsg2);
	newdfa.show(); // show the deleted friend alert
	if(document.getElementById('listsNav')) {
      var tmpli=document.createElement('li');
	  tmpli.id="leftnavdfalinkli";
	  tmpli.setAttribute('style','position:relative;left:26px !important;width:162px !important;margin-top:6px');
      tmpli.innerHTML='<div style="background-color:pink"><a title="Show Deleted Friends Alert" id="replaydeletedfriendsalert" href="javascript:;"><img src="' + friendIconClass + '" style="vertical-align:middle"></img>&nbsp;Deleted Friends Alert &nbsp;<span style="color:#4e5665">'+ Object.keys(deletedfriendstore).length + '</span></a>&nbsp;<a id="clearleftnavdfalink" style="color:red" href="javascript:;" title="Clear Deleted Friends Alert">X</a></div>';
	  document.getElementById('listsNav').getElementsByTagName('ul')[0].insertBefore(tmpli, document.getElementById('listsNav').getElementsByTagName('ul')[0].firstChild);
	  document.getElementById('replaydeletedfriendsalert').addEventListener('click',function() { if(document.getElementById('dfabelly') && document.getElementById('dfabelly').textContent.length) newdfa.show();} ,false); //window.alert(deletedfriendsmsg)
	  document.getElementById('clearleftnavdfalink').addEventListener('click', resetdfa ,false);
    }
  }
 

  if(debug) {
    console.log(deletedfriendstore);
  }
 }
}

function getfriendlist() {

  var userid = currentuserid;
  var FBP_FRIEND_FEED = "www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + userid + "&token=1-1&filter[0]=user&options[0]=friends_only&time=" + Math.floor((new Date()).getTime() / 1000);	

  var FBP_FRIEND_FEED_URL =  window.location.protocol +"\/\/" + FBP_FRIEND_FEED ;
  if(debug)
    console.log(FBP_FRIEND_FEED_URL);
  var cleanregex= new RegExp(/^for \(\;\;\)\;/);
  var http = new window.XMLHttpRequest();
  http.open("GET", FBP_FRIEND_FEED_URL, true);

  // set a callback function
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
	  if(debug)
	     console.log(http.responseText);
	  if(debug)
	    console.log(http.responseText.match(cleanregex));
	  if(http.responseText.match(cleanregex)) {
	    var curfriendsobj = JSON.parse(http.responseText.split(cleanregex)[1]);
		if(debug)
	      console.log(curfriendsobj.payload.entries.length); 
		processfriendsobject(curfriendsobj);
		//curfriendsobj=null;
	  }
	  http=null;
	}
  }
  http.send();
}

  //fbpsavevalue('fbpoptsjson-' + currentuserid, JSON.stringify(fbpoptsobj));
  //exporttext=fbploadvalue('fbpoptsjson-' + currentuserid,exportsettingsbasic2);

function graboldfriendstore (oldstore){
  if(!oldstore && oldstore!='') {
    oldfriendstore=fbploadvalue('oldfriendstore-' + currentuserid,graboldfriendstore);
    if(oldfriendstore==-999) {
	  if(debug)
	    console.log("oldfriendstore=" + oldfriendstore);
      return
	}
  }
  else
    oldfriendstore=oldstore;
  if(debug)
    console.log('oldfriends' + oldfriendstore);
  if(typeof(oldfriendstore)!='undefined' && (oldfriendstore !=null) && (oldfriendstore !=''))
    oldfriendstore=JSON.parse(oldfriendstore);
	
  getfriendlist();
}

function lastfriendcheckfunc (checkeddate) {
  if(debug)
    console.log("checkeddate= " + checkeddate);
  if(!checkeddate && (checkeddate!='')) {
    lastfriendcheck=fbploadvalue('lastfriendcheck-' + currentuserid,lastfriendcheckfunc);
    if(lastfriendcheck==-999)
      return
  }
  else
    lastfriendcheck=checkeddate;

  //console.log("checkeddate= " + checkeddate);
  if ((typeof(lastfriendcheck)=='undefined') || (lastfriendcheck==null) || (lastfriendcheck.length =="")) {
    if(debug)
	  console.log('path 1 - it seems like its the first time we are running the friend check');
    //lastfriendcheck=fbploadvalue('lastfriendcheck-' + currentuserid, lastfriendcheckfunc);
	//if(exporttext==-999)
    //  return;
	firstrunfriendcheck=1;
	if(debug)
	  console.log(currentuserid + " "  + currtime);
	fbpsavevalue('lastfriendcheck-' + currentuserid, currtime + "");
	graboldfriendstore();
    //getfriendlist();
  }
  else {
    if(debug)
	  console.log('path 2 - we have run friends check before so lets check if its time to run it again');
    if((currtime-lastfriendcheck)/1000/60 >= friendcheckinterval) { // 4 minutes (divide by 60 again for hours)
	  fbpsavevalue('lastfriendcheck-' + currentuserid, currtime + "");
	  graboldfriendstore();
      //getfriendlist();
    }
	else {
	  checkdelfriendstorage();
	}
	if(debug)
      console.log((currtime-lastfriendcheck)/1000/60 + " mins elapsed since last x-friend check");
  }
}

////////////////////////////////////
// END FRIEND CHECKING FUNCTIONALITY
////////////////////////////////////

var offtext=""; // text we will filter offline friends with

function offlinefriendscleaner(){
  var onit;
  if(debug)
    console.log('offlinefriendscleaner running, offtext=' + offtext);
  var frns=document.querySelectorAll('li._42fz'); // all friends in list
  for(var i=0;i<frns.length;i++) {
    onit=frns[i].querySelector('div._5t35'); // bit that says mobile/web or blank for offline
	if(!onit) {
      //console.log('we in bang onit now');
	  if(frns[i].querySelector('._5bon') && frns[i].querySelector('._5bon').children.length){
		if(frns[i].querySelector('._5bon').textContent)
		  frns[i].style.display='none';
		else
		  frns[i].style.display='block';
	  }
      else 
		frns[i].style.display='none';
    }
    else
      if((!(onit && onit.textContent))|| onit.textContent==offtext) { // offtext="" = offline, offtext=Mobile
        frns[i].style.display='none';		  
	  }
      else
        frns[i].style.display='block';
	onit=null;
  }
  frns=i=null;
}

function addfbplinktoleftcol(){ // add link to fbp fan page in left column of newsfeed. later on we will add the counter for news items, but perhaps it will work automagically?
  var y=document.getElementById('pagesNav');
  if((y || document.getElementById('universalNav'))  && (!document.querySelector('#navItem_'+FBPFanPageID + ',#navItem_page_' + FBPFanPageID +',div[data-itemid="' + FBPFanPageID + '"]'))) {
    var x=document.createElement('li');
    x.setAttribute('class','sideNavItem stat_elem');
	x.setAttribute('id','navItem_page_' + FBPFanPageID);
	x.style.marginLeft='49px';
	x.style.marginTop='7px';
    x.innerHTML='<a style="color:#333;text-decoration:none" class="item clearfix sortableItem" href="https://www.facebook.com/' + FBPFanPageURL + '?ref=hl" title="Fluff Busting Purity" data-gt="{&quot;bmid&quot;:&quot;' + FBPFanPageID + '&quot;,&quot;count&quot;:&quot;0&quot;,&quot;fbtype&quot;:&quot;274&quot;,&quot;item_type&quot;:&quot;page&quot;,&quot;item_category&quot;:&quot;page_user&quot;,&quot;coeff2_info&quot;:&quot;Aas-OZc_wJzyLqZx4O5stWv1mGL2jPVFTulqFkVYorm0aBamO1sJrIKZxp-lAxBoXmzRAaR_vmKgfw0oE4VNByBV&quot;,&quot;coeff2_registry_key&quot;:&quot;0016&quot;,&quot;coeff2_action&quot;:&quot;3&quot;,&quot;coeff2_pv_signature&quot;:&quot;186204846&quot;,&quot;rank&quot;:&quot;1&quot;}"><div class="rfloat"><img class="uiLoadingIndicatorAsync img" src="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif" alt="" width="16" height="11"><span class="count _5wk0 hidden_elem uiSideNavCount"><span class="countValue fss">0</span><span class="maxCountIndicator"></span></span><span class="grip"></span></div><div><span class="imgWrap"><img class="profileItemImg img" src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash1/373017_408502197558_1955093413_q.jpg" height="16" alt=""></span><div class="linkWrap noCount">F.B. Purity News</div></div></a><span class="mover hidden_elem"></span>';
	//document.getElementById('navItem_page_408502197558').addEventListener('click', resetnewscounter, false);
	if(y) {
	  y.getElementsByTagName('ul')[0].insertBefore(x, y.getElementsByTagName('ul')[0].firstChild);
	}
    else if(document.getElementById('universalNav'))
	  document.getElementById('appsNav').getElementsByTagName('ul')[0].appendChild(x);
	document.getElementById('navItem_page_' + FBPFanPageID).addEventListener('click', resetnewscounter, false);
	x=y=null;
  }
}

function addfbpfaqprompt() {
  //console.log('faqing it');
  if(!window.location.href.match(FBPFanPageURLRegex))
    return;
  var imputs;
  var fbpfaqprompt=document.createElement('div');
  fbpfaqprompt.innerHTML="<span style='font-weight:bold'>Before commenting:</span> Please read the latest post/s on this Page for important info regarding FBP. If you have any questions about FB Purity, please first read the <a title='FB Purity Frequently Asked Questions and Troubleshooting Guide' href='http://faq.fbpurity.com'>FBP FAQ Page</a>. If you have any problems with FBP please follow all the steps in the  <a title='FB Purity Troubleshooting Guide' href='http://www.fbpurity.com/faq.htm#troubleshooting'>FBP Troubleshooting Guide</a>. Reading the previous comments on this page may also help, thanks.";
  fbpfaqprompt.setAttribute('style','color:red !important;margin-bottom:10px;text-align:center');
  fbpfaqprompt.className='fbpfaqprompt';
  if(document.getElementById('photos_snowlift') && (!document.getElementById('photos_snowlift').className.match(/hidden_elem/)) ) {
    if(!document.querySelector('#photos_snowlift div.fbpfaqprompt')) {
      imputs=document.querySelector('#photos_snowlift ul.UFIList');
	  imputs.appendChild(fbpfaqprompt);
	}
  }
  else {
    imputs=document.querySelectorAll('div.UFIAddComment');
	for(i=0;i<imputs.length;i++) {
	  if(!imputs[i].querySelector('div.fbpfaqprompt') && (!(imputs[i].parentNode.className.match(/tickerDialogFooter/))))
        //imputs[i].firstChild.parentNode.insertBefore(fbpfaqprompt.cloneNode(true),imputs[i].firstChild);
	    imputs[i].appendChild(fbpfaqprompt.cloneNode(true));
    }
  }

  imputs=fbpfaqprompt=null;
}

function setBackgroundImage(imageURL) {
  if((fbpoptsobj.backgroundimagefix==1) && fbpoptsobj.backgroundimage==imageURL) {
    if(!confirm("Do you want to remove this background image?"))
      return;
	fbpoptsobj.backgroundimagefix=0;
	fbpoptsobj.topnavimagefix=0;
	fbpoptsobj.transnewsfeed=0;
  }
  else {
    if(!confirm("Please note, once you have chosen a background image, you can change its settings or turn it off via the FBP options screen (Under the Fonts, Colours & Design heading).\n\nDo you want to set this picture as your Facebook background image?"))
      return;
    fbpoptsobj.backgroundimagefix=1;
    fbpoptsobj.stretchbkgimg=1;
    fbpoptsobj.topnavimagefix=1;
	fbpoptsobj.transnewsfeed=1;
    fbpoptsobj.backgroundimage=imageURL;
  }
  //save to prefs obj to localstorage
  fbpsavevalue('fbpoptsjson-' + currentuserid, JSON.stringify(fbpoptsobj));
  //window.location.reload();
  window.setTimeout(function(){window.location.reload(true);},1500);
}

function fbpSetBackgroundImageClick (e) {
  e.preventDefault();
  if(e.stopPropagation)
    e.stopPropagation();
  //alert(e.target.datahref); //getAttribute('href')
  
  if((document.getElementById('photos_snowlift')) && !document.getElementById('photos_snowlift').getAttribute('class').match('hidden_elem')) {
    // photo theatre view
	if(document.querySelector('img.spotlight'))
	  setBackgroundImage(document.querySelector('img.spotlight').getAttribute('src'));
  }
  else // normal photopage
    setBackgroundImage(e.target.datahref);
}

function fbpurify() {
  if(debug)
    console.trace();

  var crappyappmsgcounter=0;
  var xtramsgcounter=0;
  fbpstyle.setAttribute('id','fbpstyler');
  fbpstyle.setAttribute('type','text/css');
  fbpstyle.textContent=fbpStyleNormal;

  //document.addEventListener("DOMNodeInserted", fbpInsertedNodeDomHandler, false);
  // moving this out so it runs on every page, so we can disable autoplay and enable animated gifs on all pages
  if(document.getElementById('pagelet_home_stream') || document.getElementById('pagelet_litestand_section') || document.getElementById('stream_pagelet')) // || document.getElementById('hashtag_permalink_feed')
    cleartheshizzle(document);

} // END fbpurify function


function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function fixnewscolumnoption(){
  //console.log('fixnewscolumn');
  var newswidth;
  if(document.getElementById('newscolstyle') && fbpoptsobj.expandnewscolumn)
    if(window.location.href.match(/\/events\/|\/groups\/|\/allactivity/) || document.querySelector('body.timelineLayout')) {
      //console.log('we should be fixing expand news column option.');
	  document.getElementById('newscolstyle').textContent='';
	  if(!window.location.href.match(/comment_id/)) {
	    window.scrollTo(5,5); // fix graphic glitch
	    window.scrollTo(0,0)
	  }
	}
    else {
		var x1=getPosition(document.querySelector("#contentArea")).x;
		var x2=getPosition(document.querySelector("div.fbChatSidebar")).x;
		if(x2>0) {
		  newswidth=(x2-x1)-10;
		  //console.log("nw="+newswidth);
	    }
		else
		  newswidth=(window.innerWidth-x1)-30;
        document.getElementById('newscolstyle').textContent="#contentArea {width:" + newswidth + "px !important} #rightCol {display:none}";
	}
}

function fbplistener(event){ // listen for messages about theatre mode photos
  if ( event.origin !== "https://www.facebook.com" )
    return
  if(debug)
    ; //console.log(event.data); // producing too much data just when moving mouse so commented out for now
  if(event.data && event.data.match)
  if (event.data.match(/JSPAGEUPDATE/)) {
    //console.log('JS PAGE UPDATE');
	if(fbpoptsobj.rcbirthdays)
      window.setTimeout(nixreminders,3000);
	window.setTimeout(fixnewscolumnoption,3000);
	window.setTimeout(addfbplinktoleftcol,3000);
	window.setTimeout(labelnewsfeed,2000);
	window.setTimeout(checkdelfriendstorage,4000);
	if(fbpoptsobj.tagsuggestions)
	  window.setTimeout(enabletagforfriendlists,3000);
	//window.setTimeout(clickmorestoriesbutt,3500);
	window.setTimeout(fixsortorder,3000);
	window.setTimeout(addunreadstorieslink,2500);
	//window.setTimeout(cleartheshizzle,3500); // deal with list pages etc
	if(fbpoptsobj.seemoreshortcuts){
	  window.setTimeout(function(){
		clickseemore('shortcuts');
	  },2000);
	}
	if(fbpoptsobj.seemoreexplore){
	  window.setTimeout(function(){
		clickseemore('explore');
	  },2000);
	}
  }
  else if(event.data.match(/^FBP\>/)) {
    //console.log('FBP message received');
	window.setTimeout(addsetbackgroundimagelink,2000);
	//if(window.location.href.match(/\/fluffbustingpurity/))
	if(window.location.href.match(FBPFanPageURLRegex))
	  window.setTimeout(addfbpfaqprompt,3500);
  }
  else if(event.data.match(/RESETNEWS/)) {
    resetnewscounter();
  }
  else if(event.data.match(/FAQPROMPT/)) {
    window.setTimeout(addfbpfaqprompt,4000);
  }
  else if(event.data.match(/INITINVITEALL/)) {
    window.setTimeout(initInviteAllToLikePage,4000);
  }
  else if(event.data.match(/FIXPAGEBOOKMARKS/)){
	window.setTimeout(fixPageBookmarks,2000);
  }
  else if(event.data.match(/SHOWLIVEGRID/)){
	showlivegrid();
  }
}

function nixreminders(){ // get rid of unhideable reminders such as birthdays
  //console.log('nixing reminders!');
  var rems=document.getElementsByClassName('fbRemindersStory');
  for(i=0;i<rems.length;i++)
	if(rems[i].querySelector('u') && rems[i].querySelector('u').textContent.match(/birthday/))
	  rems[i].style.display='none';
  rems=null;
}

function labelnewsfeed() {
  if(debug)
    console.log('adding label to newsfeed');
  var bod = document.getElementsByTagName('body')[0];
  var bodclass =  bod.className;
  if(document.querySelector('#pinnedNav li.selectedItem,#universalNav li.selectedItem')) {
    if(!bodclass.match(/ newsfeed/))
      bod.setAttribute('class',bodclass +' newsfeed');
  }
  else
    if(bodclass.match(/ newsfeed/))
      bod.setAttribute('class',bodclass.replace(/ newsfeed/,''));
  bod=bodclass=null;
}

function clickseemore(section){
  if(section=="shortcuts")
	var secid="#pinnedNav";
  else if(section=="explore")
	var secid="#appsNav";
	  
  if(document.querySelector(secid + ' a._y-c')){
	document.querySelector(secid + ' a._y-c').href="javascript:;";
	document.querySelector(secid + ' a._y-c').click();
  }
}

function resetdfa(){
  var dfali=document.getElementById('leftnavdfalinkli');
  if(!dfali)
    return;
  dfali.parentNode.removeChild(dfali);
  if(document.getElementById('delfriendsalertdiv')){
    document.getElementById('delfriendsalertdiv').parentNode.removeChild(document.getElementById('delfriendsalertdiv'));
  }
  fbpsavevalue( "deletedfriendstore-" + currentuserid,"" );
}

function checkdelfriendstorage(delfriendsjson) {
  //console.log('checkdelfriendstorage()' + delfriendsjson);
  //console.log(typeof(delfriendsjson));
  if(!document.getElementById('sideNav') || (!fbpoptsobj.deletedfriendalerts))
    return;
  if(typeof (delfriendsjson)=='undefined') {
    //console.log('loading the shizz...');
	if(issafari)
      var tmpx=fbploadvalue("checkdelfriendstorage-deletedfriendstore-" + currentuserid, checkdelfriendstorage);
    else
	  var tmpx=fbploadvalue("deletedfriendstore-" + currentuserid, checkdelfriendstorage);

	//console.log("tmpx="+tmpx);
	if (tmpx=="-999" || typeof(tmpx)=='undefined' || tmpx=='')
	  return;
	else 
	  delfriendsjson=tmpx;
	//console.log("delfriendsjson="+delfriendsjson);
  }
  if(!delfriendsjson || delfriendsjson=="") {
    //console.log("we don't have any data in delfriendsjson");
    return;
  }
  else {
    //console.log(delfriendsjson);
    var delfriendstore,delfriendsobj;
	
    //query deletedfriendstore in localstorage
    //"deletedfriendstore-628191926"
    //generate alert
    // also show left column indicator of deleted friends.
 
    //delfriendstore = fbploadvalue("deletedfriendstore" + currentuserid);
    delfriendsobj=JSON.parse(delfriendsjson);
    if(typeof(delfriendsobj) !='object') {
      return;
	}
    for(i in delfriendsobj) {
      console.log(delfriendsobj[i] , i);
    }
    //console.log("number of del friends= " + Object.keys(delfriendsobj).length);
	if(Object.keys(delfriendsobj).length > 0)
	if((document.getElementById('listsNav') || document.getElementById('universalNav')) && !(document.getElementById('replaydeletedfriendsalert'))) {
      var tmpli=document.createElement('li');
	  tmpli.id="leftnavdfalinkli";
	  tmpli.setAttribute('style','position:relative;left:26px !important;width:162px !important;float:left;margin-top:6px');
      tmpli.innerHTML='<div style="background-color:pink"><a title="Replay Deleted Friends Alert" id="replaydeletedfriendsalert" href="javascript:;"><img src="' + friendIconClass + '" style="vertical-align:middle"></img>&nbsp;Deleted Friends Alert &nbsp;<span style="color:#4e5665">'+ Object.keys(delfriendsobj).length + '</span></a>&nbsp;<a id="clearleftnavdfalink" style="color:red" href="javascript:;" title="Clear Deleted Friends Alert">X</a></div>';
	  if(document.getElementById('listsNav'))
	    document.getElementById('listsNav').getElementsByTagName('ul')[0].insertBefore(tmpli, document.getElementById('listsNav').getElementsByTagName('ul')[0].firstChild);
	  else
		//document.getElementById('appsNav').getElementsByTagName('ul')[0].appendChild(tmpli);
	    document.getElementById('appsNav').getElementsByTagName('ul')[0].insertBefore(tmpli, document.getElementById('appsNav').getElementsByTagName('ul')[0].firstChild)
	  document.getElementById('replaydeletedfriendsalert').addEventListener('click',function(){dspdeletedfriendalert();},false); //window.alert(deletedfriendsmsg) 
	  document.getElementById('clearleftnavdfalink').addEventListener('click', resetdfa ,false);
    }
  
	// not sure what the point of this bit of code is now, so commenting it out...
	//else if(document.getElementById('replaydeletedfriendsalert'))
	//  document.getElementById('replaydeletedfriendsalert').style.display="inline-block";
	
    // See Line 5529 for where to generate the link in the left column :- if(Object.keys(deletedfriendstore).length)
    if(debug)
      console.log('checkdelfriendstorage');
 }
}

function tamesearchbox() {
  try { // when enter is pressed do a search
	//document.querySelector('#blueBarNAXAnchor div[role="search"] div[onfocus]').addEventListener('keydown',function(e){if(e.keyCode=='13') document.querySelector('#facebar_typeahead_view_list span.seeMore').click() },false)
	document.querySelector('#blueBarDOMInspector div[role="search"] div').addEventListener('keydown',function(e){if(e.keyCode=='13') document.querySelector('#blueBarDOMInspector div[role="search"] button').click() },false)
  }
  catch(e) {
	console.log('Error in tamesearchbox function, (setting event listener on search box, perhaps user doesn\'t have Graph Search ) := ' + e);
  }
}

function enabletagforfriendlists() {
  if(debug)
    console.log('Enable auto tag for friends lists');
  if(window.location.href.match(/facebook.com\/settings|\?viewas=/)) {
    if(document.getElementsByTagName('html')[0].className.match(/fbpstopautotags/))
	  document.getElementsByTagName('html')[0].className=document.getElementsByTagName('html')[0].className.replace(/fbpstopautotags/,'')
  }
  else
    if(!document.getElementsByTagName('html')[0].className.match(/fbpstopautotags/)) {
	  document.getElementsByTagName('html')[0].className += ' fbpstopautotags';
	}
  if(window.location.href.match(/\/lists\//) && document.querySelector('#friend_list_sidecol input[type="text"]')) {
    //document.querySelector('#friend_list_sidecol input[type="text"]').addEventListener('focus',enableautotags,false);
    document.querySelector('#friend_list_sidecol input[type="text"]').addEventListener('blur',disableautotags,false);
    document.querySelector('#friend_list_sidecol input[type="text"]').addEventListener('keydown',enableautotags,false);
  }
  else if(window.location.href.match(/\/events\//) && document.querySelector('#event_invite input[type="text"]')) {
    document.querySelector('#event_invite input[type="text"]').addEventListener('blur',disableautotags,false);
    document.querySelector('#event_invite input[type="text"]').addEventListener('keydown',enableautotags,false);
  }
  else if(document.getElementById('q')) {
    document.getElementById('q').addEventListener('blur',disableautotags,false);
    document.getElementById('q').addEventListener('keydown',enableautotags,false);
  }
}

function disableautotags(){
  window.setTimeout(function(){
	if(!document.getElementsByTagName('html')[0].className.match(/fbpstopautotags/)) { 
	  //console.log("disabling autotags");
      document.getElementsByTagName('html')[0].className=document.getElementsByTagName('html')[0].className + ' fbpstopautotags';
	}
  }, 2000);
}

function enableautotags(){
  //console.log("enabling autotags");
  document.getElementsByTagName('html')[0].className=document.getElementsByTagName('html')[0].className.replace(/fbpstopautotags/,'');
}

function addunreadstorieslink() {
  if(debug)
    console.log('add unread stories link');
  var feedselbutt = document.querySelector('#pinnedNav div.uiPopover.uiSideNavAux a,#universalNav div.uiPopover.uiSideNavAux a');
  if(feedselbutt)
  feedselbutt.addEventListener('click',function(){window.setTimeout(
  function(){
    if(debug)
	  console.log('clicked - shows event listener is working');
	  if(document.getElementById('mstorieslink')) {
		if(document.querySelector("div.uiContextualLayerPositioner.hidden_elem #mstorieslink")) {
		  // fix top stories link
		  try{
		    if(document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"])').querySelector('a[href*="?sk=h_nor"]').href)
		      document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"])').querySelector('a[href*="?sk=h_nor"]').href="/?sk=h_nor#topstories";
		  }
		  catch(e){
			  ; // do nothing at the moment...
		  }

		  // fix hidden feed drop down menu 
		  var inpoint=document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"]) a[href*="?sk=h_chr"]');
		  try{
		    inpoint.parentNode.parentNode.insertBefore(document.getElementById('pstorieslink').parentNode, inpoint.parentNode.nextSibling);
		    inpoint.parentNode.parentNode.insertBefore(document.getElementById('mstorieslink').parentNode, inpoint.parentNode.nextSibling);
		  }
		  catch(e) {
			  ; // do nothing should be ok?
		  }
		}

		ticked=document.querySelectorAll("div.uiContextualLayer.uiContextualLayerBelowRight li[class*='_54nd']")
		for(i=0;i<ticked.length;i++) 
		  ticked[i].className=ticked[i].className.replace(/_54nd/,'');
	    if(window.location.href.match(/\/?sk=friends/)) {
		  document.getElementById('mstorieslink').parentNode.className+=' _54nd';
		}
        else if (window.location.href.match(/\?sk=photos/)) {
		  document.getElementById('pstorieslink').parentNode.className+=' _54nd';
		}
		else if (window.location.href.match(/\?sk=h_chr/) || document.querySelector("#contentCol a[href='/?sk=h_nor']")){
		  try {
		    document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"]) a[href*="?sk=h_chr"]').parentNode.className += " _54nd";
		  }
		  catch(e) {; 
		    // do nothing
		  }
		}
		else if (window.location.href.match(/\?sk=h_nor/) ){
		  try{
		    document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"]) a[href*="?sk=h_nor"]').parentNode.className += " _54nd";
		  }catch (e) {
			;// do nothing
		  }	  
		
		}

	    return;
	   }
	   else {
		 var tspan=document.createElement('span'); 
		 tspan.setAttribute('class','_54nh');
	     //var origs=document.querySelector('div.uiContextualLayer.uiContextualLayerBelowRight li _54n');
	     var inpointA=document.querySelectorAll('div.uiContextualLayer.uiContextualLayerBelowRight a[href*="?sk=h_chr"]');
		 var inpoint=inpointA[inpointA.length-1];

		 var pstorieslink=document.createElement('a');
		 pstorieslink.id="pstorieslink";
	     pstorieslink.href="/?sk=photos"; //https://www.facebook.com
         pstorieslink.className='_54nc';
		 pstorieslink.appendChild(tspan.cloneNode(1));
		 pstorieslink.firstChild.textContent="Photos Feed";
	     var pli=document.createElement('li');
	     pli.style.cursor="pointer";
	     pli.className='_54ni __MenuItem';
		 if(window.location.href.match(/\?sk=photos/)){
		   pli.className+=' _54nd';
		 }
	     pli.appendChild(pstorieslink);

	     inpoint.parentNode.parentNode.insertBefore(pli, inpoint.parentNode.nextSibling);
		 document.getElementById("pstorieslink").parentNode.addEventListener('mouseover',function(e){e.target.style.backgroundColor='rgb(59, 89, 152)';e.target.style.color='white';}, false);
	     document.getElementById("pstorieslink").parentNode.addEventListener('mouseout',function(e){e.target.style.backgroundColor='inherit';e.target.style.color='inherit';}, false);
		 
	     var mstorieslink=document.createElement('a');
	     mstorieslink.id="mstorieslink";
	     mstorieslink.href="/?sk=friends"; ///feed/friends/
         mstorieslink.className='_54nc';
		 mstorieslink.appendChild(tspan.cloneNode(1));
		 mstorieslink.firstChild.textContent="Friends Feed";
	     var mli=document.createElement('li');
	     mli.style.cursor="pointer";
	     mli.className='_54ni __MenuItem';
		 if(window.location.href.match(/\/?sk=friends/)){
		   mli.className+=' _54nd';
		 }
		 mli.appendChild(mstorieslink);

	     inpoint.parentNode.parentNode.insertBefore(mli, inpoint.parentNode.nextSibling);
		 document.getElementById("mstorieslink").parentNode.addEventListener('mouseover',function(e){e.target.style.backgroundColor='rgb(59, 89, 152)';e.target.style.color='white';}, false);
	     document.getElementById("mstorieslink").parentNode.addEventListener('mouseout',function(e){e.target.style.backgroundColor='inherit';e.target.style.color='inherit';}, false);

		if (window.location.href.match(/\?sk=h_chr/) || document.querySelector("#contentCol a[href='/?sk=h_nor']")){ // highlight most recent
		  try{
		    document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"])').querySelector('li:not([class*="_54nd"]) a[href*="?sk=h_chr"]').parentNode.className+= ' _54nd';
		  }
		  catch(e) {
			; // do nothing
		  }
		}
		else if (window.location.href.match(/\?sk=h_nor/) ){ // highlight top stories
		  try{
		    document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"])').querySelector('li:not([class*="_54nd"]) a[href*="?sk=h_nor"]').parentNode.className+= ' _54nd';
		  }
		  catch(e) {
			; // do nothing
		  }
		}
		// fix top stories link
		if(document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"])').querySelector('a[href*="?sk=h_nor"]').href)
		  document.querySelector('div.uiContextualLayerPositioner:not([class*="hidden_elem"])').querySelector('a[href*="?sk=h_nor"]').href="/?sk=h_nor#topstories";
	   }
	 }
   ,50)},false)
}

function addclearadprefsbutt() {
  if(debug)
    console.log('addclearadprefsbutt');
  var x,y,i,j;
  var newadprefs=0;
  if(document.getElementById('ad_profile_Interests'))
	newadprefs=1;
  var clearadprefsbutt=document.createElement('button');
  clearadprefsbutt.textContent="Clear Interests with FBP";
  
  var clearadvertisersbutt=document.createElement('button');
  clearadvertisersbutt.textContent="Clear Advertisers with FBP";
  
  if(!newadprefs) // for the old ad prefs page... (code can probably be deleted)
   clearadprefsbutt.addEventListener('click',function(){
	x=document.querySelectorAll('#ads_preferences_desktop_root ul:nth-child(1) li');
	for(i=0;i<x.length;i++)x[i].click(); // click all the headings
	while(document.querySelectorAll('li._z0p span._443_._c24').length!=0) { // click all the See More links
	  x=document.querySelectorAll('li._z0p span._443_._c24'); 
	  for(i=0;i<x.length;i++)
		x[i].click();
	}
    j=200;y=document.querySelectorAll('#ads_preferences_desktop_root ul:nth-child(1) ._2imq');
	var delay = j;
	for(i=0;i<y.length;i++) {
	  (function(elem){
	    window.setTimeout( function(){elem.click();}, delay);
	   }
	  )(y[i]);
	  delay += j;
	}
	// close the final popup
	delay+=j;
	window.setTimeout(function(){document.querySelector('div.uiOverlayFooter a.layerCancel').click();},delay);
  })
  else {
	clearadprefsbutt.addEventListener('click',clearadprefs,false);
	clearadvertisersbutt.addEventListener('click',clearadvertisers,false);
  }
  
  if(newadprefs) {
	  document.getElementById('ad_profile_Interests').appendChild(clearadprefsbutt);
	  document.getElementById('ad_profile_Advertisers').appendChild(clearadvertisersbutt);
  }
	else
      document.querySelector('h2 div').appendChild(clearadprefsbutt);
}

function clearadprefs() {
	//newadprefs
	var delay=250;
    //var adcategories=document.getElementById('ad_profile_Interests').querySelectorAll('span._qdn');
    var currdelay = delay;
	while(ad_profile_Interests.lastChild.previousSibling.lastChild.textContent=="See More") { // click all the See More links
	  ad_profile_Interests.lastChild.previousSibling.lastChild.click();
	}
    var adtypes=document.querySelectorAll('#ad_profile_Interests button[title="Remove"]');
	if(!adtypes.length) {
	  if(typeof(document.getElementById("ad_profile_Interests").querySelector('span._qdm').nextSibling)==null)
		return;
	  document.getElementById("ad_profile_Interests").querySelector('span._qdm').nextSibling.click();
	  adtypes=document.querySelectorAll('#ad_profile_Interests button[title="Remove"]');
	}

    for(j=0;j<adtypes.length;j++) {
      (function(elem){
        window.setTimeout( function(){if(elem.title=="Remove")elem.click();}, currdelay);
      })(adtypes[j]);
      currdelay += delay;
	  if(j==(adtypes.length-1)){
		currdelay += delay;
		window.setTimeout(clearadprefs,currdelay);
	  }
    }
}

function clearadvertisers() {
  //newadprefs
  var delay=250;
  var currdelay = delay;
  while(ad_profile_Advertisers.lastChild.previousSibling.lastChild.textContent=="See More") { // click all the See More links
     ad_profile_Advertisers.lastChild.previousSibling.lastChild.click();
  }
  
  if(!document.getElementById('ad_profile_Advertisers') )
	return;	  
  var advertisers=document.getElementById('ad_profile_Advertisers').querySelectorAll('button[title^="Hide ad"]');
  if(!advertisers.length) {
	if(typeof(document.getElementById("ad_profile_Advertisers").querySelector('span._qdm').nextSibling)==null)
	  return;
	document.getElementById("ad_profile_Advertisers").querySelector('span._qdm').nextSibling.click();
	advertisers=document.getElementById('ad_profile_Advertisers').querySelectorAll('button[title^="Hide ad"]');
  }
  for(j=0;j<advertisers.length;j++) {
    (function(elem){
      setTimeout( function(){elem.click();}, currdelay);
    })(advertisers[j]);
    currdelay += delay;
	if(j==(advertisers.length-1)){
	  currdelay += delay;
	  window.setTimeout(clearadvertisers,currdelay);
	}
  }
}

function fixPageBookmarks() {
  if(!document.location.href.match(/facebook\.com\/bookmarks\/pages/) && !document.getElementById('pagelet_bookmark_seeall'))
	return;
  var pnots=document.getElementById('pagelet_bookmark_seeall').querySelectorAll('.countValue._2jgb');
  //console.log(pnots);
  var notlink;
  for(var i=0;i<pnots.length;i++) {
	notlinkhref=pnots[i].parentNode.parentNode.href.split(/\?/)[0] + "notifications";
	notlink=document.createElement('a');
	notlink.href=notlinkhref;
	notlink.textContent=' N';
	notlink.title="Go Straight to Notifications Page";
	notlink.target="_blank";
	notlink.style='position:absolute;margin-top:4px;margin-left:4px;';
	pnots[i].parentNode.parentNode.parentNode.appendChild(notlink);
  }
}

/////////////////////////////////
// BEGIN INVITE ALL FUNCTIONALITY
/////////////////////////////////

function inviteAll() { // comes with a delay
  var invButts=document.querySelectorAll('div.listSection a.uiButton');
  var j=500; // delay in milliseconds
  var scrollbox;
  var delay = j;
  if(invButts.length==0) {
	procInviteAllDiv('updateText','<b>No friends left to invite.</b><p/><a class="_42ft _42fu layerCancel autofocus uiOverlayButton selected _42g- _42gy" onclick="this.parentNode.parentNode.style.display=\'none\'">Close</a>');
	return;
  }
  if(document.querySelector('.fbProfileBrowserResult'))
	scrollbox=document.getElementsByClassName('fbProfileBrowserResult')[0];
  for(var i=0;i<invButts.length;i++) {
	(function(elem,index){
	   if(i!=invButts.length-1)
	     setTimeout( function(){if(typeof scrollbox!='undefined') scrollbox.scrollTop=elem.offsetTop; elem.click(); procInviteAllDiv('updateText','<b>Inviting Friend: '+ index +' / ' + invButts.length + '</b><p/>' + elem.parentNode.parentNode.parentNode.parentNode.firstChild.getElementsByTagName('img')[0].outerHTML)}, delay);
	   else
		 setTimeout( function(){if(typeof scrollbox!='undefined') scrollbox.scrollTop=elem.offsetTop; elem.click(); procInviteAllDiv('updateText','<b>Finished Inviting All Friends.</b><p/><a class="_42ft _42fu layerCancel autofocus uiOverlayButton selected _42g- _42gy" onclick="this.parentNode.parentNode.style.display=\'none\'">Close</a>');}, delay);
	 })(invButts[i],i);
	 delay += j;
  }
}
function loadAllUsers() {
  var userList = document.querySelector('div.fbProfileBrowserResult');
  var tmpScrHeight, tmpScrTop;

  var x=setInterval(function(){
                 if(userList.scrollTop !=userList.scrollHeight){
				   //console.log(userList.scrollTop,userList.scrollHeight);
                   tmpScrHeight = userList.scrollHeight;
                   tmpScrTop = userList.scrollTop;
                   userList.scrollTop = userList.scrollHeight;
				   procInviteAllDiv('updateText','<b>Loading Friend List<p/>Please Wait...<p/><img src="//www.facebook.com/images/loaders/indicator_blue_small.gif"></b>');

                   if((userList.scrollTop==tmpScrTop)  && (userList.scrollHeight==tmpScrHeight)) {
                     clearInterval(x);
					 procInviteAllDiv('updateText','<b>Finished Loading Friend List.<p/>Will now invite all Friends ...</b>');
					 inviteAll();
				   }
                 }
                 else {
				   clearInterval(x);
				   procInviteAllDiv('updateText','Friend List Fully Loaded');
				 }
			   },500);
}

function procInviteAllDiv(command,text) {
  var procInviteAllDiv;
  if(!document.getElementById('procInviteAllDiv')) {
	procInviteAllDiv=document.createElement('div');
    procInviteAllDiv.id='procInviteAllDiv';
	procInviteAllDiv.className='procInviteAllDiv';
	procInviteAllDiv.setAttribute('style',"position: fixed; text-align:center; top: 50%; left: 50%; width: 17em; height: 6em; margin-top: -9em; margin-left: -15em; border: 3px solid red; background-color: #f3f3f3; z-index: 999; padding: 10px");
	document.getElementsByTagName('body')[0].appendChild(procInviteAllDiv);
  }
  else {
	procInviteAllDiv=document.getElementById('procInviteAllDiv');
  }
  switch(command) {
    case 'updateText':
	  procInviteAllDiv.style.display='block';
      procInviteAllDiv.innerHTML=text;
	  //console.log(text);
      break;
    case 'destroy':
      procInviteAllDiv.style.display='none'; // could delete div entirely...
      break;
    default:
      ;// do nothing
	  break;
  }
}

function initInviteAllButton() {
  //alert('hey ya!');
  window.setTimeout(addInviteAllButton,2000);
}

var initInviteAllTries=0;
function addInviteAllButton() {
  var daform=document.querySelector('form[action^="/ajax/pages/invite/send/"]');
  if(!daform) {
	//console.log('no "invite users to like page" form found');
	if(initInviteAllTries<6) {
	  window.setTimeout(addInviteAllButton,2000);
      initInviteAllTries++;
    }
    return;
  }
  //var inviteAllButtDiv="<button id="inviteAllButt"></button>";
  var divButt=document.createElement("div");
  divButt.style.marginBottom='-10px';
  divButt.style.textAlign='center';
  var inviteAllButtLink=document.createElement('a');
  inviteAllButtLink.style.color="red";
  inviteAllButtLink.style.fontWeight="800";
  inviteAllButtLink.style.marginTop="3px";
  inviteAllButtLink.style.id="inviteAllButt";
  inviteAllButtLink.textContent=">> Click here to invite all Your Friends <<";
  inviteAllButtLink.title="Please invite all your friends to like the FB Purity Fan Page";
  inviteAllButtLink.addEventListener('click',loadAllUsers,false);
  divButt.appendChild(inviteAllButtLink);
  daform.querySelector('div').appendChild(divButt);
  initInviteAllTries=0;
}

function initInviteAllToLikePage() {
  //var initInviteLink=document.querySelector('#PageContextRowsPagelet_408502197558 a[href^="/ajax/choose/?type=fan_page"]');
  var initInviteLink=document.querySelector('#pagelet_timeline_main_column +div a[href^="/ajax/choose/?type=fan_page"]');
  if(initInviteLink) {
    //console.log('found it');
    initInviteLink.style.fontWeight="800";
    initInviteLink.style.color="red";
	initInviteLink.setAttribute('title',"Please invite all your friends to like the FBP Fan Page, to help spread the word about FB Purity, thanks!");
    initInviteLink.textContent=initInviteLink.textContent;
    if(initInviteLink.textContent.match(/Invite friends to like this Page/))
      initInviteLink.textContent='Invite your friends to like this Page';
    initInviteLink.addEventListener('click',initInviteAllButton,false);
	initInviteAllTries=0;
  }
  else {
    //console.log('Didnt find the invite users to like page link');
	if(initInviteAllTries<9) {
	  window.setTimeout(initInviteAllToLikePage,3000);
      initInviteAllTries++;
    }
  }
}
///////////////////////////////
// END INVITE ALL FUNCTIONALITY
///////////////////////////////


////////////////////////////////////
// BEGIN LIVE MAP GRID FUNCTIONALITY
////////////////////////////////////
function switchprofimage(e){
  var tmpimg=e.target.src;
  e.target.src=e.target.getAttribute('data-profpic');
  e.target.setAttribute('data-profpic',tmpimg);
}

function showlivegrid() {
  //console.log("showlivegrid");
  var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  w=w/2;
  var tmpHTML;
  var x=JSON.parse(document.getElementById('hidlivediv').textContent.replace(/^for\ \(;;\);/,''));
  //console.dir(x);
  var gridOverlayDiv=document.createElement('div');
  gridOverlayDiv.setAttribute('style','opacity:1; background-color:#ccc; width:100%; height:100%; top:0px; left:0px;overflow-y:scroll;overflow-x:hidden;');//position:fixed;z-index:1000
  tmpHTML='<div style="position:fixed;left:' + w + 'px;background-color:white;opacity:0.8;margin-top:2px;margin-bottom:2px;text-align:center"><a id="closeGridLink" href="">Close Live Grid</a><!-- | <a id="refreshGridLink" href="">Refresh Grid</a>--></div>';
  
  for(var i=0;i<x.payload.streams.length;i++)
    if(x.payload.streams[i].message)
      tmpHTML+="<a target='_blank' data-lat='" + x.payload.streams[i].lat + "' data-long='" + x.payload.streams[i].long + "' title='" + x.payload.streams[i].name.replace('>','&gt;').replace('<','&lt;').replace(/\'/,'&quot;').replace(/"/,'&quot;') + ' - '+ x.payload.streams[i].message.replace('>','&gt;').replace('<','&lt;').replace(/\'/,'&quot;').replace(/"/,'&quot;') + ' - ' + x.payload.streams[i].viewerCount + " viewers' href='https://facebook.com/" + x.payload.streams[i].videoID +"'>" + "<img height='60' width='60' data-profpic='" + x.payload.streams[i].profilePicture + "' style='display:inline' src='" + x.payload.streams[i].previewImage +"'>" + "</a>" + " ";
  gridOverlayDiv.innerHTML=tmpHTML;
  tmpHTML=x=null;
  document.getElementById('hidlivediv').innerHTML='';
  //document.getElementsByTagName('body')[0].appendChild(gridOverlayDiv);
  document.getElementById('globalContainer').innerHTML='';
  document.getElementById('globalContainer').style.marginTop="0px";
  document.getElementById('globalContainer').appendChild(gridOverlayDiv);
  var streamimages=document.getElementById('globalContainer').querySelectorAll('img');
  for(i=0;i<streamimages.length;i++) {
	streamimages[i].addEventListener('mouseout',switchprofimage,false);
    streamimages[i].addEventListener('mouseover',switchprofimage,false);
  }
  
  /* add country code to thumbnail descriptions // commented out cos not working
  var imglinks=document.querySelectorAll('a[data-lat]');
  for(i=0;i<imglinks.length;i++)
    imglinks[i].addEventListener('mouseover',getAddressFromLatLon,false);
  */
  // create mousover image enlarge effect
  /* commented out for now, as resize code is a bit glitchy
  var imglinks=document.querySelectorAll('a[data-lat] img');
  for(i=0;i<imglinks.length;i++) {
    imglinks[i].addEventListener('mouseover',resizeGridImg,false);
	imglinks[i].addEventListener('mouseout',resizeGridImg,false);
  }
  */
}

function addlivegridlink(){
  var linkDiv=document.createElement('span');
  linkDiv.id='userGridLinkDiv';
  linkDiv.setAttribute('style','float:right:width:150px;margin-left:10px');
  var gridLink=document.createElement('a');
  gridLink.textContent="View Live Grid";
  gridLink.addEventListener('click',gotolivegrid,false);
  linkDiv.appendChild(gridLink);
  window.setTimeout(function(){
    document.querySelector('._7sr').appendChild(linkDiv);
  },3000);
}

function gotolivegrid() {
  var embedlivegridscript=document.createElement('script');
  embedlivegridscript.id="embedlivescript";
  embedlivegridscript.innerHTML=gotolivegridembed + "; gotolivegridembed ()";
  document.getElementsByTagName('head')[0].appendChild(embedlivegridscript);
  // pausing the video will speed things up
  if(document.querySelector('video'))
    document.querySelector('video').pause();
  else if (document.querySelector('embed'))
	document.querySelector('embed').style.display='none';
}
// this function will be injected into the page context
function gotolivegridembed () {
  // xmlHTTPRequest to the url
  // create a div show grid in div
  // allow sorting of div by number of viewers
  // allow search of live vid descriptions
  
  var globCont=document.getElementById('globalContainer');
  globCont.style.textAlign='center';
  globCont.style.color='red !important';
  globCont.style.marginTop='250px';
  globCont.style.fontWeight='bold';
  globCont.innerHTML='<h1>Loading Live Grid <img src="//www.facebook.com/images/loaders/indicator_blue_small.gif"></h1>';
  //document.getElementById('userGridLinkDiv').innerHTML='<h1>Loading Live Grid <img src="//www.facebook.com/images/loaders/indicator_blue_small.gif"></h1>';
  
  var LIVE_FEED_URL="https://www.facebook.com/ajax/livemap/map/data/?level=1&video_count=400&dpr=1&__user=" + document.cookie.match(/c_user=(\d+)/)[1] + "&__a=1&__dyn=" + require('ServerJSDefine').getLoadedModuleHash() + "&__req=3s&__be=-1&__pc=PHASED%3ADEFAULT&__rev=2530733";
  var http = new window.XMLHttpRequest();
  http.open("GET", LIVE_FEED_URL, true);

  // set a callback function
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
	  if(http.responseText!="") {
		if(!document.getElementById('hidlivediv')){
	      var hidlivediv=document.createElement('div');
		  hidlivediv.id="hidlivediv";
		  hidlivediv.style.display='none';
		}
		else
		  var hidlivediv=document.getElementById('hidlivediv');
		hidlivediv.textContent=http.responseText;
		//console.log(http.responseText);
		document.getElementsByTagName('body')[0].appendChild(hidlivediv);
		window.postMessage('SHOWLIVEGRID',"https://www.facebook.com");
		//curfriendsobj=null;
	  }
	  http=null;
	}
  }
  http.send();
}

function resizeGridImg(e){
	var daimg=e.target;
	if(daimg.height==60) {
		daimg.setAttribute('height',daimg.naturalHeight);
		daimg.setAttribute('width',daimg.naturalWidth);
	}else{
		daimg.setAttribute('height',60);
		daimg.setAttribute('width',60);
	}
}

/* Doesnt work cos of content security policy
function getAddressFromLatLon(e){
  var lat=e.target.getAttribute('data-lat');
  var lon=e.target.getAttribute('data-long');
  var GEOCODERURL="https://maps.googleapis.com/maps/api/geocode/json?latlng=" +lat+','+lon;
  var http = new window.XMLHttpRequest();
  http.open("GET", GEOCODERURL, true);

  // set a callback function
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
	  if(http.responseText!="") {
		if(!document.getElementById('hidlivediv')){
	      var hidlivediv=document.createElement('div');
		  hidlivediv.id="hidlivediv";
		  hidlivediv.style.display='none';
		}
		else
		  var hidlivediv=document.getElementById('hidlivediv');
		hidlivediv.textContent=http.responseText;
		document.getElementsByTagName('body')[0].appendChild(hidlivediv);
		console.log(http.responseText);
		//curfriendsobj=null;
	  }
	  http=null;
	}
  }
  http.send();
}
*/
//////////////////////////////////
// END LIVE MAP GRID FUNCTIONALITY
//////////////////////////////////

// only run if DOM has loaded
var finalstage=function () {
  if(debug)
    console.log('finalstage()');
// we should check to see if fbpurify is already running...
  var dahead=document.getElementsByTagName('head');
  if(dahead.length) {
    if(debug)
      console.log('head hit straight away');
    if(fbpoptsobj.fbpwebfontfix) {
	  createfontlink('fontlink');
      document.getElementById('fontlink').setAttribute('href','https://fonts.googleapis.com/css?family=' + fbpoptsobj.fbpwebfont); 
	}
    checkforfbpcollision();
    // should probably merge all these styles for a single insertion
    dahead[0].appendChild(fbpboxstyle);
    dahead[0].appendChild(fbpstyle);
    dahead[0].appendChild(fbpfreestyle);
    dahead[0].appendChild(fbptlstyle);
	dahead[0].appendChild(fbpcssstyle);
	dahead[0].appendChild(ncstyle);

	//bringbacknormalcommenting();
	addexternallinkfix();

	if(fbpoptsobj.hovercards) {
	  document.querySelector('html').className+=' hidehovercards';
	}

	if(debug)
	  console.log('before tlbuttinit');
	tlbuttinit(); // initialise the timeline single column button (also adds fbp butt)
	if(debug)
	  console.log('after tlbuttinit');

	window.setTimeout(fixsortorder,6000);
	window.setTimeout(addfbplinktoleftcol,6500);

	if(fbpoptsobj.deletedfriendalerts) 
	  window.setTimeout(lastfriendcheckfunc,8000);

    if(fbpoptsobj.fbpnewsnotifier)
	  window.setTimeout(checkforlastnewsupdate,9000);	

    if(fbpoptsobj.fullscreenchat || fbpoptsobj.chatbox) 
	  window.setTimeout(fullscreenchat,5000);
   
    window.setTimeout(fixPageBookmarks,5000);

	//if(window.location.href.match(/\/fluffbustingpurity/))
	if(window.location.href.match(FBPFanPageURLRegex))
	  window.setTimeout(addfbpfaqprompt,7000);

	window.addEventListener("message", fbplistener, false); // we are listening for messages from the content page (alerting to theatre mode)

	if(fbpoptsobj.tagsuggestions && (!window.location.href.match(/facebook\.com\/settings/)))
	  if(!document.getElementsByTagName('html')[0].className.match(/fbpstopautotags/))
	    document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className + ' fbpstopautotags';

	if(fbpoptsobj.hidesearchpopup) {
	  window.setTimeout(tamesearchbox,6000);
	}

    dahead=null;
  }
  else {
    var waitforhead=window.setInterval(function(){
	  dahead=document.getElementsByTagName('head');
      if(dahead.length ) {
	    if(debug)
	      console.log('head hit after interval');
	    window.clearInterval(waitforhead);
	    if(fbpoptsobj.fbpwebfontfix) {
	      createfontlink('fontlink');
          document.getElementById('fontlink').setAttribute('href','https://fonts.googleapis.com/css?family=' + fbpoptsobj.fbpwebfont); 
	    }
		checkforfbpcollision();
        // should probably merge all these styles for a single insertion
	    dahead[0].appendChild(fbpboxstyle);
	    dahead[0].appendChild(fbpstyle);
	    dahead[0].appendChild(fbpfreestyle);
        dahead[0].appendChild(fbptlstyle);
		dahead[0].appendChild(fbpcssstyle);
		dahead[0].appendChild(ncstyle);

	    //window.setTimeout(bringbacknormalcommenting,2000); // prefs werent being read in before running this, so i added a short delay
	    //bringbacknormalcommenting();
	    addexternallinkfix();
		
		if(fbpoptsobj.hovercards) {
		  document.querySelector('html').className+=' hidehovercards';
		}

	    if(debug)
		  console.log('before tlbuttinit');
		tlbuttinit(); // initialise the timeline single column button
		if(debug)
		  console.log('after tlbuttinit');

		window.setTimeout(fixsortorder,6000);
		window.setTimeout(addfbplinktoleftcol,6500);

		if(fbpoptsobj.deletedfriendalerts)
		  window.setTimeout(lastfriendcheckfunc,8000);

		if(fbpoptsobj.fbpnewsnotifier) 
	      window.setTimeout(checkforlastnewsupdate,9000);

		if(fbpoptsobj.fullscreenchat || fbpoptsobj.chatbox) 
	      window.setTimeout(fullscreenchat,5000);

		//if(window.location.href.match(/\/fluffbustingpurity/))
		if(window.location.href.match(FBPFanPageURLRegex))
  	      window.setTimeout(addfbpfaqprompt,6000);

		window.addEventListener("message", fbplistener, false); // we are listening for messages from the content page (alerting to theatre mode)

		if(fbpoptsobj.tagsuggestions && (!window.location.href.match(/facebook\.com\/settings/)))
		  if(!document.getElementsByTagName('html')[0].className.match(/fbpstopautotags/))
		    document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className + ' fbpstopautotags';

		if(fbpoptsobj.hidesearchpopup) {
		  window.setTimeout(tamesearchbox,6000);
		}
		dahead=null;
      }
    }, 500);
  }

  var waitforbody=window.setInterval(function(){
    if(document.getElementsByTagName('body').length) {
	  window.clearInterval(waitforbody);
      //fbpfirstruncheck();
	  window.setTimeout(fbpfirstruncheck,1000);
	  if(debug)
        console.log('body hit');
	  //if(window.location.href.match(/\.facebook\.com\/sharer\/sharer\.php.*#fbpshr|\.facebook\.com\/sharer\.php.*#fbpshr/)) {
	  if(window.location.href.match(/\.facebook\.com.*\/sharer?\.php.*(\/fluffbustingpurity|#fbpshr)/)) {
	    fbpsharer();
	  }
	  if(fbpoptsobj.offlinefriends)
	    offtext="";
	  if(fbpoptsobj.offlinemobilefriends)
	    offtext = "Mobile";
	  if(debug)
	    console.log("offtext= " + offtext);
	  if(fbpoptsobj.offlinefriends || fbpoptsobj.offlinemobilefriends)
	    var offlinefriendscleanerid=window.setInterval(offlinefriendscleaner,4000);

	  if(fbpoptsobj.rcbirthdays) {
        window.setTimeout(nixreminders,5000);
	    window.setTimeout(nixreminders,10000); // catch late page load
	  }

	  window.setTimeout(addblockapplinktoapppage,6000); // needed to make the delay longer, because we are starting the script before the dom has loaded
	  window.setTimeout(labelnewsfeed,2000);
	  //if(!fbpoptsobj.newsfeed) // should we be clicking more stories if we have the hide newsfeeed option ticked?
	    //window.setTimeout(clickmorestoriesbutt,3000);
	  window.setTimeout(addunreadstorieslink,2500);
	  
	  if(fbpoptsobj.seemoreexplore) {
	    window.setTimeout(function(){
		  clickseemore("explore")
	    },2000);
	  }

	  if(fbpoptsobj.seemoreshortcuts){
	    window.setTimeout(function(){
		  clickseemore('shortcuts');
	    },2000);
	  }
	
	  if(window.location.href.match(/\/dialog\/oauth/) || window.location.href.match(/dialog\/permissions\.request/) || window.location.href.match(/\/connect\/uiserver\.php\?/) || window.location.href.match(/\/dialog\/plugin\.perms/))
        window.setTimeout(addblockbuttontopermreq,4000);

	  if(window.location.href.match(/\/ads\/preferences/)) {
		window.setTimeout(addclearadprefsbutt,3000);
      }
	  
	  if(document.location.href.match(/facebook\.com\/(fluffbustingpurity|WhoUnfriendedYou|hidepeopleyoumayknow|getridofsuggestedposts|hidetrendingtopics|hidepoliticsfromthenewsfeed|sortbymostrecent)/))
        window.setTimeout(initInviteAllToLikePage,3000);

	  // add show live user grid link
      if(window.location.href.match(/facebook.com\/livemap/) || window.location.href.match(/facebook.com\/live\/?(#@)?/)){ // || window.location.href.match(/facebook.com\/live\/?/)
        addlivegridlink();
      }

	  if(fbpoptsobj.tagsuggestions)
        window.setTimeout(enabletagforfriendlists,3000);
		
      if(fbpoptsobj.topnavbarlogout)
	    window.setTimeout(addtopnavbarlogoutbutt,3000); // was 6000
	  
	  if(fbpoptsobj.sortmostrecent)
		window.setTimeout(function() {if(document.querySelector('div._4-u2.mvm._495i')) document.querySelector('div._4-u2.mvm._495i').setAttribute('title','Viewing Most Recent'); },5000);
		
	  if(window.location.href.match(/settings\?tab=videos/) && (typeof(window.localStorage.turnOffAutoplay)!='undefined')) {
		window.setTimeout(function(){
	    document.querySelector('form[action="/settings/video/autoplay/"]').querySelector('a').click();
	    window.setTimeout(function(){document.querySelectorAll('._54nh')[2].click();
		  window.localStorage.removeItem('turnOffAutoplay');
		  var tmpdiv=document.createElement('div');
		  tmpdiv.innerHTML='FB Purity has turned off Video Autoplay for you! :)';
		  tmpdiv.setAttribute('style','text-align:center;padding:3px;border:1px solid black;color:red;font-size:20px;margin-top:40px;font-weight:bold');
		  if(document.querySelector('input[name="autoplay_setting"]') && document.querySelector('input[name="autoplay_setting"]').value=="off")
  		    document.getElementById('SettingsPage_Content').appendChild(tmpdiv);
		  tmpdiv=null;
		},600);},500);
	  }
	 }
  }, 500);

  if(document.getElementById('pagelet_home_stream') || document.getElementById('pagelet_litestand_section') || document.getElementById('stream_pagelet'))  { // || document.getElementById('pagelet_group_mall') || document.getElementById('timelineNavContent') // || (document.getElementById('hashtag_permalink_feed'))
    fbpurify();
    //if(window.location.href.match(/\/lists\//))
      //window.setTimeout(cleartheshizzle,4000); // deal with list type pages
	window.setTimeout(fixsortorder,5500);
  }
  else {
    var waitfordom=window.setInterval(function(){
      if(document.getElementById('pagelet_home_stream') || document.getElementById('pagelet_litestand_section') || document.getElementById('stream_pagelet')) {  // || document.getElementById('pagelet_group_mall') || document.getElementById('timelineNavContent') // || (document.getElementById('hashtag_permalink_feed'))
        window.clearInterval(waitfordom);
        fbpurify();
		//if(window.location.href.match(/\/lists\//)) /pages/feed  feed/friends/
          //window.setTimeout(cleartheshizzle,4000); // deal with list type pages
		window.setTimeout(fixsortorder,5500);
      }
    }, 500);
  }

  if(window.location.href.match(/photo.php\?|\/photos\//)){    
	window.setTimeout(addsetbackgroundimagelink,3000);
  }

  // moved this out from the fbpurify function so it should run on every page.
  document.addEventListener("DOMNodeInserted", fbpInsertedNodeDomHandler, false);

} // end finalstage function;

fbpgetprefs();

function addtopnavbarlogoutbutt(){
  if(debug)
    console.log('addtopnavbarlogoutbutt');
   if(document.getElementById('logout_form2')) // logout button has already been added, must be another version of fbp running?
     return;
   var newlogoutbutt, subbutt, logoutli;
   if(document.getElementById('pageLoginAnchor')) {
	//console.log('found page login anchor');
	document.getElementById('pageLoginAnchor').href='javascript:;';
    document.getElementById('pageLoginAnchor').click(); // open menu
	document.getElementById('pageLoginAnchor').click(); // close menu

	if(!document.querySelector('div.uiContextualLayerPositioner[data-ownerid="pageLoginAnchor"]')) {
	  console.log('couldnt find fb settings menu anchor');
	  window.setTimeout(addtopnavbarlogoutbutt,25000);
	  return;
	}
	//document.getElementById('pageLoginAnchor').click(); // close menu

	var waitforlobcount=0;
	var waitforlob=window.setInterval(function(){
	  if (waitforlobcount<=15) {
	    waitforlobcount+=1;
		if(debug)
		  console.log("logoutbutton check count=" +waitforlobcount);
        if(document.querySelector('form[action^="https://www.facebook.com/logout.php"]')) {
          newlogoutbutt=document.querySelector('form[action^="https://www.facebook.com/logout.php"]').cloneNode(true);
		  window.clearInterval(waitforlob);
	    }
	    else {
		  console.log('Logout button not found...');
		  return;
	    }
	    newlogoutbutt.setAttribute('style',"position:relative;top:4px;left:10px");
        newlogoutbutt.setAttribute('id','logout_form2');
	    logoutli=document.createElement('div');
	    logoutli.setAttribute('style',"position:relative;top:5px"); //float:right
	    logoutli.appendChild(newlogoutbutt);
	    var subbutt=document.createElement('input');
	    subbutt.setAttribute('type','submit');
	    subbutt.setAttribute('value','Log Out');
        subbutt.style.color='#FFF';
	    subbutt.style.textShadow='0 -1px rgba(0, 0, 0, .5)';
	    subbutt.style.border="0";
	    subbutt.style.backgroundColor="transparent";
	    newlogoutbutt.appendChild(subbutt);
	    if(document.querySelector('#blueBarDOMInspector ul[role="navigation"]')) {
		  var logoutinpoint=document.querySelector('#blueBarDOMInspector ul[role="navigation"]').firstChild;
		  logoutli.setAttribute('style',"float:right");
	      //console.log(logoutinpoint.outerHTML);
          logoutinpoint.parentNode.insertBefore(logoutli, logoutinpoint);
	    }
		else if(document.querySelector('#blueBarDOMInspector div[role="navigation"]')) {
		  var logoutinpoint=document.querySelector('#blueBarDOMInspector div[role="navigation"]');
		  logoutli.setAttribute('style',"position:relative;top:7px");
	      //console.log(logoutinpoint.outerHTML);
          //logoutinpoint.parentNode.insertBefore(logoutli, logoutinpoint);
		  logoutinpoint.appendChild(logoutli);
	    }
		else 
		  console.log('didnt find the navigation bar div, so couldnt insert logout button');
     }
	 else
	   window.clearInterval(waitforlob);
    }, 1000);
  }
  else {
    console.log('didnt find the logout link');
  }
}

function clickmorestoriesbutt(){ // can probably remove this function now, as its obsolete / not working anymore
  return; // short circuiting function, because it was causing unrelated buttons to be clicked
  if(debug)
    console.log('more stories button clicked');
    // if we are on a photo theatre page, maybe don't click the more button, as that could trigger a page reload
  if(document.querySelector('div[id^="more_pager_pagelet_"] a[role="button"]:not([href*="find-friends"]):not([href*="type=friendlist"]):not([href*="/pages/"]):not([aria-haspopup="true"]):not(.UFILikeLink)'))
    try{
	  //document.querySelector('div[id^="more_pager_pagelet_"] a[role="button"]:not([href*="find-friends"])').click();
	  //if(window.location.hash.length)
		 //document.querySelector('div[id^="more_pager_pagelet_"] a[role="button"]:not([href*="find-friends"]):not([href*="type=friendlist"]):not([href*="/pages/"])').href=window.location.hash;
      document.querySelector('div[id^="more_pager_pagelet_"] a[role="button"]:not([href*="find-friends"]):not([href*="type=friendlist"]):not([href*="/pages/"]):not([aria-haspopup="true"]):not(.UFILikeLink)').href="javascript:;";	 
	  document.querySelector('div[id^="more_pager_pagelet_"] a[role="button"]:not([href*="find-friends"]):not([href*="type=friendlist"]):not([href*="/pages/"]):not([aria-haspopup="true"]):not(.UFILikeLink)').click();
	}
	catch(e) {
	  console.log('Autoclick "more stories" button didnt work, probably because its an old browser or safari');
	}
}

function doc_keyUp(e) {
  //console.dir(e.target);
  //console.log(e.which);
  if(fbpoptsobj.tagsuggestions) {
    //if(!window.location.href.match(/facebook\.com\/settings/)) {
    if (e.which==64) { // (e.keyCode==192) && e.shiftKey) {
      if( e.target.className.match(/mentionsTextarea/) || (e.target.offsetParent && e.target.offsetParent.className.match(/uiPlacesTypeahead/)) || (e.target.getAttribute('contenteditable')=='true') ) {
        //temporarily disable auto tag suggestions if @ key is typed
	    document.getElementsByTagName('html')[0].className=document.getElementsByTagName('html')[0].className.replace(/fbpstopautotags/,'');
	    window.setTimeout(function(){if(!document.getElementsByTagName('html')[0].className.match(/fbpstopautotags/)) document.getElementsByTagName('html')[0].className=document.getElementsByTagName('html')[0].className + ' fbpstopautotags';},20000);
	  }
    }
	if((e.target.nodeName=='INPUT') &&  (e.target.type=='text') ) { // action tag box // ||e.target.placeholder && e.target.placeholder.match(/What are you doing?|Group name|Friend\'s name/)
	  document.getElementsByTagName('html')[0].className=document.getElementsByTagName('html')[0].className.replace(/fbpstopautotags/,'');
	  window.setTimeout(function(){if(!document.getElementsByTagName('html')[0].className.match(/fbpstopautotags/)) document.getElementsByTagName('html')[0].className=document.getElementsByTagName('html')[0].className + ' fbpstopautotags';},20000);
	}
    //}
  }
  
  if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || (e.target.getAttribute('contenteditable')=='true') || e.ctrlKey || e.altKey || e.metaKey) { return; }
  if(debug)
    console.log('keydown handler='+ e.keyCode + " : "  + e.which); 
  switch(e.which)//e.keyCode
  {
  case 114: //r
    console.log('R key pressed :- FBP Triggering Newsfeed Chronological Sort');
	document.removeEventListener("DOMNodeInserted", fbpInsertedNodeDomHandler);
    chronoSortStream();
	document.addEventListener("DOMNodeInserted", fbpInsertedNodeDomHandler, false);
    break;
  case 102: //f
    console.log('F key pressed :- FBP Will Display the previous Deleted Friends Alert, if one is available.');
	  dspdeletedfriendalert();
	break;
  /*case 101: //e 
    console.log('E key pressed :- FBP Will Expand/Contract the newsfeed column.');
	fbpexpandnewscoltoggle();
	break; */
  case 122: //z 
    console.log('Z key pressed :- FBP Will Hide all comments onscreen that consist of just tags.'); // images/emoticons
	clearBlankComments();
    break;
	
	
  /*
  case 116: // t	// testing new debug function
  //////////////////////////
    var httpx = new window.XMLHttpRequest();
    httpx.open("GET", window.location.href, true);
    // set a callback function
    httpx.onreadystatechange = function() {
      if(httpx.readyState == 4 && httpx.status == 200) {
	    if(httpx.responseText!="") {  		  
		  //console.log(httpx.responseText);
		  chrome.runtime.sendMessage({method: "debug2gist", key: "debug2gist", value: httpx.responseText}, function(response) {;})
	    }
	    httpx=null;
	  }
    }
    httpx.send();
    /////////////
	//chrome.runtime.sendMessage({method: "debug2gist", key: "debug2gist", value: document.documentElement.outerHTML}, function(response) {
      //;console.log(response.data);
    //})
	break;
  */
  
  
  /*case 116: //t
    console.log('T key pressed :- FBP Will Scroll you to the top of the page.');
	window.scroll(0,0);
	break;*/
  /*case 32: //space to click "more stories" button or default to facebook's page down
    console.log('Space pressed');
	clickmorestoriesbutt();
    break;*/
  default:
    break;
  }
}
document.addEventListener('keypress', doc_keyUp, false);

/*
function locationHashChanged() {
    console.log('%c HASH CHANGE! ', 'background: #222; color: red',
            'more text');
	console.trace();
}
window.onhashchange = locationHashChanged;
*/

})();