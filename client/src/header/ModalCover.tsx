type ModalCoverProps = {
  displayContent: boolean;
  setDisplayContent: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalCover = ({ displayContent, setDisplayContent }: ModalCoverProps) => {
  return displayContent ? (
    <div
      className="modal-cover"
      onClick={() => setDisplayContent((s) => !s)}
    ></div>
  ) : null;
};

export default ModalCover;
