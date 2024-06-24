import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash';
import DailyBill from './components/DailyBill/index';

const Month = () => {
  const [isShow, setIsShow] = useState(false)

  const { billList } = useSelector(store => store.bill)
  const mobthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY | M'))
  }, [billList])



  const [date, setDate] = useState(dayjs().format('YYYY | M'))
  const [currentMonth, setCurrentMonth] = useState([])
  const handleConfirm = val => {
    let date = dayjs(val).format('YYYY | M')
    setDate(date)
    setCurrentMonth(mobthGroup[date] || [])
  }
  const currentMonthObj = useMemo(() => {
    return currentMonth.reduce((pre, val) => {
      val.type == 'pay' ? pre.pay += +val.money : pre.income += +val.money
      return { ...pre, total: pre.pay + pre.income }
    }, {
      pay: 0,
      income: 0,
      total: 0
    })
  }, [currentMonth])


  useEffect(() => {
    const date = dayjs().format('YYYY | M')
    mobthGroup[date] && setCurrentMonth(mobthGroup[date])
  }, [mobthGroup])

  const dayGroup = useMemo(() => {
    let list = _.groupBy(currentMonth, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    return {
      list,
      keys: Object.keys(list)
    }
  }, [currentMonth])
 

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setIsShow(true)}>
            <span className="text">
              {date}月账单
            </span>
            <span /* className='arrow expand'  */ className={classNames('arrow', { 'expand': !isShow })}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{currentMonthObj.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthObj.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthObj.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={isShow}
            max={new Date()}
            onClose={() => setIsShow(false)}
            onConfirm={handleConfirm}
          />

        </div>
        {dayGroup.keys.map(item => <DailyBill key={item} date={item} list={dayGroup.list[item]} />)}
      </div>
    </div >
  )
}

export default Month