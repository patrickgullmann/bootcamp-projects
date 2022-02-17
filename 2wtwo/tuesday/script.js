var box = document.getElementsByClassName("div")[0];

//ggf document weil wenn box dann hört box auf zu folgen falls wir maus zu schnell bewegen!!!
document.addEventListener("mousemove", function (e) {
    console.log(e);
    box.style.top = e.clientY - 50 + "px"; //offsetHight/2
    box.style.left = e.clientX - 50 + "px"; //offsetWidth/2
    //e.target.style.backgroundColor = "blue"; target ist der body!! nicht box da sibling
});

//I just need one higher thing that my mouse does not leave e.g. document.body would also work!!!
//BUT NOTICE: in css file I have to make a big body bc by default there will be nothing
