import { useEffect, useState } from 'react'
import { Loading } from '../assets/Loading'

const LazyImage = ({ alt, url }) => {
  const [loading, setLoading] = useState(true)
  const [opactiy, setOpactiy] = useState('opactiy-0')

  useEffect(() => {
    loading ? setOpactiy('opactiy-0') : setOpactiy('opactiy-100')
  }, [loading])

  return (
    <>
      {loading && (
        <div
        className={`absolute h-auto w-auto top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 z-50`}
        >
          <Loading />
        </div>
      )}
      <img
        src={url}
        alt={alt}
        height='auto'
        loading='lazy'
        onLoad={() => setLoading(false)}
        className={`h-full ${opactiy}`}
      />
    </>
  )
}

export default LazyImage