import Link from 'next/link';

export default function Footer(){
    return(
        <footer className="bg-[#D9D9D9] text-white py-12 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-black text-xl font-semibold mb-4">SUSHI DOMANG</h3>
            <p>Menyajikan sushi terbaik dengan cita rasa autentik Jepang dan sentuhan modern khas Bali.</p>
          </div>
          <div>
            <h3 className="text-black text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#menu">Menu</Link></li>
              <li><Link href="#about">About</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-black text-xl font-semibold mb-4">Contact Us</h3>
            <p>Kampus Bukit, Jimbaran, South Kuta, Badung Regency</p>
            <p>Phone: (0361) 123-4567</p>
            <p>Email: info@sushidomang.com</p>
          </div>
        </div>
      </footer> 
    )
}