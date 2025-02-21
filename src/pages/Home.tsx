import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 border-b border-white/10">
        <h1 className="text-6xl font-bold mb-6">Interactive Quiz Platform</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Elevate your knowledge through engaging quizzes designed to challenge and inspire.
          Join thousands of learners on their journey to mastery.
        </p>
        <div className="space-x-4">
          <Button 
            onClick={() => navigate("/quiz")} 
            size="lg" 
            className="px-8 bg-white text-black hover:bg-gray-200"
          >
            Start Quiz
          </Button>
          <Button 
            // onClick={() => navigate("/browse")} 
            size="lg" 
            variant="outline" 
            className="px-8 border-white text-white hover:bg-white hover:text-black"
          >
            Browse Topics
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "500+", label: "Quizzes" },
            { number: "50+", label: "Topics" },
            { number: "1M+", label: "Questions Answered" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-b border-white/10">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Diverse Topics",
              desc: "From science to arts, technology to history. Our extensive collection of quizzes covers everything you need to expand your knowledge.",
              icon: "📚"
            },
            {
              title: "Instant Feedback",
              desc: "Get detailed explanations and real-time results for each question. Understanding your mistakes is key to improvement.",
              icon: "⚡"
            },
            {
              title: "Track Progress",
              desc: "Monitor your growth with detailed analytics and performance tracking. Set goals and watch yourself improve over time.",
              icon: "📈"
            },
          ].map((feature, index) => (
            <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 border-b border-white/10">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              step: "01",
              title: "Choose Your Topic",
              desc: "Browse through our extensive collection of topics and select the one that interests you the most."
            },
            {
              step: "02",
              title: "Take the Quiz",
              desc: "Answer questions at your own pace. Each quiz is carefully crafted to test your knowledge effectively."
            },
            {
              step: "03",
              title: "Get Instant Results",
              desc: "Receive detailed feedback and explanations for each question immediately after completion."
            },
            {
              step: "04",
              title: "Track Your Progress",
              desc: "Monitor your improvement over time with detailed statistics and performance analytics."
            }
          ].map((item, index) => (
            <div key={index} className="relative pl-16">
              <div className="absolute left-0 top-0 text-2xl font-bold text-white/30">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 border-b border-white/10">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Alice Johnson",
              role: "Student",
              review: "This platform has transformed how I prepare for my exams. The instant feedback feature is invaluable!"
            },
            {
              name: "Bob Smith",
              role: "Teacher",
              review: "As an educator, I appreciate the variety of topics and the depth of content. It's a great supplementary tool."
            },
            {
              name: "Charlie Brown",
              role: "Life-long Learner",
              review: "The progress tracking feature keeps me motivated. I can clearly see my improvement over time."
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <p className="italic mb-6">"{testimonial.review}"</p>
                <div>
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Test Your Knowledge?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-400">
          Join thousands of users who are already improving their knowledge through our interactive quizzes.
        </p>
        <Button 
          // onClick={() => navigate("/signup")} 
          size="lg" 
          className="px-8 bg-white text-black hover:bg-gray-200"
        >
          Get Started Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-gray-400">Dedicated to making learning engaging and accessible for everyone.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Browse Quizzes</li>
              <li>Categories</li>
              <li>Leaderboard</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>FAQ</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Interactive Quiz Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;