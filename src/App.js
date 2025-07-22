import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dotsRef = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;

    const resizeCanvas = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };

    const calculateDistance = (dot1, dot2) => {
      const rect1 = dot1.getBoundingClientRect();
      const rect2 = dot2.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();

      const x1 = rect1.left + rect1.width / 2 - heroRect.left;
      const y1 = rect1.top + rect1.height / 2 - heroRect.top;
      const x2 = rect2.left + rect2.width / 2 - heroRect.left;
      const y2 = rect2.top + rect2.height / 2 - heroRect.top;

      return {
        distance: Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
        x1,
        y1,
        x2,
        y2,
      };
    };

    const drawLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dots = dotsRef.current.filter((dot) => dot);

      for (let i = 0; i < dots.length; i++) {
        let closestDot = null;
        let minDistance = Infinity;
        let closestCoords = null;

        for (let j = 0; j < dots.length; j++) {
          if (i !== j) {
            const result = calculateDistance(dots[i], dots[j]);
            if (result.distance < minDistance && result.distance < 150) {
              minDistance = result.distance;
              closestDot = dots[j];
              closestCoords = result;
            }
          }
        }

        if (closestDot && closestCoords) {
          const opacity = Math.max(0, 1 - minDistance / 150);
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(closestCoords.x1, closestCoords.y1);
          ctx.lineTo(closestCoords.x2, closestCoords.y2);
          ctx.stroke();
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const interval = setInterval(drawLines, 50);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className='App'
      id='home'
    >
      <nav className='navbar'>
        <div className='nav-left'>
          <a
            href='#home'
            className='nav-brand'
          >
            Y2J Studio
          </a>
          <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <a
              href='#about'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            {/* <a
              href='#projects'
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a> */}
            <a
              href='#contact'
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
        <button
          className='mobile-menu-toggle'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <main className='main-content'>
        <section className='hero'>
          <canvas
            ref={canvasRef}
            className='connection-lines'
          ></canvas>
          <div className='animated-dots'>
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                ref={(el) => (dotsRef.current[i] = el)}
                className={`dot dot-${i + 1}`}
              ></div>
            ))}
          </div>
          <div className='hero-content'>
            <h1>Y2J Studio</h1>
            <p>Where code meets creativity</p>
            <div className='hero-subtitle'>
              Building digital experiences one pixel at a time
            </div>
          </div>
        </section>

        <section
          id='about'
          className='section'
        >
          <div className='container'>
            <h2>About Us</h2>
            <p>
              Welcome to Y2J Studio! We're a fresh digital playground where
              ideas come to life. Think of us as your friendly neighborhood code
              wizards, brewing up websites and apps that people actually love to
              use. We're just getting started on this wild ride, but trust us -
              some seriously cool stuff is cooking in our digital kitchen!
            </p>
          </div>
        </section>

        {/* <section id="projects" className="section projects-section">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-grid">
              <div className="project-card coming-soon">
                <div className="project-placeholder">
                  <div className="placeholder-icon">⚡</div>
                  <h3>Coming Soon</h3>
                  <p>Exciting projects in development</p>
                </div>
              </div>
              <div className="project-card coming-soon">
                <div className="project-placeholder">
                  <div className="placeholder-icon">🚀</div>
                  <h3>Coming Soon</h3>
                  <p>Innovative apps on the way</p>
                </div>
              </div>
              <div className="project-card coming-soon">
                <div className="project-placeholder">
                  <div className="placeholder-icon">💫</div>
                  <h3>Coming Soon</h3>
                  <p>Digital experiences reimagined</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section
          id='contact'
          className='section contact-section'
        >
          <div className='container'>
            <h2>Let's Create Magic!</h2>
            <p>
              Got a wild idea? A crazy dream? Or just want to say hi? We're all
              ears! Drop us a line and let's turn your vision into digital
              reality!
            </p>
            <div className='contact-info'>
              <a
                href='mailto:=they2jstudio@gmail.com
'
                className='contact-link'
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className='footer'>
        <div className='container'>
          <p>© 2025 Y2J Studio. Made with passion and coffee</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
