import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';


function App() {
  const [ posts, setPosts ] = useState([])
  const [search, setSearch ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [postTitle, setPostTitle ] = useState('');
  const [postBody, setPostBody ] = useState('');
  const [editTitle, setEditTitle ] = useState('');
  const [editBody, setEditBody ] = useState('');
  // const history = useHistory();
  const { width } = useWindowSize();


  const {data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);

  //     } catch(err){
  //       if(err.response){
  //         //Not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }

  //     }
  //   }
  //   fetchPosts();
  // }, [])


  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filteredResults.reverse());
  }, [posts, search])


  const handleSubmit = async (e)  =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};

    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      // history.push('/')
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }


  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody};
    try{
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? {...response.data}: post))
      setEditTitle('');
      setEditBody('');
      // history.push('/');
    }catch(err) {
      console.log(`Error: ${err.message}`);
    }


  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      // history.push('/');
    }catch(err) {
      console.log(`Error: ${err.message}`);
    }


  }
  return (
    <Router> {/* Use BrowserRouter here */}
      <div className="App">
        <Header title="Public Blog" width={ width} />
        <Nav search={search} setSearch={setSearch}/>
        <Routes>
          <Route path="/" element={<Home 
            posts={searchResults}
            fetchError={fetchError}
            isLoading={isLoading}/>} 
          />
          <Route
            path="/post" 
            element={<NewPost 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />} 
          />
          <Route
            path="/edit/:id" 
            element={<EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />} 
          />
          <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} /> {/* 404 Page */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

