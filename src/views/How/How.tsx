import * as React from "react";
import Footer from "../Home/Footer";
import "../About/styles.scss";
import "./styles.scss";

import how1 from "../../images/hp-how1.png"
import how2 from "../../images/hp-how2.svg"
import how3 from "../../images/hp-how3.svg"
import triangle from "../../images/hp-how-triangle.png"
import { useUserDetails } from "@sdk/react";
import Item from "../About/Item";

const items = [
    {
        image: how1,
        text: "Step 1 - Before your trip",
        description: "Let us know where are you going, where are you staying, when will you arrive and for how long. Then, select the amount of clothes you will need. We will make a pre-selection based on your travel time but you are free to check the number, sizes and styles.",
        position: "left",
    },
    {
        image: how2,
        text: "Step 2 - When you arrive",
        description: "Once you arrive to your hotel or hostel room, you will find your clothes on your bed! They will be inside a bag (and maybe we will add some surprises for free).",
        position: "right",
    },
    {
        image: how3,
        text: "Step 3 - When you leave",
        description: "You just need to leave your clothes in the same bag in which they arrived so other people can benefit from them. You can keep the underwear. We will then get them back, clean them and store them in our facilities.",
        position: "left",
    }
]
const How = () => {
    const { data: user } = useUserDetails();
    return (
        <div className="container-blog">
            <div className="container-blog-c container">
                <div style={{
                    height: "70vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 30,
                    textAlign: "center",
                    justifyContent: "center",
                    fontWeight: 500,
                }}>
                    <p
                    style={{margin: "10px 0"}}
                    >Just think on your trip, we will </p>
                    <p style={{margin: "10px 0"}}>take care of your clothes.</p>
                </div>
                <br />
                <div className="triangle-image">
                    <img src={triangle} alt="img"/>
                </div>
                <br/><br/><br/>
                {
                    items.map( item => {
                        return (
                            <Item item={ item }/>
                        )
                    })
                }
            <br/>
            </div>
            <Footer user={ user }/>
        </div>
    )
}
export default How;