// ==UserScript==
// @name			UniQ
// @namespace		https://greasyfork.org/users/723559-valen-h
// @homepage		https://greasyfork.org/scripts/419588-uniq
// @updateURL		https://greasyfork.org/scripts/419588-uniq/code/UniQ.js
// @installURL		https://greasyfork.org/scripts/419588-uniq/code/UniQ.js
// @downloadURL		https://greasyfork.org/scripts/419588-uniq/code/UniQ.js
// @version			0.2
// @description		Utilities for faster development.
// @author			V. H.
// @license			AFL-3.0
// @grant			unsafeWindow
// ==/UserScript==

/**
 * @author V. H.
 * @version 1.0
 * @file uniq.js
 * @since 3/1/2021
 */

/**
 * Executes only once.
 * 
 * @param {Function} what - Target function
 * @param {...args} args - Non-fixed arguments
 * 
 * @return {bool} true on success.
 */
if (!unsafeWindow.try_once) unsafeWindow.try_once = function try_once(what, ...args) {
	if (unsafeWindow.try_once.trylist.includes(what)) return false;
	else if (what(...args)) unsafeWindow.try_once.trylist.push(what);
	else return false;
	
	return true;
}; //try_once
if (unsafeWindow.try_once) unsafeWindow.try_once.trylist = [ ];
if (unsafeWindow.try_once) unsafeWindow.try_once.remove = function remove(value) {
	if (!value) {
		unsafeWindow.try_once.trylist = [ ];
		
		return true;
	}
	
	var passed = false;
	
	unsafeWindow.try_once.trylist = unsafeWindow.try_once.trylist.filter(e => {
		if (e == value) return !(passed = true);
		else return true;
	});
	
	return passed;
};

/**
 * Fixate parameters of function.
 * 
 * @param {Function} fn - Target function
 * @param {...args} args - Fixed arguments
 * 
 * @return {Function} Fixed new function.
 */
if (!unsafeWindow.fixed_params) unsafeWindow.fixed_params = function fixed_params(fn, ...args) {
	return (...a) => fn(...args, ...a);
}; //fixed_params

/**
 * Retry execution until success.
 * 
 * @param {Function} what - Target function
 * @param {Number=500} delay - Delay of retry
 * @param {...any} args - Target function arguments
 * 
 * @return {Promise} Data.
 */
if (!unsafeWindow.try_until) unsafeWindow.try_until = async function try_until(what, delay = 500, ...args) {
	return new Promise(async (res, rej) => {
		let data;
		
		try {
			if (data = await what(...args)) res(data);
			else setTimeout((w, d, ...args) => try_until(w, d, ...args).then(res, rej), delay, what, delay, ...args);
		} catch(e) { rej(e); }
	});
}; //try_until

/**
 * Try execution many times.
 * 
 * @param {Function} what - Target function
 * @param {Number=3} tries - Attempt tries
 * @param {Number=0} delay - Delay of retry
 * @param {...any} args - Target function arguments
 * 
 * @return {any} Data.
 */
if (!unsafeWindow.try_max) unsafeWindow.try_max = async function try_max(what, tries = 3, delay = 0, ...args) {
	let data;
	
	do {
		data = await what(...args);
		if (!data && delay > 0) await sleep(typeof delay === "object" ? delay['t'] : delay);
	} while (!data && --tries > 0);
	
	return data;
}; //try_max

/**
 * Block execution.
 * 
 * @param {Number=500} by - By
 * 
 * @return {Promise} Blocker.
 */
if (!unsafeWindow.sleep) unsafeWindow.sleep = async function sleep(by = 500) {
	return await new Promise((res, rej) => setTimeout(by => res(by), by, by));
}; //sleep

/**
 * Do If.
 * 
 * @param {any} v - If true
 * @param {Function} fn - Target function
 * @param {...any} args - Target function arguments
 * 
 * @return {any} Data.
 */
unsafeWindow.do_if = function do_if(v, fn = e => e, ...args) {
	return v ? fn.bind(fn)(v, ...args) : v;
}; //do_if

if (HTMLCollection && !HTMLCollection.prototype.forEach) HTMLCollection.prototype.forEach = Array.prototype.forEach;
if (HTMLCollection && !HTMLCollection.prototype.filter) HTMLCollection.prototype.filter = Array.prototype.filter;
