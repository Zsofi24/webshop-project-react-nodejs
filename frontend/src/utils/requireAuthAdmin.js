import { redirect } from "react-router-dom"
import { API_URL } from "../constants"

export default async function requireAuthAdmin() {
    const resp = await fetch(`${API_URL}/auth/admin-verify`, {credentials: 'include'})
    const resp2 = await resp.json();
    const isLoggedIn = resp2.authenticated;
    const admin = resp2.isAdmin;
    if(isLoggedIn && !admin) {
        throw redirect("/?message=Nincs jogosultsága.")
    } else if(!isLoggedIn) {
        throw redirect("/belepes?message=Admin jogosultág szükséges. Jelentkezzen be!");
    }

    return null
}