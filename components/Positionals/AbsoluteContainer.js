


function AbsoluteContainer({ children, className }) {
  return <div className={["absolute", className].join(" ")}>{children}</div>;
}

export default AbsoluteContainer;



AbsoluteContainer.defaultProps = {
    children: <></>,
    className: ''
}