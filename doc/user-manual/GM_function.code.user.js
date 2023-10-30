// ==UserScript==
// @run-at           document-start
// @name             GM_function
// @description      Emulate the Greasemonkey GM_* functions for other browsers.
// @version          11.0
// @author           noname
// @namespace        GM_function.js
// @include          http://*
// @include          https://*
// @license          MIT
// ==/UserScript==

GM_info = {};

(function () {
	// Settings, can be changed
	var enable_GM_registerMenuCommand = false,
	override_GM_registerMenuCommand = false,
	show_global_config_menu_item = false,
	enable_opera_scriptStorage = true,
	use_alert_as_fallback = true;

	// Internal variables, do not change
	var version = "2.0";
	var unique_script_name = "greasemonkey_emulation";

	var opera_obj = window.opera,
	hostname = location.hostname;
	//var rnd = ( Math.floor(Math.random() * 100) + 1 );
	var chrome = (navigator.userAgent.indexOf("Chrome") != -1),
	midori = (navigator.userAgent.indexOf("Midori") != -1);
	var unsfw = null,
	storage = null,
	storage_used = false,
	cross_domain_values = false,
	opera_script_storage_active = false;
	if (opera_obj && enable_opera_scriptStorage) // http://www.opera.com/docs/userjs/specs/#scriptstorage
	{
		try {
			storage = opera_obj.scriptStorage;
			opera_script_storage_active = true;
		} catch (e) {}
	}
	if (!storage) {
		opera_script_storage_active = false;

		if (window.localStorage) {
			storage = localStorage;
			if (opera_obj)
				opera_obj.postError("Go on \"opera:config#PersistentStorage|UserJSStorageQuota\" and set a quota different from 0 like for example 5120 to enable window.opera.scriptStorage");
		} else if (window.globalStorage)
			storage = globalStorage[hostname];
	}
	if ((typeof unsafeWindow) != "undefined")
		unsfw = unsafeWindow;
	else {
		unsfw = window;
		unsafeWindow = unsfw;
	}

	var base_obj,
	userscripts;
	var default_toString = function () {
		return undefined;
	};
	if (opera_obj)
		base_obj = opera_obj;
	else
		base_obj = window;

	if ((typeof base_obj.userscripts) == "undefined") {
		userscripts = new Object();
		userscripts.toString = default_toString;
		base_obj.userscripts = userscripts;
		if (!opera_obj && !unsfw.userscripts)
			unsfw.userscripts = userscripts;
	} else
		userscripts = base_obj.userscripts;

	if (userscripts.GME) {
		userscripts.GME.GM_log("Double execution. Browser bug!!!");
		return;
	}
	// https://bugs.launchpad.net/midori/+bug/707166

	userscripts.GME = new Object();
	var gm_extensions = userscripts.GME;

	if ((typeof GM_log) != "undefined") // Firefox
		gm_extensions.GM_log = GM_log;
	else {
		var opera_postError = null,
		pro_log_present = false,
		console_enabled = false;
		if (opera_obj)
			opera_postError = opera_obj.postError;
		else if ((typeof PRO_log) != "undefined")
			pro_log_present = true;
		else if ((typeof console) == "object")
			console_enabled = true;

		gm_extensions.GM_log = function (message, displayed_script_name) {
			if (displayed_script_name != undefined)
				message = displayed_script_name + ":\n" + message;

			if (opera_postError) // Opera
				opera_postError(message);
			else if (pro_log_present) // Internet Explorer
				PRO_log(message);
			else if (console_enabled) // Google Chrome - Midori
				try {
					console.log(message);
				} catch (e) {
					if (use_alert_as_fallback)
						alert(message);
				}
			else if (use_alert_as_fallback) // Fallback to an alert if other methods fail
				alert(message);
		};
	}

	var native_getsetvalues_functions = false,
	is_GM_deleteValue_bultin = false,
	is_GM_listValues_bultin = false;
	gm_extensions.GM_deleteValue = function (name, unique_script_name) {
		if (!name)
			return false;
		if (gm_extensions.GM_getValue(name, undefined, unique_script_name) === undefined)
			return;
		gm_extensions.GM_setValue(name, "", unique_script_name);
		try {
			gm_extensions.GM_setValue(name, undefined, unique_script_name);
		} catch (e) {}
	};
	gm_extensions.GM_listValues = function () {
		var list = [];
		for (var i = 0, len = localStorage.length; i < len; i++) {
			list.push(localStorage.key(i));
		}
		return list;
	};
	//function() { return []; }; // Dummy
	var get_full_name = function (name, unique_script_name) // unique_script_name is optional but recommended
	{
		if (unique_script_name != undefined)
			return "UserJS_" + unique_script_name + "_" + name;
		else
			return "UserJS__" + name;
	};
	if ((typeof GM_setValue) != "undefined" && GM_setValue.toString().indexOf("not supported") == -1) // Firefox
	{
		cross_domain_values = true;
		native_getsetvalues_functions = true;
		var _GM_getValue = GM_getValue,
		_GM_setValue = GM_setValue,
		_GM_deleteValue = null,
		_GM_listValues = null;
		gm_extensions.GM_getValue = function (name, default_value, unique_script_name) {
			if (!name)
				return;
			return _GM_getValue(get_full_name(name, unique_script_name), default_value);
		};
		gm_extensions.GM_setValue = function (name, value, unique_script_name) {
			if (!name)
				return false;
			_GM_setValue(get_full_name(name, unique_script_name), value);
		};
		if ((typeof GM_deleteValue) != "undefined") {
			is_GM_deleteValue_bultin = true;
			_GM_deleteValue = GM_deleteValue;
			gm_extensions.GM_deleteValue = function (name, unique_script_name) {
				if (!name)
					return false;
				_GM_deleteValue(get_full_name(name, unique_script_name));
			};
		}
		if ((typeof GM_listValues) != "undefined") {
			is_GM_listValues_bultin = true;
			_GM_listValues = GM_listValues;
			gm_extensions.GM_listValues = _GM_listValues; // ToDO
		}
	} else {
		var get_recoverable_string = function (value) {
			var type = (typeof value);
			if (type == "boolean")
				return "" + value;
			if (type == "number") {
				if (isNaN(value))
					return "Number.NaN";
				if (value == Number.POSITIVE_INFINITY)
					return "Number.POSITIVE_INFINITY";
				if (value == Number.NEGATIVE_INFINITY)
					return "Number.NEGATIVE_INFINITY";
				return "" + value;
			}
			if (type == "string") {
				var tmp = escape(value);
				if (value == tmp)
					return "'" + value + "'";
				return "unescape('" + tmp + "')";
			}
			if (type == "null" || (type == "object" && value == null))
				return "null";
			if (type == "date")
				return "new Date(" + value.getTime() + ")";

			alert("Unsupported value in GM_set: " + value);
			return "{error: 'Unsupported value.'}";
		};

		if ((typeof PRO_setValue) != "undefined") // Internet Explorer
		{
			cross_domain_values = true;
			gm_extensions.GM_getValue = function (name, default_value, unique_script_name) {
				if (!name)
					return;
				var value = PRO_getValue(get_full_name(name, unique_script_name), default_value);
				if (value == default_value)
					return default_value;

				try {
					eval("value = " + unescape(value));
				} catch (e) {
					return default_value;
				}

				// If the value is equal to default, delete it so it won't waste space
				if (value == default_value)
					gm_extensions.GM_deleteValue(name, unique_script_name);

				return value;
			};
			gm_extensions.GM_setValue = function (name, value, unique_script_name) {
				if (!name)
					return false;
				PRO_setValue(get_full_name(name, unique_script_name), escape(get_recoverable_string(value)));
			};
			gm_extensions.GM_deleteValue = function (name, unique_script_name) {
				if (!name)
					return false;
				if ((typeof PRO_deleteValue) != "undefined")
					PRO_deleteValue(get_full_name(name, unique_script_name));
				else
					PRO_setValue(get_full_name(name, unique_script_name), "");
			};
			if ((typeof PRO_listValues) != "undefined")
				gm_extensions.GM_listValues = PRO_listValues; // ToDO
		} else if (storage) {
			storage_used = true;
			if (opera_script_storage_active)
				cross_domain_values = true;
			gm_extensions.GM_getValue = function (name, default_value, unique_script_name) {
				if (!name)
					return;
				var value = storage.getItem(get_full_name(name, unique_script_name));
				if (value == null)
					return default_value;

				try {
					eval("value = " + unescape(value));
				} catch (e) {
					return default_value;
				}

				// If the value is equal to default, delete it so it won't waste space
				if (value == default_value)
					gm_extensions.GM_deleteValue(name, unique_script_name);

				return value;
			};
			gm_extensions.GM_setValue = function (name, value, unique_script_name) {
				if (!name)
					return false;
				storage.setItem(get_full_name(name, unique_script_name), escape(get_recoverable_string(value)));
			};
			gm_extensions.GM_deleteValue = function (name, unique_script_name) {
				if (!name)
					return false;
				storage.removeItem(get_full_name(name, unique_script_name));
			};
			gm_extensions.GM_listValues = function (unique_script_name) {
				var list = [],
				count = 0,
				storage_length = storage.length,
				search = null,
				skip_length = 0;
				if (storage_length == undefined)
					return [];

				if (unique_script_name != undefined)
					search = "UserJS_" + unique_script_name + "_";
				else {
					search = "UserJS__";
					gm_extensions.GM_log("You should avoid using GM_listValues without unique_script_name.");
				}
				skip_length = search.length;

				for (var i = 0; i < storage_length; i++) {
					name = storage.key(i);
					if (name.indexOf(search) == 0) {
						list[count] = name.substring(skip_length);
						count++;
					}
				}

				return list;
			};
		}
		/*else if(window.google && google.gears){ google.gears.factory.create('beta.database'); }*/
		else {
			gm_extensions.GM_getValue = function (name, default_value, unique_script_name) {
				if (!name)
					return;
				var full_name = escape(get_full_name(name, unique_script_name));
				var cookies = document.cookie.split("; ");
				var cookies_length = cookies.length,
				one_cookie;
				for (var i = 0; i < cookies_length; i++) {
					one_cookie = cookies[i].split("=");
					if (one_cookie[0] == full_name) {
						var value;
						try {
							eval("value = " + unescape(one_cookie[1]));
						} catch (e) {
							return default_value;
						}

						// If the value is equal to default, delete it so it won't waste space
						if (value == default_value)
							gm_extensions.GM_deleteValue(name, unique_script_name);

						return value;
					}
				}
				return default_value;
			};
			var life_time = 157680000000; // 31536000 * 5 * 1000
			gm_extensions.GM_setValue = function (name, value, unique_script_name, action) {
				if (!name)
					return false;
				if (action == "delete")
					action = -10;
				else
					action = life_time;
				document.cookie = escape(get_full_name(name, unique_script_name)) + "=" + escape(get_recoverable_string(value)) + ";expires=" + (new Date((new Date()).getTime() + action)).toGMTString() + ";path=/";
			};
			gm_extensions.GM_deleteValue = function (name, unique_script_name) {
				return gm_extensions.GM_setValue(name, "", unique_script_name, "delete");
			};
			gm_extensions.GM_listValues = function () {
				return [];
			}; // ToDO
		}
	}
	gm_extensions.GM_areStoredValuesCrossDomain = function () {
		return cross_domain_values;
	};

	if ((typeof GM_addStyle) != "undefined") // Firefox
		gm_extensions.GM_addStyle = GM_addStyle;
	else if ((typeof PRO_addStyle) != "undefined") // Internet Explorer
		gm_extensions.GM_addStyle = PRO_addStyle;
	else {
		gm_extensions.GM_addStyle = function (css_string) {
			var head = document.getElementsByTagName("head"),
			stylesheet = document.createElement("style");
			stylesheet.type = "text/css";
			stylesheet.appendChild(document.createTextNode(css_string));
			if (head)
				head[0].appendChild(stylesheet);
			else
				document.documentElement.insertBefore(stylesheet, document.documentElement.firstChild);
		};
	}

	gm_extensions.GM_renameMenuCommand = function () {}; // Dummy
	if ((typeof GM_registerMenuCommand) != "undefined" && GM_registerMenuCommand.toString().indexOf("not supported") == -1 && !override_GM_registerMenuCommand) // Firefox
		gm_extensions.GM_registerMenuCommand = GM_registerMenuCommand;
	else if ((typeof PRO_registerMenuCommand) != "undefined" && !override_GM_registerMenuCommand) // Internet Explorer
		gm_extensions.GM_registerMenuCommand = PRO_registerMenuCommand;
	else if (!enable_GM_registerMenuCommand)
		gm_extensions.GM_registerMenuCommand = function () {}; // Dummy
	else {
		gm_extensions.GM_registerMenuCommand = function (caption, command_func, access_key) {
			if (arguments.length === 5) {
				// GM 0.9.1 & earlier - http://wiki.greasespot.net/GM_registerMenuCommand
				access_key = arguments[4];
			}
			gm_menu.add_item(caption, command_func, access_key);
		};
		gm_extensions.GM_renameMenuCommand = function (old_caption, new_caption, new_access_key) {
			var gm_menu_list = document.getElementById("gme_menu"),
			matching_menu_item,
			re = new RegExp("^" + old_caption + "(\\s\\(.\\))?$", "i");

			// find menu item with old_caption
			for (var i = 0, len = gm_menu_list.childNodes.length; i < len; i++) {
				var this_caption = gm_menu_list.childNodes[i].textContent || gm_menu_list.childNodes[i].innerText;
				if (re.test(this_caption)) {
					matching_menu_item = gm_menu_list.childNodes[i];
					break;
				}
			}
			if (matching_menu_item) {
				gm_menu.add_access_key(matching_menu_item, new_caption, new_access_key, i);
				return true;
			} else {
				gm_extensions.GM_log('caption: "' + old_caption + '" not found in GM_renameMenuCommand.');
				return false;
			}
		};

		var gm_menu = {};
		gm_menu.add_access_key = function (obj, menu_text, access_char, skip) {
			var menu_updated = false;
			if ((typeof access_char == "string") && (access_char.length > 0)) {
				access_char = access_char.substr(0, 1).toUpperCase();
				var gm_menu_list = obj.parentNode,
				keycode = access_char.charCodeAt(0),
				keycode_in_use = false,
				menu_label = menu_text;

				// see if another menu item uses the same keycode
				for (var i = 0, len = gm_menu_list.childNodes.length; i < len; i++) {
					if ((i !== skip) &&
						(gm_menu_list.childNodes[i].getAttribute("accesskeycode") == keycode)) {
						keycode_in_use = true;
						break;
					}
				}

				if (!keycode_in_use) {
					var reg_exp = new RegExp("(" + access_char + ")", "i");
					menu_label = menu_text.replace(reg_exp, "<u>$1</u>");
					if (menu_label == menu_text) {
						menu_label += " (<u>" + access_char + "</u>)";
					}
					obj.innerHTML = menu_label;
					obj.setAttribute("accesskeycode", keycode);
					menu_updated = true;
				}
			}
			if (!menu_updated) {
				obj.innerHTML = menu_text;
				obj.removeAttribute("accesskeycode");
			}
		};

		var node_contains = function (outer, innie) {
			if (outer.contains) {
				return outer.contains(innie); // a node is considered to contain itself
			} else if (outer.compareDocumentPosition) {
				var bitmask = outer.compareDocumentPosition(innie);
				return ((bitmask === 0) || // innie "is equal to" outer
					!!(bitmask & 16)); // innie "is contained by" outer
			}
			return false; // unknown
		};
		gm_menu.create = function () {
			gm_menu.icon = document.getElementById("gme_menu_icon");
			if (gm_menu.icon)
				return; // another extension has already created the menu

			var menu_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALHRFWHRDcmVhdGlvbiBUaW1lAFN1biAzMCBNYXIgMjAwOCAxNzoyMjo0NyAtMDUwMNSe+EoAAAAHdElNRQfYBAYRMSwLM2/oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGPC/xhBQAAAtBJREFUeNpdU11IU3EU/93tTje1vJujzS1xZVNnhdeMStG8ha/VDYKUICYk9RLYW1FBIERv0atFTSgqCllPvRiaDyp9qFPLsTQ12nB96Fzuy3117nVL24HD/3DO+f3u/57z+zNWqxWJRAKpVEr2ZDIpe9Yu2fy1dAhzyxCW1sBPhQy7sjW/3w82GAwi1whUTkcXufgrDMvsMhBLyKVbub0swzD/JS5WL93NgCEBvRn+YjVg1UHQ/PDbIwnw7qhxVSbIAY/TwXMlWrgXV8AqgAodwKk36vMBCAQWsmDJmJtHcQoM7NI9bHV7RdHeBnVBISZGPsL56AnEjnPgG+oRDYfgdDzDzPgnZ1pCpuHoHsIrNqXSOHbX2LhvU2OQwYXbAEUe+OYWcDtMsFRZqTlJeZbq7XBP3BDL9x/A188zAhDRskarjdOXlkIRq6CmIgLnw/H+HbDOwt4iwDH6Vp6gvemwTG6prICO+sNxcHgzBgVUGoRWAzCWmemHVESgQu/IPK70vACUGvQOeyjuo1qeXJP64rEoJJxkikmXe0EKOD1Ni6GpMSwGXw8isBgggoLNWKGkmpL6SmRgFqc0qCIBZeineLazHWyeRv6KRVcKsakJfE0lLJweYmM9+KoymkUceoMWz3sew/P9Txet2cUe2gknp9VArVHj3sN+HG+shf1EszwLJCOwn6Q4uY7paQ8Ghidx+XwjVKkoXGFTL+Db0EHg9wqtKQyxdR+6b/ch4V2BdXsR9LTbVdrZbDAEhZnDteun5XVuNcZkMqGz0jfANxwUxI62zLAkl7gV8sKRJh2n4uQx0sZT0siHwfse0zGfz/dPiV2UdNJNLEdam1FdR+8nLZWYDEES7nEXRvuHsOCZW8hKXb6B2WyWgwtWb7F/DVdJtmfyWezJfTQkhdlAFC8NRbjz4ItZlrLX690kyBolLXQYydVb0rR4LFHvQk4v/gIj/RRmaCXZ1wAAAABJRU5ErkJggg==';
			// http://webdesign.about.com/od/colorcharts/l/blsystemcolors.htm
			gm_extensions.GM_addStyle(
				"#gme_menu_icon { z-index:900000;" +
				"  height:16px; width:16px; position:fixed; right:0; bottom:0;" +
				"  background-color:transparent; }" +

				"#gme_menu_icon { cursor:pointer; }" +
				"#gme_menu_icon.open, #gme_menu_icon.closed {" +
				"  background:url('" + menu_icon + "') no-repeat center center; }" +
				"#gme_menu_icon.open { background-color:Highlight; }" +
				"#gme_menu_icon.closed:hover { background-color:Highlight; }" +
				"#gme_menu_icon.open ul { display:block; }" +

				"#gme_menu { display:none; width:auto; padding:2px; margin:0; position:fixed;" +
				"  background-color:Menu; right:0; bottom:15px; border:1px solid ThreeDShadow;" +
				"  -moz-box-shadow:0px 2px 4px rgba(0,0,0,0.5);" +
				"  -webkit-box-shadow:0px 2px 4px rgba(0,0,0,0.5);" +
				"  box-shadow:0px 2px 4px rgba(0,0,0,0.5); }" +

				".gme_menu_item { background-color:Menu; color:MenuText;" +
				"  list-style-type:none; padding:0 10px; white-space:pre;" +
				"  font:11px sans-serif; text-align:left; }" +

				"#gme_menu li.hover { background-color:Highlight; color:HighlightText; }");

			gm_menu.icon = document.createElement("div");
			gm_menu.icon.id = "gme_menu_icon";

			var gm_menu_list = document.createElement("ul");
			gm_menu_list.id = "gme_menu";
			gm_menu.icon.appendChild(gm_menu_list);
			var doc_body = document.body || document.documentElement.lastChild || document.documentElement; // HTML.body || HTML.body || HTML
			doc_body.appendChild(gm_menu.icon);

			var is_open_query = function () {
				return (gm_menu.icon.className == "open");
			};
			var simulate_click = function (obj) {
				// the menu item may have been added by another invocation of this script
				// so when an access_key or enter is pressed, the only way to call the
				// command_func is to trigger the click event on the menu item.
				if (obj.dispatchEvent) {
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window,
						0, 0, 0, 0, 0, false, false, false, false, 0, null);
					obj.dispatchEvent(evt);
				} else if (obj.fireEvent) {
					obj.fireEvent("onclick");
				}
			};
			var window_mousedown_event = function (e) {
				if (!e)
					e = window.event;
				var targ = (e.target || e.srcElement);
				if (targ.nodeType == 3)
					targ = targ.parentNode; // Safari

				if (!node_contains(gm_menu.icon, targ)) {
					// not over menu
					if (is_open_query())
						gm_menu.close();
				} else //if (targ.className.indexOf("gme_menu_item") >= 0) {
					if (targ.nodeName == "LI") {
						// over a menu item - prevent text selection within menu
						if (e.preventDefault)
							e.preventDefault();
						e.returnValue = false;
					} else {
						// over some other part of the menu
						if (e.stopPropagation)
							e.stopPropagation();
						e.cancelBubble = true;
						if (is_open_query())
							gm_menu.close();
						else
							gm_menu.open();
					}
			};
			var window_blur_event = function () {
				if (is_open_query())
					gm_menu.close();
			};
			/*
			http://asquare.net/javascript/tests/KeyCode.html
			http://www.quirksmode.org/js/keys.html
			http://unixpapa.com/js/key.html
			 */
			var window_key_event = function (e) {
				// Note: In the keydown and keyup events you will get the keycode of the letters
				// always in uppercase
				// but in the keypress events you will get them in the same case the user typed them.
				if (!e)
					e = window.event;
				var keyCode = e.keyCode || e.which;
				if (keyCode == 0)
					return; // Unknown key

				if (is_open_query()) {
					// while the menu is open, prevent all keypresses from doing anything else
					if (e.preventDefault)
						e.preventDefault();
					e.returnValue = false;

					var gm_menu_list = document.getElementById("gme_menu"),
					numItems = gm_menu_list.childNodes.length,
					menu_item;
					if (keyCode == 38) { // up arrow
						// find which item is currently highlighted
						menu_item = gm_menu.highlighted_item_query();

						// un-highlight the item
						gm_menu.highlight_item(menu_item, false);

						// get the next item up
						if (menu_item && menu_item.previousSibling) {
							menu_item = menu_item.previousSibling;
						} else {
							menu_item = gm_menu_list.lastChild;
						}

						// highlight the new item
						gm_menu.highlight_item(menu_item, true);

					} else if (keyCode == 40) { // down arrow
						// find which item is currently highlighted
						menu_item = gm_menu.highlighted_item_query();

						// un-highlight the item
						gm_menu.highlight_item(menu_item, false);

						// get the next item down
						if (menu_item && menu_item.nextSibling) {
							menu_item = menu_item.nextSibling;
						} else {
							menu_item = gm_menu_list.firstChild;
						}

						// highlight the new item
						gm_menu.highlight_item(menu_item, true);

					} else if (keyCode == 27) { // esc
						gm_menu.close();
					} else if (keyCode == 13) { // enter
						menu_item = gm_menu.highlighted_item_query();
						gm_menu.close();
						simulate_click(menu_item);
					} else {
						// see if one of the menu items uses this keycode
						var menu_item_to_handle;
						for (var i = 0; i < numItems; i++) {
							if (gm_menu_list.childNodes[i].hasAttribute("accesskeycode") &&
								gm_menu_list.childNodes[i].getAttribute("accesskeycode") == keyCode) {
								menu_item_to_handle = gm_menu_list.childNodes[i];
								break;
							}
						}
						if (menu_item_to_handle) {
							gm_menu.highlight_item(gm_menu.highlighted_item_query(), false);
							gm_menu.highlight_item(menu_item_to_handle, true);
							window.setTimeout(function () {
								gm_menu.close();
								simulate_click(menu_item_to_handle);
							}, 100);
						}
					}
				} else { // menu is not open
					if ((keyCode == 220) && e.ctrlKey) { // ctrl+\
						gm_menu.open();
						if (e.preventDefault)
							e.preventDefault();
						else
							e.returnValue = false;
					}
				}
			};
			var prevent_selection = function (e) {
				if (!e)
					e = window.event;
				if (e.preventDefault)
					e.preventDefault();
				e.returnValue = false;
			};
			if (document.addEventListener) {
				document.addEventListener("mousedown", window_mousedown_event, false);
				document.addEventListener("keydown", window_key_event, false);
				window.addEventListener("blur", window_blur_event, false);
			} else {
				gm_menu.icon.attachEvent("onselectstart", gm_menu.prevent_selection);
				document.attachEvent("onmousedown", window_mousedown_event);
				document.attachEvent("onkeydown", window_key_event);
				window.attachEvent("onblur", window_blur_event);
			}
		};

		/*
		http://www.quirksmode.org/dom/events/index.html
		http://www.quirksmode.org/js/events_properties.html
		 */
		gm_menu.add_item = function (caption, command_func, access_key) {
			gm_menu.create();
			var gm_menu_list = document.getElementById("gme_menu"),
			gm_menu_item = document.createElement("li");
			gm_menu_item.innerHTML = caption;
			gm_menu_item.className = "gme_menu_item";
			gm_menu_list.appendChild(gm_menu_item);
			gm_menu.add_access_key(gm_menu_item, caption, access_key);

			var click_event = function (e) {
				if (!e)
					e = window.event;
				if (e.stopPropagation)
					e.stopPropagation();
				e.cancelBubble = true;

				gm_menu.close();
				if ("function" == typeof command_func)
					command_func();
			};
			var mouseover_event = function (e) {
				// find which item is currently highlighted (in case highlighted via keyboard)
				var item = gm_menu.highlighted_item_query();

				// un-highlight that item
				gm_menu.highlight_item(item, false);

				// highlight this item
				if (!e)
					e = window.event;
				var targ = (e.target || e.srcElement);
				if (targ.nodeType == 3)
					targ = targ.parentNode; // Safari
				if (targ.nodeName != "LI")
					targ = targ.parentNode; // underlined access_key
				gm_menu.highlight_item(targ, true);

			};
			var mouseout_event = function (e) {
				if (!e)
					e = window.event;
				var targ = (e.target || e.srcElement);
				if (targ.nodeType == 3)
					targ = targ.parentNode; // Safari
				if (targ.nodeName != "LI")
					targ = targ.parentNode; // underlined access_key
				gm_menu.highlight_item(targ, false);
			};

			if (document.addEventListener) {
				gm_menu_item.addEventListener("mouseover", mouseover_event, false);
				gm_menu_item.addEventListener("mouseout", mouseout_event, false);
				gm_menu_item.addEventListener("click", click_event, false);
			} else {
				gm_menu_item.attachEvent("onmouseenter", mouseover_event);
				gm_menu_item.attachEvent("onmouseleave", mouseout_event);
				gm_menu_item.attachEvent("onclick", click_event);
			}
		};
		gm_menu.close = function (e) {
			// find which item is currently highlighted
			var obj = gm_menu.highlighted_item_query();

			// close the menu
			var gm_menu_icon = document.getElementById("gme_menu_icon");
			if (gm_menu_icon) {
				gm_menu_icon.className = "closed";
			}

			// un-highlight the item
			gm_menu.highlight_item(obj, false);

			return obj;
		};
		gm_menu.open = function (e) {
			var gm_menu_icon = document.getElementById("gme_menu_icon");
			if (gm_menu_icon) {
				gm_menu_icon.className = "open";
			}
		};
		gm_menu.highlight_item = function (obj, state) {
			if (obj) {
				obj.className = (state ? "gme_menu_item hover" : "gme_menu_item");
			}
		};
		gm_menu.highlighted_item_query = function () {
			var gm_menu_list = document.getElementById("gme_menu");
			for (var i = 0, len = gm_menu_list.childNodes.length; i < len; i++) {
				if (gm_menu_list.childNodes[i].className.indexOf(" hover") > 0) {
					return gm_menu_list.childNodes[i];
				}
			}
		};
	}
	var GlobalConfiguration = function () {
		var global_variables = {
			"Script managment": [],
			"Unknown script": [],
			"Web page": []
		};
		var output = "";

		if (storage_used) {
			var storage_length = storage.length,
			name,
			value,
			pos;
			if (storage_length != undefined)
				for (var i = 0; i < storage_length; i++) {
					name = storage.key(i);
					value = storage.getItem(name);
					if (name.indexOf("UserJS_") != 0)
						global_variables["Web page"][(global_variables["Web page"].length)] = [name, value];
					else {
						name = name.substring(7);
						if (name.indexOf("Script_managment-") == 0)
							global_variables["Script managment"][(global_variables["Script managment"].length)] = [name.substring(17), value];
						else {
							pos = name.indexOf("_");
							if (pos == 0)
								global_variables["Unknown script"][(global_variables["Unknown script"].length)] = [name.substring(1), value];
							else {
								var temp = name.substring(0, pos);
								if (!global_variables[temp])
									global_variables[temp] = [];
								global_variables[temp][(global_variables[temp].length)] = [name.substring(pos + 1), value];
							}
						}
					}
				}

			output += "Cross-domain values => " + cross_domain_values + "<br>";
			output += "opera.scriptStorage active => " + opera_script_storage_active + "<br>";
			output += "window.localStorage => " + (!!window.localStorage) + "<br><br>";
			if (storage_length == undefined)
				output += "Warning: Missing length property in the storage array.<br><br>";
			var value,
			i,
			global_variables_script_length;
			for (var script_name in global_variables) {
				if (script_name == "Script managment")
					continue;
				for (i = 0, global_variables_script_length = global_variables[script_name].length; i < global_variables_script_length; i++) {
					if (script_name != "Web page")
						try {
							eval("value = " + unescape(global_variables[script_name][i][1]));
						} catch (e) {
							value = {
								error: "Failed."
							};
						}
					else
						value = global_variables[script_name][i][1];
					output += script_name + " => " + global_variables[script_name][i][0] + " = " + value + "<br>";
				}
				if (global_variables_script_length > 0)
					output += "<br>";
			}
			global_variables = null;
			document.write(output);
			output = null;
		} else
			alert("Not yet implemented.");
	};

	if (show_global_config_menu_item && storage_used) {
		// In Opera, this script runs at document-start, before the DOM is fully created.
		// Attempting to add the GM_menu to the DOM would fail.
		// This delays the menu creation until the DOM is loaded.
		if (opera_obj && document.addEventListener) {
			document.addEventListener("DOMContentLoaded", function () {
				gm_extensions.GM_registerMenuCommand("Global configuration", GlobalConfiguration, "G");
			}, false);
		} else {
			gm_extensions.GM_registerMenuCommand("Global configuration", GlobalConfiguration, "G");
		}
	}

	gm_extensions.unsafeWindow = unsfw;
	if (!window.wrappedJSObject)
		window.wrappedJSObject = unsfw;
	if (!window.content)
		window.content = window.top; // https://developer.mozilla.org/en/DOM/window.content
	if (!unsfw.content)
		unsfw.content = unsfw.top;
	if (!unsfw._content)
		unsfw._content = unsfw.content;

	if ((typeof GM_xmlhttpRequest) != "undefined") // Firefox
		gm_extensions.GM_xmlhttpRequest = GM_xmlhttpRequest;
	else {
		var error_text = "GM_xmlhttpRequest failed, URL: ";
		var cross_domain_note = "\nNote: Cross-domain GM_xmlhttpRequest is disabled, if you are using Opera you must install the \"Cross-domain XMLHttpRequest\" userscript to enable it.";
		var cross_domain_opera_xmlhttprequest = (opera_obj ? opera_obj.XMLHttpRequest : null);
		var iepro_xmlhttprequest_exist = ((typeof PRO_xmlhttpRequest) != "undefined" ? true : false);
		var is_cross_domain_http_request = function (url_req) {
			//gm_extensions.GM_log("is_cross_domain_http_request(" + url_req + ");");
			var pos = url_req.indexOf("://");
			if (url_req.substring(0, pos + 1) != location.protocol)
				return true;

			url_req = url_req.substring(pos + 3);
			pos = url_req.indexOf("/");
			if (pos != -1)
				url_req = url_req.substring(0, pos);
			if (url_req != location.host)
				return true;

			return false;
		};

		gm_extensions.GM_xmlhttpRequest = function (details) // http://www.w3.org/Protocols/HTTP/HTRESP.html
		{
			//gm_extensions.GM_log("XMLHttpRequest of: " + details.url);
			var xml_http = null,
			cross_domain_used = true,
			cross_domain_req = is_cross_domain_http_request(details.url);
			//gm_extensions.GM_log("cross_domain_req => " + cross_domain_req);

			if (cross_domain_req && cross_domain_opera_xmlhttprequest) // Opera (cross-domain requests only)
				xml_http = new cross_domain_opera_xmlhttprequest();
			else if (iepro_xmlhttprequest_exist) // Internet Explorer + IEPro
				xml_http = PRO_xmlhttpRequest();
			else {
				cross_domain_used = false;
				if (window.XMLHttpRequest) // The standard
					xml_http = new XMLHttpRequest();
				else if (window.createRequest) // IceBrowser
					xml_http = window.createRequest();
			}
			if (!xml_http) { // Simulate a real error
				if (details.onerror)
					details.onerror({
						responseText: "",
						readyState: 4,
						responseHeaders: "",
						status: 0,
						statusText: "GM_xmlhttpRequest failed (missing xml_http object)",
						finalUrl: details.url
					});
				else
					gm_extensions.GM_log("GM_xmlhttpRequest failed (missing xml_http object), URL: " + details.url);
				return;
			}

			xml_http.onreadystatechange = function () {
				var ready_state = xml_http.readyState;
				var status3or4 = (ready_state == 3 || ready_state == 4);
				var response = {
					responseText: (status3or4 ? xml_http.responseText : ""),
					readyState: ready_state,
					responseHeaders: (status3or4 ? xml_http.getAllResponseHeaders() : null),
					status: (status3or4 ? xml_http.status : null),
					statusText: (status3or4 ? xml_http.statusText : null),
					finalUrl: (ready_state == 4 ? details.url : null)
				};

				if (details.onreadystatechange)
					details.onreadystatechange(response);
				if (ready_state == 4) {
					if (xml_http.status >= 200 && xml_http.status < 300) {
						if (details.onload)
							details.onload(response);
					} else {
						if (details.onerror)
							details.onerror(response);
					}
				}
			};

			xml_http.open(details.method, details.url, true);
			if (details.headers)
				for (var this_header in details.headers)
					xml_http.setRequestHeader(this_header, details.headers[this_header]);

			try {
				xml_http.send(details.data);
			} catch (e) { // Simulate a real error
				if (details.onerror)
					details.onerror({
						responseText: "",
						readyState: 4,
						responseHeaders: "",
						status: 403,
						statusText: "Forbidden",
						finalUrl: details.url
					});
				else
					gm_extensions.GM_log(error_text + details.url + (opera_obj && !cross_domain_used && cross_domain_req ? cross_domain_note : ""));
			}
		};
	}

	if ((typeof GM_openInTab) != "undefined") // Firefox
		gm_extensions.GM_openInTab = GM_openInTab;
	else if ((typeof PRO_openInTab) != "undefined") // Internet Explorer
		gm_extensions.GM_openInTab = PRO_openInTab;
	else
		gm_extensions.GM_openInTab = function (url) {
			return window.open(url, "_blank");
		};

	var gm_emulation_enhanced_scripts = [];
	gm_extensions.GM_announcePresence = function (unique_script_name, displayed_name, version) {
		if (unique_script_name.length <= 4) {
			alert("GM_announcePresence => The \"unique_script_name\" is missing or too short.");
			return false;
		}
		gm_emulation_enhanced_scripts[gm_emulation_enhanced_scripts.length] = [unique_script_name, displayed_name, version];
		return gm_extensions.GM_getValue("is_enabled", true, "Script_managment-" + unique_script_name);
	};
	gm_extensions.GM_updateCheck = function (update_check_url, installed_version, update_check_every, handle_update_function, unique_script_name) {
		if (!cross_domain_values)
			return null;
		var now = Math.round(((new Date()).getTime()) / 60000); // 60000 (1000 * 60) From milliseconds to minutes

		var last_update_check_global = gm_extensions.GM_getValue("last_update_check", 0, "Script_managment-GLOBAL_SHARED");
		if (now - last_update_check_global < 3)
			return false; // Only one time every 3 minutes maximum

		if (unique_script_name.length <= 4) {
			alert("GM_updateCheck => The \"unique_script_name\" is missing or too short.");
			return false;
		}

		var last_update_check = gm_extensions.GM_getValue("last_update_check", 0, "Script_managment-" + unique_script_name);
		if (now - last_update_check < update_check_every * 1440)
			return false; // 1440 (60 * 24) From days to minutes - Only one time every X days maximum

		gm_extensions.GM_setValue("last_update_check", now, "Script_managment-GLOBAL_SHARED");
		gm_extensions.GM_setValue("last_update_check", now, "Script_managment-" + unique_script_name);
		gm_extensions.GM_xmlhttpRequest({
			method: "GET",
			url: update_check_url,
			onload: function (result) {
				//gm_extensions.GM_log(result.responseText);
				var new_version = /\/\/\s*@version[\t\s]+([^\s\t\r\n]+)\s*\r?\n/i.exec(result.responseText);
				var new_unique_script_name = /\/\/\s*@uniquescriptname[\t\s]+([^\s\t\r\n]+)\s*\r?\n/i.exec(result.responseText);

				if (new_version == null) {
					var error = unique_script_name + " => Failed checking the new version, URL: " + update_check_url;
					gm_extensions.GM_log(error);
					alert(error);
					return null;
				}
				new_version = new_version[1];
				if (new_unique_script_name == null)
					gm_extensions.GM_log(unique_script_name + " => The \"uniquescriptname\" is missing on the update server, URL: " + update_check_url);
				else if (new_unique_script_name[1] != unique_script_name) {
					var error = unique_script_name + " => The unique script name passed doesn't match the unique script name on the update server, maybe the update_check_url is wrong, URL: " + update_check_url;
					gm_extensions.GM_log(error);
					alert(error);
					return null;
				}
				gm_extensions.GM_setValue("last_new_version", new_version, "Script_managment-" + unique_script_name);
				if (new_version == installed_version)
					handle_update_function(false);
				else
					handle_update_function(new_version);
			}
		});

		return true;
	};
	gm_extensions.GM_getEmulationVersion = function () {
		return version;
	};

	gm_extensions.GM_exposeAPIs = function () {
		GM_log = gm_extensions.GM_log;
		if (!native_getsetvalues_functions) {
			GM_getValue = gm_extensions.GM_getValue;
			GM_setValue = gm_extensions.GM_setValue;
		}
		if (!is_GM_deleteValue_bultin)
			GM_deleteValue = gm_extensions.GM_deleteValue;
		if (!is_GM_listValues_bultin)
			GM_listValues = gm_extensions.GM_listValues;
		GM_areStoredValuesCrossDomain = gm_extensions.GM_areStoredValuesCrossDomain;
		GM_addStyle = gm_extensions.GM_addStyle;
		GM_registerMenuCommand = gm_extensions.GM_registerMenuCommand;
		GM_renameMenuCommand = gm_extensions.GM_renameMenuCommand;
		GM_xmlhttpRequest = gm_extensions.GM_xmlhttpRequest;
		GM_openInTab = gm_extensions.GM_openInTab;
	};
	gm_extensions.GM_exposeAPIs();
	if (window == window.top)
		window.setTimeout(function () {
			var TarquinWJ = (typeof doGMMeenoo != "undefined"),
			ale5000 = ((typeof window.opera != "undefined") &&
				(typeof window.opera.userscripts != "undefined") &&
				(typeof window.opera.userscripts.GM != "undefined")) // version 1.4.5 on Opera
			 ||
			((typeof window.userscripts != "undefined") &&
				(typeof window.userscripts.GM != "undefined")) // version 1.4.5
			 ||
			((typeof window.userjs != "undefined") &&
				(typeof window.userjs.GM != "undefined")), // versions 1.3.7 through 1.4.4
			str = '';
			if (TarquinWJ)
				str += '"Emulate GM functions" by TarquinWJ\n';
			if (ale5000)
				str += '"Greasemonkey Emulation" by ale5000\n';
			if (str)
				alert("You have multiple Greasemonkey emulation scripts installed:\n\n" + str + '"Greasemonkey Emulation" by Lil Devil\n\nOnly the one by Lil Devil should be installed for proper operation.');
		}, 5000);

	var compat_array_indexof = false,
	compat_array_foreach = false;
	gm_extensions.BrowserCompat_Add = function () {
		var result = false;
		if (!Array.prototype.indexOf) {
			result = true;
			compat_array_indexof = true;
			Array.prototype.indexOf = function (find, i /*opt*/) {
				var array_length = this.length;
				if (!i)
					i = 0;
				else {
					if (i < 0)
						i += array_length;
					if (i < 0)
						i = 0;
				}

				for (; i < array_length; i++)
					if (this[i] == find)
						return i;
				return -1;
			};
		}
		if (!Array.prototype.forEach) {
			result = true;
			compat_array_foreach = true;
			Array.prototype.forEach = function (callback, thisObject /*opt*/) {
				if (!thisObject) {
					for (var i = 0, array_length = this.length; i < array_length; i++)
						if (i in this)
							callback(this[i]);
				} else {
					for (var i = 0, array_length = this.length; i < array_length; i++)
						if (i in this)
							callback.call(thisObject, this[i]);
				}
			};
		}
		return result;
	};

	gm_extensions.BrowserCompat_Restore = function () {
		if (compat_array_indexof) {
			delete Array.prototype.indexOf;
			compat_array_indexof = false;
		}
		if (compat_array_foreach) {
			delete Array.prototype.forEach;
			compat_array_foreach = false;
		}
	};

	var handle_update_function = function (new_version) {
		if (new_version != null && new_version != false) {
			GM_log("Greasemonkey Emulation => New version detected: " + new_version);
			var result = confirm("A new version of the \"Greasemonkey Emulation\" userscript is available.\nCurrent version: " + version + "\nNew version: " + new_version + "\n\nDo you want to update it now?\nThe update check will run again in 10 days.");
			if (result)
				try {
					location.href = "http://userscripts.org/scripts/source/105153.user.js";
				} catch (e) {}
		}
	};

	// this will only run in Firefox, IE and Opera (with scriptStorage active)
	//gm_extensions.GM_updateCheck("http://userscripts.org/scripts/source/105153.meta.js", version, 10, handle_update_function, unique_script_name);
})();

