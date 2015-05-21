(function() {
    var matched, browser;

    // Use of jQuery.browser is frowned upon.
    // More details: http://api.jquery.com/jQuery.browser
    // jQuery.uaMatch maintained for back-compat
    jQuery.uaMatch = function( ua ) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

        return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    };

    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    jQuery.browser = browser;

    jQuery.getByteLength = function (str) {
        return str.replace(/[^\x00-\xff]/g, 'ci').length;
        //获取字符在gbk编码下的字节长度, 实现原理是认为大于127的就一定是双字节。如果字符超出gbk编码范围, 则这个计算不准确
    };
})();

var vaildForm = {
    vaild:{
        email:/^[\w\.\-]+@([\w\-]+\.)+[a-z]{2,4}$/i,
        phone:/^\d{7,14}$/,
        http:/^(http:\/\/)/,
        url: /^(\w+\.)+\w{2,4}/,
        comUrl: /^((http:\/\/)(\w+\.)+\w{2,4})|((\w+\.)+\w{2,4})/,
        date:/^(\d{4})[-\/\.年]{1}(1[0-2]|(0)?\d)[-\/\.月]{1}([0-2]?\d|3[0-1])(日)?$/,
        time:/^([0-1]?\d|2[0-3]):([0-5]\d)$/,
        datetime:/^(\d{2}|\d{4})[-\/\.年]{1}(1[0-2]|(0)?\d)[-\/\.月]{1}\d{1,2}(日)?(( \d{1,2}\:\d{1,2})|( \d{1,2}\:\d{1,2}\:\d{1,2}))?$/,
        ip: /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){3}$/
    },
    isChinese: function(str){
        return /^[\u4e00-\u9fa5]+$/g.test(str);
    },
    //是否包含中文字符
    hasChinese: function(str){
        return /.*[\u4e00-\u9fa5]+.*$/.test(str);
    },
    isEmpty:function(ipt){
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        return str.length == 0;
    },
    http:function(ipt){
        var _t = this, reg = _t.vaild.http;
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        return reg.test(str);
    },
    url:function(ipt){
        var _t = this, reg = _t.vaild.url;
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        return reg.test(str);
    },
    comUrl:function(ipt){
        var _t = this, reg = _t.vaild.comUrl;
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        return reg.test(str);
    },
    email: function(ipt){
        var _t = this, reg = _t.vaild.email;
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        return reg.test(str);
    },
    len: function(obj, minLen, maxLen){
        var _t = this;
        var str = $.trim(typeof(obj) == "string" ? obj : obj.value);

        if(typeof(obj) != "string"){
            var _obj = $(obj);
            if(!minLen){
                if(typeof(_obj.attr("minlength")) == "undefined"){
                    minLen = 0;
                } else {
                    minLen = _obj.attr("minlength") * 1;
                }
            }
            if(!maxLen){ maxLen = _obj.attr("maxlength") * 1; }
        }
        str = str.replace(/\r\n/g, ""); //解决ie8以下\n的问题;
        str = str.replace(/\n/g, "");
        var byteLen = $.getByteLength(str);
        var result = (byteLen >= minLen) && (byteLen <= maxLen);
        return result;
    },
    phone: function(ipt){
        var _t = this, reg = _t.vaild.phone;
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        return reg.test(str);
    },
    ip: function(ipt){
        var _t = this, reg = _t.vaild.ip;
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        var rlt = reg.test(str);
        if(!rlt){
            if(str.match(/:/g) && str.match(/:/g).length <=7 && /::/.test(str)){
                if(/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str)){
                    rlt = true;
                }
            }else{
                if(/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str)){
                    rlt = true;
                }
            }
        }
        return rlt;
    },
    //检查id合法性
    //id格式:汉字字母数字下划线
    validId:function(ipt){
    	var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        for(var i = 0; i < str.length; i++){
            if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig)){
                return false;
            }
        }
        return true;
    },
    _check: function(regKey, ipt){
        var _t = this, reg = _t.vaild[regKey];
        var str = $.trim(typeof(ipt) == "string" ? ipt : ipt.value);
        return reg.test(str);
    },
    date: function(ipt){
        var rlt = this._check("date", ipt);
        return rlt;
    },
    time: function(ipt){
        var rlt = this._check("time", ipt);
        return rlt;
    },
    datetime: function(ipt){
        var rlt = this._check("datetime", ipt);
        return rlt;
    },
    //设置控件的msg
    /**
    * ipt: 控件本身或其id
    * errMsg: 值为""或msg信息时，即显示错误信息
    */
    setChkMsg:function(ipt, errMsg, okMsg){
        var id = (typeof(ipt) == "string") ? ipt : ipt.getAttribute("id");
        var errO = $("#" + id + "_err"),
            okO = $("#" + id + "_ok");
        if(okMsg == undefined){
            okMsg = "";
        }
        if(errMsg == ""){
            errO.html(errMsg).hide();
            okO.html("").hide();
        } else if(errMsg){
            errO.html(errMsg).show();
            okO.html("").hide();
        } else {
            errO.html("").hide();
            okO = okO[0] ? okO : errO;
            okO.html(okMsg).show();
        }
    }
};


