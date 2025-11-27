// import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      {/* <ScaleLoader size={100} color='lime' /> */}
      <img className="w-20 animate-spin" src={'https://i.ibb.co.com/4wCJZ08Y/react-JS-Logo.png'} alt="" />
    </div>
  )
}

export default LoadingSpinner
