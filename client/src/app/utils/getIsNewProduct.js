export function getIsNewProduct(createdAt, timeInHour) {
    const dateNow = Date.now();
    const createdDate = new Date(createdAt).getTime();
    const difference = (dateNow - createdDate) / (1000 * 60 * 60);
    return difference < timeInHour;
}
