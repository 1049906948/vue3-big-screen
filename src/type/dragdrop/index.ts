interface DragItem {
  key: string;
  title: string;
  column: number;
  row: number;
}

interface DragItemData extends DragItem {
  id: number;
  x: number;
  y: number;
  offsetX?: number;
  offsetY?: number;
}

interface DragSchema {
  title: string;
  list: DragItem[];
}
