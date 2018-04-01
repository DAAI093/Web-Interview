/* 1. 创建游戏对象 */
function Game(map) {
    /* 2.实例化食物和蛇身对象 */
    this.food = new Food();
    this.snake = new Snake();
    /* 3.地图关联 */
    this.map = map;
}
/* 4. 定义启动游戏方法 */
Game.prototype.start = function () {
    /* 5.食物和蛇身对象初始化 */
    this.food.init(this.map);
    this.snake.init(this.map);
    /* 7.调用键盘绑定函数，通过键盘控制蛇方向 */
    this.bindKey();
    /* 6.通过定时器让蛇动起来 */
    this.timer = setInterval(function () {

        // 蛇的方向移动
        this.snake.move();
        /* 5. 边界检测 */
        //  水平与垂直格子最大值
        var maxX = this.map.offsetWidth / this.snake.width;
        var maxY = this.map.offsetHeight / this.snake.height;
        //  蛇头数据
        var snakeHead = this.snake.body[0];
        // 接收游戏对象，用于清空定时器
        /* 6.检测蛇头水平x坐标是否触碰边缘 */
        if( snakeHead.x < 0 || snakeHead.x >= maxX ){
            // 5.1 清除游戏对象的定时器
            clearInterval(this.timer);
            alert("游戏结束");
        }
        // 5.2 检测蛇头水平y坐标是否触碰边缘
        if( snakeHead.y < 0 || snakeHead.y >= maxY ){
            clearInterval(this.timer);
            alert("游戏结束");
        }
        /* 调用检测是否吃到吃食物的方法 */
        this.checkEat();
    }.bind(this),100);
};
/* 定义游戏键盘控制蛇方向方法 */
Game.prototype.bindKey = function () {
    document.addEventListener('keydown',function (event) {
//            console.log(event.keyCode);
        switch (event.keyCode){
            case 39:
                this.snake.direction = 'right';
                break;
            case 40:
                this.snake.direction = 'bottom';
                break;
            case 37:
                this.snake.direction = 'left';
                break;
            case 38:
                this.snake.direction = 'top';
                break;
        }
    }.bind(this),false);
};
/* 定义吃到食物的方法 */
Game.prototype.checkEat = function () {
    if( this.snake.body[0].x == this.food.x && this.snake.body[0].y == this.food.y ){
        console.log("吃到食物了");
        //  初始化食物
        /*  获取最后一节蛇尾 */
        var last = this.snake.body[this.snake.body.length - 1];
        this.snake.body.push({
            x : last.x,
            y : last.y,
            color : last.color,
        });
        /* 并更新食物和新蛇身 */
        this.food.init(this.map);
        this.snake.init(this.map);
    }
};