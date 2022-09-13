const AnalysisSkeleton = props => {
    return (
        <div className="shadow-md rounded-md dark:bg-gray-900 p-5 space-y-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-[28px] w-48 md:w-60 bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-[36px] w-[55px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    )
}
export default AnalysisSkeleton;