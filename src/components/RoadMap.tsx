import React from 'react';
import TreeImage from '../assets/images/Tree.png';
import threadImage from '../assets/images/thread.png';
const RoadMap = () => {
    return (
        <div className="relative min-h-screen bg-white px-8 py-16 overflow-hidden">
            <div className="w-full bg-white py-8 px-4 sm:py-12 sm:px-6 md:py-14 md:px-8 lg:py-16 lg:px-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-[50px] font-semibold font-poppins leading-relaxed mb-6">
                    <span className="text-black/30  mb-4 sm:mb-5 md:mb-6">
                        Our 5 years {' '}
                    </span>
                    <span className="text-black/70  mb-4 sm:mb-5 md:mb-6">
                        Roadmap
                    </span>
                </h2>
                <p className="text-[28px] text-[#000000] max-w-5xl">
                    From strong foundations today to global impact tomorrow — our 
                    <br />
                     journey has only begun
                </p>
            </div>

            <div className="absolute bottom-10 right-0 w-96 h-auto">

                <img src={TreeImage} alt="RoadMap" className=" object-cover" />
            </div>

            <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-24 mx-auto relative mt-12">
                <img
                    src={threadImage}
                    alt="thread"
                    className="absolute top-28 left-[400px] w-full h-auto max-w-md  pointer-events-none object-contain"
                    style={{ zIndex: 1 }}
                />

                <div className="relative mb-32" style={{ zIndex: 2 }}>
                    <h2 className="text-[44px] font-bold text-[#3E3EE3] mb-2">Phase 1</h2>
                    <div className=" max-w-md">
                        <p className="text-[#000000] font-poppins  font-semibold text-base leading-relaxed">
                            Launch Swapdots in Bangalore;<br />
                            Establish Prayacha Foods supply<br />
                            chain.
                        </p>
                    </div>
                </div>

                <div className="relative top-10 ml-auto max-w-md" style={{ zIndex: 2 }}>
                    <h2 className="text-[44px] font-bold text-[#3E3EE3] mb-2">Phase 2</h2>
                    <div className=" ">
                        <p className="text-[#000000] font-poppins  font-semibold text-base leading-relaxed">
                            Expand to South India (Tamil Nadu,<br />
                            Andhra, Telangana). Launch<br />
                            "Prayacha Lifestyle" (Eco-fashion).
                        </p>
                    </div>
                </div>

                <div className="relative" style={{ zIndex: 2 }}>
                    <h2 className="text-[44px] font-bold text-[#3E3EE3]">Phase 3</h2>
                    <div className=" rounded-lg  max-w-xl">
                        <ul className="space-y-3 text-[#000000] font-poppins  font-semibold text-base leading-relaxed">
                            <li className="flex items-start">
                                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-[#000000] rounded-full flex-shrink-0"></span>
                                <span className="leading-relaxed">
                                    Global Expansion: Take Swapdots to South<br />
                                    Asian markets.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                                <span className="leading-relaxed">
                                    Offline Presence: Open "Prayacha Experience<br />
                                    Stores" and "Swap Spots" in major metros.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                                <span className="leading-relaxed">
                                    Social Impact: Partner with 1000+ NGOs to<br />
                                    channel Giveaways to the needy
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadMap;