import _ from 'lodash';

// check environment is wechat
export function isWeixin() {
	var ua = navigator.userAgent.toLowerCase();
	return ua.match(/MicroMessenger/i) == 'micromessenger';
}

// dynamic load script
export function loadScript(src, cb) {
	let script = document.createElement('script');
	script.async = true;
	script.src = src;
	script.onerror = function() {
		if (cb && _.isFunction(cb)) cb(new Error('Failed to load' + src));
	};

	script.onload = function() {
		if (cb && _.isFunction(cb)) cb();
	};

	document.getElementsByTagName('head')[0].appendChild(script);
}
