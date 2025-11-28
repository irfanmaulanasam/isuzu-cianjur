export const cleanPrice = (priceString) => {
    const rawPrice = priceString.replace(/[^0-9]/g, '');
    return parseInt(rawPrice, 10) || DEFAULT_DATA.hargaTruk;
};