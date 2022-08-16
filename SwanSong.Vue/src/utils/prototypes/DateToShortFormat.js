Date.prototype.toShortFormat = function() {

    if(this == null || this == undefined || this == '')
        return '';

    let monthNames =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    
    let day = this.getDate();
    
    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];    
    let year = this.getFullYear();
    
    return `${day}-${monthName}-${year}`;  
}
