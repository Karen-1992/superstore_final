export function getOrderStatus(status) {
    let result;
    switch (status) {
    case "completed": {
        result = "Завершен";
        break;
    }
    case "pending": {
        result = "В обработке";
        break;
    }
    case "canceled": {
        result = "Отменен";
        break;
    }
    default:
        break;
    }
    return result;
}
