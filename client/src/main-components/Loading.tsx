const Loading = (props: { theme: string }) => {
  return (
    <div className="loading-wrapper">
      <span>Loading</span>
      <div className={`dot-elastic ${props.theme}`}></div>
    </div>
  );
};

export default Loading;
