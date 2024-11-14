import React from 'react';
import Feed from '@/components/Feed';
import { Poppins, Montserrat } from 'next/font/google'
import Wave from 'react-wavify'
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { DescriptionText } from '@styles/typeAnimations/Type';

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin']
})

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ['latin']
})

const HomeDirectory = () => {
  return (
    <section className={`${poppins.className} w-screen h-screen bg-neonPrimary isolate`}>
      <Wave
      fill='url(#gradient)'
        paused={false}
        style={{
          height: '100dvh',
          width: '100%', 
          position: 'absolute',
          transform: 'rotate(180deg)',
          zIndex: -1,
          clipPath: `polygon(0 ${35 + Math.sin(Date.now() / 1000) * 5}%, 100% ${20 + Math.sin(Date.now() / 1000) * 5}%, 100% 100%, 0 100%)`,
          background: `linear-gradient(${45 + Math.sin(Date.now() / 1000) * 15}deg, #0b1727, #059212)`
        }}
        options={{
          height: 80,
          amplitude: 40,
          speed: 0.5,
          points: 3
        }}
      />
      <div className='flex h-full justify-evenly items-center mx-5 md:ml-20'>
        <div className="w-full lg:w-[50vw] h-full text-white flex flex-col justify-center">
          <h1 className={`${poppins.className} text-4xl text-main mb-2 drop-shadow-[0_0_10px_rgba(243,255,144,0.7)] font-bold tracking-wide`}>
            Discover &
          </h1>
          <h2 className={`${montserrat.className} text-5xl lg:text-6xl lg:animate-[shadow_1s_ease-in] text-main`}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(243,255,144,0.7))'
            }}>
            Share AI related prompts
          </h2>
          <DescriptionText textStyle={`${poppins.className} tracking-wide text-sm font-light mt-6 pr-12 box-border text-main max-w-[600px] animate-[flicker_2s_ease-in-out]`}/>
        </div>
        <div className='hidden lg:flex items-center w-[50vw]'>
          <div className='relative'>
          <Image 
          src="/assets/heroImages/homeImages/desktop.png" 
          alt="home-directory"
          width={1000}
          height={1000}
          className='w-full h-full'
          />
          <Image 
          src="/assets/heroImages/homeImages/device.png" 
          alt="home-directory"
          width={1000}
          height={1000}
          className='w-[30%] -left-[10%] h-full absolute top-5 max-w-[250px]'
          />
          <Image 
          src="/assets/heroImages/homeImages/contentUp.png" 
          alt="home-directory"
          width={1000}
          height={1000}
          className='w-[70%] right-[10%] h-[100px] absolute top-10 max-w-[500px]'
          />
          <Image 
          src="/assets/heroImages/homeImages/contentUp.png" 
          alt="home-directory"
          width={1000}
          height={1000}
          className='w-[70%] right-[10%] h-[100px] absolute bottom-10 max-w-[500px]'
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDirectory;