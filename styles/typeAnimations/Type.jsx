'use client'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ['latin']
});
const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin']
});


export const DescriptionText = ({textStyle}) => {
  return (
    <TypeAnimation className={textStyle}
          sequence={[
            'Welcome to Prompt Nation - where AI meets creativity. Share and explore powerful, curated prompts that unlock the full potential of AI across diverse domains. From coding wizardry to artistic inspiration, discover prompts that transform ideas into reality.',
            2000,
          ]}
          wrapper='p'
          speed={50}
          repeat={0}
    />
  )
}

export const WelcomeText = ({textStyle}) =>{
  return (
    <TypeAnimation 
    className={textStyle}
    sequence={[
      'Welome to prompt nation.',
      1000,
    ]}
    wrapper='div'
    speed={50}
    repeat={0}
    />
  )
}

export const LoadingText = () =>{
  return(
    <TypeAnimation
    sequence={['Loading...', 1000]}
    wrapper='span'
    speed={50}
    repeat={10}
    />
  )
}