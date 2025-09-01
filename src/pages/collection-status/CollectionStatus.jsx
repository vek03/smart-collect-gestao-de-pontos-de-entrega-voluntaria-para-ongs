import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth.js';
import styles from './CollectionStatus.module.css';

export default function CollectionStatus() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFillPercentage(75);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleViewAllPoints = () => navigate('/collection-points');

  if (isLoading) return <p>Carregando status...</p>;

  return (
    <div className={styles.container}>
      <h2>Ponto de Coleta Principal</h2>
      <p>{fillPercentage}% preenchido</p>
      <button onClick={handleViewAllPoints}>Ver Todos os Pontos</button>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
