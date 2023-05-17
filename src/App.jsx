import { useState, useEffect } from 'react'
import './App.css'
import InputDate from './components/InputDate'
import useInputValidation from './hooks/useInputValidation'

function App() {
  const day = useInputValidation('day', 'DD')
  const month = useInputValidation('month', 'MM')
  const year = useInputValidation('year', 'YYYY')

  const [submitted, setSubmitted] = useState(false)

  const [daysOld, setDaysOld] = useState('--')
  const [monthsOld, setMonthsOld] = useState('--')
  const [yearsOld, setYearsOld] = useState('--')

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    day.validateInput()
    month.validateInput()
    year.validateInput()

    if (day.isValid && month.isValid && year.isValid) {
      const { ageYears, ageMonths, ageDays } = calculateAge(day.inputValue, month.inputValue, year.inputValue)
      setYearsOld(ageYears)
      setMonthsOld(ageMonths)
      setDaysOld(ageDays)
    } else {
      return
    }
  }

  useEffect(() => {
    if (day.isValid && month.isValid && year.isValid) {
      const { ageYears, ageMonths, ageDays } = calculateAge(day.inputValue, month.inputValue, year.inputValue)
      setYearsOld(ageYears)
      setMonthsOld(ageMonths)
      setDaysOld(ageDays)
    } else {
      setYearsOld('--')
      setMonthsOld('--')
      setDaysOld('--')
    }
  }, [day.isValid, day.inputValue, month.isValid, month.inputValue, year.isValid, year.inputValue])

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <InputDate
            label={day.label}
            inputValue={day.inputValue}
            isInputValid={day.isValid}
            onChange={day.handleInputChange}
            placeholder={day.placeholder}
            submitted={submitted}
          />
          <InputDate 
            label={month.label}
            inputValue={month.inputValue}
            isInputValid={month.isValid}
            onChange={month.handleInputChange}
            placeholder={month.placeholder}
            submitted={submitted}
          />
          <InputDate 
            label={year.label}
            inputValue={year.inputValue}
            isInputValid={year.isValid}
            onChange={year.handleInputChange}
            placeholder={year.placeholder}
            submitted={submitted}
          />
        </div>
        <div className="line-divider"></div>
        <button type="submit">
        </button>
      </form> 
      <div className="age-output">
        <div>
          <span>{yearsOld.toString().padStart(2, '0')}</span> years
        </div>
        <div>
          <span>{monthsOld.toString().padStart(2, '0')}</span> months
        </div>
        <div> 
          <span>{daysOld.toString().padStart(2, '0')}</span> days
        </div>
      </div>
    </div>
  )
}

export default App

function calculateAge(day, month, year) {
  if (day === null || month ===  null || year === null) return

  const birthDate = new Date(`${year}-${month}-${day}`)
  const today = new Date()
  
  const ageInMilliseconds = today - birthDate
  const ageInSeconds = ageInMilliseconds / 1000
  const ageInMinutes = ageInSeconds / 60
  const ageInHours = ageInMinutes / 60
  const ageInDays = ageInHours / 24
  
  const ageYears = Math.floor(ageInDays / 365)
  const ageMonths = Math.floor((ageInDays % 365) / 30)
  const ageDays = Math.floor(ageInDays % 30)
  
  return {
    ageYears,
    ageMonths,
    ageDays
  }
}
