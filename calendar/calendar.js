
var calendar = $Class.create({
	/*options:{
		defaultDate: "",  //eg. new Date("2013-10-24")

	}*/
	targetO: null,
	oElement: null,
	options : {
		"defaultDate": "",
		"onShow": null
	},
	defaultDate: new Date(),
	today: new Date(),
	currentYear: 0,
	currentMonth: 0,
    init: function(id, options){
    	var _t = this;
    	var oElem = $("#" + id);
    	if(!oElem[0]){ return; }
    	_t.targetO = oElem;
    	_t._setOptions(options);
    	var layer;
    	if(oElem.is("input")){

    	} else {
    		var defDate = _t.defaultDate;
    		_t.generateHtm(_t.targetO, defDate.getFullYear(), defDate.getMonth() + 1, defDate.getDate());
    		layer = _t.targetO;
    	}
    	layer.delegate("a.calendar-btn-prev","click", function(e){ 
    		e.preventDefault(); 
    		_t.generateHtm(layer, _t.currentYear, _t.currentMonth - 1);
    	}).delegate("a.calendar-btn-next","click", function(e){  	
    		e.preventDefault();	
    		_t.generateHtm(layer, _t.currentYear, _t.currentMonth + 1);
    	}).delegate("a.backToday", "click", function(e){
    		e.preventDefault();
    		var newMonth = _t.today.getMonth() + 1, newYear = _t.today.getFullYear();
    		if(newYear == _t.currentYear && newMonth == _t.currentMonth){
    			return;
    		}
    		_t.generateHtm(layer, newYear, newMonth, _t.today.getDate());
    	}).delegate("select.calendar-year-select", "change", function(){
    		var newYear = $(this).val();
    		if(newYear == _t.currentYear){
    			return;
    		}
    		_t.generateHtm(layer, newYear, _t.currentMonth);
    	}).delegate("select.calendar-month-select", "change", function(){
    		var newMonth = $(this).val();
    		if(newMonth == _t.currentMonth){
    			return;
    		}
    		_t.generateHtm(layer, _t.currentYear, newMonth);
    	});
    },    
    _setOptions: function(options){
    	var _t = this;
    	for(var k in options){
    		_t["options"][k] = options[k];
    	}    	
    },

    generateHtm: function(outer, showYear,showMonth,showDate){
    	if(showMonth == 13){ 
    		showMonth = 1; 
    		showYear++;
    	} else if(showMonth == 0){
    		showMonth = 12;
    		showYear--;
    	}
    	var _t = this, 
    		firstDay = new Date(showYear, showMonth - 1, 1);
    		lastDay = new Date(showYear, showMonth, 1),    		//lastDay:下个月的第一天
    		tmpDate = 1,  //记录生成日期时的天    		
    		blankDayCount = firstDay.getDay() - 1;  //前面空白的天数
    		lastDay.setDate(0); //setDate(0)即设置为该日期所在月的最后一天
    	var lastDate = lastDay.getDate();      //最后一天的日期    		

    	_t.currentMonth = showMonth;
    	_t.currentYear = showYear;

    	var htm = [],
    		weekName = ["一","二","三", "四","五","六","日"];

    	htm.push('<div class="calendar">');
    	htm.push('<div class="calendar-top">');
    	htm.push('<a href="#" class="c-btn calendar-btn-prev">&lt;</a>');
    	htm.push('<span class="calendar-year"><select class="calendar-year-select">');
    	for(var i = 2000; i <= 2050; i ++){
    		htm.push('<option value="'+ i +'"'+ (i == showYear ? ' selected="selected"' : "") + '>' + i + '年</option>');
    	}
		htm.push('</select></span>');
		htm.push('<span class="calendar-month"><select class="calendar-month-select">');
		for(var i = 1; i <= 12; i ++){
    		htm.push('<option value="'+ i +'"'+ (i == showMonth ? ' selected="selected"' : "") + '>' + i + '月</option>');
    	}
    	htm.push('</select></span>');
		htm.push('<a href="#" class="c-btn backToday">返回今天</a>');
		htm.push('<a href="#" class="c-btn calendar-btn-next">&gt;</a>');
		htm.push('</div><div class="calendar-body">');
		htm.push('<table cellpadding="0" cellspacing="0" class="calendar-table">');
		htm.push('<thead><tr>');
		for(var i = 0, l = weekName.length; i < l ; i ++){
			htm.push('<th>'+ weekName[i] +'</th>');
		}
		htm.push('</tr></thead>');

		htm.push('<tbody>');

		for(var i = 0, weekCount = Math.ceil((lastDate - ( 7 - blankDayCount)) / 7) + 1; i < weekCount ; i ++){

			htm.push('<tr>');
			for(var j = 1; j <= 7; j ++){
				if(i == 0 && j <= blankDayCount){
					htm.push('<td></td>');
				} else if(i == weekCount - 1 && tmpDate > lastDate){
					htm.push('<td></td>');
				} else {

					htm.push('<td'+  (j > 5 ? ' class="calendar-tb-weekend"' : "")+'>');
					htm.push('<a href="javascript:void(0);" class="calendar-day'+(tmpDate == showDate ? ' calendar-defDay' : "")+'">' + (tmpDate++) + '</a>');
					htm.push('</td>');			
				}
				
			}
			htm.push('</tr>');
		}
		htm.push('</tbody></table>');
		htm.push('</div></div>');
		htm = htm.join('');
		outer.html(htm);
		var onShow = _t.options["onShow"];
		if(onShow){
			onShow.call(_t, showYear, showMonth);
		}
    }
});