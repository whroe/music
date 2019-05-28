//获取组件
window.onload = function () {
    var source = ['./video/1.mp3', './video/2.mp3', './video/3.mp3'];
    var index = 0;
    var play = document.querySelector('#play');//播放
    var next = document.getElementById('next');//下一曲
    var stop = document.getElementById('stop');//暂停播放
    var prev = document.getElementById('prev');//上一曲
    var List = document.querySelectorAll('#list');//列表
    var Audio = document.getElementById('audio');//歌曲
    var presentTime = document.getElementById('presentTime'); // 当前时间
    var totalTime = document.getElementById('totalTime'); // 总时间
    var curProgrees = document.getElementById('curProgrees'); // 进度条
    var playImg = ['./images/two.jpg', './images/three.jpg', './images/four.jpg'];//封面图片
    var pImg = document.querySelector('.playerImg img');
    console.log(pImg);
    // var num=0;
    var flag = true;
    play.addEventListener('click', startPlay);
    stop.addEventListener('click', stopFn);
    next.addEventListener('click', nextFn);
    prev.addEventListener('click', prevFn);

    //播放功能
    function startPlay(event) {
        // num++;
        // if (num % 2 == 0) {
        //     Audio.play();
        //     play.className = 'play2';
        // } else{
        //     Audio.pause();
        //     play.className = 'play1';
        //     play.title = '暂停';
        // }
        if (flag) {
            Audio.play();
            play.className = 'play2';
            play.title = '播放';
            flag = false;
            setTime();//定义播放时间
            Transform(true);
            sources();
        } else {
            Audio.pause();
            play.className = 'play1';
            play.title = '暂停';
            Transform(false);
            flag = true;
        }
    }
    //停止功能
    function stopFn() {
        flag = false;
        startPlay();
    }
    //下一曲
    function nextFn() {
        index++;
        if (index === source.length) {
            index = 0;
        }
        Audio.src = source[index];
        flag = true;
        startPlay();
        //pImg.src = playImg[index]

        chaneListClass();
    }
    //active
    function chaneListClass() {
        for (var i = 0; i < source.length; i++) {
            List[i].className = '';
            List[index].className = 'active';
            pImg.src = playImg[index];
        }
        // List[index].className = 'active';
        // pImg.src = playImg[index];
    }
    //给每个li绑定事件
    List = [...List];
    for (let i = 0; i < List.length; i++) {
        List[i].addEventListener('click', function () {
            index = i;//设置active类名index索引等于i
            Audio.src = source[i];
            flag = true;
            startPlay(event);
            chaneListClass();
            setTime();
        })
    }
    //transform旋转
    function Transform(flag){
        if(!flag){
        pImg.className='Transform';
        console.log(pImg.style.animationPlayState) 
        pImg.style.animationPlayState ='paused'
        // console.log(pImg.style.animationPlayState)     
        }else{
            pImg.className='Transform';
            console.log(pImg.style.animationPlayState)   
            pImg.style.animationPlayState ='running'   
        // console.log(pImg.style.animationPlayState)                     
        }
    }
    //上一曲
    function prevFn() {
        index--;
        if (index < 0) {
            index = source.length - 1;
        }
        Audio.src = source[index];
        flag = true;
        startPlay();
        pImg.src = playImg[index]

        chaneListClass();
    }
    //设置时间的函数
    function setTime() {
        var Timer = setInterval(function () {
            var allTime = formation(Audio.duration);
            var currentTime = formation(Audio.currentTime);
            //console.log(Audio.currentTime);
            totalTime.innerHTML = allTime; // allTime
            presentTime.innerHTML = currentTime;//currentTime

            progres(Audio.duration, Audio.currentTime);
        })
    }
    //progres函数
    function progres(totalTime, currentTime) {
        curProgrees.style.width = (currentTime / totalTime) * 550 + 'px';
        if (currentTime === totalTime) {
            nextFn();
        }
    }
    //时间
    function formation(time) {
        // 计算分钟 (小于10 补0)
        var minute = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
        // 计算秒 (小于10 补0)
        var second = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
        return minute + ':' + second;
    }
    //最笨方法的歌词同步
    function sources() {
        var lrc = []; //创建歌词数组;
        lrc.push("[00:00.000]Feel the beat of my heart");
        lrc.push("[00:01.300]For some luck than some spark from a second");
        lrc.push("[00:03.300]When we make contact boy");
        lrc.push("[00:04.476]It's a chain reaction");
        lrc.push("[00:06.466]It's a physical-chemical interaction");
        lrc.push("[00:09.466]When we combine feel the satisfaction");
        lrc.push("[00:12.066]Deep inside my soul");
        lrc.push("[00:13.566]When we make contact boy");
        lrc.push("[00:15.566]Feel the heat increase");
        lrc.push("[00:18.066]And the mind's racing");
        lrc.push("[00:19.366]Got me weakening the knees And the urge gasting");
        lrc.push("[00:21.066]I can barely breath");
        //第二段
        lrc.push("[00:26.300]完了！！！");
        lrc.push("[00:30.300]真的完了！！！");
        lrc.push("[00:32.300]真的真的完了！！！");
        lrc.push("[00:36.300]真的真的莫得了！！！");
        lrc.push("[00:44.300]完了！！！");
        var myAudio = document.querySelector('audio')[0];
        var lrcArr = [];
        getLrc();
    
        function getLrc() {
            var timeReg = /\[\d{2}:\d{2}\.\d{3}\]/g;//匹配时间的正则表达式
            var result = [];
            for (var i=0;i<lrc.length;i++) {
                var time = lrc[i].match(timeReg); //获取歌词里的时间
                var value = lrc[i].replace(timeReg, ""); //获取纯歌词文本
                for (var j=0;j<time.length;j++ ) {
                    var t = time[j].slice(1, -1).split(":"); //t[0]分钟，t[1]秒
                    var timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
                    result.push([timeArr, value]);//以[时间(秒)，歌词]的形式存进result
                }
            }
            lrcArr = result;//这个有点多余。。。
            setInterval(showLrc, 200);//设置定时，每200毫秒更新一下
        }
        function showLrc() {
            var curTime = Audio.currentTime;//获取当前的播放时间
            for (var i = 0; i < lrcArr.length; i++) {
                if ((curTime >lrcArr[i][0])&&(curTime<lrcArr[i+1][0])) {
                     //播放时间大于对应歌词时间小于下一句歌词时间就显示当前歌词
                    document.getElementById("lyric").innerHTML = lrcArr[i][1];
                    break;//找到对应歌词就停，不停的话，呵呵。。。
                }
            }
        }
    }
    //键盘事件按空格和上下键切换歌曲
    document.onkeydown = function onkey(e) {
        if(e.keyCode==8 && flag ==true){
            startPlay();
        }else if(e.keyCode==38 && flag ==true){
            prevFn();
        }
        else if(e.keyCode==40 && flag ==true){
            nextFn();
        }else{
            flag==false;
            startPlay();
        }
    }
    //=====================================================//
    var Btn = document.querySelector('.btn');
    var Ul = document.getElementById('pu');
    var Lists = document.querySelectorAll('#pu li img');
    var Images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'];
    var player = document.getElementById('player');
    var Body = document.body;
    var a = 1;
    Btn.addEventListener('click', function () {
        a++;
        if (a % 2 == 0) {
            Ul.style.opacity = 0;
        } else {
            Ul.style.opacity = 1;
        }
    })
    Lists = [...Lists];
    for (let i = 0; i < Lists.length; i++) {
        Lists[i].addEventListener('click', function () {
            var IMG = './images/' + Images[i];
            Body.style.backgroundImage = 'url(' + IMG + ')';
            player.style.backgroundImage = 'url(' + IMG + ')';
            // play.style.transition="all 2s";//css background-image不支持css3  transtion 属性
        })
        this.setInterval(3000);
    }
}
