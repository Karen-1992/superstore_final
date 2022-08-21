export function getDate(data) {
    if (data) {
        const dateFull = new Date(data);
        const year = dateFull.getFullYear();
        let month = String(dateFull.getMonth() + 1);
        if (month.length === 1) month = 0 + month;
        let date = String(dateFull.getDate());
        if (date.length === 1) date = 0 + date;
        let hours = String(dateFull.getHours());
        if (hours.length === 1) hours = 0 + hours;
        let minutes = String(dateFull.getMinutes());
        if (minutes.length === 1) minutes = 0 + minutes;
        const result = `${date}.${month}.${year} ${hours}:${minutes}`;
        return result;
    }
}
