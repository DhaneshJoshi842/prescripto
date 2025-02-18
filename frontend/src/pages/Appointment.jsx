import React, { useContext, useEffect } from 'react'
import { UNSAFE_NavigationContext, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, bakendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const navigate = useNavigate()
  const [slotTime, setSlotTime] = useState('');
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id == docId);
    setDocInfo(docInfo);

  }
  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getiing date with index 
      let currentDate = new Date(today);
      console.log(currentDate)
      currentDate.setDate(today.getDate() + i);
      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0);

      // setting hours 
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
  }
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])
  return docInfo && (
    <div className="flex flex-col gap-6">
      {/* Image and Doctor Info Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            className="bg-primary h-[250px] w-[350px] rounded-lg"
            src={docInfo.image}
            alt="Doctor"
          />
        </div>
        {/* Doctor Info */}
        <div className="flex-1 border border-gray-300 shadow-sm rounded-lg p-6 bg-white">
          {/* Name and Verification */}
          <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          {/* Degree and Speciality */}
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full bg-gray-100 text-gray-700">
              {docInfo.experience} yrs
            </button>
          </div>
          {/* About Section */}
          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About
              <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 mt-2">{docInfo.about}</p>
          </div>
          {/* Appointment Fee */}
          <div className="mt-4">
            <p className="text-gray-500 font-medium">
              Appointment Fee:
              <span className="text-gray-700"> {currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Booking Slots */}
      <div className="w-full mt-6">
        <p className="font-medium text-gray-700 mb-3">Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-auto">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (

              <div
                key={index}
                className={`text-center py-4 px-3 rounded-lg cursor-pointer ${slotIndex === index
                  ? 'bg-primary text-white'
                  : 'border border-gray-200 text-gray-700'
                  }`}
                onClick={() => setSlotIndex(index)}
              >
                <p className="text-sm">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-lg font-medium">{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className='flex items-cneter gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time == slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 '>Book an appointment</button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>


  )
}

export default Appointment