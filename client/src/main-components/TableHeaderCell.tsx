const TableHeaderCell = (props: {
  title: string;
  className: string;
  onClick: () => void;
}) => {
  return (
    <th onClick={props.onClick}>
      <div>
        <h4 className="header-cell-title">{props.title}</h4>
        <div className={props.className}></div>
      </div>
    </th>
  );
};

export default TableHeaderCell;
