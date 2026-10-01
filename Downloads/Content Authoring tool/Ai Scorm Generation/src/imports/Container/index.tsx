import svgPaths from "./svg-wh9lvhhhjh";
type ContainerProps = {
  className?: string;
  property1?: "Default" | "1";
};

function Container({ className, property1 = "Default" }: ContainerProps) {
  const is1 = property1 === "1";
  const isDefault = property1 === "Default";
  return (
    <div className={className || `relative w-[1237px] ${isDefault ? "" : "h-[36px]"}`}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center relative size-full">
          {is1 && (
            <>
              <div className="relative shrink-0" data-name="Heading 1">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[22px] whitespace-nowrap">{`AI Course: Computer Science & IT`}</p>
                </div>
              </div>
              <button className="cursor-pointer relative rounded-[4px] shrink-0" data-name="Button">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[4px] relative size-full">
                  <div className="relative shrink-0 size-[16px]" data-name="Icon">
                    <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                      <g clipPath="url(#clip0_0_279)" id="Icon">
                        <path d={svgPaths.p1ba32a00} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </g>
                      <defs>
                        <clipPath id="clip0_0_279">
                          <rect fill="white" height="16" width="16" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </button>
            </>
          )}
          {isDefault && (
            <>
              <div className="flex-[1_0_0] h-[36px] min-w-px relative" data-name="Text Input">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip pb-[4px] relative rounded-[inherit] size-full">
                  <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[22px] w-full">{`AI Course: Computer Science & IT`}</p>
                </div>
                <div aria-hidden className="absolute border-[#c27aff] border-b-2 border-solid inset-0 pointer-events-none" />
              </div>
              <button className="bg-[#00a63e] cursor-pointer relative rounded-[10px] shrink-0" data-name="Button">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
                  <div className="relative shrink-0 size-[14px]" data-name="Icon">
                    <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
                      <g id="Icon">
                        <path d={svgPaths.p3de7e600} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      </g>
                    </svg>
                  </div>
                </div>
              </button>
              <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0" data-name="Button">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
                  <div className="relative shrink-0 size-[14px]" data-name="Icon">
                    <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
                      <g id="Icon">
                        <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[#313131] text-[14px] w-[1267px]">{`This AI-generated course on Computer Science & IT is designed for ASD. Learners will gain comprehensive knowledge through structured lessons, interactive activities, and assessments aligned with the course objectives.`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21px] pt-[25px] px-[25px] relative size-full">
        <Container className="h-[36px] relative shrink-0 w-[1237px]" property1="1" />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p1c949200} id="Vector" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pd12ce00} id="Vector_2" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p226ad00} id="Vector_3" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e9aa900} id="Vector_4" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12fdd280} id="Vector_5" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3be7b040} id="Vector_6" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] text-left whitespace-nowrap">Basics of Computer Science</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[1044px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[2px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#313131] text-[12px] text-left whitespace-nowrap">Explore basics of computer science in depth through structured lessons and activities.</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1045.531_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_279)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_279">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="cursor-pointer relative rounded-[4px] shrink-0" role="button" tabIndex="0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_355)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_355">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="cursor-pointer relative rounded-[4px] shrink-0" role="button" tabIndex="0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute flex items-center justify-center left-0 size-[16px] top-0">
      <div className="flex-none rotate-180">
        <div className="relative size-[16px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
            <g id="Icon">
              <path d="M4 6L8 10L12 6" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconTransform() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon:transform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <IconTransform />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <button className="cursor-pointer relative shrink-0 w-[1315px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[16px] relative size-full">
        <Icon />
        <Container5 />
        <Container6 />
      </div>
    </button>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Introduction to Fundamentals Overview</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Icon">
          <path d={svgPaths.p126ce980} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Button">
      <Icon5 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center whitespace-nowrap">Preview</p>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Button4 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1111.234_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph3 />
        <ButtonMargin />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Text">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[9px] py-[3px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Page</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container9 />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Introduction to Fundamentals 1</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Icon">
          <path d={svgPaths.p126ce980} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Button">
      <Icon6 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center whitespace-nowrap">Preview</p>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Button5 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1112.828_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph4 />
        <ButtonMargin1 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Text">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[9px] py-[3px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Page</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container12 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Introduction to Fundamentals 2</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Icon">
          <path d={svgPaths.p126ce980} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Button">
      <Icon7 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center whitespace-nowrap">Preview</p>
    </div>
  );
}

function ButtonMargin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Button6 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1112.828_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph5 />
        <ButtonMargin2 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Text">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[9px] py-[3px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Page</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container15 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px relative size-full">
        <Container14 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Recap / Summary</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Icon">
          <path d={svgPaths.p126ce980} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Button">
      <Icon8 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center whitespace-nowrap">Preview</p>
    </div>
  );
}

