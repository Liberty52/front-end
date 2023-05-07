import styled from "styled-components";

export const ColumnDirectionFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const QuestionContainer = styled(ColumnDirectionFlexBox)`
  padding:  50px 15%;
  @media (max-width: 500px){
    padding:  50px 10px;
  }
`
export const QuestionListHeader = styled.div`
  font-weight: 600;
  font-size: 32px;
  border-bottom: 3px solid black;
  padding : 20px 0px;
`
export const QuestionListTable = styled.table`
  table-layout: fixed;
  margin-top : 100px;
  width: 100%;
  border-top: 1px solid black;
  text-align: center;
  margin-bottom: 50px;
  @media (max-width: 500px){
    margin: 25px 0px;
  }
`
export const QuestionListRowTitle = styled.td`
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  width: 250px;
`

export const QuestionListRowSmallItem = styled.td`
  
  @media(max-width: 700px){
    display : none
  }
`
export const QuestionListTableRow = styled.tr`
  height: 40px;
`
export const QuestionListTableHeader = styled(QuestionListTableRow)`
  background-color: #EFF2F6;
  
`
export const QuestionListTableHeaderSmallItem = styled.th`
  width: 10%;
  @media (max-width: 700px) {
    display: none;
  }
`
export const QuestionTableHeaderMiddleItem = styled.th`
  width: 25%;
  @media (max-width: 500px) {
    width: 75px;
  }
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
  @media (max-width: 500px) {
    width: 75px;
  }
`
export const EmptyListExpression = styled.div`
  height : 300px;
  display : flex;
  justify-content : center;
  align-items: center;
  color: gray;
  font-weight: bold;
`

export const QuestionPageButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`
export const QuestionPageButton = styled.div`
  font-weight: bold;
  color: white;
  background-color: #2E2E2E;
  padding: 8px 15px;
  
  :hover{
    cursor: pointer;
    background-color: #3E3E3E;
  }
`

export const QuestionListTablePageNumberButtonWrapper =  styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`
export const PageMoveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 16px;
  color : rgba(0,0,0,0.2);
  font-weight: bold;
  :hover{
    cursor: pointer;
  }
  @media (max-width: 500px){
    color : black;
  }
 
`
export const PageNumberButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 16px;
  color:  ${props => props.isCurrentPage ? 'black' : 'rgba(0,0,0,0.2)'} ;
  text-decoration:  ${props => props.isCurrentPage ? 'underline' : 'none'} ;
  font-weight: bold;
  :hover{
    cursor: pointer;
  }
  @media (max-width: 500px){
    display: none;
  }
`

export const QuestionEditorPageContainer = styled(ColumnDirectionFlexBox)`
  padding: 30px 200px;

`
export const QuestionEditorHeader = styled.div`
  font-weight: 600;
  font-size: 32px;
  border-bottom: 3px solid black;
  padding : 20px 55px;
`

export const QuestEditorTitleInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 30px 0px 15px 0px;
  font-weight: bold;
  border-color: rgba(0,0,0,0.4);
  border-radius: 5px;
  padding: 0px 10px;
`

export const HTMLSizeLimiter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 10px 0px;
`
export const HTMLEditor = styled.div`
  width: 100%;
`
export const CurrentHtmlSizeSpan = styled.span`
  color: ${props => props.isExeed ? 'red' : 'black'} ;
`
export const MoveToListButton = styled(QuestionPageButton)`
  margin-right: 10px;
`


export const QuestionDetailContentWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  padding: 30px 0px;
  border-top: 1px solid rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);
`
export const QuestionDetailTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  @media (max-width: 1080px){
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
`
export const QuestionDetailTitle = styled.div`
  overflow-wrap: break-word;
  font-size: 22px;
  width: 100%;

  @media (max-width: 1080px){
    font-size: 18px;
  }
`
export const QuestionDetailSide = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
  @media (max-width:1080px){
    width: 100%;
  }
`

export const QuestionDetailSideStatus = styled.div`
  margin-right: 15px;
`

export const QuestionDetailSideCreatedAt = styled.div`
  color: rgba(0,0,0,0.4)
`

export const QuestionDetailViewer = styled.div`
  margin: 20px 0px;
`

export const QuestionDetailActionWrapper = styled.div`
  display: flex;
  justify-content: end;
  font-weight: bold;
`
export const QuestionDetailActionButton = styled.div`
  :hover{
    cursor: pointer;
    color: #111111;
    opacity: 0.6;
  }
`
export const QuestionDetailActionDivider = styled.div`
  margin : 0px 5px;
`

export const QuestionDetailPageButtonWrapper = styled(QuestionPageButtonWrapper)`
  margin-top: 15px;
`

export const QuestionReplyWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
`
export const EnterImage = styled.img`
  transform: scaleX(-1);
`
export const QuestionReplyContentWrapper = styled.pre`
  margin-left: 10px;
  font-size: 14px;
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕', 'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif;
  white-space: pre-wrap;
  overflow: auto;
`
export const QuestionReplyEnterWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`