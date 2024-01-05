import { useRef } from 'react'
import Damage from './Damage'
import useOnClickOutside from '../hooks/useOnClickOutside'

const DamageModal = ({ damages, setDamageModalOpen }) => {
  const ref = useRef()
  useOnClickOutside(ref, () => setDamageModalOpen(false))
  return (
    <div
      className={`flex fixed flex-col items-center justify-center z-50 h-full w-full bottom-0 right-0 bg-slate-800`}
    >
      <div ref={ref} className={`modal flex flex-col  bg-slate-50 rounded-lg w-1/2`}>
        <div className={`flex items-center justify-between w-full p-4`}>
          <h2 className={`font-slate-700 font-semibold text-base`}>데미지 관계</h2>
          <span
            onClick={() => setDamageModalOpen(false)}
            className={`font-slate-700 font-semibold text-lg cursor-pointer`}
          >x</span>
        </div>
        <Damage damages={damages}></Damage>
      </div>
    </div>
  )
}

export default DamageModal