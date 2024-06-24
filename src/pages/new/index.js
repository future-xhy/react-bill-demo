import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/moudles/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [type, setType] = useState('pay') // pay支出，income-收入
  const [visible, setVisible] = useState(false)

  const [money, setMoney] = useState('')
  const [useFor, setUseFor] = useState('')

  const handleSave = () => {
    const data = {
      type,
      money: type == 'pay' ? -money : +money,
      date,
      useFor
    }
    dispatch(addBillList(data))
  }

  const [date, setDate] = useState(new Date())
  const handleConfirm = val => {
    setDate(val)
  }


  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            onClick={() => setType('pay')}
            shape="rounded"
            className={classNames(type == 'pay' && 'selected')}
          >
            支出
          </Button>
          <Button
            onClick={() => setType('income')}
            className={classNames(type == 'income' && 'selected')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                visible={visible}
                className="kaDate"
                title="记账日期"
                max={new Date()}
                onClose={() => setVisible(false)}
                onConfirm={handleConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={val => setMoney(val)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[type].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        item.type == useFor && 'selected'
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={handleSave}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New