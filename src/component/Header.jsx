const Header = ({ isLoggedIn, username, onLogout }) => {
  return (
    <header className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">마커스</span>
        {isLoggedIn && (
          <div className="d-flex align-items-center">
            <span className="text-light me-3">{username}님 환영합니다</span>
            <button className="btn btn-outline-light" onClick={onLogout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
