import CpField from "./CpField";

type Props = {
  name: string;
  label: string;
};

const CpTextField = (props: Props) => {
  return <CpField type="text" {...props} />;
};

export default CpTextField;
