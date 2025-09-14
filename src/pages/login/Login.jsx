import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, saveToken, generateToken } from '../../utils/auth.js';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Preencha todos os campos.');

    try {
      await login(email, password);
      const token = await generateToken({ email });
      saveToken(token);
      navigate('/collection-points');
    } catch (err) {
      console.error(err);
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail"/>
          </div>
          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha"/>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.loginButton}>Entrar</button>
          <span>Não tem conta? <Link to="/register">Crie uma conta</Link></span>
        </form>
      </div>
    </div>
  );
}
