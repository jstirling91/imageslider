var images = new Array();
var index = 0;

function loadJSON(){
    var request = new XMLHttpRequest();
    request.open("GET", "Images.json", false);
    request.send(null)
    var objJSON = JSON.parse(request.responseText);
    for(i = 0; i < objJSON.length; i++){
        images[i] = objJSON[i].image;
    }
    if(images.length >= 3){
        var index = images.length - 1;
        var img = document.createElement("img");
        img.src = images[index];
        img.id = 'image' + index;
        img.className = "image";
        img.style.visibility="hidden";
        body.appendChild(img);
        img = document.createElement("img");
        img.src = images[1];
        img.id = 'image' + 1;
        img.className = "image";
        img.style.visibility="hidden";
        body.appendChild(img);

    }
    else if(images.length == 2){
        img = document.createElement("img");
        img.src = images[1];
        img.id = 'image' + 1;
        img.className = "image";
        img.style.visibility="hidden";
        body.appendChild(img);
    }
}

function nextImg(){
    index = (index + 1) % images.length;
//    if(!document.getElementById('image' + index)){
//        var img = document.createElement("img")
//        img.src = images[index];
//        img.id = 'image' + index;
//        img.className = "image";
//        body.appendChild(img);
//        document.getElementById('image' + (index - 1) % images.length).style.visibility="hidden";
//    }
//    else{
        var tempIndex;
        if(index == 0){
            tempIndex = images.length - 1;
        }
        else{
            tempIndex = index - 1;
        }
    console.log("index: " + index);
        document.getElementById('image' + tempIndex).style.visibility="hidden";
        document.getElementById('image' + index).style.visibility="visible";
        if(index < images.length - 1){
            var img = document.createElement("img");
            var temp = index + 1;
            img.src = images[temp];
            img.id = 'image' + temp;
            img.className = "image";
            img.style.visibility="hidden";
            body.appendChild(img);
        }
//    }
   
}

function prevImg(){
    if(index == 0){
        index = images.length - 1;
    }
    else{
        index = index - 1;
    }
    var tempIndex;
    if(index == 0){
        tempIndex = images.length - 1;
    }
    else{
        tempIndex = index - 1;
    }
    console.log("prevImg index: " + index);
    if(!document.getElementById('image' + tempIndex)){
        var img = document.createElement("img");
        var temp = index + 1;
        img.src = images[tempIndex];
        img.id = 'image' + tempIndex;
        img.className = "image";
        img.style.visibility="hidden";
        body.appendChild(img);
    }
    document.getElementById('image' + (index + 1) % images.length).style.visibility="hidden";
    document.getElementById('image' + index).style.visibility="visible";
}