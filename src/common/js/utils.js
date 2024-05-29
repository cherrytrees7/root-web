/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

 export function getQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) {
      return  unescape(r[2]);
  } else {
      return null
  }
}

export const getLocal = (name) => {
  return localStorage.getItem(name)
}

export const setLocal = (name, value) => {
  localStorage.setItem(name, value)
}

export const removeLocal = (name) => {
    localStorage.removeItem(name);
}





// tdist.getParent = function(t) {
//   var e = this[t][1];
//   return this[e]
// }

// tdist.getLev1Html = function(t) {
//   var e = "请选择";
//   t && (e = t);
//   for (var i = this.getLev1(), n = ["<option value=''>" + e + "</option>"], r = 0, o = i.length; r < o; r++) {
//       var v = i[r];
//       n.push('<option value="' + v.id + '">' + v.text + "</option>")
//   }
//   return n.join("")
// }

// tdist.getLev2Html = function(t, e) {
//   var i = "请选择";
//   e && (i = e);
//   for (var n = this.getLev2(t), r = ["<option value=''>" + i + "</option>"], o = 0, v = n.length; o < v; o++) {
//       var u = n[o];
//       r.push('<option value="' + u.id + '">' + u.text + "</option>")
//   }
//   return r.join("")
// }

// tdist.getLev3Html = function(t) {
//   for (var e = this.getLev3(t), i = ["<option value=''>请选择</option>"], n = 0, r = e.length; n < r; n++) {
//       var o = e[n];
//       i.push('<option value="' + o.id + '">' + o.text + "</option>")
//   }
//   return i.join("")
// }

// 图片前缀方法
export const prefix = (url) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `http://backend-api-01.newbee.ltd${url}`
    return url
  }
}
