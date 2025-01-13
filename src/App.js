import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [city, setCity]=useState('')
  let [details, setDetails]= useState()
  let [isLoading, setIsLoading]=useState(false)

  let getData=(event)=>{

    setIsLoading(true)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json()) //res => response
    .then((finalRes)=> { 
      if(finalRes.cod == "404"){
        setDetails(undefined)
      } 
      else{
        setDetails(finalRes)
      }
      setIsLoading(false)
      
    })   //finalRes => final response


    event.preventDefault()
    setCity('')
  }

  return (
    <div className='w-[100%] h-[100vh] bg-[#102829] h-screen flex items-center justify-center'>
      <div className='max-w-[1320px] mx-auto '>
        <h1 className='text-[40px] font-bold py[50px] text-white text-shadow-lg'>SIMPLE WEATHER APP</h1>

        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} className='w-[328px] h-[40px] pl-3 rounded focus:outline-none' placeholder='City Name' /> <button className='bg-[#064394] text-white w-[95px] h-[40px] rounded'>Submit</button>
        </form>

        <div className='w-[428px] mx-suto bg-white shadow-lg mt-[40px] p-[25px] relative rounded'>

          <img src='https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif' width={300} className={`absolute left-[40px] ${isLoading ? '' : 'hidden'} `}/>

          {
          details!==undefined
          ?
            <>
              <h3 className='font-bold text-[30px]'>{details.name} <span className='bg-[yellow]'>{details.sys.country}</span></h3>
              <h2 className='font-bold text-[40px]'>
                {details.main.temp}
              </h2>
              <img src={`http://openweathermap.org/img/w/${details.weather[0].icon}.png`}/>
              <p>{details.weather[0].description}</p>
            </>
            :
              "No Data"
          }

          

        </div>
      </div>
      
    </div>
  );
}

export default App;
