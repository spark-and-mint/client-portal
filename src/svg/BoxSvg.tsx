const BoxSvg = ({ className = "" }) => {
  return (
    <svg className={`${className} || ""`} width="10" height="10">
      <rect
        x="0"
        y="0"
        width="10"
        height="10"
        stroke="#382a25"
        fill="#150c0a"
        rx="2"
      />
    </svg>
  )
}

export default BoxSvg
