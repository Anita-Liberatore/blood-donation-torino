import { useState, useEffect } from 'react';
import { User } from '../types';

const fakeApiCall = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = require('../data/user.json');
        resolve(data as User);
      } catch {
        reject(new Error('Errore nel caricamento utente'));
      }
    }, 800); // simula latenza di rete
  });
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fakeApiCall()
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
};
