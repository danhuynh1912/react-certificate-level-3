import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h3>Please click to see 3 examples of 3 exercise:</h3>
      <Link to="/exercise1">Exercise 1</Link> <br />
      <Link to="/exercise2">Exercise 2</Link> <br />
      <Link to="/exercise3">Exercise 3</Link>
    </>
  );
};

export default Home;
