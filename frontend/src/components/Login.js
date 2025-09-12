import Header from "./Header";
import LeftNav from "./LeftNav";

const Login = ({ isOpen, leftNavRef, openLeftNav, closeLeftNav }) => {
  return (
    <div>
      <Header
        showSearchLogo={false} //hide the search icon
        isLeftNavOpen={isOpen}
        openLeftNav={openLeftNav}
        // Pass other props if you need search/right nav to work:
        openSearch={() => {}}
        isRightNavOpen={false}
        closeRightNav={() => {}}
      />
      <LeftNav
        isOpen={isOpen}
        closeLeftNav={closeLeftNav}
        leftNavRef={leftNavRef}
      />
    </div>
  );
};
export default Login;
