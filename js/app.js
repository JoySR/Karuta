var Karuta = function(yomiCount, toriCount, chance) {
    //TODO: 设置可更改组数
    //TODO: 牌背面给予中文解释, hover 可见
    //TODO: 历史最高分
//compare currentFinalPoint & currentMaxPoint
//→ maxPoint

//TODO: 分组最高分
//选择测试多少组
//10组 20组 30组
//10组 - 最高分
//20组 - 最高分
//...

//TODO: 列出出现过的读札和相应的取札
//var fudaHistory = [];   //测试过的花牌记录
//
    this.totalYomiFuda = yomiCount || 10; //每次猜测10组
    this.totalToriFuda = toriCount || 6; //每组有6张候选花牌
    this.toriChance = chance || 2;

    this.point = 0;          //分数
    this.pointHistory = [];  //历史分数记录

    this.allFudaSet = []; //保存全部花牌的数组
    this.exFudaIndexSet = []; //保存练习用的取牌数组
    this.currentExFudaIndex = 0;    //当前练习的花牌的索引
    this.currentSelectedFudaIndex = 0;    //练习时鼠标所选的取牌

    this.currentPointArea = Util.$("currentPoint");
    this.initExFudaSet(this.totalYomiFuda);
};

// 生成练习用的花牌
Karuta.prototype.initExFudaSet = function(n) { //n: 要猜几组
    var _this = this;
    Util.ajax({
        type: "get",
        url: "fuda.json",
        success: function(response) {
            var fudaSet = response;
            if(fudaSet) {
                var selectedFudaIndex = Util.randomArray(100, n); //从100张花牌中取出n张花牌的下标
                _this.allFudaSet = fudaSet; //全部花牌
                _this.exFudaIndexSet = selectedFudaIndex; //练习用的n组花牌的index
                console.log("exFudaIndexSet: " + _this.exFudaIndexSet);
                //重置分数
                _this.point = 0;
                //重置剩余组数 即当前所指的Index
                _this.currentExFudaIndex = 0; //定位到n个花牌组成的数组中的第一张
                //重置猜测机会数
                _this.toriChance = 2;
                //选择花牌组中的第一项, index=0
                _this.currentFudaExercise(_this.currentExFudaIndex);
            }
        },
        error: function(){
            //TODO: 更为友好的提示
            alert("花牌加载错误, 烦请刷新页面重试");
        }
    });
};


// 获取混淆用的取牌,和正确答案一起组成数组,返回花牌的索引值组成的数组
Karuta.prototype.getToriFudaIndex = function(fudaIndex) { //Index是在exFudaIndexSet中的索引
    var currentFudaIndex = this.exFudaIndexSet[fudaIndex]; //取得在全部花牌中的索引位置
    console.log("当前花牌在总花牌中的位置 currentFudaIndex: " + currentFudaIndex);
    var toriFudaIndex = Util.randomArray(100, this.totalToriFuda);
    console.log("随机取出的花牌索引数组: " + toriFudaIndex);
    for (var i = 0; i < toriFudaIndex.length; i++) {
        if(toriFudaIndex[i] === currentFudaIndex) {
            return toriFudaIndex; //如果随机所取花牌已包含当前练习的花牌,则直接返回
        }
    }
    var randomIndex = Math.floor(Math.random() * this.totalToriFuda);
    toriFudaIndex.splice(randomIndex, 1, currentFudaIndex); //如果不包含当前练习的花牌,则随机取一位,用当前花牌替换
    console.log("将显示的取牌数组: "+ toriFudaIndex);
    return toriFudaIndex;
};

//生成当前读牌取牌并显示
Karuta.prototype.currentFudaExercise = function (fudaIndex) {
    var _this = this;
    this.currentPointArea.innerText = this.point;
    //显示读牌
    this.displayYomiFuda(fudaIndex);
    //显示取牌数组
    this.displayToriFuda(this.getToriFudaIndex(fudaIndex));
    //addEventListener
    var toriFuda = Util.$(".fuda-tori");
    for (var i = 0; i < toriFuda.length; i++) {
        if(toriFuda[i]) {
            toriFuda[i].addEventListener("click", function() {
                var id = this.parentNode.getAttribute("id");
                _this.isCorrectFuda(id, _this, this);
            });
        }
    }
};

