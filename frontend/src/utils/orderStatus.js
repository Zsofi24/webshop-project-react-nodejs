export default function orderStatus(statusCode) {
    if(statusCode == 1) return "Feldolgozás alatt"
    else if(statusCode == 2) return "Csomagolás alatt"
    else if(statusCode == 3) return "Kézbesítés folyamatban"
    else if(statusCode == 4) return "Kézbesítve"
    else if(statusCode == 5) return "Visszaküldve"
}