import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Obj, getValueFromKeyPath } from '../../../utils/getValueFromKeyPath.ts';

import './index.css';

interface AutoFilterDropdownProps<T> {
  data: T[];
  labelKeyPath: string[];
  valueChange: (selectedItem: T) => void;
}

const AutoFilterDropdown = <T extends Obj>({
  data = [],
  labelKeyPath,
  valueChange,
}: AutoFilterDropdownProps<T>) => {
  const [filter, setFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    data.length && setFilteredData(data);
  }, [data.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setFilter(searchTerm);

    const newFilteredData = data.filter((item) =>
      String(getValueFromKeyPath(item, labelKeyPath))
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(newFilteredData);
  };

  const handleSelect = (item: T) => {
    valueChange(item);
    setFilter(getValueFromKeyPath(item, labelKeyPath));

    setFilteredData([item]);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={filterRef}>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Search..."
      />
      {isOpen && filteredData.length > 0 && (
        <div className="dropdown-menu">
          {filteredData.map((item, index) => (
            <p key={index} onClick={() => handleSelect(item)}>
              {highlightMatch(
                String(getValueFromKeyPath(item, labelKeyPath)),
                filter
              )}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const highlightMatch = (text: string, term: string) => {
  const parts = text.split(new RegExp(`(${term})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        )
      )}
    </>
  );
};

export default AutoFilterDropdown;
