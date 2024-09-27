from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

def get_natural_calamity_news(api_key, location="India", query="Latest news related to natural calamity in India"):
    params = {
        "q": query,
        "location": location,
        "tbm": "nws",  # Fetches news results
        "api_key": api_key
    }
    response = requests.get("https://serpapi.com/search.json", params=params)
    
    if response.status_code == 200:
        data = response.json()
        news_articles = data.get('news_results', [])
        return news_articles
    else:
        return []

# Replace with your SerpApi key
api_key = "ef4e7a7cd7387a227216587851e43fe41528b573d7cc2405d1e90f9190ff082f"

@app.route('/')
def index():
    news_articles = get_natural_calamity_news(api_key)
    return render_template('index.html', news_articles=news_articles)

if __name__ == "__main__":
    app.run(debug=True)
