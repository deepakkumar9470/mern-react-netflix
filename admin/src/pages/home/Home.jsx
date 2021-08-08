import React,{useState,useEffect,useMemo} from 'react';
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from 'axios'

export default function Home() {
  const MONTHS = useMemo(() => [
    'Jan', 'Feb', 'Mar', 
    'Apr', 'May', 'June', 
    'July', 'Aug', 'Sept', 
    'Oct', 'Nov', 'Dec'
    ],[]
    ); 

  const [stats, setStats]  = useState([])

  useEffect(() =>{
      const getStats = async () =>{
        try {
          const res = await axios.get(`/user/stats`,{
            headers : {
                token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjc5NTI0M2JmY2ExMGZmMDU3ODJhMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNjkyNjc4MSwiZXhwIjoxNjI3MDEzMTgxfQ.NJhgXojVTcXWdehUOetA8uL3kWhWiF7jh9hmzV4jkN8"
            },
        })
        const stateList = res.data.sort(function(a,b){
          return a._id  - b._id
        })
        stateList.map(item=> setStats(prev=>
          [...prev, {name : MONTHS[item._id-1], "New User" : item.total}]
             )
           )
        } catch (err) {
            console.log(err)
        }
      
      }
      getStats();
  },[MONTHS]);
console.log(stats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart 
        data={stats} 
        title="User Analytics" 
        grid dataKey="New User"
        />

      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
