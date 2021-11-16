let alertes = [{h: 16, m: 20, title: '알림', notice: '15시 48분'}];



const init = e => {
  setTimeout(e => {
    console.log("alert");
    new Notification('item.title', {body: 'item.notice'});
  }, 5000);
  
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
            console.log("test");
            new Notification(item.title, {body: item.notice});
          }
        }
      }
    }
  }, 100)
}

Notification.requestPermission();
window.onload = init;