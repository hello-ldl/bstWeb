// JavaScript Document
	var pageNo = 1;
	var pageSize = 9;
	var json;
	var id;
//	tpl
	var position1 = "<h2 class=\"current_title\"><p>Your Position: &nbsp; <span><a href=\"../../index.htm\">Home</a></span> > <span><a href=\"index.htm\">Products</a> > </span></p></h2>";
	var position2 = "<h2 class=\"current_title\"><p>Your Position: &nbsp; <span><a href=\"../../index.htm\">Home</a></span> > <span><a href=\"index.htm\">Products</a> > </span> <span><a href=\"index.htm?id=${id}\">${clazz}</a> > </span></p></h2>";
	var tpl = "<li>"+
				"<a href=\"#\">"+
					"<span><img src=\"../../statics/images/${name}\" title=\"${title}\" alt=\"${title}\"></span>"+
					"<div class=\"pto_title\">"+
						"<h4>${title}</h4>"+
					"</div>"+
				"</a>"+
			"</li>";
	var index = "<div class=\"clear\"></div>"+
            "<div id=\"pages\" class=\"pages text-c\">";
	var item = "<div class=\"a1\">${counts}page</div>"
$(function(){
	 // 初始化内容     
	/* 头部 */
	$.get("../../html/home/head.html",{},function(data){
		$(".header").html(data);
	});

	/* 加载尾部 */
	$.get("../../html/home/footer.html",{},function(data){
		$(".footer").html(data);
	});
	
	$.get("1.html",{},function(data){
		$(".bodyer").html(data);
		var url = "products/data.html";
		id = getQueryString("id");
		if(id){
			url = id + "/data.html";
		};
		$.get(url,{},function(result){
			json = JSON.parse(result);
			query(pageNo);
		});	
	});
});

/**
 * 获取url参数
 * @param name
 * @returns
 */
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
}

function query(pageNo){
	var start = (pageNo - 1) * pageSize; 
	var end = start + pageSize;
	if(end > json.length){
		end = json.length
	};
	var html;
	if(id){
		var data = {
				"id" : id,
				"clazz" : json.clazz
		};
		html = juicer(position2,data);
	}else{
		html = position1;
	}
	html += "<ul>";
	for(start;  start < end; start++){
		console.log(start);
		var name = (json.data)[start].name;
		var data = {
				"name" : name,
				"id" : json.clazz,
				"title" : ((name.split("/"))[1].split("."))[0]
		};
		html += juicer(tpl,data);
	}
	html += "</ul>";
	
	var counts = parseInt(json.length / pageSize) + 1;
	html += index;
	var tmp = "<a class=\"a1\">" + counts +"page</a>";
	
	if(pageNo > 1){
		tmp += "<a href=\"###\" onclick=\"query(" + (pageNo - 1) + ")\">Previous page</a>";
	}
	
	for(var i = 1; i <= counts; i++){
		if(pageNo == i){
			tmp +="<span>"+ i + "</span>";
		}else{
			tmp += "<a href=\"###\" onclick=\"query(" + i + ")\">" + i + "</a>";
		}
	}
	
	if(pageNo < counts){
		tmp += "<a href=\"###\" onclick=\"query(" + (pageNo + 1) + ")\">Next page</a>";
	}
	
	tmp += "</div></div>";
	html += tmp;
	$(".within_product").html(decodeURI(html));
}