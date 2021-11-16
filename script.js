let alertes = [{h: 16, m: 30, title: "알림", notice: "${h}시 ${m}분 ${s}초 - ${title}"}];



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
            let notice = item.notice;
            notice = notice.replace(/(\$\{h\})/g, item.h);
            notice = notice.replace(/(\$\{m\})/g, item.m === undefined ? 0 : item.m);
            notice = notice.replace(/(\$\{s\})/g, item.s === undefined ? 0 : item.s);
            notice = notice.replace(/(\$\{title\})/g, item.title);

            new Notification(item.title, {body: item.notice});
          }
        }
      }
    }
  }, 100)
}

Notification.requestPermission();
window.onload = init;