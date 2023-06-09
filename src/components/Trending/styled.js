import styled from 'styled-components';

const TrendingStyled = styled.div`
  block-size: fit-content;
  width: 300px;  
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  background-color: #171717;
  border-radius: 16px;
  gap: 16px;

  hr {
    height: 1px;
    width: 100%;
    color: #484848;
  }
  
  p {
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 22px;
    margin: 0 16px;
    overflow-wrap: break-word;
  }

  @media screen and (max-width: 937px) {
    display: none;
`;

export default TrendingStyled;
