var colors={
  colorize:function(palette){
    colors.palette=palette;
    var style=$(":root")[0].style;
    style.setProperty("--primary-color",colors.palette[0]);
    style.setProperty("--secondary-color",colors.palette[1]);
    style.setProperty("--lighter-secondary",colors.palette[2]);
  },
  seasonal:function(month){
    if(month==11 || month<3){// December - March
      colors.colorize(["#6d82a3","#0544a8","#a0c4ff"]);
      colors.profile="images/profile.png";
    }else if(month>=3 && month<=6){// April - July
      colors.colorize(["seagreen","maroon","pink"]);
      colors.profile="images/profile1.png";
    }else if(month>6 && month<11){// August - November
      colors.colorize(["#a32f2f","#db2215","#f98b84"]);
      colors.profile="images/profile2.png";
    }
    $("#profile").attr("src",colors.profile);
  },
  original:function(){
    colors.colorize(["seagreen","maroon","pink"]);
    colors.profile="images/profile1.png";
  },
  purple:function(){
    colors.colorize(["#70049f","#8b0fc1","#d977ff"]);
    colors.profile="images/profile-youtube.png";
  }
}
//colors.seasonal(new Date().getMonth());
//colors.original();
colors.purple();
