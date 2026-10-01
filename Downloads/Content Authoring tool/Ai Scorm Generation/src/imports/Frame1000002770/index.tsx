import svgPaths from "./svg-tt045wtr6c";
import imgImage7 from "./98fefcc888520c02011087148dfd86e458b2cad2.png";
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
type Frame5Props = {
  className?: string;
  property1?: "hover" | "Variant3" | "Defult";
  showLayers?: boolean;
};

function Frame5({ className, property1 = "Defult", showLayers = false }: Frame5Props) {
  const isVariant3 = property1 === "Variant3";
  return (
    <button className={className || `relative rounded-[10px] w-[1156px] ${["Defult", "Variant3"].includes(property1) ? "bg-white" : "bg-[#fbfbfb] drop-shadow-[0px_0px_1px_rgba(0,0,0,0.25)]"}`}>
      <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none rounded-[10px] ${isVariant3 ? "border-[#134780]" : "border-[#e5e7eb]"}`} />
      <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
        <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
          <div className="content-stretch flex gap-[12px] items-start relative size-full">
            <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
              <RadioCheckbox className="relative shrink-0" selected={isVariant3 ? true : undefined} />
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

function Container({ className, property1 = "active", text = "Seek Bar Control" }: ContainerProps) {
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
                  <Frame5 className="bg-white relative rounded-[10px] shrink-0 w-full" />
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
                        <g clipPath="url(#clip0_0_477)" id="Icon">
                          <path d={svgPaths.p3e8f6080} id="Vector" stroke="#E17100" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66623" />
                          <path d="M9.99739 6.66492V9.99739" id="Vector_2" stroke="#E17100" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66623" />
                          <path d="M9.99739 13.3298H10.0057" id="Vector_3" stroke="#E17100" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66623" />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_477">
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
                <Frame5 className="bg-white relative rounded-[10px] shrink-0 w-full z-[2]" property1="Variant3" showLayers />
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
type ButtonProps = {
  className?: string;
  property1?: "default" | "HOVER";
  text?: string;
};

function Button({ className, property1 = "default", text = "Wipe Right" }: ButtonProps) {
  const isDefault = property1 === "default";
  return (
    <div className={className || "h-[44px] relative w-[180px]"}>
      <div className={`content-stretch flex flex-col items-start relative size-full ${isDefault ? "isolate" : ""}`}>
        <div className={`h-[44px] relative rounded-[10px] shrink-0 w-full ${isDefault ? "bg-white z-[1]" : "bg-[#f4f9ff]"}`} data-name="Button">
          <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none rounded-[10px] ${isDefault ? "border-[#d1d5dc]" : "border-[#bedbff]"}`} />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
              <div className="h-[20px] relative shrink-0" data-name="Text">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] whitespace-nowrap">{text}</p>
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
  );
}
type Button1Props = {
  className?: string;
  property1?: "hover" | "active" | "deafult";
  text?: string;
};

