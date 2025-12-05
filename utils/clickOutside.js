export default {
	bind(el, binding) {
		// 点击外部的处理函数
		el.__clickOutsideHandler__ = function(event) {
			if (!(el === event.target || el.contains(event.target))) {
				binding.value(event) // 执行传入的回调函数
			}
		}
		document.addEventListener('click', el.__clickOutsideHandler__)
	},
	unbind(el) {
		document.removeEventListener('click', el.__clickOutsideHandler__)
		delete el.__clickOutsideHandler__
	}
}