var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function (input) {
		var output = "";
		var chr1,
		chr2,
		chr3,
		enc1,
		enc2,
		enc3,
		enc4;
		var i = 0;
		input = Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = (chr1 & 3) << 4 | chr2 >> 4;
			enc3 = (chr2 & 15) << 2 | chr3 >> 6;
			enc4 = chr3 & 63;
			if (isNaN(chr2))
				enc3 = enc4 = 64;
			else if (isNaN(chr3))
				enc4 = 64;
			output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
				Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4)
		}
		return output
	},
	decode: function (input) {
		var output = "";
		var chr1,
		chr2,
		chr3;
		var enc1,
		enc2,
		enc3,
		enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = Base64._keyStr.indexOf(input.charAt(i++));
			enc2 = Base64._keyStr.indexOf(input.charAt(i++));
			enc3 = Base64._keyStr.indexOf(input.charAt(i++));
			enc4 = Base64._keyStr.indexOf(input.charAt(i++));
			chr1 = enc1 << 2 | enc2 >> 4;
			chr2 = (enc2 & 15) << 4 | enc3 >> 2;
			chr3 = (enc3 & 3) << 6 | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64)
				output = output + String.fromCharCode(chr2);
			if (enc4 != 64)
				output = output + String.fromCharCode(chr3)
		}
		output = Base64._utf8_decode(output);
		return output
	},
	_utf8_encode: function (string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128)
				utftext += String.fromCharCode(c);
			else if (c > 127 && c < 2048) {
				utftext += String.fromCharCode(c >> 6 | 192);
				utftext += String.fromCharCode(c & 63 | 128)
			} else {
				utftext += String.fromCharCode(c >> 12 | 224);
				utftext += String.fromCharCode(c >>
					6 & 63 | 128);
				utftext += String.fromCharCode(c & 63 | 128)
			}
		}
		return utftext
	},
	_utf8_decode: function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++
			} else if (c > 191 && c < 224) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode((c & 31) << 6 | c2 & 63);
				i += 2
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
				i += 3
			}
		}
		return string
	}
};
var getCroppedDomain = function () {
	if (!settings.croppedDomain)
		settings.croppedDomain = utils.cropDomain(getUrlInfo().host);
	return settings.croppedDomain
};
var getUrlInfo = function () {
	if (!settings.urlInfo)
		settings.urlInfo = utils.getUrl(document.location);
	return settings.urlInfo
};
var sendGetRequest = function (path, async) {
	var url = settings.testDomain ? settings.testDomain : utils.getHostWithProtocol();
	url += path;
	if (typeof async == "undefined")
		async = false;
	var xmlhttp = new XMLHttpRequest;
	xmlhttp.open("GET", url, async);
	xmlhttp.send();
	if (xmlhttp.readyState == 4)
		if (xmlhttp.status != 200)
			throw xmlhttp.statusText;
	return xmlhttp.responseText
};
var sendPostRequest = function (path, params) {
	var url = settings.testDomain ? settings.testDomain : utils.getHostWithProtocol();
	url += path;
	var xmlhttp = new XMLHttpRequest;
	xmlhttp.open("POST", url, false);
	xmlhttp.send(params);
	if (xmlhttp.readyState == 4)
		if (xmlhttp.status != 200)
			throw xmlhttp.statusText;
	return xmlhttp.responseText
};

function GM_getResourceText(resourceName) {
	return Base64.decode(GM_getResourceURL(resourceName))
}

function GM_openInTab(url) {
	window.open(url)
}

function GM_getResourceURL(resourceName) {
	var result = GM_Resources[resourceName];
	if (typeof result === "undefined")
		throw "Resource " + resourceName + " not found";
	return result
}

// http://mths.be/unsafewindow
window.unsafeWindow || (
	unsafeWindow = (function () {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}
		()));

// You can now use `unsafeWindow`, ehm, safely.
//console.log(unsafeWindow);
// If the current document uses a JavaScript library, you can use it in
// your user script like this:
//console.log(unsafeWindow.jQuery);

function GM_setClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
