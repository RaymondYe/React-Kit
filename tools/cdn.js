import fs from 'fs';
import path from 'path';
import walk from 'walk';
import ALY from 'aliyun-sdk';
import {
	ossConfig,
	ossContentType,
	ossBucket,
	ossPrefix,
	ossMaxAge,
	ossStaticPath
} from './config';

const basePath = ossStaticPath;
const maxAge = ossMaxAge || 365 * 24 * 60 * 60;
const cacheControl = 'max-age=' + ossMaxAge;

async function cdn() {
	return new Promise((resolve, reject) => {
		const oss = new ALY.OSS(ossCfg);
		const walker = walk.walk(basePath);

		walker.on('file', function(root, fileStats, next) {
			let filePath = root + '/' + fileStats.name;

			fs.readFile(filePath, function(err, data) {
				let contents = data;
				let filename = filePath;
				let ext = filePath.split('.').pop() || '';
				let type = ossContentType[ext.toLowerCase()] || '';
				filename = filename.substring(basePath.length + 1);
				filename = ossPrefix + filename;

				if (!type) {
					next();
					return;
				}

				let uploadCfg = {
					Bucket: ossBucket,
					Key: filename,
					Body: contents,
					ContentType: type,
					CacheControl: cacheControl
				};

				oss.headObject(
					{
						Bucket: ossBucket,
						Key: filename
					},
					function(err, data) {
						if (!err) {
							console.log(`${filename}: Object is exists...`);
							next();
							return;
						}

						oss.putObject(uploadCfg, function(error, data) {
							if (error) {
								console.log(`Error: ${filename} ... ${error.message}`);
								next();
								return;
							}
							console.log(`${filename}: Put object success...`);
							next();
						});
					}
				);
			});
		});

		walker.on('errors', function(root, nodeStatsArray, next) {
			next();
		});

		walker.on('end', function() {
			console.log('All File Put Done.');
			resolve();
		});

	});
}

export default cdn;
