import React from "react";
import styles from "./Pev.module.css";
import Header from "../../components/Header/Header"; // Navbar original

const ongs = [
  {
    nome: "ONG Esperança",
    descricao: "Atua no combate à fome e promove ações sociais em comunidades carentes.",
    imagem: "https://via.placeholder.com/300x180",
    alt: "Logo da ONG Esperança",
    missao: "Ajudar famílias em vulnerabilidade.",
    visao: "Comunidades mais solidárias.",
    telefone: "(11) 99999-9999",
    email: "esperanca@example.com",
    website: "https://esperanca.org",
    pontos: ["Av. Paulista, 1000 - São Paulo", "Rua das Flores, 45 - Guarulhos"],
  },
  {
    nome: "Rede de Solidariedade",
    descricao: "Focada em arrecadar roupas e alimentos para famílias em vulnerabilidade.",
    imagem: "https://via.placeholder.com/300x180",
    alt: "Logo da Rede de Solidariedade",
    missao: "Distribuir alimentos e roupas.",
    visao: "Reduzir desigualdade social.",
    telefone: "(11) 98888-8888",
    email: "solidariedade@example.com",
    website: "https://solidariedade.org",
    pontos: ["Praça Central, 200 - Campinas", "Rua Verde, 300 - São Bernardo"],
  },
  {
    nome: "Cidadania Ativa",
    descricao: "Promove educação e inclusão digital em comunidades periféricas.",
    imagem: "https://via.placeholder.com/300x180",
    alt: "Logo da ONG Cidadania Ativa",
    missao: "Educar e capacitar jovens.",
    visao: "Comunidades mais independentes.",
    telefone: "(21) 97777-7777",
    email: "cidadania@example.com",
    website: "https://cidadania.org",
    pontos: ["Avenida Brasil, 500 - Rio de Janeiro"],
  },
  {
    nome: "Ajuda Mútua",
    descricao: "Trabalha com suporte psicológico e social a famílias em crise.",
    imagem: "https://via.placeholder.com/300x180",
    alt: "Logo da ONG Ajuda Mútua",
    missao: "Oferecer suporte emocional.",
    visao: "Bem-estar social expandido.",
    telefone: "(11) 96666-6666",
    email: "ajudamutua@example.com",
    website: "",
    pontos: ["Rua Laranja, 50 - São Paulo"],
  },
  {
    nome: "Educa Todos",
    descricao: "Oferece aulas gratuitas e reforço escolar para crianças e jovens.",
    imagem: "https://via.placeholder.com/300x180",
    alt: "Logo da ONG Educa Todos",
    missao: "Educação de qualidade acessível.",
    visao: "Reduzir evasão escolar.",
    telefone: "(11) 95555-5555",
    email: "educa@example.com",
    website: "https://educa.org",
    pontos: ["Av. Central, 123 - São Paulo"],
  },
  {
    nome: "Verde Vivo",
    descricao: "Proteção ambiental e conscientização ecológica nas cidades.",
    imagem: "https://via.placeholder.com/300x180",
    alt: "Logo da ONG Verde Vivo",
    missao: "Preservar áreas verdes urbanas.",
    visao: "Cidades sustentáveis.",
    telefone: "(11) 94444-4444",
    email: "verdevivo@example.com",
    website: "https://verdevivo.org",
    pontos: ["Parque Central, 500 - São Paulo"],
  },
];

export default function Pev() {
  return (
    <div className={styles.page}>
      <Header /> {/* Navbar original */}

      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h2>Conheça as ONGs Parceiras</h2>
          <p>Veja informações, missão, pontos de coleta e como ajudar diretamente.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {ongs.map((ong, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={ong.imagem} alt={ong.alt} />
                </div>
                <h3 className={styles.cardTitle}>{ong.nome}</h3>
                <p className={styles.descricao}>{ong.descricao}</p>

                <div className={styles.row}>
                  <div className={styles.infoBlock}>
                    <h4>Missão</h4>
                    <p>{ong.missao}</p>
                  </div>
                  <div className={styles.infoBlock}>
                    <h4>Visão</h4>
                    <p>{ong.visao}</p>
                  </div>
                </div>

                <div className={styles.contactInfo}>
                  <p>📞 {ong.telefone}</p>
                  <p>✉️ {ong.email}</p>
                  <p>📍 Pontos de coleta:</p>
                  <ul>
                    {ong.pontos.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                {ong.website && (
                  <div className={styles.socials}>
                    <a href={ong.website} target="_blank" rel="noreferrer">Site</a>
                  </div>
                )}

           
              </div>
            ))}
          </div>
          <div style={{ height: "100px" }}></div>
        </div>
      </section>
    </div>
  );
}
