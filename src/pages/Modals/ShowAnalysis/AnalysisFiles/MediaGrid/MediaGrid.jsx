import MediaVideo from './MediaVideo/MediaVideo';

const MediaCarousel = (props) => {
    const { files, id } = props;


    let content = files.map((file, index) => {
        return (
            <MediaVideo file={file} id={id} />
        );
    });

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {content}
        </div>
    );
};
export default MediaCarousel;
