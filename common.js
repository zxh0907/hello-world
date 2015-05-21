 var $Class = {
    create: function(){
        var obj = arguments.length > 0 ? arguments[0] : null;
        var init = obj.$init || obj.init || obj.initialize;
        for(var k in obj){
            init.prototype[k] = obj[k];
        }
        return init;
    }
};
function trimStr(str){
	var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");
	return str.replace(a,"");
};    
function testType(obj , type){
	return Object.prototype.toString.call(obj) == "[object "+type+"]";
}
function isFunction(fun){ 
	return testType(fun);;
};

function loadScript(src, options){
	var head = document.head  || document.getElementsByTagName('head')[0] || document.documentElement
	var o = document.createElement("script");
	o.type = "text/javascript";
	o.src = src + "?rnd=" + Math.random();		
	if(options["onload"]){ o.onload = options["onload"]; }
	if(options["onerror"]){ o.onerror = options["onerror"]; }
	head.appendChild(o);
}
var $browser = {};
(function(){
    var ua = navigator.userAgent;
    $browser.se360 = (function(){ return /360se/i.test(ua); })();
    $browser.QQ = (function(){ return /QQBrowser\/(\d+\.\d+)/i.test(ua)? RegExp["\x241"] : undefined;  })();
    $browser.TT = (function(){
        return /TencentTraveler (\d+\.\d+)/i.test(ua)? RegExp["\x241"] : undefined;
    })();
    $browser.sogou = (function(){
        return /SE 2.X /i.test(ua);
    })();
    $browser.theworld = (function(){
        return /theworld/i.test(ua);
    })();
    $browser.baidu = (function(){
        var v = /BIDUBrowser (\d+\.\d+)/i.test(ua)? RegExp["\x241"] : undefined;
        if(!v){
            v = /BIDUBrowser\/(\d+\.\d+)/i.test(ua)? RegExp["\x241"] : undefined;
        }
        return v;
    })();
    $browser.isLinux = (function(){  return /linux/i.test(ua);  })();
})();
//jquery��browser�ж�
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
	//��ȡ�ֽڳ���
    jQuery.getByteLength = function (str) {
        return str.replace(/[^\x00-\xff]/g, 'ci').length;
        //��ȡ�ַ���gbk�����µ��ֽڳ���, ʵ��ԭ������Ϊ����127�ľ�һ����˫�ֽڡ�����ַ�����gbk���뷶Χ, ��������㲻׼ȷ
    };
})();
//jquery-ui��datepicker�����������
jQuery(function($){
    if($.datepicker){
        $.datepicker.regional['zh-CN'] = {
                closeText: '�ر�',
                prevText: '<����',
                nextText: '����>',
                currentText: '����',
                monthNames: ['һ��','����','����','����','����','����',
                '����','����','����','ʮ��','ʮһ��','ʮ����'],
                monthNamesShort: ['һ','��','��','��','��','��',
                '��','��','��','ʮ','ʮһ','ʮ��'],
                dayNames: ['������','����һ','���ڶ�','������','������','������','������'],
                dayNamesShort: ['����','��һ','�ܶ�','����','����','����','����'],
                dayNamesMin: ['��','һ','��','��','��','��','��'],
                weekHeader: '��',
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: '��'};
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
    }
});
//��ȡwindowsϵͳ�汾
function getWinSys(){
	if(/nt 6.1/i.test(ua)){  return "7";   };
	if(/nt 6.0/i.test(ua)){  return "Vista";   };
	if(/nt 5.2/i.test(ua)){  return "2003";   };
	if(/(nt 5.1|Windows XP)/i.test(ua)){  return "XP";   };
	if(/nt 5.0/i.test(ua)){  return "2000";   };
	if(/nt/i.test(ua)){  return "NT 4.0";   };
	if(/(.*98.+9x.*|Windows ME)/.test(ua)){ return "Me";}
	if(/98/.test(ua)){ return "98";}
	if(/95/.test(ua)){ return "95";}
	return "UNKNOWN";
}

if(typeof(body) == "undefined"){
    function body(){
        var F = 0,
            D = 0,
            A = 0,
            I = 0,
            G = 0,
            E = 0;
        var B = window,
            J = document,
            C = J.documentElement;
        F = C.clientWidth || J.body.clientWidth;
        D = B.innerHeight || C.clientHeight || J.body.clientHeight;
        I = J.body.scrollTop || C.scrollTop;
        A = J.body.scrollLeft || C.scrollLeft;
        G = Math.max(J.body.scrollWidth, C.scrollWidth || 0);
        E = Math.max(J.body.scrollHeight, C.scrollHeight || 0, D);
        return {
            scrollTop: I,
            scrollLeft: A,
            documentWidth: G,
            documentHeight: E,
            viewWidth: F,
            viewHeight: D
        }
    }
}

