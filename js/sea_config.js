/**
 * seajs的配置信息
 * base: 默认为sea.js之前的路径（不包含版本信息），此处不需要配置
 * 		WebRoot/static/(seajs/javascript/tool/css/image)
 * alias: 可精简过长的链接
 * preload: 可能用到插件的配置都写在这里，在具体模块中不一定都使用，只需要复制需要的配置即可
 */
seajs.config({
	alias: {
		'jquery': 'jquery',
		'template': 'template',
		"list": 'List',
		'form': 'jquery.form.js'
	},
	preload: [
		'jquery',
		'template'
	]
})

//将 jQuery 暴露到全局
seajs.modify('jquery', function(require, exports) {
	window.jQuery = window.$ = exports
})

//将 jQuery form 插件自动包装成 CMD 接口
seajs.modify('form', function(require, exports, module) {
	module.exports = $.form
})
