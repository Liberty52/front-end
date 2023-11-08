export default function ReviewPages(props) {
  const pages = props.pages;
  const setPageNum = props.setPageNum;

  const list = [];
  for (let i = pages.startPage; i <= pages.lastPage; i++) {
    if (i === pages.currentPage)
      list.push(
        <span
          key={i}
          className='active'
          onClick={() => {
            setPageNum(i - 1);
          }}
        >
          {i}
        </span>,
      );
    else
      list.push(
        <span
          key={i}
          onClick={() => {
            setPageNum(i - 1);
          }}
        >
          {i}
        </span>,
      );
  }
  return <div className='pages'>{list}</div>;
}
