/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { assets } from '@/assets';
import Chat from '../Chat/Chat';
import { Checkbox } from '../ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import MemberShipSubmited from './MemberShipSubmited';
import { SlideInDialog } from './SlideInDialog';
import { Label } from '../ui/label';
import { getUserStatus } from '@/services/databaseService.service';

const Membership = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [memberBo, setMemberBo] = useState(false);
  const [chatAdmin, setChatAdmin] = useState(false);
  const [paymentsMade, setPaymentsMade] = useState(false);

  type FormData = {
    fullName: any;
    phone: any;
    email: any;
    address: any;
    city: any;
    state: any;
    zip: any;
    membershipType: any;
    areasOfInterest: any[];
    interestStatement: any;
    paymentMethod: any;
    [key: string]: any; // Add index signature to allow string keys
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    membershipType: '',
    areasOfInterest: [],
    interestStatement: '',
    paymentMethod: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone Number is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zip.trim()) errors.zip = "Zip Code is required";
    if (!formData.membershipType) errors.membershipType = "Membership Type is required";
    if (!formData.areasOfInterest.length) errors.areasOfInterest = "Select at least one area of interest";
    if (!formData.interestStatement.trim()) errors.interestStatement = "Statement of Interest is required";
    if (!formData.paymentMethod) errors.paymentMethod = "Payment Method is required";
    return errors;
  };

  interface CheckboxGroupHandler {
    (value: string): void;
  }

  const handleCheckboxGroup: CheckboxGroupHandler = (value) => {
    setFormData((prev: FormData) => {
      const isSelected = prev.areasOfInterest.includes(value);
      const updated = isSelected
        ? prev.areasOfInterest.filter((item: string) => item !== value)
        : [...prev.areasOfInterest, value];
      return { ...prev, areasOfInterest: updated };
    });
  };

  const handleSingleSelect = (field: string, value: string) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
  };

  //   useEffect(() => {
  const checkMembershipStatus = async () => {
    if (!user?.email) return;
    const userData = await getUserStatus(user.email);
    if (userData === 'accepted') {
      setPaymentsMade(true);
      setMemberBo(true);
    }
  };
  //   }, [user]);

  // const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (formData.address || formData.areasOfInterest || formData.city || formData.email || formData.fullName || formData.interestStatement || formData.membershipType || formData.paymentMethod || formData.phone || formData.state || formData.zip === null || "" || undefined) {
  //     alert("pls fill out all fields")
  //   } else {
  //     checkMembershipStatus();
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setChatAdmin(true);
  //       setIsLoading(false);
  //       console.log('Submitted Data:', formData);
  //     }, 2000);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      alert("Please fill out all required fields.");
      return;
    }
    checkMembershipStatus();
    setIsLoading(true);
    setTimeout(() => {
      setChatAdmin(true);
      setIsLoading(false);
      console.log('Submitted Data:', formData);
    }, 2000);
  };

  if (!user) return null;

  return (
    <div className='flex p-[2rem] flex-col gap-10 bg-white'>
      <h1 className='lg:text-6xl text-4xl font-bold text-[#10367D]'>Membership</h1>
      <p>Join a community committed to social innovation and impact-driven entrepreneurship.</p>
      <p className='text-[10px] lg:text-base bg-[#065C0F] text-white flex justify-center items-center py-4 lg:ml-10 lg:mr-10'>
        The Scott Presler Foundation - Membership Application Form
      </p>

      <form className="relative p-6 flex flex-col gap-6 items-center rounded-lg w-full" style={{ backgroundImage: `url(${assets.logo})`, backgroundSize: "center", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-white opacity-70 pointer-events-none rounded-lg" />
        <div className="relative z-10 w-full flex flex-col gap-4">
          {[['Full Name', 'fullName'], ['Phone Number', 'phone', 'number'], ['E-mail Address', 'email', 'email'], ['Residential Address', 'address'], ['City', 'city'], ['State', 'state'], ['Zip Code', 'zip', 'number']].map(([labelText, name, type]) => (
            <div className="inputfie flex flex-col gap-2" key={name}>
              <label>{labelText}:</label>
              <Input
                type={type || 'text'}
                required
                value={formData[name]}
                onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
              />
              {formErrors[name] && <span className="text-red-500 text-xs">{formErrors[name]}</span>}
            </div>
          ))}
        </div>
      </form>

      <div className="p-6 flex flex-col gap-6 rounded-lg w-full">
        <h1 className='font-bold pt-10'>Membership Type (Check one)</h1>
        {['General Member - $500/year', 'Executive Member - $1,000/year (with valid ID)', 'Lifetime Member - $1,700 (one-time payment)', 'Donor Member - $3,000+/year', 'Board Member - $5,000/year'].map(option => (
          <div key={option} className="inputfie flex flex-row gap-2 items-center pt-2">
            <Checkbox checked={formData.membershipType === option} onCheckedChange={() => handleSingleSelect('membershipType', option)} />
            <label>{option}</label>
          </div>
        ))}
        {formErrors.membershipType && <span className="text-red-500 text-xs">{formErrors.membershipType}</span>}

        <h1 className='font-bold pt-10'>AREAS OF INTEREST (Check all that apply)</h1>
        {['Youth Empowerment', 'Civic Education', 'Leadership Training', 'Political Advocacy', 'Event Planning', 'Community Service', 'Fundraising'].map(option => (
          <div key={option} className="inputfie flex flex-row gap-2 items-center pt-2">
            <Checkbox checked={formData.areasOfInterest.includes(option)} onCheckedChange={() => handleCheckboxGroup(option)} />
            <label>{option}</label>
          </div>
        ))}
        {formErrors.areasOfInterest && <span className="text-red-500 text-xs">{formErrors.areasOfInterest}</span>}

        <h1 className='font-bold pt-10'>STATEMENT OF INTEREST</h1>
        <Textarea
          name="interestStatement"
          value={formData.interestStatement}
          onChange={(e) => setFormData(prev => ({ ...prev, interestStatement: e.target.value }))}
        />
        {formErrors.interestStatement && <span className="text-red-500 text-xs">{formErrors.interestStatement}</span>}


        <h1 className='font-bold pt-10'>AGREEMENT & SIGNATURE</h1>
        <p>By signing below, I affirm that the above information is accurate and that I support the mission and goals of The Scott Presler Foundation.</p>
        <div className='w-full flex flex-row gap-10 items-center'>
          <div className='flex flex-row gap-3'>
            <Label>Signature:</Label>
            <Input type="text" className='border-b-black rounded-none shadow-none' placeholder='your name...' />
          </div>
          <div className='flex flex-row gap-3'>
            <Label>Date:</Label>
            <Input type="date" className='rounded-none border-none' />
          </div>
        </div>

        <h1 className='font-bold pt-10'>PAYMENT METHOD</h1>
        {['Western Union', 'Wire Transfer', 'Paypal', 'Cash app'].map(method => (
          <div key={method} className="inputfie flex flex-row gap-2 items-center pt-2">
            <Checkbox checked={formData.paymentMethod === method} onCheckedChange={() => handleSingleSelect('paymentMethod', method)} />
            <label>{method}</label>
          </div>
        ))}
        {formErrors.paymentMethod && <span className="text-red-500 text-xs">{formErrors.paymentMethod}</span>}

        <div className="flex justify-center w-full">
          <Button className={`bg-[#D50B0B] rounded-none text-white py-7 px-8 ${chatAdmin ? 'hidden' : 'flex'}`} disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>

          {paymentsMade ? (
            <SlideInDialog open={memberBo} setOpen={setMemberBo}>
              <MemberShipSubmited />
            </SlideInDialog>
          ) : (
            chatAdmin && (
              <div className="chat-message bg-white w-[15rem] rounded-4xl shadow-md p-8 mb-8 mr-8">
                <div className='w-full flex justify-end mb-4' onClick={() => setChatAdmin(false)}>
                  <img src={assets.cancel} alt="" />
                </div>
                <p className="text-base">Contact support to make your payment</p>
              </div>
            )
          )}
        </div>

        <p className='flex justify-center text-sm text-[#D50B0B]'>Please chat with support for payment instructions</p>
      </div>

      <div className='flex items-end w-full justify-end flex-col'>
        <div className="chat-message bg-white w-[15rem] rounded-4xl shadow-md p-8 mb-8 mr-8">
          <p className='text-sm'>Chat with support now to assist you with making your payment.</p>
        </div>
        <div className="chat bg-[#CD0C0C] w-[8rem] flex flex-row justify-center items-center h-[4rem] rounded-4xl gap-2 font-bold" onClick={() => setOpen(!open)}>
          <MessageCircle className='text-white font-bold' /> <p className='text-white'>Chat</p>
        </div>
      </div>

      {open && <Chat setOpen={setOpen} open={open} />}
    </div>
  );
};

export default Membership;
