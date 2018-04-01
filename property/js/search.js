var rep = {
    "head": {
        "token": "OGI2Njg1NDVmZjI5NGE4MGEwN2EyNDIzNTA1MjIzMTg=",
        "appAccount": "abd73a2657bd41cebde60c1b4bc3ada8",
        "version": "1.0",
        "deviceType": 1
    },
    "content": {}
}

var rep1 = {
    "head": {
        "token": "OGI2Njg1NDVmZjI5NGE4MGEwN2EyNDIzNTA1MjIzMTg=",
        "appAccount": "abd73a2657bd41cebde60c1b4bc3ada8",
        "version": "1.0",
        "deviceType": 1
    },
    "content": {
        "type": 1,
        "page_num": 1,
        "page_limit": 10,
    }
}

// 3.预先备份上面的内容
var repjson = rep;
// 3.1将sessionStorage里面的数值传进去
rep.head.token = sessionStorage.getItem('token')
rep.head.appAccount = sessionStorage.getItem('appAccount')
rep.head.deviceType = sessionStorage.getItem('deviceType')

rep1.head.token = sessionStorage.getItem('token')
rep1.head.appAccount = sessionStorage.getItem('appAccount')
rep1.head.deviceType = sessionStorage.getItem('deviceType')

// 这里获取的是用户的信息
var reps = JSON.stringify(rep);
$.post("http://app-dev.ydycaigou.com:8081/app/user/get_user_info", reps, (res) => {
    console.log(res)
    $(".portrait").html() = `<img class="pic_h" src=` + res.data.head_pic + ` alt="">` + res.data.nickname
})



var reps1 = JSON.stringify(rep1);
$.post("http://app-dev.ydycaigou.com:8081/app/rebate/get_itemized", reps1, (res) => {
    console.log(res)
    $(".list").html(` 
        <li>
            <div class="left">
                <p class="txt">${res.data.remark}</p>
                <p class="date">${res.data.create_time}</p>
            </div>
            <div class="right green">${res.data.change_type == 1 ? "+" : "-"}${res.data.change_num}</div>
        </li>`)
})