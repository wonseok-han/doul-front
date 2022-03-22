import classNames from "classnames";
import React, { LegacyRef, forwardRef, useContext } from "react";

import { SidebarContext } from "../ProSidebar";

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarContent: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, className, ...rest },
  ref
) => {
  const sidebarContentRef: LegacyRef<HTMLDivElement> =
    (ref as any) || React.createRef<HTMLDivElement>();
  const { darkMode } = useContext(SidebarContext);

  return (
    <div
      ref={sidebarContentRef}
      className={classNames("pro-sidebar-content", className, {
        darkMode,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};

export default forwardRef<unknown, Props>(SidebarContent);
