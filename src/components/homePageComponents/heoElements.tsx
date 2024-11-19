import React from "react";
import HeroElement from "./heroElement";
import { HiAcademicCap, HiMiniGift, HiMiniGlobeAmericas, HiMiniVariable } from "react-icons/hi2";
import { HiUser } from "react-icons/hi";
import { initThemeParams } from "@telegram-apps/sdk";

function HeroElements({role}:{role?:string}) {
  const datas = [
    {
      title: "Question",
      description: "Questions from your university",
      variant: "primary",
      route:'questions'
    },
    {
      title: "Scholarship Programs",
      description: "Your overseas collage is here",
      route:'programs'
    },
    {
      title: "Field guide",
      description: "Guide you to choose study field",
      route:'guide'
    },
    {
      title: "Earn lemons",
      description: "Earn coins to unlock courses",
      route:'earn'
    },
    {
      title: "Admin portal",
      description: "Edit resourses",
      route:'admin'
    },
  ];

  const [ps,f] = initThemeParams()
  return (
    <div  className={`bg-white font-sans flex-grow  p-2 w-full`} >
      <p className="bg-white self-start w-full text-sm font-semibold px-4">
        Activity
      </p>
    
          <HeroElement
            title={datas[0].title}
            description={datas[0].description}
            variant={datas[0].variant}
            route={datas[0].route}
          >
            <HiMiniVariable/>
          </HeroElement>
          <HeroElement
            title={datas[1].title}
            description={datas[1].description}
            variant={datas[1].variant}
            route={datas[1].route}
          >
            <HiMiniGlobeAmericas/>
          </HeroElement>
          <HeroElement
            title={datas[2].title}
            description={datas[2].description}
            variant={datas[2].variant}
            route={datas[2].route}
          >
            <HiAcademicCap/>
            
          </HeroElement>
          <HeroElement
            title={datas[3].title}
            description={datas[3].description}
            variant={datas[3].variant}
            route={datas[3].route}
          >
            <HiMiniGift/>
            
          </HeroElement>
         {role && role === 'admin' && <HeroElement
            title={datas[4].title}
            description={datas[4].description}
            variant={datas[4].variant}
            route={datas[4].route}
          >
            <HiUser/>
            
          </HeroElement>}
    
    </div>
  );
}

export default HeroElements;
