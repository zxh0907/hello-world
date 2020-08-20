//页面在微信中分享所用的JS
//调用方法：Share.init({title, link, imgUrl, appkey})

var Share = {
    wxData: !1,
    isWeixin: function() {
        var e = navigator.userAgent.toLowerCase();
        return /micromessenger/.test(e) ? !0 : !1
    },
    setData: function(e) {
        this.wxData = e,
        this.setWXShareCallback()
    },

    setWXShareCallback: function() {
        var e = this;
        wx.onMenuShareTimeline({
            title: e.wxData.title,
            link: e.wxData.link || location.href,
            imgUrl: e.wxData.img,
            success: function() {},
            cancel: function() {}
        }),
        wx.onMenuShareAppMessage({
            title: e.wxData.title,
            desc: e.wxData.text,
            link: e.wxData.link || location.href,
            imgUrl: e.wxData.img,
            trigger: function(e) {},
            success: function(e) {},
            cancel: function(e) {},
            fail: function(e) {}
        })
    },
    init: function(data) {
        var t = this;
        if(!t.isWeixin){
            return;
        }
        data && (this.wxData = data);
        $.getScript(location.protocol + "//res.wx.qq.com/open/js/jweixin-1.0.0.js", function(data){
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'jcb',
                url: location.protocol + '//api.xxxx.cn/getWeixinJsConfig',   //使用时修改，获取appsecret的服务端接口
                data: {
                  url: location.href.split('#')[0],
                  appkey: t.wxData.appkey
                },
                success: function(result) {
                  if (result.errno == 0) {
                    t.bindWxEvent(result.data);
                  }
                }
            });
        });
        
    },
    bindWxEvent: function(config) {
        wx.config({
            debug: !1,
            appId: config.appId,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "scanQRCode", "startRecord", "stopRecord", "onVoiceRecordEnd", "translateVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage"]
        });
        var t = this;
        wx.ready(function() {
            t.wxData && t.setWXShareCallback()
        })
    }
};
