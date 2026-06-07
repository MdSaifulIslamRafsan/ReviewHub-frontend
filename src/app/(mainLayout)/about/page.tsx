import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Users,
  Shield,
  Star,
  MessageSquare,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

import { TeamMemberCard } from "@/components/TeamMemberCard";
import { ValueCard } from "@/components/ValueCard";
import CTA from "@/components/HomePage/CTA";

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Mission Section */}
      <section className="pb-20 pt-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              ReviewHub connects consumers with authentic product experiences,
              helping everyone make better purchasing decisions through
              transparency and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-gray-800 border-primary/10 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-5">
                  <Target className="h-6 w-6 text-primary dark:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To create a world where every consumer has access to
                  trustworthy information before making a purchase.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-gray-800 border-primary/10 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-5">
                  <Clock className="h-6 w-6 text-primary dark:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Our Story
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Founded in 2018 by Sarah Johnson, ReviewHub grew from a small
                  project to a thriving community of over 250,000 users.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-gray-800 border-primary/10 dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-5">
                  <CheckCircle className="h-6 w-6 text-primary dark:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Our Approach
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We combine rigorous moderation, verification systems, and
                  community engagement to ensure review quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary/5 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-center mb-4"> Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              These core values shape everything we do at ReviewHub, from how we
              build our platform to how we interact with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={<Shield className="h-6 w-6 text-primary dark:text-white" />}
              title="Authenticity"
              description="We believe in the power of genuine experiences. Every review on our platform represents a real user's honest opinion."
            />

            <ValueCard
              icon={<Users className="h-6 w-6 text-primary dark:text-white" />}
              title="Community"
              description="We foster a supportive environment where users can share insights and help each other make better purchasing decisions."
            />

            <ValueCard
              icon={<Star className="h-6 w-6 text-primary dark:text-white" />}
              title="Quality"
              description="We maintain high standards for reviews, ensuring they're detailed, helpful, and provide meaningful insights."
            />

            <ValueCard
              icon={
                <TrendingUp className="h-6 w-6 text-primary dark:text-white" />
              }
              title="Innovation"
              description="We continuously improve our platform based on user feedback and emerging technologies to provide the best experience."
            />

            <ValueCard
              icon={
                <MessageSquare className="h-6 w-6 text-primary dark:text-white" />
              }
              title="Transparency"
              description="We're open about how our platform works, how reviews are moderated, and how we sustain our business."
            />

            <ValueCard
              icon={<Award className="h-6 w-6 text-primary dark:text-white" />}
              title="Accessibility"
              description="We're committed to making product information accessible to everyone, regardless of background or expertise."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white dark:bg-primary/90">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-center mb-4"> Our Impact</h2>
            <p className="text-xl text-white/90">
              The numbers that showcase our {`community's`} collective impact
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">250K+</div>
              <div className="text-xl font-medium mb-1">Active Users</div>
              <div className="text-white/70">and growing daily</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1.2M+</div>
              <div className="text-xl font-medium mb-1">Reviews</div>
              <div className="text-white/90">across all categories</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">3.5M+</div>
              <div className="text-xl font-medium mb-1">Comments</div>
              <div className="text-white/90">fostering discussion</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-xl font-medium mb-1">Satisfaction</div>
              <div className="text-white/90">from our community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-center mb-4"> Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A passionate team dedicated to building the most trusted review
              platform
            </p>
          </div>

          <Tabs defaultValue="leadership" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-primary/5 dark:bg-gray-800">
                <TabsTrigger
                  value="leadership"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 dark:text-white"
                >
                  Leadership
                </TabsTrigger>
                <TabsTrigger
                  value="engineering"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 dark:text-white"
                >
                  Engineering
                </TabsTrigger>
                <TabsTrigger
                  value="community"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 dark:text-white"
                >
                  Community
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="leadership">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMemberCard
                  name="Sarah Johnson"
                  role="Founder & CEO"
                  bio="Former product manager with a passion for consumer advocacy and transparency in product reviews."
                  imageSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww"
                  linkedin="https://linkedin.com"
                  twitter="https://twitter.com"
                />

                <TeamMemberCard
                  name="Michael Chen"
                  role="CTO"
                  bio="Tech enthusiast with 15+ years experience building community platforms and scalable web applications."
                  imageSrc="https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                  linkedin="https://linkedin.com"
                  github="https://github.com"
                />

                <TeamMemberCard
                  name="Aisha Patel"
                  role="Head of Content"
                  bio="Former consumer journalist who ensures our review standards remain high and content is valuable."
                  imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                  linkedin="https://linkedin.com"
                  twitter="https://twitter.com"
                />
              </div>
            </TabsContent>

            <TabsContent value="engineering">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMemberCard
                  name="David Kim"
                  role="Lead Engineer"
                  bio="Full-stack developer with expertise in building scalable web applications and user-friendly interfaces."
                  imageSrc="https://images.unsplash.com/photo-1542385262-cdf06b302c2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                  github="https://github.com"
                  linkedin="https://linkedin.com"
                />

                <TeamMemberCard
                  name="Elena Rodriguez"
                  role="Frontend Developer"
                  bio="UI/UX specialist focused on creating intuitive and accessible interfaces for all users."
                  imageSrc="https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                  github="https://github.com"
                  linkedin="https://linkedin.com"
                />

                <TeamMemberCard
                  name="Marcus Johnson"
                  role="Backend Developer"
                  bio="Database and API specialist ensuring our platform remains fast, secure, and reliable."
                  imageSrc="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                  github="https://github.com"
                  linkedin="https://linkedin.com"
                />
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMemberCard
                  name="Olivia Taylor"
                  role="Community Manager"
                  bio="Dedicated to fostering meaningful connections within our reviewer community and moderating content."
                  imageSrc="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                  twitter="https://twitter.com"
                  linkedin="https://linkedin.com"
                />

                <TeamMemberCard
                  name="James Wilson"
                  role="Content Moderator"
                  bio="Ensures all reviews meet our quality standards and community guidelines before publication."
                  imageSrc="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJzb258ZW58MHx8MHx8fDA%3D"
                  linkedin="https://linkedin.com"
                  twitter="https://twitter.com"
                />

                <TeamMemberCard
                  name="Sophia Lee"
                  role="User Support Specialist"
                  bio="Helps users navigate the platform and resolve any issues they encounter while using ReviewHub."
                  imageSrc="https://plus.unsplash.com/premium_photo-1673757120943-a6d3b9a3f435?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                  linkedin="https://linkedin.com"
                  twitter="https://twitter.com"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-primary/5 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-center mb-4">
              {" "}
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From idea to community The key milestones in {`ReviewHub's`}{" "}
              evolution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-white text-xl font-bold">
                    2018
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    The Beginning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    ReviewHub started as a small project by our founder Sarah
                    Johnson, who was frustrated by the lack of honest product
                    reviews online. The initial platform focused on electronics
                    reviews.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center md:order-last">
                  <div className="h-20 w-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-white text-xl font-bold">
                    2020
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Expanding Categories
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We expanded to cover all major product categories and
                    introduced our community voting system to highlight the most
                    helpful reviews. Our user base grew to 50,000 active
                    members.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-white text-xl font-bold">
                    2021
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Mobile App Launch
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Launched our mobile app, allowing users to read and write
                    reviews on the go, and reached our first 100,000 registered
                    users. We also introduced the verification system for
                    purchases.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center md:order-last">
                  <div className="h-20 w-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-white text-xl font-bold">
                    2023
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Today & Beyond
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Now with over 250,000 active users and millions of reviews,
                    we continue to innovate and improve the platform based on
                    community feedback. {`We're`} working on AI-powered review
                    summaries and enhanced verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-20 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-center mb-4">FAQ</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find answers to common questions about ReviewHub
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left dark:text-white">
                  What is ReviewHub?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  ReviewHub is a community-driven platform where users can share
                  honest product reviews, helping others make informed
                  purchasing decisions. Our goal is to create the most trusted
                  source of product information online.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left dark:text-white">
                  Is ReviewHub free to use?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  Yes, ReviewHub is completely free for basic use. You can
                  browse reviews, create an account, and post your own reviews
                  at no cost. We do offer premium features for those who want
                  enhanced capabilities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left dark:text-white">
                  How does ReviewHub verify reviews?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  We use a combination of automated systems and human moderation
                  to verify reviews. Users can upload purchase receipts to get a{" "}
                  {`"Verified Purchase"`} badge. We also use pattern recognition
                  to identify suspicious review activity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left dark:text-white">
                  Can I edit my review after posting?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  Yes, you can edit your review while {`it's`} in the pending
                  state. Once a review has been approved, {`you'll`} need to
                  contact our support team if you need to make significant
                  changes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left dark:text-white">
                  How do I become a verified reviewer?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  Verified reviewer status is granted to users who have
                  consistently contributed high-quality reviews and maintained a
                  positive standing in the community. Continue posting helpful
                  reviews to qualify.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
