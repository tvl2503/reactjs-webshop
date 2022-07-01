import { RegEmail, RegPassword } from "../constants/regex";
export const isValidEmail = (value) =>{
    return RegEmail.test(value)
}
export const isValidPassword = (value) => {
    return RegPassword.test(value)
}
export const isValidLength = (value, length) => {
    if (value.trim().length >= length) {
        return true;
    }
    return false;
}
export const isNumber = (value) =>{
    return typeof value === 'number' && isFinite(value);
}