import Label from "components/Label";
import Row from "components/Row";
import Switch from "components/Switch";
import { USE_RENDER_INDICATOR } from "Constants";
import { useCallback } from "react";
import { Col, Form, FormGroup } from "react-bootstrap";
import useAppContext, { useThemeContext } from "utils/context/Reducer";
import { setLocalStorage } from "utils/functions/store";

const INTERFACE_ITEMS = [
  { code: "MDI", name: "MDI" },
  { code: "SDI", name: "SDI" },
];

const THEME_ITEMS = [
  { code: "activate", name: "다크모드" },
  { code: "deactivate", name: "라이트모드" },
];

const INDICATOR_ITEMS = [
  { code: "activate", name: "활성화" },
  { code: "deactivate", name: "비활성화" },
];

const Settings: React.FC = () => {
  const { store, dispatch } = useAppContext();
  const { store: themeStore, dispatch: themeDispatch } = useThemeContext();

  // NOTE: SDI/MDI 전환 이벤트
  const handleToggledInterface = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      dispatch({
        type: "SET_TOGGLED_INTERFACE",
        payload: value,
      });
    },
    [store?.toggledInterface]
  );

  // NOTE: 다크모드 활성/비활성화 이벤트
  const handleActiveDarkMode = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      themeDispatch({
        type: "SET_ACTIVE_DARKMODE",
        payload: value === "activate" ? true : false,
      });
    },
    [themeStore?.darkMode]
  );

  // NOTE: 인디케이터 활성/비활성화 이벤트
  const handleActiveIndicator = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      dispatch({
        type: "SET_ACTIVE_INDICATOR",
        payload: value === "activate" ? true : false,
      });

      setLocalStorage("indicator", value === "activate" ? "true" : "false");
    },
    [store?.activeIndicator]
  );

  return (
    <Form>
      {JSON.stringify(store)}
      <FormGroup as={Row}>
        <Label sm={"4"}>인터페이스</Label>
        <Col sm={"8"}>
          <Switch
            name={"interface"}
            label={"MDI 모드"}
            choices={INTERFACE_ITEMS}
            value={store?.toggledInterface}
            handleChangeField={handleToggledInterface}
          />
        </Col>
      </FormGroup>
      <FormGroup as={Row}>
        <Label sm={"4"}>다크모드</Label>
        <Col sm={"8"}>
          <Switch
            name={"darkmode"}
            label={"다크모드"}
            choices={THEME_ITEMS}
            value={themeStore?.darkMode ? "activate" : "deactivate"}
            handleChangeField={handleActiveDarkMode}
          />
        </Col>
      </FormGroup>
      {USE_RENDER_INDICATOR && (
        <FormGroup as={Row}>
          <Label sm={"4"}>인디케이터</Label>
          <Col sm={"8"}>
            <Switch
              name={"indicator"}
              label={"인디케이터 활성화"}
              choices={INDICATOR_ITEMS}
              value={store?.activeIndicator ? "activate" : "deactivate"}
              handleChangeField={handleActiveIndicator}
            />
          </Col>
        </FormGroup>
      )}
    </Form>
  );
};

export default Settings;
