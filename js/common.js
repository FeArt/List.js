/**
 * 本方法主要实现列表复选框的全选与不选
 */
function checkAll(e, // 复选框选中状态
ob) // 复选框名称
{
	// 获取复选框对象数组
	var sel_box = document.getElementsByName(ob);
	// 设置复选框状态
	for (var i = 0; i < sel_box.length; i += 1) {
		sel_box[i].checked = e;
	}
}
/**
 * 判断是否为全选
 * @param {Object} isChecked	是否选中
 * @param {Object} objBoxName	多选框名称
 * @param {Object} objAllId		全选框id
 */
function checkAllOrNot(isChecked, objBoxName, objAllId){
	if (isChecked) {// 当有项被选中时，判断当前是否已全选了
		var checkbox_length = $("input[name=" + objBoxName + "]").length;
		var cnt = count(objBoxName);// 当前已选中的个数
		if (cnt == checkbox_length) {
			$("#" + objAllId).attr("checked", true);
		}else{
			$("#" + objAllId).attr("checked", false);
		}
	} else {// 当有项撤销选中时，判断头是否处于非全选状态
		$("#" + objAllId).attr("checked", false);
	}
}

/**
 * 实现列表复选框选中个数的统计
 */
function count(ob) // 复选框名称
{
	// 获取复选框对象数组
	var sel_box = document.getElementsByName(ob);
	// 选中个数
	var cnt = 0;
	// 统计
	for (var i = 0; i < sel_box.length; i += 1) {
		if (sel_box[i].checked) {
			cnt += 1;
		}
	}
	return cnt;
}


/**
 * 为了保证一定延时才出现加载图片，设置一个标志位
 * 执行showLoading且loading_flag=true时，才显示加载图片
 */
var loading_flag = false;
var loading_lag_time = 300;

/**
 * 计算加载图片居中位置
 */
function centerLoading() {
	return ($("#main").width() - $("#loading").width()) / 2 + "px";
}

/**
 * 显示加载图片
 */
function showLoading() {
	if (loading_flag) {
		var obj = $("#loading");
		obj.css("z-index", "100");
		obj.css("left", centerLoading());
		obj.css("top", "56px");
	}
}

/**
 * 隐藏加载图片
 */
function hideLoading() {
	$("#loading").css("z-index", "-1");
}

/**
 * 设置列表无记录跨列效果（列表及查看页面使用）
 * 列表表头需以thead包含
 * 列表内容需以tbody包含
 * @param {Object} id 需要进行跨列设置的tableID
 */
var setColspan = function(id) {
	var tb = document.getElementById(id);
	var tbclen = tb.rows.item(0).cells.length;
	var tbrlen = tb.rows.length;
	tb.rows.item(tbrlen - 1).cells[0].colSpan = tbclen;
}

/**
 * 设置列表奇偶行效果（列表及查看页面使用）
 * 列表表头需以thead包含
 * 列表内容需以tbody包含
 * @param {Object} id 列表所在容器ID
 * @param {Object} type 区分是页面还是层
 */
var setOddEvenLine = function(id, type) {
	var odd_css;
	var even_css;
	var hover_css;
	// 主要是样式的区别，常规列表行高要大一些
	if (type == 0) {// 常规列表
		even_css = "table_txt_tr1";
		odd_css = "table_txt_tr2";
		hover_css = "trbg11";
	} else {// 其它列表
		even_css = "table_txt_tr3";
		odd_css = "table_txt_tr4";
		hover_css = "trbg22";
	}
	$("#" + id).find("tbody").eq(0).find("tr:odd").each(function() {
		$(this).attr("class", odd_css);
		$(this).mouseover(function() {
			$(this).attr("class", hover_css);
		});
		$(this).mouseout(function() {
			$(this).attr("class", odd_css);
		});
	});
	$("#" + id).find("tbody").eq(0).find("tr:even").each(function() {
		$(this).attr("class", even_css);
		$(this).mouseover(function() {
			$(this).attr("class", hover_css);
		});
		$(this).mouseout(function() {
			$(this).attr("class", even_css);
		});
	});
}

/**
 * 将列表序号从1开始显示
 * @memberOf {TypeName} 
 */
function showListNumber(){
	$(".index").each(function(){
		if(!isNaN(parseInt($(this).html()))){
			$(this).html( parseInt($(this).html())+ 1);
		}
	});
}

/**
 * 将序号改为从1开始（原本是从0开始）
 */
function showNumber(){
	$(".index").each(function(){
		if(!isNaN(parseInt($(this).html()))){
			$(this).html( parseInt($(this).html())+ 1);
		}
	});
}





