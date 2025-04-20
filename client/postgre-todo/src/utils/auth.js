import { useNavigate } from "react-router"
import { instance } from "../instance"
import { toast } from "react-toastify"

export const loginUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await instance.post("/login", data)
            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    })
}

export const logout = async () => {
    const navigate = useNavigate()
    const logout = await instance.post('/logout')
    localStorage.removeItem("token")
    navigate("/login")
    toast.success("Logout successfully")
    return logout
}