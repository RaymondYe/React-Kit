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

// fix ios mobile input blank
export function fixMobileInput() {
	let flag;
	let timer;
	const userAgent = navigator.userAgent;
	const isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if (!isIos) return;
	document.body.addEventListener('focusin', () => {
		flag = true;
		clearTimeout(timer)
	});

	document.body.addEventListener('focusout', () => {
		flag = false;
		if (!flag) {
			timer = setTimeout(() => {
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})
			}, 200);
		} else {
			return;
		}
	});
}
