package main

import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
)

func getUser(db *sql.DB, userID string) {
    // build query bằng fmt.Sprintf → dễ SQL-injection
    query := fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", userID)
    rows, err := db.Query(query)
    if err != nil {
        panic(err)
    }
    defer rows.Close()
    for rows.Next() {
        // xử lý kết quả...
    }
}

func main() {
    conn := "user=postgres dbname=test sslmode=disable"
    db, _ := sql.Open("postgres", conn)
    getUser(db, "1 OR 1=1")
}
