export default [
  {
    title: "1*X",
    list: [
      { key: "demo-component", title: "1x1", column: 1, row: 1 },
      { key: "demo-component", title: "1x2", column: 1, row: 2 },
      { key: "demo-component", title: "1x3", column: 1, row: 3 },
      { key: "demo-component", title: "1x4", column: 1, row: 4 },
    ],
  },
  {
    title: "2*X",
    list: [
      { key: "demo-component", title: "2x1", column: 2, row: 1 },
      { key: "demo-component", title: "2x2", column: 2, row: 2 },
      { key: "demo-component", title: "2x3", column: 2, row: 3 },
      { key: "demo-component", title: "2x4", column: 2, row: 4 },
    ],
  },
  {
    title: "3*X",
    list: [
      { key: "demo-component", title: "3x1", column: 3, row: 1 },
      { key: "demo-component", title: "3x2", column: 3, row: 2 },
      { key: "demo-component", title: "3x3", column: 3, row: 3 },
      { key: "demo-component", title: "3x4", column: 3, row: 4 },
    ],
  },
  {
    title: "4*X",
    list: [
      { key: "demo-component", title: "4x1", column: 4, row: 1 },
      { key: "demo-component", title: "4x2", column: 4, row: 2 },
      { key: "demo-component", title: "4x3", column: 4, row: 3 },
      { key: "demo-component", title: "4x4", column: 4, row: 4 },
    ],
  },
];
// app.component(
//   "demo-component",
//   defineComponent(
//     (props: { data: DragItemData }) => {
//       return () =>
//         h(
//           "div",
//           {
//             style: {
//               width: "100%",
//               height: "100%",
//               color: "#fff",
//               backgroundColor: "#707eb1",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               fontSize: "26px",
//               fontWeight: "600",
//             },
//           },
//           `${props.data.column}x${props.data.row}`,
//         );
//     },
//     {
//       props: ["data"],
//     },
//   ),
// );
