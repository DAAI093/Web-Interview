// 将模态框抽离为一个对象
function Toast(title, body, cancelText, okText) {
    this.title = title || "title";
    this.body = body || "body-text";
    this.cancelText = cancelText || "取消";
    this.okText = okText || "确定";
    // 缓存符合条件的事件
    this.showEventListeners = new Array();
    this.closeEventListeners = new Array();
    this.num = new Array();
}

// 显示模态框
Toast.prototype.show = function () {
    var that = this;
    for (var i = 0; i < this.showEventListeners.length; i++){
        this.showEventListeners[i](this);
    }
    var box = document.createElement("div");
    this.num[this.num.length] = box;
    box.className = "box";
    box.id = this.num.length;

    // 添加title部分
    var head = document.createElement('div');
    head.innerHTML = this.title;
    head.className = "headtitle";

    // 添加body部分
    var main = document.createElement("div");
    main.className = "main";

    // 添加输入框
    var input = document.createElement("input");
    input.placeholder = this.body;
    input.className = "bodytext";
    input.type = "text";

    // 添加确定选框
    var okbtn = document.createElement("button");
    okbtn.className = "okbtn";
    okbtn.innerHTML = this.okText;
    okbtn.addEventListener('click', function () {
        // 通过传入id选择关闭对应的哪一个框
        that.close(box.id);
    })

    // 添加取消选框
    var cancelbtn = document.createElement("button");
    cancelbtn.className = "cancelbtn";
    cancelbtn.innerHTML = this.cancelText;
    // 添加点击事件
    cancelbtn.addEventListener('click', function () {
        // console.log(123);

    })

    box.appendChild(head);
    box.appendChild(main);
    main.appendChild(input);
    main.appendChild(cancelbtn);
    main.appendChild(okbtn);
    document.body.appendChild(box);
}

// 关闭模态框
Toast.prototype.close = function (id) {
    var box = document.getElementById(id);
    document.body.removeChild(box);
    // 下边是激活onclose事件
    for (var i = 0; i < this.closeEventListeners.length; i++) {
        this.closeEventListeners[i](this);
    }
}

// 添加事件系统
Toast.prototype.on = function (name, listener) {
    switch (name.toLowerCase()) {
        case "show":
            // this指向这个构造函数，可以直接使用这种方法调用
            // listener(this);
            this.showEventListeners[this.showEventListeners.length] = listener;
            break;
        case "close":
            this.closeEventListeners[this.closeEventListeners.length] = listener;
            break;
        default:
            break;
    }
}
Toast.prototype.off = function (name, listener) {
    listener = null;
    // switch (name.toLowerCase()) {
    //     // 移除数组中的事件
    //     case "show":
    //         this.showEventListeners = [];
    //         break;
    //     case "close":
    //         this.closeEventListeners = [];
    //         break;
    //     default:
    //         break;
    // }
}
