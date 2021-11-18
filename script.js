// const alarms = [{h: 16, m: 30, title: "알림", notice: "${h}시 ${m}분 ${s}초 - ${title}", last: 0}];
const alarms = localStorage.getItem("alarm-alarms") === null ? [] : localStorage.getItem("alarm-alarms");
const appendAlarm = document.querySelector("#append-alarm");
const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const second = document.querySelector("#second");
const su = document.querySelector("#su");
const mo = document.querySelector("#mo");
const tu = document.querySelector("#tu");
const we = document.querySelector("#we");
const th = document.querySelector("#th");
const fr = document.querySelector("#fr");
const sa = document.querySelector("#sa");
const title = document.querySelector("#title");
const notice = document.querySelector("#notice");
const alarmList = document.querySelector("#alarm-list");

const getAlarmList = e => {
  const items = alarmList.querySelector(".item");
  items.forEach(el => el.remove());

  for(let i = 0; i < alarms.length; i++) {
    const item = alarms[i];

    const $item = document.createElement("div");
    const $time = document.createElement("h3");
    const $title = document.createElement("h4");
    const $notice = document.createElement("p");

    $item.classList.add("item");
    $time.innerText = `${item.h}:${item.m}${item.s !== 0 ? `:${item.s}` : ""}`;
    $title.innerText = item.title;
    $notice.innerText = item.notice;
    
    alarmList.append($item);
  }
}

const init = e => {
  setInterval(e => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    for(let i = 0; i < alarms.length; i++) {
      const item = alarms[i];
      
      if(h === item.h) {
        if((item.m === undefined && m === 0) || item.m === m) {
          if((item.s === undefined && s === 0) || item.s === s) {
            const now = `${h}:${m}:${s}`;
            if(item.last !== now) {
              let notice = item.notice;
              notice = notice.replace(/(\$\{h\})/g, item.h);
              notice = notice.replace(/(\$\{m\})/g, item.m === undefined ? 0 : item.m);
              notice = notice.replace(/(\$\{s\})/g, item.s === undefined ? 0 : item.s);
              notice = notice.replace(/(\$\{title\})/g, item.title);
  
              new Notification(item.title, {body: notice});
  
              item.last = now;
            }
          }
        }
      }
    }
  }, 10)

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

  result.title = title.value;
  result.notice = notice.value;

  alarms.push(result);
  localStorage.setItem("alarm-alarms", alarms);

  getAlarmList();
})

Notification.requestPermission();
window.onload = init;