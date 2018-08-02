$(".lodr-startup img").attr("src",colors.profile);
$("#profile").attr("src",colors.profile);

var site={
  tags:{
    title:function(name){
      return $("<h3>"+name+"</h3>");
    },
    extra:function(id,content){
      return $("<div id='"+id+"' class='collapse'>"+content+"</div>");
    },
    info:function(tag,content){
      var info="<span class='info'>"+tag+": </span>";
      return $("<span>"+info+content+"</br></span>");
    },
    download:function(link){
      var dwnld=$("<a></a>");
      dwnld.html("Download");
      dwnld.addClass("download");
      dwnld.addClass("offset");
      dwnld.attr("href","downloads/"+link);
      dwnld.click(function(e){
        e.preventDefault();
        window.location.href=dwnld.attr("href");
      });
      return dwnld;
    },
    offset:function(html){
      var offset=$("<span></span>");
      offset.addClass("offset");
      offset.html(html);
      return offset;
    },
    more:function(id){
      var m=$("<a class='more'>View more</a>");
      m.attr("data-target","#"+id);
      m.attr("data-toggle","collapse");
      m.click(function(){
        if($(this).html()=="View more"){
          $(this).html("View less");
        }else{
          $(this).html("View more");
        }
      });
      return m;
    }
  },
  entry:function(data,index){
    var row=$("<div class='row'></div>");
    var text=$("<div class='col-lg-6'></div>");
    var images=$("<div class='col-lg-6'></div>");
    row.append(text,images);
    text.append(site.tags.title($(data.find("title")[0]).html()));
    var dwnld=data.find("download");
    if(dwnld.length==1){
      text.append(site.tags.download($(dwnld[0]).html()));
    }
    var off=data.find("offset");
    if(off.length==1){
      text.append(site.tags.offset($(off[0]).html()));
    }
    var infoSet=data.find("info");
    if(infoSet.length>0){
      for(var a=0;a<infoSet.length;a++){
        var i=$(infoSet[a]);
        text.append(site.tags.info(i.attr("label"),i.html()));
      }
    }
    var summary=data.find("summary");
    var full=data.find("full");
    if(summary.length==0 && full.length==0){
      text.append("Coming soon...");
    }else{
      if(summary.length==1){
        text.append($(summary[0]).html());
      }
      if(full.length==1){
        if(summary.length==0){
          text.append($(full[0]).html());
        }else{
          var id="entry"+index;
          text.append(site.tags.extra(id,$(full[0]).html()));
          text.append(site.tags.more(id));
        }
      }
    }
    var img=data.find("image");
    if(img.length==1){
      var image=$("<img class='content' src='images/"+$(img[0]).attr("src")+"'></img>");
      if($(img[0]).attr("height")!=undefined){
        image.attr("height",$(img[0]).attr("height")+"px");
      }
      images.append(image);
    }else{
      var icon=data.find("icon");
      if(icon.length==1){
        images.append($("<img class='icon' src='icons/"+$(icon[0]).attr("src")+"'></img>"));
      }
    }
    return row;
  },
  toId:function(input){
    input=input.toLowerCase();
    var a=0;
    while(a<input.length){
      if(input.charAt(a)==" "){
        input=input.substring(0,a)+input.substring(a+1,input.length);
      }else{
        a++;
      }
    }
    return input;
  },
  loadContent:function(section){
    $("#content").children().each(function(){
      $(this).hide();
    });
    $("#heading").html("<h1>"+section+"</h1>");
    $("#"+site.toId(section)).show();
  },
  setupContent:function(){
    $.get("resumeInfo.xml",null,function(data){
      data=$(data.children[0]);
      var index=0;
      data.children().each(function(){
        var section=$("<span></span>");
        section.attr("id",site.toId($(this).attr("name")));
        $(this).children().each(function(){
          section.append(site.entry($(this),index));
          index++;
        });
        section.hide();
        $("#content").append(section);
      });
      site.loadContent("Biography");
      setTimeout(Lodr.display,300);
    });
  },
  setSections:function(){
    $.get("resumeInfo.xml",null,function(data){
      data=$(data.children[0]);
      data.children().each(function(){
        $("#list").append($("<a class='list-group-item'>"+$(this).attr("name")+"</a>"));
      });
      $("a.list-group-item").click(function(){
        site.loadContent($(this).html());
      });
    })
  },
  setSidebarHeight:function(){
    $("#sidebar").height(window.innerHeight);
  }
}

// initialization
$("#menu").click(function(){
  $("#sidebar").toggleClass("active");
  var margin=$("#sidebar-margin");
  if(margin.css("width")=="200px"){
    margin.css("width","0px");
  }else{
    margin.css("width","200px");
  }
});
$(window).resize(function(){
  site.setSidebarHeight();
});
site.setSections();
site.setSidebarHeight();
site.setupContent();
