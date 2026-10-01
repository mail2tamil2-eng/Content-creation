import svgPaths from "./svg-cbmeyv10e3";
type BlinkerProps = {
  className?: string;
  state?: boolean;
};

function Blinker({ className, state = true }: BlinkerProps) {
  return (
    <div className={className || "h-[15px] relative w-0"}>
      <div className="absolute bottom-0 flex items-center justify-center left-0 right-full top-0" style={{ containerType: "size" }}>
        <div className="flex-none h-[0px] rotate-90 w-[100cqh]">
          <div className="relative size-full" data-name="Blinker">
            {state && (
              <div className="absolute inset-[-1.5px_0_0_0]">
                <svg className="block size-full" fill="none" height="1.5" preserveAspectRatio="none" viewBox="0 0 15 1.5" width="15">
                  <line id="Blinker" stroke="#222222" strokeWidth="1.5" x2="15" y1="0.75" y2="0.75" />
                </svg>
              </div>
            )}
            {!state && (
              <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                <g id="Blinker" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
type ButtonProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Button({ className, property1 = "Default" }: ButtonProps) {
  const isVariant2 = property1 === "Variant2";
  const isVariant3 = property1 === "Variant3";
  return (
    <button className={className || "bg-white h-[44px] relative rounded-[10px] w-[173px]"}>
      <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          {["Default", "Variant3"].includes(property1) && (
            <div className="h-[20px] relative shrink-0" data-name="Text">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">{isVariant3 ? "15 " : "Enter duration in MIns"}</p>
              </div>
            </div>
          )}
          {isVariant3 && <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Mins</p>}
          {isVariant2 && (
            <>
              <Blinker className="h-[15px] relative shrink-0 w-0" />
              <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-left tracking-[0.3px] whitespace-nowrap">Mins</p>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
type SwitchProps = {
  className?: string;
  enable?: boolean;
};

function Switch({ className, enable = false }: SwitchProps) {
  const isEnable = enable;
  return (
    <button className={className || `relative ${isEnable ? "bg-[#134780] h-[23.984px] rounded-[41943000px] w-[47.988px]" : "bg-[#d1d5dc] h-[24px] rounded-[33554400px] w-[48px]"}`}>
      <div className={`content-stretch flex flex-col items-start relative size-full ${isEnable ? "pl-[27.984px] pr-[4.008px] pt-[3.984px]" : "pl-[4px] pr-[28px] pt-[4px]"}`}>
        <div className={`bg-white h-[16px] relative shrink-0 w-full ${isEnable ? "rounded-[41943000px]" : "rounded-[33554400px]"}`} data-name="Text" />
      </div>
    </button>
  );
}
type RadioCheckboxCoreProps = {
  className?: string;
  indeterminate?: "no";
  selected?: boolean;
  state?: "Rest";
  type?: "Checkbox" | "Radio";
};

function RadioCheckboxCore({ className, indeterminate = "no", selected = true, state = "Rest", type = "Checkbox" }: RadioCheckboxCoreProps) {
  const isCheckboxAndRestAndSelectedAndNo = type === "Checkbox" && state === "Rest" && selected && indeterminate === "no";
  const isRadioAndRestAndSelectedAndNo = type === "Radio" && state === "Rest" && selected && indeterminate === "no";
  const isRestAndSelectedAndNo = state === "Rest" && selected && indeterminate === "no";
  return (
    <div className={className || `relative size-[20px] ${isRadioAndRestAndSelectedAndNo ? "bg-[#eafef1] rounded-[10px]" : isCheckboxAndRestAndSelectedAndNo ? "bg-[#eafef1] rounded-[6px]" : "bg-white overflow-clip rounded-[10px]"}`}>
      <div aria-hidden={type === "Radio" && state === "Rest" && !selected && indeterminate === "no" ? true : undefined} className={isRestAndSelectedAndNo ? "overflow-clip relative rounded-[inherit] size-full" : "absolute border border-[#667085] border-solid inset-0 pointer-events-none rounded-[10px]"}>
        {isCheckboxAndRestAndSelectedAndNo && (
          <div className="absolute inset-[15%] overflow-clip" data-name="check">
            <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon">
              <div className="absolute inset-[-15.58%_-10.71%]">
                <svg className="block size-full" fill="none" height="8.41667" preserveAspectRatio="none" viewBox="0 0 11.3333 8.41667" width="11.3333">
                  <path d={svgPaths.p1b635a00} id="Icon" stroke="#026E78" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        )}
        {isRadioAndRestAndSelectedAndNo && (
          <div className="absolute inset-[30%]" data-name="Check">
            <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 8 8" width="8">
              <circle cx="4" cy="4" fill="#026E78" id="Check" r="4" />
            </svg>
          </div>
        )}
      </div>
      {isRestAndSelectedAndNo && <div aria-hidden className={`absolute border border-[#038c8c] border-solid inset-0 pointer-events-none ${isRadioAndRestAndSelectedAndNo ? "rounded-[10px]" : "rounded-[6px]"}`} />}
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
            {type === "Radio" && state === "Rest" && !selected && indeterminate === "no" && !text && !supportingText && <RadioCheckboxCore className="bg-white relative rounded-[10px] shrink-0 size-[20px]" selected={false} type="Radio" />}
          </div>
        )}
      </div>
    </div>
  );
}
type ContainerProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3" | "Variant4";
};

function Container({ className, property1 = "Default" }: ContainerProps) {
  if (property1 === "Variant4") {
    return (
      <div className={className || "relative rounded-[10px] w-[1223px]"} data-name="Property 1=Variant4">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <button className="bg-[#f9fafb] cursor-pointer h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[158.656px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p3b004e00} id="Vector" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">Navigation Mode</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[126.656px]" data-name="Paragraph">
                            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px] text-left">Free Navigation</p>
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
                <div className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="CreateCoursePage">
                  <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                    <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
                    <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                      <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                        <div className="content-stretch flex gap-[12px] items-start relative size-full">
                          <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                            <RadioCheckbox className="relative shrink-0" />
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Free Navigation</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Show seek bar with configurable interaction options</p>
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
                            <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Linear (Restricted Forward Navigation)</p>
                            <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Learners must complete each slide before progressing</p>
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
  if (property1 === "Variant2") {
    return (
      <div className={className || "relative rounded-[10px] w-[1223px]"} data-name="Property 1=Variant2">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <div className="bg-[#f9fafb] h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[158.656px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p3b004e00} id="Vector" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] top-[-2px] whitespace-nowrap">Navigation Mode</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[126.656px]" data-name="Paragraph">
                            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px]">Free Navigation</p>
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
  if (property1 === "Variant3") {
    return (
      <button className={className || "cursor-pointer relative rounded-[10px] w-[1223px]"} data-name="Property 1=Variant3">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-px relative size-full">
            <div className="bg-[#f5f6f8] h-[64px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <div className="h-[40px] relative shrink-0 w-[158.656px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                      <div className="relative shrink-0 size-[20px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                          <g id="Icon">
                            <path d={svgPaths.p3b004e00} id="Vector" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                        </svg>
                      </div>
                      <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                          <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">Navigation Mode</p>
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[126.656px]" data-name="Paragraph">
                            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px] text-left">Free Navigation</p>
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
    <div className={className || "relative rounded-[10px] w-[1223px]"} data-name="Property 1=Default">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <button className="bg-[#f9fafb] cursor-pointer h-[64px] relative shrink-0 w-full" data-name="Button">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                <div className="h-[40px] relative shrink-0 w-[158.656px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                    <div className="relative shrink-0 size-[20px]" data-name="Icon">
                      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                        <g id="Icon">
                          <path d={svgPaths.p3b004e00} id="Vector" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                      </svg>
                    </div>
                    <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] text-left top-[-2px] whitespace-nowrap">Navigation Mode</p>
                        <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[126.656px]" data-name="Paragraph">
                          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px] text-left">Free Navigation</p>
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
              <div className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="CreateCoursePage">
                <button className="bg-white relative rounded-[10px] shrink-0 w-full">
                  <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[10px]" />
                  <div className="content-stretch flex flex-col items-start px-[22px] py-[13px] relative size-full">
                    <div className="relative shrink-0 w-[729px]" data-name="Radio/checkbox">
                      <div className="content-stretch flex gap-[12px] items-start relative size-full">
                        <div className="content-stretch flex items-center justify-center pt-[2px] relative shrink-0" data-name="Input">
                          <RadioCheckbox className="relative shrink-0" selected />
                        </div>
                        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium gap-[2px] items-start min-w-px not-italic relative text-[14px] text-left" data-name="Text and supporting text">
                          <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Free Navigation</p>
                          <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Show seek bar with configurable interaction options</p>
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
                          <p className="leading-[24px] min-w-full relative shrink-0 text-[#101828] w-[min-content]">Linear (Restricted Forward Navigation)</p>
                          <p className="leading-[20px] relative shrink-0 text-[#4a5565] whitespace-nowrap">Learners must complete each slide before progressing</p>
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
type FrameProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

function Frame({ className, property1 = "Default" }: FrameProps) {
  const isDefault = property1 === "Default";
  const isVariant2 = property1 === "Variant2";
  return (
    <div className={className || "relative w-[1239px]"}>
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end relative size-full">
          <div className="bg-[#eff6ff] relative rounded-[14px] shrink-0 w-full" data-name="Container">
            <div aria-hidden className="absolute border-[#bedbff] border-[1.049px] border-solid inset-0 pointer-events-none rounded-[14px]" />
            <div className="content-stretch flex flex-col items-start pb-[25.04px] pt-[25.038px] px-[25.038px] relative size-full">
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
                <div className="relative shrink-0 size-[23.989px]" data-name="Icon">
                  <svg className="absolute block inset-0 size-full" fill="none" height="23.9885" preserveAspectRatio="none" viewBox="0 0 23.9885 23.9885" width="23.9885">
                    <g id="Icon">
                      <path d={svgPaths.p1493dd00} id="Vector" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99905" />
                      <path d={svgPaths.p4572800} id="Vector_2" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99905" />
                    </g>
                  </svg>
                </div>
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-[1153px]" data-name="Container">
                  <div className="h-[24.005px] relative shrink-0 w-full" data-name="Heading 3">
                    <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-1.95px] whitespace-nowrap">{isVariant2 ? "Background Music" : "Background Music "}</p>
                  </div>
                  <div className="h-[20.004px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.05px] whitespace-nowrap">Add background music that will play throughout the entire course</p>
                  </div>
                  <div className="content-stretch flex gap-[7.985px] items-center relative shrink-0 w-full" data-name="Label">
                    {isDefault && (
                      <>
                        <button className="bg-white block cursor-pointer relative rounded-[2px] shrink-0 size-[15.987px]" data-name="Checkbox">
                          <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[2px]" />
                        </button>
                        <div className="h-[20.004px] relative shrink-0 w-[163.411px]" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                            <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.05px] whitespace-nowrap">Enable Background Music</p>
                          </div>
                        </div>
                      </>
                    )}
                    {isVariant2 && (
                      <>
                        <button className="bg-white cursor-pointer relative rounded-[2px] shrink-0 size-[15.99px]" data-name="_Radio/checkbox core">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                            <div className="absolute inset-[15%] overflow-clip" data-name="check">
                              <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon">
                                <div className="absolute inset-[-12.18%_-8.38%]">
                                  <svg className="block size-full" fill="none" height="6.38012" preserveAspectRatio="none" viewBox="0 0 8.712 6.38012" width="8.712">
                                    <path d={svgPaths.p110c5600} id="Icon" stroke="#134780" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div aria-hidden className="absolute border border-[#134780] border-solid inset-0 pointer-events-none rounded-[2px]" />
                        </button>
                        <div className="h-[20.004px] relative shrink-0 w-[163.411px]" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                            <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.05px] whitespace-nowrap">Enable Background Music</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {isVariant2 && (
                    <div className="bg-[#fbfbfb] h-[166px] relative rounded-[10px] shrink-0 w-full">
                      <div aria-hidden className="absolute border border-[#d5d5d5] border-dashed inset-0 pointer-events-none rounded-[10px]" />
                      <div className="flex flex-col items-center justify-center size-full">
                        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[40px] relative size-full">
                          <div className="relative shrink-0 size-[36px]" data-name="lets-icons:music-light">
                            <svg className="absolute block inset-0 size-full" fill="none" height="36" preserveAspectRatio="none" viewBox="0 0 36 36" width="36">
                              <g id="lets-icons:music-light">
                                <path d={svgPaths.pbb32bc0} id="Vector" stroke="#979797" strokeWidth="1.5" />
                              </g>
                            </svg>
                          </div>
                          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center leading-[20px] not-italic relative shrink-0 text-[14px] whitespace-nowrap">
                            <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#364153]">Select a file or drag and drop here</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6a7282]">MP3, file size no more than 100MB</p>
                          </div>
                          <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[5px] shrink-0">
                            <div aria-hidden className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[5px]" />
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#979797] text-[10px] uppercase whitespace-nowrap">Select file</p>
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
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full">
      <Frame className="relative shrink-0 w-[1239px]" />
    </div>
  );
}

function All() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1239px]" data-name="All">
      <Frame1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[19.992px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="19.9917" preserveAspectRatio="none" viewBox="0 0 19.9917 19.9917" width="19.9917">
        <g clipPath="url(#clip0_0_219)" id="Icon">
          <path d={svgPaths.p1a4dd780} id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          <path d={svgPaths.p24cc7f00} id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
        </g>
        <defs>
          <clipPath id="clip0_0_219">
            <rect fill="white" height="19.9917" width="19.9917" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[126.656px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Save learner progress for resuming later</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] top-[-2px] whitespace-nowrap">Bookmarking</p>
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[158.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Icon />
        <Container3 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f9fafb] h-[64px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Container2 />
          <Switch className="bg-[#134780] cursor-pointer h-[23.984px] relative rounded-[41943000px] shrink-0 w-[47.988px]" enable />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-[1223px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Button1 />
      </div>
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[19.988px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="19.9877" preserveAspectRatio="none" viewBox="0 0 19.9877 19.9877" width="19.9877">
        <g clipPath="url(#clip0_0_226)" id="Icon">
          <path d={svgPaths.p1769c00} id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66564" />
          <path d="M16.6564 2.49847V5.82975" id="Vector_2" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66564" />
          <path d="M18.3221 4.16411H14.9908" id="Vector_3" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66564" />
          <path d="M3.33129 14.158V15.8236" id="Vector_4" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66564" />
          <path d="M4.16411 14.9908H2.49847" id="Vector_5" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66564" />
        </g>
        <defs>
          <clipPath id="clip0_0_226">
            <rect fill="white" height="19.9877" width="19.9877" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[20.004px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.05px] whitespace-nowrap">Apply Transition to All Slides</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16.003px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Set the same transition effect for the entire course</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] h-[36.007px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[296.897px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.986px] items-center relative size-full">
        <Icon1 />
        <Container7 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] whitespace-nowrap">None</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[44px] relative rounded-[10px] shrink-0 w-[185px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
        <Text />
        <Icon2 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container6 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#f9fafb] h-[70.08px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[1.049px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start pb-[1.049px] pt-[17.036px] px-[17.036px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
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
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[134.281px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Allow user to drag</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[14px] top-[-2px] whitespace-nowrap">Seek Bar Control</p>
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[40px] relative shrink-0 w-[166.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Icon3 />
        <Container9 />
      </div>
    </div>
  );
}

function Icon4() {
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

function Button3() {
  return (
    <div className="bg-[#f9fafb] h-[64px] relative shrink-0 w-full z-[1]" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Container8 />
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d={svgPaths.p17390300} id="Vector" stroke="#F54900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99917" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="#F54900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99917" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[20.004px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.05px] whitespace-nowrap">Slide Duration</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[16.003px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Set default duration for each slide</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[36.007px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading1 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[296.897px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.986px] items-center relative size-full">
        <Icon5 />
        <Container13 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container12 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Leave empty for auto-advance based on audio duration</p>
          <Button className="bg-white cursor-pointer h-[44px] relative rounded-[10px] shrink-0 w-[173px]" />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start p-[17.01px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function StartButton() {
  return (
    <button className="bg-white content-stretch cursor-pointer flex h-[40px] items-center justify-center px-[20px] py-[4px] relative rounded-[10px] shrink-0 w-[105px]" data-name="Start Button">
      <div aria-hidden className="absolute border border-[#d5d5d5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#484848] text-[14px] text-left whitespace-nowrap">Back</p>
    </button>
  );
}

function StartButton1() {
  return (
    <div className="bg-[#f48120] content-stretch flex h-[40px] items-center px-[20px] py-[4px] relative rounded-[10px] shrink-0" data-name="Start Button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Continue</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-end relative shrink-0 w-full">
      <StartButton />
      <StartButton1 />
    </div>
  );
}

export default function GlobalSettings() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[22px] items-start p-[25px] relative rounded-[20px] size-full" data-name="Global Settings">
      <div aria-hidden className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <All />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#454545] text-[20px] whitespace-nowrap">Global Settings</p>
      <Container className="relative rounded-[10px] shrink-0 w-[1223px]" property1="Variant2" />
      <Container1 />
      <Container4 />
      <div className="relative rounded-[10px] shrink-0 w-[1223px]" data-name="Seek Bar Control">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col isolate items-start p-px relative size-full">
            <Button3 />
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <Container10 />
      <Frame2 />
    </div>
  );
}