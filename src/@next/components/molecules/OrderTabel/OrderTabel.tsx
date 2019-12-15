import { Trans } from "@lingui/react";
import React from "react";
import Media from "react-media";
import { ThemeContext } from "styled-components";

import { Thumbnail } from "..";
import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

import Icon1 from "../../../../images/hp-order-step1.svg";
import Icon2 from "../../../../images/hp-order-step2.svg";
import Icon3 from "../../../../images/hp-order-step3.svg";


export const OrderTabel: React.FC<IProps> = ({ orders, history }: IProps) => {
  const theme = React.useContext(ThemeContext);
  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.mediumScreen,
        }}
      >
        {(matches: boolean) => {
          console.log( "MATHCERS: ",matches, orders)
          return (
            <>
              {orders &&
                orders.slice( 0,1 ).map(order => {
                  const date = new Date(order.node.created);
                  return (
                    <S.Row
                      key={order.node.number}
                      onClick={evt => {
                        evt.stopPropagation();
                        history.push(`/order/${order.node.token}`);
                      }}
                    >
                      <p style={{
                        fontWeight: 700,
                        width:"100%",
                        textAlign: "start",
                      }}>Current Order - Tracking #{order.node.id}</p>
                      <S.DivOrder>
                        <S.DivORow>
                          <p>Shipped Via</p>
                          <span>UPS</span>
                        </S.DivORow>
                        <S.DivORow>
                          <p>Status</p>
                          <span>{order.node.statusDisplay}</span>
                        </S.DivORow>
                        <S.DivORow>
                          <p>Expected</p>
                          <span>Thursday, November 7</span>
                        </S.DivORow>
                      </S.DivOrder>
                      <S.ContainerProgress>
                        <S.LineP>
                          <div className="activedot left"/>
                        </S.LineP>
                        <S.LineP>
                          <div className="right"/>
                        </S.LineP>
                        <S.ItemProgress className="activedot">
                          <div className="activedot">
                            <img
                              src={ Icon1 }
                              alt="asad"
                            />
                          </div>
                          <p>Order Placed</p>
                        </S.ItemProgress>
                        <S.ItemProgress>
                          <div className="activedot">
                          <img
                              src={ Icon2 }
                              alt="asad"
                            />
                          </div>
                          <p>In Transit</p>
                        </S.ItemProgress>
                        <S.ItemProgress>
                          <div>
                          <img
                              src={ Icon3 }
                              alt="asad"
                            />
                          </div>
                          <p>Completed</p>
                        </S.ItemProgress>
                      </S.ContainerProgress>
                    </S.Row>
                  );
                })}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
