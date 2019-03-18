var request={
  load:function(callback){
    /*$.ajax({
      type:"GET",
      url:"https://youtube.com/alexlugo",
      headers:{
        "Access-Control-Allow-Origin":"*"
      },
      success:function(text){
        var b=text.indexOf(" subscribers");
        var a=b;
        while(a>0 && text[a]!='"') a--;
        callback((text[a]=='"')?parseInt(text.substring(a+1,b)):-1);
      }
    });*/
    var uri=encodeURIComponent("http://youtube.com/alexlugo");
    $.getJSON("http://whateverorigin.org/get?url="+uri+"&callback=?",function(data){
      var text=data.contents;
      var b=text.indexOf(" subscribers");
      var a=b;
      while(a>0 && text[a]!='"') a--;
      callback((text[a]=='"')?parseInt(text.substring(a+1,b)):-1);
    });
    /*$.ajax({
      type:"GET",
      url:"https://alugocp.github.io/resume",
      headers:{
        "Access-Control-Allow-Origin":"*"
      },
      jsonp:false,
      dataType:"jsonp",
      cache:true,
      crossDomain:true,
      datafilter:function(data){
        return "{}";
      },
      success:function(text){
        var b=text.indexOf(" subscribers");
        var a=b;
        while(a>0 && text[a]!='"') a--;
        callback((text[a]=='"')?parseInt(text.substring(a,b)):-1);
      }
    });*/
    /*var req=new XMLHttpRequest();
    req.onreadystatechange=function(){
      if(this.readyState==1){
        this.setRequestHeader("Access-Control-Allow-Origin","*");
        this.send();
      }else if(this.readyState==4){
        console.log(this.status);
      }
    }
    req.open("GET","http://alexlugo.net",true);*/
  }
}
