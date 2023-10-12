import { redirect } from "react-router-dom"
import { API_URL } from "../constants"

export default async function requireAuthAdmin() {
    const resp = await fetch(`${API_URL}/auth/admin-verify`, {credentials: 'include'})
    const admin = await resp.json();
    const isLoggedIn = admin.authenticated;
    const isAdmin = admin.isAdmin;
    if(isLoggedIn && !isAdmin) {
        throw redirect("/?message=Nincs jogosultsága.")
    } else if(!isLoggedIn) {
        throw redirect("/belepes?message=Admin jogosultág szükséges. Jelentkezzen be!");
    }

    return null
}