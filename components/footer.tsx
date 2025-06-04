import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Heart, Code, Coffee } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-surface-1 border-t border-neon-purple/20 section-bg-3">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 py-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shadow-neumorphic">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold logo-text">Ashirbad Mandhata</h3>
                <p className="text-xs text-neon-pink/80">Portfolio</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Crafting exceptional digital experiences with modern technologies and innovative solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-neon-pink animate-pulse" />
              <span>and</span>
              <Coffee className="w-4 h-4 text-neon-yellow" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold gradient-text">Quick Links</h3>
            <nav className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/#about" },
                { name: "Projects", href: "/#projects" },
                { name: "Tech Stack", href: "/#tech-stack" },
                { name: "Admin Panel", href: "/admin" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-neon-cyan transition-colors duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-neon-purple group-hover:bg-neon-cyan transition-colors" />
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold gradient-text">Let's Connect</h3>
            <p className="text-muted-foreground">Feel free to reach out for collaborations or just a friendly chat</p>
            <Link
              href="mailto:ashirbadmandhata0@gmail.com"
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              ashirbadmandhata0@gmail.com
            </Link>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/ashirbadmandhata", color: "hover:text-neon-purple" },
                { icon: Linkedin, href: "https://linkedin.com/ashirbadmandhata", color: "hover:text-neon-blue" },
                { icon: Twitter, href: "https://twitter.com", color: "hover:text-neon-cyan" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl glass-effect flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300 group ${social.color}`}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="sr-only">{social.icon.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neon-purple/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {currentYear} Ashirbad Mandhata Portfolio. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-neon-cyan transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-neon-cyan transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
