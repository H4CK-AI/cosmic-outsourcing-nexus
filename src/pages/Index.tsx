
import { useRef, useEffect } from 'react'
import Header from '@/components/Header'
import ThreeDScene from '@/components/ThreeDScene'
import LiquidBackground from '@/components/LiquidBackground'
import AnimatedBackground from '@/components/AnimatedBackground'
import MotionGraphics from '@/components/MotionGraphics'
import ServiceSection from '@/components/ServiceSection'
import BenefitsSection from '@/components/BenefitsSection'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    ScrollTrigger.refresh()
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div className="relative">
      <LiquidBackground>
        <div></div>
      </LiquidBackground>
      <AnimatedBackground />
      <MotionGraphics />
      
      <div ref={scrollContainerRef} className="scene-container bg-cosmic-dark relative z-10">
        <Header />
        
        <section id="hero" className="h-screen relative">
          <ThreeDScene />
        </section>
        
        <ServiceSection />
        <BenefitsSection />
        <CallToAction />
        <Footer />
      </div>
    </div>
  )
}

export default Index
