import {
  Checkbox,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { Theme, styled, useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";

export interface SelectProps extends MuiSelectProps {
  items: Array<{
    code: string;
    name: string;
  }>;
  defaultValue?: string;
  value?: Array<string>;
  selectOption?: "choose" | "all";
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const getStyles = (
  name: string,
  personName: readonly string[] | undefined,
  theme: Theme
) => {
  return {
    fontWeight:
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ANOTHER_ITEMS = [
  { code: "", name: "선택" },
  { code: "all", name: "전체" },
];

const Select: React.FC<SelectProps> = ({
  items,
  defaultValue,
  value,
  selectOption = "choose",
  multiple = false,
  style,
}: SelectProps) => {
  const theme = useTheme();
  const listItem = ANOTHER_ITEMS.filter((item) => {
    if (selectOption === "choose") return item.code === "";
    else if (selectOption === "all") return item.code === "all";
  }).concat([...items]);
  const [selectValues, setSelectValues] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);

  // NOTE: 선택값 변경 이벤트
  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof selectValues>) => {
      const {
        target: { value },
      } = event;

      // 멀티선택, 선택옵션
      if (multiple && selectOption === "choose" && value.indexOf("") > -1) {
        setSelectValues([""]);
      }
      // 멀티선택, 전체옵션
      else if (multiple && selectOption === "all") {
        // 이전 값에 all이 있고, 다른 값을 선택했을 경우
        if (
          selectValues.indexOf("all") > -1 &&
          value.indexOf("all") > -1 &&
          value.length !== listItem.length
        ) {
          const removeAllList =
            typeof value === "string"
              ? value.split(",").filter((item) => item !== "all")
              : value.filter((item) => item !== "all");
          setSelectValues(removeAllList);
        }
        // 전체 선택된 상태에서 전체를 재선택했을 경우 Clear
        else if (selectValues.indexOf("all") > -1 && value.indexOf("all") < 0) {
          setSelectValues([]);
        }
        // 전체를 선택했을 경우
        else if (value.indexOf("all") > -1) {
          setSelectValues(listItem.map((item) => item.code));
        }
        // 전체이외에 모든 항목을 선택할 경우
        else if (value.indexOf("all") < 0 && value.length === items.length) {
          setSelectValues(listItem.map((item) => item.code));
        } else {
          setSelectValues(typeof value === "string" ? value.split(",") : value);
        }

        setSelectedAll((previous) => !previous);
      }
      // Normal 상태
      else {
        setSelectValues(typeof value === "string" ? value.split(",") : value);
      }
    },
    [selectValues, selectedAll]
  );

  // NOTE: InputBox에 선택된 데이터의 명칭 셋팅
  const setInputRender = useCallback((selected: any) => {
    const selectedNames = listItem
      .filter((item) => {
        return (
          selected.indexOf(item.code) > -1 &&
          item.code !== "" &&
          item.code !== "all"
        );
      })
      .map((item) => item.name);

    return selectedNames.join(", ");
  }, []);

  useEffect(() => {
    const defaultSelectValues =
      defaultValue !== undefined
        ? [defaultValue]
        : selectOption === "all" && multiple
        ? undefined
        : selectOption === "all"
        ? ["all"]
        : [""];

    setSelectValues(value || defaultSelectValues || []);
  }, [defaultValue, value]);

  return (
    <div>
      <MuiSelect
        displayEmpty
        multiple={multiple}
        value={selectValues}
        onChange={handleChange}
        input={<BootstrapInput />}
        renderValue={setInputRender}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
        style={{
          minWidth: 100,
          maxWidth: 300,
          ...style,
        }}
      >
        {selectOption === "choose" && (
          <MenuItem value={""} style={getStyles("선택", selectValues, theme)}>
            {"선택"}
          </MenuItem>
        )}
        {selectOption === "all" && (
          <MenuItem
            value={"all"}
            style={getStyles("전체", selectValues, theme)}
          >
            {multiple && (
              <Checkbox checked={selectValues.indexOf("all") > -1} />
            )}
            {"전체"}
          </MenuItem>
        )}
        {items?.map((item) => (
          <MenuItem
            key={item.code}
            value={item.code}
            style={getStyles(item.name, selectValues, theme)}
          >
            {multiple && (
              <Checkbox checked={selectValues.indexOf(item.code) > -1} />
            )}
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </div>
  );
};

export default React.memo(Select);
