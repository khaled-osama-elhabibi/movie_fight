const debounce = (callback, delay = 500)=>{
    let timerID;
    return (...args)=>{
        if(timerID) clearTimeout(timerID);
        timerID = setTimeout(() => {
            callback.apply(null,args);
        },delay)
    }
}