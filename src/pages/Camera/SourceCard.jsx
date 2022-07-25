import moment from 'moment'

const SourceCard = props => {
    const { source, handleClick } = props
    return (
        <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md" >
            <h5 className="mb-1 text-xl font-semibold tracking-tight text-gray-900  capitalize ">{source.name}</h5>
            <p className="mb-3 text-sm font-normal text-gray-500 capitalize">{moment.utc(source.created_at).fromNow()}</p>
            <button onClick={ ( ) => handleClick(source.id) } className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Read more
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>

    )
}
export default SourceCard