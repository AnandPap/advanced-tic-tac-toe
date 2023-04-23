type BackButtonType = {
  className: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = ({ className, text, onClick }: BackButtonType) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      <div className={`${className}-arrow`}></div>
      <p className={`${className}-text`}>{text}</p>
    </button>
  );
};

export default BackButton;
