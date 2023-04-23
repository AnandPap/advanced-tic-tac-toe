type BackButtonType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = ({ onClick }: BackButtonType) => {
  return (
    <button className={`back-button`} onClick={onClick}>
      <div className="back-button-arrow"></div>
      <p className="back-button-text">Back</p>
    </button>
  );
};

export default BackButton;
