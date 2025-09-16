import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useEffect } from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/Header/Header';

function App() {
  // Animando as seções ao rolar a página
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('active', entry.isIntersecting);
      });
    }, { threshold: 0.3 });

    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <div className="App">
      {/* Cabeçalho */}
      <Header />

      {/* Seção de Introdução */}
      <section className="intro section">
        <div className="intro-text">
          <h1>Revolucione as doações com IoT</h1>
          <p>Smart Collect otimiza o fluxo de doações e transforma a gestão das ONGs usando a tecnologia de Internet das Coisas.</p>
          <div className="login-section">
            <p style={{
              marginBottom: "0"
            }}>É uma ONG?</p>
            <a href="/login" className="cta-button">Junte-se a nós</a>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="about section">
        <div className="container">
          <h2>O que é o Smart Collect?</h2>
          <p>O Smart Collect é uma plataforma baseada em IoT que transforma a maneira como as ONGs monitoram e gerenciam pontos de coleta de doações. Com sensores inteligentes, nosso sistema permite acompanhamento em tempo real da ocupação dos pontos de coleta, tornando o processo mais eficiente e transparente.</p>
          <img src="https://via.placeholder.com/600x400" alt="Imagem explicativa" className="about-img" />
        </div>
      </section>

      {/* Seção de Características */}
      <section id="caracteristicas" className="features section">
        <div className="container">
          <h2>Por que escolher o Smart Collect?</h2>
          <div className="features-list">
            <div className="feature">
              <h3>Monitoramento em Tempo Real</h3>
              <p>Acompanhamento contínuo da ocupação dos pontos de coleta, garantindo a eficiência logística.</p>
            </div>
            <div className="feature">
              <h3>Automação Inteligente</h3>
              <p>Automatização do processo de coleta, notificando as ONGs quando os pontos atingem sua capacidade.</p>
            </div>
            <div className="feature">
              <h3>Transparência e Impacto</h3>
              <p>Melhore a transparência do processo de doações, aumentando o engajamento da comunidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section id="depoimentos" className="testimonials section">
        <div className="container">
          <h2>O que dizem nossos parceiros</h2>
          <div className="testimonial-slider">
            <div className="testimonial">
              <p>"O Smart Collect transformou nossa logística de coleta. Agora, podemos agir com rapidez e eficiência."</p>
              <span>- ONG Esperança</span>
            </div>
            <div className="testimonial">
              <p>"A automação e o monitoramento em tempo real fizeram toda a diferença na nossa operação. Recomendamos fortemente!"</p>
              <span>- Rede de Solidariedade</span>
            </div>
            <div className="testimonial">
              <p>"Com o Smart Collect, conseguimos monitorar e otimizar a coleta em tempo real, aumentando o engajamento da comunidade."</p>
              <span>- Cidadania Ativa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato */}
      <section id="contato" className="contact section">
        <div className="container">
          <h2>Entre em contato</h2>
          <form>
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu e-mail" required />
            <textarea placeholder="Sua mensagem" required></textarea>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default App;
