// 初始化總和陣列
  var sum = [0,0,0,0,0,0]
//讀取資料庫
  MoneyCollection.load(function(){
      $("table#commenttable tbody").text("");
//設定資料格式
      var result= MoneyCollection.find(
        { },
        { $orderBy: {date:-1},$limit: 10}
        );
//列印資料
      for(var i=0;i<result.length;i++){
        var commentdata="<tr><td>"+result[i].name+"</td><td>"+result[i].type+"</td><td>"+result[i].number+"</td><td>"+result[i].date+"</tr>"
        $("table#commenttable tbody").append(commentdata);
//計算總和
        switch(result[i].type){
          case "食":
            this.sum[0] = this.sum[0] + result[i].number/1
            break;
          case "飲":
            this.sum[1] = this.sum[1] + result[i].number/1
            break;
          case "行":
            this.sum[2] = this.sum[2] + result[i].number/1
            break;
          case "育":
            this.sum[3] = this.sum[3] + result[i].number/1
            break;
          case "樂":
            this.sum[4] = this.sum[4] + result[i].number/1
            break;
          default:
            this.sum[5] = this.sum[5] + result[i].number/1
            break;
        }
      };
//畫圖
      drawMyChart(this.sum,"default")
    });  


  function drawMyChart(sum,type){
    document.getElementById("canvas1").getContext("2d").clearRect(0,0,350,350);
    if(!!document.createElement('canvas').getContext){ 
      var mychart = new AwesomeChart('canvas1');
      mychart.title = "消費總覽";
      mychart.data = [sum[0], sum[1], sum[2], sum[3], sum[4], sum[5]];
      mychart.labels = ["食", "飲", "行", "育", "樂","其他"];
      mychart.chartType = type;
      mychart.draw();
    }
  }

  function changeChart(){
    var random = Math.random()*6
    var type = ""
    if(random>=0&&random<=1){
      type = "default"
    }
    else if(random>=1&&random<=2){
      type = "horizontal bars"
    }
    else if(random>=2&&random<=3){
      type = "pareto"
    }
    else if(random>=3&&random<=4){
      type = "pie"
    }
    else if(random>=4&&random<=5){
      type = "exploded pie"
    }
    else if(random>=5&&random<=6){
      type = "doughnut"
    }
    drawMyChart(sum,type);

  }