//��url�е������ַ�ת��
function ReplaceURL(A){
    return A.replace(/\%/gi,"%25").replace(/&/gi,"%26").replace(/\+/gi,"%2B").replace(/\ /gi,"%20").replace(/\//gi,"%2F").replace(/\#/gi,"%23").replace(/\=/gi,"%3D");
}

//ͼƬ�ȱ�ѹ��
function formatPic(obj,width,height){
    var size = {w:obj.width, h : obj.height};
    if(obj.width>0 && obj.height>0){
        var rate = (width/obj.width < height/obj.height) ? width/obj.width : height/obj.height;
        if(rate <= 1){
            obj.width = obj.width*rate;
        }
    }
}

function proxy(){
    var __a=[];
    for(var i=0,l=arguments.length;i<l;i++){
        __a[i]=arguments[i];
    }
    var __func=__a[0];
    __a.shift();
     return function(){__func.apply(null,__a)};
}
//�ж��ļ�����
function checkFileType(file, tp){
	var self = this;
	var path = file.value;
	if(trimStr(path) == ""){ return null; }

	var rlt = tp.test(path);
	return rlt;
}
//ģ̬����
var Popup = {
    overlay: undefined,
    dialog : undefined,
    options:{},
    initOptions: function(){
        this.options = {
            "type": "html", //alert | confirm | html  | iframe
            "content": "",
            "title":"��ʾ",
            "width":400,
            "height":300,
            "overlay": true,  //�Ƿ���ʾ���ֲ�
            "confirmOk": function(){},
            "confirmNo": function(){},
            "onClose": function(){},
            "alertOk": true,     //alert�Ƿ�Ϊ�ɹ�����Ϣ
            "contentMsg":"",     //������Ϣtitle���磺�ύ�ɹ�����
            "contentInfo":""     //�����ݵ�������Ϣ���磺�����ѵ�����Ͷ�ߣ������ĵȴ���
        };
    },
    init: function(htOptions){
        var self = this;
        self.initOptions();        
        $.extend( true, this.options, htOptions || {});
        var _opt = this.options;
        this._generateDialog();
        switch(_opt["type"]){
            case "alert":
                this.alert();
                break;
            case "confirm":
                this.confirm();
                break;
            case "html":
                this.fillHtml();
                break;
            case "iframe":
                this.fillIframe();
                break;
            default:

        }
        
        $(window).bind("resize",function(){
            self.resize();
        });

    },

    _generateDialog: function(){
        var _opt = this.options;
        var htm = [];
        if(!this.dialog){
            htm.push('<div class="popDiag" id="popupDialog" style="display:none;"><div class="popDiagIn">');
            htm.push('<div class="popTit" id="popupTitle"><span class="popIcoClose" onclick="Popup.hide();">�ر�</span><span id="popupTitName"></span></div>');
            htm.push('<div class="popBody" id="popupBody"></div>');
            htm.push('</div></div>');

            $(document.body).append(htm.join(""));

            this.dialog = $("#popupDialog");
            this.dialogTit = $("#popupTitle");
            this.dialogTitName = $("#popupTitName");
            this.dialogBody = $("#popupBody");
        }
        this.dialogTitName.html(_opt.title);

        if(_opt.overlay && (!this.overlay)){
            htm.push('<div class="popOverlay" id="popupMask" style="display:none;"></div>');
            $(document.body).append(htm.join(""));
            this.overlay = $("#popupMask");
            /*
            this.overlay.click(function(){
                Popup.hide();
            })*/
        }
    },
    _setDialogCnt: function(html){
        this.dialogBody.html(html);
        this.show();
        this._setSize();
        this._setPosition();
    },
    _setSize: function(){
        var _opt = this.options,
            dialog = this.dialog,
            tit = this.dialogTit,
            diagBody = this.dialogBody,
            overlay = this.overlay;
        var bodyH = _opt.height - tit.outerHeight() - diagBody.css("paddingTop").replace("px","") * 1 - diagBody.css("paddingBottom").replace("px","") * 1,
            bodyW = _opt.width - diagBody.css("paddingLeft").replace("px","") * 1 - diagBody.css("paddingRight").replace("px","") * 1;
        dialog.width(_opt.width).height(_opt.height);
        diagBody.width(bodyW).height(bodyH);
        if(overlay){
           this.overlay.width("100%");
           this.overlay.height($(document).height());
        }
    },
    resize: function(w, h){
        if(w){ this.options.width = w; }
        if(h){ this.options.height = h; }
        this._setSize();
    },
    _setPosition:function(){
        if(this.overlay){
           this.overlay.width("100%");
           this.overlay.height($(document).height());
        }
        var _opt = this.options,
            dialog = this.dialog;
        dialog.css("marginTop", -1 * (_opt.height / 2 -1));
        dialog.css("marginLeft", -1 * (_opt.width / 2 -1));
    },

    alert:function(){
        var _opt = this.options;
        var htm = [];
        if(_opt["contentMsg"]){
            var titClass = _opt["alertOk"] ? "msgOk" : (_opt["alertOk"] == false ? "msgErr" : "");
            htm.push('<div class="popCntTit"><strong'+ (titClass? (" class=" + titClass) : "") +'>' + _opt["contentMsg"] + '</strong></div>');
            if(_opt["contentInfo"]){
                htm.push('<div class="popupCnt">' + _opt["contentInfo"] + '</div>');
            }
        } else {
            htm.push('<div class="popCntTit"><strong>' + _opt.content + '</strong></div>');
        }
        htm.push('<div class="popupBtnArea"><input type="button" value="ȷ��" class="popupBtn" onclick="Popup.hide();"/></div>');
        this._setDialogCnt(htm.join(""));
    },
    confirm:function(){
        var _opt = this.options;
        var htm = [];
        if(_opt["contentMsg"]){
            htm.push('<div class="popCntTit">' + _opt["contentMsg"] + '</div>');
            if(_opt["contentInfo"]){
                htm.push('<div class="popupCnt">' + _opt["contentInfo"] + '</div>');
            }
        } else {
            htm.push('<div class="popCntTit"><strong>' + _opt.content + '</strong></div>');
        }
        htm.push('<div class="popupBtnArea"><input type="button" value="ȷ��" class="popupBtn" id="popBtnCfmOk"/>');
        htm.push('<input type="button" value="ȡ��" class="popupBtn" id="popBtnCfmNo"/></div>');
        this._setDialogCnt(htm.join(""));
        var cfmOk = _opt["confirmOk"],
            cfmNo =  _opt["confirmNo"];
        $("#popBtnCfmOk").click(function(){
            //Popup.onclose();
            if(cfmOk){ cfmOk(); }
        });
        $("#popBtnCfmNo").click(function(){
            _opt.onClose();
            Popup.hide();
            if(cfmNo){ cfmNo(); }
        });
    },
    fillHtml: function(){
        var _opt = this.options;
        this._setDialogCnt(_opt.content);
    },
    fillIframe:function(){
        var _opt = this.options;
        var htm = '<iframe src="'+ _opt.content +'" frameborder="0"></iframe>';
        this._setDialogCnt(htm);
    },
    hide: function(){
        var _opt = this.options;
        if(_opt.overlay){

            this.overlay.hide();
        }
        this.dialog.hide();
        if(_opt.onClose){
            _opt.onClose();
        }
    },
    show:function(){
        var _opt = this.options;
        if(_opt.overlay){
            this.overlay.show();
        }
        this.dialog.show();
    }
};

//�������
var iScroll = $Class.create({
    //options : property collection
    //options.wrapId
    //options.id
    //options.direction
    //options.speed
    //options.step
    //options.autoPlay
    init: function(options){
        this.setProperty(options);
        if((!this.wrapO) || (!this.mainO)){
            return;
        }
        this.getSize();
        this.initDom();
        if(!this.canPlay){
            return;
        }
        this.scroll();
    },
    currentPos:0, //��ǰλ��
    isStop: false,  //�Ƿ�ֹͣ����
    isMoving:true,   //�Ƿ����ڹ���
    initPos: 0,   //��ʼλ��
    setProperty: function(options){
        var _t = this;
        _t.options = {
            wrapId: "iScroll_wrap",
            id: "iScroll_main",
            direction : "top",
            speed: 300,   //�ٶȣ�ms���ڶ೤ʱ���ڹ���һ����
            rest:3000,   //����һ����Ϣʱ��
            rollLen:50,  //�ƶ�����(px,����һ�εľ���)
            autoPlay : true  //�Ƿ��Զ�����
        };
        for(var k in options){
            _t.options[k] = options[k];
        }
        _t.wrapO = document.getElementById(_t.options.wrapId);
        _t.mainO = document.getElementById(_t.options.id);
        _t.options.step = _t.options.rollLen / _t.options.speed;

        var direct = _t.options.direction,
            directFlag = (direct == "top" || direct == "left") ? -1 : 1;
        if(direct == "right"){
            direct = "left";
        } else if(direct == "bottom"){
            direct = "top";
        }
        _t._direct = direct;
        _t._directFlag = directFlag;
        direct = direct.substr(0,1).toUpperCase() + direct.substr(1); //direct����ĸ��д
        _t.initPos = _t.mainO.style["margin" + direct].replace("px","") * 1;
        _t.currentPos = _t.initPos;
    },
    getSize: function(){
        var _t = this,wrapO = _t.wrapO, mainO = _t.mainO;
        _t.mainO_w = Math.max(mainO.scrollWidth ,mainO.clientWidth, mainO.offsetWidth);
        _t.mainO_h = Math.max(mainO.scrollHeight, mainO.clientHeight, mainO.offsetHeight);
        _t.wrapO_w = wrapO.clientWidth;
        _t.wrapO_h = wrapO.clientHeight;
    },
    initDom: function(){
        var _t = this,wrapO = _t.wrapO, mainO = _t.mainO, direct = _t._direct,
            opt = _t.options;
        if(direct == "left" && (_t.wrapO_w >= _t.mainO_w || _t.mainO_w <= opt.rollLen)){
            _t.canPlay = false;
        } else if(direct == "top" && (_t.wrapO_h >= _t.mainO_h || _t.mainO_h <= opt.rollLen)){
            _t.canPlay = false;
        } else {
            var mainHtm = mainO.innerHTML;
            mainO.innerHTML += mainHtm;
            _t.canPlay = true;
        }        
    },
    getCurPos:function(){
         var _t = this,
            mainO = _t.mainO, 
            direct = _t._direct.substr(0,1).toUpperCase() + _t._direct.substr(1), //direct����ĸ��д
            dis = mainO.style["margin" + direct].replace("px","") * 1;  //��ǰλ��
        return dis;
    },
    scroll: function(abc){
        var _t = this,
            wrapO = _t.wrapO, 
            mainO = _t.mainO, 
            opt = _t.options,
            direct = _t._direct.substr(0,1).toUpperCase() + _t._direct.substr(1), //direct����ĸ��д
            directFlag = _t._directFlag,
            preTime = 10,  //ÿ�������ƶ�һ��
            step = opt.rollLen / opt.speed * preTime,  //ÿpreTime�ƶ��Ĳ���
            dis = _t.currentPos,  //��ǰλ��
            initPos = _t.initPos;  //��ʼλ��
        var clearTimer = function(){
            if(_t.timer1){
                window.clearTimeout(_t.timer1);
            }
            if(_t.timer2){
                window.clearInterval(_t.timer2);
            }
        };
        var move = function(){
            clearTimer();
            _t.timer1 = window.setTimeout(function(){                
                if(_t.isStop){ 
                    clearTimer();
                    return; 
                }
                if(Math.abs(dis) >= _t.mainO_h){
                    dis = initPos;
                    mainO.style["margin" + direct] = dis + "px";
                    _t.currentPos = dis;
                }
                var targetPos = dis + directFlag * opt.rollLen;
                _t.timer2 = window.setInterval(function(){
                    if(Math.abs(dis) >= Math.abs(targetPos)){
                        move();
                    }
                    dis += directFlag * step;
                    if(Math.abs(dis) > Math.abs(targetPos)){dis = targetPos;}
                    mainO.style["margin" + direct] = dis + "px";
                    _t.currentPos = dis;                    
                },preTime);
            },opt.rest);
        };
        move();
    },
    stop:function(){
        //��������Ѿ���ֹͣ״̬����������
        if(!this.isMoving || (!this.canPlay)){ return; }
        //�����ƶ�״̬��ֹͣ״̬
        this.isMoving = false;
        this.isStop = true;
    },
    play: function(){ 
        //��������Ѿ����ƶ�״̬����������      
        if(this.isMoving || (!this.canPlay)){ return; }
        //�����ƶ�״̬��ֹͣ״̬������
        this.isMoving = true;
        this.isStop = false;
        this.scroll();
    }
});
//���ض���
function goTop(){
    var btnGoTop = document.getElementById("btnGoTop");

    if($(document).height() <= $(window).height()){
        btnGoTop.style.display = "none";
        return;
    }

    var isLtIe7 = $.browser.msie && $.browser.version < 7;
    var onScroll = function(){
        var win =  $(window);
        var viewH = win.height();
        if(win.scrollTop() <= 500){
            btnGoTop.style.display = "none";
            return;
        }
        btnGoTop.style.display = "block";
        if(isLtIe7){
            var _top = viewH * 0.6 + _b.scrollTop;
            btnGoTop.style.top = _top + "px";
            btnGoTop.style.position = "absolute";
        } 
    };
    onScroll();
    $(window).scroll(onScroll);
    btnGoTop.onclick = function(e){
        e.preventDefault();
        window.scrollTo(0,1);
    };
}