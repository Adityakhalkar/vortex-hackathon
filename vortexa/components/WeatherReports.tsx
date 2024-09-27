import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image

interface Article {
    title: string;
    snippet: string;
    thumbnail: string;
    link: string;
}

const NewsComponent: React.FC = () => {
    const [newsArticles, setNewsArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://vortex-backend-de3g.onrender.com/get-latest-news/');
                if (!response.ok) {
                    throw new Error('Failed to fetch news articles');
                }
                const data = await response.json();
                setNewsArticles(data.articles); // Assuming the response has an "articles" field
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f9', fontFamily: 'Arial, sans-serif' }}>
            <h1>Natural Calamity News</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="news-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {newsArticles.length > 0 ? (
                    newsArticles.map((article, index) => (
                        <div key={index} className="news-card" style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '300px',
                            padding: '15px',
                            textAlign: 'left',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {article.thumbnail && article.thumbnail !== 'No image available' ? (
                                <Image 
                                    src={article.thumbnail} 
                                    alt={article.title} 
                                    width={300} // Set a width according to your design
                                    height={180} // Set a height according to your design
                                    style={{ borderRadius: '10px', objectFit: 'cover' }} // Ensures the image covers the box
                                />
                            ) : (
                                <div className="no-image" style={{
                                    backgroundColor: '#e0e0e0',
                                    height: '180px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    color: '#888',
                                    borderRadius: '10px'
                                }}>
                                    No image available
                                </div>
                            )}
                            <div className="news-title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginTop: '10px' }}>{article.title}</div>
                            <div className="news-description" style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>{article.snippet}</div>
                            <a href={article.link} className="news-link" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    ))
                ) : (
                    <div>No articles found.</div>
                )}
            </div>
        </div>
    );
};

export default NewsComponent;
