window.onload=function(){
	// 3.写一个函数,在页面中用定位创建28个元素,放到一个div中
	// 28个元素都用定位,
// 排放上部扑克
	var sence = document.getElementById('sence'),
		box   = document.getElementById('box'),
		puKe,puKes;
	sence.onmousedown = function(e){
		e.preventDefault();
	};
	var fn3 = function(){
		for(var i=0;i<7;i++){
			for( var k=0;k<i+1;k++){
				puKe = document.createElement('div');
				puKe.setAttribute('class','poker');
				puKe.setAttribute('id',i+'_'+k);
				puKe.style.top = 40*i +'px';
				puKe.style.left = 68*(7-i) + k*136 + 'px';
				box.appendChild(puKe);
			}
		}
	};
	fn3();
// 下面左扑克
	var fn6 = function(){
		for(var i=0;i<24;i++){
				puKes = document.createElement('div');
				puKes.setAttribute('class','poker xiaLeft');
				puKes.setAttribute('id','g' + i);
				box.appendChild(puKes);
		}
	};
	fn6();
// 事件委托  上部扑克点击事件
	var dict = {1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K'};
	var dicts = {A:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',J:'11',Q:'12',K:'13'};
	var previous = null,pre = null,wenZi;
	box.onclick = function(e){
		if(e.target == this) return;
		var id = e.target.getAttribute('id').split('_');
		var x = Number(id[0]),
			y = Number(id[1]);
		var nl = document.getElementById((x+1) +'_'+ y),
			nr = document.getElementById((x+1) +'_'+ (y+1));
		if(nl || nr) return;
		wenZi = e.target.firstElementChild.innerHTML;
		if(previous !== null){
			previous.style.webkitTransform = 'scale(1,1)';	
			previous.style.color = '#950B32';
		}
		if(pre !== null && Number(dicts[wenZi]) + Number(dicts[pre]) == 13){
			box.removeChild(e.target);
			box.removeChild(previous);
			wenZi = null;
		}
		if(Number(dicts[wenZi]) == 13){
			box.removeChild(e.target);	
		}
		if(els.length == 0){
			win.style.display = 'block';
			strong.innerHTML = '亲,,恭喜成功哦^_^!!!';
			shure.onclick = function(e){
				location.reload();
			};
			return; 
		}
		var el = e.target;
		el.style.webkitTransform = 'scale(1.1,1.1)';
		el.style.color = '#8B0086';
		previous = el;	
		pre = wenZi;
		if(kaiguan){
			count = xiaLeft.length - xiaLefts.length - 1;
		}else{
			count = xiaLeft.length - 1;
		}
	};	
// 5.生成乱序扑克
	var hh = ['rd','bk','fk','mh'];
	var fn5 = function(){	
		var zidian = {};
		var poker = [],hs,nu;
		while(poker.length != 52){
			hs = hh[Math.floor(Math.random()*4)];
	    	nu = dict[Math.floor(Math.random()*13+1)];
	    	var pai = { huase:hs,number:nu};
			if(!zidian[hs+nu]){
				poker.push(pai);
				zidian[ hs+nu ] = true;
			}	
		}
		return poker;		
	};
// 扑克添加背景
	var poker = fn5();
	var els = document.getElementsByClassName('poker');
	//不可移动至画扑克之前
	for(var i=0;i<28;i++){
		els[i].innerHTML = '<span class="tou" index="'+i+'">'+poker[i].number+'</span><span class="wei">'+poker[i].number+'</span>';
		if(poker[i].huase == 'rd'){
			els[i].style.backgroundImage = 'url(./images/1.jpg)';
		}else if(poker[i].huase == 'bk'){
			els[i].style.backgroundImage = 'url(./images/2.jpg)';
		}
		else if(poker[i].huase == 'fk'){
			els[i].style.backgroundImage = 'url(./images/3.jpg)';
		}else if(poker[i].huase == 'mh'){
			els[i].style.backgroundImage = 'url(./images/4.jpg)';
		}	
	}
	for(;i<52;i++){
		els[i].innerHTML = '<span class="tou">'+poker[i].number+'</span><span class="wei">'+poker[i].number+'</span>';
		if(poker[i].huase == 'rd'){
			els[i].style.backgroundImage = 'url(./images/1.jpg)';
			els[i].style.color = '#950B32';
		}else if(poker[i].huase == 'bk'){
			els[i].style.backgroundImage = 'url(./images/2.jpg)';
		}
		else if(poker[i].huase == 'fk'){
			els[i].style.backgroundImage = 'url(./images/3.jpg)';
			els[i].style.color = '#950B32';
		}else if(poker[i].huase == 'mh'){
			els[i].style.backgroundImage = 'url(./images/4.jpg)';
		}
	}
	// 翻牌
	var button = document.getElementById('button');
	var xiaLeft = document.getElementsByClassName('xiaLeft');
	var counts = 1,xiaLefts;
	var count = xiaLeft.length-1,kaiguan = false,jishu = 0;
	var win = document.getElementById('win'),
		shure = document.getElementById('shure'),
		strong = document.querySelector('#win strong');
	button.onclick = function(e){
		e.stopPropagation();
		kaiguan = true;
		console.log(els.length);
		if(jishu == 3){ 
			win.style.display = 'block';
			if(els.length == 0){
				strong.innerHTML = '亲,,恭喜成功哦^_^!!!';
			}else{
				strong.innerHTML = '亲,莫伤心,再接再厉哦(∩_∩)';
			}
			shure.onclick = function(e){
				location.reload();
			};
			return;  
		}
		if(count < 0){
			jishu++;
			for(var i=0; i<xiaLeft.length; i++){
				xiaLeft[i].setAttribute('class','poker xiaLeft');
				xiaLeft[i].style.zIndex = i;
			}
			count = xiaLeft.length-1;
			counts = 1;
		}else{
			xiaLeft[count].setAttribute('class','poker xiaLeft xiaLefts');
			xiaLeft[count].style.zIndex = counts;
			xiaLefts = document.getElementsByClassName('xiaLefts');
			counts++;
			count--;
		}
	};


	// 1.写一个函数,在控制台中输出10行*	
	// var fn = function(){	
	// 	for(var i=0;i<9;i++){
	// 		var ttt = '';	
	// 			for(var k=0;k<i+1;k++){
	// 				ttt += '*';
	// 			}
	// 		console.log(ttt);
	// 		console.log(' ');	
	// 	}
	// };
	// fn();
	// var fn2 = function(){
	// 	for(var i=0;i<5;i++){
	// 		for(var j=0;j<4-i;j++){
	// 			document.write('-');
	// 		}
	// 		for(var k=0;k<1+2*i;k++){
	// 			document.write('*');
	// 		}
	// 		document.write('<br/>');
	// 	}
	// };
	// fn2();
	// 写一个函数 生成一个随机数组 长度为13; [ ] 里面为1-13的随机数
	// 遍历这个数组 按我们的规则输出数字
	// var fn4 = function(){
	// 	var arr = [];
	// 	for(i=1;i<14;i++){
	// 		arr.push(Math.floor(Math.random()*13+1));
	// 	}
	// 	for(k=1;k<arr.length;k++){
	// 		console.log(dict[arr[k]]);
	// 	}
	// };
	// fn4();
	// 6.写一个函数 生成一副乱序的扑克牌
	// var huase = ['rd','bk','fk','mh'];  //[1->13]
	// var poker = [
	// 			{huase:'rd',number:'8'},
	// 			{huase:'fk',number:'7'},
	// 			{huase:'mh',number:'9'},
	// 			{huase:'bk',number:'J'}
	// 			];

};