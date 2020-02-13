import { maybe } from "../../core/utils";
import {
  getShop_shop_defaultCountry,
  getShop_shop_geolocalization
} from "../ShopProvider/types/getShop";
import { FormAddressType } from "./types";
import { CountryCode, Country } from "types/globalTypes";

export const getFormData = (
  geolocalization: getShop_shop_geolocalization | null,
  defaultCountry: getShop_shop_defaultCountry | null,
  destination,
  data?: FormAddressType
) =>
  data || {
/*     country: {
      code: maybe(() => geolocalization.country.code, defaultCountry.code),
      country: maybe(
        () => geolocalization.country.country,
        defaultCountry.country
      ), */
      // By default we're always traveling to Peru.
      country: {
        code: maybe(() => "PE", "PE") as CountryCode,
        country: maybe(() => "Peru", "Peru"),
    },
    city: 'Lima',
    prefix: {
        code: maybe(() => geolocalization.country.code, defaultCountry.code),
        country: maybe(
            () => geolocalization.country.country,
            defaultCountry.country
        ),
    },
  };
