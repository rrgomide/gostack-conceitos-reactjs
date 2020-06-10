import React, { useEffect } from 'react';

import './styles.css';

import api from './services/api';
import { useState } from 'react';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [newRepository, setNewRepository] = useState('');

  useEffect(() => {
    api
      .post('repositories', {
        title: 'Repo1',
      })
      .then(() => {
        api.get('repositories').then((response) => {
          console.log(response.data);
          setRepositories(response.data);
        });
      });
  }, []);

  async function handleAddRepository() {
    api
      .post('repositories', {
        title: newRepository,
      })
      .then((newRepo) => {
        setRepositories([...repositories, newRepo.data]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const newRepos = repositories.filter((repo) => repo.id !== id);
      setRepositories(newRepos);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => {
          return (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <input
        type="text"
        value={newRepository}
        onChange={(e) => setNewRepository(e.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
