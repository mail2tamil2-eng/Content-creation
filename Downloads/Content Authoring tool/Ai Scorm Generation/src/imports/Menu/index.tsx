import svgPaths from "./svg-mv29l0cc03";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d="M3.33333 10H16.6667" id="Vector" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 5H16.6667" id="Vector_2" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 15H16.6667" id="Vector_3" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[28.008px] min-w-px relative" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.75px] whitespace-nowrap">Menu</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[28.008px] relative shrink-0 w-[75.195px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.988px] items-center relative size-full">
        <Icon />
        <Heading />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" height="11.6667" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667" width="11.6667">
            <path d={svgPaths.p354ab980} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" height="11.6667" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667" width="11.6667">
            <path d={svgPaths.p2a4db200} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <button className="cursor-pointer relative rounded-[10px] shrink-0 size-[27.969px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.984px] px-[3.984px] relative size-full">
        <Icon1 />
      </div>
    </button>
  );
}

function Container() {
  return (
    <div className="h-[61px] relative shrink-0 w-[349px]" data-name="Container">
      <div aria-hidden className="absolute border-[rgba(255,105,0,0.3)] border-b-[1.25px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[1.25px] px-[15.996px] relative size-full">
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#364153] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">🎯</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[90.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1.75px] whitespace-nowrap">Introduction</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[16px] top-[11.99px] w-[434.766px]" data-name="Container">
      <Container5 />
      <Text />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[55.977px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#ff6900] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">🔵</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[68.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#ff8904] text-[16px] top-[-1.75px] whitespace-nowrap">Overview</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[17.25px] top-[13.24px] w-[432.266px]" data-name="Container">
      <Container7 />
      <Text1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,105,0,0.2)] h-[58.477px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border-[1.25px] border-[rgba(255,105,0,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container6 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#364153] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">🔵</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[97.793px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1.75px] whitespace-nowrap">Key Concepts</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[16px] top-[11.99px] w-[434.766px]" data-name="Container">
      <Container9 />
      <Text2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[55.977px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#364153] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">🔵</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[116.152px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1.75px] whitespace-nowrap">Implementation</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[16px] top-[11.99px] w-[434.766px]" data-name="Container">
      <Container11 />
      <Text3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[55.977px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container10 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#364153] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">🔵</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[99.277px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1.75px] whitespace-nowrap">Best Practices</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[16px] top-[11.99px] w-[434.766px]" data-name="Container">
      <Container13 />
      <Text4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[55.977px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container12 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#364153] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">🔵</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[90.684px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1.75px] whitespace-nowrap">Case Studies</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[16px] top-[11.99px] w-[434.766px]" data-name="Container">
      <Container15 />
      <Text5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[55.977px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container14 />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#364153] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">🔵</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[69.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1.75px] whitespace-nowrap">Summary</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[16px] top-[11.99px] w-[434.766px]" data-name="Container">
      <Container17 />
      <Text6 />
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[55.977px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container16 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#364153] relative rounded-[41943000px] shrink-0 size-[31.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">🔵</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-[79.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-1.75px] whitespace-nowrap">Conclusion</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[31.992px] items-center left-[16px] top-[11.99px] w-[434.766px]" data-name="Container">
      <Container19 />
      <Text7 />
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[55.977px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container18 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[7.988px] h-[506.23px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[759.57_0_0] min-h-px relative w-[349px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[15.996px] px-[15.996px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function CreateCoursePage() {
  return (
    <div className="content-stretch flex flex-col h-[648px] items-start relative shrink-0 w-full" data-name="CreateCoursePage">
      <Container />
      <Container2 />
    </div>
  );
}

export default function Menu() {
  return (
    <div className="bg-[rgba(30,41,57,0.95)] content-stretch flex flex-col items-start pr-[1.25px] relative size-full" data-name="Menu">
      <div aria-hidden className="absolute border-[rgba(255,105,0,0.3)] border-r-[1.25px] border-solid inset-0 pointer-events-none shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
      <CreateCoursePage />
    </div>
  );
}