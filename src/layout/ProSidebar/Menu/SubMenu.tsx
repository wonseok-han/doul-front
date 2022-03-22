import { createPopper } from "@popperjs/core";
import classNames from "classnames";
import React, {
  LegacyRef,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SlideDown from "react-slidedown";
import ResizeObserver from "resize-observer-polyfill";

import { SidebarContext } from "../ProSidebar";

export type Props = Omit<React.LiHTMLAttributes<HTMLLIElement>, "prefix"> & {
  children?: React.ReactNode;
  className?: string;
  icon?: boolean;
  openedIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
  title?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  firstchild?: boolean;
  popperarrow?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const SubMenu: React.ForwardRefRenderFunction<unknown, Props> = (
  {
    children,
    icon,
    openedIcon,
    closedIcon,
    className,
    title,
    defaultOpen = false,
    open,
    prefix,
    suffix,
    firstchild,
    popperarrow,
    onOpenChange,
    ...rest
  },
  ref
) => {
  let popperInstance: any;
  const { collapsed, rtl, toggled, darkMode } = useContext(SidebarContext);
  const [closed, setClosed] = useState(!defaultOpen);
  const popperElRef = useRef(null);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);

  const handleToggleSubMenu = () => {
    if (onOpenChange) onOpenChange(closed);
    setClosed(!closed);
  };

  useEffect(() => {
    if (firstchild) {
      if (collapsed) {
        if (referenceElement.current && popperElement.current) {
          popperInstance = createPopper(
            referenceElement.current,
            popperElement.current,
            {
              placement: "right",
              strategy: "fixed",
              modifiers: [
                {
                  name: "computeStyles",
                  options: {
                    adaptive: false,
                  },
                },
              ],
            }
          );
        }

        if (popperElRef.current) {
          const ro = new ResizeObserver(() => {
            if (popperInstance) {
              popperInstance.update();
            }
          });

          ro.observe(popperElRef.current);
          referenceElement.current && ro.observe(referenceElement.current);
        }

        setTimeout(() => {
          if (popperInstance) {
            popperInstance.update();
          }
        }, 300);
      }
    }

    return () => {
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    };
  }, [collapsed, rtl, toggled]);

  const subMenuRef: LegacyRef<HTMLLIElement> =
    (ref as any) || React.createRef<HTMLLIElement>();

  return (
    <li
      ref={subMenuRef}
      className={classNames("pro-menu-item pro-sub-menu", className, {
        open: typeof open === "undefined" ? !closed : open,
        darkMode,
      })}
      {...rest}
    >
      <div
        ref={referenceElement}
        className={classNames("pro-inner-item", { darkMode })}
        onClick={handleToggleSubMenu}
        onKeyPress={handleToggleSubMenu}
        role="button"
        tabIndex={0}
      >
        {icon ? (
          <span className={classNames("pro-icon-wrapper", { darkMode })}>
            <span className={classNames("pro-icon", { darkMode })}>
              {closed ? closedIcon : openedIcon}
            </span>
          </span>
        ) : null}
        {prefix ? (
          <span className={classNames("prefix-wrapper", { darkMode })}>
            {prefix}
          </span>
        ) : null}
        <span className={classNames("pro-item-content", { darkMode })}>
          {title}
        </span>
        {suffix ? (
          <span className={classNames("suffix-wrapper", { darkMode })}>
            {suffix}
          </span>
        ) : null}
        <span className={classNames("pro-arrow-wrapper", { darkMode })}>
          <span className={classNames("pro-arrow", { darkMode })} />
        </span>
      </div>

      {firstchild && collapsed ? (
        <div
          ref={popperElement}
          className={classNames("pro-inner-list-item popper-element", {
            "has-arrow": popperarrow,
            darkMode,
          })}
        >
          <div
            className={classNames("popper-inner", { darkMode })}
            ref={popperElRef}
          >
            <ul>{children}</ul>
          </div>
          {popperarrow ? (
            <div
              className={classNames("popper-arrow", { darkMode })}
              data-popper-arrow
            />
          ) : null}
        </div>
      ) : (
        <SlideDown
          closed={typeof open === "undefined" ? closed : !open}
          className={classNames("pro-inner-list-item", { darkMode })}
        >
          <div>
            <ul>{children}</ul>
          </div>
        </SlideDown>
      )}
    </li>
  );
};

export default forwardRef<unknown, Props>(SubMenu);
