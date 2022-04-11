import DateTimePicker from "components/DateTimePicker";
import { getCurrentDate } from "utils/functions/date";
import { PageProps } from "utils/types";

const DateTimePickerSample: React.FC<PageProps> = () => {
  return (
    <>
      <DateTimePicker
        name={"date-time-picker-sample"}
        value={getCurrentDate()}
      />
    </>
  );
};

export default DateTimePickerSample;
