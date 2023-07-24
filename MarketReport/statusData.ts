// 超市到家销售日报
const SALECOLUMNS = {
  sumName: "reportTotal",
  listName: "reportList",
  title: [
    {
      key: "plantType",
      name: "店龄",
      width: 40,
    },
    {
      key: "nationalRank",
      name: "全国排名",
      width: 50,
    },
    {
      key: "onSalesAmt",
      name: "在线销售实收（万）",
      width: 80,
    },
    {
      key: "onOrderCount",
      name: "在线客单量",
      width: 80,
    },
    {
      key: "supChannelAmt",
      name: "超市全渠道销售额（万）",
      width: 85,
    },
    {
      key: "onSalesRate",
      name: "在线销售占比",
      width: 85,
      symbol: "%",
      // sign: "lt",
      // signValue: 20,
    },
    {
      key: "onSalesMonthAmt",
      name: "当月在线销售实收(万)",
      width: 85,
    },
    {
      key: "onOrderMonthCount",
      name: "当月在线客单量",
      width: 85,
    },
    {
      key: "djSaleMonthTarget",
      name: "月度到家实收目标值",
      width: 85,
    },
    {
      key: "djSaleMonthTargetRate",
      name: "月度完成率",
      symbol: "%",
      width: 85,
      sign: "api",
      signValue: 0,
      signValueKey: "monthTargetRateFlag", // 接口控制是否标红 搭配  sign: "api"
    },
    {
      key: "supChannelMonthAmt",
      name: "月累计超市全渠道销售额(万)",
      width: 85,
    },
    {
      key: "onSalesMonthRate",
      name: "当月在线销售占比",
      width: 85,
      symbol: "%",
      // sign: "lt",
      // signValue: 20,
    },
  ],
  tips: [
    "1、销售额、客单量按照订单已完成状态统计，已减去整单退货单数量，及退货金额；",
    "2、渠道类型：02-05-03（天虹APP天虹到家），06-05-03（天虹WAP天虹到家），12-05-03（天虹小程序天虹到家）， 12-05-19（天虹小程序福利购天虹配送），12-05-20（天虹小程序福利购门店自配送）；",
    "3、柜组类型：1专柜联营、2自营、3代理、4专柜非销贷款、8专柜租赁；",
    "4、经营中心业态：超市；",
    "5、剔除茅台的销售数据以及客单量。",
    "6、月度目标销售为到家销售目标+次日达销售目标的合计",
    "7、时间进度＞（当月在线销售实收/月度销售目标值）时，则月销售目标完成率字段标红",
  ],
};

// 超市到家运营情况
const ORDERCOLUMNS = {
  sumName: "reportTotal",
  listName: "reportList",
  title: [
    {
      key: "onlineSellingCount",
      name: "商品数量",
      width: 70,
    },
    // {
    //   key: "onlineSelledCount",
    //   name: "线上售完商品数量",
    //   width: 85,
    // },
    // {
    //   key: "onlineFreshSelledCount",
    //   name: "线上生鲜售完商品数量",
    //   width: 85,
    // },
    {
      key: "onlineFreshSellCount",
      name: "生鲜商品数量",
      width: 65,
    },
    {
      key: "stockOutRate",
      name: "商品断货率",
      width: 65,
      symbol: "%",
      sign: "lt",
      signValue: 4,
      signValueKey: "",
    },
    {
      key: "freshOutRate",
      name: "生鲜\n商品断货率",
      width: 65,
      symbol: "%",
      sign: "lt",
      signValue: 4,
      signValueKey: "",
    },
    {
      key: "djAfterReturnDate",
      name: "退货单数量",
      width: 70,
    },
    {
      key: "djAfterReturnDateRate",
      name: "退货单占比",
      width: 70,
      symbol: "%",
      sign: "lt",
      signValue: 5,
      signValueKey: "",
    },
    // {
    //   key: "stockOutCount",
    //   name: "备货不及时\n客单量",
    //   width: 85,
    //
    // },
    {
      key: "stockRate",
      name: "备货及时率",
      width: 70,
      symbol: "%",
      sign: "gt",
      signValue: 96,
      signValueKey: "",
    },
    // {
    //   key: "deliveryOutCount",
    //   name: "配送不及时\n客单量",
    //   width: 85,
    //
    // },
    {
      key: "deliveryRate",
      name: "配送及时率",
      width: 70,
      symbol: "%",
      sign: "gt",
      signValue: 96,
      signValueKey: "",
    },
    {
      key: "oTimeOutCount",
      name: "超时客单量",
      width: 85,
    },
    {
      key: "oTimeRate",
      name: "订单及时率",
      width: 85,
      symbol: "%",
      sign: "gt",
      signValue: 96,
      signValueKey: "",
    },
  ],
  tips: [
    "1、商品数量(整体、生鲜），断货率(整体、生鲜）统计时间为今日9点的数据；",
    "2、生鲜商品取自经营中类生鲜食品类（8802）；",
    "3、“配送不及时订单数”和“超时订单数”的配送类型仅筛选为第三方配送的订单，且未剔除因天气等自然原因导致的订单超时；",
    "4、“线上在售商品数量”和“线上在售生鲜商品数量”在区域层级展示时为”店均商品数量“口径；",
    "5、考核指标：断货率(整体、生鲜)<4%，备货及时率>96%，订单及时率>96%，配送及时率＞96%，退货单占比＜5%；",
  ],
};

