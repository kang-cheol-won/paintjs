const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("JsMode")
const saveBtn = document.getElementById("JsSave");


const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPaingting(){
    painting = false;
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();

    }
}
//캔버스 클릭했을때 페인팅은 시작한다팔ㅇㅅ




function handleColorClck(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRangeChange(event){
   const size = event.target.value;
   ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
    }

}

function handleCanvasClick(){
    if (filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE );
    }
}
function handleCM(event){
    event.preventDefault()   //이건 우클릭 방지
}
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image
    link.download = "PaintJS"
    link.click();
 
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPaingting);
    canvas.addEventListener("mouseleave", stopPaingting);
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}


//나는 전체 운도우에서 자료를 얻고싶은게 아니야 나는 내캔버스 좌표만 있으면돼
//offset만필요해 ㄱ래서 


Array.from(colors).forEach(color => color.addEventListener("click",handleColorClck))

    //color 를 potato로 바꿔도 작동함 

if(range){
    range.addEventListener("input", handleRangeChange) 
}

if(mode){
    mode.addEventListener("click",handleModeClick)
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}