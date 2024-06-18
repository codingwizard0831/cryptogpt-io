/* eslint-disable */
// ----------------------------------------------------------------------

export function isEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isPhoneNumber(phone: string) {
    const phoneRegex = /^\+?([0-9]{1,3})?[-. ]?([0-9]{1,4})[-. ]?([0-9]{1,4})[-. ]?([0-9]{1,9})$/;
    return phoneRegex.test(phone);
}