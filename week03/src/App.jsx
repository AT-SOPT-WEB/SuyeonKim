import Card from './components/Card';
import Header from './components/Header';
import Search from './components/Search';
import useSearch from './hooks/useSearch';

import { members } from './members';

function App() {
  const {search, filteredMembers, handleSearchChange, handleSearch} = useSearch(members);

  return (
    <>
      <Header />
      <Search 
        search={search} 
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredMembers.map((member) => (
          <Card 
            key={member.id}
            name={member.name}
            englishName={member.englishName}
            github={member.github}
          />
        ))}
      </section>
    </>
  );
}

export default App;