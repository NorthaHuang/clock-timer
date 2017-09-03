(function(){
    'use strict';
    
    /*==============================*\
             Basic Variables
    \*==============================*/
    
    // 時脈比率, base = 1second
    var clockRate
    
    /* 計時器 for interval 
     * 設定請使用 startInterval()
     * 關閉請使用 stopInterval()
     */
    var timer
    // 可否設定 interval 的鑰匙，避免重複設定造成爆炸 (?)
    var canISetInterval = true;
    
    // 指針 Elements
    var secHand = document.querySelector('#secHand')
    var minHand = document.querySelector('#minHand')
    var hrHand = document.querySelector('#hrHand')
    
    // 上方數字 Elements
    var num = document.querySelectorAll('.num')
    var secNum = document.querySelector('#secNum')
    var minNum = document.querySelector('#minNum')
    var hrNum = document.querySelector('#hrNum')
    
    // 秒, 分, 時 實際數字
    var time
    
    
    
    
    
    /*==============================*\
                Initialize
    \*==============================*/
    /* ※ querySelectorAll 選出來是 array-like objects 
     *    所以無法使用 for/in 作為 遍歷工具！
     *    (大小可能超過 class 個數)
     *
     *    而 forEach 並沒有 support IE 
     *    (又是 IE!!!  ˋ口ˊ//)
     */
    for(var i = 0; i < num.length; i++)
      num[i].innerHTML = '00'
    
    /*========== 繪製時鐘格線 ==========*/
    // 短線
    var line = document.querySelector('#line')
    lineDraw(line, 30, 6)
    
    // 長線
    var longLine = document.querySelector('#longLine')
    lineDraw(longLine, 6, 30)
    
    /* 線條繪製
     * wrap: 線條們的父層
     * loopTimes: 需要的線條數目 / 2 (一條可以顯示 2 線)
     * rotateDeg: 各線條間距的角度
     */
    function lineDraw(wrap, loopTimes, rotateDeg){
      var line
      var subLine
      
      for(var i=0; i<loopTimes; i++){
        var newLine = document.createElement('div')
        wrap.appendChild(newLine)
      }
    
      subLine = wrap.children
      for(var i=0; i<loopTimes; i++)
        subLine[i].style.transform = 'rotate(' + (i*rotateDeg) + 'deg)'
    }
    
    //啟動
    _reset()
    startInterval()
    
    
    // 計時器 function
    function timerFunc(){
      time.min = Math.floor(time.sec % 3600 / 60)
      time.hr = Math.floor(time.sec / 3600)
      
      // 時鐘圖像更新
      handMove()
      // 渲染至純文字區
      timeUpdate()
      
      // 總秒數 in console.
      console.log(time.sec)
      
      // 秒數 Update
      time.sec++
    }
    
    // 設定計時器
    function startInterval(){
      if(canISetInterval){
        timer = setInterval(timerFunc, clockRate*1000)
        canISetInterval = false;
        
        console.log('Timer Start.')
      }
    }
    // 停止計時器
    function stopInterval(){
      if(!canISetInterval){
        clearInterval(timer)
        canISetInterval = true;
        
        console.log('Timer Stop.')
      }
    }
    
    /* 文字列印 
     * 判斷是否需要加上 "0"，然後渲染
    */
    function print(target, value){
      target.innerHTML = value<10 ? '0'+value : value
    }
    
    function timeUpdate(){
        print(secNum, time.sec%60)
        print(minNum, time.min)
        print(hrNum, time.hr)
    }
    
    /* 動畫更新 
     * ratio = 位移比率(degrees)
     */
    function cssUpdate(target, value, ratio){
      target.style.transform = 'rotate(' + (value*ratio) + 'deg)'
    }
    
    function handMove(){
      cssUpdate(secHand, time.sec, 6)
      cssUpdate(minHand, time.min, 6)
      cssUpdate(hrHand, time.hr, 30)
    }
    
    // 重置/初始化
    function _reset(){
      clockRate = 1
      
      time = {
        sec: 0,
        min: 0,
        hr: 0
      }
      
      handMove()
      timeUpdate()
      stopInterval()
      startInterval()

      console.log('Timer Reset.')
    }
    
    
    
    /*==============================*\
                  Button
    \*==============================*/
    // 加速
    var plus = document.querySelector('#plus')
    plus.addEventListener('click', function(){
      stopInterval()
      clockRate>=0.001 ? clockRate /= 2 : alert('極限 1000 倍啦!!!!')
      
      startInterval()
      
      console.log('目前速率: ' + clockRate + ' 倍速！')
    })
    
    // 繼續
    var play = document.querySelector('#play')
    play.addEventListener('click', startInterval)
    
    // 暫停
    var pause = document.querySelector('#pause')
    pause.addEventListener('click', stopInterval)
    
    // 重置
    var reset = document.querySelector('#reset')
    reset.addEventListener('click', _reset)
    
    // 減速
    var minus = document.querySelector('#minus')
    minus.addEventListener('click', function(){
      stopInterval()
      clockRate<10 ? clockRate *= 2 : alert('已經 10 倍慢了，你時間是多不夠用...')
      startInterval()
      
      console.log('目前速率: ' + clockRate + ' 倍速！')
    })
    
    
    
    /*==============================*\
                   Menu
    \*==============================*/
    // Menu
    var website = document.querySelector('#website')
    var menuBtn = document.querySelector('#menuBtn')
    var menu = document.querySelector('#menu')
    
    menuBtn.addEventListener('click', menuToggle)
    
    // Menu 開/關
    function menuToggle(){
      menu.classList.toggle('open')
      menuBtn.classList.toggle('open')
      website.classList.toggle('open')
    }
    
    // List
    var toClock = document.querySelector('#toClock')
    toClock.addEventListener('click', function(){
      alert('開發中，歡迎課金加速解鎖！ (私)')
    })
  })()