function FieldError(props) {
  const newClass = props.newClass;
  return (
    <span className={`error ${newClass && newClass}`}>{props.children}</span>
  );
}
export default FieldError;
