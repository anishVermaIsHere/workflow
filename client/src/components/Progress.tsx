
const Progress = ({ progressValue, steps }: { progressValue: number, steps: string }) => {
  return (
    <div className="relative w-[120px] h-[120px]">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx={18} cy={18} r={16} fill="none" className="stroke-current text-gray-200 " strokeWidth={2} />
            <circle cx={18} cy={18} r={16} fill="none" className="stroke-current text-teal-700 transition-all duration-300" strokeWidth={2} strokeDasharray={100} strokeDashoffset={100-progressValue} strokeLinecap="round" />
        </svg>
        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center ">
            <span className="text-center text-lg font-bold text-teal-600">{progressValue}%</span>
        </div>
        <p className="text-xl text-center">{steps}</p>
    </div>
  )
}

export default Progress