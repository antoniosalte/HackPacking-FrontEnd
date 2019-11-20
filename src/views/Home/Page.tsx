import "./scss/index.scss";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Loader } from "../../components";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage
} from "./types/ProductsList";

import homeHero from "../../images/hp-homehero.png";

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
            <button>
              Get Started
            </button>
          </div>
          <div className="home-page__cont-home__c2">
            <img src={ homeHero } alt="imghome"/>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Page;
