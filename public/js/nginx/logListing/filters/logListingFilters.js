angular.module('logAggregator')
.filter('sizeFilter',function() {
  return function(input){
    size=parseInt(input)/8;
    if (size>1000 && size<1000000) {
      size = parseFloat(size)/1000;
      size = (size).toFixed(2)+ " KB" ;
    }
    else if (size<1000) {
      size = size + " B" ;
    }
    else if (size>1000000) {
      size = parseFloat(size)/1000000;
      size = (size).toFixed(2)+ " MB" ;
    }
    return size;
  }//close fn input
})
.filter('agentFilter',function(){
  return function(input){
    temp = input;
    title = "";
    if(temp.indexOf("Chrome") != -1)
    {
      title = "Chrome";
    }
    else if (temp.indexOf("Safari") != -1)
    {
      title = "Safari";
    }
    else if (temp.indexOf("Trident") != -1)
    {
      title = "IE";
    }
    else if (temp.indexOf("Vagrant") != -1)
    {
      title = "Others";
    }
    else if (temp.indexOf("Opr") != -1)
    {
      title = "Opera";
    }
    else if (temp.indexOf("-") != -1)
    {
      title = "Others";
    }
    else
    {
      title = "Mozilla";
    }
    return title;
  }
});
