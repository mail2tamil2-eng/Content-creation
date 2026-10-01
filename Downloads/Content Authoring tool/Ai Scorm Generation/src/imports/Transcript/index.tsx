import svgPaths from "./svg-mlr0sc634y";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d={svgPaths.p3713e00} id="Vector" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="#FF6900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1px] whitespace-nowrap">Transcript</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[107.969px]" data-name="Container">
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
    <div className="h-[61px] relative shrink-0 w-[726px]" data-name="Container">
      <div aria-hidden className="absolute border-[rgba(255,105,0,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal h-[260px] leading-[26px] not-italic relative shrink-0 text-[16px] text-white w-[684px]" data-name="Paragraph">
      <p className="absolute left-0 top-[-15px] w-[680px]">{`Hi, am here to discuss about a more popular buzzword in the past decade – emotional intelligence. In fact, the concept of emotional intelligence has been around for at least 25 years now. Whether you know it as Emotional Quotient (EQ) or Emotional Intelligence (EI), it's a hot topic.`}</p>
      <p className="absolute left-0 top-[89px] w-[684px]">{`Emotional intelligence is the ability to understand and manage your own emotions, and those of the people around you. People with a high degree of emotional intelligence know what they're feeling, what their emotions mean, and how these emotions can affect other people.`}</p>
      <p className="absolute left-0 top-[206px] w-[933px]">{`For leaders, having emotional intelligence is essential for success. After all, who is more likely to succeed – a leader who shouts at his team when he's under stress, or a leader who stays in control, and calmly assesses the situation?`}</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[238_0_0] min-h-px relative w-[726px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[24px] pr-[39px] pt-[24px] relative size-full">
          <Paragraph />
        </div>
      </div>
    </div>
  );
}

function CreateCoursePage() {
  return (
    <div className="content-stretch flex flex-col h-[299px] items-start relative shrink-0 w-full" data-name="CreateCoursePage">
      <Container />
      <Container2 />
    </div>
  );
}

export default function Transcript() {
  return (
    <div className="bg-[rgba(30,41,57,0.95)] content-stretch flex flex-col items-start pr-[298px] pt-px relative size-full" data-name="Transcript">
      <div aria-hidden className="absolute border-[rgba(255,105,0,0.3)] border-solid border-t inset-0 pointer-events-none shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
      <CreateCoursePage />
    </div>
  );
}