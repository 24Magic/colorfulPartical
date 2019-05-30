window.onload = function() {
    start()
}

const message = document.querySelector('#message')
const gravity = document.querySelector('#gravity')
const duration = document.querySelector('#duration')
const speed = document.querySelector('#speed')
const radius = document.querySelector('#radius')
const resolution = document.querySelector('#resolution')

let text = message.value
let oldText = ''
let newPoints = []
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const offScreenCanvas = document.createElement('canvas')
const offScreenCanvasContext = offScreenCanvas.getContext('2d')
const W = canvas.width = window.innerWidth
const H = canvas.height = window.innerHeight
offScreenCanvas.width = W
offScreenCanvas.height = H

function clear () {
    context.clearRect(0, 0, W, H)
    offScreenCanvasContext.clearRect(0, 0, W, H)
}
function start(newText, g, durVal, r, grid, type) {
    let startX = [], 
        startY = []
    let data = {
        x: W / 2,
        y: H / 2,
        size: 200,
        text: text,
        context: offScreenCanvasContext,
        W: W,
        H: H,
        g: g,
        durVal: durVal,
        r: r,
        grid: grid
    }
    if (newText) {
        data.text = newText
    }
    let word = new Shape(data)
    word.getData()
    newPoints = word.points;
    (function draw () {
        clear()
            // ! 从第一帧开始将text每个像素点画到画布上
        for (let i = 0; i < newPoints.length; i ++) {
            
            // * 获取text内第i个像素点的坐标信息
            let partical = newPoints[i]
        
            // * 从某个随机点加速运动到目标点targetX，targetY过程中，nowLocation的坐标
            let axis = partical.step(startX[i], startY[i])
            // * 半径变化效果
            
            partical.changeRadius()
            // * 将该像素点i画到画布上
            if (type == 'rect') {
                partical.drawRect(axis.x, axis.y)
            } else {
                partical.drawBall(axis.x, axis.y)
            }
        }
        context.drawImage(offScreenCanvas, 0, 0, W, H)
        raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {window.setTimeout(callback)}
        setTimeout(()=>{
            raf.call(window, draw)
        }, 1000/60)
    }())
    if (!newText) {
        startX = []
        startY = []
    }
    oldText = newText
    data.text = oldText
    let oldWord = new Shape(data)
    oldWord.getData()
    oldPoints = oldWord.points
    // * 将前一个text的像素点坐标作为下一个text的起始坐标
    for (let i = 0; i < oldPoints.length; i ++) {
        startX.push(oldPoints[i].targetX)
        startY.push(oldPoints[i].targetY)
    }
}



