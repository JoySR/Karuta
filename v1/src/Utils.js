const SERVER_URL = "http://127.0.0.1:3000";

module.exports = {

  addEvent(node, type, handler) {
    if (!node) return false;
    if (node.addEventListener) {
      node.addEventListener(type, handler, false);
      return true;
    } else if (node.attachEvent) {
      node.attachEvent('on' + type, handler);
      return true;
    }
  },

  //产生随机数组序列
  randomArray(total, range) {
    var totalArray = [];               //存放将随机取出的花牌数组的下标
    var rangeArray = [];               //存放随机后乱序的下标

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
    console.log("rangeArray", rangeArray);
    return rangeArray;
  },

  getElementsByClassName(node, classname) {
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
  },

  $(elem) {
    if (elem.charAt(0) === "#") {
      elem = elem.substr(1);
      return document.getElementById(elem);
    } else if (elem.charAt(0) === ".") {
      elem = elem.substr(1);
      return this.getElementsByClassName(document, elem);
    } else {
      return document.getElementsByTagName(elem);
    }
  },

  getHTTPObject() {
    if (typeof XMLHttpRequest === "undefined") {
      try { return new ActiveXObject("Msxml.2.XMLHTTP.6.0"); }
      catch (e) {}
      try { return new ActiveXObject("Msxml.2.XMLHTTP.3.0"); }
      catch (e) {}
      try { return new ActiveXObject("Msxml.2.XMLHTTP.6.0"); }
      catch (e) {}
      return false;
    }
    return new XMLHttpRequest();
  },

  ajax(opts){
    var request = this.getHTTPObject();
    if (request) {
      var data = "";
      if(opts.data) {
        for (var key in opts.data) {
          data += key + "=" + opts.data[key] + "&";
        }
        data = data.substr(0, data.length-1);
      }
      if (opts.type.toLowerCase() === "get") {
        request.open(opts.type, opts.url + "?" + data, true);
        request.send();
      } else if (opts.type.toLowerCase() === "post") {
        request.open(opts.type, opts.url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
      }
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          var response = JSON.parse(request.responseText);
          opts.success(response);
        }
        if (request.readyState === 4 && request.status === 404) {
          opts.error();
        }
      }
    } else {
      return false;
    }
  },

  // 生成任意范围的随机数
  getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  },

  // 生成任意范围的随机整数, 包括 min 和 max
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // 生成随机字符串
  getRandomStr(len) {
    var strList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    var str = '';
    for (var i=0; i < len; i++) {
      var randIndex = Math.floor(Math.random() * strList.length); // 随机索引值
      str += strList.substring(randIndex, randIndex + 1); // 获取所对应的值
    }
    return str;
  },


  generateFudaSet(n) {

  },

  generateToriFudaSet(fudaIndex, n) {
    const randomFudaIndexList = this.randomArray(100, n);
    for (let i = 0; i < randomFudaIndexList.length; i++) {
      if(randomFudaIndexList[i] === fudaIndex) {
        return randomFudaIndexList; //如果随机所取花牌已包含当前练习的花牌,则直接返回
      }
    }
    const randomIndex = Math.floor(Math.random() * n);
    randomFudaIndexList.splice(randomIndex, 1, fudaIndex); //如果不包含当前练习的花牌,则随机取一位,用当前花牌替换
    return randomFudaIndexList;
  }
};
