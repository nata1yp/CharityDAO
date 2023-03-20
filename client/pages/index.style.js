import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const WelcomeTitle = styled.div`
margin: 20px;
display: flex;
justify-content: center;
font-size: 60px;
color: #1e4088;
font-weight: bold;
`

export const FieldWrapper = styled.div`
  width: 40%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #1e4088;
  font-size: 20px;
`;

export const Status = styled.div`
width: 50%;
display: flex;
justify-content: center;
align-content: center;
`

export const Title = styled.div`
display: flex;
align-content: center;
justify-content: center;
font-size: 23px;
font-weight: bold;
`

export const InitializeButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font: inherit;
  background-color: #1e4088;
  border: 3px solid #1e4088;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  width: 500px;
  &:hover {
    background: #4770c1;
  }

`

export const RoundWrapper = styled.div`
  width: 60%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1e4088;
  font-size: 20px;
`;