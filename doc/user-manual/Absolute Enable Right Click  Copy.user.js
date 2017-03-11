// ==UserScript==
// @name         Absolute Enable Right Click & Copy
// @namespace    Absolute Right Click
// @description  Force Enable Right Click & Copy & Highlight
// @shortcutKeys [Ctrl + Alt] Activate Absolute Right Click Mod To Force Remove Any Type Of Protection
// @author       Absolute
// @version      1.3.4
// @include      *
// @icon         https://cdn3.iconfinder.com/data/icons/communication-130/63/cursor-128.png
// @license      BSD
// @copyright    Absolute, All Right Reserved (2016)
// @grant        GM_addStyle
// @Exclude      /.*(www.google.[^]|bing.com|youtube.com|box.com|facebook.com|pixiv.net).*/

// ==/UserScript==

     var Sites_List =  ['163.com','www.site.com'];

    (function GetSelection () {
 		var Style  = document.createElement('style');
		Style.type = 'text/css';
 		var TextNode = '*{user-select:text!important;-webkit-user-select:text!important;}';
      	if (Style.styleSheet) { Style.styleSheet.cssText = TextNode; }
 		else { Style.appendChild(document.createTextNode(TextNode)); }
  		document.getElementsByTagName('head')[0].appendChild(Style);
        })();

    (function SetEvents () {
        var events = ['copy','cut','paste','select','selectstart'];
        for (var i = 0; i < events.length; i++)
		document.addEventListener(events[i],function(e){e.stopPropagation();},true);
        })();

    (function RestoreEvents () {
		var n = null;
		var d = document;
		var b = document.body;
		SetEvents = [d.oncontextmenu=n,d.onselectstart=n,d.ondragstart=n,d.onmousedown=n];
		GetEvents = [b.oncontextmenu=n,b.onselectstart=n,b.ondragstart=n,b.onmousedown=n,b.oncut=n,b.oncopy=n,b.onpaste=n];
	    })();

    (function RightClickButton () {
        function EventsCall (callback) {
        this.events = ['DOMAttrModified','DOMNodeInserted','DOMNodeRemoved','DOMCharacterDataModified','DOMSubtreeModified'];
        this.bind();
		}
    EventsCall.prototype.bind = function () {
        this.events.forEach(function (event) {
        document.addEventListener(event, this, true);
		}.bind(this));
        };
    EventsCall.prototype.handleEvent = function () {
        this.isCalled = true;
        };
    EventsCall.prototype.unbind = function () {
        this.events.forEach(function (event) {
        }.bind(this));
        };
    function EventHandler (event) {
        this.event = event;
        this.contextmenuEvent = this.createEvent(this.event.type);
        }
    EventHandler.prototype.createEvent = function (type) {
		var target = this.event.target;
		var event = target.ownerDocument.createEvent('MouseEvents');
		event.initMouseEvent(type, this.event.bubbles, this.event.cancelable,
        target.ownerDocument.defaultView, this.event.detail,
   	    this.event.screenX, this.event.screenY, this.event.clientX, this.event.clientY,
        this.event.ctrlKey, this.event.altKey, this.event.shiftKey, this.event.metaKey,
        this.event.button, this.event.relatedTarget);
		return event;
        };
    EventHandler.prototype.fire = function () {
        var target = this.event.target;
        var contextmenuHandler = function (event) {
        event.preventDefault();
        }.bind(this);
        target.dispatchEvent(this.contextmenuEvent);
        this.isCanceled = this.contextmenuEvent.defaultPrevented;
        };
        window.addEventListener('contextmenu', handleEvent, true);
    function handleEvent (event) {
		event.stopPropagation();
        event.stopImmediatePropagation();
        var handler = new EventHandler(event);
		window.removeEventListener(event.type, handleEvent, true);
    var EventsCallBback = new EventsCall(function () {
		});
        handler.fire();
        window.addEventListener(event.type, handleEvent, true);
        if (handler.isCanceled && (EventsCallBback.isCalled))
        event.preventDefault();
	    }})();

    (function IncludesSites () {
		var Check = window.location.href;
		var Match = RegExp(Sites_List.join('|')).exec(Check);
		if (Match) { Absolute_Mod(); }
        })();

    function KeyPress (e) {
		if (e.altKey && e.ctrlKey) {
		if (confirm("Activate Absolute Right Click Mode!") === true)
        Absolute_Mod();
		}}
	    document.addEventListener("keydown", KeyPress);

    function Absolute_Mod () {
		var events = ['contextmenu','copy','cut','paste','mouseup','mousedown','keyup','keydown','drag','dragstart','select','selectstart'];
		for (var i = 0; i < events.length; i++) {
		document.addEventListener(events[i],function(e){e.stopPropagation();},true);
		}}