//显示新一组练习
Karuta.prototype.nextItem = function () {
    //判断当前剩余组数 也就是当前index是否在最后
    console.log("当前指针位置: " + this.currentExFudaIndex);
    console.log("总练习数目: " + this.totalYomiFuda);
    if (this.currentExFudaIndex === this.totalYomiFuda - 1) { //如果为零
        //当前分数存入历史分数记录数组
        this.pointHistory.push(point);
        alert(this.totalYomiFuda + "组练习已结束,将重新开始练习");
        this.initExFudaSet(this.totalYomiFuda);
    } else {
        //如果不为零
        //选择花牌组中的新一项 //TODO:指示进行到哪一项的变量
        this.toriChance = 2;
        this.currentExFudaIndex++;
        this.currentFudaExercise(this.currentExFudaIndex);
    }
};

//TODO: 为正确和错误的牌面显示边缘的动画效果
Karuta.prototype.isCorrectFuda = function (id, _this, item) {
    console.log("判断前剩余机会: " + _this.toriChance);
    _this.toriChance--;
    console.log("判断前减一后剩余机会: " + _this.toriChance);
    // var currentSelectedFudaId = this.getAttribute("id");
    var currentSelectedFudaId = id;
    var findIndex = currentSelectedFudaId.indexOf("-");
    _this.currentSelectedFudaIndex = parseInt(currentSelectedFudaId.slice(findIndex + 1)) - 1;
    //判断是否对应正确答案
    //先判断,后减少chance值
    console.log("现在选择的Fuda的id: " + _this.currentSelectedFudaIndex);
    console.log("正确答案里fuda的id的 " + _this.exFudaIndexSet[_this.currentExFudaIndex]);
    if(_this.currentSelectedFudaIndex === _this.exFudaIndexSet[_this.currentExFudaIndex]) {
        //判断chance
        if (_this.toriChance === 1) {
            _this.point += 10;
        } else if (_this.toriChance === 0) {
            _this.point += 5;
        }
        _this.nextItem();
    } else if (_this.toriChance === 0) {
        _this.nextItem();
    } else {
        item.parentNode.style.borderColor = "#fe0000";
    }
    console.log("判断后剩余机会: " + _this.toriChance);
};

/* ------------- 显示 --------------- */

// 显示读牌
Karuta.prototype.displayYomiFuda = function(fudaIndex) {
    var yomiFudaArea = Util.$("#yomiArea");
    var child = document.getElementById("yomiFuda");
    if (child) {
        yomiFudaArea.removeChild(child);
    }
    var yomiH3 = document.createElement("h3");
    yomiH3.setAttribute("id","yomiFuda");
    //alert("选择了10组将要练习的牌: " + exFudaIndexSet);
    var yomiFudaIndex = this.exFudaIndexSet[fudaIndex]; //Index是在exFudaIndexSet中的索引
   // console.log("要显示的读牌: " + yomiFudaIndex);
    var yomiText = this.allFudaSet["fuda"][parseInt(yomiFudaIndex)]["yomi"];
    var yomiPart = yomiText.split(" ");


    var yomiPart1 = document.createElement("span");
    var yomiPart2 = document.createElement("span");
    var yomiPart3 = document.createElement("span");

    var yomiPart1Text = document.createTextNode(yomiPart[0]);
    var yomiPart2Text = document.createTextNode(yomiPart[1]);
    var yomiPart3Text = document.createTextNode(yomiPart[2]);


    yomiPart1.innerText = yomiPart[0];
    yomiPart2.innerText = yomiPart[1];
    yomiPart3.innerText = yomiPart[2];

    // yomiPart1.appendChild(yomiPart1Text);
    // yomiPart2.appendChild(yomiPart2Text);
    // yomiPart3.appendChild(yomiPart3Text);
    //
    yomiH3.appendChild(yomiPart1);
    yomiH3.appendChild(yomiPart2);
    yomiH3.appendChild(yomiPart3);

    //TODO: IE下失败
    yomiFudaArea.appendChild(yomiH3);

    return yomiFudaArea;
};

