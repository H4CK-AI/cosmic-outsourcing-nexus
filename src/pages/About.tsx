import { useRef, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionGraphics from '@/components/MotionGraphics';
import EnhancedAnimatedBackground from '@/components/EnhancedAnimatedBackground';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Avatar } from "@/components/ui/avatar";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TeamMember = ({ name, role, imageSrc, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <Avatar className="h-32 w-32 mb-4 ring-2 ring-cosmic-accent/30 ring-offset-4 ring-offset-cosmic-dark">
        <ImagePlaceholder 
          src={imageSrc}
          alt={name}
          className="object-cover w-full h-full rounded-full"
        />
      </Avatar>
      <h4 className="text-xl font-semibold mb-1">{name}</h4>
      <p className="text-cosmic-highlight">{role}</p>
    </motion.div>
  );
};

const CounterItem = ({ value, label, delay = 0 }) => {
  const counterRef = useRef(null);
  
  useEffect(() => {
    const counter = counterRef.current;
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: value,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
        });
      },
      once: true
    });
  }, [value]);

  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center p-6"
    >
      <h3 ref={counterRef} className="text-5xl font-bold cosmic-text-gradient mb-2">0</h3>
      <p className="text-white/70">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [1, 0.8, 0.4, 0]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-cosmic-dark relative">
      <MotionGraphics />
      <EnhancedAnimatedBackground />

      <div className="relative z-10 min-h-screen bg-cosmic-dark/90">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative h-[70vh] flex items-center overflow-hidden" ref={targetRef}>
            <motion.div 
              className="absolute inset-0 z-0"
              style={{ 
                scale,
                opacity,
              }}
            >
              <ImagePlaceholder
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
                alt="About Nexvora"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-cosmic-dark/70 z-0" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold cosmic-text-gradient mb-6"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  About Nexvora
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl max-w-3xl mx-auto text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  We're on a mission to revolutionize outsourcing with advanced solutions that help businesses thrive
                </motion.p>
              </motion.div>
            </div>
          </section>
          
          {/* Our Story */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-6">Our Story</h2>
                  <p className="text-white/70 mb-4">
                    Founded in 2015, Nexvora emerged from a vision to transform how businesses approach outsourcing. We recognized that traditional outsourcing models were becoming obsolete in the face of rapid technological advancement.
                  </p>
                  <p className="text-white/70 mb-4">
                    What began as a small team of passionate experts has grown into a global company with offices in 5 countries and over 500 skilled professionals. Our growth has been driven by our unwavering commitment to innovation and excellence.
                  </p>
                  <p className="text-white/70">
                    Today, we continue to push boundaries by leveraging cutting-edge technologies like AI and automation to deliver outsourcing solutions that not only meet current needs but anticipate future challenges.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 rounded-xl bg-cosmic-accent/10 blur-xl z-0"></div>
                  <ImagePlaceholder
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Team meeting"
                    className="w-full h-auto rounded-xl relative z-10 border border-cosmic-accent/20"
                  />
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="py-16 bg-cosmic-subtle/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <CounterItem value="500" label="Team Members" delay={0} />
                <CounterItem value="300" label="Projects Completed" delay={0.1} />
                <CounterItem value="95" label="Client Satisfaction %" delay={0.2} />
                <CounterItem value="15" label="Industry Awards" delay={0.3} />
              </div>
            </div>
          </section>
          
          {/* Values Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">Our Core Values</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  The principles that guide everything we do at Nexvora
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Innovation",
                    description: "We constantly explore new technologies and methodologies to deliver cutting-edge solutions.",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  },
                  {
                    title: "Excellence",
                    description: "We are committed to delivering the highest quality solutions that exceed expectations.",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  },
                  {
                    title: "Partnership",
                    description: "We build lasting relationships with our clients based on trust, transparency and mutual growth.",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  }
                ].map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="bg-cosmic-subtle/30 backdrop-blur-sm border border-cosmic-accent/20 rounded-xl p-8 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-cosmic-accent/10 text-cosmic-highlight">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-white/70">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Leadership Team */}
          <section className="py-20 bg-gradient-to-b from-cosmic-dark via-cosmic-subtle/50 to-cosmic-dark">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">Our Leadership Team</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Meet the visionaries driving Nexvora's mission forward
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <TeamMember 
                  name="Alex Chen" 
                  role="CEO & Founder" 
                  imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  delay={0}
                />
                <TeamMember 
                  name="Sarah Johnson" 
                  role="CTO" 
                  imageSrc="https://images.unsplash.com/photo-1494790108755-2616b612b13c?w=400&h=400&fit=crop&crop=face" 
                  delay={0.1}
                />
                <TeamMember 
                  name="Michael Patel" 
                  role="COO" 
                  imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                  delay={0.2}
                />
                <TeamMember 
                  name="Jessica Wong" 
                  role="CFO" 
                  imageSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" 
                  delay={0.3}
                />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default About;
