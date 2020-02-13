import * as React from "react";
import Footer from "../Home/Footer";
import "../About/styles.scss";
import "./styles.scss";
import { MetaWrapper } from "../../components";
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
    <MetaWrapper
    meta={{
      description: "Need more info? These are some of the frequently asked questions we receive.",
      title: "FAQ – Frequent questions and answers | HackPacking",
    }}
  >
    <div className="container-blog">
      <div className="container-blog-c container">
        <br />
        <h1 className="faqtitle">Have questions?</h1>
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
    </MetaWrapper>
  );
};
export default Faq;
