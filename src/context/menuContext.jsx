import { motion } from "framer-motion";
export default function MenuContext(props) {
  const { children } = props;
  return <motion.div {...props}>{children}</motion.div>;
}
