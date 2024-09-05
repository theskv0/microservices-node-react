import CpField from "./CpField";

type Props = {
  name: string;
  label: string;
};

const CpEmailField = (props: Props) => {
  return <CpField type="email" {...props} />;
};

export default CpEmailField;