jQuery.fn.extend({
    isRequired:function(){
        var required;
        var browser = $.browser;

        //修正某些IE7浏览器下required获取始终null的bug
        if(browser.ie &&  browser.version== "7.0"){
            var outer = this[0].outerHTML,
                part = outer.slice(0, outer.search(/\/?['"]?>(?![^<]*<['"])/));
            return /\srequired\b/i.test(part)? "required": undefined;
        } else {
            required = this.attr("required");
            if (required === undefined || required === false) {
                return undefined;
            }
            return "required";
        }
    },
    /**
    config: {
        fields: {
            "#title":{
                required:true,
                eType:"blur", //触发事件类型
                regExp:"",   //正则表达式(str)|| function
                emptyMsg:"",
                okMsg:"",
                errMsg:"",
                longMsg: "",    //超出长度时message
                placeholder: "",     //默认值
                noSubmit: false,   //表单提交时不验证该项（默认为false,即默认为提交）
                errHidInfo: false,  //显示错误信息时是否隐藏掉该项注释
                callback:
            },
            "#email":{
                regExp:"email",   //正则表达式
                emptyMsg:"",
                errMsg:""
            }
        },
        btnSubmit: null,   //提交表单按钮
        submitCbk: function(){},    //表单提交验证后回调函数
        beforeSubmit: function(){}  //表单提交前回调函数
    }
    **/
    vaildForm : function(config){
        var form = this;

        var conFields = config.fields;
        var check = function(obj, cfg){
            var val = obj.val();
                if(cfg["okMsg"]){ okMsg = cfg["okMsg"]; }
            var regExp = cfg.regExp;
            var result = true, errMsg = null;
            var fieldIsEmpty = vaildForm.isEmpty(val) || cfg["placeholder"] == $.trim(val);
            if(fieldIsEmpty){
            	if(cfg["placeholder"]){
            		obj.val(cfg["placeholder"]);
            	}
                if(cfg["required"] || obj.isRequired()){
                    errMsg = cfg.emptyMsg;
                    result = null;
                } else {
                    errMsg = "";
                }
            } else if(regExp != "isEmpty"){
            	var regType = $.type(regExp);
                if(regType == "string"){
                    if(regExp != "len" && cfg["longMsg"] && (!vaildForm.len(obj[0]))){
                        errMsg = cfg["longMsg"];
                        result = false;
                    } else {
                        result = vaildForm[regExp](obj[0]);
                        if(!result){  errMsg = cfg.errMsg; }
                    }
                } else if(regType == "regexp"){
                    result = regExp.test($.trim(val));
                    if(!result){  errMsg = cfg.errMsg; }
                } else if(regType == "function"){
                	result = regExp($.trim(val));
                    if(!result){  errMsg = cfg.errMsg; }
                }
            }
            var objId = obj.attr("id");
            var objInfo = $("#" + objId + "_info");
            if(objInfo[0]){
                if(errMsg && cfg["errHidInfo"]){
                    objInfo.hide();
                } else {
                    objInfo.show();
                }
            }
            vaildForm.setChkMsg(objId, errMsg);

            if(cfg["callback"]){ result = cfg["callback"](obj[0], result); }
            return result;
        };
        if(conFields){
            for(var k in conFields){
                var field = form.find(k);
                if(field[0]){
                    var placeholder = conFields[k]["placeholder"];
                    field.bind(conFields[k]["eType"] || "blur", (function(key){
                        return function(){
                            var rlt = check($(this), conFields[key]);
                        };
                    })(k));

                    if(placeholder){
                    	field.val(placeholder);
                        field.bind("focus", (function(placeholder){
                        	return function(){
    							var val = $.trim(this.value);
    	                    	if(val == placeholder){
    	                    		this.value = "";
    	                    	}
                        	}
                        })(placeholder));
                    }
                }
            }
        }

        if(form.vaildConfig){
            form.vaildConfig = $.extend( true, form.vaildConfig, config );
        } else {
            form.vaildConfig = config;
            var submitHandler = function(e){
                if(config["beforeSubmit"]){
                    config["beforeSubmit"]();
                }

                var result = true;
                var fields = form.vaildConfig.fields;
                var fieldJson = {};   //表单中的要提交的数据以json保存
                if(fields){
                    for(var k in fields){
                        if(fields[k]["noSubmit"]){
                            continue;
                        }

                        var field = form.find(k);

                        if(field){
                            field.each(function(index,item){
                            	item = $(item);
                            	var tmpRlt = check(item, fields[k]);
                            	if(tmpRlt){
                            		fieldJson[item.attr("name")] = item.val();
                            	}
                                result = result && tmpRlt;
                            });
                        }
                    }
                }

                if(config["submitCbk"]){
                	//把检查合法性结果及需要提交的合法的表单数据传给submit回调函数
                	result = config["submitCbk"](result, fieldJson);
                }
                return result;
            };
            if(config["btnSubmit"]){
                config["btnSubmit"].click(function(e){
                    e.preventDefault();
                    var rlt = submitHandler();
                    if(rlt){ form.submit(); }
                });
            } else {
                form.submit(function(e){
                    e.preventDefault();
                    var rlt = submitHandler();

                    if(!rlt){ e.preventDefault(); }
                });
            }
        }
    },
    //获取或设置验证field的config值
    vaildField: function(fieldId, key, val){
        var form = this;
        var fieldKey = fieldId.charAt(0) == "#" ? fieldId : ("#" + fieldId);
        var argLen = arguments.length,
            fieldCfg = form.vaildConfig.fields[fieldKey];

        if(fieldCfg == undefined){
            return undefined;
        }
        if(argLen == 1){
            return fieldCfg;         //获取该field配置json
        } else if(argLen == 2){
            return fieldCfg[key];    //获取该field配置json中对应key的值
        } else {
            fieldCfg[key] = val;  //设置该field配置json中对应key的值
        }
    }
});