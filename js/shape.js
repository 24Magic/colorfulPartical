function Shape (data) {
    this.x = data.x
    this. y = data.y
    this.g = data.g
    this.durVal = data.durVal
    this.r = data.r
    this.grid = data.grid || 10
    this.size = data.size
    this.text = data.text
    this.context = data.context
    this.W = data.W
    this.H = data.H
    this.points = []
}

Shape.prototype.getData = function () {
    this.context.textAlign = "center"
    this.context.font = this.size + "px Arial"
    this.context.fillText(this.text, this.x, this.y)

    // * 复制画布上指定矩形的像素数据
    let _data =  this.context.getImageData(0, 0, this.W, this.H)
    for (let i = 0; i < this.H; i += this.grid) {
        for (let j = 0; j < this.W; j += this.grid) {
            let alpha = _data.data[(i * W + j) * 4 + 3]
            if (alpha) {
                let partical = new Partical(j, i, this.context, this.g, this.durVal, this.r)
                this.points.push(partical)
            }
        }
    }

}
