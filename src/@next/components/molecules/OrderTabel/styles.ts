import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 5rem;
  cursor: pointer;

  height: 210px;
  margin-bottom: 30px;
  background-color: white;
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 30px 20px;
}

`;

export const HeaderRow = styled(Row)`
  color: ${props => props.theme.colors.lightFont};
  cursor: default;
`;
export const DivOrder = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%
  margin-top: 20px;
`;
export const DivORow = styled.div`
  width: 20%;
  align-items: flex-start; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  p{
    color: #929292;
    font-size: 14px;
  }
  span{
    color: #1F2421;
    margin-left: 8px;
    font-size: 12px;
  }
`;

export const IndexNumber = styled.div`
  width: 15%;
  ${media.smallScreen`
     width: 50%;
  `}
`;
export const ProductsOrdered = styled.div`
  width: 25%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  img {
    max-width: 50px;
    height: auto;
  }
`;
export const DateOfOrder = styled.div`
  width: 25%;
`;
export const Value = styled.div`
  width: 10%;
`;
export const Status = styled.div`
  width: 25%;
  ${media.smallScreen`
     width: 50%;
  `}
`;
export const ContainerProgress= styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
    margin-top: 20px;
    position: relative;
`;

export const ItemProgress= styled.div`
display: flex;
  flex-direction: column;
  align-items: center;

div{
  z-index: 1;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #C4C4C4;
  display: flex;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #C4C4C4;
    justify-content: center;
    align-items: center;
  img{
    object-fit: contain;
    width: 30px;
    height: 30px;
  }
}
.activedot{
  background-color: #84BD00;
}
p{
  font-size: 12px;
}

`;
export const LineP= styled.div`

position: absolute;
top: 22px;
left: 0;
width: 100%;
div{
  width: 50%;
  height: 5px;
  background-color: #C4C4C4;
  position: absolute;
  z-index: 0;
}
.activedot{
  background-color: #84BD00;
}
.left{
  left: 10px;
}
.right{
  right: 10px;
}
`;
