import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/"><h1 className='text-5xl font-bold'>ChatWithMe</h1></Link>
      <div className='mt-10 flex flex-col'>
        
      </div>
    </main>
  )
}
