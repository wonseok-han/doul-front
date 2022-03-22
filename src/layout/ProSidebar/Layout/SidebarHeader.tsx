import classNames from "classnames";
import React, { LegacyRef, forwardRef, useContext } from "react";

import { SidebarContext } from "../ProSidebar";

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarHeader: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, className, ...rest },
  ref
) => {
  const sidebarHeaderRef: LegacyRef<HTMLDivElement> =
    (ref as any) || React.createRef<HTMLDivElement>();
  const { darkMode } = useContext(SidebarContext);

  return (
    <div
      ref={sidebarHeaderRef}
      className={classNames("pro-sidebar-header", className, { darkMode })}
      {...rest}
    >
      {children}
    </div>
  );
};

export default forwardRef<unknown, Props>(SidebarHeader);
