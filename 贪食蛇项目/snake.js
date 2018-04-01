/* 1.创建蛇构造函数 */
function Snake(width,height,direction) {
    /* 1.1 设置对象属性 */
    this.width = width || 20 ;
    this.height = height || 20 ;
    this.direction = direction || "right" ;
    /* 1.2 蛇身坐标数据  --- 和食物对象的主要区别*/
    this.body = [
        // 蛇头
        { x : 4 , y : 2 , color : "#0ff"  },
        // 蛇中
        { x : 3 , y : 2 , color : "#eee"  },
        // 蛇尾
        { x : 2 , y : 2 , color : "#eee"  }
    ];
    /* 3.1 蛇身DOM视图 */
    this.element = [];
}
/* 2. 初始化蛇的方法，把蛇添加到页面中(DOM操作) */
Snake.prototype.init = function (map) {
    // 为了方便把第一次初始化时候的地图与对象关联起来
    this.map = map;
    /* 每次移动都要先把旧的蛇身删除 */
    this.remove();
    for (var i = 0; i < this.body.length; i++) {
        /* 遍历创建div */
        var divElement = document.createElement('div');
        /* 初始化蛇的方法 */
        /* 给每个div设置属性 */
        divElement.style.width = this.width + 'px';
        divElement.style.height = this.height + 'px';
        divElement.style.backgroundColor = this.body[i].color ;
        divElement.style.left = this.width * this.body[i].x + 'px';
        divElement.style.top = this.height * this.body[i].y + 'px';
        divElement.style.position = "absolute" ;
//            console.log(divElement);
        map.appendChild( divElement );
        /* 3.2 往视图添加数据 */
        this.element.push( divElement );
    }
};
/* 2.定义蛇移动的方法 */
Snake.prototype.move = function (game) {
    // 贪食蛇到底是怎么移动的呢？图解 */
    //
    //    蛇尾往蛇中旧位置移动
    //    蛇中往蛇头旧位置移动
    //        注意：蛇头不能先移动，否则会蛇身体就断掉了(蛇头原本位置丢失)
    //
    /* 1. 从蛇尾开始移动位置 */
    for( var i = this.body.length - 1 ; i > 0 ; i-- ){
        this.body[i].x = this.body[i-1].x;
        this.body[i].y = this.body[i-1].y;
    }
    /* 2. 最后再移动蛇头：数据更新 */
    switch (this.direction){
        case 'right':
            this.body[0].x++;
            break;
        case 'bottom':
            this.body[0].y++;
            break;
        case 'left':
            this.body[0].x--;
            break;
        case 'top':
            this.body[0].y--;
            break;
    }
    // console.log(this.body);  // 必须数据测试通过
    /* 3. 在地图上重新绘制这条蛇：视图更新 */
    this.init(this.map);
};
/* 3.删除地图上旧蛇的方法，注意：蛇就只有一条 */
Snake.prototype.remove = function () {
    /* 和食物删除同理 */
    var i = this.element.length - 1;
    for( ; i >= 0 ; i-- ){
        this.map.removeChild(this.element[i]);
        this.element.splice(i,1);
    }
};

