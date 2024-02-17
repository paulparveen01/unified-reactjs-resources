import './App.css';
import { UserListing } from './UserListing'
import { Post } from './Post'
import { ShowComments } from './ShowComments'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <>
      <div className='container'>
        <div className='box'>
            <Link to="/">
              Sample user data with custom Pagination
            </Link>            
        </div>
        <div className='box'>
            <Link to="posts">
              List of posts with comments (On posts click show comments)
            </Link>
        </div>
      </div>

      <Routes>
          <Route path="/" element={<UserListing />} />
          <Route path="/posts" element={<Post />} >
            <Route path=":id/comments" element={<ShowComments />} />
          </Route>
      </Routes>
    </>
  )
}

export default App;
