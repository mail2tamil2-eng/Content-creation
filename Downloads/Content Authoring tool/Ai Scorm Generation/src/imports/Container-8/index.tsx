import svgPaths from "./svg-mntmu9jwpr";
type ContainerProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

export default function Container({ className, property1 = "Default" }: ContainerProps) {
  const isDefault = property1 === "Default";
  const isVariant2 = property1 === "Variant2";
  const isVariant2OrVariant3 = ["Variant2", "Variant3"].includes(property1);
  const isVariant3 = property1 === "Variant3";
  return (
    <div className={className || "bg-[#101724] relative rounded-[14px] w-[805px]"}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[21.155px] py-[1.155px] relative size-full">
          <div className="relative shrink-0 w-full" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
              <div className="relative shrink-0 w-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start py-[12px] relative size-full">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
                    <div className="bg-[#00c950] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                        <div className="relative shrink-0 size-[20px]" data-name="tabler-icon-notebook">
                          <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                            <g id="tabler-icon-notebook">
                              <path d={svgPaths.p1314d580} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative shrink-0" data-name="Text">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#05df72] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">Knowledge Check</p>
                      </div>
                    </div>
                    <div className="flex-[1_0_0] min-w-px relative" data-name="Text:align">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
                          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">1 / 2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[6px] h-[20px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
                    <div className="bg-[#05df72] flex-[333_0_0] h-[4px] min-w-px relative rounded-[33554400px]" data-name="Container" />
                    <div className="bg-[#4a5565] flex-[333_0_0] h-[4px] min-w-px relative rounded-[33554400px]" data-name="Container" />
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
                    <p className="[word-break:break-word] capitalize font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.3px] whitespace-nowrap">What does CSS stand for?</p>
                  </div>
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
                    <div className="h-[38.288px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
                        <div className={`flex-[1_0_0] min-w-px relative ${isVariant3 ? "h-[38px] rounded-[10px]" : isVariant2 ? "bg-[rgba(0,201,80,0.2)] h-[38px] rounded-[14px]" : "h-[38.288px] rounded-[10px]"}`} data-name="Text Input">
                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                            <div className={`bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full ${isVariant2 ? "gap-[12px] px-[18px] py-[14px]" : "gap-[10px] px-[13.155px] py-[9.155px]"}`}>
                              <div className={`relative rounded-[33554400px] shrink-0 ${isVariant2 ? "bg-[#00c950] size-[19px]" : "size-[28px]"}`} data-name="Text">
                                <div aria-hidden className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[33554400px] ${isVariant2 ? "border-[#05df72]" : "border-[#6a7282]"}`} />
                                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
                                  {["Default", "Variant3"].includes(property1) && <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">A</p>}
                                  {isVariant2 && (
                                    <div className="relative shrink-0 size-[14px]" data-name="Icon">
                                      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
                                        <g id="Icon">
                                          <path d={svgPaths.p3de7e600} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                        </g>
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className={`[word-break:break-word] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${isVariant2 ? 'font-["Inter:Medium",sans-serif] font-medium leading-[20px] text-[#7bf1a8]' : 'font-["Inter:Regular",sans-serif] font-normal leading-[normal] text-white'}`}>{isVariant3 ? "Cascade sheets" : isVariant2 ? "Cascade sheets style" : "Cascade sheets style"}</p>
                            </div>
                          </div>
                          <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none ${isVariant2 ? "border-2 border-[#00c950] rounded-[14px]" : "border-[#364153] border-[1.155px] rounded-[10px]"}`} />
                        </div>
                      </div>
                    </div>
                    <div className="h-[38.288px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
                        <div className="flex-[1_0_0] h-[38.288px] min-w-px relative rounded-[10px]" data-name="Text Input">
                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center px-[13.155px] py-[9.155px] relative size-full">
                              <div className="relative rounded-[33554400px] shrink-0 size-[28px]" data-name="Text">
                                <div aria-hidden className="absolute border-2 border-[#6a7282] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
                                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
                                  <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">B</p>
                                </div>
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Coded Style Sheet</p>
                            </div>
                          </div>
                          <div aria-hidden className="absolute border-[#364153] border-[1.155px] border-solid inset-0 pointer-events-none rounded-[10px]" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(0,201,80,0.1)] h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                        <div className={`flex-[1_0_0] min-w-px relative rounded-[14px] ${isVariant2OrVariant3 ? "bg-[rgba(251,44,54,0.2)] h-[38px]" : "bg-[rgba(43,127,255,0.2)] h-[40px]"}`} data-name="Text Input">
                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                            <div className={`bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full ${isVariant2OrVariant3 ? "px-[18px] py-[14px]" : "px-[17.15px] py-[13.15px]"}`}>
                              <div className={`relative rounded-[33554400px] shrink-0 ${isVariant2OrVariant3 ? "bg-[#fb2c36] h-[19px] w-[20px]" : "bg-[#2b7fff] size-[28px]"}`} data-name="Text">
                                <div aria-hidden className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[33554400px] ${isVariant2OrVariant3 ? "border-[#ff6467]" : "border-[#51a2ff]"}`} />
                                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
                                  {isVariant2OrVariant3 && (
                                    <div className="relative shrink-0 size-[14px]" data-name="Icon">
                                      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
                                        <g id="Icon">
                                          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                        </g>
                                      </svg>
                                    </div>
                                  )}
                                  {isDefault && <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">C</p>}
                                </div>
                              </div>
                              <p className={`[word-break:break-word] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${isVariant2OrVariant3 ? 'font-["Inter:Medium",sans-serif] font-medium leading-[20px] text-[#ffa2a2]' : 'font-["Inter:Regular",sans-serif] font-normal leading-[normal] text-white'}`}>{isVariant3 ? "Coded Style" : isVariant2 ? "Coded Style Sheet" : "Coded Style Sheet"}</p>
                            </div>
                          </div>
                          <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none rounded-[14px] ${isVariant2OrVariant3 ? "border-2 border-[#fb2c36]" : "border-[#51a2ff] border-[1.15px]"}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between py-[20px] relative size-full">
                  {isVariant2OrVariant3 && (
                    <div className="bg-[rgba(251,44,54,0.2)] content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[14px] shrink-0" data-name="Container">
                      <div className="relative shrink-0 size-[16px]" data-name="Icon">
                        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                          <g id="Icon">
                            <path d="M12 4L4 12" id="Vector" stroke="#FFA2A2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M4 4L12 12" id="Vector_2" stroke="#FFA2A2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </g>
                        </svg>
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#ffa2a2] text-[14px] whitespace-nowrap">Incorrect</p>
                    </div>
                  )}
                  {isDefault && (
                    <>
                      <div className="bg-[#111825] content-stretch flex h-[40px] items-center justify-center px-[20px] py-[4px] relative rounded-[10px] shrink-0 w-[99px]" data-name="Start Button">
                        <div aria-hidden className="absolute border border-[#424242] border-solid inset-0 pointer-events-none rounded-[10px]" />
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#b2b2b2] text-[14px] whitespace-nowrap">Previous</p>
                      </div>
                      <button className="bg-[#00c950] content-stretch cursor-pointer flex flex-col items-center justify-center py-[10px] relative rounded-[14px] shrink-0 w-[137px]" data-name="Container">
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Check Answer</p>
                      </button>
                    </>
                  )}
                  {isVariant2 && (
                    <button className="bg-[#2b7fff] content-stretch cursor-pointer flex flex-col items-center justify-center py-[10px] relative rounded-[14px] shrink-0 w-[165px]" data-name="Button">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Next Question →</p>
                    </button>
                  )}
                  {isVariant3 && (
                    <div className="bg-[#2b7fff] content-stretch flex flex-col items-center justify-center py-[10px] relative rounded-[14px] shrink-0 w-[165px]" data-name="Button">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Finish</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border-[1.155px] border-[rgba(54,65,83,0.2)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}