// 显示单张牌面
Karuta.prototype.displaySingleFuda = function (fuda) {
    var fudaId = fuda.id; //获取花牌编号
    var fudaContent = fuda["tori"]; //获取花牌内容
    var spaceIndex = fudaContent.indexOf(" "); //获取花牌语句中空格的位置

    //分割花牌语句为三部分,以便在牌面上显示
    var fudaBegin = fudaContent.substr(0, 5); //显示在最右的第一"行"
    var fudaMiddle = fudaContent.substring(5, spaceIndex) + fudaContent.substring(spaceIndex + 1, 11); //将空格前后的内容连接起来显示
    var fudaEnd = fudaContent.slice(11);


    var fudaCard = document.createElement("div");
    fudaCard.setAttribute("class", "fuda-tori");

    var fudaR = document.createElement("span");
    fudaR.setAttribute("class", "fuda-right");
    var fudaRightText = document.createTextNode(fudaBegin);
    fudaR.appendChild(fudaRightText);

    var fudaM = document.createElement("span");
    fudaM.setAttribute("class", "fuda-middle");
    var fudaMiddleText = document.createTextNode(fudaMiddle);
    fudaM.appendChild(fudaMiddleText);

    var fudaL = document.createElement("span");
    fudaL.setAttribute("class", "fuda-left");
    var fudaLeftText = document.createTextNode(fudaEnd);
    fudaL.appendChild(fudaLeftText);

    fudaCard.appendChild(fudaR);
    fudaCard.appendChild(fudaM);
    fudaCard.appendChild(fudaL);

    return fudaCard;
};

//显示取牌牌组
Karuta.prototype.displayToriFuda = function (fudaIndexSet) { //传入取牌数组中花牌对应的id组成的数组
    //var toriFudaArea = document.createElement("div");
    //toriFudaArea.setAttribute("id", "toriArea");
    var toriFudaArea = document.getElementById("toriArea");
    var child = document.getElementById("toriFudaWrapArea");
    if (child) {
        toriFudaArea.removeChild(child);
    }
    var toriFudaWrapArea = document.createElement("div");
    toriFudaWrapArea.setAttribute("id","toriFudaWrapArea");

    for(var i = 0; i < fudaIndexSet.length; i++) {
        var fuda = this.allFudaSet["fuda"][fudaIndexSet[i]];
        var singleFudaArea = document.createElement("div");
        singleFudaArea.setAttribute("class", "fuda");
        singleFudaArea.setAttribute("id", "fuda-"+ this.allFudaSet["fuda"][fudaIndexSet[i]].id);

        var singleFuda = this.displaySingleFuda(fuda);
        singleFudaArea.appendChild(singleFuda);

        var fudaNumber = fuda["id"];

        var fudaN = document.createElement("span");
        fudaN.setAttribute("class", "fuda-num");
        var fudaNumText = document.createTextNode(fudaNumber);
        fudaN.appendChild(fudaNumText);

        singleFudaArea.appendChild(fudaN);

        toriFudaWrapArea.appendChild(singleFudaArea);
    }

    //TODO IE下报错
    toriFudaArea.appendChild(toriFudaWrapArea);
    return toriFudaArea;
};

//重新开始按钮开始新练习
Util.addEvent(Util.$("#new"), "click", function() {
    //newExercise(totalYomiFuda);
    new Karuta(10, 6, 2);
});

//addLoadEvent(newExercise(totalYomiFuda));
Util.addLoadEvent(new Karuta(10, 6, 2));