const TableHeaderCell = (props: {
  title: string;
  className: string;
  onClick: () => void;
}) => {
  return (
    <th onClick={props.onClick}>
      <div>
        <p className="header-cell-title">{props.title}</p>
        <div className={props.className}></div>
      </div>
    </th>
  );
};

export default TableHeaderCell;
