/* ------------ 全局变量 ------------- */
var allFudaSet;         //保存全部花牌的数组
var exFudaIndexSet;        //保存练习用的取牌数组
var currentExFudaIndex;    //当前练习的花牌的索引
var currentSelectedFudaIndex;    //练习时鼠标所选的取牌

//TODO: 设置可更改组数
var totalYomiFuda = 10; //每次猜测10组
var totalToriFuda = 6;  //每组有6张候选花牌

//TODO: 避免chance设置为全局变量
var chance = 2;         //每组有两次机会 tried

var point = 0;          //分数
var pointHistory = [];  //历史分数记录


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
var currentPointArea = $("currentPoint");
//var remainFudaCountArea = document.getElementById("remainFudaCount");
//
//var currentFudaInfoArea = document.getElementById("currentFudaInfo");
//
//var fudaHistoryArea = document.getElementById("fudaHistory");
//var pointHistoryArea = document.getElementById("pointHistory");


/* ----------- 功能函数 ------------- */

// 生成练习用的花牌
function initExFudaSet(n) { //n: 要猜几组
    var request = getHTTPObject();
    var url = "fuda.json";

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var fudaSet = JSON.parse(request.responseText);
            if(fudaSet) {
                var selectedFudaIndex = randomArray(100, n); //从100张花牌中取出n张花牌的下标
                //var selectedFudaSet = []; //存放要取出的花牌
                //for (var i = 0; i < selectedFudaIndex.length; i++) {
                //    selectedFudaSet.push(fudaSet.fuda[selectedFudaIndex[i]]); //selectedFudaIndex中存放的是下标,根据其值将tori数组中对应的内容存入selectedFudaSet
                //}
                //测试用
                //for (var i = 0; i < selectedFudaSet.length; i++) {
                //    alert(selectedFudaSet[i].toriContent);
                //}
                allFudaSet = fudaSet; //全部花牌
                //alert("产生新的 exFudaIndexSet");
                exFudaIndexSet = selectedFudaIndex; //练习用的n组花牌的index
                console.log("exFudaIndexSet: " + exFudaIndexSet);
                //重置分数
                point = 0;
                //重置剩余组数 即当前所指的Index
                currentExFudaIndex = 0; //定位到n个花牌组成的数组中的第一张
                //重置猜测机会数
                chance = 2;
                //选择花牌组中的第一项, index=0
                currentFudaExercise(currentExFudaIndex);
            }
        }
    };
    request.open("GET", url, true);
    request.send();
}


// 获取混淆用的取牌,和正确答案一起组成数组,返回花牌的索引值组成的数组
function getToriFudaIndex(fudaIndex) { //Index是在exFudaIndexSet中的索引
    var currentFudaIndex = exFudaIndexSet[fudaIndex]; //取得在全部花牌中的索引位置
    console.log("当前花牌在总花牌中的位置 currentFudaIndex: " + currentFudaIndex);
    var toriFudaIndex = randomArray(100, totalToriFuda);
    console.log("随机取出的花牌索引数组: " + toriFudaIndex);
    for (var i = 0; i < toriFudaIndex.length; i++) {
        if(toriFudaIndex[i] === currentFudaIndex) {
            return toriFudaIndex; //如果随机所取花牌已包含当前练习的花牌,则直接返回
        }
    }
    var randomIndex = Math.floor(Math.random() * totalToriFuda);
    //alert(randomIndex);
    toriFudaIndex.splice(randomIndex, 1, currentFudaIndex); //如果不包含当前练习的花牌,则随机取一位,用当前花牌替换
    console.log("将显示的取牌数组: "+ toriFudaIndex);
    return toriFudaIndex;
}

//生成当前读牌取牌并显示
function currentFudaExercise(fudaIndex) {
    currentPointArea.innerText = point;
    //显示读牌
    displayYomiFuda(fudaIndex);
    //显示取牌数组
    displayToriFuda(getToriFudaIndex(fudaIndex));
    //addEventListener
    var toriFuda = document.getElementsByClassName("fuda-tori");
    for (var i = 0; i < toriFuda.length; i++) {
        if(toriFuda[i]) {
            toriFuda[i].addEventListener("click", isCorrectFuda);
        }
    }
}

