export function AppHomePage() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center px-5 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-center text-[clamp(1.5rem,5vw,1.875rem)] tracking-wide text-city-snow">
        登录成功
      </h1>
      <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-city-fog sm:text-base">
        JWT 登录与路由守卫已就绪。下一步将接入首页数据大屏模块。
      </p>
    </main>
  )
}
