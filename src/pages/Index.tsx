
import { useRef, useEffect } from 'react'
import Header from '@/components/Header'
import ThreeDScene from '@/components/ThreeDScene'
import LiquidBackground from '@/components/LiquidBackground'
import AnimatedBackground from '@/components/AnimatedBackground'
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
    // Initialize any GSAP animations or scrolltriggers here
    ScrollTrigger.refresh()
    
    // Cleanup when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <LiquidBackground>
      <AnimatedBackground />
      <div ref={scrollContainerRef} className="scene-container bg-cosmic-dark relative z-10">
        {/* Fixed Header */}
        <Header />
        
        {/* Hero Section with 3D Scene */}
        <section id="hero" className="h-screen relative">
          <ThreeDScene />
        </section>
        
        {/* Services Section */}
        <ServiceSection />
        
        {/* Benefits Section */}
        <BenefitsSection />
        
        {/* Call To Action */}
        <CallToAction />
        
        {/* Footer */}
        <Footer />
      </div>
    </LiquidBackground>
  )
}

export default Index
