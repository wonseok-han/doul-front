import classNames from 'classnames';
import React, { LegacyRef, forwardRef } from 'react';

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
  return (
    <div
      ref={sidebarHeaderRef}
      className={classNames('pro-sidebar-header', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default forwardRef<unknown, Props>(SidebarHeader);
