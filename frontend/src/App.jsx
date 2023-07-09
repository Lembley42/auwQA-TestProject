import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Quiz from './Quiz/Quiz'
import './App.css'

import checkedImage from './assets/checked.png'
import warningImage from './assets/warning.png'
import dangerImage from './assets/danger.png'
import cancelImage from './assets/cancel.png'

import userImage from './assets/user.png'
import goalImage from './assets/goal.png'
import clickImage from './assets/cursor.png'

import googleadsImage from './assets/logos/adwords.png'
import facebookImage from './assets/logos/facebook.png'
import linkedinImage from './assets/logos/linkedin.png'
import pinterestImage from './assets/logos/pinterest.png'

import usercentricsImage from './assets/logos/usercentrics.png'
import cookiebotImage from './assets/logos/cookiebot.png'
import ccm19Image from './assets/logos/ccm19.png'



function App() {
  const questions = [
    {
      question: "Wie wichtig ist Datenschutz für den Kunden",
      options: [
        {value: "Normal", imageSrc: checkedImage},
        {value: "Wichtig", imageSrc: dangerImage},
        {value: "Besonders wichtig", imageSrc: warningImage}
      ],
      type: "single"
    },
    {
      question: "Ist der Kunde preissensibel?",
      options: [
        {value: "Nein", imageSrc: cancelImage},
        {value: "Ja", imageSrc: checkedImage}
      ],
      type: "single"
    },
    {
      question: "Was will der Kunde messen?",
      options: [
        {value: "Seitenaufrufe", imageSrc: clickImage},
        {value: "Nutzerverhalten", imageSrc: userImage},
        {value: "Conversions", imageSrc: goalImage},
      ],
      type: "multiple"
    },
    {
      question: "Über welche Kanäle plant der Kunde Marketing",
      options: [
        {value: "Google Ads", imageSrc: googleadsImage},
        {value: "Facebook/Instagram", imageSrc: facebookImage},
        {value: "Pinterest", imageSrc: pinterestImage},
        {value: "LinkedIn", imageSrc: linkedinImage}
      ],
      type: "multiple"
    },
    {
      question: "Consent System",
      options: [
        {value: "UserCentrics", imageSrc: usercentricsImage},
        {value: "CookieBot", imageSrc: cookiebotImage},
        {value: "CCM19", imageSrc: ccm19Image},
      ],
      type: "single",
      setRecommendations: (options, answers) => {
        const datenschutzAnswer =
          answers["Wie wichtig ist Datenschutz für den Kunden"] &&
          answers["Wie wichtig ist Datenschutz für den Kunden"][0];
      
        const preissensibelAnswer =
          answers["Ist der Kunde preissensibel?"] &&
          answers["Ist der Kunde preissensibel?"][0];
      
        if (datenschutzAnswer === "Besonders wichtig" && preissensibelAnswer === "Ja") {
          options.find((opt) => opt.value === "UserCentrics").recommend = false;
          options.find((opt) => opt.value === "CookieBot").recommend = false;
          options.find((opt) => opt.value === "CCM19").recommend = true;
        } else if (preissensibelAnswer === "Ja") {
          options.find((opt) => opt.value === "UserCentrics").recommend = false;
          options.find((opt) => opt.value === "CookieBot").recommend = true;
          options.find((opt) => opt.value === "CCM19").recommend = false;
        } else {
          options.find((opt) => opt.value === "UserCentrics").recommend = true;
          options.find((opt) => opt.value === "CookieBot").recommend = false;
          options.find((opt) => opt.value === "CCM19").recommend = false;
        }
      
        return options;
      }
    },
    {
      question: "Analyse-Tools",
      options: [
        {value: "Google Analytics", imageSrc: googleadsImage},
        {value: "Matomo", imageSrc: facebookImage},
        {value: "Matomo Premise", imageSrc: pinterestImage},
        {value: "Matomo Server-Log", imageSrc: linkedinImage},
        {value: "HotJar", imageSrc: linkedinImage}
      ],
      type: "multiple",
      setRecommendations: (options, answers) => {
        const datenschutzAnswer =
          answers["Wie wichtig ist Datenschutz für den Kunden"] &&
          answers["Wie wichtig ist Datenschutz für den Kunden"][0];

        const preissensibelAnswer =
          answers["Ist der Kunde preissensibel?"] &&
          answers["Ist der Kunde preissensibel?"][0];

        const messenAnswer =
          answers["Was will der Kunde messen?"];
        
        
        if (datenschutzAnswer === "Besonders wichtig" && messenAnswer === "Seitenaufrufe") {
          options.find((opt) => opt.value === "Google Analytics").recommend = false;
          options.find((opt) => opt.value === "Matomo").recommend = false;
          options.find((opt) => opt.value === "Matomo Premise").recommend = false;
          options.find((opt) => opt.value === "Matomo Server-Log").recommend = true;
          options.find((opt) => opt.value === "HotJar").recommend = false;
        } 

        else if (datenschutzAnswer === "Besonders wichtig" || datenschutzAnswer === "Wichtig") {
          options.find((opt) => opt.value === "Google Analytics").recommend = false;
          options.find((opt) => opt.value === "Matomo").recommend = false;
          options.find((opt) => opt.value === "Matomo Premise").recommend = true;
          options.find((opt) => opt.value === "Matomo Server-Log").recommend = false;
          options.find((opt) => opt.value === "HotJar").recommend = false;
        }
          
        else if (preissensibelAnswer === "Ja") {
          options.find((opt) => opt.value === "Google Analytics").recommend = true;
          options.find((opt) => opt.value === "Matomo").recommend = false;
          options.find((opt) => opt.value === "Matomo Premise").recommend = false;
          options.find((opt) => opt.value === "Matomo Server-Log").recommend = false;
          options.find((opt) => opt.value === "HotJar").recommend = false;
        }

        else {
          options.find((opt) => opt.value === "Google Analytics").recommend = false;
          options.find((opt) => opt.value === "Matomo").recommend = true;
          options.find((opt) => opt.value === "Matomo Premise").recommend = false;
          options.find((opt) => opt.value === "Matomo Server-Log").recommend = false;
          options.find((opt) => opt.value === "HotJar").recommend = true;
        }

        return options;
      }
    },
  ];

  return (
    <div className="App">
      <Quiz questions={questions} />
    </div>
  );
}

export default App
