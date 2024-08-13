$(function () {
	//手机版头部切换菜单
	$("#header-toggle-btn").click(function(e){
      $(".header").toggleClass("header-open-the-picker");
      $("#header-picker").toggleClass("header-picker-mobile");
      e.stopPropagation(); 
    });

    $("#header-picker").click(function(e){
      e.stopPropagation(); 
    });

    $(document).click(function(){ 
      $(".header").removeClass("header-open-the-picker");
      $("#header-picker").removeClass("header-picker-mobile");
    });
	
	
	//顶部下拉菜单
    $(".picker-hall-main dl").hover(function(){
        $(this).addClass("on");
        $(this).find(".cont").show();
    },function(){
        $(this).removeClass("on");
        $(this).find(".cont").hide();
    });
});


