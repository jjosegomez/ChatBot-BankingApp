import { React, useState } from "react"



const Navbar = (props) => {
    const [clicked, setClicked] = useState(false)

    const userClicked = () => {
        setClicked(!clicked)
        console.log(clicked)
    }

    return (
        <div className="navbar">
            <figure className="logo">
                <img src="https://picsum.photos/200"></img>
            </figure>
            <ul className="navbar-items">
                <a href="#">home</a>
                <a href="#">home</a>
                <a href="#">home</a>
                <a href="#">home</a>
            </ul>
        </div>
    )
}


export default Navbar