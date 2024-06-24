import { fetchList } from "@/store/moudles/billStore"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch()
  const { billList } = useSelector(store => store.bill)
  console.log(billList,'billListbillList');

  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])

  return (
    <div>
      <Outlet />
      Layout
    </div>
  )
}

export default Layout