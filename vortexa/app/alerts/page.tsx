"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import WeatherLoader from '@/components/Loader'; // Import your WeatherLoader component

interface Article {
    title: string;
    description: string; // Updated to match your fetched response structure
    image: string; // Changed from thumbnail to image
    link: string;
}

const NewsComponent: React.FC = () => {
    const [newsArticles, setNewsArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://vortex-backend-de3g.onrender.com/get-latest-news/', {
                    method: 'POST', // Change to POST
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                    body: JSON.stringify({}), // Add any data you need to send in the body
                });
    
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch news articles');
                }
                const data = await response.json();
                setNewsArticles(data.news); // This should remain as it is
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchNews();
    }, []);
    
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f9', fontFamily: 'Arial, sans-serif' }}>
            <h1>Natural Calamity News</h1>
            {loading && <WeatherLoader />} {/* Use WeatherLoader component here */}
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
                            {article.image && article.image !== 'No image available' ? ( // Change to image
                                <Image 
                                    src={article.image} // Change to image
                                    alt={article.title} 
                                    width={300} // Set a width according to your design
                                    height={180} // Set a height according to your design
                                    style={{ borderRadius: '10px', objectFit: 'cover' }} // Ensures the image covers the box
                                    onError={(e) => {
                                        e.currentTarget.src = '/path/to/placeholder/image.jpg'; // Optional: Fallback image
                                    }}
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
                            <div className="news-description" style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>{article.description}</div>
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
