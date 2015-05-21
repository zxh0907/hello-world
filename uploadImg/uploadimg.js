function G(id){	return document.getElementById(id); }
var ua = navigator.userAgent;
var isFirefox = ua.indexOf("Firefox") > -1,
	isIe = ua.indexOf("MSIE") > -1,
	isChrome = ua.indexOf("Chrome") > -1,
	isOpera = ua.indexOf("Opera") > -1,
	browserVer = "";
if(isFirefox){
	browserVer = ua.match(/Firefox[\/\d]+/i).toString().split('/')[1];
} else if(isIe){
	browserVer = ua.match(/MSIE [\d]+/i).toString().split(' ')[1];
} else if(isChrome){
	browserVer = ua.match(/Chrome[\/\d]+/i).toString().split('/')[1];
}
if (window.Node && Node.prototype && !Node.prototype.contains){
	Node.prototype.contains = function (arg) {
	 return !!(this.compareDocumentPosition(arg) & 16)
	}
}

var upImg = {
	msg: {
		"0":"图片上传成功",
		"2":"您目前没有登录，请您登录并重新上传图片",
	    "8":"您上传的图片大于3M，请裁剪或重新选择",
		"9":"网络传输异常，请您重新上传图片",
	    "10":"请上传格式为.jpg、.gif、.png或.bmp的图片",
	    "11":"请选择上传本地图片"
	},
	showResult:function(result){
		var self = this;
		var status = result["status"];

		if(status != "0"){			
			self.showInfo(upImg.msg[status]);			
		} else {
			self.showInfo("");
			G("iptUpImgArea").innerHTML = '<input id="iptImage" type="file" size="30" name="pic" onchange="upImg.checkPic(this);"/>';
			self.abpicPath = result['space_abpic_url'];
			self.picPath = result['space_pic_url'];
			self.showPreview(result['space_abpic_url'], result["pidenc"]);
		}
	},
	maxPicNum: 1,  //最大图片数量
	curPicNum: 0,   //当前上传的图片数量
	curPicIndex: 0,    //当前图片index值
	picSrc: "",   //图片名称,格式如"834ewe113,24sdq23224,dfas232431,"
	showPreview: function(path, pidenc){
		var self = this;
		
		var appendHtm = function(index){
			var htm = [];
			//htm.push('<div class="previewItem" id="previewItem'+ index +'">');
            htm.push('<img id="previewImg' + index + '" class="previews" src="'+ path + pidenc +'.jpg" style="width:120px; height:120px;"/>');
			if(self.maxPicNum > 1){
				htm.push('<a href="#" class="btnDel" pindex="'+ index +'" data-pic="'+ pidenc +'">删除</a>');
				htm.push('<input type="hidden" value="'+ index +'"/> ');
			}			
			
			//htm.push('</div>');
			var tmpNode = document.createElement("div");
			tmpNode.className = "previewItem";
			tmpNode.setAttribute("id", "previewItem"+ index);			
			tmpNode.innerHTML = htm.join("");
			if(self.maxPicNum == 1){
				G("previewArea").innerHTML = "";
			}
			G("previewArea").appendChild(tmpNode);
		};
		appendHtm(self.curPicIndex++);
		if(self.maxPicNum > 1){
			self.curPicNum++;
			self.picSrc += pidenc + ",";
			self.changeFormStatus();
		} else if(self.maxPicNum == 1){
			self.picSrc = pidenc;
		}
		
	},
	init: function(){
		var self = this;
		
		//上传结果确定按钮
		G("btnCfm").onclick = function(){
	    	var handler = this.getAttribute("clickfun");
			if(handler){
				self[handler](self.picSrc);	
			} else {
				parent.Popup.hide();
			}
	    };
		/*
		if(checkStatus != "" && checkStatus != "-1"){
			self.showResultInfo(upImg.msg[checkStatus]);
			return;
		}*/
		//是否设置了最大图片张数
		if(typeof(window.maxPicNum) != "undefined"){
			self.maxPicNum = window.maxPicNum;
		}
		//form id 标志
		self.formIdFlag = form_id + ((typeof(picIdFlag) == "undefined" || picIdFlag == "") ? "" : ("_" + picIdFlag));
		//取消上传
		G("btnCancel").onclick = function(){ parent.Popup.hide(); };
		//确定上传
		G("btnOk").onclick = function(){
			var picSource = self.picSrc;
			if(picSource.length <= 0){
				self.showInfo(self.msg["11"]);
				return;
			} else {
				self.showInfo("");
				if(self.maxPicNum > 1){
					picSource = picSource.substr(0, picSource.length -1).split(",");
					self.picSrc = picSource;
				}
			}
			var formIdFlag = self.formIdFlag;
			parent.uploadImg.clearImgPreview(formIdFlag);
			if(self.maxPicNum > 1){
				for(var i = 0, l = picSource.length; i < l; i ++){
					var tmpPicUrl = self.abpicPath + picSource[i] + ".jpg";
					parent.uploadImg.showSmallImgLst(form_id, tmpPicUrl , i+1);
				}
			} else {								
				if(typeof(hidSmImg) == "undefined" || hidSmImg == false){	
					var tmpPicUrl = self.abpicPath + picSource + ".jpg";				
					parent.uploadImg.showSmallImg(formIdFlag, tmpPicUrl);					
				} else {
					var tmpPicUrl = self.picPath + picSource + ".jpg";
					parent.uploadImg.showImgLink(formIdFlag, tmpPicUrl);
				}
				
			}
			self.showResultInfo(upImg.msg["0"]);
			G("btnCfm").setAttribute("clickfun", "uploadOk");
		};
		
		
		if(self.maxPicNum > 1){		
			//绑定删除
			G("previewArea").onclick = function(e){
				e = e||window.event;
				var target = e.target || e.srcElement;
				if(target.tagName.toLowerCase() == "a" && target.className == "btnDel"){
					self.delPreview(target.getAttribute("pindex"), target.getAttribute("data-pic"));
					if(e.preventDefault){
						e.preventDefault();
					} else {
						return false;
					}
				}
			};
		}
	},
	showResultInfo: function(msg){
		var self = this;
		G("responseData").innerHTML = msg;
		G("response").style.display="";
		G("main").style.display="none";
		self.resizeResultPage();
	},
	//resize 上传结果page
	resizeResultPage:function(){
		parent.Popup.resize(450,250);
	},
	//上传成功
	uploadOk: function(pid){
		if(typeof(parent)!="undefined"){
			parent.uploadImg.uploadImgSuccess(this.formIdFlag, pid);
	        parent.Popup.hide();
		}
	},
	changeFormStatus: function(){
		var self = this;

		var iptFile = G("iptImage");
		if(self.curPicNum >= self.maxPicNum){
			iptFile.setAttribute("disabled","disabled");
		} else {
			iptFile.removeAttribute("disabled");
		}
	},
	//删除
	delPreview: function(index, pidenc){
		var self = this;
		var curPicNum = self.curPicNum;
		G("previewArea").removeChild(G("previewItem" + index));
		self.picSrc = self.picSrc.replace(pidenc + ",", "");
		self.curPicNum--;
		self.changeFormStatus();
	},
	checkPic: function(file){
		var self = this;
		var path = file.value;
		if(self.curPicNum >= self.maxPicNum){
			return;
		}
		if(navigator.userAgent.indexOf("MSIE 7") > 0 || navigator.userAgent.indexOf("MSIE 8") > 0){
			file.select(); 
			if(self == window.parent){
				file.blur();				
			} else {
				window.parent.document.body.focus();
			}		
			path = document.selection.createRange().text;
		}
		if(self.checkType(path)){
			G("formUpImg").submit();
			self.showInfo("正在上传,请稍侯...");
		}
	},
	
	showInfo: function(msg){
		G("info").innerHTML=msg;
		G("info").style.display = msg ? "" :"none";
	},
	checkType: function(filePath){
		var tp = /\.jpg$$|\.jpeg$$|\.gif$$|\.bmp$$|\.png$$/i;
		var self = this;
	    if(tp.test(filePath)){
			return true;
		}else{
			self.showInfo(self.msg["10"]);
			return false;	
		}
	}
};
upImg.init();