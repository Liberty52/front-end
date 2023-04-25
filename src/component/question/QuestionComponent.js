import styled from "styled-components";


export const QuestionListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   padding:  50px 370px;
`
export const QuestionListTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  border-bottom: 3px solid black;
  padding : 20px 0px;
`
export const QuestionListTable = styled.table`
  margin-top : 100px;
  width: 100%;
  border-top: 1px solid black;
  text-align: center;
  margin-bottom: 50px;
`
export const QuestionListTableRow = styled.tr`
  height: 40px;
`
export const QuestionListTableHeader = styled(QuestionListTableRow)`
  background-color: #EFF2F6;
  
`
export const QuestionListTableHeaderSmallItem = styled.th`
  width: 10%;
`
export const QuestionTableHeaderMiddleItem = styled.th`
  width: 25%;
`

export const QuestionListTableBodyRow = styled(QuestionListTableRow)`
  font-weight: bold;
  :hover{
    cursor: pointer;
    background-color: #EFEFEF;
    
  }
`
export const QuestionListTableBodyWriteTimestamp = styled.td`
  font-weight: normal;
  color: rgba(0,0,0,0.6);
`
export const EmptyListExpression = styled.div`
  height : 300px;
  display : flex;
  justify-content : center;
  align-items: center;
  color: gray;
  font-weight: bold;
`

export const QuestionAddButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`
export const QuestionAddButton = styled.div`
  font-weight: bold;
  color: white;
  background-color: #2E2E2E;
  padding: 8px 15px;
  
  :hover{
    cursor: pointer;
  }
`

export const QuestionListTablePageNumberButtonWrapper =  styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`
export const PageNumberButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-weight: bold;
  :hover{
    cursor: pointer;
  }
`

