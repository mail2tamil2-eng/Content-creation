import svgPaths from "./svg-voyya8jg35";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g clipPath="url(#clip0_0_6)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p22540600} id="Vector_2" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_0_6">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Help</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[66.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
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
    <button className="cursor-pointer relative rounded-[10px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon1 />
      </div>
    </button>
  );
}

function Container() {
  return (
    <div className="h-[61px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[rgba(255,105,0,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Container1 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Screen title:</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] w-[405px]">{`The 'Screen title' is displayed on the top left corner of the screen`}</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Menu:</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] w-[379px]">Here you can see all the available topics in this course</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Paragraph1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Help:</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] whitespace-nowrap">{`Here you can see the 'Help' page`}</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Paragraph2 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Page no.:</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] w-[379px]">Here you can see the page that you are in right now</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Paragraph3 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Previous:</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] w-[379px]">Course navigation – You can go to the previous screen</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Paragraph4 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Next:</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] whitespace-nowrap">Course navigation – You can go to the next screen</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Paragraph5 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Transcript:</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] whitespace-nowrap">Here you can see the voice-over transcript</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Paragraph6 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Exit:</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] whitespace-nowrap">{`Here you can 'Exit' the course`}</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[60px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Paragraph7 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[648px] items-start relative shrink-0 w-[379px]" data-name="Container">
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[570.594_0_0] min-h-px relative w-[382px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[24px] pr-[39px] pt-[24px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function CreateCoursePage() {
  return (
    <div className="content-stretch flex flex-col h-[632px] items-start relative shrink-0 w-[382px]" data-name="CreateCoursePage">
      <Container />
      <Container2 />
    </div>
  );
}

export default function Help() {
  return (
    <div className="bg-[rgba(30,41,57,0.95)] content-stretch flex flex-col items-start pr-px relative size-full" data-name="Help">
      <div aria-hidden className="absolute border-[rgba(255,105,0,0.3)] border-r border-solid inset-0 pointer-events-none shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
      <CreateCoursePage />
    </div>
  );
}