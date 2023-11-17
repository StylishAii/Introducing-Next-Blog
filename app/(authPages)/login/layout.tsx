
function LoginLayout({
    children
}:{
    children: React.ReactNode
}) {
  return (
    <section className='min-h-screen bg-white/10 flex justify-center p-20 md:p-10'>
        {children}
    </section>
  )
}

export default LoginLayout