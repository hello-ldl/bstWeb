// JavaScript Document
$(function(){
	if($(window).width()>1000)
	{
		var swiper = new Swiper('#swiper-container2', {
			loop:true,
			autoplay: 2500,
			slidesPerView: 5,
			paginationClickable: true,
			spaceBetween: 8,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		});	
	}
	else if($(window).width()>=768)
	{
		var swiper = new Swiper('#swiper-container2', {
			loop:true,
			autoplay: 2500,
			slidesPerView: 5,
			paginationClickable: true,
			spaceBetween: 8,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		});		
	}
	else if($(window).width()>=640)
	{
		var swiper = new Swiper('#swiper-container2', {
			loop:true,
			autoplay: 2500,
			slidesPerView: 3,
			paginationClickable: true,
			spaceBetween: 5,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		});		
	}
	else if($(window).width()>=0)
	{
		var swiper = new Swiper('#swiper-container2', {
			loop:true,
			autoplay: 2500,
			slidesPerView: 2,
			paginationClickable: true,
			spaceBetween: 5,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'
		});		
	}
});