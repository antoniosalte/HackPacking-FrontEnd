import React from "react";

import { Attribute, Button, Tile } from "@components/atoms";

import { usePasswordChange } from "@sdk/react";
import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";

export const PasswordTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChange();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            Change Password
          </S.Header>
          <S.Content>
            {isEditing ? (
              <S.ContentEdit>
                <PasswordChangeForm
                  handleSubmit={data => {
                    setPasswordChange(data);
                  }}
                  hide={() => {
                    setIsEditing(false);
                  }}
                  error={error ? error!.extraInfo!.userInputErrors : []}
                />
              </S.ContentEdit>
              
            ) : (
              <>
              <Attribute
                description="Password"
                attributeValue="**************"
              />
              <br/>
              <Button
                  type="button"
                  onClick={() => setIsEditing(isEditing => !isEditing)}
                  style={{
                    padding: "5px 20px",
                    fontSize: 12,
                  }}
                  size="sm"
                >
                  Change
                </Button>
              </>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
