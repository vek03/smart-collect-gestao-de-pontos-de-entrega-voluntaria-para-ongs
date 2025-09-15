import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

export default function ViewProfile() {
  const navigate = useNavigate();

  // Dados fictícios da ONG
  const profile = {
    name: "ONG Exemplo",
    email: "ong@example.com",
    phone: "(11) 99999-9999",
    address: "Rua Exemplo, 123",
    description: "Uma ONG dedicada a ajudar pessoas e comunidades.",
    website: "https://www.exemplo.org",
    facebook: "https://www.facebook.com/ongexemplo",
    instagram: "https://www.instagram.com/ongexemplo",
    cnpj: "12.345.678/0001-99",
    mission: "Promover impacto social positivo.",
    vision: "Ser referência em assistência social.",
    profileImage: "https://via.placeholder.com/150/cccccc/ffffff?text=Foto",
    bannerImage: "https://via.placeholder.com/1200x250/cccccc/ffffff?text=Banner+Neutro",
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle} onClick={() => navigate("/collection-points")}>
          Smart Collect
        </h1>
        <div className={styles.headerActions}>
          <button onClick={() => navigate("/profile")} className={styles.logoutButton}>
            Voltar / Editar
          </button>
        </div>
      </header>

      {/* Banner */}
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${profile.bannerImage})`,
        }}
      ></div>

      {/* Conteúdo */}
      <div className={styles.content}>
        {/* Perfil */}
        <div className={styles.profileHeader}>
          <div className={styles.profileImageWrapper}>
            <img
              src={profile.profileImage}
              alt="Foto de perfil"
              className={styles.profileImage}
            />
          </div>
          <h1>{profile.name}</h1>
        </div>

        {/* Dados */}
        <div className={styles.infoSection}>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Telefone:</strong> {profile.phone}</p>
          <p><strong>Endereço:</strong> {profile.address}</p>
          <p><strong>Descrição:</strong> {profile.description}</p>
          <p><strong>Website:</strong> <a href={profile.website} target="_blank">{profile.website}</a></p>
          <p><strong>Facebook:</strong> <a href={profile.facebook} target="_blank">{profile.facebook}</a></p>
          <p><strong>Instagram:</strong> <a href={profile.instagram} target="_blank">{profile.instagram}</a></p>
          <p><strong>CNPJ:</strong> {profile.cnpj}</p>
          <p><strong>Missão:</strong> {profile.mission}</p>
          <p><strong>Visão:</strong> {profile.vision}</p>
        </div>

        <button className={styles.saveButton} onClick={() => navigate("/profile")}>
          Editar Perfil
        </button>
      </div>
    </div>
  );
}
