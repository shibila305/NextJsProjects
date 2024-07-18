import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchArticles } from './features/articleSlice';
import { fetchTags } from '../Home/features/tagSlice';
import Link from 'next/link';

export function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles({ offset: 0, limit: 10 })); // Fetch initial set of articles
    dispatch(fetchTags()); // Fetch tags if needed
  }, [dispatch]);

  const articles = useSelector((state) => state.articles);
  const tags = useSelector((state) => state.tags);

  function getDate(date) {
    const dat = new Date(date);
    return dat.toDateString();
  }

  function getButtons(count) {
    const buttonInfo = [];
    let item = 1;
    for (let i = 0; i <= count; i += 10) {
      buttonInfo.push({ offset: i, item: item });
      item++;
    }
    return buttonInfo;
  }

  const handlePagination = (offset) => {
    dispatch(fetchArticles({ offset: offset, limit: 10 }));
  };

  if (articles.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (articles.status === 'failed') {
    return <div>Error: {articles.error}</div>;
  }

  return (
    <div className="sec">
      <section className="article-section">
        <label>Global Feed</label>
        {articles.items.map((article) => (
          <ul key={article.slug}>
            <div className="articles">
              <li key={article.slug}>
                <div className="headingtext">
                  <div className="immm">
                    <img src={article.author.image} alt={`${article.author.username}'s profile`} />
                    <div className="namedate">
                      <Link className="link" href={`/profile/${article.author.username}`}>
                        <h1 className="author">{article.author.username}</h1>
                      </Link>
                      <p className="date">{getDate(article.createdAt)}</p>
                    </div>
                  </div>
                  <div className="favorite-button">
                    <button className="heart">
                      <i className="ion-heart"> {article.favoritesCount}</i>
                    </button>
                  </div>
                </div>

                <div className="content">
                  <Link className="link" href={`/article/${article.slug}`}>
                    <h1 className="title">{article.title}</h1>
                  </Link>
                  <Link className="link" href={`/article/${article.slug}`}>
                    <p className="desc">{article.description}</p>
                  </Link>
                </div>
                <div className="read">
                  <Link className="link" href={`/article/${article.slug}`}>
                    <p>Read more...</p>
                  </Link>
                  <div className="tagList">
                    {article.tagList.map((item) => (
                      <Link key={item} href={`/article/${article.slug}`}>
                        <button className="taglist">{item}</button>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </div>
          </ul>
        ))}
        {getButtons(articles.articlesCount).map(({ offset, item }) => (
          <button className="page" key={item} onClick={() => handlePagination(offset)}>
            {item}
          </button>
        ))}
      </section>
      <aside className="article-aside">
        <div className="asidediv">
          <h3>Popular Tags</h3>
          {tags.list.map((tag) => (
            <div className="btn1" key={tag}>
              <li className="btn">{tag}</li>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
