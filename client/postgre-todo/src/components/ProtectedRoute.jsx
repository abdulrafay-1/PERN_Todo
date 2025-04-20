import React, { useEffect } from 'react'
import { token } from '../instance'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])
    return (
        token && children
    )
}

export default ProtectedRoute