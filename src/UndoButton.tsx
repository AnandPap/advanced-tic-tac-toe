type UndoButtonType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const UndoButton = ({ onClick }: UndoButtonType) => {
  return (
    <button className={`nav-button undo-button`} onClick={onClick}>
      <div className="undo-button-arrow"></div>
      <p className="undo-button-text">Undo</p>
    </button>
  );
};

export default UndoButton;
