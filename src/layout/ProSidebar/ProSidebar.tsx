import "./scss/styles.scss";

import classNames from "classnames";
import React, { createContext, forwardRef, useEffect, useState } from "react";

export type Props = React.HTMLAttributes<HTMLElement> & {
  collapsed?: boolean;
  rtl?: boolean;
  toggled?: boolean;
  darkMode?: boolean;
  width?: string | number;
  collapsedWidth?: string | number;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  breakPoint?: "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
  onToggle?: (value: boolean) => void;
  style?: React.CSSProperties;
};

export interface SidebarContextProps {
  collapsed: boolean;
  rtl: boolean;
  toggled: boolean;
  darkMode: boolean;
}

export const SidebarContext = createContext<SidebarContextProps>({
  collapsed: false,
  rtl: false,
  toggled: false,
  darkMode: false,
});

const ProSidebar: React.ForwardRefRenderFunction<unknown, Props> = (
  {
    children,
    className,
    width,
    collapsedWidth,
    collapsed = false,
    rtl = false,
    toggled = false,
    darkMode = false,
    image = "",
    breakPoint,
    onToggle,
    style = {},
    ...rest
  },
  ref
) => {
  const [sidebarState, setSidebarState] = useState({
    collapsed: collapsed,
    rtl: rtl,
    toggled: toggled,
    darkMode: darkMode,
  });

  const sidebarRef: React.RefObject<HTMLDivElement> =
    (ref as any) || React.createRef<HTMLDivElement>();

  const handleToggleSidebar = () => {
    const toggleValue = sidebarState.toggled;
    setSidebarState({ ...sidebarState, toggled: !toggleValue });
    if (onToggle) {
      onToggle(!toggleValue);
    }
  };

  const widthStyle = width ? { width, minWidth: width } : {};
  const collapsedWidthStyle = collapsedWidth
    ? { width: collapsedWidth, minWidth: collapsedWidth }
    : {};
  const finalWidth = collapsed ? collapsedWidthStyle : widthStyle;

  useEffect(() => {
    setSidebarState({ ...sidebarState, collapsed, rtl, toggled, darkMode });
  }, [collapsed, rtl, toggled, darkMode]);

  return (
    <SidebarContext.Provider value={sidebarState}>
      <div
        ref={sidebarRef}
        className={classNames("pro-sidebar", className, breakPoint, {
          collapsed,
          rtl,
          toggled,
          darkMode,
        })}
        style={{ ...finalWidth, ...style }}
        {...rest}
      >
        <div
          className={classNames("pro-sidebar-inner", {
            darkMode,
          })}
        >
          {image ? (
            <img src={image} alt="sidebar background" className="sidebar-bg" />
          ) : null}
          <div className="pro-sidebar-layout">{children}</div>
        </div>
        <div
          className="overlay"
          onClick={handleToggleSidebar}
          onKeyPress={handleToggleSidebar}
          role="button"
          tabIndex={0}
          aria-label="overlay"
        />
      </div>
    </SidebarContext.Provider>
  );
};

export default forwardRef<unknown, Props>(ProSidebar);
