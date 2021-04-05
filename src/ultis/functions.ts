export function isNumeric(numeric) {
    return !isNaN(parseFloat(numeric)) && isFinite(numeric);
}