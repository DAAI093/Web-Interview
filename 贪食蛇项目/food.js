/**
 * 把游戏的食物抽离称为一个对象
 * */
/* 1. 创建食物对象 */
function Food(width,height,color,x,y) {
    /* 1.1 给食物对象设置属性 */
    this.width = width || 20;
    this.height = height || 20;
    this.color = color || "#f60";
    this.x = x || 39;      // 每个格子的x坐标，使用的时候再乘以  x * width
    this.y = y || 1;
    /* 4.1 创建存放食物对象的数组 */
    this.element = [];
}
/* 2. 创建初始化话食物方法，init代表初始化，有语义的函数名称 */
Food.prototype.init = function (map) {
    /* 每次创建食物之前，先把地图上旧的食物删除 ，如果是空(没食物，那就不删除)*/
    this.remove(map);
    /* 3.随机生成x,y坐标 */
    // 地图宽是800，每个格子20，所以水平方向能放下40个格子，0~39。
    this.x = parseInt( Math.random() * map.offsetWidth / this.width );
    this.y = parseInt( Math.random() * map.offsetHeight / this.height );

    /* 2. 创建食物DOM对象，并且添加到地图中 */
    var divElement = document.createElement('div');  // 创建div
    /*    2.1给div添加样式 */
    divElement.style.width = this.width + 'px';
    divElement.style.height = this.height + 'px';
    divElement.style.backgroundColor = this.color;
    divElement.style.left = this.x * this.width + 'px';
    divElement.style.top = this.y * this.height + 'px';
    divElement.style.position = "absolute";
    /*    2.2把 div 添加到 map 地图上 */
    map.appendChild(divElement);
    // console.log(divElement);
    // this.element = divElement;
    /* 4.2 把创建出来的<div>食物添加到对象<数组>上，关联起来  */
    this.element.push(divElement);
};
/* 4.删除地图上旧食物的方法，注意：食物只能有一个 */
Food.prototype.remove = function (map) {
    // console.log(this.element);
    // if(this.element[0]){
    //     map.removeChild(this.element[0]);
    // }
    /*
    *    注意：每次创建食物之前，先把地图上旧的食物删除 ，
    *       执行过程：有食物才删除(数组中有元素)，如果为空，则不执行删除操作(没食物，不删除)
    *       PS：该方法和后面蛇身的更新类似。
    * */
    var i = this.element.length - 1;
    for( ; i >= 0 ; i-- ){
        map.removeChild(this.element[i]);
        this.element.splice(i,1);
    }
};