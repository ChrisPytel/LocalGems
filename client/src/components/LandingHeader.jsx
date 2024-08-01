import { useEffect, useState } from "react";
import "../styles/Main.scss";
import "../styles/LandingHeader.scss";


const landingHeader = function() {

useEffect(() => {
  async function landingGET() {
    const expressFetch = await fetch(`http://localhost:5050/landing-page`);          //route has to end in /landing-page as per definition in server.js
    if (!expressFetch.ok) {
      const message = `An error occurred: ${expressFetch.statusText}`;
      console.error(message);
      return;
    }
    const expressResponse = await expressFetch.json();
    console.log(`Our get response is: `, expressResponse);
  }  
  landingGET();
  return;
}, []);

  
    return (
      <>
      <div className="landing-header">
        <div className="landing-header-title">
          <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
            <path id="text-path" d="M73.2,148.6c6-4.1,45-45,175-45
c111.3,1.2,170.8,45,175,45"/>
            <text>
              <textPath href="#text-path" startOffset="50%" textAnchor="middle">
                Local Gems
              </textPath>
            </text>
          </svg>
        </div>

        <div className="landing-header-img">
          <img src="https://images2.imgbox.com/56/de/MDj6u5BW_o.png"></img>
        </div>
      </div>
      </>
  );
};

export default landingHeader;
