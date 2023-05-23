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
        <Script src="https://kit.fontawesome.com/eaa094e850.js" crossOrigin="anonymous"/>
      </Head>
      <Navbar/>
      <Leaderboard date={new Date('2023-5-23')}/>
    </>
  )
}
