const Footer = () => {
  return (
    <footer className="bg-blue-950 text-slate-100 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Nivas<span className="text-orange-500">360</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Buy, Sell & Rent properties with confidence.  
            Your trusted real-estate partner.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Sell Property</li>
            <li className="hover:text-orange-400 cursor-pointer">Home</li>
            <li className="hover:text-orange-400 cursor-pointer">About us</li>
            <li className="hover:text-orange-400 cursor-pointer">Services</li>
            <li className="hover:text-orange-400 cursor-pointer">FAQ's</li>

            
          </ul>
        </div>

        <div>
          <h3 className="text-slate-300 font-semibold mb-4">Properties</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Rental Houses</li>
            <li className="hover:text-orange-400 cursor-pointer">Houses for Sale</li>
            <li className="hover:text-orange-400 cursor-pointer">Plots for Sale</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-slate-400 mb-2">
            Visakhapatnam, India
          </p>
          <p className="text-sm text-slate-400 mb-2">
            📞 +91 9999999999
          </p>
          <p className="text-sm text-slate-400">
            ✉ support@nivas360.com
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Nivas360. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer