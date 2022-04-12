import Grid from "components/Grid";
import { ToastUIGrid } from "components/Grid/type.d";
import { useRef } from "react";
import { PageProps } from "utils/types";

import { COLUMN_META, DATA } from "./meta";

const TableSample: React.FC<PageProps> = () => {
  const gridRef = useRef<ToastUIGrid>();

  return (
    <>
      <button
        onClick={() => console.log(gridRef.current?.getInstance().getData())}
      >
        버튼
      </button>
      <Grid
        ref={gridRef}
        data={DATA}
        columns={COLUMN_META}
        rowHeight={25}
        bodyHeight={"auto"}
        heightResizable={true}
        rowHeaders={["rowNum", "checkbox"]}
      />
    </>
  );
};

export default TableSample;
