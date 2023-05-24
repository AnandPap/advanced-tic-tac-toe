const Saving = (props: { saveCompleted: boolean }) => {
  return (
    <div className="circle-loader-wrapper">
      <p>{props.saveCompleted ? "Saved" : "Saving"}</p>
      <div
        className={`circle-loader ${props.saveCompleted && "load-completed"}`}
      >
        {props.saveCompleted && <div className="checkmark"></div>}
      </div>
    </div>
  );
};

export default Saving;
