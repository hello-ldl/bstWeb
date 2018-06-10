
$(function(){
	 // 初始化内容     
	/* 头部 */
	$.get("../../html/home/head.html",{},function(data){
		$(".header").html(data);
		/*首页手机端导航*/
		$(".nav_icon").click(function(){
			if(!$(this).hasClass("curr"))
			{
				$(this).addClass("curr");
				$(".mb_nav").stop().animate({right:0,opacity:1},300);
			}
			else
			{
				$(this).removeClass("curr");
				$(".mb_nav").stop().animate({right:'-80%',opacity:0},300);	
			}
		});
		$(".mb_nav li").click(function(){
			$(".nav_icon").removeClass("curr");
			$(".mb_nav").stop().animate({right:'-80%',opacity:0},300);
		});
	});

	/* 加载尾部 */
	$.get("../../html/home/footer.html",{},function(data){
		$(".footer").html(data);
	});
	
	$.get("1.html",{},function(data){
		$(".bodyer").html(data);
		if($(window).innerWidth()<1024){ 
			$(".within_product").find("img").width($(window).innerWidth()*0.90);
			$(".within_product").find("img").height($(window).innerWidth()*0.90);
		}
	});
   
});
