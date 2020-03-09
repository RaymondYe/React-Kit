import request from './request';
import { loadScript, isWeixin } from './common';

/*
	@param shareConfig {
		title: '分享标题',
		link: '分享链接',
		imgUrl: '分享图片',
		desc: '分享描述',
		isDebug: '调试模式',
		onShare: (type)=>
		onCancel: (type)=>
	}
*/
let shareConfig = {
	isDebug: false
};

function init(opts = {
	title: '分享标题',
	link: '分享链接',
	imgUrl: '分享图片',
	desc: '分享描述',
	isDebug: false
}) {
	shareConfig = opts;
	if (isWeixin()) {
		initWechat(opts);
	}
}

// 分享调试log
function shareLog(info) {
	if (shareConfig.isDebug) {
		alert(JSON.stringify(info));
	}
}

// 获取分享所需token
async function initWechat(opts = {}) {
	let data = {};
	try {
		const res = await getToken();
		if (res.status === 200 || res.data) {
			shareLog(res.data);
			if (res.data && res.data.data) {
				data = res.data.data;
			}
		} else {
			shareLog(res);
		}
	} catch (err) {
		shareLog(err);
	}

	if (!data) {
		shareLog('Wechat Token is Empty');
		return;
	}

	const nextOpts = {
		...opts,
		...data
	};

	loadScript('//res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
		createWechatShare(nextOpts);
	});
}

async function getToken() {
	const url = window.location.href;
	const res = await request.get(`http://www.xxx.com/wx/getSignature?currentUrl=${encodeURIComponent(url)}`);
	return res;
}

// 通过token开始执行分享
function createWechatShare(opts) {
	let isDebug = opts.isDebug || false;
	let params = {
		debug: isDebug,
		appId: opts.appId || 'xxxxxxx',
		timestamp: parseInt(opts.timestamp || 0),
		nonceStr: opts.nonceStr,
		signature: opts.signature,
		jsApiList: [
			'checkJsApi',
			'openLocation',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone'
		]
	};
	if (!opts.desc) {
		opts.desc = opts.title;
	}

	if (!opts.onShare) {
		opts.onShare = () => { };
	}

	if (!opts.onCancel) {
		opts.onCancel = () => { };
	}

	opts.link = opts.link || location.origin + location.pathname;

	if (window.wx && window.wx.config) {
		window.wx.config(params);
	}

	window.wx.ready(() => {
		setWeChatShareInfo(opts);
	});

	window.wx.error(res => {
		shareLog(res);
	});
}

// 设置分享回调
function setWeChatShareInfo(config) {
	window.wx.onMenuShareTimeline({
		title: config.title,
		desc: config.desc,
		link: config.link,
		imgUrl: config.imgUrl,
		success: () => {
			config.onShare('timeline');
		},
		cancel: () => {
			config.onCancel('timeline');
		}
	});

	window.wx.onMenuShareAppMessage({
		title: config.title,
		desc: config.desc,
		link: config.link,
		imgUrl: config.imgUrl,
		success: () => {
			config.onShare('friend');
			config.onCancel('friend');
		}
	});

	window.wx.onMenuShareQQ({
		title: config.title,
		desc: config.desc,
		link: config.link,
		imgUrl: config.imgUrl,
		success: () => {
			config.onShare('qq');
		},
		cancel: () => {
			config.onCancel('qq');
		}
	});

	window.wx.onMenuShareQZone({
		title: config.title,
		desc: config.desc,
		link: config.link,
		imgUrl: config.imgUrl,
		success: () => {
			config.onShare('qzone');
		},
		cancel: () => {
			config.onCancel('qzone');
		}
	});

	window.wx.onMenuShareWeibo({
		title: config.title,
		desc: config.desc,
		link: config.link,
		imgUrl: config.imgUrl,
		success: () => {
			config.onShare('weibo');
		},
		cancel: () => {
			config.onCancel('weibo');
		}
	});
}

export default {
	init: init
};
