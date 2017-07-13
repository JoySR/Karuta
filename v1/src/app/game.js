function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    
    //save the target's id
    ev.dataTransfer.setData("Text",ev.target.id);
    
    //save the target's classlist
    ev.dataTransfer.setData("Class", ev.target.classList);
    
    //save the target's parent node's id
    ev.dataTransfer.setData("fromParentId", ev.target.parentNode.id);
}

function drop(ev) {
    ev.preventDefault();
    
    //get the 
    var dataText=ev.dataTransfer.getData("Text");
    var dataClass = ev.dataTransfer.getData("Class");
    var fromParentId = ev.dataTransfer.getData("fromParentId");
    
    
    var dataClassList = dataClass.split(" ");
    var memberOf;
    for (var i = 0; i < dataClassList.length; i++){
        if (dataClassList[i] === "fuda-top") {
            memberOf = "top";
        } else if (dataClassList[i] === "fuda-bottom") {
            memberOf = "bottom";
        }
    }
    
    var toParent;    
    if(ev.target.classList.contains("fuda-area")) {
        toParent = ev.target;
    } else if(ev.target.parentNode.classList.contains("fuda-area")){
        toParent = ev.target.parentNode;
    } else if(ev.target.parentNode.parentNode.classList.contains("fuda-area")) {
        toParent = ev.target.parentNode.parentNode;
    }
    
    console.log("toParent = " + toParent);
    
    var toChangeFuda;   
    if(toParent.children[0]) {
        toChangeFuda = toParent.children[0];
    }
    
    
    var noticeText = document.getElementById("notice-area");
        
    if (
        (ev.target.id === fromParentId) ||
        (ev.target.parentNode.id === fromParentId) ||
        (ev.target.parentNode.parentNode.id === fromParentId)
    ) {
        console.log("won't move");
        return false;
    } else if (ev.target.offsetParent.id !== memberOf) {
        noticeText.innerHTML = "<p>You cannot move your fuda to the other area!</p>";
        return false;
    } /*
else if (
        (ev.target.children.length != 0) || 
        (ev.target.className == "fuda-right") ||
        (ev.target.className == "fuda-left") ||
        (ev.target.className == "fuda-middle")  ||
        (ev.target.className == "fuda")
    ) {
        noticeText.innerHTML = "<p>You cannot move your fuda here, because it contains already another one.</p>";
        return false;
    }
*/ else {
//         ev.target.appendChild(document.getElementById(dataText));
        toParent.appendChild(document.getElementById(dataText));
        var fromParent = document.getElementById(fromParentId);
        fromParent.appendChild(toChangeFuda);
        console.log("yes");
    }
}


var yomiFuda = [];
