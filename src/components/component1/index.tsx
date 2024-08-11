import useLocalStorage from '../../hooks/useLocalStorage';

const Component1 = () => {
  const [value, setValue] = useLocalStorage('commonKey');

  return (
    <div>
      <span>
        Component 1 (subscribe key 'commonKey'):
        <span>
          {' '}
          <b>{value}</b>{' '}
        </span>
      </span>
      <button onClick={() => setValue(value + '1')}>Change</button>
    </div>
  );
};

export default Component1;
