import { Copyright } from 'lucide-react'

const Footer = () => {
  return (
    <div className='bg-[#06065C] text-white flex flex-col p-6'>
      <h1 className='text-[1.2rem] font-bold pb-5'>Contact Us</h1>
      <p className='text-sm'>If you have questions or want to learn more about The Scott Presler Foundation, please reach out:</p>
      <div className='pt-4 pl-4'>
        <li>Email: scottpreslerfoundation@gmail.com</li>
        <li>Phone:  (214) 673-5715</li>
      </div>
      <div className='flex flex-row w-full justify-center items-center pt-10'>
        <Copyright className='text-sm' size={15}/> <p className='text-sm pl-2'> 2025 The Scott Presler Foundation. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer