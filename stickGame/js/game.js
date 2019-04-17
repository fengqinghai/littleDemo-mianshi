$(document).ready(function(){
	var stop=true;//定义一个标签
	var ind=0;
	var min=60;
	var max=$(".contain").offset().top-min//offset()获取对象left和top值  top是offset()的top属性
	console.log(max)
	// 排列柱子的函数
	function play(){
		var num=0;
		for(var i=0;i<4;i++){
			var par=parseInt(Math.random()*(max-min)+min);
			if(i==0){
				$(".pillarbox>div").eq(0).css("left",0);
			}else{
				num=num+par+100;
				$(".pillarbox>div").eq(i).css("left",num);
			}
		}
	}
	play();//执行排列柱子的函数
	// 鼠标点击按钮
	$(".btn").mousedown(function(){
		if(stop){
			$(".btn").css("background","url(img/btn-bg-click.png)")//点击按钮 背景变成灰色
			$(".stick").animate({"height":max},2500);//点击按钮  杆子增长
		}
		
	})
	// 鼠标点击按钮
	// 鼠标松开按钮
	$(".btn").mouseup(function(){
		if(stop){
			stop=false;
			$(".btn").css("background","url(img/btn-bg.png)")//松开按钮  恢复正常颜色
			$(".stick").stop(false,false).addClass('stickdown');//松开按钮  杆子停止动画
			setTimeout(function(){
				$(".man>img").attr("src","img/stick.gif");
				var stickleft=parseInt($(".stick").css("left"));//string  获取杆子的left值
				console.log(typeof(stickleft))//num
				var stickheight=$(".stick").height();//height()方法获得或设置对象的高度
				console.log(typeof(stickheight))//num
				var nextdivleft=parseInt($(".pillarbox>div").eq(ind+1).css("left"))
				$(".man").animate({"left":stickleft+stickheight},1000,function(){//回调函数，是否掉下
					if(stickleft+stickheight>nextdivleft&&stickleft+stickheight<nextdivleft+100){
						$(".man").css("left",nextdivleft+50);//小人left值在下一根柱子的50px处
						$(".man>img").attr("src","img/stick_stand.png");//小人变成静态
						$(".stick").css({"left":nextdivleft+95,"height":0}).removeClass("stickdown");
						$(".contain").animate({"left":-nextdivleft},1000);//柱子整体左移
						stop=true;
						ind++;
						if(ind==3){
							$(".success").show();
							success();
						}
					}else{//否则小人掉下去
						$(".man").animate({"bottom":-$(".man").height()},1000,fail)
						$(".shadow").css("height",$(window).height());
					}
				});
			},1000)
		}
		
	})
	// 鼠标松开按钮
	// replay按钮
	$(".replay").click(function(){
		replay();
	})
	function replay(){
		play();
		$(".success").hide();
		$(".fail").hide();
		$(".stick").css({"left":95,"height":0}).removeClass("stickdown");
		$(".contain").css("left",0);
		$(".man").css({"left":50,"bottom":'98%'});
		$(".man>img").attr("src","img/stick_stand.png");
		$(".shadow").css("height",0);
		stop=true;
		ind=0;
	}
	// 下一关  next
	var leval=1;
	$(".next").click(function(){
		$(".gq").html("关卡"+(++leval));
		replay();
	})
	// 成功名言
	function success(){
		var successarr=[
			'勇敢坚毅真正之才智乃刚毅之志向。 —— 拿破仑',
			'志向不过是记忆的奴隶，生气勃勃地降生，但却很难成长。 —— 莎士比亚',
			'骏马是跑出来的，强兵是打出来的。',
			'只有登上山顶，才能看到那边的风光。',
			'如果惧怕前面跌宕的山岩，生命就永远只能是死水一潭。',
			'平时没有跑发卫千米，占时就难以进行一百米的冲刺。',
			'梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。',
			'没有激流就称不上勇进，没有山峰则谈不上攀登。',
			'真正的才智是刚毅的志向。 —— 拿破仑',
			'山路曲折盘旋，但毕竟朝着顶峰延伸。',
			'只有创造，才是真正的享受，只有拚搏，才是充实的生活。',
			'敢于向黑暗宣战的人，心里必须充满光明。',
			'种子牢记着雨滴献身的叮嘱，增强了冒尖的勇气。',
			'自然界没有风风雨雨，大地就不会春华秋实。',
			'只会幻想而不行动的人，永远也体会不到收获果实时的喜悦。',
			'勤奋是你生命的密码，能译出你一部壮丽的史诗。',
			'对于攀登者来说，失掉往昔的足迹并不可惜，迷失了继续前时的方向却很危险。',
			'奋斗者在汗水汇集的江河里，将事业之舟驶到了理想的彼岸。',
			'忙于采集的蜜蜂，无暇在人前高谈阔论。',
			'勇士搏出惊涛骇流而不沉沦，懦夫在风平浪静也会溺水。'
		];
		var num2=parseInt(Math.random()*19);
		$(".success>p").html(successarr[num2]);
		$(".shadow").css("height",$(window).height());
	}
	// 失败名言
	function fail(){
		var failarr=[
			'志在峰巅的攀登者，不会陶醉在沿途的某个脚印之中。',
			'海浪为劈风斩浪的航船饯行，为随波逐流的轻舟送葬。',
			'人生最重要的一点是，永远不要迷失自己。',
			'一个人承受孤独的能力有多大，他的能力就有多大。',
			'实力塑造性格，性格决定命运。',
			'普通人成功并非靠天赋，而是靠把寻常的天资发挥到不寻常的高度。',
			'对于强者，要关注他们的灵魂，对于弱者，他关注他们的生存。',
			'积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。',
			'成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。',
			'当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。',
			'有的人一生默默无闻，有的人一生轰轰烈烈，甚至千古流芳，为什么会这样？因为默默无闻的人只是满足于现状，而不去想怎么轰轰烈烈过一生，不要求自己，去做，去行动，怎么能够成功？',
			'人性最可怜的就是：我们总是梦想着天边的一座奇妙的玫瑰园，而不去欣赏今天就开在我们窗口的玫瑰。',
			'在人生的道路上，即使一切都失去了，只要一息尚存，你就没有丝毫理由绝望。因为失去的一切，又可能在新的层次上复得。',
			'没有一劳永逸的开始；也没有无法拯救的结束。人生中，你需要把握的是：该开始的，要义无反顾地开始；该结束的，就干净利落地结束。',
			'生命的奖赏远在旅途终点，而非起点附近。我不知道要走多少步才能达到目标，踏上第一千步的时候，仍然可能遭到失败。但我不会因此放弃，我会坚持不懈，直至成功！',
			'不要认为只要付出就一定会有回报，这是错误的。学会有效地工作，这是经营自己强项的重要课程。',
			'苦心人天不负，卧薪尝胆，三千越甲可吞吴。有志者事竞成，破釜沉舟，百二秦川终属楚。',
			'生命本身是一个过程，成功与失败只是人生过程中一些小小的片段，若果把生命与成功或失败联系在一起，生命将失去本身该有的意义。',
			'我们不要哀叹生活的不幸，诅咒命运的不公。在命运面前，我们要做强者，掐住命运的咽喉，叩问命运，改变命运。',
			'努力和效果之间，永远有这样一段距离。成功和失败的唯一区别是，你能不能坚持挺过这段无法估计的距离。'
		];
		var num3=parseInt(Math.random()*19);
		$(".fail>p").html(failarr[num3]);
		$(".fail").show();
	}



})