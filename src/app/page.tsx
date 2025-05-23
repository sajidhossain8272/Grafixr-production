  // pages/index.tsx
  "use client";

  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";
  import Link from "next/link";
  import Image from "next/image";

  // import ColorfulScene from "@/components/ColorfulHoverEffect";
  import ProjectsCompleted from "@/components/ProjectsCompleted";
  import ClientReviews from "@/components/ClientReviews";
  import Services from "@/components/Services";
  import CTASection from "@/components/CTASection";

  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import HeroSection from "@/components/HeroSection";
  // import TechStackSection from "@/components/TechStackSection";
  // import ClientsSection from "@/components/ClientsSection";

  interface PortfolioItem {
    _id: string;
    title: string;
    description: string;
    mainCategory: string;
    subCategory: string;
    mediaType: "image" | "video";
    files: string[];
    createdAt: string;
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  function Spinner() {
    return (
      <div className='flex justify-center items-center py-16'>
        <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  export default function Home() {
    const [latest, setLatest] = useState<PortfolioItem[]>([]);
    const [loadingLatest, setLoadingLatest] = useState(true);
    const [errorLatest, setErrorLatest] = useState<string | null>(null);

    // 1) Fetch featured (latest 3) projects
    useEffect(() => {
      setLoadingLatest(true);
      fetch(`${API_URL}/portfolio`)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json() as Promise<PortfolioItem[]>;
        })
        .then((data) => {
          const sorted = data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setLatest(sorted.slice(0, 3));
          setErrorLatest(null);
        })
        .catch(() => setErrorLatest("Failed to load latest projects."))
        .finally(() => setLoadingLatest(false));
    }, []);

    // 2) Sample data for GlobalServices
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const countryData = [
      { iso: "US", count: 50 },
      { iso: "GB", count: 30 },
      { iso: "AE", count: 10 },
      { iso: "BD", count: 15 },
      { iso: "IN", count: 70 },
      { iso: "PK", count: 25 },
      { iso: "SA", count: 20 },
      { iso: "AU", count: 18 },
      { iso: "CA", count: 22 },
    ];

    return (
      <div className=' bg-white text-gray-900'>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Hero */}
        {/* <section className='lg:h-[450px] h-[400px] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden'> */}
          {/* <ColorfulScene /> */}
          
          <HeroSection />

          {/* <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='text-6xl font-bold mb-4 relative z-10'
          >
            We Create <span className='text-gray-950'>Digital Experiences</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='text-xl mb-8 text-gray-900 relative z-10'
          >
            Transforming ideas into stunning realities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className='relative z-10 flex flex-col sm:flex-row items-center gap-4'
          >
            <Link
              href='/portfolio'
              className='bg-gray-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'
            >
              View Our Work
            </Link>
            <Link
              href='/contact'
              className='bg-gradient-to-r from-[#29C9FF] to-[#00B8FF] hover:from-[#00B8FF] hover:to-[#29C9FF]
  text-white font-bold px-6 py-3 rounded-lg  transition-colors'
            >
              Order Now
            </Link>
          </motion.div> */}
        {/* </section> */}

        {/* Featured Projects */}
       <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-4xl font-bold text-center mb-4"
  >
    Recent Projects
  </motion.h2>
  <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
    These are our most recent and exciting projects. Take a look at what we’ve been working on!
  </p>

  {loadingLatest ? (
    <Spinner />
  ) : errorLatest ? (
    <p className="text-center text-red-500">{errorLatest}</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
      {latest.map((item, idx) => (
        <Link
          key={item._id}
          href={`/portfolio?subCategory=${encodeURIComponent(item.subCategory)}`}
          className="group"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden p-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:scale-[1.02] transition-transform duration-300 hover:shadow-[0_10px_60px_rgba(255,255,255,0.2)]"
          >
            {/* Gradient glow behind */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-20 blur-lg rounded-xl pointer-events-none z-0"></div>

            {/* Project Image */}
            <div
              className="relative w-full rounded-lg overflow-hidden aspect-[4/3] bg-black/10 z-10"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src={item.files[0]}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={idx === 0}
              />
            </div>

            {/* Project Info */}
            <div className="mt-4 z-10 relative">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                {item.description || "No description"}
              </p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )}
</section>


        {/* Services */}
        <section>
          <Services />
        </section>

        {/* <TechStackSection /> */}

        {/* Stats & CTA */}
          <section className="bg-gradient-to-br from-black via-gray-900 to-black py-20 text-white">
      <div className="container mx-auto px-6 flex flex-col items-center space-y-10 text-center">
        <ProjectsCompleted
          clientsServed={120}
          projectsCompleted={85}
          ongoingProjects={12}
        />

        <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
          We take pride in delivering exceptional results for our clients.
          With a proven track record of success, we are committed to turning
          your vision into reality.
        </p>

        <Link
          href="/about"
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full font-bold text-white transition-colors shadow-md shadow-blue-600/30"
        >
          Learn More About Us
        </Link>
      </div>
    </section>

        {/* Client Reviews */}
        {/* <ClientsSection /> */}
        <ClientReviews />

        <CTASection />
      </div>
    );
  }