function ButtonMargin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Button7 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1074.844_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph6 />
        <ButtonMargin3 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Text">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[9px] py-[3px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Page</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container18 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Knowledge Check</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1086.844_0_0] h-[38px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center relative size-full">
        <Paragraph7 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Text">
      <div aria-hidden className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] whitespace-nowrap">3 Qs</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Text">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[9px] py-[3px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Quiz</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Container20 />
          <Text4 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-px relative size-full">
        <div className="relative shrink-0 w-[1315px]" data-name="Container">
          <div aria-hidden className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px relative size-full">
            <Container8 />
          </div>
        </div>
        <Container10 />
        <Container13 />
        <Container16 />
        <Container19 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p1c949200} id="Vector" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pd12ce00} id="Vector_2" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p226ad00} id="Vector_3" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e9aa900} id="Vector_4" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12fdd280} id="Vector_5" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3be7b040} id="Vector_6" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Section 2: Topic 2</p>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[1044px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[2px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#313131] text-[12px] whitespace-nowrap">Explore Topic 2 in depth through structured lessons and activities.</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1045.531_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_279)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_279">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_355)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_355">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button8 />
        <Button9 />
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-[1315px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[16px] relative size-full">
        <Icon9 />
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-white h-[71.25px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container22 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p1c949200} id="Vector" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pd12ce00} id="Vector_2" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p226ad00} id="Vector_3" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e9aa900} id="Vector_4" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12fdd280} id="Vector_5" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3be7b040} id="Vector_6" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Section 3: Topic 3</p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[1044px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[2px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#313131] text-[12px] whitespace-nowrap">Explore Topic 3 in depth through structured lessons and activities.</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1045.531_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_279)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_279">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_355)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_355">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button12 />
        <Button13 />
        <Button14 />
        <Button15 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-[1315px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[16px] relative size-full">
        <Icon14 />
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-white h-[71.25px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container26 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p1c949200} id="Vector" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pd12ce00} id="Vector_2" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p226ad00} id="Vector_3" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e9aa900} id="Vector_4" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12fdd280} id="Vector_5" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3be7b040} id="Vector_6" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Section 4: Topic 4</p>
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[18px] relative shrink-0 w-[1044px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[2px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#313131] text-[12px] whitespace-nowrap">Explore Topic 4 in depth through structured lessons and activities.</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1045.531_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph12 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_279)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_279">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_355)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_355">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button16 />
        <Button17 />
        <Button18 />
        <Button19 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-[1315px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[16px] relative size-full">
        <Icon19 />
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-white h-[71.25px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container30 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Container29 />
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p1c949200} id="Vector" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pd12ce00} id="Vector_2" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p226ad00} id="Vector_3" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e9aa900} id="Vector_4" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12fdd280} id="Vector_5" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3be7b040} id="Vector_6" stroke="#D1D5DC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Section 5: Topic 5</p>
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[18px] relative shrink-0 w-[1044px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[2px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#313131] text-[12px] whitespace-nowrap">Explore Topic 5 in depth through structured lessons and activities.</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1045.531_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_279)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_279">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_355)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_355">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[6px] relative size-full">
        <Icon28 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button20 />
        <Button21 />
        <Button22 />
        <Button23 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-[1315px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[16px] relative size-full">
        <Icon24 />
        <Container35 />
        <Container36 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-white h-[71.25px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container34 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Container33 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="Icon">
          <path d={svgPaths.p17be4200} id="Vector" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2e020400} id="Vector_2" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 6.41667H9.33333" id="Vector_3" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 9.33333H9.33333" id="Vector_4" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 6.41667H4.6725" id="Vector_5" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 9.33333H4.6725" id="Vector_6" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[28px]" data-name="Container">
      <Icon29 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-[1109.766_0_0] flex-col items-start min-w-px relative" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1c398e] text-[14px] whitespace-nowrap">Final Exam / Quiz</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-white border border-[#bedbff] border-solid content-stretch flex flex-col items-start px-[10px] py-[2px] relative rounded-[33554400px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#155dfc] text-[12px] whitespace-nowrap">10 Questions</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex gap-[12px] items-center px-[16px] py-[14px] relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-white border border-[#bedbff] border-solid content-stretch flex flex-col h-[58px] items-start overflow-clip relative rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <Container38 />
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_327)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_327">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[2px] py-[18px] relative rounded-[14px] shrink-0 w-[1317px]" data-name="Button">
      <div aria-hidden className="absolute border-2 border-[#d1d5dc] border-dashed inset-0 pointer-events-none rounded-[14px]" />
      <Icon30 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">Create New Topic with AI</p>
    </div>
  );
}

function ButtonMargin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[16px] relative size-full">
        <Button24 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-[1317px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <div className="bg-white relative rounded-[14px] shrink-0 w-[1317px]" data-name="Container">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative size-full">
              <Container4 />
              <Container7 />
            </div>
          </div>
          <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
        </div>
        <ContainerMargin />
        <ContainerMargin1 />
        <ContainerMargin2 />
        <ContainerMargin3 />
        <ContainerMargin4 />
        <ButtonMargin4 />
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button25() {
  return (
    <button className="bg-[#f3f4f6] cursor-pointer relative rounded-[10px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
        <Icon31 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Back</p>
      </div>
    </button>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_309)" id="Icon">
          <path d={svgPaths.p874e300} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_309">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="bg-gradient-to-r from-[#9810fa] relative rounded-[10px] shrink-0 to-[#4f39f6]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[28px] py-[10px] relative size-full">
        <Icon32 />
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Publish</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[82px] relative shrink-0 w-[1317px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[16px] pt-[24px] relative size-full">
        <Button25 />
        <Button26 />
      </div>
    </div>
  );
}

export default function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative size-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container40 />
    </div>
  );
}