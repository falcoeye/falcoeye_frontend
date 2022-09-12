import MediaCarousel from "./MediaCarousel/MediaCarousel";

const AnalysisFiles = props => {
    const { id, meta } = props;
    console.log(meta)
    return (
        <div className="mt-3">
            <h3 className="text-gray-700 text-lg font-bold dark:text-white capitalize flex items-center mb-5" >output: 
                <span className='px-3 py-1 text-base rounded-md bg-primary text-white ml-2' >{meta.filenames.length}</span>
            </h3>
            {meta.type === 'media' && <MediaCarousel id={id} files={meta.filenames} /> }
        </div>
    )
}
export default AnalysisFiles;