import "./index.scss";

import {
  Checkbox,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { Theme, styled, useTheme } from "@mui/material/styles";
import classNames from "classnames";
import OverlayTrigger from "components/OverlayTrigger";
import RenderIndicator from "components/RenderIndicator";
import React, { useCallback, useEffect, useState } from "react";
import { useThemeContext } from "utils/context/Reducer";
import { renderTooltip } from "utils/tooltip/Tooltip";

export interface SelectProps extends MuiSelectProps {
  name: string;
  items: Array<{
    code: string;
    name: string;
  }>;
  defaultValue?: string;
  value?: string | undefined;
  selectOption?: "choose" | "all";
  displaySize?: number;
  handleChangeField?: (event: any) => void;
}

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;

const ANOTHER_ITEMS = [
  { code: "", name: "선택" },
  { code: "all", name: "전체" },
];

const STYLE = {
  width: "100%",
};

// NOTE: Select Items Style
const getStyles = (
  name: string,
  selectValues: readonly string[] | undefined,
  theme: Theme
) => {
  return {
    fontWeight:
      selectValues instanceof Array && selectValues?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    height: ITEM_HEIGHT,
  };
};

const Select: React.FC<SelectProps> = ({
  name,
  items,
  defaultValue,
  value,
  selectOption,
  multiple = false,
  displaySize = 5,
  style,
  handleChangeField,
}: SelectProps) => {
  const { store: themeStore } = useThemeContext();
  const theme = useTheme();
  const listItem = ANOTHER_ITEMS.filter((item) => {
    if (selectOption === "choose") return item.code === "";
    else if (selectOption === "all") return item.code === "all";
  }).concat([...items]);
  const [selectValues, setSelectValues] = useState<string[]>(() => {
    const defaultSelectValues =
      defaultValue !== undefined
        ? [defaultValue]
        : selectOption === "all" && multiple
        ? undefined
        : selectOption === "all"
        ? ["all"]
        : selectOption === "choose"
        ? [""]
        : [listItem[0].code];

    return value?.split(",") || defaultSelectValues || [];
  });
  const [selectedAll, setSelectedAll] = useState(false);

  // NOTE: Select InputBox Component
  const BootstrapInput = styled(InputBase)(({ theme }) => {
    console.log("theme::", theme);
    return {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      "& .MuiInputBase-input": {
        cursor: "auto",
        borderRadius: 4,
        position: "relative",
        // backgroundColor: theme.palette.background.paper,
        // border: "1px solid #ced4da",
        fontSize: 16,
        padding: "6px 12px",
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
    };
  });

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * displaySize + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: themeStore?.darkMode ? "#373737" : "#f7f7f7",
        color: themeStore?.darkMode ? "#adadad" : "#1d1d1d",
      },
    },
  };

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
    [selectValues, selectedAll, handleChangeField]
  );

  // NOTE: InputBox에 선택된 데이터의 명칭 셋팅
  const setInputRender = useCallback((selected: any) => {
    const selectedNames = listItem
      .filter((item) => {
        return multiple && selectOption === "all"
          ? selected?.indexOf(item.code) > -1 && item.code !== "all"
          : selected?.indexOf(item.code) > -1;
      })
      .map((item) => item.name);

    return selectedNames.join(", ");
  }, []);

  useEffect(() => {
    const fieldValue = {
      target: {
        name: name,
        value:
          selectValues instanceof Array ? selectValues.join(",") : selectValues,
      },
    };
    handleChangeField?.(fieldValue);
  }, [selectValues]);

  useEffect(() => {
    value && setSelectValues(value.split(","));
  }, [value]);

  return (
    <div>
      <RenderIndicator />
      <OverlayTrigger
        render={renderTooltip}
        renderChildren={listItem
          .filter((item) => {
            return multiple && selectOption === "all"
              ? selectValues?.indexOf(item.code) > -1 && item.code !== "all"
              : selectValues?.indexOf(item.code) > -1;
          })
          .map((item) => item.name)
          .join(", ")}
      >
        <MuiSelect
          name={name}
          displayEmpty
          multiple={multiple}
          value={selectValues}
          onChange={handleChange}
          // FIXME: DatePicker 컴포넌트의 onMouseDown 이벤트의 버블링으로 인해 추가
          onMouseDown={(event) => event.stopPropagation()}
          input={
            <BootstrapInput
              className={classNames("custom-select", {
                darkMode: themeStore?.darkMode,
              })}
            />
          }
          renderValue={setInputRender}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          SelectDisplayProps={{ style: { ...style } }}
          style={STYLE}
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
      </OverlayTrigger>
    </div>
  );
};

export default React.memo(Select);
