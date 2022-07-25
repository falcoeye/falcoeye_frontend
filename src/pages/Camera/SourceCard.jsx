
const SourceCard = props => {
    const { source, handleClick } = props

    const status = source.status === '1' || source.status === 1 || source.status.toLowerCase() === 'running' ? 'Running' : 'Stopped'
    const type = source.streaming_type === 'StreamingServer' ?  'Streaming Server' :  source.streaming_type

    return (
        <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer" onClick={ ( ) => handleClick(source.id) } >
            <h5 className="mb-1 text-xl font-semibold tracking-tight text-gray-900  capitalize ">{source.name}</h5>
            <p className="mb-3 text-sm font-normal text-gray-500 capitalize">{type}</p>
            <div className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white ${status === 'Running' ? 'bg-primary' : 'bg-danger' } rounded-lg`}>
                {status}
            </div>
        </div>
    )
}
export default SourceCard