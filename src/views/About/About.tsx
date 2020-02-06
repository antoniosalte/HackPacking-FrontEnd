import * as React from "react";
import Footer from "../Home/Footer";
import "./styles.scss";
import { MetaWrapper } from "../../components";
import about1 from "../../images/hp-blog-1.svg";
import about2 from "../../images/hp-blog-2.svg";
import about3 from "../../images/hp-blog-3.svg";
import about4 from "../../images/hp-blog-4.svg";
import Item from "./Item";
import { useUserDetails } from "@sdk/react";

const items = [
  {
    image: about1,
    text: <h2>"Travel light"</h2>,
    description:
      "Forget about checking luggage, paying extra or waiting at the carrousel. Just get to the airport and board your plane.",
    position: "left",
  },
  {
    image: about2,
    text: <h2>"Get only what you will use"</h2>,
    description:
      "We will send T-shirts, shirts, pants and underwear with several sizes. Worn but proper and clean.",
    position: "right",
  },
  {
    image: about3,
    text: <h2>"Receive everything on time"</h2>,
    description:
      "Don’t worry about delays or lost luggage. Your clothes will be at your hotel when you arrive.",
    position: "left",
  },
  {
    image: about4,
    text: <h2>"Save the environment"</h2>,
    description:
      "Diminish your carbon footprint by not bringing your luggage with you.",
    position: "right",
  },
];
const About = () => {
  const { data: user } = useUserDetails();
  return (
    <MetaWrapper
    meta={{
      description: "Learn more about what we do and how to travel lighter and with less worries.",
      title: "Who we are, what we do | HackPacking",
    }}
  >
    <div className="container-blog">
      <div className="container">
        <h1 className="container-blog-c__title">About</h1>
        <div className="container-blog-c">
          {items.map(item => {
            return <Item item={item} />;
          })}
        </div>
      </div>
      <br />
      <Footer user={user} />
    </div>
    </MetaWrapper>
  );
};
export default About;
