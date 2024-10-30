import React, {useState,useImperativeHandle,forwardRef} from 'react';
import { useControllableValue } from 'ahooks'
import './index.css';

interface CalendarProps {
  defaultValue?: Date,  // 日期
  onChange: (date: Date) => void  // 日期改变事件
}

interface CalendarRef {
  setDate: (date: Date) => void
  getDate: () => Date
}

const Calendar: React.ForwardRefRenderFunction<CalendarRef,CalendarProps> = (props,ref) => {
  // const {defaultValue = new Date(), onChange} = props

  const [date, setDate] = useControllableValue(props,{
    defaultValue:new Date(),
  })
  useImperativeHandle(ref, () => ({
    getDate: () => date,
    setDate: (date: Date) => {
      setDate(date)
    }
  }))
  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ]
  function handlePreMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  function handleNextMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  // 获取当前月份有多少天
  function daysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
  }

  // 获取当前月份第一天是周几
  function firstDay(year: number, month: number) {
    return new Date(year, month, 1).getDay()
  }

  // 获取当前月份最后一天是周几
  function lastDayMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDay()
  }

  function renderDates() {
    const days: JSX.Element[] = []
    // 获取本月有多少天
    let daysCount = daysInMonth(date.getFullYear(), date.getMonth())
    // 获取本月第一天是周几
    let firstDayIndex = firstDay(date.getFullYear(), date.getMonth())

    // 上个月
    const preDaysCount = daysInMonth(date.getFullYear(), date.getMonth() - 1)
    // 上个月剩余几天
    const lastDay = lastDayMonth(date.getFullYear(), date.getMonth())
    
    // 上个月剩余几天
    for(let i = preDaysCount - firstDayIndex; i < preDaysCount; i++) {
      days.push(<div className="empty pre" key={`empty-${i}`}>{i+1}</div>)
    }

    // 本月
    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i)
        setDate(curDate)
        // onChange?.(curDate)
      }
      if(i === date.getDate()) {
        days.push(<div className="day selected" key={`day-${i}`} onClick={() => clickHandler()}>{i}</div>)
      } else {
        days.push(<div className="day" key={`day-${i}`} onClick={() => clickHandler()}>{i}</div>)
      }
    }

    // 下个月
    for(let i = 0; i < 7 - lastDay - 1; i++) {
      days.push(<div className="empty next" key={`empty-${i}`}>{i+1}</div>)
    }

    return days
  }
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePreMonth}>&lt;</button>
        <div>{`${date.getFullYear()}年${monthNames[date.getMonth()]}`}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
}

export default forwardRef(Calendar);
