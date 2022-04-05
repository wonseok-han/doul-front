import Col from "components/Col";
import Label from "components/Label";
import Row from "components/Row";
import Switch from "components/Switch";
import { USE_RENDER_INDICATOR } from "Constants";
import { useCallback } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { actions, useAppContext, useThemeContext } from "utils/context";
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
  const { setToggledInterface, setActiveIndicator, setActiveDarkMode } =
    actions;

  // NOTE: SDI/MDI 전환 이벤트
  const handleToggledInterface = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      dispatch(setToggledInterface(value));

      setLocalStorage("interface", value);
    },
    [store?.toggledInterface]
  );

  // NOTE: 다크모드 활성/비활성화 이벤트
  const handleActiveDarkMode = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      themeDispatch(setActiveDarkMode(value === "activate" ? true : false));

      setLocalStorage("darkMode", value === "activate" ? "true" : "false");
    },
    [themeStore?.darkMode]
  );

  // NOTE: 인디케이터 활성/비활성화 이벤트
  const handleActiveIndicator = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      dispatch(setActiveIndicator(value === "activate" ? true : false));

      setLocalStorage("indicator", value === "activate" ? "true" : "false");
    },
    [store?.activeIndicator]
  );

  return (
    <Form>
      <FormGroup as={Row}>
        <Label sm={"4"}>MDI 모드</Label>
        <Col sm={"8"}>
          <Switch
            name={"interface"}
            choices={INTERFACE_ITEMS}
            value={store?.toggledInterface}
            handleChangeField={handleToggledInterface}
            style={{
              marginLeft: 10,
            }}
          />
        </Col>
      </FormGroup>
      <FormGroup as={Row}>
        <Label sm={"4"}>다크모드</Label>
        <Col sm={"8"}>
          <Switch
            name={"darkmode"}
            choices={THEME_ITEMS}
            value={themeStore?.darkMode ? "activate" : "deactivate"}
            handleChangeField={handleActiveDarkMode}
            style={{
              marginLeft: 10,
            }}
          />
        </Col>
      </FormGroup>
      {USE_RENDER_INDICATOR && (
        <FormGroup as={Row}>
          <Label sm={"4"}>인디케이터</Label>
          <Col sm={"8"}>
            <Switch
              name={"indicator"}
              choices={INDICATOR_ITEMS}
              value={store?.activeIndicator ? "activate" : "deactivate"}
              handleChangeField={handleActiveIndicator}
              style={{
                marginLeft: 10,
              }}
            />
          </Col>
        </FormGroup>
      )}
    </Form>
  );
};

export default Settings;
