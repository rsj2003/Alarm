const alertes = [{h: 16, m: 30, title: "알림", notice: "${h}시 ${m}분 ${s}초 - ${title}", last: 0}];

const init = e => {
  setInterval(e => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    for(let i = 0; i < alertes.length; i++) {
      const item = alertes[i];
      
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

  $.ajax({
    url:"https://api.twitch.tv/kraken/streams/?offset=0&limit=100&channel=149747285,197886470",
    type: "GET",
    dataType:"json",
    headers: {
        "Accept": "application/vnd.twitchtv.v5+json",
        "Client-ID": "lydfnviwkq2qsjdtyszw0sbexqnc08"
    },
  })
    .done(function(channel){
        console.log(channel);
    })
    .fail(function(error){
        console.log(error);
    });
}

Notification.requestPermission();
window.onload = init;