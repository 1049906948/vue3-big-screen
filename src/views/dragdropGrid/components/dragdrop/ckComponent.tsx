import { ref, h,defineComponent } from 'vue'

interface DragItemData extends DragItem {
  id: number;
  x: number;
  y: number;
  offsetX?: number;
  offsetY?: number;
}


export default defineComponent(
    (props: { data: DragItemData }) => {
      return () =>
        h(
          "div",
          {
            style: {
              width: "100%",
              height: "100%",
              color: "#fff",
              backgroundColor: "#707eb1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "26px",
              fontWeight: "600",
            },
          },
          `${props.data.column}x${props.data.row}`,
        );
    },
    {
      props: ["data"]
    }
)
