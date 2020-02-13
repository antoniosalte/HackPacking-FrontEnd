import "./scss/index.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import homeHero from "../../images/hp-homehero.png";
import Step1 from "../../images/step1-hp.svg";
import Step2 from "../../images/step2-hp.svg";
import Step3 from "../../images/step3-hp.svg";

import Card from "./Card";
const cards = [
  {
    id: "Card1",
    title: "Step #1: Before your trip",
    description: "Set up your trip information and select desired clothes.",
    image: Step1,
  },
  {
    id: "Card2",
    title: "Step #2: When you arrive",
    description:
      "You will receive a package with your clothes inside your room.",
    image: Step2,
  },
  {
    id: "Card3",
    title: "Step #3: When you leave",
    description:
      "Simply leave the clothes inside the package at your hotel reception.",
    image: Step3,
  },
];

const Page: React.FC<{
  loading: boolean;
  user: any;
}> = ({ loading, user }) => (
  <>
    <div className="home-page__hero">
      <div className="container">
        <div className="home-page__cont-home">
          <div className="home-page__cont-home__c1">
            <p>Never travel with luggage again.</p>
            <span>
              We deliver you clean and comfortable clothes for your trip so you
              don’t have to pack your luggage everytime you fly.{" "}
            </span>
            <Link to="/start">
              <button>Get Started</button>
            </Link>
          </div>
          <div className="home-page__cont-home__c2">
            <img src={homeHero} alt="imghome" />
          </div>
        </div>
        <Footer home user={user} />
      </div>
      <div className="right-container__hero">
        <p className="right-container__hero__works-text">How it works</p>
        <div className="card-container">
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Page;
