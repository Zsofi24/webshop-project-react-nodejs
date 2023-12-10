export function minLength(data, minimum) {
    return data !== undefined && data.length >= minimum
}

export function minNumber(number, minimum) {
    return Number(number) >= minimum
}

export function emailValidation(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}