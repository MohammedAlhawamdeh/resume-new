import Image from "next/image";
import Link from "next/link";
import {
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
  FaApple,
  FaFacebookSquare,
} from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with enhanced styling */}
      <header className="bg-oxford-blue text-white sticky top-0 z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">KWIK</span>
              <span className="text-vivid-orange">CV</span>
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="hover:text-vivid-orange transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-vivid-orange transition-colors text-sm font-medium"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="hover:text-vivid-orange transition-colors text-sm font-medium"
            >
              Pricing
            </a>
          </nav>
          <Link
            href="/resume-builder"
            className="bg-vivid-orange hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-bold text-sm transition-all transform hover:scale-105 shadow-custom"
          >
            Get Started Free
          </Link>
        </div>
      </header>

      <main>
        {/* Enhanced Hero Section with animation */}
        <section className="hero-gradient text-white pt-20 pb-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="inline-block px-3 py-1 text-xs font-semibold bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                  <span className="text-vivid-orange">★</span>{" "}
                  <span className="text-gray-200">
                    Trusted by 10,000+ professionals
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Build a{" "}
                  <span className="bg-gradient-to-r from-vivid-orange to-yellow-500 text-gradient">
                    Job-Winning
                  </span>{" "}
                  Resume in Minutes
                </h1>
                <p className="text-xl mb-8 text-gray-300 max-w-lg leading-relaxed">
                  Fast. Easy.{" "}
                  <span className="font-bold text-white">ATS-Friendly.</span>{" "}
                  Land more interviews with a professionally designed resume
                  that stands out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/resume-builder"
                    className="group bg-vivid-orange hover:bg-opacity-90 text-white px-8 py-4 rounded-md font-bold text-lg text-center transition-all transform hover:scale-105 shadow-custom flex items-center justify-center"
                  >
                    Build My Resume Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                  <a
                    href="#how-it-works"
                    className="border-2 border-white hover:border-vivid-orange hover:text-vivid-orange text-center px-8 py-4 rounded-md font-bold text-lg transition-colors"
                  >
                    How It Works
                  </a>
                </div>
                <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gray-400 border-2 border-oxford-blue"
                        >
                          {/* Placeholder for user avatars */}
                        </div>
                      ))}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm">
                        <span className="font-bold text-white">10,000+</span>{" "}
                        resumes created this month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-vivid-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="bg-white p-4 rounded-lg shadow-2xl transform rotate-3 max-w-md mx-auto animate-float shadow-blue">
                  <div className="h-96 bg-gray-100 rounded relative overflow-hidden">
                    {/* Resume preview with enhanced placeholder */}
                    <div className="absolute inset-0 flex flex-col p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="w-32 h-10 bg-oxford-blue rounded"></div>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                      </div>
                      <div className="w-full h-1 bg-vivid-orange rounded mb-4"></div>
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-full h-12 bg-gray-200 rounded mb-4"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="w-full h-6 bg-oxford-blue/20 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="w-full h-3 bg-gray-200 rounded"></div>
                        <div className="w-full h-3 bg-gray-200 rounded"></div>
                        <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-vivid-orange text-white p-4 rounded-lg shadow-lg transform rotate-6">
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 mr-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-lg font-bold">ATS Approved!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-oxford-blue to-transparent"></div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                TRUSTED BY JOB SEEKERS FROM
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[
                { name: "Google", icon: FaGoogle, color: "#4285F4" },
                { name: "Amazon", icon: FaAmazon, color: "#FF9900" },
                { name: "Microsoft", icon: FaMicrosoft, color: "#00A4EF" },
                { name: "Apple", icon: FaApple, color: "#A2AAAD" },
                { name: "Meta", icon: FaFacebookSquare, color: "#0866FF" },
              ].map((company, index) => (
                <div
                  key={index}
                  className="grayscale opacity-50 hover:opacity-100 transition-all hover:grayscale-0 duration-300"
                >
                  <div className="flex items-center justify-center">
                    <company.icon
                      size={48}
                      title={`${company.name} logo`}
                      color={company.color}
                      className="h-8 md:h-12 w-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section with improved visuals */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-vivid-orange/10 rounded-full mb-4 text-vivid-orange">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Why Choose Our Resume Builder?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to create a professional, ATS-optimized
                resume that gets you hired faster.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "ATS-Optimized Templates",
                  description:
                    "Our templates are designed to pass through Applicant Tracking Systems with ease, ensuring your resume gets seen by human eyes.",
                  icon: "📄",
                },
                {
                  title: "Real-Time Preview",
                  description:
                    "See changes as you make them with our interactive preview, making it easy to perfect your resume.",
                  icon: "👁️",
                },
                {
                  title: "One-Click PDF Export",
                  description:
                    "Download your professionally formatted resume as a PDF with a single click, ready to send to employers.",
                  icon: "📥",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-blue hover:shadow-xl transition-shadow transform hover:-translate-y-1 transition-transform"
                >
                  <div className="bg-vivid-orange/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-4xl">{benefit.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-oxford-blue mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section - Enhanced with timeline */}
        <section
          id="how-it-works"
          className="py-24 bg-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-vivid-orange opacity-5 rounded-full"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-vivid-orange/10 rounded-full mb-4 text-vivid-orange">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Build Your Resume in 3 Easy Steps
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our intuitive process makes resume creation quick and painless.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Enter Your Information",
                  description:
                    "Fill in your personal details, work experience, education, and skills using our guided forms.",
                },
                {
                  step: "2",
                  title: "Preview & Customize",
                  description:
                    "See your resume take shape in real-time and make adjustments until it's perfect.",
                },
                {
                  step: "3",
                  title: "Download & Apply",
                  description:
                    "Export your polished resume as a PDF and start applying to jobs with confidence.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-vivid-orange text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold absolute -top-8 left-1/2 transform -translate-x-1/2 shadow-custom">
                    {step.step}
                  </div>
                  <div className="bg-gray-50 p-8 pt-14 rounded-lg text-center h-full border border-gray-100 shadow-blue hover:shadow-xl transition-all">
                    <h3 className="text-xl font-bold text-oxford-blue mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 z-10">
                      <svg
                        width="40"
                        height="16"
                        viewBox="0 0 40 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M39.7071 8.70711C40.0976 8.31658 40.0976 7.68342 39.7071 7.29289L33.3431 0.928932C32.9526 0.538408 32.3195 0.538408 31.9289 0.928932C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM0 9H39V7H0V9Z"
                          fill="#FB5607"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Link
                href="/resume-builder"
                className="group bg-vivid-orange hover:bg-opacity-90 text-white px-12 py-5 rounded-md font-bold text-lg inline-block transition-all transform hover:scale-105 shadow-custom"
              >
                Start Building Now
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                No credit card required • Free to get started
              </p>
            </div>
          </div>
        </section>

        {/* Features Section with improved layout */}
        <section
          id="features"
          className="py-24 bg-gray-50 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-vivid-orange/10 rounded-full mb-4 text-vivid-orange">
                Powerful Tools
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Powerful Resume Building Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to create a standout resume that gets
                results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="bg-white p-6 rounded-2xl shadow-blue h-96 relative overflow-hidden">
                  {/* Enhanced feature screenshot placeholder */}
                  <div className="absolute inset-x-6 inset-y-6 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-12 bg-oxford-blue flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <div className="flex-1"></div>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-4 mb-6">
                        <div className="w-1/3">
                          <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-2/3">
                          <div className="h-60 w-full bg-gray-200 rounded relative p-4">
                            <div className="h-8 w-1/2 bg-white rounded mb-3"></div>
                            <div className="h-4 w-full bg-white rounded mb-2"></div>
                            <div className="h-4 w-full bg-white rounded mb-2"></div>
                            <div className="h-4 w-5/6 bg-white rounded"></div>
                            <div className="absolute bottom-4 right-4 h-10 w-24 bg-vivid-orange rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-8">
                  {[
                    {
                      title: "Job Description Analyzer",
                      description:
                        "Our AI analyzes job descriptions to help you tailor your resume to specific positions.",
                    },
                    {
                      title: "Skills Suggestion",
                      description:
                        "Get intelligent suggestions for skills based on your experience and target role.",
                    },
                    {
                      title: "Action Verb Enhancement",
                      description:
                        "Transform your bullet points with powerful action verbs that showcase your achievements.",
                    },
                    {
                      title: "ATS Compatibility Check",
                      description:
                        "Ensure your resume is compatible with common Applicant Tracking Systems.",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex bg-white p-6 rounded-xl shadow-blue hover:shadow-xl transition-all group"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-vivid-orange w-10 h-10 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-bold text-oxford-blue mb-2 group-hover:text-vivid-orange transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with enhanced visuals */}
        <section
          id="testimonials"
          className="py-24 bg-oxford-blue text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern
                  id="pattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 40L40 0H20L0 20M40 40V20L20 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-white/10 rounded-full mb-4 text-vivid-orange">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Success stories from people who landed their dream jobs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "I was struggling to get interviews for months. After using this resume builder, I received 5 interview requests in just one week!",
                  name: "Sarah Johnson",
                  position: "Software Developer",
                  rating: 5,
                },
                {
                  quote:
                    "The templates are clean, professional, and ATS-friendly. I secured a job with a Fortune 500 company thanks to this tool.",
                  name: "Michael Chen",
                  position: "Marketing Manager",
                  rating: 5,
                },
                {
                  quote:
                    "As a career changer, I needed a resume that highlighted my transferable skills. This builder helped me do exactly that!",
                  name: "Emily Rodriguez",
                  position: "Data Analyst",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 transform transition-all hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-4 text-vivid-orange flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mb-6 text-vivid-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-vivid-orange/30 rounded-full mr-4 flex items-center justify-center text-vivid-orange font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Link
                href="/resume-builder"
                className="bg-white text-vivid-orange hover:bg-gray-100 px-8 py-4 rounded-md font-bold text-lg inline-block transition-all transform hover:scale-105 shadow-custom"
              >
                Join Our Success Stories
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section with enhanced visuals */}
        <section id="pricing" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-vivid-orange/10 rounded-full mb-4 text-vivid-orange">
                Pricing Plans
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the plan that works for your career needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Basic",
                  price: "Free",
                  description: "Create a simple resume with our basic tools.",
                  features: [
                    "1 resume template",
                    "PDF download",
                    "Basic sections",
                    "Real-time preview",
                  ],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "$12",
                  period: "per month",
                  description: "Perfect for active job seekers.",
                  features: [
                    "All basic features",
                    "10+ premium templates",
                    "Job description analyzer",
                    "Multiple resume versions",
                    "Cover letter builder",
                    "Priority support",
                  ],
                  cta: "Get Professional",
                  popular: true,
                },
                {
                  name: "Career",
                  price: "$89",
                  period: "per year",
                  description: "Best value for career development.",
                  features: [
                    "All professional features",
                    "LinkedIn profile optimization",
                    "Interview preparation tools",
                    "Career coaching session",
                    "Unlimited downloads",
                  ],
                  cta: "Get Career",
                  popular: false,
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl overflow-hidden shadow-blue hover:shadow-xl transition-all transform hover:-translate-y-1 relative ${
                    plan.popular
                      ? "ring-2 ring-vivid-orange"
                      : "border border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-vivid-orange text-white py-2 px-6 absolute -right-12 top-8 transform rotate-45 font-medium">
                      Popular
                    </div>
                  )}
                  <div className="p-8">
                    <div
                      className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl ${
                        plan.popular
                          ? "bg-vivid-orange text-white"
                          : "bg-gray-100 text-oxford-blue"
                      }`}
                    >
                      {index === 0 ? "🔄" : index === 1 ? "⭐" : "🚀"}
                    </div>
                    <h3 className="text-2xl font-bold text-oxford-blue mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4 flex items-end">
                      <span className="text-4xl font-bold text-oxford-blue">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg
                            className="h-5 w-5 text-vivid-orange mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/resume-builder"
                      className={`block w-full py-3 px-4 rounded-md font-semibold text-center transition-all ${
                        plan.popular
                          ? "bg-vivid-orange text-white hover:bg-opacity-90 transform hover:scale-105"
                          : "bg-gray-100 text-oxford-blue hover:bg-gray-200"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 max-w-3xl mx-auto bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-oxford-blue mb-2">
                Need a custom solution?
              </h3>
              <p className="text-gray-600 mb-4">
                We offer enterprise solutions for companies looking to support
                multiple employees.
              </p>
              <a
                href="#"
                className="text-vivid-orange hover:underline font-medium"
              >
                Contact us for enterprise pricing →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section with enhanced accordion */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-vivid-orange/10 rounded-full mb-4 text-vivid-orange">
                FAQs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about our resume builder.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What is an ATS-friendly resume?",
                  answer:
                    "An ATS (Applicant Tracking System) friendly resume is formatted to be easily parsed by the software employers use to filter applications. Our templates use clean, standard formatting that ensures your resume gets through these systems and to human recruiters.",
                },
                {
                  question: "Can I create multiple resumes?",
                  answer:
                    "Yes! With our Professional and Career plans, you can create and save multiple versions of your resume, making it easy to tailor your application to different positions.",
                },
                {
                  question: "Is my data secure?",
                  answer:
                    "Absolutely. We use industry-standard encryption to protect your personal information. We never share your data with third parties without your explicit consent.",
                },
                {
                  question: "Can I cancel my subscription?",
                  answer:
                    "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to your paid features until the end of your billing period.",
                },
                {
                  question: "How do I download my resume?",
                  answer:
                    "Once you've completed your resume, simply click the 'Download PDF' button to save your resume as a professional, print-ready PDF file.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-blue hover:shadow-xl transition-all"
                >
                  <details className="p-6 group">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="text-xl font-semibold text-oxford-blue group-hover:text-vivid-orange transition-colors">
                        {faq.question}
                      </h3>
                      <span className="bg-gray-100 text-vivid-orange rounded-full p-2 transition-transform group-open:rotate-180 group-hover:bg-vivid-orange/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-4 text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-vivid-orange text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of job seekers who have already created winning
                resumes with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/resume-builder"
                  className="bg-white text-vivid-orange hover:bg-gray-100 px-8 py-4 rounded-md font-bold text-lg inline-block transition-all transform hover:scale-105 shadow-lg"
                >
                  Build My Resume Now
                </Link>
                <a
                  href="#pricing"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold text-lg inline-block transition-colors"
                >
                  View Pricing
                </a>
              </div>
              <div className="mt-10 flex items-center justify-center text-sm space-x-8 text-white/80">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-oxford-blue text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">KWIK</span>
                <span className="text-vivid-orange">CV</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Create professional, ATS-friendly resumes that get you hired
                faster.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    Resume Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    Career Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    Resume Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    Career Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-vivid-orange transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Get the latest resume tips and career advice.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <button className="bg-vivid-orange text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()}{" "}
              <span className="text-white">KWIK</span>
              <span className="text-vivid-orange">CV</span>. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-vivid-orange transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-vivid-orange transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-vivid-orange transition-colors text-sm"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
