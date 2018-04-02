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
    for (var i = 0; i < this.showEventListeners.length; i++) {
        this.showEventListeners[i](this);
    }
    
    var box = $('<div>')
    this.num[this.num.length] = box;
    box.addClass("box");
    box.attr('id',"a"+this.num.length); //id添加成功

    // 添加title部分
    var head = $('<div>')
    head.text(this.title);
    head.addClass("title");

    // 添加body部分
    var main = $('<div>')
    main.addClass("main") ;

    // 添加输入框
    var input = $('<input>')
    input.attr('placeholder',this.body) ;
    input.addClass("bodytext");
    input.attr('type',"text");

    // 添加确定选框
    var okbtn = $('<button>')
    okbtn.addClass ("okbtn");
    okbtn.text(this.okText);
    okbtn.on('click', function () {
        // 通过传入id选择关闭对应的哪一个框

        // that.close(this);
        that.close($(this).parent().parent()[0].id);
        // console.log($(this).parent().parent()[0].id)
    })

    // 添加取消选框
    var cancelbtn = $('<button>')
    cancelbtn.addClass("cancelbtn");
    cancelbtn.text(this.cancelText);
    // 添加点击事件
    cancelbtn.on('click', function () {

    })

    box.append(head);
    box.append(main);
    main.append(input);
    main.append(cancelbtn);
    main.append(okbtn);
    $(document.body).append(box);
}

Toast.prototype.close = function (id) {

    // $(id).parent().parent().remove();
    
    $("#" + id).remove()
    // 下边是激活onclose事件
    for (var i = 0; i < this.closeEventListeners.length; i++) {
        this.closeEventListeners[i](this);
    }
}


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

