import { useEffect } from "react"

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem("company_id");
        window.location.href = "/selection";
    }, [])
    return <></>
}