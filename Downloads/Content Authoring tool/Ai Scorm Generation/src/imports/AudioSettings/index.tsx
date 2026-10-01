import svgPaths from "./svg-k8xpallzrb";
type RadioCheckboxCoreProps = {
  className?: string;
  indeterminate?: "no";
  selected?: boolean;
  state?: "Rest";
  type?: "Radio";
};

function RadioCheckboxCore({ className, indeterminate = "no", selected = false, state = "Rest", type = "Radio" }: RadioCheckboxCoreProps) {
  const isRadioAndRestAndSelectedAndNo = type === "Radio" && state === "Rest" && selected && indeterminate === "no";
  return (
    <div className={className || `relative rounded-[10px] size-[20px] ${isRadioAndRestAndSelectedAndNo ? "bg-[#eafef1]" : "bg-white overflow-clip"}`}>
      <div aria-hidden={type === "Radio" && state === "Rest" && !selected && indeterminate === "no" ? true : undefined} className={isRadioAndRestAndSelectedAndNo ? "overflow-clip relative rounded-[inherit] size-full" : "absolute border border-[#667085] border-solid inset-0 pointer-events-none rounded-[10px]"}>
        {isRadioAndRestAndSelectedAndNo && (
          <div className="absolute inset-[30%]" data-name="Check">
            <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
              <circle cx="4" cy="4" fill="#026E78" id="Check" r="4" />
            </svg>
          </div>
        )}
      </div>
      {isRadioAndRestAndSelectedAndNo && <div aria-hidden className="absolute border border-[#038c8c] border-solid inset-0 pointer-events-none rounded-[10px]" />}
    </div>
  );
}
type RadioCheckboxProps = {
  className?: string;
  indeterminate?: "no";
  selected?: boolean;
  state?: "Rest";
  subText?: string;
  supportingText?: boolean;
  text?: boolean;
  titleTxet?: string;
  type?: "Radio";
};

