const Saving = (props: { saveCompleted: boolean }) => {
  return (
    <div className="circle-loader-wrapper">
      <p>{props.saveCompleted ? "Saved" : "Saving"}</p>
      <div
        className={`circle-loader ${props.saveCompleted && "load-complete"}`}
      >
        {props.saveCompleted && <div className="checkmark draw"></div>}
      </div>
    </div>
  );
};

export default Saving;
