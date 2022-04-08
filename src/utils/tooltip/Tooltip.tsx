import "./styles.scss";

import classNames from "classnames";
import { OverlayTriggerProps, Tooltip } from "react-bootstrap";
import { OverlayChildren } from "react-bootstrap/esm/Overlay";
import { isNull } from "utils/functions/data";

/**
 *
 * @param props OverlayTrigger 속성
 * @param value 툴팁에 표시할 children
 * @returns
 */
export const renderTooltip = (
  props: OverlayTriggerProps,
  value?: string | number,
  validate?: string
): OverlayChildren => {
  return isNull(value) ? (
    <></>
  ) : (
    <Tooltip
      {...props}
      className={classNames("custom-tooltip", {
        [`placement-${props.placement?.split("-").shift()}`]: true,
        validate: !isNull(validate) ? true : false,
      })}
    >
      {value}
    </Tooltip>
  );
};
