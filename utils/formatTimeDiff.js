
/**
 * 格式化剩余时间
 * @param {number} timestamp - 目标时间戳（秒或毫秒）
 * @param {string} format - 输出格式，默认 "${h}h${m}m"
 * @returns {string|number}
 */
export function formatTimeDiff(timestamp, format = "${h}h${m}m") {
	if (!timestamp) return 0;

	// 判断时间戳单位（毫秒或秒）
	if (timestamp < 1e12) {
		timestamp = timestamp * 1000;
	}

	const now = Date.now();
	let diff = 12 * 60 * 60 * 1000-(now - timestamp);
	console.log(diff)
	if (diff <= 0) return 0;

	// 计算时间差
	const totalSeconds = Math.floor(diff / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	// 格式化输出
	const result = format
		.replace(/\$\{d\}/g, days)
		.replace(/\$\{h\}/g, hours.toString().padStart(2, "0"))
		.replace(/\$\{m\}/g, minutes.toString().padStart(2, "0"))
		.replace(/\$\{s\}/g, seconds.toString().padStart(2, "0"));
	return result;
}


export function formatTimeDiff2(timestamp, format = "${h}h${m}m") {
	if (timestamp <= 0) return 0;
	// 计算时间差
	console.log(timestamp)
	const totalSeconds = Math.floor(timestamp / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	// 格式化输出
	const result = format
		.replace(/\$\{d\}/g, days)
		.replace(/\$\{h\}/g, hours.toString().padStart(2, "0"))
		.replace(/\$\{m\}/g, minutes.toString().padStart(2, "0"))
		.replace(/\$\{s\}/g, seconds.toString().padStart(2, "0"));
	return result;
}