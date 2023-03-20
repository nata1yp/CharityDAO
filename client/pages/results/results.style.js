import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

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


export const TableWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  font-size: 18px;
  max-width: 90%;
  max-height: 550px;
`;


export const TableTitle = styled.div`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #4770c1;
  border: none;
  letter-spacing: 2px;
`;


export const Title = styled.div`
  margin: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`

export const SubmitButton = styled.button`
cursor: pointer;
  background: #113382;
  color: white;
  border: 3px solid #1e4088;
  margin-top: 40px;
  padding: 15px;
  font-size: 18px;
  font-weight: 500;
  display: block;
  appearance: none;
  border-radius: 4px;
  width: 30%;
  &:hover {
    background: #4770c1;
  }
`;

export const TimerTitle = styled.div`
color: #1e4088;
margin-top: 10px;
display: flex;
align-content: center;
justify-content: center;
letter-spacing: 3px;
font-size: 20px;
font-weight: bold;
`;

export const Timer = styled.div`
color: #1e4088;
margin-top: 20px;
display: flex;
align-content: center;
justify-content: center;
letter-spacing: 3px;
font-size: 25px;
font-weight: bold;
`

export const SelectRound = styled.div`
  color: #1e4088;
  margin-top: 40px;
  padding: 10px;
  display: flex;
  text-transform: uppercase;
  align-content: center;
  justify-content: center;
  letter-spacing: 1px;
  font-size: 25px;
  font-weight: bold;
`

export const DescriptionCell = styled(TableCell)`
  max-width: 900px;
  overflow-wrap: break-word;
`

export const TitleCell = styled(TableCell)`
  max-width: 400px;
  overflow-wrap: break-word;
`