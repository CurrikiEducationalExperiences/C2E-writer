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
  const [suggestions, setSugesstions] = useState([])
  const [isHideSuggs, setIsHideSuggs] = useState(false)
  const [selectedVal, setSelectedVal] = useState("")

  const handler = (e) => {
    if (selectedVal) {
      setSugesstions(data.filter((i) => i.startsWith(e.target.value)))
    } else {
      setSugesstions(data)
    }
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
            value={value}
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
