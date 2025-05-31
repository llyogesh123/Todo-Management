import React, { useState, useEffect } from 'react';
import { Plus, X, Check, Filter, SortAsc, Sparkles, Calendar, Target } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [inputError, setInputError] = useState('');

  // Load tasks from localStorage on component mount (for your own environment)
  useEffect(() => {
    // Uncomment for localStorage integration in your own environment:
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change (for your own environment)
  useEffect(() => {
    // Uncomment for localStorage integration in your own environment:
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const validateInput = (input) => {
    if (!input.trim()) {
      return 'Task cannot be empty';
    }
    if (input.trim().length < 2) {
      return 'Task must be at least 2 characters long';
    }
    if (input.trim().length > 100) {
      return 'Task must be less than 100 characters';
    }
    if (tasks.some(task => task.text.toLowerCase() === input.trim().toLowerCase())) {
      return 'Task already exists';
    }
    return '';
  };

  const addTask = () => {
    const error = validateInput(inputValue);
    if (error) {
      setInputError(error);
      return;
    }

    const newTask = {
      id: Date.now() + Math.random(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
    setInputError('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (inputError) {
      setInputError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }

    // Sort tasks
    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'completed':
          return a.completed - b.completed;
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Transform your productivity with style</p>
        </div>

        {/* Main Container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8">
          
          {/* Progress Section */}
          {totalCount > 0 && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-medium">Progress</span>
                </div>
                <span className="text-emerald-400 font-bold text-lg">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{completedCount} completed</span>
                <span>{totalCount - completedCount} remaining</span>
              </div>
            </div>
          )}

          {/* Task Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done today?"
                className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-lg ${
                  inputError ? 'border-red-400 ring-2 ring-red-400' : 'border-white/30 hover:border-white/50'
                }`}
              />
              <button
                onClick={addTask}
                className="absolute right-2 top-2 p-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl hover:from-pink-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
              </button>
            </div>
            {inputError && (
              <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-xl">
                <p className="text-red-300 text-sm">{inputError}</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Filter size={16} className="text-gray-300" />
              </div>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All', color: 'from-gray-500 to-gray-600' },
                  { key: 'active', label: 'Active', color: 'from-blue-500 to-cyan-500' },
                  { key: 'completed', label: 'Done', color: 'from-green-500 to-emerald-500' }
                ].map(filterType => (
                  <button
                    key={filterType.key}
                    onClick={() => setFilter(filterType.key)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      filter === filterType.key
                        ? `bg-gradient-to-r ${filterType.color} text-white shadow-lg`
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {filterType.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <SortAsc size={16} className="text-gray-300" />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              >
                <option value="newest" className="bg-gray-800">Newest First</option>
                <option value="oldest" className="bg-gray-800">Oldest First</option>
                <option value="alphabetical" className="bg-gray-800">A-Z</option>
                <option value="completed" className="bg-gray-800">Completed Last</option>
              </select>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-purple-400" />
                  </div>
                </div>
                <p className="text-gray-300 text-lg">
                  {tasks.length === 0 ? 'Ready to conquer your day?' : 'No tasks match your filter'}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {tasks.length === 0 ? 'Add your first task above!' : 'Try a different filter'}
                </p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                    task.completed
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30'
                      : 'bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                      task.completed
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400 border-emerald-400 shadow-lg shadow-emerald-500/25'
                        : 'border-gray-400 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/25'
                    }`}
                  >
                    {task.completed && <Check size={16} className="text-white" />}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block text-lg transition-all duration-300 ${
                        task.completed
                          ? 'text-gray-400 line-through'
                          : 'text-white group-hover:text-pink-100'
                      }`}
                    >
                      {task.text}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Calendar size={12} />
                      {new Date(task.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => removeTask(task.id)}
                    className="w-8 h-8 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-110 opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Clear Completed Button */}
          {completedCount > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setTasks(tasks.filter(task => !task.completed))}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
              >
                Clear Completed ({completedCount})
              </button>
            </div>
          )}

          {/* Footer Stats */}
          {totalCount > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalCount}</div>
                  <div className="text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{completedCount}</div>
                  <div className="text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{totalCount - completedCount}</div>
                  <div className="text-gray-400">Active</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;