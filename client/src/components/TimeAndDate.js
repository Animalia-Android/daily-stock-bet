import { useState, useEffect } from 'react'

const TimeAndDate = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);

    return () => clearTimeout(timer);

  }, [time]);

  return <h1>Local Time: {time.toLocaleTimeString()}</h1>
}

export default TimeAndDate
