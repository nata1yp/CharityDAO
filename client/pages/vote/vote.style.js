import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Form = styled.form`
  width: 53%;
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  color: red;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;

export const TableWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  font-size: 18px;
  max-width: 90%;
  max-height: 370px;
`;

export const ProposalWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  width: 50%;
  display: flex;
  flex-direction: column;
  border-style: groove;
`;

export const TableTitle = styled.div`
  margin-top: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #4770c1;
  border: none;
  letter-spacing: 2px;
`;

export const ID = styled.div`
  padding-right: 10px;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 16px;
`;

export const IdentityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const CostWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const Title = styled.div`
  color: #1e4088;
  margin-top: 1px;
  display: flex;
  align-content: center;
  justify-content: center;
  letter-spacing: 3px;
  font-size: 25px;
  font-weight: bold;
`;

export const NoProposals = styled.div`
  color: #1e4088;
  margin-top: 50px;
  display: flex;
  align-content: center;
  justify-content: center;
  letter-spacing: 3px;
  font-size: 25px;
  font-weight: bold;
`;

export const SubmitButton = styled.button`
  cursor: pointer;
  background: #4770c1;
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 5px;
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
  padding: 10px 15px;
  margin-bottom: 5px;
  font-size: 16px;
`;

export const Select = styled.select`
  display: block;
  background: white;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #4770c1;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const Label = styled.label`
  color: #4770c1;
  border: none;
  margin-top: 10px;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 5px;
`;

export const TimerTitle = styled.div`
  color: #1e4088;
  margin-top: 30px;
  display: flex;
  align-content: center;
  justify-content: center;
  letter-spacing: 3px;
  font-size: 20px;
  font-weight: bold;
`;

export const Timer = styled.div`
  color: #1e4088;
  margin-top: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  letter-spacing: 3px;
  font-size: 25px;
  font-weight: bold;
`;

export const Space = styled.div`
  margin: 50px;
`;

export const DescriptionCell = styled(TableCell)`
  max-width: 800px;
  overflow-wrap: break-word;
`;

export const TitleCell = styled(TableCell)`
  max-width: 400px;
  overflow-wrap: break-word;
`;
