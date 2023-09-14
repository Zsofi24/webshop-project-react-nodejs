function passwordValidation(pwd) {
    if(pwd.trim().length < 4) return false
    return true
}

function emailValidation(email) {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true
    return false
}

function nameValidation(name) {
    if(name.trim().length < 2) return false
    return true
}

export function formValidation(name, value) {
    switch (name) {
        case 'password': 
            return passwordValidation(value);
            break;
        case 'email' :
            return emailValidation(value);
            break;
        case 'username' :
            return nameValidation(value);
            break;
    }
}