//显示新一组练习
function nextItem() {
    //判断当前剩余组数 也就是当前index是否在最后
    console.log("当前指针位置: " + currentExFudaIndex);
    console.log("总练习数目: " + totalYomiFuda);
    if (currentExFudaIndex === totalYomiFuda - 1) { //如果为零
        //当前分数存入历史分数记录数组
        pointHistory.push(point);
        alert(totalYomiFuda + "组练习已结束,将重新开始练习");
        //newExercise(totalYomiFuda);
        initExFudaSet(totalYomiFuda);
    } else {
        //如果不为零
        //选择花牌组中的新一项 //TODO:指示进行到哪一项的变量
        chance = 2;
        currentExFudaIndex++;
        currentFudaExercise(currentExFudaIndex);
    }
}

//TODO: 为正确和错误的牌面显示边缘的动画效果
function isCorrectFuda() {
    console.log("判断前剩余机会: " + chance);
    chance--;
    console.log("判断前减一后剩余机会: " + chance);
    var currentSelectedFudaId = this.getAttribute("id");
    var findIndex = currentSelectedFudaId.indexOf("-");
    currentSelectedFudaIndex = parseInt(currentSelectedFudaId.slice(findIndex + 1)) - 1;
    //判断是否对应正确答案
    //先判断,后减少chance值
    console.log("现在选择的Fuda的id: " + currentSelectedFudaIndex);
    console.log("正确答案里fuda的id的 " + exFudaIndexSet[currentExFudaIndex]);
    if(currentSelectedFudaIndex === exFudaIndexSet[currentExFudaIndex]) {
        //判断chance
        if (chance === 1) {
            point += 10;
        } else if (chance === 0) {
            point += 5;
        }
        nextItem();
    } else if (chance === 0) {
        nextItem();
    } else {
        this.parentNode.style.border = "4px solid #fe0000";
    }
    console.log("判断后剩余机会: " + chance);
}

/* ------------- 显示 --------------- */

// 显示读牌
function displayYomiFuda(fudaIndex) {
    var yomiFudaArea = document.getElementById("yomiArea");
    var child = document.getElementById("yomiFuda");
    if (child) {
        yomiFudaArea.removeChild(child);
    }
    var yomiH3 = document.createElement("h3");
    yomiH3.setAttribute("id","yomiFuda");
    //alert("选择了10组将要练习的牌: " + exFudaIndexSet);
    var yomiFudaIndex = exFudaIndexSet[fudaIndex]; //Index是在exFudaIndexSet中的索引
    console.log("要显示的读牌: " + yomiFudaIndex);
    var yomiText = allFudaSet["fuda"][parseInt(yomiFudaIndex)]["yomi"];
    var yomiPart = yomiText.split(" ");
    //alert(yomiText);
    //var yomiFudaArea = document.createElement("div");
    //yomiFudaArea.setAttribute("id", "yomiArea");

    //var yomiFudaText = document.createTextNode(yomiText);
    //yomiH3.appendChild(yomiFudaText);

    var yomiPart1 = document.createElement("span");
    var yomiPart2 = document.createElement("span");
    var yomiPart3 = document.createElement("span");

    //yomiPart1.setAttribute("id","yomi-part-1");
    //yomiPart2.setAttribute("id","yomi-part-2");
    //yomiPart3.setAttribute("id","yomi-part-3");

    var yomiPart1Text = document.createTextNode(yomiPart[0]);
    var yomiPart2Text = document.createTextNode(yomiPart[1]);
    var yomiPart3Text = document.createTextNode(yomiPart[2]);

    yomiPart1.appendChild(yomiPart1Text);
    yomiPart2.appendChild(yomiPart2Text);
    yomiPart3.appendChild(yomiPart3Text);

    yomiH3.appendChild(yomiPart1);
    yomiH3.appendChild(yomiPart2);
    yomiH3.appendChild(yomiPart3);

    yomiFudaArea.appendChild(yomiH3);
    return yomiFudaArea;
}

