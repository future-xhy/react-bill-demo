import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react';
import { billTypeToName } from '@/contants/index';
import Icon from '@/components/Icon';

const DailyBill = ({ date, list }) => {

  const [isShow, setIsShow] = useState(false)
  const itemObj = useMemo(() => {
    return list.reduce((pre, val) => {
      val.type == 'pay' ? pre.pay += +val.money : pre.income += +val.money
      return { ...pre, total: pre.pay + pre.income }
    }, {
      pay: 0,
      income: 0,
      total: 0
    })
  }, [list])


  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', isShow && 'expand')} onClick={() => setIsShow(!isShow)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{itemObj.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{itemObj.income}</span>
          </div>
          <div className="balance">
            <span className="money">{itemObj.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>

      {/* 单日列表 */}
      <div className="billList" style={{ display: !isShow && 'none' }}>
        {list.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill