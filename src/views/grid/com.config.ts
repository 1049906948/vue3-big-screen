/**
 * @Description: 数据转换
 * @param list []
 * @param data {}
 * @author caokun
 * @date 2024/1/17
 */
export function mapList(list: any, data: any) {
  list.forEach((item: any) => {
    for (const key in data) {
      if (key === item.name) item.value = data[key];
      if (key === item.keyName) item.keyValue = data[key];
      if (key === "coloring") item.coloring = data[key];
    }
  });
  return list;
}





export const custList = [
  {
    label: "姓名",
    name: "custName",
    value: "",
    coloring:""
  },
  {
    label: "客户号",
    name: "custNo",
    value: "",
    coloring:""
  },
  {
    label: "批次号",
    name: "batchNo",
    value: "",
    coloring:""
  },
  {
    label: "卡号",
    name: "cardNo",
    value: "",
    coloring:""
  },
  {
    label: "逾期总额",
    name: "overdueAmount",
    value: "",
    coloring:""
  },
  {
    label: "贷款余额",
    name: "loanBalance",
    value: "",
    coloring:""
  },
  {
    label: "当前最大逾期天数",
    name: "overdueDay",
    value: "",
    coloring:""
  },
  {
    label: "授信金额",
    name: "creditAmount",
    value: "",
    coloring:""
  },
  {
    label: "借款金额",
    name: "loanAmount",
    value: "",
    coloring:""
  },
  {
    label: "贷款利率",
    name: "loanRate",
    value: "",
    coloring:""
  },
  {
    label: "逾期本金",
    name: "overduePrincipal",
    value: "",
    coloring:""
  },
  {
    label: "逾期利息",
    name: "overdueInterest",
    value: "",
    coloring:""
  },
  {
    label: "逾期罚息",
    name: "penaltyInterest",
    value: "",
    coloring:""
  },
  {
    label: "逾期复息",
    name: "compoundInterest",
    value: "",
    coloring:""
  },
  {
    label: "客户状态",
    name: "custStatus",
    value: "",
    coloring:""
  },
  {
    label: "手机",
    name: "phone",
    value: "",
    coloring:""
  },
  {
    label: "单位名称",
    name: "unitName",
    value: "",
    coloring:""
  },
  {
    label: "总行坐席",
    name: "headSeatName",
    value: "",
    keyName: "headSeatNo",
    keyValue: "",
    coloring:""
  },
  {
    label: "分行",
    name: "branchOffice",
    value: "",
    coloring:""
  },
  {
    label: "支行",
    name: "subBranchOffice",
    value: "",
    coloring:""
  },
  {
    label: "管户客户经理",
    name: "managerName",
    value: "",
    keyName: "managerNo",
    keyValue: "",
    coloring:""
  },
  {
    label: "分行坐席",
    name: "branchSeatName",
    value: "",
    keyName: "branchSeatNo",
    keyValue: "",
    coloring:""
  },
  {
    label: "客户标签",
    name: "custTag",
    value: "",
    coloring:""
  },
  {
    label: "下次跟进日期",
    name: "nextTime",
    value: "",
    coloring:""
  }
];
