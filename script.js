// const alarms = [{h: 16, m: 30, title: "알림", notice: "${h}시 ${m}분 ${s}초 - ${title}", last: 0}];
const alarms = localStorage.getItem("alarm-alarms") === null ? [] : JSON.parse(localStorage.getItem("alarm-alarms"));
const appendAlarm = document.querySelector("#append-alarm");
const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const second = document.querySelector("#second");
const week = document.querySelectorAll(".week");
const allWeek = document.querySelector("#all-week");
const title = document.querySelector("#title");
const notice = document.querySelector("#notice");
const alarmList = document.querySelector("#alarm-list");

const th = document.querySelector("#time .text-color .h");
const tm = document.querySelector("#time .text-color .m");
const ts = document.querySelector("#time .text-color .s");
const thb = document.querySelector("#time .text-background .h");
const tmb = document.querySelector("#time .text-background .m");
const tsb = document.querySelector("#time .text-background .s");
const trh = document.querySelector("#timer .text-color .h");
const trm = document.querySelector("#timer .text-color .m");
const trs = document.querySelector("#timer .text-color .s");
const trhb = document.querySelector("#timer .text-background .h");
const trmb = document.querySelector("#timer .text-background .m");
const trsb = document.querySelector("#timer .text-background .s");

const timer = {h: 0, m: 0, s: 0};
const setTimeList = [];
let autoLoad = false;

const fillZero = (width, str) => {
  if(str >= 0 || str < 0) str = str + "";
  return str.length >= width ? str : new Array(width - str.length + 1).join("0") + str;
}

const inputEventHour = e => {
  let val = Math.round(hour.value * 1);

  if(val < 0) val = 24 + (val % 24);
  if(val > 23) val = val % 24;

  hour.value = val;
}

const inputEventMinute = e => {
  let val = Math.round(minute.value * 1);

  if(val < 0) val = 60 + (val % 60);
  if(val > 59) val = val % 60;

  minute.value = val;
}

const inputEventSecond = e => {
  let val = Math.round(second.value * 1);

  if(val < 0) val = 60 + (val % 60);
  if(val > 59) val = val % 60;

  second.value = val;
}

const getAlarmList = e => {
  const items = alarmList.querySelectorAll(".item");
  const date = new Date();
  const y = date.getFullYear();
  const mon = date.getMonth();
  const d = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const ms = date.getMilliseconds();
  
  items.forEach(el => el.remove());

  for(let i = 0; i < setTimeList.length; i++) {
    clearTimeout(setTimeList[i]);
  }

  setTimeList.length = 0;

  for(let i = 0; i < alarms.length; i++) {
    const item = alarms[i];

    const $item = document.createElement("div");
    const $time = document.createElement("h3");
    const $title = document.createElement("h4");
    const $notice = document.createElement("p");
    const $delete = document.createElement("button");

    $item.classList.add("item");
    $delete.classList.add("delete");
    $time.innerText = `${item.h}:${item.m}${item.s !== 0 ? `:${item.s}` : ""}`;
    $title.innerText = item.title;
    $notice.innerText = item.notice;
    $delete.innerText = "삭제";

    let notice = item.notice;
    notice = notice.replace(/(\$\{h\})/g, item.h);
    notice = notice.replace(/(\$\{m\})/g, item.m === undefined ? 0 : item.m);
    notice = notice.replace(/(\$\{s\})/g, item.s === undefined ? 0 : item.s);
    notice = notice.replace(/(\$\{title\})/g, item.title);

    let waitTime = 0;

    if(h > item.h || (h === item.h && m > item.m) || (h === item.h && m === item.m && s > item.s)) {
      waitTime = new Date(y, mon, d + 1, item.h, item.m, item.s).getTime() - date.getTime();
    }else {
      waitTime = new Date(y, mon, d, item.h, item.m, item.s).getTime() - date.getTime();
    }

    console.log(waitTime);

    setTimeList.push(setTimeout(e => {
      new Notification(item.title, {body: notice});
    }), waitTime);

    setTimeList.push(setTimeout(e => {
      new Notification(item.title, {body: notice});
    }), waitTime + (1000 * 60 * 60 * 24));

    $delete.addEventListener("click", e => {
      if(confirm(`"${item.title}" 알람을 삭제하겠습니까?`)) {
        alarms.splice(i, 1);
        localStorage.setItem("alarm-alarms", JSON.stringify(alarms));

        getAlarmList();
      }
    })
    
    $item.append($time);
    $item.append($title);
    $item.append($notice);
    $item.append($delete);
    
    alarmList.append($item);
  }
}

