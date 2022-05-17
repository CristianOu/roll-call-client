import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="page-container">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to this page.</p>
      {/*<button onClick={goBack}>Go Back</button>*/}
    </div>
  );
};

export default UnauthorizedPage;
