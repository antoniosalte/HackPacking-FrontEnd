import * as React from "react";
import Footer from "../Home/Footer";
import "../About/styles.scss";
import why1 from "../../images/hp-why-1.svg"
import why2 from "../../images/hp-why-2.svg"
import Item from "../About/Item";

const items = [
    {
        image: why1,
        text: "Clothes are a comodity",
        description: "We no longer need to own clothes, in the same way that people are using services for renting cars and homes and leave without chains.",
        position: "left",
    },
    {
        image: why2,
        text: "Save money",
        description: "Think on the amount you will have to pay to the airline to bring and carry your luggage. For less, you will have clothes waiting for you at your hotel and withouth the logistics hassle.",
        position: "right",
    }
]
const Why = () => {
    return (
        <div className="container-blog">
            <div className="container-blog-c container">
                <p className="container-blog-c__title">Why we do this</p>
                <div className="container-blog-c__whycontainer">
                    <p>We think traveling should not be a painful experience</p>
                    <span>You’ve been there. You need to travel tomorrow morning and tonight you are going through the things you need to pack. Worrying that everything is clean and that you don’t have an oversize luggage and pay extra for a miscalculation. Once you arrive to the airport, you suffer queueing for half an hour to leave your luggage and once you arrive you get nervous while waiting for your luggage to come out. Could they have lost it? Once again? You no longer need to suffer this experience again. 
                    </span>
                    <div>We have you covered, and in style.</div>
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
                        justifyContent: "center",
                        fontSize: 24,
                    }}
                >Want to join our team? Please reach out to contact@hackpaking.life</p>
            </div>
            <br/>
            <Footer />
        </div>
    )
}
export default Why;