import React from "react";
import { Smartphone, Cpu, Wifi, Battery, ChevronRight, Menu, X, Star } from "lucide-react";
import "./_group.css";

function ArrowheadLogo({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 20 L4 4 L20 4" />
    </svg>
  );
}

export function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div className="arrowsmart-container">
        {/* Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-[#334155] bg-[#0B1120]/80 backdrop-blur-md">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#10B981]/10 text-[#10B981]">
                <ArrowheadLogo size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ArrowSmart
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Home</a>
              <a href="#products" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Products</a>
              <a href="#about" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Contact</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm font-medium text-white hover:text-[#10B981] transition-colors">Support</button>
              <a href="/employee-login" className="text-xs font-medium text-[#475569] hover:text-[#94A3B8] transition-colors border border-[#1E293B] hover:border-[#334155] px-3 py-1.5 rounded-md">
                Employee Login
              </a>
              <button className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
                Shop Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[#94A3B8] hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#334155] bg-[#0B1120] px-6 py-4 space-y-4">
              <a href="#home" className="block text-base font-medium text-[#94A3B8] hover:text-white">Home</a>
              <a href="#products" className="block text-base font-medium text-[#94A3B8] hover:text-white">Products</a>
              <a href="#about" className="block text-base font-medium text-[#94A3B8] hover:text-white">About</a>
              <a href="#contact" className="block text-base font-medium text-[#94A3B8] hover:text-white">Contact</a>
              <div className="pt-4 flex flex-col gap-3">
                <button className="w-full text-center py-2.5 text-sm font-medium border border-[#334155] rounded-md text-white">Support</button>
                <a href="/employee-login" className="w-full text-center py-2.5 text-xs font-medium border border-[#1E293B] rounded-md text-[#475569]">Employee Login</a>
                <button className="w-full text-center py-2.5 bg-[#10B981] text-white rounded-md text-sm font-medium">Shop Now</button>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10B981]/20 rounded-full blur-[128px]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] text-xs font-medium text-[#10B981] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                Introducing the Achilles 20 Series — Available Now
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-up opacity-0 delay-100 max-w-4xl mx-auto leading-tight">
                Technology that points the way <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-emerald-400">forward.</span>
              </h1>

              <p className="text-xl text-[#94A3B8] mb-10 max-w-2xl mx-auto animate-fade-up opacity-0 delay-200">
                From the Achilles flagship to next-generation computing, ArrowSmart builds the devices that define tomorrow. Precision engineering. Unmatched performance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 delay-300">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-md font-semibold text-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  Explore Products
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-[#1E293B] hover:bg-[#334155] text-white rounded-md font-semibold text-lg transition-colors border border-[#334155]">
                  Watch Keynote
                </button>
              </div>
            </div>

            {/* Hero device showcase */}
            <div className="container mx-auto px-6 mt-20 relative z-10">
              <div className="flex justify-center gap-6 flex-wrap">
                {["Achilles 20 Pro", "Achilles 20", "Achilles 20 Mini"].map((name, i) => (
                  <div key={name} className={`rounded-2xl border border-[#334155] bg-gradient-to-b from-[#1E293B] to-[#0F172A] p-6 flex flex-col items-center gap-4 w-44 hover:border-[#10B981]/50 transition-colors ${i === 1 ? "mt-0" : "mt-8"}`}>
                    <div className="w-16 h-28 rounded-xl border-2 border-[#334155] bg-[#0B1120] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-x-0 top-0 h-4 bg-[#1E293B] flex items-center justify-center">
                        <div className="w-6 h-1 rounded-full bg-[#334155]"></div>
                      </div>
                      <ArrowheadLogo size={20} className="text-[#10B981]" />
                    </div>
                    <span className="text-xs font-semibold text-[#94A3B8]">{name}</span>
                    {i === 1 && <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 rounded-full px-2 py-0.5">Most Popular</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section id="products" className="py-24 bg-[#0F172A] border-y border-[#334155]">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Full ArrowSmart Lineup</h2>
                <p className="text-[#94A3B8] text-lg">Every product engineered to the highest standard. Every detail deliberate.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: <Smartphone className="w-6 h-6" />, title: "Achilles 20 Series", desc: "The world's most advanced smartphones — now in their 20th generation. ProVision camera system. AS-9 chip. All-day battery." },
                  { icon: <Cpu className="w-6 h-6" />, title: "Arrow Computers", desc: "Desktops and laptops powered by the AS Silicon architecture. Silent, fast, unstoppable." },
                  { icon: <Wifi className="w-6 h-6" />, title: "Arrow Connect", desc: "Smart home devices and IoT ecosystem. Your home, precisely in sync." },
                  { icon: <Battery className="w-6 h-6" />, title: "Arrow Wearables", desc: "Smartwatches and audio products that move with you. Health, sound, and style unified." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="p-8 rounded-2xl bg-[#1E293B] border border-[#334155] hover:border-[#10B981]/50 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center mb-6 text-[#10B981]">
                      {icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#10B981] transition-colors">{title}</h3>
                    <p className="text-[#94A3B8] leading-relaxed text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="py-16 bg-[#0B1120] border-b border-[#334155]">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "2.4B+", label: "Devices Worldwide" },
                  { value: "190+", label: "Countries & Regions" },
                  { value: "#1", label: "Ranked Tech Brand" },
                  { value: "40yr", label: "Industry Legacy" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-4xl font-extrabold text-[#10B981] mb-2">{value}</p>
                    <p className="text-[#94A3B8] text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About/Mission Section */}
          <section id="about" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <p className="text-[#10B981] font-semibold text-sm uppercase tracking-widest mb-4">Our Mission</p>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Moving forward, <br />always pointing up.
                  </h2>
                  <p className="text-xl text-[#94A3B8] mb-8">
                    For four decades, ArrowSmart has been at the forefront of consumer technology. We don't follow trends — we set them. From the first Arrow phone to today's AS Silicon ecosystem, our mission is simple: build the best products on the planet.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {["Best-in-class hardware design", "Proprietary AS Silicon chipsets", "Vertically integrated software & services"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-white">
                        <div className="w-6 h-6 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] shrink-0">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="text-[#10B981] font-semibold hover:text-white transition-colors flex items-center gap-2 group">
                    Our full story
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-full border border-[#334155] absolute inset-0 -translate-x-8 translate-y-8"></div>
                  <div className="aspect-square rounded-full border border-[#10B981]/30 absolute inset-0 translate-x-8 -translate-y-8"></div>
                  <div className="aspect-square bg-gradient-to-tr from-[#1E293B] to-[#0F172A] rounded-2xl border border-[#334155] p-12 flex items-center justify-center relative z-10 shadow-2xl">
                    <ArrowheadLogo size={160} className="text-[#10B981] opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="py-16 bg-[#0F172A] border-t border-[#334155]">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-bold text-white text-center mb-10">What the world is saying</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { quote: "The Arrow One Pro is the best phone ever made. Full stop.", author: "TechReview Weekly" },
                  { quote: "ArrowSmart's ecosystem is unmatched. Once you're in, you never want to leave.", author: "GadgetWorld" },
                  { quote: "The AS-9 chip outperforms everything else on the market by a wide margin.", author: "Silicon Magazine" },
                ].map(({ quote, author }) => (
                  <div key={author} className="p-6 rounded-xl bg-[#1E293B] border border-[#334155]">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#10B981] text-[#10B981]" />)}
                    </div>
                    <p className="text-white italic mb-4 text-sm leading-relaxed">"{quote}"</p>
                    <p className="text-[#10B981] text-xs font-semibold">{author}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-[#1E293B] border-t border-[#334155]">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to upgrade your world?</h2>
              <p className="text-xl text-[#94A3B8] mb-10 max-w-2xl mx-auto">
                Explore the latest Arrow devices at an authorized retailer or shop online today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-md font-semibold text-lg transition-colors">
                  Shop Now
                </button>
                <button className="px-8 py-4 bg-transparent hover:bg-[#334155] text-white rounded-md font-semibold text-lg transition-colors border border-[#334155]">
                  Find a Store
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#0B1120] border-t border-[#334155] py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#10B981]/10 text-[#10B981]">
                    <ArrowheadLogo size={18} />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white">
                    ArrowSmart
                  </span>
                </div>
                <p className="text-[#94A3B8] text-sm">
                  The world's leading consumer electronics company. Building the future, one device at a time.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Products</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Arrow Phone</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Arrow Computer</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Arrow Watch</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Arrow Connect</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Find a Store</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Repairs</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Developers</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">About ArrowSmart</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Newsroom</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Careers</a></li>
                  <li><a href="#" className="text-[#94A3B8] hover:text-[#10B981] text-sm transition-colors">Investors</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[#94A3B8] text-sm">
                &copy; {new Date().getFullYear()} ArrowSmart Inc. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[#94A3B8] hover:text-white text-sm transition-colors">Privacy</a>
                <a href="#" className="text-[#94A3B8] hover:text-white text-sm transition-colors">Legal</a>
                <a href="#" className="text-[#94A3B8] hover:text-white text-sm transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
