import { useAuth } from "@/context/AuthContext"
import Membership from "./Membership"

const AboutUs = () => {

  const { user } = useAuth()

  const items = [
    {
      id: 1,
      text: "Innovation: Creative solutions that challenge the status quo and promote sustainable progress."
    },
    {
      id: 2,
      text: "Integrity: Transparency, accountability, and ethical practices at the core of everything we do."
    },
    {
      id: 3,
      text: "Collaboration: True change happens through partnerships and community involvement."
    },
    {
      id: 4,
      text: "Empowerment: Equipping individuals and organizations with the tools to lead and create impact."
    },
    {
      id: 5,
      text: "Inclusivity: Diversity and inclusion are fundamental to building stronger communities."
    }
  ]


  const itemsTwo = [
    {
      id: 1,
      head: "Community Leadership Workshops:",
      text: "Training sessions designed to develop civic leaders who can advocate effectively for their communities."
    },
    {
      id: 2,
      head: "Social Innovation Lab:",
      text: "A platform for entrepreneurs and innovators to collaborate on scalable solutions to social challenges."
    },
    {
      id: 3,
      head: "Civic Engagement Campaigns:",
      text: "Initiatives aimed at increasing voter participation, community organizing, and public awareness."
    },
    {
      id: 4,
      head: "Youth Empowerment Programs:",
      text: "Providing mentorship, educational resources, and opportunities for young people to become active citizens."
    },
  ]

  return (
    <>
      {
        user ? null : (

          <div className='bg-[#74B4DA] flex p-[2rem] flex-col gap-10'>
            <h1 className='lg:text-6xl text-4xl font-bold text-[#10367D]'>About Us</h1>
            <div className="our-mission flex flex-col gap-4">
              <h1 className='text-[#10367D] text-2xl font-bold'>Our Mission</h1>
              <p className='text-[#10367D] font-semibold text-base'>

                The Scott Presler Foundation is committed to leveraging innovative business strategies to create sustainable social impact.
                We empower communities by fostering civic engagement, encouraging entrepreneurial solutions, and building partnerships that drive measurable change.
                Our mission is to bridge the gap between profit-driven initiatives and meaningful community development.

              </p>
            </div>


            <div className="our-vision flex flex-col gap-4">
              <h1 className='text-[#10367D] text-2xl font-bold'>Our Vision</h1>
              <p className='text-[#10367D] font-semibold text-base'>

                We envision a future where social entrepreneurship is a powerful force for good—where businesses not only succeed financially but also uplift communities,
                promote equality, and inspire active citizenship across all sectors of society.

              </p>
            </div>


            <div className="our-Values flex flex-col gap-4">
              <h1 className='text-[#10367D] text-2xl font-bold'>Our Values</h1>
              {items.map((_i) => (
                <li key={_i.id} className='text-[#10367D] font-semibold text-base pl-4'>{_i.text}</li>
              ))}
              <p className='text-[#10367D] font-semibold text-sm'>
              </p>
            </div>

            <h1 className='lg:text-6xl text-4xl font-bold text-[#10367D]'>Programs & Initiatives</h1>

            <div className="our-progams-list flex flex-col gap-4">
              {itemsTwo.map((_i) => (
                <li key={_i.id} className='text-[#10367D] font-semibold text-base pl-4'><span className='font-bold'>{_i.head} </span>{_i.text}</li>
              ))}
              <p className='text-[#10367D] font-semibold text-sm'>
              </p>
            </div>

          </div>
        )
      }
      <Membership/>
    </>
  )
}

export default AboutUs