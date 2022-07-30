import Lottie from "lottie-react";
import notFoundAnimation from '../../../assets/animations/404.json';


const Page404 = props => {
    return (
        <div className='flex justify-center items-center w-full h-screen p-10 ' >
            <Lottie animationData={notFoundAnimation} />
        </div>
    )
}
export default Page404;