import * as React from "react";
import * as styles from "./index.scss";
import {
  SALECOLUMNS,
  ORDERCOLUMNS,
  NEXTSALECOLUMNS,
  NEXTORDERCOLUMNS,
} from "../../../../statusData";

interface IProps {
  data: any;
  active?: any;
  total?: any;
  fixedTop?: any;
  fixedleft?: any;
}

export default React.memo((props: IProps) => {
  // 每个分组的详细列表
  const {
    data = [],
    total = null,
    fixedTop = 0,
    fixedleft = 0,
    active = 0,
  } = props;
  // const  = statusData;
  const getData = () => {
    const dataTitle =
      active == 1
        ? ORDERCOLUMNS
        : active == 2
        ? NEXTSALECOLUMNS
        : active == 3
        ? NEXTORDERCOLUMNS
        : SALECOLUMNS;
    return {
      titles: dataTitle.title,
      listName: dataTitle.listName,
      sumName: dataTitle.sumName,
    };
  };

  const isSign = (sign, signValue, value, valueK) => {
    let flag = false;
    if (!!sign) {
      switch (sign) {
        case "lt":
          flag = signValue < value;
          break;
        case "gt":
          flag = signValue > value;
          break;
        case "api":
          flag = valueK == 'Y';
          break;
        default:
          break;
      }
    }
    return flag;
  };
  const { titles = [], sumName, listName } = getData();
  return (
    <div className={styles.wrap}>
      <div
        className={
          fixedTop > 1 ? `${styles.title} ${styles.fixed}` : `${styles.title}`
        }
        // style={{
        //   marginLeft: `${fixedTop > 1 && fixedleft > 10 ? -fixedleft : 0}px`,
        // }}
      >
        <tr className={styles.tr}>
          {titles &&
            titles.length > 0 &&
            titles.map((item, index) => {
              return (
                <td className={`${styles.item}`} key={index}>
                  <span style={{ width: `${item.width}px` }}>{item.name}</span>
                </td>
              );
            })}
        </tr>
      </div>
      <div className={styles.content}>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            const list = item[listName];
            const sum = item[sumName];
            return (
              <div key={index} className={styles.list}>
                <tr className={styles.tr}>
                  {sum && (
                    <td className={styles.sumItem}>
                      <span
                        className={
                          item.show ? `${styles.tagUp}` : `${styles.tag}`
                        }
                      >
                        {sum.dataTypeName}
                      </span>
                    </td>
                  )}
                  {titles.map((_item, _index) => {
                    return (
                      sum && (
                        <td
                          className={
                            sum.dataTypeID != 71001 &&
                            _item.sign &&
                            isSign(
                              _item.sign,
                              _item.signValue,
                              sum[_item.key],
                              _item.signValueKey ? sum[_item.signValueKey] : ""
                            )
                              ? `${styles.item} ${styles.colorRed}`
                              : styles.item
                          }
                          key={_index}
                          style={{
                            width: `${_item.width}px`,
                            minWidth: `${_item.width}px`,
                          }}
                        >
                          {sum[_item.key] ? sum[_item.key] : "-"}
                          {_item.symbol ? _item.symbol : ""}
                        </td>
                      )
                    );
                  })}
                </tr>
                {list &&
                  list.length > 0 &&
                  list.map((_item2, _index2) => {
                    return (
                      item.show && (
                        <tr className={styles.tr}>
                          <td className={styles.sumItem}>
                            {_item2.dataTypeName}
                          </td>
                          {titles.map((_item3, _index3) => {
                            return (
                              <td
                                key={_index3}
                                className={
                                  _item2.dataTypeID != 71001 &&
                                  _item3.sign &&
                                  isSign(
                                    _item3.sign,
                                    _item3.signValue,
                                    _item2[_item3.key],
                                    (_item3.signValueKey ? _item2[_item3.signValueKey] : '')
                                  )
                                    ? `${styles.item} ${styles.colorRed}`
                                    : styles.item
                                }
                              >
                                {_item2[_item3.key] ? _item2[_item3.key] : "-"}
                                {_item3.symbol ? _item3.symbol : ""}
                              </td>
                            );
                          })}
                        </tr>
                      )
                    );
                  })}
              </div>
            );
          })}
        {total && (
          <div className={`${styles.list} ${styles.total}`}>
            <tr className={styles.tr}>
              {titles.map((item, index) => {
                return (
                  <td
                    key={index}
                    className={
                      total.dataTypeID != 71001 &&
                      total.markList &&
                      total.markList.includes(item.key)
                        ? active == 1
                          ? `${styles.item} ${styles.colorGreen}`
                          : `${styles.item} ${styles.colorRed}`
                        : styles.item
                    }
                    style={{
                      width: `${item.width}px`,
                      minWidth: `${item.width}px`,
                    }}
                  >
                    {total[item.key] ? total[item.key] : "-"}
                    {item.symbol ? item.symbol : ""}
                  </td>
                );
              })}
            </tr>
          </div>
        )}
      </div>
    </div>
  );
});
