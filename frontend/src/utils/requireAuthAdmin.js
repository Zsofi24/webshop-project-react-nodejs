import { redirect } from "react-router-dom"
import { API_URL } from "../constants"

export default async function requireAuthAdmin() {

    const resp = await fetch(`${API_URL}/auth/admin-verify`, 
        {credentials: 'include'}
    )
    if(!resp.ok) {
        if(resp.status == 401) throw redirect("/belepes?message=Admin jogosultág szükséges. Jelentkezzen be!");
        else if(resp.status == 403) throw redirect("/?message=Nincs jogosultsága.")
        else throw redirect("/?message=Szerver hiba:(")
    }

    return null;
}
