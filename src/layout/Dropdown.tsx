import { USE_RENDER_INDICATOR } from "Constants";
import React, { useCallback } from "react";
import { Dropdown as BootStrapDropdown, FormCheck } from "react-bootstrap";
import useAppContext from "utils/context/Reducer";

const Dropdown: React.FC = () => {
  const { store, dispatch } = useAppContext();

  // NOTE: SDI/MDI 전환 이벤트
  const handleToggledInterface = useCallback(
    (event) => {
      const {
        target: { checked },
      } = event;
      dispatch({
        type: "SET_TOGGLED_INTERFACE",
        payload: checked ? "MDI" : "SDI",
      });
    },
    [store?.toggledInterface]
  );

  // NOTE: 다크모드 활성/비활성화 이벤트
  const handleActiveDarkMode = useCallback(
    (event) => {
      const {
        target: { checked },
      } = event;
      dispatch({
        type: "SET_ACTIVE_DARKMODE",
        payload: checked,
      });
    },
    [store?.darkMode]
  );

  // NOTE: 인디케이터 활성/비활성화 이벤트
  const handleActiveIndicator = useCallback(
    (event) => {
      const {
        target: { checked },
      } = event;
      dispatch({
        type: "SET_ACTIVE_INDICATOR",
        payload: checked,
      });
    },
    [store?.activeIndicator]
  );

  return (
    <BootStrapDropdown.Menu variant={"dark"}>
      <BootStrapDropdown.Item
        onClick={() =>
          handleToggledInterface({
            target: {
              checked: store?.toggledInterface !== "MDI" ? true : false,
            },
          })
        }
      >
        <FormCheck
          inline
          type={"switch"}
          label={"인터페이스 모드"}
          checked={store?.toggledInterface === "MDI" ? true : false}
          onChange={handleToggledInterface}
          onClick={(event) => event.stopPropagation()}
        />
      </BootStrapDropdown.Item>
      <BootStrapDropdown.Item
        onClick={() =>
          handleActiveDarkMode({
            target: {
              checked: !store?.darkMode || false,
            },
          })
        }
      >
        <FormCheck
          inline
          type={"switch"}
          label={"다크모드"}
          checked={store?.darkMode}
          onChange={handleActiveIndicator}
          onClick={(event) => event.stopPropagation()}
        />
      </BootStrapDropdown.Item>
      {USE_RENDER_INDICATOR && (
        <BootStrapDropdown.Item
          onClick={() =>
            handleActiveIndicator({
              target: {
                checked: !store?.activeIndicator || false,
              },
            })
          }
        >
          <FormCheck
            inline
            type={"switch"}
            label={"인디케이터"}
            checked={store?.activeIndicator}
            onChange={handleActiveIndicator}
            onClick={(event) => event.stopPropagation()}
          />
        </BootStrapDropdown.Item>
      )}
      <BootStrapDropdown.Item onClick={() => window.location.reload()}>
        로그아웃
      </BootStrapDropdown.Item>
    </BootStrapDropdown.Menu>
  );
};

export default Dropdown;