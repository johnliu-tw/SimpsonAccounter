    var sum = [0,0,0,0,0,0];
    var type = ["食","飲","行","育","樂","其他"];
      
      function searchDetail(){
        var totalPrice =0;
        var query;
 //本月搜尋query建立
        if($("input#thisMonth:checked").length!=0){
            var date = new Date();
            var month = date.getMonth()+1;
            var nextmonth = month+1;
            var year = date.getFullYear(); 
            if(month<10){
                month = "0"+month;
            }
            if(nextmonth<10){
                nextmonth = "0"+nextmonth;
            }
            query={
                date: {
                    "$gt": year+"-"+month+"-0"+1,
                    "$lt": year+"-"+nextmonth+"-0"+1
                }
            }
        }
//選擇的日期區間query建立
        else if($("input#selectMonth:checked").length!=0){
             query={
                date: {
                    "$gt": $("input#startDate").val(),
                    "$lt": $("input#endDate").val()
                }
            }

        }
//本週區間query建立
        else if($("input#thisWeek:checked").length!=0){
            var date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() - new Date().getDay())
            var month = date.getMonth()+1 
            if(month<10){
                month = "0"+month;
            }
            var year = date.getFullYear(); 
            var today = new Date().getDate() 
            var initialDay = date.getDate()
            if(today<10){
                today = "0"+today;
            }
            if(initialDay<10){
                initialDay = "0"+initialDay;
            }
            query={
                date: {
                    "$gt": year+"-"+month+"-"+ initialDay,
                    "$lt": year+"-"+month+"-"+ today
                }
            }
        }
//額外需求設定
        query2 = { $orderBy: {date:-1},$limit: 10};


        var result = MoneyCollection.find(query,query2);
        $("table#commenttable tbody").text("");
        for(var i=0;i<result.length;i++){
            var commentdata="<tr><td>"+result[i].name+"</td><td>"+result[i].type+"</td><td>"+result[i].number+"</td><td>"+result[i].date+"</tr>";
            $("table#timeTable tbody").append(commentdata);
//類別搜尋累積
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
            totalPrice = totalPrice + result[i].number/1
        }
        countTypeTotal(totalPrice);
      }
      function countTypeTotal(totalPrice){
        $("table#commenttable tbody").text("");
        for(var i=0;i<sum.length;i++){
            var commentdata = "<tr><td>"+type[i]+"</td><td>"+sum[i]+"</td><td>"+Math.floor((sum[i]/totalPrice)*100)+"%</td></tr>";
            $("table#typeTable tbody").append(commentdata);
        }
      }