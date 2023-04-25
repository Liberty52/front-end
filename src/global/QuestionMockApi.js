const MOCK_DATA = [];

const ADD_MOCK_DATA = (data) => {
  console.log(data);
  MOCK_DATA.push(data);
}

const GET_MOCK_DATA = () => {
  return MOCK_DATA;
}

const DELETE_MOCK_DATA = (id) => {
  MOCK_DATA.filter(data => data.id !== id)
}

const UPDATE_MOCK_DATA = (data) => {
  MOCK_DATA.filter(d => d.id !== data.id)
  MOCK_DATA.push(data);
}

const GET_NEXT_NO = () => {
  return MOCK_DATA.length +1;
}


export {ADD_MOCK_DATA, GET_MOCK_DATA, UPDATE_MOCK_DATA, DELETE_MOCK_DATA, GET_NEXT_NO}