import React from "react";
import "./Welcome.css"

const Welcome = () => {
    return(
        <div className="welcome-container">
            <figure className="welcome-img">
                <img scr="https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g"></img>
                <span></span>
            </figure>
            <form action="/submit-form" method="POST">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Welcome