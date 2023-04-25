let MOCK_DATA = [];

const ADD_MOCK_DATA = (data) => {
  MOCK_DATA.push(data);
}

const GET_MOCK_DATA = () => {
  return MOCK_DATA;
}

const GET_MOCK_DETAIL_DATA = (id) => {
  return MOCK_DATA.filter(d => d.id === id)[0];
}

const DELETE_MOCK_DATA = (id) => {
  MOCK_DATA = MOCK_DATA.filter(data => data.id !== id)
}

const UPDATE_MOCK_DATA = (data) => {
  MOCK_DATA = MOCK_DATA.filter(d => d.id !== data.id)
  MOCK_DATA.push(data);
}

const GET_NEXT_NO = () => {
  return MOCK_DATA.length +1;
}


export {ADD_MOCK_DATA, GET_MOCK_DATA, UPDATE_MOCK_DATA, DELETE_MOCK_DATA, GET_NEXT_NO,GET_MOCK_DETAIL_DATA}