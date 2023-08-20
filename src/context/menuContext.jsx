export default function MenuContext(props) {
  const { children } = props;
  return <div {...props}>{children}</div>;
}
