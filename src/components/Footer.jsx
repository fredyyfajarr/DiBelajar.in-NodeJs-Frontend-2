import { BookOpen, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-violet-600" />
              <span className="text-xl font-bold text-gray-900">DiBelajar.in</span>
            </div>
            <p className="text-gray-600 mb-4">
              Platform pembelajaran online terbaik untuk mengembangkan skill dan pengetahuan Anda. 
              Bergabunglah dengan ribuan pelajar lainnya dan raih kesuksesan bersama kami.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-violet-600 transition-colors">
                {/* Twitter */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-violet-600 transition-colors">
                {/* Instagram */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69..." />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-violet-600 transition-colors">
                {/* LinkedIn */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569..." />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-gray-600 hover:text-violet-600 transition-colors">Courses</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-violet-600 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-violet-600 transition-colors">Contact</a></li>
              <li><a href="/help" className="text-gray-600 hover:text-violet-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-violet-600" />
                <span className="text-gray-600">info@dibelajar.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-violet-600" />
                <span className="text-gray-600">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-violet-600" />
                <span className="text-gray-600">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DiBelajar.in. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
