const symbols = ['🍓','🚀','🐱','🌈','🎮','🍕','🦋','⚽'];
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timeEl = document.getElementById('time');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart');
let first = null, second = null, locked = false, moves = 0, pairs = 0, seconds = 0, timer = null, started = false;
function shuffle(arr) { for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
function clock(){seconds++;timeEl.textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
function startClock(){if(!started){started=true;timer=setInterval(clock,1000);}}
function createCard(symbol,index){const b=document.createElement('button');b.className='card';b.type='button';b.textContent='?';b.setAttribute('aria-label','Carta oculta');b.dataset.symbol=symbol;b.dataset.index=index;b.addEventListener('click',()=>flip(b));return b;}
function flip(card){if(locked||card.classList.contains('flipped')||card.classList.contains('matched'))return;startClock();card.classList.add('flipped');card.textContent=card.dataset.symbol;card.setAttribute('aria-label',`Carta ${card.dataset.symbol}`);
 if(!first){first=card;return;} second=card; moves++;movesEl.textContent=moves;locked=true;
 if(first.dataset.symbol===second.dataset.symbol){first.classList.add('matched');second.classList.add('matched');pairs++;pairsEl.textContent=`${pairs} / 8`;messageEl.textContent='¡Pareja encontrada!';resetTurn();if(pairs===8){clearInterval(timer);messageEl.textContent=`¡Ganaste en ${moves} movimientos y ${timeEl.textContent}!`;}}
 else {messageEl.textContent='No coinciden. Intenta otra vez.';setTimeout(()=>{first.classList.remove('flipped');second.classList.remove('flipped');first.textContent='?';second.textContent='?';first.setAttribute('aria-label','Carta oculta');second.setAttribute('aria-label','Carta oculta');resetTurn();},850);}}
function resetTurn(){first=null;second=null;locked=false;}
function newGame(){clearInterval(timer);timer=null;started=false;seconds=0;moves=0;pairs=0;first=null;second=null;locked=false;movesEl.textContent='0';pairsEl.textContent='0 / 8';timeEl.textContent='00:00';messageEl.textContent='¡Encuentra las 8 parejas!';board.innerHTML='';shuffle([...symbols,...symbols]).forEach((s,i)=>board.appendChild(createCard(s,i)));}
restartBtn.addEventListener('click',newGame);newGame();
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(err=>console.log('No se pudo registrar el Service Worker',err)));}
