import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import ErrorPage from '../ErrorPage'

const PlantDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
  const {id} = useParams()
  

  const {data: singlePlant={}, isLoading, isError} = useQuery({
    queryKey: ['singlePlant', id],
    queryFn: async() => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/plants/${id}`)
      return result.data.result;
    }
  })

  const closeModal = () => {
    setIsOpen(false)
  }

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if (isError) return <ErrorPage></ErrorPage>

  return (
    <Container>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={singlePlant.image}
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={singlePlant.name}
            subtitle={`Category: ${singlePlant.category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
            {singlePlant.description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller: {singlePlant.seller?.name}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={singlePlant.seller?.photo}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-light
                text-neutral-500
              '
            >
              Quantity: {singlePlant.quantity} Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: ${singlePlant.price}</p>
            <div>
              <Button onClick={() => setIsOpen(true)} label='Purchase' />
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails
