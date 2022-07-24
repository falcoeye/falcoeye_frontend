import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Loader = props => {

    const { height } = props;

    return (
        <div className={`flex justify-center items-center w-full h-${height} h-96`} >
            <LoadingSpinner />
        </div>
    )
}

export default Loader;