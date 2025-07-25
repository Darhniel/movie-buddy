export function Loading() {
    return (
        <div className="grid grid-cols-20 gap-8">
            {[...Array(20)].map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-800 rounded h-[300px] w-full grid row">
                    <div className='h-[230px] bg-gray-400 animate-pulse'></div>
                    <div className='px-2'>
                        <div className='h-5 bg-gray-400 animate-pulse mt-4 rounded-2xl'></div>
                        <div className='h-5 bg-gray-400 animate-pulse mt-1 rounded-2xl'></div>
                    </div>
                </div>
            ))}
        </div>
    )
}