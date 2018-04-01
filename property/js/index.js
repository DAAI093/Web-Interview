/*
appAccount    ac
token  token
deviceType deviceType
**/

//这个主要是在从小程序或者app来到index页面获取相关信息 
// 1.获取url
var url = location.search;
// 2.获取token 
var token = url.match(/token=.{44}/)[0].substr(6);
console.log(token)
sessionStorage.setItem('token', token)

// 3.获取appAccount 
var appAccount = url.match(/ac=.{44}/)[0].substr(3);
console.log(appAccount)
sessionStorage.setItem('appAccount', appAccount)

// 4.获取设备类型 1 2 3 4
var deviceType = url.match(/deviceType=.{44}/)[0].substr(11);
console.log(deviceType)
sessionStorage.setItem('deviceType', deviceType)

