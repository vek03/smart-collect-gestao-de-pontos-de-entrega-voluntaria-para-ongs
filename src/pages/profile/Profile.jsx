// ProfilePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth.js";
import styles from "./Profile.module.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "ONG Exemplo",
    email: "ong@example.com",
    phone: "(11) 99999-9999",
    address: "Rua Exemplo, 123",
    description: "Uma ONG dedicada a ajudar pessoas e comunidades.",
    website: "https://www.exemplo.org",
    facebook: "",
    instagram: "",
    cnpj: "12.345.678/0001-99",
    mission: "Promover impacto social positivo.",
    vision: "Ser referência em assistência social.",
    profileImage: null,
    bannerImage: null,
  });

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfile({ ...profile, bannerImage: URL.createObjectURL(file) });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfile({ ...profile, profileImage: URL.createObjectURL(file) });
  };

  const handleSmartCollectClick = () => navigate("/collection-points");

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar as alterações no backend
    navigate("/view-profile", { state: { profile } }); // redireciona para ViewProfile passando os dados
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle} onClick={handleSmartCollectClick}>
          Smart Collect
        </h1>
        <div className={styles.headerActions}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>

      {/* Banner */}
      <div
        className={styles.banner}
        style={{
          backgroundImage: profile.bannerImage
            ? `url(${profile.bannerImage})`
            : `url('https://via.placeholder.com/1200x250/cccccc/ffffff?text=Banner+Neutro')`,
        }}
      >
        <label className={styles.bannerUpload}>
          Alterar Banner
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerImageChange}
            className={styles.hiddenInput}
          />
        </label>
      </div>

      {/* Conteúdo */}
      <div className={styles.content}>
        {/* Perfil */}
        <div className={styles.profileHeader}>
          <div className={styles.profileImageWrapper}>
            <img
              src={
                profile.profileImage
                  ? profile.profileImage
                  : "https://via.placeholder.com/150/cccccc/ffffff?text=Foto"
              }
              alt="Perfil neutro"
              className={styles.profileImage}
            />
            <label className={styles.profileUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className={styles.hiddenInput}
              />
              📷
            </label>
          </div>
          <h1>{profile.name}</h1>
        </div>

        {/* Dados da ONG */}
        <div className={styles.infoSection}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Nome</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Telefone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Endereço</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>CNPJ</label>
              <input
                type="text"
                value={profile.cnpj}
                onChange={(e) => setProfile({ ...profile, cnpj: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Missão</label>
              <input
                type="text"
                value={profile.mission}
                onChange={(e) => setProfile({ ...profile, mission: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Visão</label>
              <input
                type="text"
                value={profile.vision}
                onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Facebook</label>
              <input
                type="url"
                value={profile.facebook}
                onChange={(e) => setProfile({ ...profile, facebook: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Instagram</label>
              <input
                type="url"
                value={profile.instagram}
                onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input type="password" placeholder="Nova senha" />
            </div>
          </div>
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
