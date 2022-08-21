const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const USER_DATA = "userData";
const PAGE_TYPE = "pageType";
const CURRENCY = "currency";

export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
export function setUserData(data) {
    localStorage.setItem(USER_DATA, JSON.stringify(data));
}
export function getUserData() {
    return JSON.parse(localStorage.getItem(USER_DATA));
}
export function removeUserData() {
    localStorage.removeItem(USER_DATA);
}
export function setPageFormType(type) {
    localStorage.setItem(PAGE_TYPE, type);
}
export function getPageFormType() {
    return localStorage.getItem(PAGE_TYPE);
}
export function removePageFormType() {
    localStorage.removeItem(PAGE_TYPE);
}
export function setCurrency(currency) {
    localStorage.setItem(CURRENCY, JSON.stringify(currency));
}
export function getCurrency() {
    return JSON.parse(localStorage.getItem(CURRENCY));
}
export function removeCurrency() {
    localStorage.removeItem(CURRENCY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData,
    setUserData,
    getUserData,
    removeUserData,
    setPageFormType,
    getPageFormType,
    removePageFormType,
    setCurrency,
    getCurrency,
    removeCurrency
};
export default localStorageService;
