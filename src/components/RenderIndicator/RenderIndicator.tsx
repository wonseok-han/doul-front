import "./index.scss";

import { USE_RENDER_INDICATOR } from "Constants";
import React from "react";
import useAppContext from "utils/context/Reducer";

interface Props {
  style?: any;
}

const RenderIndicator: React.FC<Props> = ({ style, children }) => {
  const { store } = useAppContext();
  const count = React.useRef(0);

  React.useLayoutEffect(() => {
    count.current += 1;
  });

  return (
    <>
      {store?.activeIndicator && (
        <div
          className="render-indicator"
          style={{ ...style, backgroundColor: getBackgroundColor() }}
          title={`렌더링: ${getTimeLabel()}`}
        >
          {count.current}
          {children}
        </div>
      )}
    </>
  );
};

const backgroundColors = [
  "#f0f7a9",
  "#c1e6dd",
  "#ade0ee",
  "#ff94ff",
  "#ff94b2",
  "#c7e3c6",
];

function getBackgroundColor(): string {
  const index = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[index];
}

function getTimeLabel(): string {
  const now = new Date();
  return `${now.toTimeString().slice(0, 8)}.${now.getMilliseconds()}`;
}

const RenderIndicatorWrap: React.FC<Props> = ({ style }) => {
  if (!USE_RENDER_INDICATOR) return null;
  return <RenderIndicator style={style} />;
};

export default RenderIndicatorWrap;
