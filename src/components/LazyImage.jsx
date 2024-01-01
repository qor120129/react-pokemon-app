import { useEffect, useState } from 'react'

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
          className={`absolute h-full z-10 flex items-center justify-center`}>
          ..loading
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