type HamburgerMenuProps = {
  displayHamburgerContent: boolean;
  setDisplayHamburgerContent: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu = ({
  displayHamburgerContent,
  setDisplayHamburgerContent,
}: HamburgerMenuProps) => {
  return (
    <div
      className={`hamburger-menu-wrapper ${
        displayHamburgerContent && "X-close-button hamburger-open"
      }`}
      onClick={() => setDisplayHamburgerContent((s) => !s)}
    >
      <div className="hamburger-menu"></div>
    </div>
  );
};

export default HamburgerMenu;
