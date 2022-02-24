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
  value?: any
): OverlayChildren =>
  isNull(value) ? <></> : <Tooltip {...props}>{value}</Tooltip>;
