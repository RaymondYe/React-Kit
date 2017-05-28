import path from 'path';

// CDN config
export const ossBucket = 'ossBucket';
export const ossPrefix = 'ossPrefix';
export const ossMaxAge = 365 * 24 * 60 * 60;
export const ossStaticPath = path.join(__dirname, '../dist/public');
export const ossConfig = {
	accessKeyId: '',
	secretAccessKey: '',
	endpoint: '',
	apiVersion: ''
};
export const ossContentType = {
	js: 'application/javascript',
	css: 'text/css',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	gif: 'image/gif',
	swf: 'application/x-shockwave-flash',
	svg: 'image/svg+xml',
	ttf: 'application/x-font-ttf',
	woff: 'application/font-woff'
};


// Dll Config
export const vendor = ['react', 'react-dom', 'whatwg-fetch'];
