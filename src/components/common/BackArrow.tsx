import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';


const BackArrow = () => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(-1)} className='flex items-center gap-2 cursor-pointer'>
        <ArrowBigLeft/>
        <Button/>
    </div>
  )
}

export default BackArrow