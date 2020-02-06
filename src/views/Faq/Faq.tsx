import * as React from "react";
import Footer from "../Home/Footer";
import "../About/styles.scss";
import "./styles.scss";
import IconQ from "../../images/hp-question.svg";
import { Items } from "./items";
import { useUserDetails } from "@sdk/react";

const ItemQuestion = ({ item }) => (
  <div className="item-question">
    <img src={IconQ} alt="imgicon" />
    <div>
      <p>{item.title}</p>
      <span>{item.description}</span>
    </div>
  </div>
);

const Faq = () => {
  const { data: user } = useUserDetails();
  return (
    <div className="container-blog">
      <div className="container-blog-c container">
        <br />
        <h3 className="faqtitle">Have questions?</h3>
        <br />
        <br />
        <br />
        {Items.map(item => (
          <ItemQuestion key={item.title} item={item} />
        ))}
        <br />
        <br />
        <br />
      </div>
      <Footer user={user} />
    </div>
  );
};
export default Faq;
