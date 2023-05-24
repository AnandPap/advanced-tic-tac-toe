type HamburgerMenuProps = {
  displayContent: boolean;
  setDisplayContent: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu = ({
  displayContent,
  setDisplayContent,
}: HamburgerMenuProps) => {
  return (
    <div
      className={`hamburger-menu-wrapper ${
        displayContent && "X-close-button hamburger-open"
      }`}
      onClick={() => setDisplayContent((s) => !s)}
    >
      <div className="hamburger-menu"></div>
    </div>
  );
};

export default HamburgerMenu;
