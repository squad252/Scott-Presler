import { assets } from '@/assets'
const MemberShipSubmited = () => {
  return (
    <div className='bg-white shadow-2xl flex items-center flex-col justify-center gap-10 p-10'>
        <div>
            <img src={assets.mailIcon} alt="" />
        </div>
        <div className='flex flex-col text-center gap-2'>
            <h1>Thank you for submitting your application.</h1>
            <p>Your membership is currently under review.</p>
            <p>We will notify you via email once it has been approved.</p>
        </div>
    </div>
  )
}

export default MemberShipSubmited