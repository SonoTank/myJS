let Q=[
  {Ja:'あいうえお',Ro:'aiueo'},
  {Ja:'かきくけこ',Ro:'kakikukeko'},
  {Ja:'さしすせそ',Ro:'sasisuseso'},
  {Ja:'たちつてと',Ro:'tatituteto'},
  {Ja:'なにぬねの',Ro:'naninuneno'}
  ];//問題文


function arrayShuffle(array) {
    for(var i = (array.length - 1); 0 < i; i--){
      // 0〜(i+1)の範囲で値を取得
      var r = Math.floor(Math.random() * (i + 1));
      // 要素の並び替えを実行
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  }
//問題番号が入ったボックスを作る
const box=[];
for(i=0;i<Q.length;i++){
    box.unshift(i);
}
let boxR = arrayShuffle(box);
let boxS = 0;


let Q_i = 0;//回答初期値・現在単語どこまで合っているか判定している文字番号
let Q_l = Q[boxR[boxS]].Ro.length;//計算用の文字の長さ


let countdown=3;
let startBtnRemove=0;
function countUp(){ //3～1までカウントダウン

  if(startBtnRemove===0){
    startBtn.remove();    
    startBtnRemove=1;
  }

  document.getElementById('countdownText').textContent=countdown;
  countdown--;
  const timeoutId=setTimeout(countUp,1000);

  if(countdown<0){
    clearTimeout(timeoutId);
    document.getElementById('countdownText').textContent='';
    quizStart();
  }
}

document.getElementById('startBtn').onclick=countUp;


function quizStart(){
  const startTime = performance.now();

  document.getElementById("textJa").textContent = Q[boxR[boxS]].Ja.substring(Q_i, Q_l); //問題を書き出す
  document.getElementById("textRo").textContent = Q[boxR[boxS]].Ro.substring(Q_i, Q_l); 
  document.getElementById("backtextRo").textContent=Q[boxR[boxS]].Ro.substring(0,0);


  let correct = 0;
  let uncorrect = 0;


  window.addEventListener("keydown", push_Keydown);
    function push_Keydown(event){
    
      let keyCode = event.key;
    
      if (Q[boxR[boxS]].Ro.charAt(Q_i) == keyCode) { //押したキーが合っていたら
    
        Q_i++; //判定する文章に１足す
        correct++;  //正解ポイントを１足す
        document.getElementById("backtextRo").textContent = Q[boxR[boxS]].Ro.substring(0, Q_i); //問題を頭から一文字消す
    
        if (Q_l-Q_i === 0){ //全部正解したら

          Q_i = 0;//回答初期値・現在どこまで合っているか判定している文字番号
          boxS++;
          Q_l = Q[boxR[boxS]].Ro.length;//計算用の文字の長さ
    
                if(boxS===4){ //全4問
                  correctRatio = parseInt(correct / (correct + uncorrect) * 100);

                  const endTime = performance.now();
                  const resultTime = (endTime - startTime) / 1000;

                  let result1 = document.createElement('li');
                  let result2 = document.createElement('li');
                  document.getElementById('resultText').appendChild(result1);
                  document.getElementById('resultText').appendChild(result2);
                  result1.textContent = `かかった時間：${parseInt(resultTime)}秒`;
                  result2.textContent = `正答率：${correctRatio} %`;

                 // document.getElementById("textJa").textContent = `かかった時間：${parseInt(resultTime)}秒`;
                  //document.getElementById("textRo").textContent = `正答率　${correctRatio} %`; 
                  document.getElementById("textJa").textContent = "";
                  document.getElementById("textRo").textContent = "";
                  document.getElementById("backtextRo").textContent = "";
                  removeEventListener("keydown", push_Keydown);

                  let n1 = document.createElement("button");
                  n1.innerText = "reset";
                  n1.setAttribute('class','button');
                  let startBtnDiv = document.getElementById('startBtnDiv');
                  startBtnDiv.appendChild(n1);

 
                  n1.onclick = function(){
                    boxS = 0, Q_i = 0, countdown=3, correct = 0, uncorrect = 0, Q_l = Q[boxR[boxS]].Ro.length;
                    result1.textContent='';
                    result2.textContent='';
                    n1.remove();
                    countUp();
                    }
    
                }else{
                  document.getElementById("textJa").textContent = Q[boxR[boxS]].Ja.substring(Q_i, Q_l); //問題を書き出す
                  document.getElementById("textRo").textContent = Q[boxR[boxS]].Ro.substring(Q_i, Q_l); 
                  document.getElementById("backtextRo").textContent=Q[boxR[boxS]].Ro.substring(0,0);
                }
        }
      }else if(keyCode !== "Shift"){ //押したキーが間違っていたら
        console.log(`!${uncorrect}`);
        uncorrect++;  //不正解ポイントを１足す
      }
    }
}


