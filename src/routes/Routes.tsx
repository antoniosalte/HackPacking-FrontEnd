import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { CheckoutLogin, NotFound } from "../components";
import UserAccount, {
  baseUrl as userAccountBaseUrl,
  userOrderDetailsUrl,
} from "../userAccount/routes";
import { OrderDetails } from "../userAccount/views";
import { Account } from "../views/Account";
import { ArticlePage } from "../views/Article";
import { CartPage } from "../views/Cart";
import { CategoryPage } from "../views/Category";
import { CollectionPage } from "../views/Collection";
import { HomePage } from "../views/Home";
import OrderConfirmation from "../views/OrderConfirmation/View";
import { ProductPage } from "../views/Product";
import { SearchPage } from "../views/Search";

import { About } from "../views/About";
import { Why } from "../views/Why";
import { How } from "../views/How";
import { FAQ } from "../views/Faq";
import { Blog } from "../views/Blog";


const slugUrl = ":slug([a-z-0-9]+)/:id([0-9]+)/";
export const baseUrl = "/";
export const searchUrl = `${baseUrl}search/`;
export const categoryUrl = `${baseUrl}category/${slugUrl}`;
export const collectionUrl = `${baseUrl}collection/${slugUrl}`;
export const productUrl = `${baseUrl}product/${slugUrl}`;
export const cartUrl = `${baseUrl}cart/:token?/`;
export const checkoutLoginUrl = `${baseUrl}login/`;
export const pageUrl = `${baseUrl}page/:slug/`;
export const guestOrderDetailsUrl = `/order/:token/`;
export const orderConfirmationUrl = `${baseUrl}order-confirmation/`;
export const accountUrl = `${baseUrl}account/`;
export const orderHistoryUrl = `${baseUrl}order-history/`;
export const addressBookUrl = `${baseUrl}address-book/`;
export const paymentOptionsUrl = `${baseUrl}payment-options/`;
// hackpacking
export const aboutUrl = `${baseUrl}about/`;
export const whyUrl = `${baseUrl}why/`;
export const howUrl = `${baseUrl}how/`;
export const faqUrl = `${baseUrl}faq/`;
export const blogUrl = `${baseUrl}blog/`;

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={baseUrl} component={HomePage} />
    <Route path={searchUrl} component={SearchPage} />
    <Route path={categoryUrl} component={CategoryPage} />
    <Route path={collectionUrl} component={CollectionPage} />
    <Route path={productUrl} component={ProductPage} />
    <Route path={cartUrl} component={CartPage} />
    <Route path={checkoutLoginUrl} component={CheckoutLogin} />
    <Route path={pageUrl} component={ArticlePage} />
    <Route path={userAccountBaseUrl} component={UserAccount} />
    <Route path={userOrderDetailsUrl} component={OrderDetails} />
    <Route path={guestOrderDetailsUrl} component={OrderDetails} />
    <Route path={orderConfirmationUrl} component={OrderConfirmation} />
    <Route path={accountUrl} component={Account} />
    <Route path={orderHistoryUrl} component={Account} />
    <Route path={addressBookUrl} component={Account} />
    <Route path={paymentOptionsUrl} component={Account} />

    <Route path={aboutUrl} component={About} />
    <Route path={whyUrl} component={Why} />
    <Route path={howUrl} component={How} />
    <Route path={faqUrl} component={FAQ} />
    <Route path={blogUrl} component={Blog} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
