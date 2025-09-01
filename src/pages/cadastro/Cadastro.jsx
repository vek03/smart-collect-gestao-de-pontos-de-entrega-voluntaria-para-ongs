import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../utils/auth.js'; 
import styles from '../login/Login.module.css';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();


    if (!email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (password.length < 8) {
      setError('A senha precisa ter no mínimo 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await register(email, password); 
      console.log('Usuário cadastrado:', userCredential.user);

      setError('');
      navigate('/collection-points');
    } catch (err) {
      console.error('Erro no cadastro completo:', err);
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('Este e-mail já está em uso.');
            break;
          case 'auth/invalid-email':
            setError('E-mail inválido.');
            break;
          case 'auth/weak-password':
            setError('Senha fraca. Use no mínimo 6 caracteres.');
            break;
          default:
            setError(`Erro Firebase: ${err.message}`);
        }
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Crie sua conta</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Confirme a senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.loginButton}>Registrar</button>
        <span>Já tem conta? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
}
