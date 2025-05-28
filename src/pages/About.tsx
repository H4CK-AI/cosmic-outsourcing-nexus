
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionGraphics from '@/components/MotionGraphics';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const stats = [
    { number: "500+", label: "Global Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team-1.jpg",
      expertise: ["Strategic Leadership", "Business Development", "Global Operations"]
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/images/team-2.jpg",
      expertise: ["Technology Strategy", "Digital Transformation", "AI & Machine Learning"]
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "/images/team-3.jpg",
      expertise: ["Process Optimization", "Quality Management", "Team Leadership"]
    },
    {
      name: "David Kim",
      role: "Legal Director",
      image: "/images/team-4.jpg",
      expertise: ["Legal Process Management", "Compliance", "Risk Assessment"]
    }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for perfection in every project, delivering solutions that exceed expectations."
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge technologies to provide forward-thinking business solutions."
    },
    {
      title: "Integrity",
      description: "Building trust through transparent communication and ethical business practices."
    },
    {
      title: "Partnership",
      description: "Working closely with clients as strategic partners in their growth journey."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <MotionGraphics />
      <Enhanced3DBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold cosmic-text-gradient mb-6"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  About Nexvora
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/70 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Pioneering the future of outsourcing with innovative solutions that transform businesses worldwide
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl font-bold cosmic-text-gradient mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl font-bold cosmic-text-gradient mb-6">Our Mission</h2>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    At Nexvora, we believe in the power of strategic outsourcing to unlock business potential. 
                    Our mission is to provide world-class business process management, legal process outsourcing, 
                    and IT services that enable our clients to focus on their core competencies while we handle 
                    the operational excellence.
                  </p>
                  <p className="text-white/70 text-lg leading-relaxed">
                    We combine cutting-edge technology with human expertise to deliver scalable, efficient, 
                    and cost-effective solutions that drive growth and innovation across industries.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <ImagePlaceholder 
                    src="/images/about-hero.jpg"
                    alt="About Nexvora"
                    className="rounded-lg shadow-2xl"
                  />
                </motion.div>
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
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold cosmic-text-gradient mb-4">Our Values</h2>
                <div className="w-24 h-1 bg-cosmic-accent mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20 hover:border-cosmic-accent/40 transition-all duration-300 card-3d text-center p-6">
                      <CardContent className="p-0">
                        <h3 className="text-xl font-semibold mb-4 cosmic-text-gradient">{value.title}</h3>
                        <p className="text-white/70">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold cosmic-text-gradient mb-4">Meet Our Leadership</h2>
                <div className="w-24 h-1 bg-cosmic-accent mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20 hover:border-cosmic-accent/40 transition-all duration-300 card-3d group">
                      <CardContent className="p-6 text-center">
                        <div className="relative mb-4">
                          <ImagePlaceholder 
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mx-auto object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-cosmic-highlight transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-cosmic-highlight mb-3">{member.role}</p>
                        <div className="flex flex-wrap justify-center gap-1">
                          {member.expertise.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="outline" 
                              className="text-xs border-cosmic-highlight/30 text-cosmic-highlight"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
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
