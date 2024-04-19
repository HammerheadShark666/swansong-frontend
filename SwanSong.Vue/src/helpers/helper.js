
export const MESSAGE_INFO = 'info';
export const MESSAGE_WARNING = 'warning';
export const MESSAGE_ERROR = 'error';

export const ALERT_DELAY_REMOVE_TIME = 5000;

export function getAlbumSongsTotalLength(rows) { 

    const { data } = rows;
    let sum = "";

    if(data.length > 0) {

        let minutes = 0;
        let seconds = 0;

        data.forEach((column, index) => {

            const length = data[index].song.length;
            let hoursMinutes = length.split(":")

            if(hoursMinutes.length == 2)
            {
                minutes = minutes + Number(hoursMinutes[0]);
                seconds = seconds + Number(hoursMinutes[1]);
            }            
        });

        let secondsToMinutes = Math.floor(seconds / 60);
        let leftOverSeconds = seconds % 60;

        minutes = minutes + secondsToMinutes;
        seconds = leftOverSeconds;
        sum = minutes + ":" + (seconds<10 ? "0" + seconds : seconds);
    }

    return sum;
}

export function getListOfNumbers(min, max) {
    
    var list = [];
    for(var number = min; number <= max; number++) {
        list.push({
            value: number,
            label: number
        })
    }
    return list.reverse();
}

export function formatDate(date) { 
    if(date != null)
        return new Date(date).toShortFormat();
    else
        return '';
}
  
export function validateLength(length) {    
    var lengthArray = length.split(":");
    if(lengthArray.length != 2) {           
        return false;
    } else {
        if((isNaN(lengthArray[0]) || isNaN(lengthArray[1]))
            || !(lengthArray[0] < 60 && lengthArray[1] < 60))         
            return false;
    }
    return true;
}

export function getMessagesBySeverity(messages, severity) {
    return (messages != null && messages.length > 0)
                    ? messages.filter(i => i.severity === severity)
                    : [];
}

export function getAlphabet() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
}

export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim().split('=');
        if (c[0] === name) {
            return c[1];
        }
    }
    return "";
}

export function getYear(date) {
    const d = new Date(date);
    return d.getFullYear();
}

export function delayAlertRemove() {
    var promise = new Promise(function(resolve) {
      window.setTimeout(function() { 
          resolve()
      }, ALERT_DELAY_REMOVE_TIME);
    });
    return promise;
 }

export function getPages(list) {
    const pages = []
    list.forEach((item, index) => { 
        const page = Math. floor (index / 10);
        if (!pages[page]) {
            pages[page] = [];
        }
        pages[page].push(item);
    })
    return pages;   
}