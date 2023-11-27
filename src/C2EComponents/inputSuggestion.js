import React, { useState } from "react"
import ArrowDown from "../../src/assets/images/icons/arrow-down.svg"

export default function InputSuggestion({
  data,
  onSelected,
  onChange,
  setSelectedCollction,
  setFieldValue,
  value,
}) {
  const [suggestions, setSuggestions] = useState([])
  const [isHideSuggs, setIsHideSuggs] = useState(false)
  const [selectedVal, setSelectedVal] = useState("")

  const handler = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSuggestions(data.filter((item) => item.toLowerCase().includes(inputValue)));
  }

  const handleChange = (e) => {
    const input = e.target.value
    setIsHideSuggs(false)
    setSelectedCollction(input)
    onChange(input)
    setFieldValue(input)
    setSelectedVal(input)
  }

  const hideSuggs = (value) => {
    onSelected(value)
    setSelectedVal(value)
    setIsHideSuggs(true)
  }
  const toggleSuggestions = () => {
    setSuggestions(data);
    setIsHideSuggs(!isHideSuggs)
  }

  return (
    <div className="sugesstion-auto">
      <div className="form-control-auto">
        <label htmlFor="tag-input">Collection Name</label>
        <div className="collection-input">
          <input
            placeholder="search collection..."
            type="search"
            value={selectedVal}
            onChange={handleChange}
            onKeyUp={handler}
          />
          <img
            src={ArrowDown}
            onClick={toggleSuggestions}
            alt="arrowIcon"
            className="collection-arrow-icon"
          />
        </div>
      </div>

      <div
        className="suggestions"
        style={{ display: isHideSuggs ? "none" : "block" }}
      >
        {suggestions.map((item, idx) => (
          <div
            key={"" + item + idx}
            onClick={() => {
              hideSuggs(item)
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
