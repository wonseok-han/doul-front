import classNames from "classnames";
import React, { LegacyRef, forwardRef, useContext } from "react";

import { SidebarContext } from "../ProSidebar";

export type Props = React.LiHTMLAttributes<HTMLLIElement> & {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  active?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  firstchild?: boolean;
  popperarrow?: boolean;
};

const MenuItem: React.ForwardRefRenderFunction<unknown, Props> = (
  {
    children,
    className,
    icon,
    active,
    prefix,
    suffix,
    // firstchild,
    // popperarrow,
    ...rest
  },
  ref
) => {
  const menuItemRef: LegacyRef<HTMLLIElement> =
    (ref as any) || React.createRef<HTMLLIElement>();
  const { darkMode } = useContext(SidebarContext);

  return (
    <li
      ref={menuItemRef}
      className={classNames("pro-menu-item", className, { active, darkMode })}
      {...rest}
    >
      <div
        className={classNames("pro-inner-item", { darkMode })}
        tabIndex={0}
        role="button"
      >
        {icon ? (
          <span className={classNames("pro-icon-wrapper", { darkMode })}>
            <span className={classNames("pro-icon", { darkMode })}>{icon}</span>
          </span>
        ) : null}

        {prefix ? (
          <span className={classNames("prefix-wrapper", { darkMode })}>
            {prefix}
          </span>
        ) : null}
        <span className={classNames("pro-item-content", { darkMode })}>
          {children}
        </span>
        {suffix ? (
          <span className={classNames("suffix-wrapper", { darkMode })}>
            {suffix}
          </span>
        ) : null}
      </div>
    </li>
  );
};

export default forwardRef<unknown, Props>(MenuItem);
