var comicFrame = document.getElementById("comicFrame");

var frame1 = document.getElementById("frame1");
var frame2 = document.getElementById("frame2");
var frame3 = document.getElementById("frame3");


function getNewComic() {
    
    var id1 = Math.floor(Math.random()*30)+1;
    var id2 = Math.floor(Math.random()*30)+1;
    var id3 = Math.floor(Math.random()*30)+1;
    
    console.log(id1 + " " + id2 + " " + id3);
    
    frame1.setAttribute("src", "frames/1/" + id1 + ".png");
    frame2.setAttribute("src", "frames/2/" + id1 + ".png");
    frame3.setAttribute("src", "frames/3/" + id3 + ".png");
}