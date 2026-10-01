import svgPaths from "./svg-x81y0ix8lc";
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
type FrameProps = {
  className?: string;
  property1?: "hover" | "Variant3" | "Defult";
  showLayers?: boolean;
};

function Frame({ className, property1 = "Defult", showLayers = false }: FrameProps) {
  const isDefultOrVariant3 = ["Defult", "Variant3"].includes(property1);
  const isVariant3 = property1 === "Variant3";
  return (
    <button className={className || `relative rounded-[10px] w-[1156px] ${isDefultOrVariant3 ? "bg-white" : "bg-[#fbfbfb] drop-shadow-[0px_0px_1px_rgba(0,0,0,0.25)]"}`}>
      <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none rounded-[10px] ${isVariant3 ? "border-[#134780]" : "border-[#e5e7eb]"}`} />
      <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
        <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
          <div className="content-stretch flex gap-[12px] items-start relative size-full">
            <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
              {isDefultOrVariant3 && <RadioCheckbox className="relative shrink-0" selected={isVariant3 ? true : undefined} />}
              {property1 === "hover" && (
                <div className="relative shrink-0" data-name="Radio/checkbox">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center relative size-full">
                      <div className="bg-white relative rounded-[10px] shrink-0 size-[20px]" data-name="_Radio/checkbox core">
                        <div aria-hidden className="absolute border border-[#667085] border-solid inset-0 pointer-events-none rounded-[10px]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
              <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Enable Seek Bar</p>
              <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Show seek bar with configurable interaction options</p>
            </div>
          </div>
        </div>
        {showLayers && (
          <div className="relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start pl-[31px] py-[12px] relative size-full">
              <div className="bg-white h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
                <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
                    <div className="h-[20px] relative shrink-0 w-[178.688px]" data-name="Text">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-left whitespace-nowrap">Allow user to drag Seek Bar</p>
                      </div>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
type ContainerProps = {
  className?: string;
  property1?: "active" | "deault" | "Hover" | "Hide active" | "No autio";
  text?: string;
};

export default function Container({ className, property1 = "active", text = "Seek Bar Control" }: ContainerProps) {
  if (property1 === "Hide active") {
    return (
      <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=Hide active">
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
                            <path d={svgPaths.p140c1100} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M15 14.1667V7.5" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">Allow user to drag</p>
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
                  <Frame className="bg-white relative rounded-[10px] shrink-0 w-full" />
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" selected />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Hide Seek Bar Completely</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Seek bar will not be displayed in the player interface</p>
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
  if (property1 === "No autio") {
    return (
      <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=No autio">
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
                            <path d={svgPaths.p140c1100} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M15 14.1667V7.5" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">No audio - Seekbar will be hidden</p>
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
                <button className="bg-[#fffbeb] cursor-pointer h-[98.451px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
                  <div aria-hidden className="absolute border-[#fee685] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[10px]" />
                  <div className="content-stretch flex gap-[7.986px] items-start pb-[17.25px] pl-[17.242px] pr-[17.25px] pt-[17.242px] relative size-full">
                    <div className="relative shrink-0 size-[19.995px]" data-name="Icon">
                      <svg className="absolute block inset-0 size-full" fill="none" height="19.9948" preserveAspectRatio="none" viewBox="0 0 19.9948 19.9948" width="19.9948">
                        <g clipPath="url(#clip0_0_94)" id="Icon">
                          <path d={svgPaths.p3e8f6080} id="Vector" stroke="#E17100" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66623" />
                          <path d="M9.99739 6.66492V9.99739" id="Vector_2" stroke="#E17100" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66623" />
                          <path d="M9.99739 13.3298H10.0057" id="Vector_3" stroke="#E17100" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66623" />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_94">
                            <rect fill="white" height="19.9948" width="19.9948" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="h-[63.968px] relative shrink-0 w-[796.569px]" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-start relative size-full">
                        <div className="content-stretch flex h-[19.995px] items-start relative shrink-0 w-full" data-name="Paragraph">
                          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-w-px not-italic relative text-[#7b3306] text-[14px] text-left">No audio uploaded</p>
                        </div>
                        <div className="h-[39.99px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#bb4d00] text-[14px] text-left top-[-1px] w-[797px]">Seekbar will be automatically hidden for this slide since no audio file is uploaded. Upload slide audio in the Audio Settings section to enable seekbar controls.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
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
                            <path d={svgPaths.p140c1100} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M15 14.1667V7.5" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">No audio - Seekbar will be hidden</p>
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
                            <path d={svgPaths.p140c1100} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M15 14.1667V7.5" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">No audio - Seekbar will be hidden</p>
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
    <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=active">
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
                          <path d={svgPaths.p140c1100} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d="M15 14.1667V7.5" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                      </svg>
                    </div>
                    <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">{text}</p>
                        <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
                          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-left whitespace-nowrap">Allow user to drag</p>
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
                <Frame className="bg-white relative rounded-[10px] shrink-0 w-full z-[2]" property1="Variant3" showLayers />
                <button className="bg-white relative rounded-[10px] shrink-0 w-full z-[1]">
                  <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                  <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                    <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                      <div className="content-stretch flex gap-[12px] items-start relative size-full">
                        <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                          <RadioCheckbox className="relative shrink-0" />
                        </div>
                        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                          <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Hide Seek Bar Completely</p>
                          <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Seek bar will not be displayed in the player interface</p>
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