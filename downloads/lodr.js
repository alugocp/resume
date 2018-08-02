var Lodr={
  bg:$("<span class='lodr-startup'></span>"),
  display:function(){
    Lodr.s.css("opacity","0");
    Lodr.bg.css("opacity","0");
    setTimeout(function(){
      Lodr.s.css("display","none");
      Lodr.bg.css("display","none");
    },400);
  },
  start:function(){
    $(".lodr-content").css("z-index","0");
    Lodr.s.parent().append(Lodr.bg);
    Lodr.s.css("z-index","2");
    Lodr.s.offset({
      top:($(window).height()-Lodr.s.height())/2,
      left:($(window).width()-Lodr.s.width())/2
    });

    $(".lodr-startup").css("transition","opacity 0.4s ease");
    $(".lodr-startup").css("position","fixed");

    Lodr.bg.css("background-color",$(".lodr-startup").attr("bg"));
    Lodr.bg.css("left","0%");
    Lodr.bg.css("top","0%");
    Lodr.bg.css("width","100%");
    Lodr.bg.css("height","100%");
    Lodr.bg.css("z-index","1");
  }
}
$("body").ready(function(){
  Lodr.s=$(".lodr-startup");
  Lodr.start();
  $(".lodr-content").css("display","inline");
});
