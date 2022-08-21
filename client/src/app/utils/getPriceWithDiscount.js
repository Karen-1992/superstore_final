export function getPriceWithDiscount(percent, price) {
    const discountValue = Math.ceil((price * percent) / 100);
    const finalPrice = +(price - discountValue).toFixed();
    return { discountValue, finalPrice };
}
