
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionGraphics from '@/components/MotionGraphics';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      category: "Business Process Management",
      items: [
        {
          title: "Customer Support",
          description: "24/7 multilingual customer service solutions",
          features: ["Live Chat", "Email Support", "Phone Support", "Social Media"]
        },
        {
          title: "Data Entry & Processing",
          description: "Accurate and efficient data management services",
          features: ["Data Mining", "Data Cleansing", "Database Management", "Digital Conversion"]
        },
        {
          title: "Finance & Accounting",
          description: "Comprehensive financial management solutions",
          features: ["Bookkeeping", "Payroll Processing", "Tax Preparation", "Financial Analysis"]
        }
      ]
    },
    {
      category: "Legal Process Outsourcing",
      items: [
        {
          title: "Legal Research",
          description: "Comprehensive legal research and analysis",
          features: ["Case Law Research", "Statutory Research", "Regulatory Analysis", "Legal Memoranda"]
        },
        {
          title: "Contract Management",
          description: "End-to-end contract lifecycle management",
          features: ["Contract Drafting", "Review & Analysis", "Compliance Monitoring", "Risk Assessment"]
        },
        {
          title: "Litigation Support",
          description: "Professional litigation assistance services",
          features: ["Document Review", "eDiscovery", "Deposition Summaries", "Trial Preparation"]
        }
      ]
    },
    {
      category: "IT Services",
      items: [
        {
          title: "Software Development",
          description: "Custom software solutions for modern businesses",
          features: ["Web Applications", "Mobile Apps", "API Development", "System Integration"]
        },
        {
          title: "Cloud Solutions",
          description: "Scalable cloud infrastructure and migration services",
          features: ["Cloud Migration", "Infrastructure Management", "DevOps", "Security Solutions"]
        },
        {
          title: "Data Analytics",
          description: "Transform data into actionable business insights",
          features: ["Business Intelligence", "Machine Learning", "Predictive Analytics", "Data Visualization"]
        }
      ]
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
                  Our Services
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/70 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Comprehensive outsourcing solutions designed to scale your business and optimize operations across all industries
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Services Sections */}
          {services.map((category, categoryIndex) => (
            <section key={category.category} className="py-16">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="text-4xl font-bold cosmic-text-gradient mb-4 text-center">
                    {category.category}
                  </h2>
                  <div className="w-24 h-1 bg-cosmic-accent mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20 hover:border-cosmic-accent/40 transition-all duration-300 card-3d group">
                        <CardHeader>
                          <CardTitle className="text-xl text-white group-hover:text-cosmic-highlight transition-colors">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-white/70">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-cosmic-highlight">Key Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.features.map((feature, featureIndex) => (
                                <Badge 
                                  key={featureIndex}
                                  variant="outline" 
                                  className="text-xs border-cosmic-highlight/30 text-cosmic-highlight hover:bg-cosmic-highlight/10"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <Button 
                              className="w-full mt-4 cosmic-button"
                              variant="ghost"
                            >
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-cosmic-subtle to-cosmic-accent/30 backdrop-blur-md border border-cosmic-accent/20 rounded-xl p-8 md:p-12 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 cosmic-text-gradient">Ready to Transform Your Business?</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Let our expert team help you identify the perfect outsourcing solutions for your unique business needs. Start your journey to operational excellence today.
                </p>
                <Button className="cosmic-button text-lg px-8">Get Started Today</Button>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Services;
