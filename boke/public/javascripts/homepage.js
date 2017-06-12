$(function(){
	var iNum=-90;
	var oTimer = null
	oTimer = setInterval(function(){
		iNum++;
		if(iNum >=0){
			iNum=0;
		}
		$('.box1 img').css({transform:'rotateY('+iNum+'deg)'},)
	},50);
	
	//console.log(3333);
	//留言板
	$('.aa').click(function(){
			$('#liuyanban').css('display','block');
	})
	/*$('.bb').click((function(){
			$('#liuyanban').css('display','none');
	}))*/
})

