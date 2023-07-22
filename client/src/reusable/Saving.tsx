interface SavingProps {
  saveCompleted: boolean;
}

const Saving = ({ saveCompleted }: SavingProps) => {
  return (
    <div className="saving-wrapper">
      <p>{saveCompleted ? "Saved" : "Saving..."}</p>
      <div className={`saving-loader ${saveCompleted ? "save-completed" : ""}`}>
        {saveCompleted && <div className="checkmark"></div>}
      </div>
    </div>
  );
};

export default Saving;
