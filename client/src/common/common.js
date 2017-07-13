module.exports = {

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
    const request = this.getHTTPObject();
    if (request) {
      let data = "";
      if(opts.data) {
        for (let key in opts.data) {
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
          const response = JSON.parse(request.responseText);
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

  //产生随机数组序列
  randomArray(total, range) {
    const totalArray = []; //存放将随机取出的花牌数组的下标
    const rangeArray = []; //存放随机后乱序的下标

    for (let i = 0; i < total; i++) {
      totalArray.push(i);
    }

    let randomNumber;         //随机数
    let randomRange = total;  //随机序列范围 / 随机数组大小

    for (let j = 0; j < range; j++) {
      randomNumber = Math.floor(Math.random() * randomRange); //如果total = 100, 则随机数范围为 0-99
      rangeArray.push(totalArray[randomNumber]); //将随机出的数组下标放入;
      totalArray.splice(randomNumber, 1); //将随机出的数组下标删除,避免再次被选出
      randomRange -= 1; //由于删除一个数,随机数组的大小也相应减一
    }
    //返回乱序的数组下标,以便后续从花牌中按照下标取出数组内容
    return rangeArray;
  },

  initFudaSet(n) {
    return this.randomArray(100, n);
  },

  initToriFudaSet(fudaIndex, n) {
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
