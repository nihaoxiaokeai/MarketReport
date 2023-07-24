import * as React from "react";
import * as qs from "query-string";
import Tab from "../../components/Tab";
import EmptyView, { EmptyType } from "../../components/EmptyView";
import GroupsTable from "./components/Table";
import {
  SALECOLUMNS,
  ORDERCOLUMNS,
  NEXTSALECOLUMNS,
  NEXTORDERCOLUMNS,
} from "./statusData";
import * as styles from "./index.scss";
import { Toast, Modal } from "antd-mobile";
import * as api from "../../services/homeReport";

const { useState, useEffect } = React;
export default React.memo(() => {
  const [reportDate, setReportDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tableTotal, setTableTotal] = useState({});
  const [msgid, setMsgid] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [resData, setResData] = useState(null);
  const [isShowTips, setIsShowTips] = useState(false);
  const [dataType, setDataType] = useState("");
  const [localData, setLocalData] = useState(null);
  const [tips, setTips] = useState(SALECOLUMNS.tips);
  useEffect(() => {
    const params = qs.parse(window.location.search);
    const { msgid } = params;
    setMsgid(msgid);
    getSupMarketSaleReport(msgid);
  }, []);

  // 超市到家销售日报
  const getSupMarketSaleReport = (msgid, type = 1) => {
    setIsloading(true);
    Toast.loading("加载中...", null, null, true);
    // 1（超市到家销售） 2 （超市到家运营）3 （次日达销售） 4 （次日达运营）
    const p = Promise.race([
      api.getSupMarketReport({ msgid, type }, true).then((res: any) => {
        setIsloading(false);
        Toast.hide();
        const {
          reportData,
          reportDetail,
          reportDate,
          dataType,
          pageTitle,
        } = res;
        document.title = pageTitle;
        setResData(res);
        if (res) {
          setReportDate(reportDate);
          setDataType(dataType);
          setTableData(reportData);
          setTableTotal(reportDetail);
          setTabIndex(type - 1);
          const tempData = {
            [`${type}`]: {
              reportDetail,
              reportData,
            },
          };

          const tempLocalData = localData
            ? Object.assign(localData, tempData)
            : tempData;
          setLocalData(tempLocalData);
        } else {
          // setTableData(null);
          // setTableTotal({});
        }
      }),
    ]).catch((err) => {
      Toast.hide();
      setIsloading(false);
      setError(err.message);
    });
  };

  const tabChange = ({ id, key }) => {
    setTabIndex(key);
    const tempTips =
      key == 1
        ? ORDERCOLUMNS.tips
        : key == 2
        ? NEXTSALECOLUMNS.tips
        : key == 3
        ? NEXTORDERCOLUMNS.tips
        : SALECOLUMNS.tips;
    setTips(tempTips);
    if (localData && localData[id]) {
      const { reportData = [], reportDetail = {} } = localData[id] || {};
      setTableData([...reportData]);
      setTableTotal({ ...reportDetail });
      return;
    }
    getSupMarketSaleReport(msgid, id);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.reportDate}>{reportDate}</div>
      <Tab
        data={[
          { id: 1, name: "超市到家\n销售日报" },
          { id: 2, name: "超市到家\n运营情况" },
          { id: 3, name: "次日达\n销售日报" },
          { id: 4, name: "次日达\n运营情况" },
        ]}
        current={tabIndex}
        theme="gray"
        className="tabWrap"
        handleChange={tabChange}
      />
      {!isLoading && error ? (
        <EmptyView
          className="noData"
          emptyType={EmptyType.emptyTypeNone}
          tipImage={require("assets/images/icon_nodata.png")}
        />
      ) : (
        <>
          <GroupsTable
            data={tableData}
            dataType={dataType}
            active={tabIndex}
            total={tableTotal}
            isLoading={isLoading}
          />
          {/* <GroupsTable
            data={tableData}
            columns={tabIndex == 1 ? ORDERCOLUMNS : SALECOLUMNS}
            total={tableTotal}
          /> */}
          {!isLoading && !error && tableData && tableData.length > 0 && (
            <div
              className={styles.tipsText}
              onClick={() => setIsShowTips(true)}
            >
              <div>统计口径说明</div>
              <div className={styles.tipsImg}>
                <img
                  className={styles.img}
                  src={require(`../../assets/images/icon_help_dark.png`)}
                />
              </div>
            </div>
          )}
        </>
      )}
      <Modal
        className={styles.tipsModal}
        visible={isShowTips}
        transparent
        title="统计口径说明"
        footer={[
          {
            text: "关闭",
            onPress: () => {
              setIsShowTips(false);
            },
          },
        ]}
      >
        <div className={styles.tips}>
          {tips &&
            tips.length > 0 &&
            tips.map((v) => {
              return <div key={v}>{v}</div>;
            })}
        </div>
      </Modal>
    </div>
  );
});
