import AboutUs from '@/components/Home/AboutUs'
import Footer from '@/components/Home/Footer'
import HeroSection from '@/components/Home/HeroSection'
// import { client } from '@/config/appwrite';
// import { useAuth } from '@/context/AuthContext';
// import { useEffect, useState } from 'react';
// import { UserData } from '@/';

export interface UserData {
  $id?: string;
  email: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  phoneNumber: string;
  madepayment: boolean;
  status?: string
}

// const DID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const CID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const HeroSectionMain = () => {
  // const [userData, setUserData] = useState<UserData | null>(null);

  // const { user } = useAuth();
  // useEffect(() => {
  //   const unsubscribe = client.subscribe(
  //     [`databases.${DID}.collections.${CID}.documents.${user?.$id}`],
  //     (response) => {
  //       if (response.events.includes("databases.*.collections.*.documents.*.update")) {
  //         const updatedUserData = response.payload as UserData;
  //         setUserData(updatedUserData);
  //       }
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user?.$id]);
  return (
    <div>
      <HeroSection />
      <AboutUs/>
      <Footer />
    </div>
  )
}

export default HeroSectionMain