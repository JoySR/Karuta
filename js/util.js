var Util = (function() {
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

    function addEvent(node, type, handler) {
        if (!node) return false;
        if (node.addEventListener) {
            node.addEventListener(type, handler, false);
            return true;
        } else if (node.attachEvent) {
            node.attachEvent('on' + type, handler);
            return true;
        }
        return false;
    }

//产生随机数组序列
    function randomArray(total, range) {
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
        return rangeArray;
    }

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
            elem = elem.substr(1);
            return document.getElementById(elem);
        } else if (elem.charAt(0) === ".") {
            elem = elem.substr(1);
            return getElementsByClassName(document, elem);
        } else {
            return document.getElementsByTagName(elem);
        }
    }

    function getHTTPObject() {
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
    }

    function ajax(opts){
        var request = getHTTPObject();
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
    }

    return {
        addLoadEvent: addLoadEvent,
        addEvent: addEvent,
        randomArray: randomArray,
        getElementsByClassName: getElementsByClassName,
        $ : $,
        getHTTPObject: getHTTPObject,
        ajax: ajax
    }
}());