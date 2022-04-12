// import "tui-grid/dist/tui-grid.css";
import "./styles.scss";

import React, { forwardRef, useEffect, useState } from "react";
import TuiGrid from "tui-grid";
import { useAppContext } from "utils/context";

import { GridProps, ToastUIGrid } from "./type.d";

TuiGrid.setLanguage("ko");
TuiGrid.applyTheme("default", {
  cell: {
    rowHeader: {
      background: "#1d1d1d",
      text: "#adadad",
    },
    header: {
      background: "#1d1d1d",
      text: "#adadad",
    },
    normal: {
      background: "#2b2b2b",
      text: "#adadad",
    },
    editable: {
      background: "#2b2b2b",
      text: "#adadad",
    },
    focused: {
      background: "red",
      // border: "white",
    },
  },
  selection: {
    background: "red",
  },
  area: {
    header: {
      background: "#2b2b2b",
    },
    body: {
      background: "#2b2b2b",
    },
    summary: {
      background: "#2b2b2b",
    },
  },
  scrollbar: {
    background: "#2b2b2b",
    emptySpace: "#1d1d1d",
  },
  heightResizeHandle: {
    background: "#1d1d1d",
  },
});

const Grid = (
  {
    data,
    columns,
    columnOptions,
    keyColumnName,
    width,
    bodyHeight,
    heightResizable,
    minBodyHeight,
    rowHeight,
    minRowHeight,
    scrollX,
    scrollY,
    editingEvent,
    tabMode,
    rowHeaders,
    summary,
    useClientSort,
    selectionUnit,
    showDummyRows,
    copyOptions,
    pageOptions,
    treeColumnOptions,
    header,
    usageStatistics,
    disabled,
    draggable,
    contextMenu,
  }: GridProps,
  ref: any
): JSX.Element => {
  const { store } = useAppContext();
  const [rendering, setRendering] = useState(store?.renderCount);

  useEffect(() => {
    setRendering(store?.renderCount);
  }, [store?.renderCount]);

  return (
    <>
      {rendering === store?.renderCount && (
        <ToastUIGrid
          ref={ref}
          data={data}
          columns={columns}
          columnOptions={columnOptions}
          keyColumnName={keyColumnName}
          width={width}
          bodyHeight={bodyHeight}
          heightResizable={heightResizable}
          minBodyHeight={minBodyHeight}
          rowHeight={rowHeight}
          minRowHeight={minRowHeight}
          scrollX={scrollX}
          scrollY={scrollY}
          editingEvent={editingEvent}
          tabMode={tabMode}
          rowHeaders={rowHeaders}
          summary={summary}
          useClientSort={useClientSort}
          selectionUnit={selectionUnit}
          showDummyRows={showDummyRows}
          copyOptions={copyOptions}
          pageOptions={pageOptions}
          treeColumnOptions={treeColumnOptions}
          header={header}
          usageStatistics={usageStatistics}
          disabled={disabled}
          draggable={draggable}
          contextMenu={contextMenu}
          // oneTimeBindingProps={["data", "columns"]}
        />
      )}
    </>
  );
};

export default React.memo(forwardRef<any, GridProps>(Grid));
