import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  color: red;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
color: #1e4088;
text-transform: uppercase;
margin-top: 20px;
display: flex;
align-items: center;
justify-content: center;
letter-spacing: 3px;
font-size: 25px;
font-weight: bold;
`


export const SubmitButton = styled.button`
  cursor: pointer;
  background: #4770c1;
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 40px;
  padding: 20px;
  font-size: 18px;
  font-weight: 1000;
  letter-spacing: 10px;
  display: block;
  appearance: none;
  border-radius: 4px;
  width: 100%;
  &:hover {
    background: #113382;
  }
`;


export const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #4770c1;
  padding: 10px 10px;
  font-size: 16px;
`;


export const Label = styled.label`
  color: #4770c1;
  border: none;
  margin-top: 20px;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 5px;
`

export const TimerTitle = styled.div`
color: #1e4088;
margin-top: 40px;
display: flex;
align-content: center;
justify-content: center;
letter-spacing: 3px;
font-size: 25px;
font-weight: bold;
`;

export const Timer = styled.div`
color: #1e4088;
margin-top: 30px;
display: flex;
align-content: center;
justify-content: center;
letter-spacing: 3px;
font-size: 30px;
font-weight: bold;
`;

export const OutOfTime = styled.div`
  color: #1e4088;
  margin-top: 15%;
  display: flex;
  align-content: center;
  justify-content: center;
  letter-spacing: 3px;
  font-size: 30px;
  font-weight: bold;
`;