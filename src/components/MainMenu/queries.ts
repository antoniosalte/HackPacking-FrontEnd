import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { MainMenu } from "./types/MainMenu";

export const mainMenu = gql`
  fragment MainMenuSubItem on MenuItem {
    id
    name
  }

  query MainMenu {
    shop {
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);
