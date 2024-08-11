import useLocalStorage from '../../hooks/useLocalStorage';

const Component2 = () => {
  const [value] = useLocalStorage('commonKey');

  return (
    <div>
      <p>
        Component 2 (value of key: 'commonKey'):{' '}
        <span>
          {' '}
          <b>{value}</b>
        </span>
      </p>
    </div>
  );
};

export default Component2;
