// JavaScript Document
$(function(){
	/* 头部 */
	$.get("html/home/head.html",{},function(data){
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
	$.get("html/home/footer.html",{},function(data){
		$(".footer").html(data);
	});
	
	/*首页轮播*/
	var swiper = new Swiper('#swiper-container1', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		loop:true,
	    grabCursor: true,
		autoplay: 5000,
		nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev'
	});	
	
	//product side_nav
	$(".not").click(function(){
		if(!$(this).hasClass("curr"))
		{
			$(this).addClass("curr");
			$(".pre_nav").slideDown(200);
		}
		else
		{
			$(this).removeClass("curr");
			$(".pre_nav").slideUp(200);
		}
	});
	
	window.onresize=function(){ 
	  if($(window).innerWidth()>1024){ 
	  $(".not").removeClass("curr");
	   $(".pre_nav").slideDown(200);
	  }else{
	  	$(".not").removeClass("curr");
	    $(".pre_nav").slideUp(200);
	   }
   };
   
	$('.header .nav .nav_list li a,.pre_nav li.dropdown-submenu a').each(function(){
		if($($(this))[0].href==String(window.location))
		$(this).parents('li').addClass('curr');
	});
	console.log($(".banner").find("img").height());
	$(".banner").height($(".banner").find("img").height());
});