import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { Theme, styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";

export interface SelectProps extends MuiSelectProps {
  items: Array<{
    code: string;
    name: string;
  }>;
  defaultValue?: string;
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
  personName: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
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
  selectOption = "choose",
  multiple = false,
  style,
}: SelectProps) => {
  const theme = useTheme();
  const listItem = items.concat(ANOTHER_ITEMS);
  const defaultSelectValues =
    defaultValue !== undefined
      ? [defaultValue]
      : selectOption === "all" && multiple
      ? undefined
      : selectOption === "all"
      ? ["all"]
      : [""];
  const [selectValues, setSelectValues] = useState<string[]>(
    defaultSelectValues || []
  );

  // NOTE: 선택값 변경 이벤트
  const handleChange = (event: SelectChangeEvent<typeof selectValues>) => {
    const {
      target: { value },
    } = event;

    if (multiple && selectOption === "choose" && value.indexOf("") > -1) {
      setSelectValues([""]);
    } else if (
      multiple &&
      selectOption === "all" &&
      value.indexOf("all") > -1
    ) {
      setSelectValues(items.map((item) => item.code));
    } else {
      setSelectValues(typeof value === "string" ? value.split(",") : value);
    }
  };

  // NOTE: InputBox에 선택된 데이터의 명칭 셋팅
  const setInputRender = (selected: any) => {
    const selectedNames = listItem
      .filter((item) => {
        return selected.indexOf(item.code) > -1;
      })
      .map((item) => item.name);

    return selectedNames.join(", ");
  };

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
            {"전체"}
          </MenuItem>
        )}
        {items?.map((item) => (
          <MenuItem
            key={item.code}
            value={item.code}
            style={getStyles(item.name, selectValues, theme)}
          >
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </div>
  );
};

export default React.memo(Select);
