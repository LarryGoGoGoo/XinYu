/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
	return /^1[3456789]\d{9}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
	return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
	return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 匹配数字，可以是小数，不可以是负数,可以为空
 * @param {*} s 
 */
export function isNumber(s) {
	return /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
}
/**
 * 匹配整数，可以为空
 * @param {*} s 
 */
export function isIntNumer(s) {
	return /(^-?\d+$)|(^$)/.test(s);
}
/**
 * 身份证校验
 */
export function checkIdCard(idcard) {
	const regIdCard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))((0[1-9])|([1-2][0-9])|30|31)\d{3}[\dXx]$/;
	if (!regIdCard.test(idcard)) {
		return false;
	} else {
		return true;
	}
}

export function isChinese(s) {
	return /^[\u4e00-\u9fa5]+$/.test(s);
}

export function isEnglish(s) {
	return /^[A-Za-z]+$/.test(s);
}

export function isEnglishNumber(s) {
	let reg = /^[A-Za-z0-9]+$/;
	let reg2 = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
	if (!reg.test(s)||!reg2.test(s)) {
		return false;
	} else {
		return true;
	}
}