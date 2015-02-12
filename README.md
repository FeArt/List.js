# List.js 简介
为了提高页面反应速度，提升用户体验，列表前台使用了如下两个设计：

1. 异步加载：列表页面使用异步方式加载数据，即进入列表后，各种更新列表数据的操作都不会发生页面跳转。	
2. 前台页面缓存：ajax请求获取的列表数据实际上包含若干页，一次请求返回的所有页称为前台页面缓存。在列表翻页的时候如果新页在前台页面缓存范围内，则不用发送新请求。

# 详细API介绍
1. `getData()`
getData()函数和精简版list.js里面的showData()的作用是一样的，都是起到获取数据,重新组装数据，更新显示数据的作用。在完整版的list.js里面也定义了一个showData(),这个showData()会被getData()调用，功能主要是组装数据和更新显示数据。

2. `loadTemplate()`
loadTemplate()函数主要功能是调用模版引擎，将请求得到的列表数据利用模版进行解析，生成列表并在页面显示。

3. `showPageNo()`
主要功能是动态生成页码以及翻页按钮，绑定相应的事件处理程序。

4. `showFirstPage()`
通过调用loadTemplate()，解析并显示第一页的数据。然后调用showPageNo()，更新页码信息。

4. `showPreviousPage()`
通过调用loadTemplate()，解析并显示前一页的数据。然后调用showPageNo()，更新页码信息。

5. `showNextPage()`
通过调用loadTemplate()，解析并显示下一页的数据。然后调用showPageNo()，更新页码信息。

6. `showLastPage()`
通过调用loadTemplate()，解析并显示最后一页的数据。然后调用showPageNo()，更新页码信息。

7. `showGoTo()`
通过调用loadTemplate()，解析并显示指定页的数据。然后调用showPageNo()，更新页码信息。

8. `showPageSize()`
主要功能是用户改变每页显示条目后，更新并显示列表数据

9. `showSort()`
主要功能是将需要排序参数传给后台进行处理（SMDB用的是后台排序，因为数据较多，前台排序吃不消），然后调用getData()更新显示列表。
10. `showSimpleSearch()`
主要功能是将前台页面输入的参数发送到后台，后台进行检索后，将列表数据返回，然后调用getData()更新显示列表

11. `showData()`
主要作用就是来重新组装数据，显示数据。具体行为参照getData()函数。

12. `initPageShow()`
主要做一些初始化操作，包括给处理从子页面传过来的参数列表、设置默认参数、绑定按钮的事件处理程序（注意，这里利用是jQuery的live函数，因为在初始化的时候，对应按钮的DOM节点可能还没有生成，如果利用click函数，就会造成绑定失败。而live函数是利用事件委托机制，所以即使目标元素在live函数执行后出现，也可以正常绑定）。

# list.js对外API接口的介绍以及使用说明
list.js对外提供的接口很少，只有四个，分别为`pageShow()`，`getData()`， `selectedTab`， 以及`viewParam`。其中常用的只有前两个。

1. `pageShow()`
pageShow()是最常用的接口了，基本上90%的列表只要调用它就可以了。pageShow()接收的参数列表如下表：

	<table>
	<thead>
	<tr>
		<th>参数</th>
		<th>功能</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>dealWith</td>
		<td>回调函数，用于页面上表格显示之后对表格进行进一步处理。</td>
		<td>非必须，比较常用，要掌握。</td>
	</tr>
	<tr>
		<td>nameSpace</td>
		<td>命名空间，对应于后台action的nameSpace。</td>
		<td>必须。</td>
	</tr>
	<tr>
		<td>selectedTab</td>
		<td>标签定位。</td>
		<td>非必须，不常用。</td>
	</tr>
	<tr>
		<td>sortColumnId</td>
		<td>支持排序的列ID数组。</td>
		<td>非必须，常用。</td>
	</tr>
	<tr>
		<td>sortColumnValue</td>
		<td>排序列的值。</td>
		<td>非必须，配合sortColumnId使用。</td>
	</tr>
	<tr>
		<td>listType</td>
		<td>列表类型，0-常规列表,1-弹出层单选列表,2-弹出层复选列表。</td>
		<td>非必须，默认为0。不常用</td>
	</tr>
	<tr>
		<td>viewParam</td>
		<td>查看详情时向后台传的参数</td>
		<td>非必须，常用。</td>
	</tr>
	<tr>
		<td>truncateSettings</td>
		<td>截断显示设置</td>
		<td>非必须，基本没用到。</td>
	</tr>
	</tbody>
	</table>


2. `getData()`

将getData()提供为外部接口是因为考虑到需要手动更新列表数据的需要。举一个具体实例。现在考虑一下以下情况：
现在需要在页面上显示两个列表，但这两个列表不是同时显示，而是通过某种触发机制进行切换显示。利用list.js该如何做？

其实有两种解决方案。第一种是初始化两个列表，一个显示，另一个隐藏。还有一种解决方案是只初始化一个列表进行复用。第一种方法在思维上很容易就想到，但是实现起来很费劲，即使勉强实现了也会有很大的问题。因为初始化了两个列表每当你切换列表时，应该只发送当前列表获取数据的链接，但是因为这个两个列表基本上完全一样，另一个列表也会响应相应的点击或其他事件，就会造成另一个列表也会发送请求，最后造成数据混乱。

正确的做法应该是复用同一个列表实例，当要切换列表的时候，改变列表模版并调用getData()重新获取数据并显示，这样就没有干扰~世界很美好。（具体实例请参考SMDB全站检索）