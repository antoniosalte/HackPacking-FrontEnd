import { useUserDetails } from "@sdk/react";
import * as React from "react";
import Item from "../About/Item";
import why1 from "../../images/hp-why-1.svg"
import why2 from "../../images/hp-why-2.svg"
import Footer from "../Home/Footer";

import "../About/styles.scss";

const items = [
    {
        description: "Let’s keep it simple, like we already do with transportation, accommodation and food delivery. Now you can get basic clothing deliver to your hotel.",
        image: why1,
        position: "left",
        text: "An outfit is just an outfit",
    },
    {
        description: "Nowadays you can get better deals on plane tickets if you travel luggage free. Meet your clothes at your destination and cut some expenses. ",
        image: why2,
        position: "right",
        text: "Save money",
    },
]
const Why = () => {
    const { data: user } = useUserDetails();
    return (
        <div className="container-blog">
            <div className="container-blog-c container">
                <p className="container-blog-c__title">Why we do this</p>
                <div className="container-blog-c__whycontainer">
                    <p>We think traveling should not be a painful experience</p>
                    <span>You’ve been there. You need to take a plane early in the morning and just the night before you're going through your things to choose what to pack. You hope that the shirt that you need is clean, that your luggage isn´t oversize. Then you have to go three hours early to the airport because there is a long queue waiting for your luggage. Let´s hope you don´t have to pay for extra weight. 
                    </span>
                    <div>And when you go back, the same: waiting around the carousel to get your belongings, hoping that they were not lost. Worry no more. We have you covered (and in style).</div>
                </div>
                {
                    items.map( item => {
                        return (
                            <Item item={ item }/>
                        )
                    })
                }
                <p className="container-blog-c__title"
                    style={{
                        display: "flex",
                        fontSize: 24,
                        justifyContent: "center",
                    }}
                >Want to join our team? Please reach out to contact@hackpaking.life</p>
            </div>
            <br/>
            <Footer user={user}/>
        </div>
    )
}
export default Why;