function Button1({ className, property1 = "hover", text = "Fade" }: Button1Props) {
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
type Button2Props = {
  className?: string;
  property1?: "SELECTED" | "default" | "HOVER" | "Variant4";
};

function Button2({ className, property1 = "default" }: Button2Props) {
  if (property1 === "SELECTED") {
    return (
      <div className={className || "h-[126px] relative w-[451px]"} data-name="Property 1=SELECTED">
        <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full">
          <button className="bg-white cursor-pointer h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
            <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
                <div className="h-[20px] relative shrink-0" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                    <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Use Audio Duration</p>
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
          </button>
          <div className="absolute bg-white content-stretch drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col isolate items-start left-0 p-px rounded-[10px] top-[48px] w-[451px]" data-name="Container">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <Button1 className="cursor-pointer h-[36px] relative shrink-0 w-full z-[2]" property1="deafult" text="Use Audio Duration" />
            <Button1 className="cursor-pointer h-[36px] relative shrink-0 w-full z-[1]" property1="deafult" text="Manual Duration" />
          </div>
        </div>
      </div>
    );
  }
  if (property1 === "Variant4") {
    return (
      <button className={className || "cursor-pointer h-[44px] relative w-[451px]"} data-name="Property 1=Variant4">
        <div className="content-stretch flex flex-col gap-[4px] isolate items-start relative size-full">
          <div className="bg-white h-[44px] relative rounded-[10px] shrink-0 w-full z-[2]" data-name="Button">
            <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
                <div className="h-[20px] relative shrink-0" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                    <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Manual Duration</p>
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
          <div className="content-stretch flex flex-col isolate items-start relative rounded-[10px] shrink-0 w-[451px] z-[1]" data-name="Container">
            <div className="bg-white cursor-pointer h-[44px] relative rounded-[10px] shrink-0 w-full z-[1]" role="button" tabIndex="0" data-name="Button">
              <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
                  <div className="h-[20px] relative shrink-0" data-name="Text">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Enter mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  }
  if (property1 === "HOVER") {
    return (
      <div className={className || "h-[44px] relative w-[451px]"} data-name="Property 1=HOVER">
        <div className="content-stretch flex flex-col items-start relative size-full">
          <button className="bg-[#f4f9ff] cursor-pointer h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
            <div aria-hidden className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
                <div className="h-[20px] relative shrink-0" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                    <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Use Audio Duration</p>
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
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={className || "h-[44px] relative w-[451px]"} data-name="Property 1=default">
      <div className="content-stretch flex flex-col isolate items-start relative size-full">
        <div className="bg-white h-[44px] relative rounded-[10px] shrink-0 w-full z-[1]" data-name="Button">
          <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
              <div className="h-[20px] relative shrink-0" data-name="Text">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] whitespace-nowrap">Use Audio Duration</p>
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
  );
}
type SlideSettingsProps = {
  className?: string;
  property1?: "deault" | "Hover" | "New";
  subText?: string;
  text?: string;
};

function SlideSettings({ className, property1 = "New", subText = "Transition effects and timing", text = "Slide Settings" }: SlideSettingsProps) {
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
                          <g clipPath="url(#clip0_0_502)" id="Icon">
                            <path d={svgPaths.p24941500} id="Vector" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M18.3333 4.16667H15" id="Vector_3" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M4.16667 15H2.5" id="Vector_5" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_502">
                              <rect fill="white" height="20" width="20" />
                            </clipPath>
                          </defs>
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
                          <g clipPath="url(#clip0_0_502)" id="Icon">
                            <path d={svgPaths.p24941500} id="Vector" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M18.3333 4.16667H15" id="Vector_3" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M4.16667 15H2.5" id="Vector_5" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_502">
                              <rect fill="white" height="20" width="20" />
                            </clipPath>
                          </defs>
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
    <div className={className || "relative rounded-[10px] w-[946px]"} data-name="Property 1=New">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start p-px relative size-full">
        <button className="bg-[#f9fafb] cursor-pointer h-[64px] relative shrink-0 w-full" data-name="Button">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
              <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                  <div className="relative shrink-0 size-[20px]" data-name="Icon">
                    <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                      <g clipPath="url(#clip0_0_502)" id="Icon">
                        <path d={svgPaths.p24941500} id="Vector" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M18.3333 4.16667H15" id="Vector_3" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M4.16667 15H2.5" id="Vector_5" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                      </g>
                      <defs>
                        <clipPath id="clip0_0_502">
                          <rect fill="white" height="20" width="20" />
                        </clipPath>
                      </defs>
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
        <div className="bg-white h-[152px] relative shrink-0 w-full" data-name="Container">
          <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
          <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] isolate items-start min-h-px relative w-full" data-name="CreateCoursePage">
              <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[451px] z-[2]" data-name="drop">
                <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Label">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.3px] uppercase">Duration</p>
                </div>
                <Button2 className="h-[96px] relative shrink-0 w-full" />
              </div>
              <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-[451px] z-[1]" data-name="Efftect">
                <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Label">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.3px] uppercase">Transition Effect</p>
                </div>
                <Button className="h-[44px] relative shrink-0 w-full" />
                <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Global setting: None</p>
              </div>
            </div>
          </div>
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
            <Button1 className="h-[36px] relative shrink-0 w-[178px] z-[2]" property1="deafult" text="Male" />
            <Button1 className="bg-[#134780] cursor-pointer h-[36px] relative rounded-[5px] shrink-0 w-[717.55px] z-[1]" property1="active" text="Female" />
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

function AudioSettings({ className, property1 = "SA", subText = "Upload audio or use text-to-speech", text = "Audio Settings" }: AudioSettingsProps) {
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
type Button3Props = {
  className?: string;
  property1?: "Default" | "Variant3";
};

function Button3({ className, property1 = "Default" }: Button3Props) {
  const isVariant3 = property1 === "Variant3";
  return (
    <div className={className || `relative rounded-[10px] size-[36px] ${isVariant3 ? "bg-[#ffeded]" : ""}`}>
      <div className="content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
          <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
            <div className="absolute inset-[-0.83px_-5.56%]">
              <svg className="block size-full" fill="none" height="1.66667" preserveAspectRatio="none" viewBox="0 0 16.6667 1.66667" width="16.6667">
                <path d="M0.833333 0.833333H15.8333" id="Vector" stroke={isVariant3 ? "#E7000B" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
            <div className="absolute inset-[-6.25%_-7.14%]">
              <svg className="block size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 13.3333 15" width="13.3333">
                <path d={svgPaths.p35bdd700} id="Vector" stroke={isVariant3 ? "#E7000B" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
            <div className="absolute inset-[-25%_-12.5%]">
              <svg className="block size-full" fill="none" height="5" preserveAspectRatio="none" viewBox="0 0 8.33333 5" width="8.33333">
                <path d={svgPaths.p18bd6f80} id="Vector" stroke={isVariant3 ? "#E7000B" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
            <div className="absolute inset-[-16.67%_-0.83px]">
              <svg className="block size-full" fill="none" height="6.66667" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667" width="1.66667">
                <path d="M0.833333 0.833333V5.83333" id="Vector" stroke={isVariant3 ? "#E7000B" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
            <div className="absolute inset-[-16.67%_-0.83px]">
              <svg className="block size-full" fill="none" height="6.66667" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667" width="1.66667">
                <path d="M0.833333 0.833333V5.83333" id="Vector" stroke={isVariant3 ? "#E7000B" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
        </div>
        {isVariant3 && (
          <div className="-translate-x-1/2 absolute bg-[rgba(0,0,0,0.8)] content-stretch flex h-[30px] items-center justify-center left-1/2 overflow-clip p-[10px] rounded-[5px] top-[40px]">
            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[32px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Delete Slide</p>
          </div>
        )}
      </div>
    </div>
  );
}
type Button4Props = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Button4({ className, property1 = "Default" }: Button4Props) {
  const isVariant2 = property1 === "Variant2";
  return (
    <div className={className || `relative rounded-[10px] size-[28px] ${isVariant2 ? "bg-[#eff5fb]" : ""}`}>
      <div className="content-stretch flex flex-col items-start pt-[6px] px-[6px] relative size-full">
        <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
          <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
            <div className="absolute inset-[-5%]">
              <svg className="block size-full" fill="none" height="14.6664" preserveAspectRatio="none" viewBox="0 0 14.6665 14.6664" width="14.6665">
                <path d={svgPaths.p4290a20} id="Vector" stroke={isVariant2 ? "#134780" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type Container1Props = {
  className?: string;
  property1?: "Default" | "ACTVE";
  text?: string;
};

function Container1({ className, property1 = "Default", text = "Introduction" }: Container1Props) {
  const isActve = property1 === "ACTVE";
  return (
    <div className={className || `relative ${isActve ? "h-[40px]" : "h-[28px]"}`}>
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex items-center relative size-full ${isActve ? "gap-[8px]" : ""}`}>
          {property1 === "Default" && (
            <div className="relative shrink-0 w-[133px]" data-name="Text">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center justify-center relative size-full">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-px not-italic relative text-[#101828] text-[16px]">{text}</p>
                <Button4 className="cursor-pointer relative rounded-[10px] shrink-0 size-[28px]" />
              </div>
            </div>
          )}
          {isActve && (
            <>
              <div className="h-[40px] relative rounded-[10px] shrink-0 w-[118px]" data-name="Text Input">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#0a0a0a] text-[16px]">{text}</p>
                </div>
                <div aria-hidden className="absolute border-2 border-[#154880] border-solid inset-0 pointer-events-none rounded-[10px]" />
              </div>
              <button className="bg-[#134780] cursor-pointer relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
                  <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                    <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Vector">
                      <div className="absolute inset-[-9.09%_-6.25%]">
                        <svg className="block size-full" fill="none" height="8.66667" preserveAspectRatio="none" viewBox="0 0 12 8.66667" width="12">
                          <path d={svgPaths.pb811a00} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="bg-[#e5e7eb] cursor-pointer relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
                  <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                    <div className="absolute inset-1/4" data-name="Vector">
                      <div className="absolute inset-[-8.33%]">
                        <svg className="block size-full" fill="none" height="9.33333" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" width="9.33333">
                          <path d={svgPaths.p48af40} id="Vector" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-1/4" data-name="Vector">
                      <div className="absolute inset-[-8.33%]">
                        <svg className="block size-full" fill="none" height="9.33333" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" width="9.33333">
                          <path d={svgPaths.p30908200} id="Vector" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
type Button5Props = {
  className?: string;
  property1?: "Default" | "hover" | "active";
};

function Button5({ className, property1 = "Default" }: Button5Props) {
  const isActive = property1 === "active";
  const isHover = property1 === "hover";
  return (
    <div className={className || "relative size-[16px]"}>
      <div className="content-stretch flex flex-col items-start relative size-full">
        <div className="relative shrink-0 size-[16px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
            <g id="Icon">
              <path d={svgPaths.p1c949200} id="Vector" stroke={isActive ? "#134780" : isHover ? "#4A5565" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d={svgPaths.pd12ce00} id="Vector_2" stroke={isActive ? "#134780" : isHover ? "#4A5565" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d={svgPaths.p226ad00} id="Vector_3" stroke={isActive ? "#134780" : isHover ? "#4A5565" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d={svgPaths.p1e9aa900} id="Vector_4" stroke={isActive ? "#134780" : isHover ? "#4A5565" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d={svgPaths.p12fdd280} id="Vector_5" stroke={isActive ? "#134780" : isHover ? "#4A5565" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              <path d={svgPaths.p3be7b040} id="Vector_6" stroke={isActive ? "#134780" : isHover ? "#4A5565" : "#99A1AF"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
type DraggableSlideItemProps = {
  className?: string;
  number?: string;
  property1?: "Default" | "Variant2" | "Variant3";
  textToSpeach?: boolean;
  title?: string;
};

function DraggableSlideItem({ className, number = "1", property1 = "Default", textToSpeach = true, title = "Introduction" }: DraggableSlideItemProps) {
  if (property1 === "Variant3") {
    return (
      <button className={className || "bg-[#f9fafb] cursor-pointer drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[64.418px] relative rounded-[10px] w-[220.52px]"} data-name="Property 1=Variant3">
        <div aria-hidden className="absolute border-[#b6d9ff] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[7.994px] items-center px-[13.226px] py-[13.245px] relative size-full">
            <Button5 className="relative shrink-0 size-[16px]" property1="hover" />
            <div className="bg-[#b6d9ff] drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] relative rounded-[10px] shrink-0 size-[27.988px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.542px] relative size-full">
                <div className="h-[15.988px] relative shrink-0 w-[6.905px]" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                    <p className="[word-break:break-word] bg-clip-text flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-w-px not-italic relative text-[12px] text-[transparent] text-left" style={{ backgroundImage: "linear-gradient(115.54863819654882deg, rgb(19, 71, 128) 4.6127%, rgb(23, 53, 86) 100%)" }}>
                      {number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[162.465_0_0] h-[37.966px] min-w-px relative" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.984px] items-start relative size-full">
                <div className="content-stretch flex h-[19.994px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-px not-italic overflow-hidden relative text-[#101828] text-[14px] text-ellipsis text-left whitespace-nowrap">{title}</p>
                </div>
                <div className="content-stretch flex gap-[11.981px] h-[15.988px] items-center relative shrink-0 w-full" data-name="Container">
                  <div className="h-[15.988px] relative shrink-0 w-[47.516px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
                      <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
                          <g clipPath="url(#clip0_0_523)" id="Icon">
                            <path d={svgPaths.p2727a500} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                            <path d={svgPaths.p35166000} id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_523">
                              <rect fill="white" height="11.9811" width="11.9811" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="h-[15.988px] relative shrink-0 w-[31.548px]" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] text-left whitespace-nowrap">Audio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {textToSpeach && (
                    <div className="h-[16px] relative shrink-0 w-[40px]" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
                        <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
                          <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
                            <g id="Icon">
                              <path d={svgPaths.p2f621100} id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                              <path d={svgPaths.p3b0b5400} id="Vector_2" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                            </g>
                          </svg>
                        </div>
                        <div className="h-[15.988px] relative shrink-0 w-[18.964px]" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#9810fa] text-[12px] text-left whitespace-nowrap">TTS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  }
  if (property1 === "Variant2") {
    return (
      <div className={className || "bg-white h-[64.418px] relative rounded-[10px] w-[220.52px]"} data-name="Property 1=Variant2">
        <div aria-hidden className="absolute border-[#e5e7eb] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[7.994px] items-center px-[13.226px] py-[13.245px] relative size-full">
            <Button5 className="relative shrink-0 size-[16px]" />
            <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[27.988px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.542px] relative size-full">
                <div className="h-[15.988px] relative shrink-0 w-[6.905px]" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px]">{number}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[162.465_0_0] h-[37.966px] min-w-px relative" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.984px] items-start relative size-full">
                <div className="content-stretch flex h-[19.994px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-px not-italic overflow-hidden relative text-[#101828] text-[14px] text-ellipsis whitespace-nowrap">{title}</p>
                </div>
                <div className="content-stretch flex gap-[11.981px] h-[15.988px] items-center relative shrink-0 w-full" data-name="Container">
                  <div className="h-[15.988px] relative shrink-0 w-[47.516px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
                      <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
                          <g clipPath="url(#clip0_0_523)" id="Icon">
                            <path d={svgPaths.p2727a500} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                            <path d={svgPaths.p35166000} id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_523">
                              <rect fill="white" height="11.9811" width="11.9811" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="h-[15.988px] relative shrink-0 w-[31.548px]" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] whitespace-nowrap">Audio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {textToSpeach && (
                    <div className="h-[16px] relative shrink-0 w-[40px]" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
                        <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
                          <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
                            <g id="Icon">
                              <path d={svgPaths.p2f621100} id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                              <path d={svgPaths.p3b0b5400} id="Vector_2" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                            </g>
                          </svg>
                        </div>
                        <div className="h-[15.988px] relative shrink-0 w-[18.964px]" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#9810fa] text-[12px] whitespace-nowrap">TTS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button className={className || "bg-[#eff6ff] cursor-pointer drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[64.418px] relative rounded-[10px] w-[220.52px]"} data-name="Property 1=Default">
      <div aria-hidden className="absolute border-[#134780] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.994px] items-center px-[13.226px] py-[13.245px] relative size-full">
          <Button5 className="relative shrink-0 size-[16px]" property1="active" />
          <div className="bg-[#134780] drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] relative rounded-[10px] shrink-0 size-[27.988px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.542px] relative size-full">
              <div className="h-[15.988px] relative shrink-0 w-[6.905px]" data-name="Text">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-w-px not-italic relative text-[12px] text-left text-white">{number}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[162.465_0_0] h-[37.966px] min-w-px relative" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.984px] items-start relative size-full">
              <div className="content-stretch flex h-[19.994px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-px not-italic overflow-hidden relative text-[#134780] text-[14px] text-ellipsis text-left whitespace-nowrap">{title}</p>
              </div>
              <div className="content-stretch flex gap-[11.981px] h-[15.988px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="h-[15.988px] relative shrink-0 w-[47.516px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
                    <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
                      <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
                        <g clipPath="url(#clip0_0_523)" id="Icon">
                          <path d={svgPaths.p2727a500} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                          <path d={svgPaths.p35166000} id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_523">
                            <rect fill="white" height="11.9811" width="11.9811" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="h-[15.988px] relative shrink-0 w-[31.548px]" data-name="Text">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] text-left whitespace-nowrap">Audio</p>
                      </div>
                    </div>
                  </div>
                </div>
                {textToSpeach && (
                  <div className="h-[16px] relative shrink-0 w-[40px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
                      <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
                          <g id="Icon">
                            <path d={svgPaths.p2f621100} id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                            <path d={svgPaths.p3b0b5400} id="Vector_2" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
                          </g>
                        </svg>
                      </div>
                      <div className="h-[15.988px] relative shrink-0 w-[18.964px]" data-name="Text">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#9810fa] text-[12px] text-left whitespace-nowrap">TTS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
type LinkProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Link({ className, property1 = "Default" }: LinkProps) {
  return (
    <div className={className || "h-[20px] relative"}>
      <div className="content-stretch flex items-start relative size-full">
        <p className={`[word-break:break-word] font-["Inter:Regular",sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${property1 === "Variant2" ? "text-[#101828]" : "text-[#4a5565]"}`}>My Courses</p>
      </div>
    </div>
  );
}

function MotionNav({ className }: { className?: string }) {
  return (
    <div className={className || "h-[20px] relative w-[1024px]"} data-name="motion.nav">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center relative size-full">
          <div className="relative shrink-0 size-[16px]" data-name="Link">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
              <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Home">
                <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
                  <div className="absolute inset-[-11.11%_-16.67%]">
                    <svg className="block size-full" fill="none" height="7.33333" preserveAspectRatio="none" viewBox="0 0 5.33333 7.33333" width="5.33333">
                      <path d={svgPaths.pbba7c80} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-[8.34%_12.5%_12.5%_12.5%]" data-name="Vector">
                  <div className="absolute inset-[-5.26%_-5.56%]">
                    <svg className="block size-full" fill="none" height="13.9997" preserveAspectRatio="none" viewBox="0 0 13.3333 13.9997" width="13.3333">
                      <path d={svgPaths.p27288a80} id="Vector" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[20px] relative shrink-0 w-[85.516px]" data-name="div">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
              <div className="h-[20px] relative shrink-0 w-[5.469px]" data-name="span">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#99a1af] text-[14px]">/</p>
                </div>
              </div>
              <Link className="h-[20px] relative shrink-0" />
            </div>
          </div>
          <div className="h-[20px] relative shrink-0 w-[100.281px]" data-name="div">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
              <div className="h-[20px] relative shrink-0 w-[5.469px]" data-name="span">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#99a1af] text-[14px]">/</p>
                </div>
              </div>
              <div className="flex-[1_0_0] h-[20px] min-w-px relative" data-name="span">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Create Course</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_465)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17134c00} id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_465">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Saved Just now</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] h-[20px] items-center right-0 top-1/2" data-name="Container">
      <Icon />
      <Text />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#454545] text-[26px] w-[min-content]">
        <p className="leading-[32px]">Create Course</p>
      </div>
      <MotionNav className="h-[20px] relative shrink-0 w-[1024px]" />
      <Container2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[19.46%_8.4%_0.77%_8.32%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="14.357" preserveAspectRatio="none" viewBox="0 0 14.9918 14.357" width="14.9918">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p3ec0e400} fill="url(#paint0_linear_0_562)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pe713a80} fill="url(#paint1_linear_0_562)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_562" x1="7.62091" x2="8.05396" y1="13.8546" y2="14.4532">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_0_562" x1="1.45754" x2="10.3049" y1="-3.91383e-08" y2="13.7255">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function MingcuteCheckFill() {
  return (
    <div className="absolute left-[6px] overflow-clip size-[18px] top-[6px]" data-name="mingcute:check-fill">
      <Group />
    </div>
  );
}

function No() {
  return (
    <div className="absolute left-[9px] overflow-clip size-[30px] top-[8px]" data-name="No 1">
      <div className="-translate-y-1/2 absolute bg-[#eef4ff] border border-[#134780] border-solid left-0 rounded-[50px] size-[30px] top-1/2" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[11px] not-italic text-[15px] text-white top-[-11px] tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[normal]">1</p>
      </div>
      <MingcuteCheckFill />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[45px] relative shrink-0 w-[162px]">
      <No />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[49px] not-italic text-[#484848] text-[15px] top-[23px] tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[normal]">Course Detail</p>
      </div>
      <div className="absolute h-0 left-[162px] top-[23px] w-[87px]">
        <div className="absolute inset-[-0.75px_0]">
          <svg className="block size-full" fill="none" height="1.5" preserveAspectRatio="none" viewBox="0 0 87 1.5" width="87">
            <path d="M0 0.75H87" id="Vector 3" stroke="#154880" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[19.46%_8.4%_0.77%_8.32%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="14.357" preserveAspectRatio="none" viewBox="0 0 14.9918 14.357" width="14.9918">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p3ec0e400} fill="url(#paint0_linear_0_562)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pe713a80} fill="url(#paint1_linear_0_562)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_562" x1="7.62091" x2="8.05396" y1="13.8546" y2="14.4532">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_0_562" x1="1.45754" x2="10.3049" y1="-3.91383e-08" y2="13.7255">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function MingcuteCheckFill1() {
  return (
    <div className="absolute left-[6px] overflow-clip size-[18px] top-[6px]" data-name="mingcute:check-fill">
      <Group1 />
    </div>
  );
}

function No1() {
  return (
    <div className="absolute left-[9px] overflow-clip size-[30px] top-[8px]" data-name="No 1">
      <div className="-translate-y-1/2 absolute bg-[#eef4ff] border border-[#134780] border-solid left-0 rounded-[50px] size-[30px] top-1/2" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[11px] not-italic text-[15px] text-white top-[-11px] tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[normal]">1</p>
      </div>
      <MingcuteCheckFill1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[45px] relative shrink-0 w-[158px]">
      <No1 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[49px] not-italic text-[#484848] text-[15px] top-[23px] tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[normal]">Global Settings</p>
      </div>
      <div className="absolute h-0 left-[158px] top-[24px] w-[87px]">
        <div className="absolute inset-[-0.75px_0]">
          <svg className="block size-full" fill="none" height="1.5" preserveAspectRatio="none" viewBox="0 0 87 1.5" width="87">
            <path d="M0 0.75H87" id="Vector 4" stroke="#D9D9D9" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[428px] top-[24px] w-[87px]">
        <div className="absolute inset-[-0.75px_0]">
          <svg className="block size-full" fill="none" height="1.5" preserveAspectRatio="none" viewBox="0 0 87 1.5" width="87">
            <path d="M0 0.75H87" id="Vector 4" stroke="#D9D9D9" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[19.46%_8.4%_0.77%_8.32%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="14.357" preserveAspectRatio="none" viewBox="0 0 14.9918 14.357" width="14.9918">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pe713a80} fill="white" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteCheckFill2() {
  return (
    <div className="absolute left-[6px] overflow-clip size-[18px] top-[28px]" data-name="mingcute:check-fill">
      <Group2 />
    </div>
  );
}

function No2() {
  return (
    <div className="absolute left-[9px] overflow-clip size-[30px] top-[8px]" data-name="No 4">
      <div className="-translate-y-1/2 absolute bg-[#154880] left-0 rounded-[50px] size-[30px] top-1/2" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[10px] not-italic text-[15px] text-white top-[15px] tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[normal]">3</p>
      </div>
      <MingcuteCheckFill2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[45px] relative shrink-0 w-[190px]">
      <No2 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[49px] not-italic text-[#484848] text-[15px] top-[22.5px] tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[normal]">{`Review & Preview `}</p>
      </div>
    </div>
  );
}

function ProcessBar1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[87px] items-center left-[calc(50%+1px)] top-[calc(50%+0.5px)]" data-name="Process Bar">
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function ProcessBar() {
  return (
    <div className="h-[68px] relative rounded-[20px] shrink-0 w-[1239px] z-[3]" data-name="Process Bar">
      <ProcessBar1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[19.994px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="19.9945" preserveAspectRatio="none" viewBox="0 0 19.9945 19.9945" width="19.9945">
        <g id="Icon">
          <path d="M2.49931 9.99723H2.50764" id="Vector" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66621" />
          <path d="M2.49931 14.9958H2.50764" id="Vector_2" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66621" />
          <path d="M2.49931 4.99862H2.50764" id="Vector_3" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66621" />
          <path d="M6.66482 9.99723H17.4952" id="Vector_4" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66621" />
          <path d="M6.66482 14.9958H17.4952" id="Vector_5" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66621" />
          <path d="M6.66482 4.99862H17.4952" id="Vector_6" stroke="#364153" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66621" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[26.977px] relative shrink-0 w-[73.812px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] not-italic relative shrink-0 text-[#101828] text-[18px] whitespace-nowrap">All Slides</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[26.977px] relative shrink-0 w-[101.801px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.994px] items-center relative size-full">
        <Icon1 />
        <Heading />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#f3f4f6] h-[27.969px] relative rounded-[41768300px] shrink-0 w-[27.774px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[10px] not-italic text-[#6a7282] text-[14px] top-[2.99px] whitespace-nowrap">8</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[27.969px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[6.905px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-w-px not-italic relative text-[12px] text-left text-white">1</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#134780] drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] relative rounded-[10px] shrink-0 size-[27.988px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.542px] relative size-full">
        <Text2 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[19.994px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-px not-italic overflow-hidden relative text-[#134780] text-[14px] text-ellipsis text-left whitespace-nowrap">PPT 1</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
        <g clipPath="url(#clip0_0_523)" id="Icon">
          <path d={svgPaths.p2727a500} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
          <path d={svgPaths.p35166000} id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
        </g>
        <defs>
          <clipPath id="clip0_0_523">
            <rect fill="white" height="11.9811" width="11.9811" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[31.548px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] text-left whitespace-nowrap">PPT</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[47.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
        <Icon2 />
        <Text3 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[11.981px] h-[15.988px] items-center relative shrink-0 w-full" data-name="Container">
      <Container10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[162.465_0_0] h-[37.966px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.984px] items-start relative size-full">
        <Paragraph />
        <Container9 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[6.905px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px]">2</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[27.988px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.542px] relative size-full">
        <Text4 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[19.994px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-px not-italic overflow-hidden relative text-[#101828] text-[14px] text-ellipsis whitespace-nowrap">Overview</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[11.981px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.9811" preserveAspectRatio="none" viewBox="0 0 11.9811 11.9811" width="11.9811">
        <g id="Icon">
          <path d={svgPaths.p2f621100} id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
          <path d={svgPaths.p3b0b5400} id="Vector_2" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998427" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[18.964px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#9810fa] text-[12px] whitespace-nowrap">Quiz</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.987px] items-center relative size-full">
        <Icon3 />
        <Text5 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[11.981px] h-[15.988px] items-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[162.465_0_0] h-[37.966px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.984px] items-start relative size-full">
        <Paragraph1 />
        <Container13 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[6.905px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px]">4</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[27.988px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.542px] relative size-full">
        <Text6 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[19.994px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-px not-italic overflow-hidden relative text-[#101828] text-[14px] text-ellipsis whitespace-nowrap">Implementation</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[162.465_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.984px] items-start relative size-full">
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[7.994px] items-start relative shrink-0 w-full" data-name="Container">
      <button className="bg-[#eff6ff] cursor-pointer drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[64.418px] relative rounded-[10px] shrink-0 w-[220.52px]" data-name="DraggableSlideItem">
        <div aria-hidden className="absolute border-[#134780] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[7.994px] items-center px-[13.226px] py-[13.245px] relative size-full">
            <Button5 className="relative shrink-0 size-[16px]" property1="active" />
            <Container7 />
            <Container8 />
          </div>
        </div>
      </button>
      <div className="bg-white h-[64.418px] relative rounded-[10px] shrink-0 w-[220.52px]" data-name="DraggableSlideItem">
        <div aria-hidden className="absolute border-[#e5e7eb] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[7.994px] items-center px-[13.226px] py-[13.245px] relative size-full">
            <Button5 className="relative shrink-0 size-[16px]" />
            <Container11 />
            <Container12 />
          </div>
        </div>
      </div>
      <DraggableSlideItem className="bg-white h-[64.418px] relative rounded-[10px] shrink-0 w-[220.52px]" number="3" property1="Variant2" textToSpeach={false} title="Key Concepts" />
      <div className="bg-white h-[64.418px] relative rounded-[10px] shrink-0 w-[220.52px]" data-name="DraggableSlideItem">
        <div aria-hidden className="absolute border-[#e5e7eb] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[7.994px] items-center px-[13.226px] py-[13.245px] relative size-full">
            <Button5 className="relative shrink-0 size-[16px]" />
            <Container15 />
            <Container16 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[15.987px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="15.9866" preserveAspectRatio="none" viewBox="0 0 15.9866 15.9866" width="15.9866">
        <g id="Icon">
          <path d="M3.33054 7.9933H12.6561" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33222" />
          <path d="M7.9933 3.33054V12.6561" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33222" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#00a63e] h-[40px] relative rounded-[14px] shrink-0 w-[221px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
        <Icon4 />
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{` Add Knowledge Check`}</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[15.987px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="15.9866" preserveAspectRatio="none" viewBox="0 0 15.9866 15.9866" width="15.9866">
        <g id="Icon">
          <path d="M3.33054 7.9933H12.6561" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33222" />
          <path d="M7.9933 3.33054V12.6561" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33222" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#9810fa] h-[40px] relative rounded-[14px] shrink-0 w-[221px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
        <Icon5 />
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{` Add Quiz`}</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[15.987px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="15.9866" preserveAspectRatio="none" viewBox="0 0 15.9866 15.9866" width="15.9866">
        <g id="Icon">
          <path d="M3.33054 7.9933H12.6561" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33222" />
          <path d="M7.9933 3.33054V12.6561" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33222" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#134780] h-[40px] relative rounded-[14px] shrink-0 w-[221px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
        <Icon6 />
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{` Add Slide`}</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Left() {
  return (
    <div className="bg-white h-[650px] relative rounded-[14px] shrink-0 w-[263px]" data-name="Left">
      <div className="content-stretch flex flex-col gap-[15.988px] items-start overflow-x-clip overflow-y-auto px-[21.24px] py-[16px] relative rounded-[inherit] size-full">
        <Container4 />
        <Container6 />
        <Container17 />
      </div>
      <div aria-hidden className="absolute border-[#e5e7eb] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[8.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] relative rounded-[10px] shrink-0 size-[36px]" style={{ backgroundImage: "linear-gradient(137.9249782337476deg, rgb(19, 71, 128) 4.6127%, rgb(23, 53, 86) 100%)" }} data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13.969px] relative size-full">
        <Text7 />
      </div>
    </div>
  );
}

function Container23() {
  return <div className="h-[26.271px] relative shrink-0 w-[632px]" data-name="Container" />;
}

function Container21() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container22 />
        <Container1 className="h-[28px] relative shrink-0 w-[133px]" />
        <Container23 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex isolate items-center justify-end relative size-full">
        <Button3 className="relative rounded-[10px] shrink-0 size-[36px] z-[1]" />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Frame6 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-gradient-to-r from-[#eff6ff] h-[73.209px] relative shrink-0 to-[#eef2ff] w-full z-[2]" data-name="Container">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b-[1.245px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[1.245px] pt-[15.988px] px-[23.982px] relative size-full">
        <Container20 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[39.989px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="39.9889" preserveAspectRatio="none" viewBox="0 0 39.9889 39.9889" width="39.9889">
        <g id="Icon">
          <path d={svgPaths.p1e4e2d80} id="Vector" stroke="url(#paint0_linear_0_532)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33241" />
          <path d={svgPaths.pdcc1a40} id="Vector_2" stroke="url(#paint1_linear_0_532)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33241" />
          <path d="M16.6621 14.9959H13.3296" id="Vector_3" stroke="url(#paint2_linear_0_532)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33241" />
          <path d="M26.6593 21.6607H13.3296" id="Vector_4" stroke="url(#paint3_linear_0_532)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33241" />
          <path d="M26.6593 28.3255H13.3296" id="Vector_5" stroke="url(#paint4_linear_0_532)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33241" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_532" x1="9.2567" x2="39.2789" y1="3.33241" y2="29.9367">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_0_532" x1="24.2988" x2="33.3241" y1="3.33241" y2="13.3296">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_0_532" x1="13.6536" x2="14.1117" y1="14.9959" y2="16.6868">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_0_532" x1="14.6256" x2="14.7479" y1="21.6607" y2="23.4674">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_0_532" x1="14.6256" x2="14.7479" y1="28.3255" y2="30.1322">
            <stop stopColor="#134780" />
            <stop offset="1" stopColor="#173556" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex items-center justify-center left-[69.69px] pl-[19.994px] pr-[20.014px] rounded-[16px] size-[79.997px] top-0" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[24.001px] left-0 top-[95.99px] w-[219.375px]" data-name="Paragraph">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[110.48px] not-italic text-[#364153] text-[16px] text-center top-[-1.76px] whitespace-nowrap">Slide 2 Preview</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute content-stretch flex h-[19.994px] items-start left-0 top-[123.97px] w-[219.375px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">Content preview from uploaded file</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[143.968px] relative shrink-0 w-[219.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container26 />
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[316.722px] relative shrink-0 w-full z-[1]" style={{ backgroundImage: "linear-gradient(161.4439014614818deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)" }} data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[171.859px] relative size-full">
          <Container25 />
          <div className="-translate-x-1/2 absolute h-[289px] left-1/2 top-[13.55px] w-[478px]" data-name="image 7">
            <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[392.421px] relative rounded-[14px] shrink-0 w-[946px] z-[4]" data-name="Container">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-[1.245px] relative rounded-[inherit] size-full">
        <Container19 />
        <Container24 />
      </div>
      <div aria-hidden className="absolute border-[#e5e7eb] border-[1.245px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Right() {
  return (
    <div className="content-stretch flex flex-col gap-[19.994px] isolate items-start relative self-stretch shrink-0 w-[946px]" data-name="right">
      <Container18 />
      <AudioSettings className="relative rounded-[10px] shrink-0 w-[946px] z-[3]" property1="deault" />
      <SlideSettings className="relative rounded-[10px] shrink-0 w-[946px] z-[2]" property1="deault" />
      <Container className="relative rounded-[10px] shrink-0 w-[946px] z-[1]" property1="deault" />
    </div>
  );
}

function LeftRight() {
  return (
    <div className="content-stretch flex items-start justify-between overflow-x-clip overflow-y-auto relative shrink-0 w-full z-[2]" data-name="left right]">
      <Left />
      <Right />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.pad05c0} id="Vector" stroke="#484848" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="#484848" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white content-stretch flex gap-[5px] h-[40px] items-center justify-center px-[20px] py-[4px] relative rounded-[10px] shrink-0 w-[119px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon8 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#525252] text-[14px] whitespace-nowrap">Preview</p>
    </div>
  );
}

function Save() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Save">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Save">
          <path d={svgPaths.p3c401780} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56b0600} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17caa400} id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function StartButton() {
  return (
    <div className="bg-[#525252] content-stretch flex gap-[5px] h-[40px] items-center px-[20px] py-[4px] relative rounded-[10px] shrink-0" data-name="Start Button">
      <Save />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Save Draft</p>
    </div>
  );
}

function TablerIconArrowRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="tabler-icon-arrow-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="tabler-icon-arrow-right">
          <path d={svgPaths.p31149620} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        </g>
      </svg>
    </div>
  );
}

function StartButton1() {
  return (
    <div className="bg-[#f48120] content-stretch flex gap-[5px] h-[40px] items-center px-[20px] py-[4px] relative rounded-[10px] shrink-0" data-name="Start Button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Continue</p>
      <TablerIconArrowRight />
    </div>
  );
}

function StartButton2() {
  return (
    <button className="absolute bg-white content-stretch cursor-pointer flex h-[40px] items-center justify-center left-[697px] px-[20px] py-[4px] rounded-[10px] top-0 w-[105px]" data-name="Start Button">
      <div aria-hidden className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#484848] text-[14px] text-left whitespace-nowrap">Back</p>
    </button>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-end relative shrink-0 w-full z-[1]" data-name="button">
      <Button10 />
      <StartButton />
      <StartButton1 />
      <StartButton2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[24px] isolate items-start p-[32px] relative size-full">
        <ProcessBar />
        <LeftRight />
        <Button9 />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full">
      <Frame4 />
      <Container3 />
    </div>
  );
}