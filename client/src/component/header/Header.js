import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
    return (
        <header>
            <Link to='/'>Home</Link>
            <nav>
                <Link to='/signin'>Sign In</Link>
                <Link to='/Signup'>Sign Up</Link>
            </nav>
        </header>
    )
}
