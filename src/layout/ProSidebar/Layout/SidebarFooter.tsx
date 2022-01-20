import classNames from 'classnames';
import React, { LegacyRef, forwardRef } from 'react';

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarFooter: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, className, ...rest },
  ref
) => {
  const sidebarFooterRef: LegacyRef<HTMLDivElement> =
    (ref as any) || React.createRef<HTMLDivElement>();
  return (
    <div
      ref={sidebarFooterRef}
      className={classNames('pro-sidebar-footer', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default forwardRef<unknown, Props>(SidebarFooter);
