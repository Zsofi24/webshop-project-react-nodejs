import { redirect } from "react-router-dom"
import { API_URL } from "../constants"

export default async function requireAuth() {
    // const resp = await fetch(`${API_URL}/api/admin-verify`, {credentials: 'include'})
    // const resp2 = await resp.json();
    // console.log(resp2);
    // const isLoggedIn = resp2.isAdmin;
    // console.log(isLoggedIn);

    const isLoggedIn = true;

    if(!isLoggedIn) throw redirect("/belepes")
    return null
}