function RadioCheckbox({ className, indeterminate = "no", selected = false, state = "Rest", subText = "Save my login details for next time.", supportingText = false, text = false, titleTxet = "Remember me", type = "Radio" }: RadioCheckboxProps) {
  const isRadioAndRestAndNoAndNotTextAndNotSupportingText = type === "Radio" && state === "Rest" && indeterminate === "no" && !text && !supportingText;
  const isRadioAndRestAndNoAndTextAndSupportingText = type === "Radio" && state === "Rest" && indeterminate === "no" && text && supportingText;
  const isRadioAndRestAndNotSelectedAndNoAndTextAndSupportingText = type === "Radio" && state === "Rest" && !selected && indeterminate === "no" && text && supportingText;
  const isRadioAndRestAndSelectedAndNoAndTextAndSupportingText = type === "Radio" && state === "Rest" && selected && indeterminate === "no" && text && supportingText;
  return (
    <div className={className || `relative ${isRadioAndRestAndNoAndNotTextAndNotSupportingText ? "" : "w-[344px]"}`}>
      <div className={`flex size-full ${isRadioAndRestAndNoAndNotTextAndNotSupportingText ? "flex-row items-center justify-center" : "content-stretch gap-[12px] items-start relative"}`}>
        {isRadioAndRestAndNoAndTextAndSupportingText && (
          <>
            <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
              <div className="relative shrink-0" data-name="Radio/checkbox">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center relative size-full">
                    <div className="bg-white relative rounded-[10px] shrink-0 size-[20px]" data-name="_Radio/checkbox core">
                      <div aria-hidden={isRadioAndRestAndNotSelectedAndNoAndTextAndSupportingText ? true : undefined} className={isRadioAndRestAndNotSelectedAndNoAndTextAndSupportingText ? "absolute border border-[#667085] border-solid inset-0 pointer-events-none rounded-[10px]" : "overflow-clip relative rounded-[inherit] size-full"}>
                        {isRadioAndRestAndSelectedAndNoAndTextAndSupportingText && (
                          <div className="absolute inset-[30%]" data-name="Check">
                            <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
                              <circle cx="4" cy="4" fill="#093260" id="Check" r="4" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {isRadioAndRestAndSelectedAndNoAndTextAndSupportingText && <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[10px]" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative text-[14px]" data-name="Text and supporting text">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#101828] w-full">{titleTxet}</p>
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#4a5565] w-full">{subText}</p>
            </div>
          </>
        )}
        {isRadioAndRestAndNoAndNotTextAndNotSupportingText && (
          <div className="content-stretch flex items-center justify-center relative size-full">
            {type === "Radio" && state === "Rest" && selected && indeterminate === "no" && !text && !supportingText && (
              <div className="bg-white relative rounded-[10px] shrink-0 size-[20px]" data-name="_Radio/checkbox core">
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute inset-[30%]" data-name="Check">
                    <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
                      <circle cx="4" cy="4" fill="#093260" id="Check" r="4" />
                    </svg>
                  </div>
                </div>
                <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[10px]" />
              </div>
            )}
            {type === "Radio" && state === "Rest" && !selected && indeterminate === "no" && !text && !supportingText && <RadioCheckboxCore className="bg-white relative rounded-[10px] shrink-0 size-[20px]" />}
          </div>
        )}
      </div>
    </div>
  );
}
type ButtonProps = {
  className?: string;
  property1?: "hover" | "active" | "deafult";
  text?: string;
};

function Button({ className, property1 = "hover", text = "Fade" }: ButtonProps) {
  if (property1 === "deafult") {
    return (
      <div className={className || "h-[36px] relative w-[178px]"} data-name="Property 1=deafult">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.3px]">{text}</p>
          </div>
        </div>
      </div>
    );
  }
  if (property1 === "active") {
    return (
      <button className={className || "bg-[#134780] cursor-pointer h-[36px] relative w-[178px]"} data-name="Property 1=active">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[12px] text-left text-white tracking-[0.3px]">{text}</p>
          </div>
        </div>
      </button>
    );
  }
  return (
    <div className={className || "bg-[#f4f9ff] h-[36px] relative w-[178px]"} data-name="Property 1=hover">
      <div aria-hidden className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.3px]">{text}</p>
        </div>
      </div>
    </div>
  );
}
type DropdownProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Dropdown({ className, property1 = "Default" }: DropdownProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className || "bg-[#f4f9ff] cursor-pointer relative rounded-[10px] w-[717.55px]"} data-name="Property 1=Variant2">
        <div aria-hidden className="absolute border-[#bedbff] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="Text">
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Female</p>
          </div>
          <div className="relative shrink-0 size-[16px]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
              <g id="Icon">
                <path d="M4 6L8 10L12 6" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </g>
            </svg>
          </div>
        </div>
      </button>
    );
  }
  if (property1 === "Variant3") {
    return (
      <button className={className || "cursor-pointer relative rounded-[10px] w-[717.55px]"} data-name="Property 1=Variant3">
        <div aria-hidden className="absolute border-[#bedbff] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="Text">
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Female</p>
          </div>
          <div className="relative shrink-0 size-[16px]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
              <g id="Icon">
                <path d="M4 6L8 10L12 6" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </g>
            </svg>
          </div>
          <div className="absolute bg-white content-stretch drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col isolate items-start left-0 p-px rounded-[10px] top-[48px] w-[717.55px]" data-name="Container">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <Button className="h-[36px] relative shrink-0 w-[178px] z-[2]" property1="deafult" text="Male" />
            <Button className="bg-[#134780] cursor-pointer h-[36px] relative rounded-[5px] shrink-0 w-[717.55px] z-[1]" property1="active" text="Female" />
          </div>
        </div>
      </button>
    );
  }
  return (
    <div className={className || "bg-white relative rounded-[10px] w-[717.55px]"} data-name="Property 1=Default">
      <div aria-hidden className="absolute border-[#d1d5dc] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
        <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="Text">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] whitespace-nowrap">Female</p>
        </div>
        <div className="relative shrink-0 size-[16px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
            <g id="Icon">
              <path d="M4 6L8 10L12 6" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
type ComponentProps = {
  className?: string;
  property1?: "activr" | "hover" | "default";
};

