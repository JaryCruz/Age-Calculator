import { useState } from "react"

export default function useInputValidation(label, placeholder) {
  const [inputValue, setInputValue] = useState('')
  const [isValid, setIsValid] = useState(false)

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function validateInput() {
    switch (label) {
      case 'day':
        setIsValid(/^\d{1,2}$/.test(inputValue) && parseInt(inputValue) >= 1 && parseInt(inputValue) <= 31)
        break
      case 'month':
        setIsValid(/^\d{1,2}$/.test(inputValue) && parseInt(inputValue) >= 1 && parseInt(inputValue) <= 12)
        break
      case 'year':
        setIsValid(/^\d{4}$/.test(inputValue) && parseInt(inputValue) <= 2022)
        break
      default:
        setIsValid(true)
        break
    }
  }  

  return {
    inputValue,
    isValid,
    handleInputChange,
    validateInput,
    label,
    placeholder
  }

}