const init = e => {
  const func = e => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const ms = date.getMilliseconds();

    th.innerText = fillZero(2, h);
    tm.innerText = fillZero(2, m);
    ts.innerText = fillZero(2, s);
    thb.innerText = fillZero(2, h);
    tmb.innerText = fillZero(2, m);
    tsb.innerText = fillZero(2, s);

    trh.innerText = fillZero(2, timer.h);
    trm.innerText = fillZero(2, timer.m);
    trs.innerText = fillZero(2, timer.s);
    trhb.innerText = fillZero(2, timer.h);
    trmb.innerText = fillZero(2, timer.m);
    trsb.innerText = fillZero(2, timer.s);

    // for(let i = 0; i < alarms.length; i++) {
    //   const item = alarms[i];
      
    //   if(h === item.h) {
    //     if((item.m === undefined && m === 0) || item.m === m) {
    //       if((item.s === undefined && s === 0) || item.s === s) {
    //         const now = `${h}:${m}:${s}`;
    //         if(item.last !== now) {
    //           let notice = item.notice;
    //           notice = notice.replace(/(\$\{h\})/g, item.h);
    //           notice = notice.replace(/(\$\{m\})/g, item.m === undefined ? 0 : item.m);
    //           notice = notice.replace(/(\$\{s\})/g, item.s === undefined ? 0 : item.s);
    //           notice = notice.replace(/(\$\{title\})/g, item.title);
  
    //           new Notification(item.title, {body: notice});
  
    //           item.last = now;
    //         }
    //       }
    //     }
    //   }
    // }

    if(autoLoad) {
      window.blur();
      window.focus();
    }

    interval = setTimeout(func, 10);
  }

  let interval = setTimeout(func, 10);

  // $.ajax({
  //   url:"https://api.twitch.tv/kraken/streams/?offset=0&limit=100&channel=149747285,197886470",
  //   type: "GET",
  //   dataType:"json",
  //   headers: {
  //       "Accept": "application/vnd.twitchtv.v5+json",
  //       "Client-ID": "lydfnviwkq2qsjdtyszw0sbexqnc08"
  //   },
  // })
  //   .done(function(channel){
  //       console.log(channel);
  //   })
  //   .fail(function(error){
  //       console.log(error);
  //   });

  getAlarmList();
}

appendAlarm.addEventListener("click", e => {
  const result = {};

  result.h = hour.value * 1;
  result.m = minute.value * 1;
  result.s = second.value * 1;

  result.week = [];

  week.forEach(el => {
    if(el.checked) result.week.push(el.id);
  })

  if(result.week.length === 0) return alert("알람이 울릴 요일을 선택해주세요.");

  result.title = title.value;
  result.notice = notice.value;

  alarms.push(result);
  localStorage.setItem("alarm-alarms", JSON.stringify(alarms));

  getAlarmList();
})

hour.addEventListener("input", inputEventHour);
minute.addEventListener("input", inputEventMinute);
second.addEventListener("input", inputEventSecond);

week.forEach(el => el.addEventListener("input", e => {
  let all = true;

  week.forEach(ei => {
    if(!ei.checked) all = false;
  })

  allWeek.checked = all;
}))

allWeek.addEventListener("input", e => {
  const checked = allWeek.checked;

  week.forEach(el => el.checked = checked);
})

Notification.requestPermission();
window.onload = init;