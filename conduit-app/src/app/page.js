"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { fetchArticles } from './Components/Home/features/articleSlice';
import { fetchTags } from './Components/Home/features/tagSlice';
import { Feed } from "../app/Components/Home/Feed";

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchArticles());
      await dispatch(fetchTags());
      setLoading(false);
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="mainContainer">
      <link
        href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
        rel="stylesheet"
      />
      <link
        href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        rel="stylesheet"
      />

      <header className="header">
        <h1>Conduit</h1>
        <p>A place to share your knowledge.</p>
      </header>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <Feed />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