function Component({ className, property1 = "default" }: ComponentProps) {
  if (property1 === "hover") {
    return (
      <button className={className || "bg-[#f4f9ff] cursor-pointer relative rounded-[10px] w-[912px]"} data-name="Property 1=hover">
        <div aria-hidden className="absolute border border-[#bedbff] border-dashed inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[12px] relative size-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]" data-name="Icon">
                <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                  <g id="Icon">
                    <path d={svgPaths.p23ad1400} id="Vector" stroke="#134780" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d={svgPaths.p26e09a00} id="Vector_2" stroke="#134780" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M8 2V10" id="Vector_3" stroke="#134780" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </g>
                </svg>
              </div>
              <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#134780] text-[14px] text-left whitespace-nowrap">Upload Audio</p>
            </div>
          </div>
        </div>
      </button>
    );
  }
  if (property1 === "activr") {
    return (
      <div className={className || "bg-gradient-to-r from-[#f0fdf4] h-[46px] relative rounded-[10px] to-[#ecfdf5] w-[912px]"} data-name="Property 1=activr">
        <div aria-hidden className="absolute border border-[#7bf1a8] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
            <div className="h-[20px] relative shrink-0 w-[322.266px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
                <div className="relative shrink-0 size-[16px]" data-name="Icon">
                  <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                    <g id="Icon">
                      <path d={svgPaths.p18ef1500} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M8 12V1.33333L12.6667 4" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <div className="flex-[1_0_0] h-[20px] min-w-px relative" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
                    <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">freesound_community-mouse-clicks-6849.mp3</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="cursor-pointer relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
                <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                  <div className="absolute inset-1/4" data-name="Vector">
                    <div className="absolute inset-[-8.33%]">
                      <svg className="block size-full" fill="none" height="9.33333" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" width="9.33333">
                        <path d={svgPaths.p48af40} id="Vector" stroke="#E7000B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-1/4" data-name="Vector">
                    <div className="absolute inset-[-8.33%]">
                      <svg className="block size-full" fill="none" height="9.33333" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" width="9.33333">
                        <path d={svgPaths.p30908200} id="Vector" stroke="#E7000B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={className || "relative rounded-[10px] w-[912px]"} data-name="Property 1=default">
      <div aria-hidden className="absolute border border-[#d1d5dc] border-dashed inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[12px] relative size-full">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]" data-name="Icon">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                <g id="Icon">
                  <path d={svgPaths.p23ad1400} id="Vector" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.p26e09a00} id="Vector_2" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M8 2V10" id="Vector_3" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </g>
              </svg>
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Upload Audio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
type AudioSettingsProps = {
  className?: string;
  property1?: "SA" | "deault" | "Hover" | "TTP" | "no audio" | "no select";
  subText?: string;
  text?: string;
};

export default function AudioSettings({ className, property1 = "SA", subText = "Upload audio or use text-to-speech", text = "Audio Settings" }: AudioSettingsProps) {
  if (property1 === "TTP") {
    return (
      <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=TTP">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <button className="bg-[#f9fafb] cursor-pointer h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p5641f40} id="Vector" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">{subText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-180">
                      <div className="relative size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div className="bg-white relative shrink-0 w-full" data-name="Container">
              <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
              <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
                <div className="content-stretch cursor-pointer flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="CreateCoursePage">
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">{`Slide Audio `}</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Upload MP3 audio for this slide</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" selected />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Text-to-Speech</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Generate audio from text transcript</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full">
                        <div className="flex flex-col items-end justify-end size-full">
                          <div className="content-stretch flex flex-col gap-[12px] isolate items-end justify-end pl-[33px] pt-[8px] relative size-full">
                            <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full z-[2]" data-name="Container">
                              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3.984px] h-[57.188px] items-start min-w-px relative" data-name="Container">
                                <div className="content-stretch flex h-[15.977px] items-start relative shrink-0 w-full" data-name="Label">
                                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px] text-left">Voice Type</p>
                                </div>
                                <Dropdown className="bg-white relative rounded-[10px] shrink-0 w-full" />
                              </div>
                              <div className="bg-[#e5e7eb] h-[35.977px] relative rounded-[10px] shrink-0 w-[105.449px]" data-name="Button">
                                <div className="absolute left-[16px] size-[15.996px] top-[9.98px]" data-name="Icon">
                                  <svg className="absolute block inset-0 size-full" fill="none" height="15.9961" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961" width="15.9961">
                                    <g id="Icon">
                                      <path d={svgPaths.p20117f80} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
                                    </g>
                                  </svg>
                                </div>
                                <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[64.98px] not-italic text-[#99a1af] text-[14px] text-center top-[6.99px] whitespace-nowrap">Preview</p>
                              </div>
                            </div>
                            <div className="content-stretch flex flex-col gap-[9.219px] h-[153.184px] items-start relative shrink-0 w-full z-[1]" data-name="Container">
                              <div className="cursor-pointer h-[128px] relative rounded-[10px] shrink-0 w-[835px]" role="button" tabIndex="0" data-name="Text Area">
                                <div className="content-stretch flex items-start overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
                                  <div className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(10,10,10,0.5)] text-left whitespace-nowrap">
                                    <p className="leading-[20px] mb-0 whitespace-pre">Enter transcript text for Key Concepts...</p>
                                    <p className="leading-[20px] mb-0 whitespace-pre">​</p>
                                    <p className="leading-[20px] mb-0 whitespace-pre">Example:</p>
                                    <p className="leading-[20px] whitespace-pre">{`Welcome to the Key Concepts section. In this part of the course, we'll explore...`}</p>
                                  </div>
                                </div>
                                <div aria-hidden className="absolute border-[#d1d5dc] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[10px]" />
                              </div>
                              <div className="content-stretch flex h-[15.977px] items-start relative shrink-0 w-full" data-name="Paragraph">
                                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-left">0 characters</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">No Audio</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">This slide will have no audio</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  if (property1 === "no audio") {
    return (
      <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=no audio">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <button className="bg-[#f9fafb] cursor-pointer h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p5641f40} id="Vector" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">{subText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-180">
                      <div className="relative size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div className="bg-white relative shrink-0 w-full" data-name="Container">
              <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
              <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
                <div className="content-stretch cursor-pointer flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="CreateCoursePage">
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">{`Slide Audio `}</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Upload MP3 audio for this slide</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Text-to-Speech</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Generate audio from text transcript</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" selected />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">No Audio</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">This slide will have no audio</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  if (property1 === "no select") {
    return (
      <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=no select">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <button className="bg-[#f9fafb] cursor-pointer h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p5641f40} id="Vector" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">{subText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-180">
                      <div className="relative size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div className="bg-white relative shrink-0 w-full" data-name="Container">
              <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
              <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
                <div className="content-stretch cursor-pointer flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="CreateCoursePage">
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">{`Slide Audio `}</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Upload MP3 audio for this slide</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Text-to-Speech</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Generate audio from text transcript</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">No Audio</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">This slide will have no audio</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  if (property1 === "deault") {
    return (
      <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=deault">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <div className="bg-[#f9fafb] h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p5641f40} id="Vector" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">{subText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-name="Icon">
                    <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                      <g id="Icon">
                        <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  if (property1 === "Hover") {
    return (
      <button className={className || "cursor-pointer relative rounded-[10px] w-[946px]"} data-name="Property 1=Hover">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <div className="bg-[#f9fafb] h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p5641f40} id="Vector" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">{subText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[20px]" data-name="Icon">
                    <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                      <g id="Icon">
                        <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#b7b7b7] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </button>
    );
  }
  return (
    <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=SA">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <button className="bg-[#f9fafb] cursor-pointer h-[64px] relative shrink-0 w-full" data-name="Button">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                    <div className="relative shrink-0 size-[20px]" data-name="Icon">
                      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                        <g id="Icon">
                          <path d={svgPaths.p5641f40} id="Vector" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          <path d="M10 15V1.66667L15.8333 5" id="Vector_2" stroke="#1963FD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        </g>
                      </svg>
                    </div>
                    <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                        <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">{subText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-180">
                    <div className="relative size-[20px]" data-name="Icon">
                      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                        <g id="Icon">
                          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <div className="bg-white relative shrink-0 w-full" data-name="Container">
            <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
            <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
              <div className="content-stretch cursor-pointer flex flex-col gap-[12px] isolate items-start relative shrink-0 w-full" data-name="CreateCoursePage">
                <button className="bg-white relative rounded-[10px] shrink-0 w-full z-[3]">
                  <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[10px]" />
                  <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                    <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                      <div className="content-stretch flex gap-[12px] items-start relative size-full">
                        <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                          <RadioCheckbox className="relative shrink-0" selected />
                        </div>
                        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                          <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">{`Slide Audio `}</p>
                          <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Upload MP3 audio for this slide</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative shrink-0 w-full" data-name="Container">
                      <div className="flex flex-row items-center justify-end size-full">
                        <div className="content-stretch flex items-center justify-end pl-[31px] pt-[8px] relative size-full">
                          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                            <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px relative" data-name="Container">
                              <Component className="relative rounded-[10px] shrink-0 w-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <button className="bg-white relative rounded-[10px] shrink-0 w-full z-[2]">
                  <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                  <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                    <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                      <div className="content-stretch flex gap-[12px] items-start relative size-full">
                        <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                          <RadioCheckbox className="relative shrink-0" />
                        </div>
                        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                          <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Text-to-Speech</p>
                          <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Generate audio from text transcript</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <button className="bg-white relative rounded-[10px] shrink-0 w-full z-[1]">
                  <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                  <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                    <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                      <div className="content-stretch flex gap-[12px] items-start relative size-full">
                        <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                          <RadioCheckbox className="relative shrink-0" />
                        </div>
                        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                          <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">No Audio</p>
                          <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">This slide will have no audio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}