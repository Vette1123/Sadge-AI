const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto h-full w-full max-w-screen-xl">{children}</div>
    </main>
  )
}

export default LandingLayout
