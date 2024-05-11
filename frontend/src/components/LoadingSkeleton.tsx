export const LooadingSkeleton = () =>{
    return <div className="border-b mt-6 w-screen max-w-screen-sm cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <div className="w-10 h-6 me-3 text-gray-200 mb-2"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full mb-2 "></div>
                </div>
            </div>    
            <div className="font-bold text-2xl">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </div>
            <div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            </div>
            <div className="mt-5 text-slate-500 mb-2">
            <div className="h-2 bg-gray-200 rounded-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
}