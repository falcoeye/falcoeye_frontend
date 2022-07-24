import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Loader = props => {

    const { height } = props;

    return (
        <div className={`flex justify-center items-center w-full h-${height}`} height={ height }>
            <LoadingSpinner />
        </div>
    )
}

export default Loader;