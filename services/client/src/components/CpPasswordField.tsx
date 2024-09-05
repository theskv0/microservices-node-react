import CpField from "./CpField";

type Props = {
  name: string;
  label: string;
};

const CpPasswordField = (props: Props) => {
  return <CpField type="password" {...props} />;
};

export default CpPasswordField;
