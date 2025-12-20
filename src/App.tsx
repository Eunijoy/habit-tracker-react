import { useState } from "react";
import "./App.css";

interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak: number;
  category: string;
}

function App() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      title: "Drink 8 glasses of water",
      completed: false,
      streak: 1,
      category: "Health & Fitness",
    },
    {
      id: 2,
      title: "Digital detox hour",
      completed: true,
      streak: 1,
      category: "Wellness",
    },
  ]);

  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (!newHabit.trim()) return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        title: newHabit,
        completed: false,
        streak: 0,
        category: "General",
      },
    ]);

    setNewHabit("");
  };

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: habit.completed ? habit.streak : habit.streak + 1,
            }
          : habit
      )
    );
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const completedToday = habits.filter((h) => h.completed).length;
  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <div className="page">
      <h1>Daily Habits</h1>

      <div className="card">
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button className="add-btn" onClick={addHabit}>
            +
          </button>
        </div>

        <ul className="habit-list">
          {habits.map((habit) => (
            <li key={habit.id} className="habit-item">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
              />

              <div className="habit-info">
                <strong>{habit.title}</strong>
                <div className="meta">
                  Streak: {habit.streak} days
                  <span className="category">{habit.category}</span>
                </div>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteHabit(habit.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card summary">
        <h2>Progress Summary</h2>

        <div className="summary-grid">
          <div className="summary-box">
            <p>Completed Today</p>
            <strong>
              {completedToday}/{habits.length}
            </strong>
          </div>

          <div className="summary-box purple">
            <p>Total Streaks</p>
            <strong>{totalStreaks}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
