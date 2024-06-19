import BoxSvg from "./BoxSvg"

const SectionSvg = ({ crossesOffset }: { crossesOffset?: string }) => {
  return (
    <>
      <BoxSvg
        className={`hidden absolute -top-[0.275rem] left-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block lg:left-[5.5rem] 2xl:left-[9.745rem]`}
      />

      <BoxSvg
        className={`hidden absolute  -top-[0.275rem] right-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block lg:right-[5.5rem] 2xl:right-[9.755rem]`}
      />
    </>
  )
}

export default SectionSvg
