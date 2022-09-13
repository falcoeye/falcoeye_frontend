const AnalysisSkeleton = props => {
    return (
        <div className="shadow-md rounded-md dark:bg-gray-900 p-3 space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-[130px] w-[130px] rounded-md bg-gray-200 dark:bg-gray-700 mr-2"></div>
                </div>
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-[28px] w-48 md:w-60 bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    )
}
export default AnalysisSkeleton;