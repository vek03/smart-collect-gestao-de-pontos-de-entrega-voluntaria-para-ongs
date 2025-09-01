import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth.js';
import styles from './CollectionPoints.module.css';

export default function CollectionPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCollectionPoints([]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleAddPoint = () => alert('Funcionalidade de adicionar ponto de coleta em breve!');
  const handleViewStatus = () => navigate('/collection-status');

  if (isLoading) return <p>Carregando pontos de coleta...</p>;

  return (
    <div className={styles.container}>
      <h2>Meus Pontos de Coleta</h2>
      <button onClick={handleAddPoint}>Adicionar Ponto</button>
      <button onClick={handleViewStatus}>Ver Status</button>
      <button onClick={handleLogout}>Sair</button>
      {collectionPoints.length === 0 && <p>Nenhum ponto de coleta encontrado.</p>}
    </div>
  );
}
