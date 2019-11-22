import "./scss/index.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import homeHero from "../../images/hp-homehero.png";
import Step1 from "../../images/step1-hp.svg"
import Step2 from "../../images/step2-hp.svg"
import Step3 from "../../images/step3-hp.svg"

import Card from "./Card";
const cards = [
  {
    id: "Card1",
    title: "Step #1: Before your trip",
    description: "Setup your trip information and select desired clothes.",
    image: Step1,
  },
  {
    id: "Card2",
    title: "Step #2: When you arrive",
    description: "You will recieve a package with your clothes inside your room.",
    image: Step2,
  },
  {
    id: "Card3",
    title: "Step #3: When you leave",
    description: "Simple leave the clothes inside the package at your hotel reception.",
    image: Step3,
  },
]

const Page: React.FC<{
  loading: boolean;
}> = ({ loading }) => (
  <>
    <div className="home-page__hero">
      <div className="container">
        <div className="home-page__cont-home">
          <div className="home-page__cont-home__c1">
            <p>Clothes wherever you are. Never travel with luggage again.</p>
            <span>We bring you clean and confortable clothes to your trip so you don’t have to pack your luggage when you need to fly.</span>
            <Link to="/start">
              <button>
                Get Started
              </button>
            </Link>
          </div>
          <div className="home-page__cont-home__c2">
            <img src={ homeHero } alt="imghome"/>
          </div>
        </div>
        <Footer />
      </div>
      <div className="right-container__hero">
        <p className="right-container__hero__works-text">How it works</p>
        <div className="card-container">
          {
            cards.map( card => (
              <Card
                key={ card.id }
                card={ card }
              />
            ))
          }
        </div>
      </div>
    </div>
  </>
);

export default Page;
