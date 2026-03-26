// app/data.ts

export const courseSyllabus = [
  {
    id: 'm1', title: 'Module 1: Introduction to ORMs', progress: 100,
    chapters: [
      {
        id: 'c1', title: 'Chapter 1: The Basics',
        exercises: [
          { id: 'e1', title: 'SQL vs ORM Paradigms', completed: true, type: 'reading' as const },
        ]
      }
    ]
  },
  {
    id: 'm2', title: 'Module 2: Advanced Queries', progress: 45,
    chapters: [
      {
        id: 'c2', title: 'Chapter 1: Relations',
        exercises: [
          { id: 'e3', title: 'One-to-Many Relationships', completed: true, type: 'reading' as const },
          { id: 'e4', title: 'Interactive Exercise: Joins', completed: false, type: 'code' as const },
        ]
      }
    ]
  }
];

// Content for the active window
export const exerciseContent = {
  "e4": {
    badge: "Interactive Exercise",
    title: "Relational Joins in Action",
    description: "Now that we understand the theory behind relations, let's practice retrieving data from multiple tables simultaneously. Read the instructions carefully and interact with the elements below to test your knowledge.",
    sections: [
      {
        id: "sec_1",
        type: "fill_in_blank",
        heading: "1. The Inner Join Concept",
        textBefore: "An Inner Join returns records that have matching values in both tables. To combine rows from multiple tables, based on a related column, we use a",
        textAfter: "clause.",
        correctAnswer: "join"
      },
      {
        id: "sec_2",
        type: "mcq",
        heading: "2. Optimal Choice Question",
        question: "When using SQLAlchemy, which method is typically used to execute a query and return the first result or `None` if no result is found?",
        options: [".all()", ".first()", ".one()", ".scalar()"],
        correctAnswer: ".first()"
      },
      {
        id: "sec_3",
        type: "code_sandbox",
        heading: "FastAPI & SQLAlchemy Sandbox",
        comment: "# Write a route to find a user with a specific ID and include their related posts.",
        defaultCode: `@app.get("/users/{user_id}")\ndef get_user_with_posts(user_id: int, db: Session = Depends(get_db)):\n    # Add your ORM joinedload query here\n    pass`
      }
    ]
  }
};