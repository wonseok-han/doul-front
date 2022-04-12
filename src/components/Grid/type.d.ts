import Grid, { Props } from "@toast-ui/react-grid";
import { ColumnInfo, ColumnOptions } from "tui-grid";

export class ToastUIGrid extends Grid {}

export type GridProps = Props;

export type ColumnsProps = ColumnInfo;

export type ColumnOptionsProps = Array<ColumnOptions>;
