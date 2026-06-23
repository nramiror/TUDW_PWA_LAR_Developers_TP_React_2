import React, { useState } from 'react';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { loginUser, registerUser } from '../../services/user';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError(t('login.errors.emptyFields', 'All fields are required'));
      setIsLoading(false);
      return;
    }

    try {
      if (isLoginView) {

        const data = await loginUser(email, password);

        if (data.success || data.accessToken) {
          const userData = data.user || data.data || data;
          const token = data.accessToken || data.token;

          login(userData, token);

          if (onSuccess) onSuccess();
        } else {
          setError(data.message || t('login.errors.invalidCredentials', 'Invalid email or password'));
        }
      } else {
        const data = await registerUser(email, password);

        if (data.success || data.user) {
          setSuccessMsg('¡Cuenta creada con éxito! Por favor, iniciá sesión.');
          setIsLoginView(true);
          setPassword('');
        } else {
          setError(data.message || 'Error al crear la cuenta');
        }
      }
    } catch (err) {
      console.error("Error conectando al servicio:", err);
      setError(t('login.errors.connection', 'Error conectando al servidor'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      { }
      <h2 className="font-instrument text-2xl font-bold text-secondary">
        {t('login.title', 'Welcome Back')}
      </h2>
      <p className="text-sm text-secondary/70">
        {t('login.subtitle', 'Enter your credentials to access your account')}
      </p>

      { }
      {error && (
        <div className="rounded-[var(--radius-border)] bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      { }
      <form className="mt-2 flex flex-col gap-4 text-left" onSubmit={handleSubmit}>

        { }
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-secondary/80">
            {t('login.fields.email', 'Email Address')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[var(--radius-border)] border border-primary/30 bg-white/50 px-4 py-2.5 text-secondary shadow-xs transition-colors focus:border-secondary focus:bg-white focus:outline-hidden"
            placeholder="example@games.com"
            disabled={isLoading}
          />
        </div>

        { }
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-secondary/80">
            {t('login.fields.password', 'Password')}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[var(--radius-border)] border border-primary/30 bg-white/50 px-4 py-2.5 text-secondary shadow-xs transition-colors focus:border-secondary focus:bg-white focus:outline-hidden"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        { }
        <Button
          type="submit"
          variant="primary"
          fullWidth={true}
          disabled={isLoading}
          text={isLoading
            ? t('login.buttons.loading', 'Connecting...')
            : (isLoginView ? 'Iniciar Sesión' : 'Registrarse')}
          className="mt-2"
        />
      </form>
      <Button
        type="button"
        onClick={() => {
          setIsLoginView(!isLoginView);
          setError('');
          setSuccessMsg('');
        }}
        className="mt-2 w-full rounded-[var(--radius-border)] border border-secondary bg-transparent px-4 py-2.5 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-white"
      >
        {isLoginView
          ? "Si no tenés cuenta, registrate acá"
          : "¿Ya tenés cuenta? Iniciá sesión"}
      </Button>
    </div>
  );
};

export default LoginForm;