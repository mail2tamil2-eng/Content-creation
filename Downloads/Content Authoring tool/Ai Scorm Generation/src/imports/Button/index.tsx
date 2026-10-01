import svgPaths from "./svg-k47kc3jgb";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d={svgPaths.p5641f40} id="Vector" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
          <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Upload audio or use text-to-speech</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] top-[-2px] whitespace-nowrap">Audio Settings</p>
        <Paragraph />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Icon />
        <Container1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-center justify-between px-[16px] relative size-full" data-name="Button">
      <Container />
      <Icon1 />
    </div>
  );
}