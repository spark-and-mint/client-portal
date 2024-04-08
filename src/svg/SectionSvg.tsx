import PlusSvg from "./PlusSvg"

const SectionSvg = ({ crossesOffset }: { crossesOffset?: string }) => {
  return (
    <>
      <PlusSvg
        className={`hidden absolute -top-[0.3125rem] left-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:left-[9.7rem]`}
      />

      <PlusSvg
        className={`hidden absolute  -top-[0.3125rem] right-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:right-[9.7rem]`}
      />
    </>
  )
}

export default SectionSvg
