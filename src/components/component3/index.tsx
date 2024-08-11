import useLocalStorage from '../../hooks/useLocalStorage';

const Component3 = () => {
  const [value] = useLocalStorage('otherKey');

  return (
    <div>
      <p>
        Component 3 (subscribe key 'otherKey'):{' '}
        <span>
          {' '}
          <b>{value}</b>{' '}
        </span>
      </p>
    </div>
  );
};

export default Component3;
