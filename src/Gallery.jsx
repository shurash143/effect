import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const images = [
  {
    src: 'https://media.istockphoto.com/id/1449248203/photo/successful-business-man-talking-to-a-group-of-people-in-a-meeting-a-the-office.jpg?s=612x612&w=0&k=20&c=-0JhuPF2nAjuwdbjJdNX4VXmPXm5briuYEzLUAm1JYI=',
    alt: 'Business meeting',
  },
  {
    src: 'https://media.istockphoto.com/id/2158761604/photo/closeup-of-team-members-examine-esg-related-documents-pointing-and-discussing-investment.jpg?s=612x612&w=0&k=20&c=lWTdx0MBJva7OfwOQOgXSE8HKJwNTmvv_ZuXB2ngHPs=',
    alt: 'Startup teamwork',
  },
  {
    src: 'https://media.istockphoto.com/id/2207141986/photo/ai-governance-and-responsive-generative-artificial-intelligence-use-compliance-strategy-and.jpg?s=612x612&w=0&k=20&c=JK0ezw-lui-0gxbKB2rWqUMD3gza0pUI_aeb7-GkFBI=',
    alt: 'Work desk with laptop',
  },
  {
    src: 'https://media.istockphoto.com/id/2190572397/photo/modern-collaborative-office-space-with-diverse-professionals-working-in-a-co-working.jpg?s=612x612&w=0&k=20&c=4f-l9COQYl2784Hy7S1ExSwOhmmFvQqaajvFWzvt9uM=',
    alt: 'Modern office',
  },
  {
    src: 'https://media.istockphoto.com/id/2160707342/photo/making-decision-on-the-move.jpg?s=612x612&w=0&k=20&c=U9ldYvamNLDvk70VltKpdLZPldN3k2fm0rAw-tWCzcA=',
    alt: 'Coworkers collaboration',
  },
  {
    src: 'https://media.istockphoto.com/id/1363104923/photo/diverse-modern-office-businessman-leads-business-meeting-with-managers-talks-uses.jpg?s=612x612&w=0&k=20&c=R6-SufHacJ6bCnviq37kik2Jl6RMdECybcUpEoRuMLs=',
    alt: 'Business presentation',
  },
  {
    src: 'https://media.istockphoto.com/id/2162228916/photo/armchairs-surrounding-long-table.jpg?s=612x612&w=0&k=20&c=OWpfKL4qpqvc0sNMWLRwJ9KD-LjIPY5LGg6LY1OO52k=',
    alt: 'Board room',
  },{
    src: 'https://media.istockphoto.com/id/1783203740/photo/new-underground-parking-road-landscape.jpg?s=612x612&w=0&k=20&c=WasyrLLAILx7nUN9aevdsewJvt4lOWIsaONVjeXD5c4=',
    alt: 'office parking',
  },{
    src: 'https://media.istockphoto.com/id/2164732058/photo/mature-business-and-man-with-tablet-outdoor-for-communication-research-and-typing-email-on.jpg?s=612x612&w=0&k=20&c=cGOn2mebxf9s5RQhsEDIhsVnVYPNl6ZnwEqcBUW0SFU=',
    alt: 'Entrepreneur At work',
  },{
    src: 'https://media.istockphoto.com/id/2214897619/photo/diverse-students-and-professors-in-a-marketing-class.jpg?s=612x612&w=0&k=20&c=a6xa5rI9wknFSYMdeSmtqDCwnCDF8Uk98PTv13o4NZg=',
    alt:'computer labs',
  },{
    src: 'https://media.istockphoto.com/id/2233136375/photo/rear-view-of-black-programmer-working-on-pc-in-the-office.jpg?s=1024x1024&w=is&k=20&c=1LIiKinh5pNMgeCsCU4MmK2vyDMsVj2b_26Yqo1rRF0=',
    alt:'office workers',
  },{
    src: 'https://media.istockphoto.com/id/2189621574/photo/multiethnic-group-of-businesspeople-brainstorming-and-strategizing-in-a-meeting.jpg?s=612x612&w=0&k=20&c=ox0Wc_K_Tbg7A_KjUaohH5ZtpdRi3LCq5VXXDrpv8oA=',
    alt:'office meeting',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Hero Section with Animated Background */}
      <section
        className="bg-blue-700 text-white py-30 px-20 text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('https://media.istockphoto.com/id/641300158/photo/office-park-dusk.jpg?s=1024x1024&w=is&k=20&c=cIdxIee-7BqufLFeHK1TQ_KuSAo2RtiDmPTPJnjvTNA=')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'moveBackground 30s linear infinite', // Animation for the background
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-yellow-300">Gallery</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white">
              Explore moments that showcase our passion, teamwork, and success.
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="md:w-1/2">
          
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className="group relative rounded-lg overflow-hidden shadow-lg focus:outline-none"
              aria-label={`View image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{img.alt}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold focus:outline-none"
            aria-label="Close modal"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-full rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About JobFinder</h3>
            <p className="text-blue-200">
              We connect talented job seekers with leading employers, helping you find the perfect fit.
              Our mission is to empower your career growth with smart, tailored opportunities.
            </p>
          </div>
      
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
              <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
            </ul>
          </div>
      
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: support@jobfinder.com</p>
            <p>Phone: 0721502859</p>
            <p>Address: 123 Garissa, County, Country</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2a3 3 0 0 1 3-3h2v3h-2a1 1 0 0 0-1 1v2h3l-1 3h-2v7A10 10 0 0 0 22 12z" /></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 5.6a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7 3.8 12 12 0 0 1-8.7-4.4 4.2 4.2 0 0 0 1.3 5.7 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9 8.5 8.5 0 0 1-5.2 1.8A8.4 8.4 0 0 1 2 18.6 12 12 0 0 0 8.3 20c7.5 0 11.6-6.2 11.6-11.6 0-.2 0-.4 0-.6A8.3 8.3 0 0 0 22 5.6z" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zM9.4 17H6.6v-6.6h2.8V17zm-1.4-7.4a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zm9.2 7.4h-2.8v-3a1.4 1.4 0 0 0-1.4-1.3 1.4 1.4 0 0 0-1.4 1.3v3h-2.8v-6.6h2.8v1a3 3 0 0 1 5.6 1.7v4z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-blue-300 text-sm">
          &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
