import { media, styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const TileWrapper = styled.div`
  height: auto;
  margin-bottom: 1.5rem;
  background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 24px;
`;

export const Header = styled.div`
  width: 95%;
  padding-bottom: 1rem;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

export const HeaderSmall = styled(Header)`
  width: 100%;
  border-bottom: none;
`;

export const Content = styled.div`
  padding: 0;
  width: 95%;
`;

export const ContentOneLine = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: flex-start;
  

  ${media.smallScreen`
    flex-direction: column;
    width: 100%;
  `}
`;
export const ContentEdit = styled.div`
  width: 50%;
  ${media.smallScreen`
     width: 100%;
  `}
`;

export const ContentEditOneLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  > div {
    max-width: 90%;
    width: 200px;
    ${media.smallScreen`
      width: 100%;
    `}
  }

  ${media.smallScreen`
     flex-direction: column;
  `}
`;

export const ContentExtendInput = styled.div`
  width: 60%;
`;

export const Form = styled.form`
  background-color: white;
`;

export const FormButtons = styled.div`
  height: 5rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  button {
    margin-right: 2rem;
  }
`;
