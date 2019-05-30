# colorfulPartical
A colorful partical for canvas

# How to use
`git clone xxx`
open `index.html` with your browser

#### main code

获取text像素点坐标信息
`./js/shape.js`

使用canvas的`getImageData`API获取画布上像素点的信息，这是一个8位无符号数组。通过对canvas宽高每个像素点的遍历可以获取这个数组每个元素的信息

```
for (let i = 0; i < this.H; i += this.grid) {
        for (let j = 0; j < this.W; j += this.grid) {
            let alpha = _data.data[(i * W + j) * 4 + 3]
            if (alpha) {
                let partical = new Partical(j, i, this.context, this.g, this.durVal, this.r)
                this.points.push(partical)
            }
        }
    }
```
每个像素点由4位数组元素组成，即r,g,b,a;他们的值范围在0~255之间。由此可以通过判断每个像素点`alpha`的值即`a`是否存在，遍历出我们需要的文字的每个像素点的坐标值，即上面代码中的(j, i)，接下来就由我们的粒子函数对其进行处理。

粒子处理函数
`./js/partical.js`

根据获取的目标点坐标信息`targetX, targetY`计算一个对应的随机起点`startX, startY`,接下来通过三角函数的有关公式,计算出该点从起始位置向目标位置的运动角度`angle`,运动总路程`distance`(用来判断粒子是否到达目标点，从而让其停止运动),每个粒子对应的加速度`a`(通过物理的加速度方程,需要对加速度进行横向和纵向的分解),这里我设置了一个统一的运动时间,即运动次数`timerNum`,尽量使粒子同时到达目标点。
```
    this.startX = startX == Number ? startX : Math.random() * (this.targetX - W/2) * 10 + W/2
    this.startY = startY == Number ? startY : Math.random() * (this.targetY - H/2) * 10 + H/2
    this.distance = Math.sqrt(Math.pow((this.targetX - this.startX), 2) + Math.pow((this.targetY - this.startY), 2))
    this.angle = Math.abs(Math.atan2((this.targetY - this.startY), (this.targetX - this.startX)))
    // * 计算同时到达目标点时加速度a的值,由加速度方程求得
    this.a = 2 * this.distance / Math.pow(this.timerNum, 2)
    this.ax = this.a * Math.cos(this.angle)
    this.ay = this.a * Math.sin(this.angle)
```
根据粒子目标点位于起始点的不同方位，判断速度的正负方向
```
if (this.targetY > this.startY) {
        this.vy += this.ay
    } else {
        this.vy -= this.ay
    }
    if (this.targetX > this.startX) {
        this.vx += this.ax
    } else {
        this.vx -= this.ax
    }
```
粒子下一个运动到的点坐标为:
```
this.nowLocation.x = this.startX + this.vx
this.nowLocation.y = this.startY + this.vy
```
根据这个坐标和canvas的arc(x, y, radius, 0, Math.PI *2)在该处画出小球

粒子半径变化过程
```
    // * 当粒子的半径变小到一定程度后，将半径增大0.1
    if (this.radius < this.furtherRadius && this.show === false) {
        this.radius += this.durVal
    } else {
        this.show = true
    }

    // * 当粒子变大到一定程度后，半径减小0.1
    if (this.show) {
        this.radius -= this.durVal
    }
```
最后我们将每一次小球的运动和半径变化数据放到一个数组中`newPoints`中去,遍历将其画到`canvas`上去,并通过`requestAnimationFrame`让我们的小球运动起来

