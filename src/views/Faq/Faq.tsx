import * as React from "react";
import Footer from "../Home/Footer";
import "../About/styles.scss";
import "./styles.scss";
import IconQ from "../../images/hp-question.svg"
import { Items } from "./items"

const ItemQuestion = ( { item } ) => (
    <div className="item-question">
        <img src={IconQ} alt="imgicon"/>
        <div>
            <p>{item.title}</p>
            <span>{item.description}</span>
        </div>
    </div>
)

const Faq = () => {
    return (
        <div className="container-blog">
            <div className="container-blog-c container">
                <br />
                <h3 className="faqtitle">Have questions?</h3>
                <br /><br /><br />
                {
                    Items.map( item => <ItemQuestion key={item.title} item={item} /> )
                }
                <br /><br /><br />
            </div>
            <Footer />
        </div>
    )
}
export default Faq;