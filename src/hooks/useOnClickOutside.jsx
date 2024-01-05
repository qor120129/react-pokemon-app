import { useEffect } from "react"

export default function useOnClickOutside(ref, handler) {
  console.log(ref, handler)

  useEffect((e) => {
    const listener = (e)=>{
      //모달 안쪽을 클릭시
      if (!ref.current || ref.current.contains(e.target)) {
        return
      }

      //모달 밖을 클릭시
      handler()

    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])

}