// 次日达销售日报
const NEXTSALECOLUMNS = {
  sumName: "reportTotal",
  listName: "reportList",
  title: [
    {
      key: "nationalRank",
      name: "门店排名",
      width: 50,
    },
    {
      key: "onSalesAmt",
      name: "在线销售实收（万）",
      width: 80,
    },
    {
      key: "onOrderCount",
      name: "在线客单量",
      width: 60,
    },
    {
      key: "perTicketSales",
      name: "客单价",
      width: 70,
    },
    {
      key: "djAmtDateOrder",
      name: "订单销售额",
      width: 85,
    },
    {
      key: "djReturnDateOrder",
      name: "客单量",
      width: 85,
    },
    {
      key: "supChannelAmt",
      name: "超市全渠道销售额（万）",
      width: 85,
    },
    {
      key: "onSalesRate",
      name: "在线销售占比",
      width: 85,
      symbol: "%",
    },
    {
      key: "onSalesMonthAmt",
      name: "当月在线销售实收(万)",
      width: 85,
    },
    {
      key: "onOrderMonthCount",
      name: "当月在线客单量",
      width: 85,
    },
    {
      key: "perMonthTicketSales",
      name: "当月在线客单价",
      width: 85,
    },
    {
      key: "djAmtMonthOrder",
      name: "当月订单销售额",
      width: 85,
    },
    {
      key: "djReturnMonthOrder",
      name: "当月客单量",
      width: 85,
    },
    {
      key: "djSaleMonthTarget",
      name: "月销售目标值",
      width: 85,
    },
    {
      key: "djSaleMonthTargetRate",
      name: "月销售目标完成率",
      width: 85,
      symbol: "%",
      sign: "api",
      signValue: 0,
      signValueKey: "monthTargetRateFlag", // 接口控制是否标红 搭配  sign: "api"
    },
    {
      key: "supChannelMonthAmt",
      name: "月累计超市全渠道销售额（万）",
      width: 85,
    },
    {
      key: "onSalesMonthRate",
      name: "当月在线销售占比",
      width: 85,
      symbol: "%",
      sign: "",
      signValue: 0,
      signValueKey: "",
    },
  ],
  tips: [
    "1、销售额、客单量按照订单已完成状态统计，已减去整单退货单数量，及退货金额；",
    "2、订单销售额、客单量取自订单状态为人工审核，已完成，待提货，已发货，待发货；",
    "3、在线销售实收，下单销售额包含次日达到家，次日达同城，全国配的订单类型产生的销售金额；",
    "4、月度目标销售为次日达销售目标，当 时间进度＞（当月在线销售实收/月度销售目标值）时，则月销售目标完成率字段标红；",
  ],
};

// 次日达运营情况
const NEXTORDERCOLUMNS = {
  sumName: "reportTotal",
  listName: "reportList",
  title: [
    {
      key: "djAfterReturnDate",
      name: "退单数",
      width: 50,
    },
    {
      key: "djAfterReturnDateRate",
      name: "退单数占比",
      width: 70,
      symbol: "%",
      sign: "lt",
      signValue: 5,
      signValueKey: "",
    },
    {
      key: "stockRate",
      name: "备货及时率",
      width: 70,
      symbol: "%",
    },
    {
      key: "deliveryRate",
      name: "配送及时率",
      width: 70,
      symbol: "%",
      sign: "gt",
      signValue: 96,
      signValueKey: "",
    },
    {
      key: "oTimeOutCount",
      name: "超时订单数",
      width: 80,
    },
    {
      key: "oTimeRate",
      name: "订单及时率",
      width: 80,
      symbol: "%",
      sign: "gt",
      signValue: 96,
      signValueKey: "",
    },
  ],
  tips: [
    "1、配送不及时订单数和超时订单数配送类型仅选择第三方配送，且未剔除因天气等自然原因导致的订单超时",
    "2、全国仓-东坑店不考核物流配送及时率及订单及时率。",
  ],
};

export { SALECOLUMNS, ORDERCOLUMNS, NEXTORDERCOLUMNS, NEXTSALECOLUMNS };
