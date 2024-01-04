import { useEffect } from 'react'
//배열.reduce((누적값, 현잿값, 인덱스, 요소) 
const Damage = ({ text, damages }) => {

  useEffect(() => {
    const damageArray = damages.map((damage) =>
      setdamageArray(damage)
    )

    if (damageArray.length === 1) {
      postDamage(damageArray[0].from)
    } else if (damageArray.length === 2) {
      //데이터 합치기
      const joinDmageArray = joinpostDamage(damageArray)
      console.log(reducePostDamage(postDamage(joinDmageArray.from)))
      reducePostDamage(postDamage(joinDmageArray.from))
    }
  }, [])



  //합친 부분 
  const joinpostDamage = (damage) => {
    return {
      to: joinObjects('to', damage),
      from: joinObjects('from', damage)
    }
  }

  //damageArray 배열이 2개일 때 데이터 합치기 
  const joinObjects = (name, damage) => {
    const firstDamageArray = damage[0][name]
    const secondDamageArray = damage[1][name]
    const acc = Object.entries(firstDamageArray)
      .reduce((acc, [name, value]) => {
        const resValue = secondDamageArray[name].concat(value)
        acc = { ...acc, [name]: resValue }
        return acc
      }, {})

    return acc
  }

  //damageArray한개일 때 damageValue값을 넣어서 데이터 가공
  const postDamage = (damageFrom) => {
    const res = Object.entries(damageFrom)
      .reduce((acc, [name, value]) => {
        const damageValue = {
          double_damage: '2x',
          half_damage: '1/2x',
          no_damage: '0'
        }
        acc = { ...acc, [name]: value.map(i => ({ ...i, damageValue: damageValue[name] })) }
        return acc
      }, {})
    return res
  }

  //damageArray두개일 때 damageValue값을 넣어서 데이터 가공
  const reducePostDamage = (damage) => {
    const doubleDamageValue = {
      double_damage: '4x',
      half_damage: '1/4x',
      no_damage: '0'
    }
    const res = Object.entries(damage)
      .reduce((acc, [name, value]) => {
        const filterValue = filterDamage(value, doubleDamageValue[name])
        acc = { ...acc, [name]: filterValue }
        return acc
      }, {})
    return res
  }

  const filterDamage = (value, doubleDamageValue) => {
    return value.reduce((acc, currenValue) => {
      const { name, url } = currenValue
      const filterAcc = acc.filter(item => (item.name !== name))
      return filterAcc.length === acc.length
        ? (acc = [...acc, currenValue])
        : (acc = [...filterAcc, {name, url ,  damageValue: doubleDamageValue, }])
    }, [])
  }

  //  _from, _to 가공 
  const setdamageArray = (damage) => {
    const from = filterdamageArray('_from', damage)
    const to = filterdamageArray('_to', damage)
    return { from, to }
  }

  //damage _from, _to 데이터 가공
  const filterdamageArray = (valueName, damage) => {
    const res = Object.entries(damage)
      .filter(([name]) => {
        return name.includes(valueName)
      })
      .reduce((acc, [name, value]) => {
        const newName = name.replace(valueName, '')
        acc = { ...acc, [newName]: value }
        return acc
      }, {})
    return res
  }


  return (
    <>
      <h2 className={`${text} font-semibold text-base`}>데미지 관계</h2>
      <div className={`w-full text-center`}>
        데미지
      </div>
    </>
  )
}

export default Damage