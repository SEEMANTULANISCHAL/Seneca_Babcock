import sqlite3

conn = sqlite3.connect("stories.db")
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    email TEXT,
    content TEXT,
    story_type TEXT,
    status TEXT,
    type TEXT,  -- 'story' or 'event'
    submitted_at TEXT,
    photo_url TEXT
)
''')

conn.commit()
conn.close()
print("Database initialized.")
