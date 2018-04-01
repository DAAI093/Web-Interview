var rep = {
    "head": {
        "token": "OGI2Njg1NDVmZjI5NGE4MGEwN2EyNDIzNTA1MjIzMTg=",
        "appAccount": "abd73a2657bd41cebde60c1b4bc3ada8",
        "version": "1.0",
        "deviceType": 1
    },
    "content": {
        "type": 1,
        "trade_num": "100",
        "account_info": {
            "name": "开户名",
            "card_num": "4406111",
            "bank_name": "农业银行",
            "mobile": "18306618242",
        },
    }
};

//2. 定义一个标志位用来给之后的模态框作为判断依据
var flag = false; //未必用到

// 3.预先备份上面的内容
var jsonrep = rep;
// 3.1将sessionStorage里面的数值传进去
rep.head.token = sessionStorage.getItem('token')
rep.head.appAccount = sessionStorage.getItem('appAccount')
rep.head.deviceType = sessionStorage.getItem('deviceType')

// 3.开始获取输入框的数值 构建关系
rep.content.trade_num = $(".jine").val(); //金额
rep.content.account_info.name = $(".bname").val(); //
rep.content.account_info.card_num = $(".card_num").val(); //
rep.content.account_info.bank_name = $(".bank_name").val(); //
rep.content.account_info.mobile = $(".mobile").val(); //

// 验证金额是否输入为数字
function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
        return true;
    }
    return false;
}

// 验证手机
function isPoneAvailable(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

// 模态框
function motaikuang() {
    setTimeout(() => {
        $(".ljtb").fadeOut()
        $(".jine").val("");
        $(".mobile").val("");
    }, 1500);
    $(".ljtb").css({
        "display": "block"
    })
    $(".ljtb").fadeIn();
}
// function motaikuang() {
//     setTimeout(() => {
//         $(".ljtb").fadeOut()
//         $(".jine").val("");
//         $(".mobile").val("");
//     }, 1500);
//     $(".ljtb").css({
//         "display": "block"
//     })
//     $(".ljtb").fadeIn();
// }

function submit() {
    var timer = setInterval(function () {
        // 启动定时器监听赋值
        rep.content.trade_num = $(".jine").val(); //金额
        rep.content.account_info.name = $(".bname").val(); //
        rep.content.account_info.card_num = $(".card_num").val(); //
        rep.content.account_info.bank_name = $(".bank_name").val(); //
        rep.content.account_info.mobile = $(".mobile").val(); //
        // 对输入信息进行判断
        // 金额
        if (!checkNumber(rep.content.trade_num)) {
            motaikuang();
            // rep.content.trade_num = "";
            clearInterval(timer)
            return false;
        }
        // 手机号码
        if (!isPoneAvailable(rep.content.account_info.mobile)) {
            motaikuang();
            clearInterval(timer)
            return false;
        }
    }, 500)
}
var reps = JSON.stringify(rep)
$(".btn1").click(function () {
    // 1.对输入信息进行判断
    submit();
    console.log(rep);
    // 传参为string类型
    $.ajax({
        type: "post",
        url: "http://app-dev.ydycaigou.com:8081/app/rebate/create_order",
        contentType: 'application/x-www-form-urlencoded', // 默认值
        data: reps,
        dataType: "json",
        success: function (res) {
            console.log(res);
            console.log("-----")
            console.log(res.data.order_id);
            sessionStorage.setItem("order_id", res.data.order_id)
            window.location.href = "./search.html";
        },
        // error: function (data) {
        //     alert("error");
        // },
    });
})




