//services/python-worker/services/tax_updates.py

import feedparser
from database.db import get_db_connection

RSS_FEEDS = [
    {
        "source": "BMF",
        "category": "tax",
        "url": "https://www.bundesfinanzministerium.de/Web/DE/Service/RSS/rss.xml"
    },
    {
        "source": "Bundesregierung",
        "category": "law",
        "url": "https://www.bundesregierung.de/breg-de/service/rss-feeds"
    }
]

def normalize_entry(entry, feed):
    return {
        "title": entry.get("title"),
        "category": feed["category"],
        "source": feed["source"],
        "sourceUrl": entry.get("link"),
        "publishedAt": entry.get("published")
    }

def insert_update(title, category, source, url, published):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO "TaxUpdate"
        ("id","title","category","source","sourceUrl","publishedAt")
        VALUES (gen_random_uuid(), %s, %s, %s, %s, %s)
        ON CONFLICT DO NOTHING
    """, (title, category, source, url, published))

    conn.commit()
    cur.close()
    conn.close()

def check_tax_updates():
    for feed in RSS_FEEDS:
        parsed = feedparser.parse(feed["url"])

        for entry in parsed.entries:
            normalized = normalize_entry(entry, feed)

            insert_update(
                normalized["title"],
                normalized["category"],
                normalized["source"],
                normalized["sourceUrl"],
                normalized["publishedAt"]
            )