// 显示单张牌面
function displaySingleFuda(fuda) {
    var fudaId = fuda.id; //获取花牌编号
    var fudaContent = fuda["tori"]; //获取花牌内容
    var spaceIndex = fudaContent.indexOf(" "); //获取花牌语句中空格的位置

    //分割花牌语句为三部分,以便在牌面上显示
    var fudaBegin = fudaContent.substr(0, 5); //显示在最右的第一"行"
    var fudaMiddle = fudaContent.substring(5, spaceIndex) + fudaContent.substring(spaceIndex + 1, 11); //将空格前后的内容连接起来显示
    var fudaEnd = fudaContent.slice(11);


    var fudaCard = document.createElement("div");
    fudaCard.setAttribute("class", "fuda-text fuda-tori");
    fudaCard.setAttribute("id", "fuda-" + fudaId);

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

    //为实现垂直居中增加的空div
    var specialArea = document.createElement("div");
    specialArea.setAttribute("class","special-area");
    fudaCard.appendChild(specialArea);

    fudaCard.appendChild(fudaR);
    fudaCard.appendChild(fudaM);
    fudaCard.appendChild(fudaL);

    return fudaCard;
}

//显示取牌牌组
function displayToriFuda(fudaIndexSet) { //传入取牌数组中花牌对应的id组成的数组
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
        var fuda = allFudaSet["fuda"][fudaIndexSet[i]];
        var singleFudaArea = document.createElement("div");
        singleFudaArea.setAttribute("class", "fuda-area");
        singleFudaArea.setAttribute("id", "fuda-area-"+allFudaSet["fuda"][fudaIndexSet[i]].id);
        //为实现垂直居中增加的空div
        var specialArea = document.createElement("div");
        specialArea.setAttribute("class","special-area");
        singleFudaArea.appendChild(specialArea);

        var singleFuda = displaySingleFuda(fuda);
        singleFudaArea.appendChild(singleFuda);


        var fudaNumber = fuda["id"];

        var fudaN = document.createElement("span");
        fudaN.setAttribute("class", "fuda-num");
        var fudaNumText = document.createTextNode(fudaNumber);
        fudaN.appendChild(fudaNumText);

        singleFudaArea.appendChild(fudaN);

        toriFudaWrapArea.appendChild(singleFudaArea);
    }

    toriFudaArea.appendChild(toriFudaWrapArea);
    return toriFudaArea;
}

//重新开始按钮开始新练习
var newExerciseButton = $("new");
newExerciseButton.addEventListener("click", function() {
    //newExercise(totalYomiFuda);
    initExFudaSet(totalYomiFuda);
});

//addLoadEvent(newExercise(totalYomiFuda));
addLoadEvent(initExFudaSet(totalYomiFuda));


/* ------------ 基础函数 ------------- */

//随页面加载事件
function addLoadEvent (func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

//产生随机数组序列
function randomArray(total, range) {
    var totalArray = [];               //存放将随机取出的花牌数组的下标,如果total=10,则存放0,1,2,3,...,9;
    var rangeArray = [];               //存放随机后乱序的下标,如5,3,7,2,...,9;

    for (var i = 0; i < total; i++) {
        totalArray.push(i);
    }

    var randomNumber;                  //随机数
    var randomRange = total;           //随机序列范围 / 随机数组大小

    for (var j = 0; j < range; j++) {
        randomNumber = Math.floor(Math.random() * randomRange); //如果total = 100, 则随机数范围为 0-99
        rangeArray.push(totalArray[randomNumber]);              //将随机出的数组下标放入;
        totalArray.splice(randomNumber, 1);                     //将随机出的数组下标删除,避免再次被选出
        randomRange -= 1;                                       //由于删除一个数,随机数组的大小也相应减一
    }
    //返回乱序的数组下标,以便后续从花牌中按照下标取出数组内容
    return rangeArray;
}


function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined") {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(e) {}
        return false;
    }
    return new XMLHttpRequest();
}

//function hasClass(elem, className) {
//    var classNames = elem.className.split(' ');
//    for(var i = 0; i < classNames.length; i++) {
//        if(classNames[i] == className) {
//            return true;
//        }
//    }
//    return false;
//}


function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        var classList = [];
        var allElements = document.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].className.indexOf(classname) != -1) {
                classList[classList.length] = allElements[i];
            }
        }
        return classList;
    }
}

function $(elem) {
    if (elem.charAt(0) === "#") {
        elem.splice(0, 1);
        return document.getElementById(elem);
    } else if (elem.charAt(0) === ".") {
        elem.splice(0, 1);
        return getElementsByClassName(document, elem);
    } else {
        return document.getElementsByTagName(elem);
    }
}