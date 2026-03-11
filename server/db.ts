import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve(process.cwd(), "database.sqlite");
export const db = new Database(dbPath);

export function setupDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password TEXT,
      login_provider TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT NOT NULL,
      area TEXT NOT NULL,
      pincode TEXT NOT NULL,
      population INTEGER
    );

    CREATE TABLE IF NOT EXISTS Businesses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      location_id INTEGER,
      latitude REAL,
      longitude REAL,
      rating REAL,
      FOREIGN KEY (location_id) REFERENCES Locations(id)
    );

    CREATE TABLE IF NOT EXISTS OpportunityScores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_id INTEGER,
      business_category TEXT NOT NULL,
      demand_score INTEGER,
      competition_score INTEGER,
      opportunity_score INTEGER,
      FOREIGN KEY (location_id) REFERENCES Locations(id)
    );

    CREATE TABLE IF NOT EXISTS Reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      rating INTEGER,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS CommunityPosts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS Comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      user_id INTEGER,
      comment TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES CommunityPosts(id),
      FOREIGN KEY (user_id) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS Polls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_id INTEGER,
      business_type TEXT NOT NULL,
      votes INTEGER DEFAULT 0,
      FOREIGN KEY (location_id) REFERENCES Locations(id)
    );
  `);

  // Seed initial data if empty
  const locationCount = db.prepare("SELECT COUNT(*) as count FROM Locations").get() as { count: number };
  if (locationCount.count === 0) {
    const insertLocation = db.prepare("INSERT INTO Locations (city, area, pincode, population) VALUES (?, ?, ?, ?)");
    const loc1 = insertLocation.run("San Francisco", "Downtown", "94103", 50000);
    const loc2 = insertLocation.run("San Francisco", "Mission District", "94110", 80000);

    const insertScore = db.prepare("INSERT INTO OpportunityScores (location_id, business_category, demand_score, competition_score, opportunity_score) VALUES (?, ?, ?, ?, ?)");
    insertScore.run(loc1.lastInsertRowid, "Specialty Coffee", 85, 90, 45); // High demand, high competition
    insertScore.run(loc1.lastInsertRowid, "Vegan Bakery", 75, 40, 82); // Good demand, low competition
    insertScore.run(loc1.lastInsertRowid, "Pet Grooming", 90, 30, 95); // High demand, low competition
    
    insertScore.run(loc2.lastInsertRowid, "Boutique Gym", 80, 60, 70);
    insertScore.run(loc2.lastInsertRowid, "Co-working Space", 60, 85, 30);

    const insertBusiness = db.prepare("INSERT INTO Businesses (name, category, location_id, latitude, longitude, rating) VALUES (?, ?, ?, ?, ?, ?)");
    insertBusiness.run("Joe's Coffee", "Specialty Coffee", loc1.lastInsertRowid, 37.784, -122.401, 4.5);
    insertBusiness.run("Downtown Beans", "Specialty Coffee", loc1.lastInsertRowid, 37.785, -122.405, 4.2);
    insertBusiness.run("Bark & Bathe", "Pet Grooming", loc1.lastInsertRowid, 37.782, -122.408, 4.8);

    const insertUser = db.prepare("INSERT INTO Users (name, email, password, login_provider) VALUES (?, ?, ?, ?)");
    const user1 = insertUser.run("Alex Founder", "alex@example.com", "hashed_pwd", "email");

    const insertPost = db.prepare("INSERT INTO CommunityPosts (user_id, title, content) VALUES (?, ?, ?)");
    insertPost.run(user1.lastInsertRowid, "Looking for a co-founder for a Vegan Bakery", "I've noticed a huge gap in the market downtown for vegan baked goods. Anyone interested in chatting?");
  }
}
