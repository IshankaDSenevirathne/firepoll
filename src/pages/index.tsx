import type { NextPage } from 'next'
import Head from 'next/head'
import {prisma} from "../db/client"

const Home: NextPage = (props:any) => {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 className="text-5xl">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <code>{props.questions}</code>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () =>{

  const questions = await prisma.pollQuestion.findMany();

  return {
    props:{
      questions:JSON.stringify(questions)
    }
  }

}