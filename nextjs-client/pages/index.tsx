import Head from 'next/head'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Leaderboard from '../components/leaderboard/Leaderboard'



const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <Head>
        <title>תחרות מחירות</title>
        
      </Head>
      <Navbar/>
      <div className='page'>
        <h1 className='title'>תחרות מכירות ג'פניקה צמח</h1>
        <p className='sub-title'>תוצאות של שבוע נוכחי</p>
        
        <Leaderboard date={new Date('2023-5-23')}/>
      </div>
      
    </>
  )
}
