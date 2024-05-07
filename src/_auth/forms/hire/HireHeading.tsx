const HireHeading = ({
  heading,
  text,
}: {
  heading: string
  text?: string | null
}) => {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">{heading}</h2>
      {text && <p className="text-gray-500">{text}</p>}
    </div>
  )
}

export default HireHeading
