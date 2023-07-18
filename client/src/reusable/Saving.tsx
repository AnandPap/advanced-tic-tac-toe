const Saving = (props: { saveCompleted: boolean }) => {
  return (
    <div className="saving-wrapper">
      <p>{props.saveCompleted ? "Saved" : "Saving"}</p>
      <div
        className={`saving-loader ${
          props.saveCompleted ? "save-completed" : ""
        }`}
      >
        {props.saveCompleted && <div className="checkmark"></div>}
      </div>
    </div>
  );
};

export default Saving;
