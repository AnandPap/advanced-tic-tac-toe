type ModalCoverProps = {
  displayHamburgerContent: boolean;
  setDisplayHamburgerContent: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalCover = ({
  displayHamburgerContent,
  setDisplayHamburgerContent,
}: ModalCoverProps) => {
  return (
    <>
      {displayHamburgerContent && (
        <div
          className="modal-cover"
          onClick={() => setDisplayHamburgerContent((s) => !s)}
        ></div>
      )}
    </>
  );
};

export default ModalCover;
