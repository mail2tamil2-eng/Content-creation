import svgPaths from "./svg-sfoj19nt0p";
type ContainerProps = {
  className?: string;
  property1?: "Default" | "Variant4" | "Variant5";
};

function Container({ className, property1 = "Default" }: ContainerProps) {
  if (property1 === "Variant4") {
    return (
      <div className={className || "relative w-[1101px]"} data-name="Property 1=Variant4">
        <div className="content-stretch flex flex-col gap-[12px] items-start pt-[8px] relative size-full">
          <div className="bg-[#f0fdf4] h-[46px] relative rounded-[14px] shrink-0 w-[1101px]" data-name="Container/Value">
            <div aria-hidden className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[14px]" />
            <div className="flex flex-row items-center size-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[13px] py-[9px] relative size-full">
                <div className="bg-[#b9f8cf] relative rounded-[8px] shrink-0 size-[24px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] whitespace-nowrap">1</p>
                  </div>
                </div>
                <div className="flex-[326.703_0_0] min-w-px relative" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0d542b] text-[14px] whitespace-nowrap">Knowledge Check 1</p>
                  </div>
                </div>
                <div className="bg-[#dcfce7] relative rounded-[33554400px] shrink-0" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative size-full">
                    <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#00a63e] text-[12px] whitespace-nowrap">1 Q</p>
                  </div>
                </div>
                <div className="bg-white h-[28px] relative rounded-[10px] shrink-0 w-[56px]" data-name="Number Input">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip px-[8px] py-[6px] relative rounded-[inherit] size-full">
                    <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center w-full">100</p>
                  </div>
                  <div aria-hidden className="absolute border-2 border-[#7bf1a8] border-solid inset-0 pointer-events-none rounded-[10px]" />
                </div>
                <div className="relative shrink-0" data-name="Text">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">%</p>
                  </div>
                </div>
                <button className="cursor-pointer relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Button">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <div className="relative shrink-0 size-[14px]" data-name="Icon">
                      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
                        <g id="Icon">
                          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="#05DF72" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="#05DF72" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="relative rounded-[14px] shrink-0 w-full" data-name="Button">
            <div aria-hidden className="absolute border-2 border-[#7bf1a8] border-dashed inset-0 pointer-events-none rounded-[14px]" />
            <div className="flex flex-row items-center size-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative size-full">
                <div className="relative shrink-0 size-[16px]" data-name="Icon">
                  <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                    <g id="Icon">
                      <path d="M3.33333 8H12.6667" id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M8 3.33333V12.6667" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#00a63e] text-[14px] text-center whitespace-nowrap">Add Knowledge Check</p>
                <div className="flex-[1_0_0] min-w-px relative" data-name="Icon:align">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
                    <div className="relative shrink-0 size-[16px]" data-name="Icon">
                      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                        <g id="Icon">
                          <path d="M4 6L8 10L12 6" id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (property1 === "Variant5") {
    return (
      <div className={className || "h-[48px] relative w-[1101px]"} data-name="Property 1=Variant5">
        <div className="content-stretch cursor-pointer flex flex-col items-start pt-[8px] relative size-full">
          <button className="relative rounded-[14px] shrink-0 w-full" data-name="Button">
            <div aria-hidden className="absolute border-2 border-[#7bf1a8] border-dashed inset-0 pointer-events-none rounded-[14px]" />
            <div className="flex flex-row items-center size-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative size-full">
                <div className="relative shrink-0 size-[16px]" data-name="Icon">
                  <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                    <g id="Icon">
                      <path d="M3.33333 8H12.6667" id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M8 3.33333V12.6667" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#00a63e] text-[14px] text-center whitespace-nowrap">Add Knowledge Check</p>
                <div className="flex-[1_0_0] min-w-px relative" data-name="Icon:transform:align">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16px]" data-name="Icon:transform">
                      <div className="absolute flex items-center justify-center left-0 size-[16px] top-0">
                        <div className="flex-none rotate-180">
                          <div className="relative size-[16px]" data-name="Icon">
                            <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                              <g id="Icon">
                                <path d="M4 6L8 10L12 6" id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button className="absolute bg-white h-[183px] left-0 rounded-[14px] top-[52px] w-[1101px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
              <div className="h-[179px] max-h-[192px] relative shrink-0 w-full" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-h-[inherit] overflow-clip relative rounded-[inherit] size-full">
                  <div className="relative shrink-0 w-full" data-name="Button">
                    <div aria-hidden className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
                    <div className="flex flex-row items-center size-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pb-[11px] pt-[10px] px-[12px] relative size-full">
                        <div className="bg-[#dcfce7] relative rounded-[8px] shrink-0 size-[24px]" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-left whitespace-nowrap">1</p>
                          </div>
                        </div>
                        <div className="flex-[426.797_0_0] min-w-px relative" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-left whitespace-nowrap">Knowledge Check 1</p>
                          </div>
                        </div>
                        <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-left whitespace-nowrap">1 Q</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 w-full" data-name="Button">
                    <div aria-hidden className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
                    <div className="flex flex-row items-center size-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pb-[11px] pt-[10px] px-[12px] relative size-full">
                        <div className="bg-[#dcfce7] relative rounded-[8px] shrink-0 size-[24px]" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-left whitespace-nowrap">2</p>
                          </div>
                        </div>
                        <div className="flex-[426.797_0_0] min-w-px relative" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-left whitespace-nowrap">Knowledge Check 2</p>
                          </div>
                        </div>
                        <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-left whitespace-nowrap">1 Q</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 w-full" data-name="Button">
                    <div aria-hidden className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
                    <div className="flex flex-row items-center size-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pb-[11px] pt-[10px] px-[12px] relative size-full">
                        <div className="bg-[#dcfce7] relative rounded-[8px] shrink-0 size-[24px]" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-left whitespace-nowrap">3</p>
                          </div>
                        </div>
                        <div className="flex-[426.797_0_0] min-w-px relative" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-left whitespace-nowrap">Knowledge Check 3</p>
                          </div>
                        </div>
                        <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-left whitespace-nowrap">1 Q</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 w-full" data-name="Button">
                    <div className="flex flex-row items-center size-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative size-full">
                        <div className="bg-[#dcfce7] relative rounded-[8px] shrink-0 size-[24px]" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-left whitespace-nowrap">4</p>
                          </div>
                        </div>
                        <div className="flex-[426.797_0_0] min-w-px relative" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-left whitespace-nowrap">Knowledge Check 4</p>
                          </div>
                        </div>
                        <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0" data-name="Text">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative size-full">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-left whitespace-nowrap">1 Q</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden className="absolute border-2 border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <button className={className || "cursor-pointer h-[48px] relative w-[1101px]"} data-name="Property 1=Default">
      <div className="content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <div className="relative rounded-[14px] shrink-0 w-full" data-name="Button">
          <div aria-hidden className="absolute border-2 border-[#7bf1a8] border-dashed inset-0 pointer-events-none rounded-[14px]" />
          <div className="flex flex-row items-center size-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative size-full">
              <div className="relative shrink-0 size-[16px]" data-name="Icon">
                <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                  <g id="Icon">
                    <path d="M3.33333 8H12.6667" id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M8 3.33333V12.6667" id="Vector_2" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </g>
                </svg>
              </div>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#00a63e] text-[14px] text-center whitespace-nowrap">Add Knowledge Check</p>
              <div className="flex-[1_0_0] min-w-px relative" data-name="Icon:align">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
                  <div className="relative shrink-0 size-[16px]" data-name="Icon">
                    <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                      <g id="Icon">
                        <path d="M4 6L8 10L12 6" id="Vector" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </g>
                    </svg>
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

function Checkbox() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d={svgPaths.p31104300} id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1b3f8200} id="Vector_2" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 9.16667H13.3333" id="Vector_3" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H13.3333" id="Vector_4" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 9.16667H6.675" id="Vector_5" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 13.3333H6.675" id="Vector_6" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">{`Learner must complete `}</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="h-[36px] opacity-40 relative rounded-[10px] shrink-0 w-[80px]" data-name="Number Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip px-[10px] py-[8px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center w-full">100</p>
      </div>
      <div aria-hidden className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">{`% `}</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-[#e9d4ff] relative rounded-[33554400px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[13.333px] not-italic relative shrink-0 text-[#6e11b0] text-[10px] whitespace-nowrap">3 Q</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="bg-[#faf5ff] h-full relative rounded-[33554400px] shrink-0" data-name="Text">
        <div aria-hidden className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
        <div className="flex flex-row items-center size-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[9px] py-[3px] relative size-full">
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] whitespace-nowrap">What is CSS</p>
            <Text3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[4px] relative shrink-0 w-[536px]" data-name="Container">
      <NumberInput />
      <Text1 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">of quiz Completion in</p>
      <Text2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Text />
        <Container4 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[536_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Frame2 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Label">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center p-[21px] relative size-full">
          <Checkbox />
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">When the learner has viewed</p>
      </div>
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="h-[36px] opacity-40 relative rounded-[10px] shrink-0 w-[80px]" data-name="Number Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip px-[10px] py-[8px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center w-full">70</p>
      </div>
      <div aria-hidden className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">% of slides</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[33554400px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">3 of 3 slides</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-[536px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[4px] relative size-full">
        <NumberInput1 />
        <Text5 />
        <Text6 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[536_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full">
        <Text4 />
        <Container8 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[21px] relative size-full">
          <Checkbox1 />
          <Container6 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[16px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[20px]" data-name="Checkbox">
      <div aria-hidden className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full" />
    </div>
  );
}

function TablerIconNotebook() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="tabler-icon-notebook">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="tabler-icon-notebook">
          <path d={svgPaths.p1314d580} id="Vector" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[14px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <TablerIconNotebook />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Knowledge check completion</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[536_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] isolate items-start justify-center relative size-full">
        <Text7 />
        <Container className="cursor-pointer h-[48px] relative shrink-0 w-[1101px] z-[1]" />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full z-[1]" data-name="Container">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[21px] relative size-full">
          <Checkbox2 />
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col isolate items-center pt-[16px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <ContainerMargin />
      <ContainerMargin1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[1]">
      <Container1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col isolate items-end justify-center relative shrink-0 w-[1235px] z-[1]">
      <Frame1 />
    </div>
  );
}

export default function CreateCourseFormBgMusic() {
  return (
    <div className="bg-white relative rounded-[20px] size-full" data-name="Create Course Form Bg Music">
      <div className="content-stretch flex flex-col gap-[17px] isolate items-start overflow-clip px-[25px] py-[20px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#454545] text-[20px] whitespace-nowrap z-[2]">Completion Criteria</p>
        <Frame />
      </div>
      <div aria-hidden className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}