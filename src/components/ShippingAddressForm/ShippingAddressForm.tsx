import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";

import { Button, Form, Select, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";
import { FormAddressType, IShippingAddressFormProps } from "./types";
import { getFormData } from "./utils";

const ShippingAddressForm: React.FC<IShippingAddressFormProps> = ({
  data,
  buttonText,
  errors,
  loading,
  onSubmit,
  children,
  shippingAsBilling = false,
  type = "shipping",
}) => (
  <div className="address-form">
    <ShopContext.Consumer>
      {({ countries, geolocalization, defaultCountry }) => (
        <Form<FormAddressType>
          errors={errors}
          onSubmit={(evt, data) => {
            evt.preventDefault();
            onSubmit(data);
          }}
          data={getFormData(geolocalization, defaultCountry, data)}
        >
          {children}
          <fieldset disabled={shippingAsBilling}>
              <TextField
                type="given-name"
                name="firstName"
                autoComplete="given-name"
                placeholder="Firstname"
                required
              />
              <TextField
                type="family-name"
                name="lastName"
                autoComplete="family-name"
                placeholder="Lastname"
                required
              />
              <TextField
                type="phone"
                name="phone"
                autoComplete="phone"
                placeholder="Phone"
                required
              />
              <TextField
                type="address-line1"
                name="streetAddress1"
                autoComplete="address-line1"
                placeholder="Street Address"
                required
              />
              <TextField
                type="postal-code"
                name="postalCode"
                placeholder="Postal code"
                autoComplete="postal-code"
                required
              />
              <TextField
                type="city"
                name="city"
                placeholder="City"
                autoComplete="address-level2"
                required
              /> 
              <Select
                name="country"
                options={countries.map(country => ({
                  label: country.country,
                  value: country.code,
                }))}
                autoComplete="Country"
              />
              <TextField
                type="comment"
                name="comment"
                autoComplete="comment"
                placeholder="Comment"
              />
          </fieldset>
          <div className="btn-login">
            <button type="submit" disabled={loading} >
              {loading ? "Loading" : buttonText}
            </button>
          </div>
        </Form>
      )}
    </ShopContext.Consumer>
  </div>
);

export default ShippingAddressForm;
