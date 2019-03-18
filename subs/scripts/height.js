var temp={
  fill:function(subs){
    var h=(80*subs/config.goal)+"vh";
    temp.tag.height(h);
  },
  init:function(){
    $(".overlay-full").attr("data-content","loading...");
    temp.tag=$(".overlay-full");
    var prev=localStorage["subs"];
    temp.fill(prev?parseInt(prev):0);
    request.load(function(result){
      console.log(result);
      var numerator=result;
      temp.tag.css("transition","height 1s ease");
      if(result && result>=0){
        localStorage["subs"]=result;
        temp.fill(result);
      }else{
        console.log("Womp womp!");
        numerator=prev;
      }
      $(".overlay-full").attr("data-content",numerator+"/"+config.goal);
    });
  }
}

$(document).ready(function(){
  temp.init();
});
