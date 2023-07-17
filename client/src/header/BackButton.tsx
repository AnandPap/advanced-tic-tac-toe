type BackButtonType = {
  className: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const BackButton = ({ className, text, onClick, disabled }: BackButtonType) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <div className={`${className}-arrow`}></div>
      <p className={`${className}-text`}>{text}</p>
    </button>
  );
};

export default BackButton;
