import React from "react";
import Cookies from 'js-cookie';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./LandingPage/Home";
import Sticky from "./LandingPage/Sticky"
import Profile from "./Profile/Profile";

import Search from "./Search/Search";
import SearchName from './Search/SearchName';

// import Modal from './Modal';
import AuthApi from './AuthApi'
import Disease from "./Disease/Disease";
import Dashboard from "./Dashboard/Dashboard.js";
// import LoginPage from "./login";
import Blogpage from "./BlogPage/Blogpage";
import EditPost from './BlogPage/EditModal';
import BlogAllPost from './Dashboard/BlogAllPost'
import LoginInfo from './loginForm/LoginInfo'
import Comment from './Comment'
import CommentsRev from './Dashboard/CommentsRev.js'
import ReviewComments from './Dashboard/ReviewComments.js'
import Results from './Dashboard/Results.js'
import PromoPaid from './Dashboard/PromoPaid.js'
import PromoAdmin from './Dashboard/PromoAdmin.js'
import ResetPass from './loginForm/ResetPass.js'
import Verify from './loginForm/Verify.js'
import Subscribe from './Dashboard/Subscribe.js'
import Subs from './Dashboard/Subs.js'
import EditSubscribe from './Dashboard/EditSubscribe'
import Test from './LandingPage/test'
import DeleteSubscribe from './Dashboard/DeleteSubscribe'
import Pagination from '../Pagination'
import List from '../List'
import Userprofile from "./Profile/Userprofile";
import StarRating from './StarRating'
import history from "./history";
import ArticleRating from './ArticleRating'
import MyArticle from './Profile/MyArtcle'
import ListArticle from './Profile/ListArticle'


// import Blogs from './Disease/Disease'

function Main(props) {
  // render() {
  const [auth, setAuth] = React.useState(false);
  const readCookie = () => {
    // if(Cookies.get('acPerm')){
      const user = Cookies.get("acPerm")
      // const userAccess = user.split('|')[1]
      if(user){
        setAuth(true)
        console.log('USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR:'+user)
      }
  }
  const url = props.url;
  React.useEffect(() => {
    readCookie();
  }, [])

    return (
      <div>
        <AuthApi.Provider value={{auth, setAuth}}>
          <HashRouter history={history} basename={''}>
            <Routes url = {url}/>
          </HashRouter>
        </AuthApi.Provider>
      </div>
    );
  // }
}

const Routes = (props) => {
  // let query = useQuery();
  const Auth = React.useContext(AuthApi)
  
  // const location = useLocation();
  // const currentPath = location.pathname;
  return (
    <>
    <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/cure/:id" component={Disease}/>
          <Route exact path="/home" component={Home} />
          <Route exact  path="/search/:city" component={Search} /> 
          <Route exact path="/searchName/:name" component={SearchName} /> 
          <Route path="/search/:city/:name" component={Search} />
          {/* <Route path="/search/:city/:name" component={Search} /> */}
          <ProtectedRoute auth={Auth.auth} path="/article/:id" component={EditPost}/>
          <ProtectedRoute auth={Auth.auth} path="/article" component={EditPost}/>
          {/* <Route path="/edit" auth={Auth.auth} component={Article} /> */}
          <ProtectedRoute auth={Auth.auth} exact path="/dashboard" component={Dashboard} />
          <Route exact path="/cures" component={Blogpage}/>
          <Route exact path="/login/doctor" component={LoginInfo}/>
          <Route path="/cures/:type" component={Blogpage}/>
          {/* <Route exact path="/blogs/:id" component={Blogs}/> */}
      <ProtectedRoute auth={Auth.auth} exact path="/profile/:id" component={Profile} />
      <ProtectedRoute auth={Auth.auth} exact path="/user/profile/" component={Userprofile} />
      <ProtectedRoute auth={Auth.auth} exact path="/profile/:id/edit" component={LoginInfo} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/blogs" component={BlogAllPost} />
      <Route exact path="/comment" component={Comment} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/commentsrev" component={CommentsRev} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/reviewcomments" component={ReviewComments} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/results" component={Results} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/promopaid" component={PromoPaid} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/promoadmin" component={PromoAdmin} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/promoadmin" component={PromoAdmin} />
      <Route exact path="/landingPage/sticky" component={Sticky} />
      <Route exact path="/subscribe" component={Subscribe} />
      <Route exact path="/subs" component={Subs} />
      <Route exact path="/editsubscribe" component={EditSubscribe} />
      <Route exact path="/pagination" component={Pagination} />
      <Route exact path="/list" component={List} />
      <Route exact path="/deletesubscribe" component={DeleteSubscribe} />
      <Route exact path="/starrating" component={StarRating} />
      <Route exact path="/articlerating" component={ArticleRating} />
      <ProtectedRoute auth={Auth.auth} exact path="/myarticle" component={MyArticle} />
      <Route exact path="/loginForm/ResetPass" component={ResetPass} />
      <Route exact path="/loginForm/verify" component={Verify} />
      
    </Switch>
          {/* <Route path="/" component={LoginPage}/> */}
          <ProtectedLogin path='?login=true' auth={Auth.auth} component={Test} />
          {/* <Child login={query.get("login")} url = {currentPath}/> */}
    </>
  )
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
  console.log('Auth: ', auth)
    return(
      <Route
      {...rest}
      render = {() =>auth ? (
        <Component/>        
      ):
        (
          // <Redirect to="/login"/>
          <Redirect to={{pathname: '/cures', search: '', state: {open: true}}}/>
        )
    }
      />
    )
}

const ProtectedLogin = ({auth, component:Component, ...rest}) => {
    return(
      <Route
      {...rest}
      render = {() =>!auth ? (
        <Component/>
      ):
        (
          <Redirect to="#"/>
        )
    }
      />
    )
}

const ProtectedArticle = ({auth, component:Component, ...rest}) => {
  
  return(
    <Route
      {...rest}
        render = {() => auth?(
          <Component/>
          // console.log('Auth: Nope', auth)
          ):
        (
          <Redirect to="/home"/>
          
          // console.log('AuthSuccess: ', auth)
        )
      }
    />
  )
}

export default Main;