const PlusSvg = ({ className = "" }) => {
  return (
    <svg className={`${className} || ""`} width="10" height="10">
      <rect
        x="0"
        y="0"
        width="10"
        height="10"
        stroke="#263b59"
        fill="#09161e"
        rx="2"
      />
    </svg>
  )
}

export default PlusSvg
