export default function InputDate({ label, isInputValid, inputValue, onChange, placeholder, submitted }) {
  const inputId = label.toLowerCase()
  return (
    <div className="input-date">
      <label className={`${isInputValid || !submitted ? '' : 'label-error'}`} htmlFor={inputId}>{label}</label>
      <input 
        type="number" 
        className={`${isInputValid || !submitted ? '' : 'input-date-error'}`} 
        value={inputValue} 
        onChange={onChange} 
        id={inputId} 
        placeholder={placeholder}/>
      <span className={`${isInputValid || !submitted ? '' : 'span-error-visible'}`}>Invalid {label}</span>
    </div>
  )
}
  