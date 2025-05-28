
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionGraphics from '@/components/MotionGraphics';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      title: "General Inquiries",
      email: "info@nexvora.com",
      phone: "+1 (555) 123-4567"
    },
    {
      title: "Business Development",
      email: "business@nexvora.com",
      phone: "+1 (555) 123-4568"
    },
    {
      title: "Support",
      email: "support@nexvora.com",
      phone: "+1 (555) 123-4569"
    }
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Business Ave, Suite 100",
      country: "United States",
      timezone: "EST"
    },
    {
      city: "London",
      address: "456 Corporate St, Floor 5",
      country: "United Kingdom",
      timezone: "GMT"
    },
    {
      city: "Singapore",
      address: "789 Tech Hub, Level 10",
      country: "Singapore",
      timezone: "SGT"
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
                  Contact Us
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/70 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Ready to transform your business? Get in touch with our experts to discuss your outsourcing needs
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Contact Form & Info Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20 h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl cosmic-text-gradient">Send us a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-white/70 text-sm mb-2 block">Name *</label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="bg-cosmic-dark/50 border-cosmic-accent/30 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-white/70 text-sm mb-2 block">Email *</label>
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="bg-cosmic-dark/50 border-cosmic-accent/30 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-white/70 text-sm mb-2 block">Company</label>
                          <Input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="bg-cosmic-dark/50 border-cosmic-accent/30 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-white/70 text-sm mb-2 block">Message *</label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="bg-cosmic-dark/50 border-cosmic-accent/30 text-white resize-none"
                          />
                        </div>
                        <Button type="submit" className="w-full cosmic-button">
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold cosmic-text-gradient mb-6">Get in Touch</h3>
                    <div className="space-y-4">
                      {contactInfo.map((info, index) => (
                        <Card key={index} className="bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-cosmic-highlight mb-2">{info.title}</h4>
                            <p className="text-white/70 text-sm mb-1">Email: {info.email}</p>
                            <p className="text-white/70 text-sm">Phone: {info.phone}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold cosmic-text-gradient mb-6">Our Offices</h3>
                    <div className="space-y-4">
                      {offices.map((office, index) => (
                        <Card key={index} className="bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-cosmic-highlight">{office.city}</h4>
                              <Badge variant="outline" className="border-cosmic-highlight/30 text-cosmic-highlight">
                                {office.timezone}
                              </Badge>
                            </div>
                            <p className="text-white/70 text-sm mb-1">{office.address}</p>
                            <p className="text-white/70 text-sm">{office.country}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Card className="bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-semibold text-cosmic-highlight mb-3">24/7 Support Available</h4>
                      <p className="text-white/70 text-sm mb-4">
                        Our global team ensures round-the-clock support for all your business needs.
                      </p>
                      <Button variant="outline" className="border-cosmic-highlight/30 text-cosmic-highlight hover:bg-cosmic-highlight/10">
                        Emergency Support
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
