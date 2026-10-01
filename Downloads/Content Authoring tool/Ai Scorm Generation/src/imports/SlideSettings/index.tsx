import svgPaths from "./svg-lqczmf19z9";
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
  property1?: "hover" | "deafult";
  text?: string;
};

function Button1({ className, property1 = "hover", text = "Fade" }: Button1Props) {
  const isDeafult = property1 === "deafult";
  const isHover = property1 === "hover";
  return (
    <div className={className || `h-[36px] relative w-[178px] ${isDeafult ? "" : "bg-[#f4f9ff]"}`}>
      <div aria-hidden={isHover ? true : undefined} className={isDeafult ? "flex flex-row items-center size-full" : "absolute border border-[#bedbff] border-solid inset-0 pointer-events-none"}>
        {isDeafult && (
          <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.3px]">{text}</p>
          </div>
        )}
      </div>
      {isHover && (
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[12px] relative size-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px] tracking-[0.3px]">{text}</p>
          </div>
        </div>
      )}
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
                          <g clipPath="url(#clip0_0_42)" id="Icon">
                            <path d={svgPaths.p24941500} id="Vector" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M18.3333 4.16667H15" id="Vector_3" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M4.16667 15H2.5" id="Vector_5" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_42">
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
                          <g clipPath="url(#clip0_0_42)" id="Icon">
                            <path d={svgPaths.p24941500} id="Vector" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M18.3333 4.16667H15" id="Vector_3" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                            <path d="M4.16667 15H2.5" id="Vector_5" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                          </g>
                          <defs>
                            <clipPath id="clip0_0_42">
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
                      <g clipPath="url(#clip0_0_42)" id="Icon">
                        <path d={svgPaths.p24941500} id="Vector" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M18.3333 4.16667H15" id="Vector_3" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                        <path d="M4.16667 15H2.5" id="Vector_5" stroke="#9E21FC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99847" />
                      </g>
                      <defs>
                        <clipPath id="clip0_0_42">
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

export default function SlideSettings1() {
  return <SlideSettings className="relative rounded-[10px] size-full" property1="deault" />;
}