import { parse } from 'querystring';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const paramsToString = params => {
  let tmpParams = [];
  for (let k in params) {
    tmpParams.push(k + '=' + params[k]);
  }
  return tmpParams.join('&');
};

//json数据转换为formdata
export const objectToFormData = (obj, form, namespace) => {
  var fd = form || new FormData();
  var formKey;
  if (obj instanceof Array) {
    obj.forEach((item, index) => {
      if (typeof item === 'object' && !(item instanceof File)) {
        objectToFormData(item, fd, namespace + '[' + index + ']');
      } else {
        // 若是数组则在关键字后面加上[]
        fd.append(namespace + '[]', item);
      }
    });
  } else {
    for (var property in obj) {
      if (obj.hasOwnProperty(property) && obj[property] !== undefined) {
        if (namespace) {
          // 若是对象，则这样
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File,
        // use recursivity.
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          // 此处将formKey递归下去很重要，因为数据结构会出现嵌套的情况
          objectToFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
  }
  return fd;
};

//转成千分位金额
export function formatThousands(num) {
  if (!num && typeof(num) !== 'number') return num;
  if (typeof num == 'string') {
    const number = parseFloat(num);
    if (isNaN(number)) {
      return num;
    } else {
      if (/\d{4}\D\d{1,2}\D\d{1,2}/.test(num) || /%$/.test(num)) {
        return num
      }
    }
    num = number;
  }

  // else if (typeof num == 'number') {
    //金额统一保留2位小数，无需2位小数时，把toFixed(2)去掉即可
    num = num.toFixed(2).toString();
  //}

  //1.先去除空格,判断是否空值和非数
  num = `${num}`;
  num = num.replace(/[ ]/g, ""); //去除空格
  if (num == "") {
    return;
  }
  if (isNaN(num)) {
    return num;
  }

  //2.针对是否有小数点，分情况处理
  const index = num.indexOf(".");
  let reg;
  if (index == -1) { //无小数点
    reg = /(-?\d+)(\d{3})/;
    while (reg.test(num)) {
      num = num.replace(reg, "$1,$2");
    }
  } else {
    let intPart = num.substring(0, index);
    const pointPart = num.substring(index + 1, num.length);
    reg = /(-?\d+)(\d{3})/;
    while (reg.test(intPart)) {
      intPart = intPart.replace(reg, "$1,$2");
    }
    num = `${intPart}.${pointPart}`;
  }
  //num = (num*1).toFixed(2);

  return num;
}

//数组求和
export const getArraySum = (list, key, isAmount) => {
  let total = 0;

  if(list.length > 0){
    list.forEach(x => {
      total += (key && x[key] ? x[key]*1 : (x || 0));
    })
  }
  return isAmount ? formatThousands(total) : total;
};

//局部打印
export const printHtml = id => {
  let tmpId = id + "_" + Date.now();
  let tmpDom = document.createElement('div')
  tmpDom.innerHTML = document.getElementById(id).outerHTML;
  tmpDom.id = tmpId;

  document.body.children.forEach(x => x.style.display = 'none')
  document.body.appendChild(tmpDom);
  window.print();
  document.body.removeChild(tmpDom)
  document.body.children.forEach(x => x.style.display = '');
};

/**
 * Cookie读写操作的封装
 * @type {Object}
 */
const cookie = {
  get: function(key) {
    try {
      var a,
        reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
      if ((a = document.cookie.match(reg))) {
        return unescape(a[2]);
      } else {
        return '';
      }
    } catch (e) {
      return '';
    }
  },
  set: function(key, val, options) {
    options = options || {};
    let expires;

    if (typeof options.expires === 'number') {
      expires = new Date(+new Date() + options.expires);
    }

    try {
      document.cookie =
        key +
        '=' +
        escape(val) +
        (expires ? ';expires=' + expires.toUTCString() : '') +
        ';path=/' +
        (options.domain ? '; domain=' + options.domain : '');
    } catch (e) {
      throw e;
    }
  },
  del(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = cookie.get(name);

    if (cval) {
      cookie.set(name, cval, { expires: -1 });
    }
  },
};
export const Cookie = cookie;
