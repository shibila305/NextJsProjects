"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import withAuth from "../../Components/Home/withAuth";

function ProfileClick({ params }) {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        // Fetch profile data
        const profileResponse = await fetch(
          `https://api.realworld.io/api/profiles/${params.username}`
        );
        const profileData = await profileResponse.json();
        console.log("Profile Data:", profileData);

        setProfile(profileData.profile);

        // Fetch articles by author's username
        const articlesResponse = await fetch(
          `https://api.realworld.io/api/articles?author=${params.username}&limit=100`
        );
        const articlesData = await articlesResponse.json();
        console.log("Articles Data:", articlesData);

        setArticles(articlesData.articles);
      } catch (error) {
        console.error("Error fetching profile or articles:", error);
        setError("Error fetching data. Please try again later.");
      }

      setLoading(false);
    }

    fetchData();
  }, [params.username]);

  function getDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {profile && (
        <div className="profile-main">
          <img className="profile-image" src={profile.image} alt={profile.username} />
          <h1 className="profile-username">{profile.username}</h1>
          <button className="profile-btn">
            <i className="ion-plus-round">+ Follow {profile.username}</i>
          </button>
        </div>
      )}

      <div className="sec1">
        <section className="article-section">
          <label>Global Feed</label>
          {articles.length > 0 ? (
            articles.map((article) => (
              <ul key={article.slug}>
                <div className="articles">
                  <li>
                    <div className="headingtext">
                      <div className="immm">
                        <img src={article.author.image} alt={article.author.username} />
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
            ))
          ) : (
            <p>No articles available for this author.</p>
          )}
        </section>
      </div>
    </>
  );
}

export default withAuth(ProfileClick);
