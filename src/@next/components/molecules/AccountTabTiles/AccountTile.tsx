import React from "react";

import { useAccountUpdate, useUserDetails } from "@sdk/react";

import { Attribute, Button, Tile } from "@components/atoms";

import { AccountUpdateForm } from "./AccountUpdateForm";
import * as S from "./styles";

export const AccountTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const { data: user } = useUserDetails();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>User information</S.Header>
          <S.Content>
            {isEditing ? (
              <AccountUpdateForm
                initialValues={{
                  firstName: (user && user.firstName) || "",
                  lastName: (user && user.lastName) || "",
                }}
                handleSubmit={data => {
                  setAccountUpdate({ input: data });
                }}
                hide={() => {
                  setIsEditing(false);
                }}
              />
            ) : (
              <S.ContentOneLine>
                <Attribute
                  description="First Name"
                  attributeValue={(user && user.firstName) || "-"}
                />
                <br />
                <Attribute
                  description="Last Name"
                  attributeValue={(user && user.lastName) || "-"}
                />
                <br />
                <Button
                  type="button"
                  onClick={() => setIsEditing(isEditing => !isEditing)}
                  style={{
                    padding: "5px 20px",
                  }}
                >
                  Edit
                </Button>
              </S.ContentOneLine>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
