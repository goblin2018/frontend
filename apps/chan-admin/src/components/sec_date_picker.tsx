import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

const SecDatePicker = (props) => {
  const handleInputChange = (value: Dayjs) => {
    // 秒级时间戳
    const a = value ? value.unix() : null;
    if (props.onChange) {
      props.onChange(a);
    }
  };

  // 如果时间为空，antd 使用null 来处理
  const value = props.value ? dayjs.unix(props.value) : null;

  return <DatePicker {...props} value={value} onChange={handleInputChange} />;
};

export default SecDatePicker;
