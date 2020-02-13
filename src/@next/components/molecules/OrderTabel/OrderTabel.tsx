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

// Aca
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
          return (
            <>
              {orders &&
                orders.slice( 0,1 ).map(order => {
                  let date = new Date(order.node.created).toUTCString();
                  date = date.split(' ').slice(0, 4).join(' ');
                  const shippedVia = order.node.shippingMethod ? order.node.shippingMethod.name : "No Shipping Method";
                  const status = order.node.status;
                  const classNameLeft =  status === "UNFULFILLED" || status === "FULFILLED" || status === "PARTIALLY_FULFILLED" ? "activedot left" : "left";
                  const classNameRight = status === "FULFILLED" ? "activedot right" : "right";
                  const classNameStep1 = status === "UNFULFILLED" || status === "FULFILLED" || status === "PARTIALLY_FULFILLED" ? "activedot" : "";
                  const classNameStep2 = status === "UNFULFILLED" || status === "FULFILLED" || status === "PARTIALLY_FULFILLED" ? "activedot" : "";
                  const classNameStep3 = status === "FULFILLED" ? "activedot" : "";
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
                          <span>{shippedVia}</span>
                        </S.DivORow>
                        <S.DivORow>
                          <p>Status</p>
                          <span>{order.node.statusDisplay}</span>
                        </S.DivORow>
                        <S.DivORow>
                          <p>Order Date</p>
                          <span>{date}</span>
                        </S.DivORow>
                      </S.DivOrder>
                      <S.ContainerProgress>
                        <S.LineP>
                          <div className={classNameLeft}/>
                        </S.LineP>
                        <S.LineP>
                        <div className={classNameRight}/>
                        </S.LineP>
                        <S.ItemProgress>
                          <div className={classNameStep1}>
                            <img
                              src={ Icon1 }
                              alt="asad"
                            />
                          </div>
                          <p>Order Placed</p>
                        </S.ItemProgress>
                        <S.ItemProgress>
                        <div className={classNameStep2}>
                          <img
                              src={ Icon2 }
                              alt="asad"
                            />
                          </div>
                          <p>In Transit</p>
                        </S.ItemProgress>
                        <S.ItemProgress>
                        <div className={classNameStep3}>
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
